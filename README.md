# 📚 Book Composer - Pure HTML5, CSS, JavaScript & PHP

**Advanced digital book reading and publishing platform** with smooth page flip animations, 3D book effects, and professional print export features.

> **NO React, NO npm, NO build tools** - Pure vanilla technologies!

## ✨ Features

### 📖 Reader
- 📤 Upload and read PDF files
- 🎬 Smooth 3D page flip animations
- 📖 Dual-page book spread view
- 🔍 Zoom controls (50% - 200%)
- 🌙 Night mode / Dark theme
- ⬅️➡️ Easy page navigation

### 🖨️ Print Export
- 📏 Multiple paper sizes (A4, A5, Letter, Legal, Custom)
- 📋 Double-sided (Duplex) printing
- 📐 Custom margins and binding
- ✂️ Crop and bleed marks
- 🎨 Color profiles (RGB, CMYK, Grayscale)
- ✅ Print-ready PDF generation

### 🎨 Design
- 💡 Light/Dark theme toggle
- 📱 Responsive design
- ⚡ Fast and lightweight
- 🔗 Zero dependencies
- 🚀 Easy deployment

---

## 🚀 Quick Start Guide

### Option 1: PHP Built-in Server (Recommended for Testing)
```bash
# Clone repository
git clone https://github.com/abhikashbabu/Book-Composer-.git
cd Book-Composer-

# Start PHP server
php -S localhost:8000

# Open browser
# http://localhost:8000
```

### Option 2: Apache/Nginx Server
```bash
# Copy all files to your web server directory
# For Apache: /var/www/html/
# For Nginx: /usr/share/nginx/html/

# Then access via: http://your-domain.com
```

### Option 3: GitHub Pages (Static Hosting)
1. Push to GitHub
2. Go to Settings → Pages
3. Select main branch
4. Enable GitHub Pages
5. Your site will be live at: `https://username.github.io/Book-Composer-`

---

## 📁 File Structure

```
Book-Composer-/
├── index.html          # 🏠 Home page
├── reader.html         # 📖 PDF reader interface
├── export.html         # 🖨️ Print export interface
│
├── style.css           # 🎨 Global styles & animations
├── script.js           # ⚙️ Global scripts
├── reader.js           # 📖 Reader functionality
├── export.js           # 🖨️ Export functionality
│
├── upload.php          # 📤 PDF upload handler
├── export.php          # 💾 Export handler
├── bookmark.php        # 🔖 Bookmark management
│
├── README.md           # 📚 This file
├── LICENSE             # 📄 MIT License
└── DEPLOYMENT.md       # 🚀 Deployment guide
```

---

## 🛠️ Technologies Used

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Semantic markup & structure |
| **CSS3** | Modern styling & animations |
| **Vanilla JavaScript** | No frameworks, pure logic |
| **PDF.js** | PDF rendering & display |
| **PHP** | Backend file processing |

---

## 📖 How to Use

### 1️⃣ Upload PDF
- Go to **Reader** page
- Click **"📤 Upload PDF"** button
- Select your PDF file
- Wait for upload to complete

### 2️⃣ Read Book
- Navigate pages with **← →** buttons
- Use **🔍 Zoom** controls (50% - 200%)
- Toggle **🌙 Night Mode** for dark theme
- View dual-page spreads
- Add **🔖 Bookmarks**

### 3️⃣ Export for Print
- Go to **Print Export** page
- Configure:
  - Paper size (A4, A5, etc.)
  - Margins & binding
  - Color profile (RGB/CMYK/Grayscale)
  - Crop marks
- Click **"📥 Export PDF"**
- Download print-ready file

---

## ⚙️ Configuration

### Customize Colors
Edit `:root` variables in `style.css`:
```css
:root {
  --primary-color: #4299e1;
  --bg-primary: #ffffff;
  --bg-secondary: #f7fafc;
  --text-primary: #2d3748;
  --text-secondary: #718096;
  --accent-color: #ed8936;
  /* ... add more as needed ... */
}
```

### Add Custom Paper Sizes
Edit `paperSizes` object in `export.js`:
```javascript
const paperSizes = {
    'A4': { width: 210, height: 297 },
    'A5': { width: 148, height: 210 },
    'Letter': { width: 216, height: 279 },
    'Custom': { width: 100, height: 100 }
};
```

---

## 🌐 Deployment Options

### 1. **Shared Hosting (cPanel/Plesk)**
```bash
1. FTP all files to public_html/ folder
2. Ensure PHP is enabled (usually default)
3. Access via your domain: https://your-domain.com
4. Upload permissions required for /uploads folder
```

### 2. **Subdomain on cPanel**
```bash
1. Go to cPanel → Addon Domains / Subdomains
2. Create new subdomain: book.your-domain.com
3. Point to public folder
4. FTP files there
5. Access at: https://book.your-domain.com
```

### 3. **GitHub Pages**
```bash
1. Push all files to GitHub
2. Settings → Pages
3. Select main branch
4. Site will be live at: https://username.github.io/Book-Composer-
5. Note: PHP features won't work on GitHub Pages (static only)
```

### 4. **Local Development**
```bash
# Using PHP built-in server
php -S 0.0.0.0:8000

# Using Node.js http-server
npx http-server .

# Using Python
python -m http.server 8000
```

### 5. **Docker Container**
```bash
# Create Dockerfile
FROM php:8.0-apache
COPY . /var/www/html/
RUN docker-compose up -d
```

---

## 🔌 API Endpoints

### Upload PDF
```
POST /upload.php
Parameters:
  - file: PDF file (multipart/form-data)
Response: { success: true, filename: "..." }
```

### Export PDF
```
POST /export.php
Parameters:
  - content: HTML content
  - settings: { paperSize, margins, color, etc. }
Response: { success: true, filename: "..." }
```

### Bookmarks Management
```
GET  /bookmark.php?action=list&file=filename
POST /bookmark.php?action=save
POST /bookmark.php?action=delete
```

---

## 📊 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| IE | Any | ❌ Not supported |

---

## 📦 Performance

| File | Size |
|------|------|
| style.css | ~8-10 KB |
| script.js | ~3 KB |
| reader.js | ~4 KB |
| export.js | ~3 KB |
| **Total** | **~20 KB** (excluding PDF.js library) |

---

## ✅ Key Highlights

- ✅ **No npm/build tools** - Direct run on any server
- ✅ **No framework bloat** - Pure vanilla code
- ✅ **Mobile responsive** - Works on all devices
- ✅ **Dark mode** - Eye-friendly theme
- ✅ **Fast loading** - Minimal dependencies
- ✅ **Easy to deploy** - Copy & paste to server
- ✅ **Easy to customize** - Well-commented code
- ✅ **Production ready** - Professional features

---

## 🚀 Next Steps

1. **Test Locally**: `php -S localhost:8000`
2. **Customize**: Edit colors and settings
3. **Deploy**: Choose your hosting option above
4. **Share**: Tell others about Book Composer!

---

## 🤝 Contributing

Found a bug? Have an idea? Feel free to:
- Fork the repository
- Create a branch (`git checkout -b feature/amazing-feature`)
- Commit changes (`git commit -m 'Add amazing feature'`)
- Push to branch (`git push origin feature/amazing-feature`)
- Open a Pull Request

---

## 📄 License

**MIT License** - Free to use, modify, and distribute!

See [LICENSE](LICENSE) file for details.

---

## 📞 Support

- 📧 Create an [Issue](https://github.com/abhikashbabu/Book-Composer-/issues)
- 💬 Check [Discussions](https://github.com/abhikashbabu/Book-Composer-/discussions)
- 🌟 Star this repository if you like it!

---

**Made with ❤️ for book lovers 📚✨**

_Book Composer - Your Digital Reading & Publishing Platform_
