interface Book {
  id: string;
  title: string;
  author: string;
  pages: number;
  uploadedAt: Date;
}

interface Bookmark {
  id: string;
  bookId: string;
  page: number;
  note?: string;
  createdAt: Date;
}

// Mock database
const books: Book[] = [];
const bookmarks: Bookmark[] = [];

export const getAllBooks = async (): Promise<Book[]> => {
  return books;
};

export const getBookById = async (id: string): Promise<Book | undefined> => {
  return books.find(b => b.id === id);
};

export const getPageContent = async (bookId: string, pageNum: number): Promise<any> => {
  const book = await getBookById(bookId);
  
  if (!book || pageNum > book.pages) {
    return null;
  }
  
  return {
    bookId,
    pageNumber: pageNum,
    content: `Page ${pageNum} content`,
  };
};

export const saveBookmark = async (bookId: string, page: number, note?: string): Promise<Bookmark> => {
  const bookmark: Bookmark = {
    id: Math.random().toString(36),
    bookId,
    page,
    note,
    createdAt: new Date(),
  };
  
  bookmarks.push(bookmark);
  return bookmark;
};