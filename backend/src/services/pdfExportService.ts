import PDFDocument from 'pdfkit';

interface ExportOptions {
  paperSize: string;
  duplex: boolean;
  colorProfile: string;
  margins: { top: number; bottom: number; left: number; right: number };
  bindingMargin: number;
  includeCropMarks: boolean;
  includeBleedMarks: boolean;
}

const paperSizes: Record<string, [number, number]> = {
  'A4': [595, 842],
  'A5': [420, 595],
  'Letter': [612, 792],
  'Legal': [612, 1008],
};

export const generatePrintReady = async (options: ExportOptions): Promise<Buffer> => {
  const [width, height] = paperSizes[options.paperSize] || paperSizes['A4'];
  const doc = new PDFDocument({ size: [width, height] });
  
  const chunks: Buffer[] = [];
  
  return new Promise((resolve, reject) => {
    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);
    
    // Add sample content
    doc.fontSize(24).text('Print-Ready PDF Export', 50, 50);
    doc.fontSize(12).text(`Paper Size: ${options.paperSize}`, 50, 100);
    doc.fontSize(12).text(`Duplex: ${options.duplex ? 'Yes' : 'No'}`, 50, 120);
    doc.fontSize(12).text(`Color Profile: ${options.colorProfile}`, 50, 140);
    
    if (options.includeCropMarks) {
      // Add crop marks
      doc.lineWidth(0.5).strokeColor('black');
      doc.moveTo(0, 0).lineTo(20, 0);
      doc.moveTo(0, 0).lineTo(0, 20);
    }
    
    doc.end();
  });
};

export const getFormats = () => {
  return [
    { name: 'A4', width: 210, height: 297, unit: 'mm' },
    { name: 'A5', width: 148, height: 210, unit: 'mm' },
    { name: 'Letter', width: 8.5, height: 11, unit: 'inches' },
    { name: 'Legal', width: 8.5, height: 14, unit: 'inches' },
  ];
};

export const createBookletImpositions = (options: any) => {
  const { pageCount, paperSize, duplex } = options;
  const pages: number[][] = [];
  
  // Create page imposition layout
  for (let i = 0; i < pageCount; i += 4) {
    pages.push([pageCount - i - 1, i, i + 1, pageCount - i - 2]);
  }
  
  return {
    layout: 'booklet',
    paperSize,
    duplex,
    pages,
    totalSheetsNeeded: Math.ceil(pageCount / 4),
  };
};