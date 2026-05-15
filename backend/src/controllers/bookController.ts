import { Request, Response } from 'express';
import { getAllBooks, getBookById, getPageContent, saveBookmark } from '../services/bookService.js';

export const listBooks = async (req: Request, res: Response) => {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (error) {
    console.error('Error listing books:', error);
    res.status(500).json({ error: 'Failed to list books' });
  }
};

export const getBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await getBookById(id);
    
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    res.json(book);
  } catch (error) {
    console.error('Error getting book:', error);
    res.status(500).json({ error: 'Failed to get book' });
  }
};

export const getPage = async (req: Request, res: Response) => {
  try {
    const { id, pageNum } = req.params;
    const page = await getPageContent(id, Number(pageNum));
    
    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }
    
    res.json(page);
  } catch (error) {
    console.error('Error getting page:', error);
    res.status(500).json({ error: 'Failed to get page' });
  }
};

export const addBookmark = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { page, note } = req.body;
    
    const bookmark = await saveBookmark(id, page, note);
    res.json(bookmark);
  } catch (error) {
    console.error('Error adding bookmark:', error);
    res.status(500).json({ error: 'Failed to add bookmark' });
  }
};