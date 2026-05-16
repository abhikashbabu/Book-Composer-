// Paper sizes
const paperSizes = {
    'A4': { width: 210, height: 297 }
};

// Update preview panel text
function updatePreview() {
    const paperSize = document.getElementById('paperSize').value;
    
    let sizeText = paperSize;
    if (paperSizes[paperSize]) {
        const size = paperSizes[paperSize];
        sizeText = `${paperSize} (${size.width} × ${size.height} mm)`;
    }

    document.getElementById('previewSize').textContent = sizeText;
}

// Export PDF Function (Handles file upload to PHP)
function exportPDF() {
    const fileInput = document.getElementById('exportSourceFile');
    
    // Check if user selected a file
    if (!fileInput.files[0]) {
        alert("Please select a PDF file to re-format first!");
        return;
    }

    const settings = {
        paperSize: document.getElementById('paperSize').value
    };

    // Create FormData to send both the file and settings
    const formData = new FormData();
    formData.append('sourceFile', fileInput.files[0]);
    formData.append('settings', JSON.stringify(settings));

    const btn = document.querySelector('.btn-large');
    const originalText = btn.textContent;
    btn.textContent = "Processing... Please wait";
    btn.disabled = true;

    // Send data to backend (export.php)
    fetch('export.php', {
        method: 'POST',
        body: formData 
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.blob();
    })
    .then(blob => {
        // Create a temporary link to download the returned PDF
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Booklet-Ready-Export.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        // Reset button
        btn.textContent = originalText;
        btn.disabled = false;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error exporting PDF. Make sure your PHP server is running and FPDF/FPDI libraries are installed.');
        btn.textContent = originalText;
        btn.disabled = false;
    });
}

// Initialize preview on page load
updatePreview();