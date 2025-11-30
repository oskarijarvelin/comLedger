# comLedger Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Installation
```bash
# Clone the repository
git clone https://github.com/oskarijarvelin/comLedger.git
cd comLedger

# Install dependencies
pnpm install

# Create .env.local file
echo ELEVENLABS_API_KEY=your_key_here > .env.local

# Start development server
pnpm dev
```

### Step 2: First Recording
1. Open http://localhost:3000
2. Click the **microphone button** (or settings icon)
3. Allow microphone access when prompted
4. Start speaking - see real-time transcription!
5. Click **Stop** when done

### Step 3: Export Your Transcripts
- **CSV**: Click "📥 CSV" for spreadsheet data
- **PDF**: Click "📄 PDF" for professional document

## 🎨 Using Highlights

### Add a Highlight Rule
1. Open **Settings** (⚙️ icon)
2. Scroll to **"Highlight Settings"**
3. Type a word (e.g., "important")
4. Click the color dropdown
5. Select a color from the visual picker
6. Click **"Add Highlight"**

### Partial Matching
- **ON** (default): "run" matches "running", "runner", "runs"
- **OFF**: Only exact matches "run"
- Toggle in Highlight Settings section
- Partial matches show ˚ symbol

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Tab** | Navigate between elements |
| **Enter/Space** | Activate buttons |
| **Esc** | Close modals/panels |
| **Arrow Keys** | Navigate dropdowns |

## 🌐 Language Switching

1. Click **Settings** (⚙️)
2. Find "Language" dropdown
3. Select **English** or **Suomi** (Finnish)
4. Interface updates immediately

## 🎤 Audio Settings

### Echo Cancellation
- **ON**: Removes echo/feedback
- **OFF**: Raw audio
- Recommended: **ON** for most use cases

### Noise Suppression
- **ON**: Reduces background noise
- **OFF**: Captures all ambient sound
- Recommended: **ON** for clearer transcription

### Microphone Selection
- Default: System default microphone
- Change via dropdown if you have multiple mics
- Settings persist across sessions

## 💾 Data Management

### Auto-Save
- Partial transcripts auto-saved when stopping
- No data loss from incomplete recordings
- Saved to confirmed transcripts section

### Export Formats

#### CSV Export
- **Format**: Timestamp, Text
- **Encoding**: UTF-8 with BOM (Excel-compatible)
- **Filename**: `transcripts_YYYY-MM-DD.csv`
- **Use case**: Data analysis, spreadsheets

#### PDF Export
- **Format**: Professional document with header
- **Filename**: `comLedger_YYYY-MM-DD_HH-MM-SS.pdf`
- **Features**: 
  - Timestamps
  - Highlights preserved
  - Print-optimized layout
- **Use case**: Presentations, reports, archiving

### Clear Transcripts
- Button in settings to remove all transcripts
- **Warning**: This action cannot be undone
- Useful for starting fresh sessions

## 🔑 API Key Options

### Option 1: Server-Side (Recommended)
```bash
# .env.local file
ELEVENLABS_API_KEY=your_key_here
```
- More secure
- Key hidden from browser
- Easier for team deployments

### Option 2: Custom Key (UI)
1. Click **Settings**
2. Find "ElevenLabs API Key" section
3. Click **"Set Custom API Key"**
4. Paste your key
5. Click **"Save"**
- Stored in browser localStorage
- Per-device configuration
- Useful for testing different keys

## 🎯 Best Practices

### For Best Transcription Quality
1. **Use a good microphone** - Headset or external mic
2. **Minimize background noise** - Quiet environment
3. **Enable echo cancellation** - Reduces feedback
4. **Enable noise suppression** - Clearer audio
5. **Speak clearly** - Normal pace, enunciate
6. **Use HTTPS** - Required for mobile devices

### For Effective Highlighting
1. **Use word stems** - "run" instead of "running"
2. **Enable partial matching** - Catches inflected forms
3. **Choose contrasting colors** - Easy to distinguish
4. **Limit to 5-7 rules** - Avoid visual clutter
5. **Test in export** - Verify PDF appearance

### For Organized Exports
1. **Name your sessions** - Use descriptive filenames
2. **Export regularly** - Don't accumulate too many
3. **Check highlights** - Preview before exporting
4. **Use appropriate format**:
   - CSV for data analysis
   - PDF for presentations

## 🐛 Troubleshooting

### Microphone Not Working
- **Check browser permissions**: Settings > Privacy > Microphone
- **Try different browser**: Chrome/Firefox recommended
- **Check device selection**: Correct mic in settings?
- **HTTPS required**: Mobile browsers need secure connection

### No Transcription Appearing
- **Check API key**: Valid and active?
- **Check console**: Press F12, look for errors
- **Try reconnecting**: Stop and start recording
- **Network issues?**: Check internet connection

### Highlights Not Working
- **Check rules**: Are highlight rules added?
- **Check toggle**: Is partial matching enabled?
- **Case sensitivity**: Matching is case-insensitive
- **PDF colors**: Enable print backgrounds in browser

### PDF Export Issues
- **Allow popups**: Browser may block print window
- **Colors not showing**: Check "Print backgrounds" in print dialog
- **Wrong filename**: Default suggested, you can change it
- **Print preview blank**: Wait a moment for loading

## 📱 Mobile Usage

### Requirements
- **HTTPS connection** (not http://)
- **Modern browser** (Safari, Chrome, Firefox)
- **Microphone permission** granted

### Tips
- **Landscape mode** for better layout
- **External keyboard** for easier navigation
- **Headphones with mic** for better quality
- **Wi-Fi recommended** for stability

## 🔒 Privacy & Security

### Data Storage
- **Local only**: All transcripts stored in browser
- **No server storage**: Nothing saved on remote servers
- **Clear anytime**: Delete all data via settings

### API Key Security
- **Server-side preferred**: .env.local file
- **Never commit keys**: Add to .gitignore
- **Rotate regularly**: Generate new keys periodically
- **One key per project**: Don't reuse across apps

## 📞 Getting Help

### Documentation
- **README.md**: Comprehensive guide
- **ACCESSIBILITY.md**: Accessibility features
- **CHANGELOG.md**: Version history

### Support Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and community help
- **Email**: Direct support from maintainer

### Useful Links
- **Repository**: https://github.com/oskarijarvelin/comLedger
- **ElevenLabs Docs**: https://elevenlabs.io/docs
- **Next.js Docs**: https://nextjs.org/docs

---

## 🎓 Advanced Tips

### Batch Processing
1. Record multiple sessions
2. Export all to CSV
3. Merge files in Excel/Python
4. Analyze combined data

### Highlight Strategies
- **🟡 Yellow**: Action items
- **🟢 Green**: Positive feedback
- **🔴 Red**: Issues/problems
- **🔵 Blue**: Important names
- **🟣 Purple**: Decisions made

### Workflow Integration
1. **Meeting notes**: Record, highlight key points, export PDF
2. **Interview transcription**: Record, highlight themes, export CSV
3. **Lecture notes**: Record, highlight concepts, export both formats
4. **Content creation**: Record ideas, highlight best parts, refine

---

**Need more help?** Open an issue on [GitHub](https://github.com/oskarijarvelin/comLedger/issues)!
