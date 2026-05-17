pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

let pdfDoc = null;
let totalPages = 0;
let currentBookUrl = '';

// Check if a book URL is shared when page loads
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedBookPath = urlParams.get('book');
    if (sharedBookPath) {
        loadPDFFromServer(sharedBookPath);
    }
});

// Load PDF from Server (When accessed via shared link)
async function loadPDFFromServer(path) {
    const statusEl = document.getElementById('loadingStatus');
    statusEl.textContent = '⏳ Loading shared book...';
    currentBookUrl = path;

    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error("File not found on server");
        const arrayBuffer = await response.arrayBuffer();
        
        pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        totalPages = pdfDoc.numPages;
        
        setupViewerAfterLoad('Shared Book');
    } catch (error) {
        console.error('Error:', error);
        statusEl.textContent = '❌ Shared book not found or expired.';
    }
}

// Upload local PDF & Send to Server for Sharing
async function uploadPDF(event) {
    const file = event.target.files[0];
    if (!file) return;

    const statusEl = document.getElementById('loadingStatus');
    statusEl.textContent = '⏳ Loading & Uploading book...';

    // 1. Load locally for instant view
    try {
        const arrayBuffer = await file.arrayBuffer();
        pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        totalPages = pdfDoc.numPages;
        setupViewerAfterLoad(file.name);

        // 2. Upload to server in background so user can share it
        const formData = new FormData();
        formData.append('pdf', file);
        
        fetch('upload.php', { method: 'POST', body: formData })
        .then(res => res.json())
        .then(data => {
            if(data.success) currentBookUrl = data.path; // Store server path
        }).catch(err => console.error("Upload for sharing failed", err));

    } catch (error) {
        statusEl.textContent = '❌ Error loading PDF file';
    }
}

// Common function to setup UI after PDF is loaded
async function setupViewerAfterLoad(bookName) {
    document.getElementById('navigationControls').style.display = 'flex';
    document.getElementById('extraControls').style.display = 'flex'; // Show Fullscreen & Share
    document.getElementById('loadingStatus').textContent = `✅ Loaded: ${bookName}`;
    await renderPages();
}
async function renderPages() {
    const viewer = document.getElementById('bookViewer');
    viewer.innerHTML = `<div class="book"><div id="pages" class="pages"></div></div>`;
    const pagesContainer = document.getElementById('pages');

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        const page = await pdfDoc.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.5 }); 
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: context, viewport: viewport }).promise;

        const pageDiv = document.createElement('div');
        pageDiv.className = 'page';
        pageDiv.appendChild(canvas);
        pagesContainer.appendChild(pageDiv);
    }

    if (totalPages % 2 !== 0) {
        const endPageDiv = document.createElement('div');
        endPageDiv.className = 'page';
        endPageDiv.innerHTML = `
            <div style="display:flex; height:100%; width:100%; align-items:center; justify-content:center; background:#f7fafc; color:#a0aec0; font-size:28px; font-weight:bold; font-family:sans-serif; flex-direction:column;">
                <span style="font-size: 50px; margin-bottom: 15px;">📚</span>
                <span>The End</span>
            </div>`;
        pagesContainer.appendChild(endPageDiv);
    }

    const pageElements = document.getElementsByClassName('page');
    for(let i = 0; i < pageElements.length; i++) {
        if (i % 2 === 0) {
            pageElements[i].style.zIndex = (pageElements.length - i);
        }
        pageElements[i].pageNum = i + 1;
        pageElements[i].onclick = function() {
            if (this.pageNum % 2 === 0) {
                this.classList.remove('flipped');
                if(this.previousElementSibling) this.previousElementSibling.classList.remove('flipped');
            } else {
                this.classList.add('flipped');
                if(this.nextElementSibling) this.nextElementSibling.classList.add('flipped');
            }
        }
    }

    setTimeout(() => {
        const bookElement = document.querySelector('.book');
        if(bookElement) bookElement.classList.add('loaded');
    }, 150);
}

function previousPage() {
    const flippedPages = document.querySelectorAll('.page.flipped');
    if (flippedPages.length > 0) flippedPages[flippedPages.length - 1].click();
}

function nextPage() {
    const unflippedOdd = document.querySelector('.page:nth-child(odd):not(.flipped)');
    if (unflippedOdd) unflippedOdd.click();
}
function toggleFullScreen() {
    const viewer = document.getElementById('bookViewer');
    if (!document.fullscreenElement) {
        viewer.requestFullscreen().catch(err => {
            alert(`Error enabling fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

function shareBook() {
    const shareBtn = document.getElementById('shareBtn');
    if (!currentBookUrl) {
        alert("Please wait for the book to finish uploading to the server before sharing!");
        return;
    }

    // Create the full shareable URL
    const shareUrl = window.location.origin + window.location.pathname + '?book=' + encodeURIComponent(currentBookUrl);
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareUrl).then(() => {
        shareBtn.textContent = '✅ Link Copied!';
        setTimeout(() => shareBtn.textContent = '🔗 Share Link', 2000);
    }).catch(err => {
        alert("Failed to copy URL. Here is the link: \n" + shareUrl);
    });
}