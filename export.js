function updatePreview() {
    const paperSize = document.getElementById('paperSize').value;
    document.getElementById('previewSize').textContent = `${paperSize} (210 × 297 mm)`;
}

function exportPDF() {
    const fileInput = document.getElementById('exportSourceFile');
    
    if (!fileInput || !fileInput.files[0]) {
        alert("Please select a PDF file to re-format first!");
        return;
    }

    const settings = {
        paperSize: document.getElementById('paperSize').value
    };

    const formData = new FormData();
    formData.append('sourceFile', fileInput.files[0]);
    formData.append('settings', JSON.stringify(settings));

    const btn = document.querySelector('.btn-large');
    const originalText = btn.textContent;
    btn.textContent = "⏳ Processing... Please wait";
    btn.disabled = true;

    fetch('export.php', {
        method: 'POST',
        body: formData 
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.blob();
    })
    .then(blob => {
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
        console.error('Error:', error);
        alert('❌ Error exporting PDF. Check PHP server & FPDF/FPDI files.');
        btn.textContent = originalText;
        btn.disabled = false;
    });
}

updatePreview();