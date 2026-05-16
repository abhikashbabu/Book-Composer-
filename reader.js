// PDF.js setup
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

let pdfDoc = null;
let currentPage = 1;
let zoom = 100;
let totalPages = 0;

// Upload PDF
async function uploadPDF(event) {
    const file = event.target.files[0];
    if (!file) return;

    const statusEl = document.getElementById('loadingStatus');
    statusEl.textContent = 'Loading...';

    try {
        const arrayBuffer = await file.arrayBuffer();
        pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        totalPages = pdfDoc.numPages;

        document.getElementById('totalPages').textContent = totalPages;
        document.getElementById('navigationControls').style.display = 'flex';

        currentPage = 1;
        zoom = 100;
        renderPages();

        statusEl.textContent = `✅ Loaded: ${file.name} (${totalPages} pages)`;
    } catch (error) {
        console.error('Error loading PDF:', error);
        statusEl.textContent = '❌ Error loading PDF';
        alert('Error loading PDF file');
    }
}

// Render pages
async function renderPages() {
    const viewer = document.getElementById('bookViewer');
    viewer.innerHTML = '';

    const pageNumbers = [currentPage, currentPage + 1];
    const spread = document.createElement('div');
    spread.className = 'book-spread';

    for (const pageNum of pageNumbers) {
        if (pageNum > totalPages) continue;

        try {
            const page = await pdfDoc.getPage(pageNum);
            const viewport = page.getViewport({ scale: zoom / 100 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({
                canvasContext: context,
                viewport: viewport
            }).promise;

            const pageDiv = document.createElement('div');
            pageDiv.className = 'page';
            const img = document.createElement('img');
            img.className = 'page-image';
            img.src = canvas.toDataURL();
            pageDiv.appendChild(img);
            spread.appendChild(pageDiv);

        } catch (error) {
            console.error(`Error rendering page ${pageNum}:`, error);
        }
    }

    viewer.appendChild(spread);
    updatePageInfo();
}

// Navigation
function previousPage() {
    currentPage = Math.max(1, currentPage - 2);
    renderPages();
}

function nextPage() {
    if (currentPage + 1 < totalPages) {
        currentPage += 2;
        renderPages();
    }
}

// Zoom
function zoomIn() {
    zoom = Math.min(200, zoom + 10);
    document.getElementById('zoomLevel').textContent = zoom;
    if (pdfDoc) renderPages();
}

function zoomOut() {
    zoom = Math.max(50, zoom - 10);
    document.getElementById('zoomLevel').textContent = zoom;
    if (pdfDoc) renderPages();
}

// Update page info
function updatePageInfo() {
    document.getElementById('currentPage').textContent = currentPage;
    document.getElementById('nextPage').textContent = Math.min(currentPage + 1, totalPages);
}
