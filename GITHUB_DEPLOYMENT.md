# 🚀 GitHub Pages Deployment Guide

## Quick Publish to GitHub

### Step 1: Create a New Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** button (top right) → **New repository**
3. Name it: `NewsletterQ12025` (or any name you prefer)
4. Make it **Public** (required for free GitHub Pages)
5. Click **Create repository**

### Step 2: Upload Your Files

**Option A: Using GitHub Web Interface (Easiest)**

1. In your new repository, click **uploading an existing file**
2. Drag and drop ALL these files:
   - `index.html`
   - `translations.js`
   - `README.md`
   - `LICENSE`
   - `.gitignore`
   - Your entire `assets/` folder (if you have one)
3. Scroll down and click **Commit changes**

**Option B: Using Git Command Line**

```bash
# Navigate to your project folder
cd /path/to/your/newsletter

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Multilingual New Heart Newsletter"

# Connect to your GitHub repo (replace USERNAME and REPO_NAME)
git remote add origin https://github.com/USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. In your repository, click **Settings** (top navigation)
2. Click **Pages** (left sidebar)
3. Under "Source", select:
   - Branch: **main**
   - Folder: **/ (root)**
4. Click **Save**

### Step 4: Access Your Published Newsletter

After 1-2 minutes, your newsletter will be live at:

```
https://USERNAME.github.io/REPO_NAME/
```

For example: `https://newheartministry.github.io/NewsletterQ12025/`

## 📂 Required File Structure for GitHub

```
your-repository/
├── index.html              ✅ Main newsletter file
├── translations.js         ✅ All translations (EN, KO, HE, TH, VI)
├── README.md              ✅ Project documentation
├── LICENSE                ✅ MIT License
├── .gitignore             ✅ Git ignore rules
├── INTEGRATION_GUIDE.md   ✅ Integration instructions
├── GITHUB_DEPLOYMENT.md   ✅ This file
└── assets/                📁 Your images and documents
    ├── img/
    │   ├── ariel.jpeg
    │   ├── han.jpeg
    │   ├── keziah.jpeg
    │   ├── parichat.jpeg
    │   ├── choi.jpeg
    │   └── Thailand-poster.jpeg
    ├── kids/
    │   ├── kids-bg-1.jpeg
    │   ├── kids-bg-2.jpeg
    │   └── kids-bg-3.jpeg
    └── docs/
        ├── Palanca_Donation_Chart_55_VNH_14.docx
        └── Palanca Donation Chart #56 (TNH #1).docx
```

## ✅ Pre-Publish Checklist

Before publishing, make sure you have:

- [x] **index.html** - Complete newsletter with all sections
- [x] **translations.js** - All 5 language translations
- [x] **assets/** folder with all images
  - [ ] Founders' images/videos
  - [ ] Story images (ariel, han, keziah, parichat, choi)
  - [ ] Thailand poster
  - [ ] Kids background images (3 images)
  - [ ] Palanca documents
- [x] **README.md** - Project overview
- [x] **LICENSE** - MIT License
- [x] **.gitignore** - Git ignore rules

## 🔧 Updating Your Published Newsletter

After initial publish, to make updates:

**Via Web Interface:**
1. Go to your file on GitHub
2. Click the pencil icon (Edit)
3. Make your changes
4. Click **Commit changes**
5. Wait 1-2 minutes for GitHub Pages to rebuild

**Via Git Command Line:**
```bash
# Make your changes to files

# Stage changes
git add .

# Commit with a message
git commit -m "Update translations for Thai language"

# Push to GitHub
git push origin main
```

## 🌐 Custom Domain (Optional)

Want to use your own domain like `newsletter.newheart.org`?

1. In repository Settings → Pages
2. Under "Custom domain", enter your domain
3. Click **Save**
4. In your domain's DNS settings, add:
   - Type: **CNAME**
   - Name: **newsletter** (or subdomain of choice)
   - Value: **USERNAME.github.io**

## 🐛 Troubleshooting

### Newsletter not showing after 5 minutes?
- Check Settings → Pages shows "Your site is published"
- Clear your browser cache (Ctrl+Shift+Delete)
- Try accessing in incognito/private mode

### Images not loading?
- Verify all image paths in `index.html` match your folder structure
- Image paths are case-sensitive (`image.jpg` ≠ `Image.jpg`)
- All images must be in the repository

### Translations not working?
- Check browser console (F12) for JavaScript errors
- Verify `translations.js` file is in the same folder as `index.html`
- Ensure `<script src="translations.js"></script>` is in your HTML

### GitHub Pages is not an option in Settings?
- Repository must be **Public** (not Private)
- You must have verified your email with GitHub

## 📱 Testing Your Newsletter

Test all these before publishing:

1. ✅ All 5 language buttons work (EN, KO, HE, TH, VI)
2. ✅ All images load correctly
3. ✅ All 5 story modals open and close
4. ✅ Video embeds work
5. ✅ Download links for Palanca charts work
6. ✅ Mobile responsive (test on phone/tablet)
7. ✅ Hebrew displays RTL correctly

## 🎉 Success!

Once published, share your multilingual newsletter with:

```
🌍 English: https://USERNAME.github.io/REPO_NAME/?lang=en
🇰🇷 Korean: https://USERNAME.github.io/REPO_NAME/?lang=ko
🇮🇱 Hebrew: https://USERNAME.github.io/REPO_NAME/?lang=he
🇹🇭 Thai: https://USERNAME.github.io/REPO_NAME/?lang=th
🇻🇳 Vietnamese: https://USERNAME.github.io/REPO_NAME/?lang=vi
```

## 📞 Need Help?

- GitHub Pages Documentation: https://docs.github.com/en/pages
- GitHub Community Forum: https://github.community

---

**God bless your ministry! 🙏**

*Built with ❤️ for the New Heart Global Family*
