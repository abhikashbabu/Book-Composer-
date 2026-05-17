function exportPDF() {
    const fileInput = document.getElementById('exportSourceFile');
    
    if (!fileInput || !fileInput.files[0]) {
        alert("Please select a PDF file to re-format first!");
        return;
    }

    const settings = { paperSize: document.getElementById('paperSize').value };
    const formData = new FormData();
    formData.append('sourceFile', fileInput.files[0]);
    formData.append('settings', JSON.stringify(settings));

    const btn = document.querySelector('.btn-large');
    const originalText = btn.textContent;
    btn.innerHTML = "⏳ Processing... Please wait"; // Better UI
    btn.disabled = true;

    fetch('export.php', {
        method: 'POST',
        body: formData 
    })
    .then(async response => {
        // BUG FIX: Check if server sent an error message instead of a PDF
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const errData = await response.json();
            throw new Error(errData.error || "Server processing error");
        }
        
        if (!response.ok) throw new Error('Network error or library missing.');
        return response.blob();
    })
    .then(blob => {
        if (blob.size === 0) throw new Error("Empty file generated.");

        // Create PDF Download Link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Booklet-Ready-Export.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        btn.textContent = originalText;
        btn.disabled = false;
        alert('✅ PDF exported successfully!');
    })
    .catch(error => {
        console.error('Export Error:', error);
        btn.textContent = originalText;
        btn.disabled = false;
        // Show actual error to the user so they know what went wrong
        alert('❌ Export Failed: ' + error.message + '\n\nMake sure FPDF/FPDI libraries are in your folder!');
    });
}