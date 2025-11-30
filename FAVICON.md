# Favicon Generation Instructions

## Quick Start

1. Open `generate-favicon.html` in your browser
2. Download all three PNG files
3. Rename files as instructed
4. Place in `public/` folder

## Files Needed

- `public/icon.svg` ✅ (already created)
- `public/favicon-16x16.png` ⏳ (generate from HTML tool)
- `public/favicon-32x32.png` ⏳ (generate from HTML tool)  
- `public/apple-touch-icon.png` ⏳ (generate from HTML tool)
- `app/favicon.ico` ⏳ (optional, for legacy browser support)

## Generate .ico file (Optional)

Use one of these online tools to convert PNG to ICO:
- https://www.favicon-generator.org/
- https://realfavicongenerator.net/
- https://favicon.io/

Upload `favicon-32x32.png` and download as `favicon.ico`, then place in `app/` folder.

## Design

The favicon features:
- Purple to blue gradient background (#9C27B0 → #2196F3)
- White microphone icon (representing speech input)
- White sound wave lines (representing transcription output)
- Clean, modern, and recognizable at small sizes

## Already Configured

The following files are already updated with favicon metadata:
- ✅ `app/layout.tsx` - Icon metadata and manifest link
- ✅ `public/manifest.json` - PWA configuration
- ✅ `public/icon.svg` - Main icon file
- ✅ `public/generate-favicon.html` - PNG generation tool
