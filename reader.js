pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

let pdfDoc = null;
let totalPages = 0;
let currentBookUrl = '';
let uploadErrorMessage = ''; 

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

// Upload local PDF & Send to Server with PROGRESS BAR
async function uploadPDF(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Reset previous states
    currentBookUrl = '';
    uploadErrorMessage = '';
    
    const statusEl = document.getElementById('loadingStatus');
    const progressContainer = document.getElementById('uploadProgressContainer');
    const progressBar = document.getElementById('uploadProgressBar');

    statusEl.textContent = '⏳ Reading locally...';
    if(progressContainer) progressContainer.style.display = 'none';

    // 1. Load locally for instant view
    try {
        const arrayBuffer = await file.arrayBuffer();
        pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        totalPages = pdfDoc.numPages;
        setupViewerAfterLoad(file.name);

        // 2. Upload to server in background USING XHR (For Progress Tracking)
        const formData = new FormData();
        formData.append('pdf', file);
        
        statusEl.textContent = '⏳ Uploading for Share Link... 0%';
        if(progressContainer) progressContainer.style.display = 'block';
        if(progressBar) progressBar.style.width = '0%';

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'upload.php', true);

        // Progress event listener
        xhr.upload.onprogress = function(e) {
            if (e.lengthComputable) {
                const percentComplete = Math.round((e.loaded / e.total) * 100);
                if(progressBar) progressBar.style.width = percentComplete + '%';
                statusEl.textContent = `⏳ Uploading... ${percentComplete}%`;
            }
        };

        // When upload finishes completely
        xhr.onload = function() {
            if(progressContainer) progressContainer.style.display = 'none';

            if (xhr.status === 200) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    if (data.success) {
                        currentBookUrl = data.path; 
                        statusEl.textContent = `✅ Book Loaded & Link Ready to Share!`;
                    } else {
                        throw new Error(data.error || "Server rejected the upload");
                    }
                } catch (e) {
                    uploadErrorMessage = "Server Error (Is your file > 2MB?): " + xhr.responseText.substring(0, 50);
                    statusEl.textContent = `⚠️ Local View OK, BUT Share Upload Failed: ${e.message}`;
                }
            } else {
                uploadErrorMessage = `HTTP Error ${xhr.status}: File might be too large for PHP config.`;
                statusEl.textContent = `⚠️ Local View OK, BUT Share Upload Failed: ${uploadErrorMessage}`;
            }
        };

        // On Network Error
        xhr.onerror = function() {
            if(progressContainer) progressContainer.style.display = 'none';
            uploadErrorMessage = "Network connection failed during upload.";
            statusEl.textContent = `⚠️ Local View OK, BUT Share Upload Failed: Network Error`;
        };

        xhr.send(formData);

    } catch (error) {
        statusEl.textContent = '❌ Error loading PDF file natively';
    }
}

// Common function to setup UI after PDF is loaded
async function setupViewerAfterLoad(bookName) {
    document.getElementById('navigationControls').style.display = 'flex';
    document.getElementById('extraControls').style.display = 'flex'; 
    document.getElementById('totalPages').textContent = totalPages;
    await renderPages();
}

// 3D Render Pages Logic
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
    if (uploadErrorMessage) {
        alert("❌ SHARE FAILED: " + uploadErrorMessage + "\n\n💡 PRO TIP: Aapki PDF 2MB se badi hai kya? Agar haan, toh apne XAMPP/Server mein php.ini file kholkar 'upload_max_filesize = 50M' karein.");
        return;
    }
    
    if (!currentBookUrl) {
        alert("⏳ File abhi server par upload ho rahi hai... Progress bar check kariye!");
        return;
    }

    const shareUrl = window.location.origin + window.location.pathname + '?book=' + encodeURIComponent(currentBookUrl);
    const shareBtn = document.getElementById('shareBtn');
    
    navigator.clipboard.writeText(shareUrl).then(() => {
        shareBtn.textContent = '✅ Link Copied!';
        setTimeout(() => shareBtn.textContent = '🔗 Share Link', 2000);
    }).catch(err => {
        alert("Failed to copy URL. Here is the link: \n" + shareUrl);
    });
}