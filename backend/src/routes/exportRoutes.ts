import express from 'express';
import { generatePrintPDF, getExportFormats, createImpositions } from '../controllers/exportController.js';

const router = express.Router();

// Generate print-ready PDF
router.post('/print', generatePrintPDF);

// Get available export formats
router.get('/formats', getExportFormats);

// Create booklet impositions
router.post('/impositions', createImpositions);

export default router;