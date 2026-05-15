import React, { useState, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import PageFlipViewer from '../PageFlip/PageFlipViewer';
import '../styles/BookReader.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PDFDocument {
  numPages: number;
}

const BookReader: React.FC = () => {
  const [pdfDoc, setPdfDoc] = useState<PDFDocument | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setPdfDoc(pdf);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error loading PDF:', error);
      alert('Error loading PDF file');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage(Math.max(1, currentPage - 2));
  };

  const handleNextPage = () => {
    if (pdfDoc && currentPage < pdfDoc.numPages) {
      setCurrentPage(Math.min(pdfDoc.numPages - 1, currentPage + 2));
    }
  };

  const handleZoom = (direction: 'in' | 'out') => {
    if (direction === 'in') {
      setZoom(Math.min(200, zoom + 10));
    } else {
      setZoom(Math.max(50, zoom - 10));
    }
  };

  return (
    <div className="book-reader">
      <div className="book-controls">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          className="file-input"
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Upload PDF'}
        </button>

        {pdfDoc && (
          <div className="controls-group">
            <button onClick={handlePrevPage} className="btn btn-secondary">
              ← Previous
            </button>
            <span className="page-counter">
              Page {currentPage} - {currentPage + 1} of {pdfDoc.numPages}
            </span>
            <button onClick={handleNextPage} className="btn btn-secondary">
              Next →
            </button>

            <button onClick={() => handleZoom('out')} className="btn btn-secondary">
              🔍-
            </button>
            <span className="zoom-display">{zoom}%</span>
            <button onClick={() => handleZoom('in')} className="btn btn-secondary">
              🔍+
            </button>
          </div>
        )}
      </div>

      {pdfDoc && (
        <PageFlipViewer 
          pdfDoc={pdfDoc} 
          currentPage={currentPage}
          zoom={zoom}
        />
      )}

      {!pdfDoc && !isLoading && (
        <div className="empty-state">
          <p>📖 Upload a PDF file to start reading</p>
        </div>
      )}
    </div>
  );
};

export default BookReader;