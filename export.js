// Paper sizes
const paperSizes = {
    'A4': { width: 210, height: 297 },
    'A5': { width: 148, height: 210 },
    'Letter': { width: 215.9, height: 279.4 },
    'Legal': { width: 215.9, height: 355.6 }
};

// Show/hide custom size input
document.getElementById('paperSize').addEventListener('change', function() {
    const customGroup = document.getElementById('customSizeGroup');
    if (this.value === 'Custom') {
        customGroup.style.display = 'block';
    } else {
        customGroup.style.display = 'none';
    }
    updatePreview();
});

// Update preview
function updatePreview() {
    const paperSize = document.getElementById('paperSize').value;
    const duplex = document.getElementById('duplex').checked;
    const colorProfile = document.getElementById('colorProfile').value;
    const marginTop = document.getElementById('marginTop').value;
    const marginBottom = document.getElementById('marginBottom').value;
    const marginLeft = document.getElementById('marginLeft').value;
    const marginRight = document.getElementById('marginRight').value;
    const bindingMargin = document.getElementById('bindingMargin').value;
    const cropMarks = document.getElementById('cropMarks').checked;
    const bleedMarks = document.getElementById('bleedMarks').checked;

    // Update preview
    let sizeText = paperSize;
    if (paperSize === 'Custom') {
        const width = document.getElementById('customWidth').value;
        const height = document.getElementById('customHeight').value;
        sizeText = `Custom (${width} × ${height} mm)`;
    } else if (paperSizes[paperSize]) {
        const size = paperSizes[paperSize];
        sizeText = `${paperSize} (${size.width} × ${size.height} mm)`;
    }

    document.getElementById('previewSize').textContent = sizeText;
    document.getElementById('previewMargins').textContent = `${marginTop}mm top, ${marginBottom}mm bottom, ${marginLeft}mm left, ${marginRight}mm right`;
    document.getElementById('previewColor').textContent = colorProfile;
    document.getElementById('previewDuplex').textContent = duplex ? 'Yes' : 'No';
    document.getElementById('previewBinding').textContent = `${bindingMargin}mm`;
    document.getElementById('previewCrop').textContent = cropMarks ? 'Yes' : 'No';
    document.getElementById('previewBleed').textContent = bleedMarks ? 'Yes' : 'No';
}

// Export PDF
function exportPDF() {
    const settings = {
        paperSize: document.getElementById('paperSize').value,
        customWidth: document.getElementById('customWidth').value,
        customHeight: document.getElementById('customHeight').value,
        duplex: document.getElementById('duplex').checked,
        colorProfile: document.getElementById('colorProfile').value,
        margin: {
            top: document.getElementById('marginTop').value,
            bottom: document.getElementById('marginBottom').value,
            left: document.getElementById('marginLeft').value,
            right: document.getElementById('marginRight').value
        },
        bindingMargin: document.getElementById('bindingMargin').value,
        cropMarks: document.getElementById('cropMarks').checked,
        bleedMarks: document.getElementById('bleedMarks').checked
    };

    // Send to backend
    fetch('export.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
    })
    .then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'book-export.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error exporting PDF');
    });
}

// Initialize preview
updatePreview();
