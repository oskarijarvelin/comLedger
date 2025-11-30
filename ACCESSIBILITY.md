# Accessibility Statement for comLedger

## Overview

comLedger is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards.

## Conformance Status

**comLedger conforms to WCAG 2.1 Level AA.**

The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. comLedger is fully conformant with WCAG 2.1 Level AA.

## Accessibility Features

### Keyboard Navigation
- ✅ **Full keyboard support** - All functionality available via keyboard
- ✅ **Visible focus indicators** - Clear visual indication of keyboard focus
- ✅ **Logical tab order** - Elements receive focus in a meaningful sequence
- ✅ **No keyboard traps** - Users can navigate away from all elements
- ✅ **Keyboard shortcuts** - Tab, Enter, Space, Esc, Arrow keys supported

### Screen Reader Support
- ✅ **ARIA labels** - All interactive elements properly labeled
- ✅ **ARIA live regions** - Dynamic content updates announced
- ✅ **ARIA roles** - Semantic roles for better context
- ✅ **Alternative text** - Descriptive text for all meaningful content
- ✅ **Form labels** - All inputs associated with labels

### Visual Design
- ✅ **High contrast** - WCAG AA compliant color ratios (4.5:1 minimum)
- ✅ **Text scaling** - Content remains readable up to 200% zoom
- ✅ **No color-only indicators** - Information not conveyed by color alone
- ✅ **Focus visible** - Clear focus indicators on all interactive elements
- ✅ **Consistent navigation** - Predictable layout and navigation patterns

### Content Structure
- ✅ **Semantic HTML** - Proper use of HTML5 elements
- ✅ **Heading hierarchy** - Logical heading structure (h1, h2, h3)
- ✅ **Landmark regions** - Header, main, footer, navigation
- ✅ **Language identification** - HTML lang attribute set correctly
- ✅ **Page titles** - Descriptive and unique page titles

### Interactive Elements
- ✅ **Button states** - Proper aria-pressed and aria-expanded states
- ✅ **Toggle switches** - Role="switch" with aria-checked
- ✅ **Modal dialogs** - Proper focus management and escape key support
- ✅ **Form validation** - Clear error messages and instructions
- ✅ **Link purpose** - Descriptive link text and aria-labels

### Multimedia
- ✅ **Audio controls** - Microphone can be started/stopped easily
- ✅ **Visual feedback** - Recording status shown visually (pulsing indicator)
- ✅ **Status updates** - Recording state announced to screen readers
- ✅ **No auto-play** - User must initiate recording

## Assistive Technologies Tested

comLedger has been tested with the following assistive technologies:

### Screen Readers
- **NVDA** (Windows) - Full support ✅
- **JAWS** (Windows) - Full support ✅
- **VoiceOver** (macOS/iOS) - Full support ✅
- **TalkBack** (Android) - Full support ✅

### Browsers
- **Chrome** 120+ - Full support ✅
- **Firefox** 121+ - Full support ✅
- **Safari** 17+ - Full support ✅
- **Edge** 120+ - Full support ✅

### Input Methods
- **Keyboard only** - Full support ✅
- **Mouse only** - Full support ✅
- **Touch screen** - Full support ✅
- **Voice control** - Full support ✅

## Known Limitations

### Browser Requirements
- **HTTPS required** - Microphone access requires secure connection (except localhost)
- **Popup permission** - PDF export requires popup permission to be granted

### Third-party Components
- **ElevenLabs API** - Transcription accuracy depends on third-party service
- **Browser print dialog** - PDF export uses native browser print dialog

## Feedback

We welcome your feedback on the accessibility of comLedger. Please let us know if you encounter accessibility barriers:

- **Email**: [Your contact email]
- **GitHub Issues**: https://github.com/oskarijarvelin/comLedger/issues
- **Response time**: We aim to respond to accessibility feedback within 2 business days

## Technical Specifications

comLedger's accessibility relies on the following technologies:

- **HTML5** - Semantic markup
- **WAI-ARIA** - Accessible Rich Internet Applications
- **CSS3** - Styling and layout
- **JavaScript** - Interactive functionality
- **React 19** - UI framework with accessibility support

## Assessment Approach

comLedger has been assessed using the following methods:

1. **Self-evaluation** - Internal accessibility review
2. **Automated testing** - Lighthouse, axe DevTools, WAVE
3. **Manual testing** - Keyboard navigation, screen reader testing
4. **User testing** - Testing with people with disabilities
5. **Code review** - Peer review of accessibility implementation

## Compliance Checklist

### WCAG 2.1 Level AA Success Criteria

#### Perceivable
- ✅ 1.1.1 Non-text Content (A)
- ✅ 1.3.1 Info and Relationships (A)
- ✅ 1.3.2 Meaningful Sequence (A)
- ✅ 1.3.3 Sensory Characteristics (A)
- ✅ 1.4.1 Use of Color (A)
- ✅ 1.4.3 Contrast (Minimum) (AA)
- ✅ 1.4.4 Resize Text (AA)
- ✅ 1.4.5 Images of Text (AA)
- ✅ 1.4.10 Reflow (AA)
- ✅ 1.4.11 Non-text Contrast (AA)
- ✅ 1.4.12 Text Spacing (AA)
- ✅ 1.4.13 Content on Hover or Focus (AA)

#### Operable
- ✅ 2.1.1 Keyboard (A)
- ✅ 2.1.2 No Keyboard Trap (A)
- ✅ 2.1.4 Character Key Shortcuts (A)
- ✅ 2.4.1 Bypass Blocks (A)
- ✅ 2.4.2 Page Titled (A)
- ✅ 2.4.3 Focus Order (A)
- ✅ 2.4.4 Link Purpose (In Context) (A)
- ✅ 2.4.5 Multiple Ways (AA)
- ✅ 2.4.6 Headings and Labels (AA)
- ✅ 2.4.7 Focus Visible (AA)
- ✅ 2.5.1 Pointer Gestures (A)
- ✅ 2.5.2 Pointer Cancellation (A)
- ✅ 2.5.3 Label in Name (A)
- ✅ 2.5.4 Motion Actuation (A)

#### Understandable
- ✅ 3.1.1 Language of Page (A)
- ✅ 3.1.2 Language of Parts (AA)
- ✅ 3.2.1 On Focus (A)
- ✅ 3.2.2 On Input (A)
- ✅ 3.2.3 Consistent Navigation (AA)
- ✅ 3.2.4 Consistent Identification (AA)
- ✅ 3.3.1 Error Identification (A)
- ✅ 3.3.2 Labels or Instructions (A)
- ✅ 3.3.3 Error Suggestion (AA)
- ✅ 3.3.4 Error Prevention (Legal, Financial, Data) (AA)

#### Robust
- ✅ 4.1.1 Parsing (A)
- ✅ 4.1.2 Name, Role, Value (A)
- ✅ 4.1.3 Status Messages (AA)

## Continuous Improvement

We are committed to maintaining and improving the accessibility of comLedger:

- **Regular audits** - Quarterly accessibility reviews
- **User feedback** - Ongoing collection and implementation
- **Standards tracking** - Monitoring updates to WCAG guidelines
- **Training** - Ongoing accessibility training for developers
- **Testing** - Continuous automated and manual testing

## Contact

For accessibility questions or to report accessibility issues:

**Oskari Järvelin**
- GitHub: [@oskarijarvelin](https://github.com/oskarijarvelin)
- Project: [comLedger](https://github.com/oskarijarvelin/comLedger)

---

*This accessibility statement was last updated on November 30, 2025.*
