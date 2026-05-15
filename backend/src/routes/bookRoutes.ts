import express from 'express';
import { listBooks, getBook, getPage, addBookmark } from '../controllers/bookController.js';

const router = express.Router();

// List all books
router.get('/', listBooks);

// Get specific book
router.get('/:id', getBook);

// Get specific page
router.get('/:id/pages/:pageNum', getPage);

// Add bookmark
router.post('/:id/bookmarks', addBookmark);

export default router;