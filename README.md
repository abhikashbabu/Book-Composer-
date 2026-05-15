# 📚 Book Composer - Advanced Digital Book Reading & Publishing Platform

A modern web-based platform for reading digital books with realistic page flip animations and professional print export capabilities. Experience immersive 3D page turning, dual-page viewing modes, and export books for professional printing.

## ✨ Features

### 📖 Reader Experience
- **Realistic 3D Page Flip Animation** - Smooth, natural page turning with CSS 3D transforms
- **Dual-Page Viewing** - Read books in authentic book-spread format
- **Front & Back Cover Effects** - Professional hardcover-style presentation
- **Smooth Transitions** - Elegant animations between pages
- **PDF Upload & Rendering** - Import any PDF file for reading
- **Zoom Controls** - 50% to 200% zoom levels
- **Night Mode** - Dark theme for comfortable reading
- **Bookmark Feature** - Save and resume reading sessions
- **Responsive Design** - Works on desktop, tablet, and mobile

### 🖨️ Publishing & Print Export
- **Multiple Paper Sizes** - A4, A5, Letter, Legal, and custom dimensions
- **Duplex Booklet Printing** - Double-sided print layouts
- **PDF Imposition Engine** - Professional page arrangement
- **Custom Margins & Binding** - Configure layout spacing
- **Print-Ready PDF Generation** - Export with professional settings
- **Crop & Bleed Marks** - Professional printing marks
- **Color Profiles** - RGB, CMYK, Grayscale support
- **Fold & Layout Presets** - Pre-configured printing templates

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/abhikashbabu/Book-Composer-.git
cd Book-Composer-
```

2. **Setup Frontend**
```bash
cd frontend
npm install
npm run dev
```

3. **Setup Backend** (in another terminal)
```bash
cd backend
npm install
npm run dev
```

4. **Access the application**
```
Frontend: http://localhost:3000
Backend API: http://localhost:3001
```

## 📋 Project Structure

```
Book-Composer-/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BookReader/
│   │   │   │   └── BookReader.tsx
│   │   │   ├── PageFlip/
│   │   │   │   └── PageFlipViewer.tsx
│   │   │   ├── PrintExport/
│   │   │   │   └── PrintExport.tsx
│   │   │   └── Navigation/
│   │   │       └── Navigation.tsx
│   │   ├── styles/
│   │   │   ├── BookReader.css
│   │   │   ├── PrintExport.css
│   │   │   └── Navigation.css
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── exportRoutes.ts
│   │   │   └── bookRoutes.ts
│   │   ├── controllers/
│   │   │   ├── exportController.ts
│   │   │   └── bookController.ts
│   │   ├── services/
│   │   │   ├── pdfExportService.ts
│   │   │   └── bookService.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **pdf.js** - PDF rendering
- **Three.js** - 3D page flip animations
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **pdf-lib** - PDF manipulation
- **PDFKit** - PDF generation
- **Sharp** - Image processing
- **TypeScript** - Type safety

## 📱 API Endpoints

### Export Services
- `POST /api/export/print` - Generate print-ready PDF
- `POST /api/export/impositions` - Create booklet layouts
- `GET /api/export/formats` - List paper sizes

### Book Management
- `GET /api/books` - List all books
- `GET /api/books/:id` - Get book details
- `GET /api/books/:id/pages/:pageNum` - Get specific page
- `POST /api/books/:id/bookmarks` - Save bookmark

## 🎯 Use Cases

✅ **eBooks** - Professional digital book reading  
✅ **Magazines** - Magazine and journal publishing  
✅ **Educational Materials** - Textbooks and course materials  
✅ **Catalogs** - Product and service catalogs  
✅ **Notes & Journals** - Personal note-taking  
✅ **Printable Booklets** - Professional booklet printing  

## 🎨 Page Flip Animation

The page flip effect uses CSS 3D transforms and JavaScript animations for smooth, realistic page turning:

```typescript
// Smooth easing function for natural movement
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

// Page rotation animation
const rotateY = easeOutCubic(progress) * 180;
```

## 🖨️ Print Export Workflow

1. **Configure Export** - Select paper size, margins, and layout
2. **Generate Imposition** - Calculate page arrangement
3. **Add Printing Marks** - Include crop and bleed marks
4. **Export PDF** - Generate print-ready PDF file
5. **Print** - Send to professional printer

## 🔧 Configuration

### Paper Sizes
- **A4** - 210 × 297 mm
- **A5** - 148 × 210 mm
- **Letter** - 8.5 × 11 inches
- **Legal** - 8.5 × 14 inches
- **Custom** - User-defined dimensions

### Print Settings
- Margin configuration (top, bottom, left, right)
- Binding spine width
- Gutter offset
- Bleed area (5mm default)

## 📚 Features Roadmap

- [ ] Advanced search and indexing
- [ ] Text highlighting and annotations
- [ ] Social sharing features
- [ ] Multi-user collaboration
- [ ] Audio narration support
- [ ] Interactive media embedding
- [ ] DRM protection options
- [ ] Analytics dashboard

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋 Support

For issues, questions, or suggestions, please:
- Open an GitHub issue
- Contact the development team
- Check documentation at `/docs`

## 👨‍💻 Author

**Abhikash Babu**  
GitHub: [@abhikashbabu](https://github.com/abhikashbabu)

---

**Built with ❤️ for book lovers and publishers worldwide**
