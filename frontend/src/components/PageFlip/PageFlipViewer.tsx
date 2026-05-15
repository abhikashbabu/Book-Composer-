import React, { useState, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import '../styles/PageFlip.css';

interface PageFlipViewerProps {
  pdfDoc: any;
  currentPage: number;
  zoom: number;
}

const PageFlipViewer: React.FC<PageFlipViewerProps> = ({ pdfDoc, currentPage, zoom }) => {
  const [canvases, setCanvases] = useState<HTMLCanvasElement[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderPages = async () => {
      const newCanvases: HTMLCanvasElement[] = [];

      for (let i = currentPage; i <= Math.min(currentPage + 1, pdfDoc.numPages); i++) {
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: zoom / 100 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')!;
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;

        newCanvases.push(canvas);
      }

      setCanvases(newCanvases);
    };

    renderPages().catch(console.error);
  }, [pdfDoc, currentPage, zoom]);

  return (
    <div className="page-flip-container" ref={containerRef}>
      <div className="book-spread">
        {canvases.map((canvas, index) => (
          <div key={index} className="page page-flip-animation">
            <div className="page-wrapper">
              {canvas && (
                <img 
                  src={canvas.toDataURL()} 
                  alt={`Page ${currentPage + index}`}
                  className="page-image"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageFlipViewer;