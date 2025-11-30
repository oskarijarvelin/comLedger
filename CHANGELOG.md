# Changelog

All notable changes to comLedger will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-30

### Added
- **Smart Text Highlighting System**
  - 10 predefined colors with bilingual names (English/Finnish)
  - Partial word matching for inflected forms
  - Visual indicator (˚) for partial matches
  - Configurable toggle for partial matching
  - Highlights preserved in PDF exports
  - Real-time highlighting in both partial and confirmed transcripts
  
- **Auto-save Functionality**
  - Partial transcripts automatically saved when stopping recording
  - Prevents data loss from incomplete transcriptions
  - Uses React useRef for reliable state tracking

- **Enhanced PDF Export**
  - Timestamped filenames: `comLedger_YYYY-MM-DD_HH-MM-SS.pdf`
  - Print-color-adjust CSS for reliable color preservation
  - Professional layout with metadata header
  - Highlight colors preserved in PDF output
  - Partial match indicators included

- **CSV Export Enhancement**
  - UTF-8 BOM for Excel compatibility
  - Proper quote escaping for CSV safety
  - Timestamped filenames

- **Comprehensive Documentation**
  - Detailed README with usage guide
  - ACCESSIBILITY.md with WCAG 2.1 AA compliance details
  - JSDoc comments throughout codebase
  - Code examples in documentation

- **SEO Optimization**
  - Enhanced meta tags with keywords
  - Open Graph protocol support
  - Twitter Card support
  - Proper structured data

- **Bilingual Support**
  - Complete Finnish localization
  - Color names translated to Finnish
  - UI labels and tooltips in both languages
  - 60+ translation keys

### Changed
- **Application Branding**
  - Renamed from "Scribe v2 Next.js Starter" to "comLedger"
  - Updated all references across the application
  - New favicon and metadata

- **Code Organization**
  - Enhanced component documentation
  - Improved TypeScript types and interfaces
  - Better separation of concerns
  - Comprehensive JSDoc comments

- **UI/UX Improvements**
  - Custom color picker with visual color circles
  - Better form validation and error messages
  - Improved mobile responsiveness
  - Enhanced keyboard navigation

### Fixed
- PDF export color preservation issue
- Partial transcript loss on disconnect
- Color picker dropdown styling on mobile
- Highlight matching for inflected words
- TypeScript strict mode compliance

### Technical
- **Dependencies**
  - Next.js 15.1.0
  - React 19.0.0
  - @elevenlabs/react 0.12.0
  - TypeScript 5.7.3

- **Architecture**
  - 8 modular React components
  - 2 custom hooks (useSettings, useMicrophones)
  - 2 utility modules (exportUtils, highlightUtils)
  - Centralized i18n system

- **Accessibility**
  - WCAG 2.1 Level AA compliant
  - Full keyboard navigation
  - Screen reader support
  - ARIA labels and live regions
  - Semantic HTML5

- **Browser Support**
  - Chrome/Edge 120+
  - Firefox 121+
  - Safari 17+
  - Mobile browsers (iOS/Android)

## [0.1.0] - 2024-XX-XX

### Added
- Initial release
- Real-time transcription with ElevenLabs Scribe v2
- Basic export functionality (CSV, PDF)
- Settings panel with audio controls
- Language selection (English/Finnish)
- Custom API key support
- Toast notifications
- Mobile responsive design

---

## Upgrade Guide

### From 0.1.0 to 1.0.0

1. **New Features**: The highlight system is automatically available in settings
2. **Settings**: All previous settings are preserved via localStorage
3. **No Breaking Changes**: Existing functionality remains unchanged
4. **New localStorage Keys**: 
   - `highlight_rules` - Array of highlight rules
   - `partial_match_highlight` - Boolean toggle

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
