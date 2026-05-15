import { Request, Response } from 'express';
import { generatePrintReady, getFormats, createBookletImpositions } from '../services/pdfExportService.js';

export const generatePrintPDF = async (req: Request, res: Response) => {
  try {
    const { paperSize, duplex, colorProfile, margins, bindingMargin, includeCropMarks, includeBleedMarks } = req.body;
    
    const pdfBuffer = await generatePrintReady({
      paperSize,
      duplex,
      colorProfile,
      margins,
      bindingMargin,
      includeCropMarks,
      includeBleedMarks,
    });
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="book-export.pdf"');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
};

export const getExportFormats = async (req: Request, res: Response) => {
  try {
    const formats = getFormats();
    res.json(formats);
  } catch (error) {
    console.error('Error fetching formats:', error);
    res.status(500).json({ error: 'Failed to fetch formats' });
  }
};

export const createImpositions = async (req: Request, res: Response) => {
  try {
    const { pageCount, paperSize, duplex } = req.body;
    
    const imposition = createBookletImpositions({
      pageCount,
      paperSize,
      duplex,
    });
    
    res.json(imposition);
  } catch (error) {
    console.error('Error creating impositions:', error);
    res.status(500).json({ error: 'Failed to create impositions' });
  }
};