# 📚 Book Composer - Pure HTML5, CSS, JavaScript & PHP

**NO React, NO npm, NO build tools** - Pure vanilla technologies!

## 🎯 Features

### 📖 Reader
- Upload and read PDF files
- Smooth 3D page flip animations
- Dual-page book spread view
- Zoom controls (50% - 200%)
- Night mode / Dark theme
- Page navigation

### 🖨️ Print Export
- Multiple paper sizes (A4, A5, Letter, Legal, Custom)
- Double-sided (Duplex) printing
- Custom margins and binding
- Crop and bleed marks
- Color profiles (RGB, CMYK, Grayscale)
- Print-ready PDF generation

### 🎨 Features
- Light/Dark theme toggle
- Responsive design
- Fast and lightweight
- No dependencies
- Easy deployment

---

## 🚀 Quick Start

### Option 1: Using PHP Built-in Server
```bash
cd Book-Composer-
php -S localhost:8000
Open: http://localhost:8000

Option 2: Using Apache/Nginx
Copy all files to your web server directory and access via browser.

Option 3: GitHub Pages
All static files are compatible with GitHub Pages.

📁 File Structure
Code
Book-Composer-/
├── index.html          # Home page
├── reader.html         # PDF reader
├── export.html         # Print export
├── style.css           # Global styles
├── script.js           # Global scripts
├── reader.js           # Reader functionality
├── export.js           # Export functionality
├── upload.php          # PDF upload handler
├── export.php          # Export handler
├── bookmark.php        # Bookmark management
└── README.md           # This file
🛠️ Technologies
HTML5 - Semantic markup
CSS3 - Modern styling with animations
Vanilla JavaScript - No frameworks
PDF.js - PDF rendering
PHP - Backend processing
📚 Usage
1. Upload PDF
Go to Reader page
Click "📤 Upload PDF"
Select your PDF file
2. Read
Navigate pages with buttons
Use zoom controls
Toggle night mode
View dual-page spreads
3. Export
Go to Print Export page
Configure settings
Click "📥 Export PDF"
Download print-ready file
🎨 Customization
Colors
Edit :root variables in style.css:

CSS
:root {
  --primary-color: #4299e1;
  --bg-primary: #ffffff;
  /* ... more variables ... */
}
Paper Sizes
Edit paperSizes object in export.js:

JavaScript
const paperSizes = {
    'A4': { width: 210, height: 297 },
    'Custom': { width: 100, height: 100 }
};
🚀 Deployment
GitHub Pages
Push to GitHub
Enable Pages in settings
Select main branch
Your site is live!
Shared Hosting
FTP all files to server
Make sure PHP is enabled
Access via your domain
Local Testing
bash
php -S 0.0.0.0:8000
📝 API Endpoints
Upload PDF
Code
POST /upload.php
File: PDF file
Export PDF
Code
POST /export.php
JSON: Export settings
Bookmarks
Code
GET  /bookmark.php?action=list
POST /bookmark.php?action=save
🌐 Browser Support
Chrome 90+
Firefox 88+
Safari 14+
Edge 90+
📦 File Sizes
style.css - ~15 KB
script.js - ~3 KB
reader.js - ~4 KB
export.js - ~3 KB
Total - ~25 KB (excluding PDF.js library)
✅ Checklist
✅ No npm required
✅ No build process
✅ No minification needed
✅ Pure vanilla JavaScript
✅ Mobile responsive
✅ Dark mode support
✅ Fast loading
✅ Easy to customize
🤝 Contributing
Feel free to fork, modify, and improve!

📄 License
MIT License - Free to use!

Made with ❤️ for book lovers 📚✨
