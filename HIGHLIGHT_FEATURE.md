# Highlight Feature Documentation

## Overview
The highlight feature allows users to define word-color pairs that will automatically highlight matching words in confirmed transcriptions. Highlights are also preserved in PDF exports.

## Features

### Predefined Color Palette
10 predefined colors with optimal contrast:
- **Yellow** (#FFEB3B) - Black text
- **Green** (#4CAF50) - White text
- **Blue** (#2196F3) - White text
- **Red** (#F44336) - White text
- **Purple** (#9C27B0) - White text
- **Orange** (#FF9800) - White text
- **Pink** (#E91E63) - White text
- **Cyan** (#00BCD4) - White text
- **Lime** (#CDDC39) - Black text
- **Teal** (#009688) - White text

### Key Capabilities
1. **Add Highlights**: Enter a word and select a color
2. **Case-Insensitive**: Matches words regardless of case
3. **Word Boundaries**: Only matches whole words (not partial)
4. **Persistent Storage**: Rules saved in browser localStorage
5. **PDF Export**: Highlights preserved in exported PDFs
6. **Live Preview**: See highlights immediately in confirmed transcripts

## Files Created/Modified

### New Files
1. **`app/utils/highlightUtils.tsx`**
   - `HIGHLIGHT_COLORS`: Array of predefined colors with contrast ratios
   - `applyHighlights()`: Applies highlights to React components
   - `applyHighlightsToHTML()`: Generates HTML with highlights for PDF export

2. **`app/components/HighlightSettings.tsx`**
   - UI component for managing highlight rules
   - Add new word-color pairs
   - View and remove existing highlights
   - Color preview for each rule

### Modified Files
1. **`app/translations.ts`**
   - Added translations for highlight UI:
     - `highlightSettings`: "Highlight Settings" / "Korostusasetukset"
     - `addHighlight`: "Add Highlight" / "Lisää korostus"
     - `word`: "Word" / "Sana"
     - `color`: "Color" / "Väri"
     - `highlightAdded`: Success message
     - `highlightRemoved`: Info message
     - `wordPlaceholder`: Input placeholder
     - `selectColor`: Dropdown label

2. **`app/hooks/useSettings.ts`**
   - Added `HighlightRule` interface (id, word, color)
   - Added `highlightRules` state
   - `addHighlightRule()`: Adds new rule and persists to localStorage
   - `removeHighlightRule()`: Removes rule and updates localStorage
   - Load/save rules from localStorage on mount

3. **`app/components/TranscriptDisplay.tsx`**
   - Added `highlightRules` prop
   - Uses `applyHighlights()` to render highlighted text
   - Maintains existing functionality for partial/confirmed transcripts

4. **`app/components/SettingsPanel.tsx`**
   - Added `HighlightSettings` component to settings panel
   - Passes highlight rules and handlers
   - Positioned after Export Settings section

5. **`app/utils/exportUtils.ts`**
   - Updated `exportAsPDF()` to accept `highlightRules` parameter
   - Uses `applyHighlightsToHTML()` to include highlights in PDF
   - Maintains existing PDF formatting

6. **`app/page.tsx`**
   - Added `handleAddHighlight()`: Shows success notification
   - Added `handleRemoveHighlight()`: Shows info notification
   - Passes highlight rules to `TranscriptDisplay`
   - Passes highlight rules to `exportAsPDF()`
   - Passes highlight handlers to `SettingsPanel`

## Usage Instructions

### Adding a Highlight
1. Open Settings panel (click ⚙️ Settings button)
2. Scroll to "🎨 Highlight Settings" section
3. Enter a word in the text input
4. Select a color from the dropdown
5. Click "➕ Add Highlight"
6. The word will now be highlighted in all confirmed transcripts

### Removing a Highlight
1. Find the highlight in the list
2. Click the "✕" button next to it
3. The highlight will be removed immediately

### Viewing Highlights
- Highlights appear in **confirmed transcripts** only (not in partial/real-time)
- Each word is wrapped with the selected background color
- Text color is automatically chosen for optimal contrast
- Highlights are case-insensitive but preserve original case

### Exporting with Highlights
- Both **PDF** and **CSV** exports include the text as-is
- **PDF exports** preserve the visual highlights with colors
- **CSV exports** contain plain text without formatting

## Technical Details

### Data Structure
```typescript
interface HighlightRule {
  id: string;        // Unique identifier (timestamp)
  word: string;      // Word to highlight (trimmed)
  color: string;     // Hex color value (e.g., "#FFEB3B")
}
```

### Storage
- Rules stored in localStorage as JSON
- Key: `highlight_rules`
- Loaded on app initialization
- Updated on add/remove operations

### Highlighting Algorithm
1. Build regex pattern from all rules: `\b(word1)\b|\b(word2)\b`
2. Use global, case-insensitive matching
3. Split text into parts (plain + highlighted)
4. Render each part as text or styled `<span>`

### Performance
- Regex compiled once per render
- Efficient word boundary detection
- No regex in CSV export (text-only)
- HTML generation for PDF is fast

## Testing Checklist

- [ ] Add a highlight rule
- [ ] Verify word appears highlighted in transcripts
- [ ] Test case-insensitive matching (e.g., "test" matches "Test", "TEST")
- [ ] Test word boundaries (e.g., "test" doesn't match "testing")
- [ ] Remove a highlight rule
- [ ] Add multiple highlights with different colors
- [ ] Export PDF and verify highlights appear
- [ ] Export CSV and verify text is clean
- [ ] Refresh page and verify rules persist
- [ ] Test with Finnish language
- [ ] Test on mobile responsive view

## Future Enhancements (Optional)
- [ ] Custom color picker
- [ ] Import/export highlight rules
- [ ] Regex pattern support
- [ ] Multi-word phrase support
- [ ] Highlight statistics/counts
- [ ] Search within transcripts
- [ ] Category/tag system for highlights
