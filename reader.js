pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

let pdfDoc = null;
let totalPages = 0;

// Upload PDF and Initialize
async function uploadPDF(event) {
    const file = event.target.files[0];
    if (!file) return;

    const statusEl = document.getElementById('loadingStatus');
    statusEl.textContent = 'Loading book... Please wait.';

    try {
        const arrayBuffer = await file.arrayBuffer();
        pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        totalPages = pdfDoc.numPages;

        document.getElementById('totalPages').textContent = totalPages;
        document.getElementById('navigationControls').style.display = 'flex';

        await renderPages();
        statusEl.textContent = `✅ Loaded: ${file.name} (${totalPages} pages)`;
    } catch (error) {
        console.error('Error loading PDF:', error);
        statusEl.textContent = '❌ Error loading PDF. Ensure it is a valid PDF file.';
    }
}

// Render 3D Pages Logic
async function renderPages() {
    const viewer = document.getElementById('bookViewer');
    
    // Create the base HTML structure
    viewer.innerHTML = `
        <div class="book">
            <div id="pages" class="pages"></div>
        </div>
    `;
    
    const pagesContainer = document.getElementById('pages');

    // Loop through all PDF pages and render them onto canvases
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

    // NAYA LOGIC: Agar PDF mein odd (19, 21 etc) pages hain, toh end mein ek "The End" page jodo
    if (totalPages % 2 !== 0) {
        const endPageDiv = document.createElement('div');
        endPageDiv.className = 'page';
        // Sundar UI for 'The End' page
        endPageDiv.innerHTML = `
            <div style="display:flex; height:100%; width:100%; align-items:center; justify-content:center; background:#f7fafc; color:#a0aec0; font-size:28px; font-weight:bold; font-family:sans-serif; flex-direction:column;">
                <span style="font-size: 50px; margin-bottom: 15px;">📚</span>
                <span>The End</span>
            </div>
        `;
        pagesContainer.appendChild(endPageDiv);
    }

    // Apply the Flip Animation Logic
    const pageElements = document.getElementsByClassName('page');
    
    for(let i = 0; i < pageElements.length; i++) {
        if (i % 2 === 0) {
            pageElements[i].style.zIndex = (pageElements.length - i);
        }
        
        pageElements[i].pageNum = i + 1;
        pageElements[i].onclick = function() {
            if (this.pageNum % 2 === 0) {
                this.classList.remove('flipped');
                if(this.previousElementSibling) {
                    this.previousElementSibling.classList.remove('flipped');
                }
            } else {
                this.classList.add('flipped');
                if(this.nextElementSibling) {
                    this.nextElementSibling.classList.add('flipped');
                }
            }
        }
    }

    // NAYA LOGIC: Sab set hone ke baad book ko smoothly show karo jisse flashback na aaye
    setTimeout(() => {
        const bookElement = document.querySelector('.book');
        if(bookElement) {
            bookElement.classList.add('loaded');
        }
    }, 150); // halka sa delay taaki CSS properly apply ho jaye
}

// Navigation via Next/Prev buttons
function previousPage() {
    const flippedPages = document.querySelectorAll('.page.flipped');
    if (flippedPages.length > 0) {
        flippedPages[flippedPages.length - 1].click();
    }
}

function nextPage() {
    const unflippedOdd = document.querySelector('.page:nth-child(odd):not(.flipped)');
    if (unflippedOdd) {
        unflippedOdd.click();
    }
}