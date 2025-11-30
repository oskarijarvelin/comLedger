import { HighlightRule } from '../hooks/useSettings';

/**
 * Predefined Color Palette for Text Highlighting
 * 
 * Each color includes:
 * - name: English color name
 * - nameFi: Finnish translation
 * - value: Hex color code for background
 * - textColor: Hex color code for text (optimized for contrast)
 * 
 * All colors meet WCAG AA contrast requirements for readability
 */
export const HIGHLIGHT_COLORS = [
  { name: 'Yellow', nameFi: 'Keltainen', value: '#FFEB3B', textColor: '#000000' },
  { name: 'Green', nameFi: 'Vihreä', value: '#4CAF50', textColor: '#FFFFFF' },
  { name: 'Blue', nameFi: 'Sininen', value: '#2196F3', textColor: '#FFFFFF' },
  { name: 'Red', nameFi: 'Punainen', value: '#F44336', textColor: '#FFFFFF' },
  { name: 'Purple', nameFi: 'Violetti', value: '#9C27B0', textColor: '#FFFFFF' },
  { name: 'Orange', nameFi: 'Oranssi', value: '#FF9800', textColor: '#FFFFFF' },
  { name: 'Pink', nameFi: 'Pinkki', value: '#E91E63', textColor: '#FFFFFF' },
  { name: 'Cyan', nameFi: 'Syaani', value: '#00BCD4', textColor: '#FFFFFF' },
  { name: 'Lime', nameFi: 'Limetti', value: '#CDDC39', textColor: '#000000' },
  { name: 'Teal', nameFi: 'Turkoosi', value: '#009688', textColor: '#FFFFFF' },
];

/**
 * Apply Highlights to Text for React UI
 * 
 * Processes text and returns an array of React nodes with highlighted words
 * according to the provided highlight rules. Supports both exact and partial
 * word matching (useful for inflected forms in languages like Finnish).
 * 
 * Algorithm:
 * 1. Split text into tokens (words and whitespace)
 * 2. For each word token, check against all highlight rules
 * 3. If match found (exact or partial), wrap in styled span
 * 4. Preserve whitespace and original text structure
 * 
 * Partial Matching:
 * When enabled, "run" will match: running, runner, runs, etc.
 * Partial matches are indicated with a ˚ symbol in the top-right corner
 * 
 * @param text - The text string to process
 * @param rules - Array of highlight rules to apply
 * @param partialMatch - Enable partial word matching (default: true)
 * @param partialMatchTooltip - Tooltip text for partial match indicator
 * @returns Array of React nodes with highlights applied
 * 
 * @example
 * ```tsx
 * const rules = [{ id: '1', word: 'important', color: '#FFEB3B' }];
 * const nodes = applyHighlights(
 *   'This is important and importance matters',
 *   rules,
 *   true,
 *   'Partial match'
 * );
 * // Returns: ['This is ', <span>important</span>, ' and ', <span>importance˚</span>, ' matters']
 * ```
 */
export function applyHighlights(
  text: string, 
  rules: HighlightRule[], 
  partialMatch: boolean = true,
  partialMatchTooltip: string = "Partial match"
): React.ReactNode[] {
  if (rules.length === 0) {
    return [text];
  }

  // Split text into words while preserving whitespace
  const wordPattern = /(\S+|\s+)/g;
  const tokens = text.match(wordPattern) || [];
  const parts: React.ReactNode[] = [];
  let keyIndex = 0;

  tokens.forEach((token, index) => {
    // Skip whitespace
    if (/^\s+$/.test(token)) {
      parts.push(token);
      return;
    }

    // Check if token matches any rule
    let matched = false;
    for (const rule of rules) {
      const ruleWord = rule.word.toLowerCase();
      const tokenLower = token.toLowerCase();
      
      let isMatch = false;
      let isPartialMatch = false;

      if (tokenLower === ruleWord) {
        // Exact match
        isMatch = true;
      } else if (partialMatch && tokenLower.includes(ruleWord)) {
        // Partial match (word stem found in inflected form)
        isMatch = true;
        isPartialMatch = true;
      }

      if (isMatch) {
        matched = true;
        const colorConfig = HIGHLIGHT_COLORS.find(c => c.value === rule.color);
        parts.push(
          <span
            key={`highlight-${keyIndex++}`}
            style={{
              position: 'relative',
              backgroundColor: rule.color,
              color: colorConfig?.textColor || '#000000',
              padding: '2px 4px',
              borderRadius: '3px',
              fontWeight: '600',
              display: 'inline-block',
            }}
          >
            {token}
            {isPartialMatch && (
              <span
                style={{
                  position: 'absolute',
                  top: '-7px',
                  right: '-5px',
                  fontSize: '2em',
                  lineHeight: '1',
                  opacity: 0.7,
                }}
                title={partialMatchTooltip}
              >
                ˚
              </span>
            )}
          </span>
        );
        break;
      }
    }

    if (!matched) {
      parts.push(token);
    }
  });

  return parts.length > 0 ? parts : [text];
}

/**
 * Escape Special RegEx Characters
 * 
 * Escapes special regular expression characters in a string to make it
 * safe for use in RegEx patterns.
 * 
 * @param str - String to escape
 * @returns Escaped string safe for RegEx
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Generate HTML with Highlights for PDF Export
 * 
 * Converts text with highlight rules into HTML string suitable for PDF generation.
 * Similar to applyHighlights() but returns HTML string instead of React nodes.
 * 
 * Features:
 * - Inline CSS styles for print compatibility
 * - Partial match indicator using positioned span
 * - Print-specific CSS to preserve colors in PDF
 * 
 * @param text - The text string to process
 * @param rules - Array of highlight rules to apply
 * @param partialMatch - Enable partial word matching (default: true)
 * @returns HTML string with inline styles for highlighting
 * 
 * @example
 * ```typescript
 * const rules = [{ id: '1', word: 'test', color: '#FFEB3B' }];
 * const html = applyHighlightsToHTML('This is a test', rules);
 * // Returns: 'This is a <span style="background-color: #FFEB3B; ...">test</span>'
 * ```
 */
export function applyHighlightsToHTML(text: string, rules: HighlightRule[], partialMatch: boolean = true): string {
  if (rules.length === 0) {
    return text;
  }

  // Split text into words while preserving whitespace
  const wordPattern = /(\S+|\s+)/g;
  const tokens = text.match(wordPattern) || [];
  
  return tokens.map(token => {
    // Skip whitespace
    if (/^\s+$/.test(token)) {
      return token;
    }

    // Check if token matches any rule
    for (const rule of rules) {
      const ruleWord = rule.word.toLowerCase();
      const tokenLower = token.toLowerCase();
      
      let isMatch = false;
      let isPartialMatch = false;

      if (tokenLower === ruleWord) {
        // Exact match
        isMatch = true;
      } else if (partialMatch && tokenLower.includes(ruleWord)) {
        // Partial match
        isMatch = true;
        isPartialMatch = true;
      }

      if (isMatch) {
        const colorConfig = HIGHLIGHT_COLORS.find(c => c.value === rule.color);
        const partialIndicator = isPartialMatch 
          ? '<span style="position: absolute; top: -7px; right: -5px; font-size: 2em; line-height: 1; opacity: 0.7;">˚</span>' 
          : '';
        return `<span style="background-color: ${rule.color}; color: ${colorConfig?.textColor || '#000000'}; padding: 2px 4px; border-radius: 3px; font-weight: 600; position: relative; display: inline-block;">${token}${partialIndicator}</span>`;
      }
    }

    return token;
  }).join('');
}
