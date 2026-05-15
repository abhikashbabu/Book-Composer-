# 📚 Book Composer - GitHub Pages Deployment Guide

## ✅ Quick Deployment Steps

Your Book Composer is ready to deploy on GitHub Pages! Follow these simple steps:

---

## 🚀 **Method 1: Deploy Using Git Command (Recommended)**

### Step 1: Build the Project
```bash
cd frontend
npm install
npm run build
```

### Step 2: Create gh-pages Branch (First Time Only)
```bash
git checkout --orphan gh-pages
git rm -rf .
git commit --allow-empty -m "Init gh-pages branch"
git push -u origin gh-pages
```

### Step 3: Deploy Your Built Files
```bash
git checkout main
git subtree push --prefix frontend/dist origin gh-pages
```

**✅ Your site is now LIVE at:** `https://abhikashbabu.github.io/Book-Composer-/`

---

## 🚀 **Method 2: Using npm Package gh-pages**

### Step 1: Install gh-pages
```bash
cd frontend
npm install --save-dev gh-pages
```

### Step 2: Update package.json
Add these scripts to `frontend/package.json`:
```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "deploy": "npm run build && gh-pages -d dist",
  "deploy-clean": "gh-pages -d dist -m \"Deploy to GitHub Pages\""
}
```

### Step 3: Deploy
```bash
cd frontend
npm run deploy
```

**✅ Your site is now LIVE at:** `https://abhikashbabu.github.io/Book-Composer-/`

---

## 🚀 **Method 3: Manual GitHub Pages Setup**

### Step 1: Build Locally
```bash
cd frontend
npm install
npm run build
```

### Step 2: Push to GitHub
```bash
git add .
git commit -m "Prepare for GitHub Pages deployment"
git push origin main
```

### Step 3: Configure GitHub Pages
1. Go to: https://github.com/abhikashbabu/Book-Composer-/settings/pages
2. Under "Source", select:
   - **Branch:** `main`
   - **Folder:** `/frontend/dist`
3. Click **Save**

**✅ Your site is now LIVE at:** `https://abhikashbabu.github.io/Book-Composer-/`

---

## ✅ **Verify Deployment**

After deploying (takes 2-5 minutes):

1. **Check GitHub Pages Settings:**
   - https://github.com/abhikashbabu/Book-Composer-/settings/pages
   - Look for green ✅ checkmark saying "Your site is live"

2. **Visit Your Live Site:**
   - https://abhikashbabu.github.io/Book-Composer-/

3. **Test Features:**
   - ✅ Upload PDF
   - ✅ View pages
   - ✅ Toggle zoom
   - ✅ Night mode

---

## 🔧 **Vite Config Updated**

Your `frontend/vite.config.ts` is already updated with:
```typescript
base: '/Book-Composer-/',
```

This ensures all assets load correctly on GitHub Pages.

---

## 📋 **Deployment Checklist**

- ✅ Frontend code is ready
- ✅ Backend API endpoints defined
- ✅ Vite config updated for GitHub Pages
- ✅ Build configuration complete
- ✅ All dependencies listed in package.json

---

## 🌐 **Final Live URL**

```
https://abhikashbabu.github.io/Book-Composer-/
```

---

## ⚠️ **Important Notes**

1. **GitHub Pages hosts static files only** - Backend API won't work on GitHub Pages
2. **For backend APIs**, deploy backend separately using:
   - Heroku
   - Railway
   - Render
   - AWS
   - DigitalOcean

3. **Update API URL** in `frontend/src/components/PrintExport/PrintExport.tsx`:
   ```typescript
   const API_URL = process.env.REACT_APP_API_URL || 'https://your-backend-url.com';
   ```

---

**Happy Deploying! 🚀📚**
