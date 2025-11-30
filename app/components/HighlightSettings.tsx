import { useState, useEffect, useRef } from 'react';
import { Translations, Language } from '../translations';
import { HighlightRule } from '../hooks/useSettings';
import { HIGHLIGHT_COLORS } from '../utils/highlightUtils';

interface HighlightSettingsProps {
  t: Translations;
  language: Language;
  highlightRules: HighlightRule[];
  partialMatchHighlight: boolean;
  onAddHighlight: (word: string, color: string) => void;
  onRemoveHighlight: (id: string) => void;
  onTogglePartialMatch: () => void;
}

/**
 * Highlight Settings Component
 * 
 * Provides UI for managing word highlighting rules with the following features:
 * - Add/remove highlight rules with word-color pairs
 * - Visual color picker with bilingual color names
 * - Partial word matching toggle
 * - Click-outside detection for dropdown
 * 
 * @component
 */
export default function HighlightSettings({
  t,
  language,
  highlightRules,
  partialMatchHighlight,
  onAddHighlight,
  onRemoveHighlight,
  onTogglePartialMatch,
}: HighlightSettingsProps) {
  const [newWord, setNewWord] = useState('');
  const [selectedColor, setSelectedColor] = useState(HIGHLIGHT_COLORS[0].value);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false);
      }
    };

    if (showColorPicker) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showColorPicker]);

  const handleAdd = () => {
    const word = newWord.trim();
    if (word) {
      onAddHighlight(word, selectedColor);
      setNewWord('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const selectedColorConfig = HIGHLIGHT_COLORS.find(c => c.value === selectedColor) || HIGHLIGHT_COLORS[0];

  return (
    <div style={{
      marginTop: "1rem",
      padding: "1rem",
      backgroundColor: "rgba(255, 193, 7, 0.1)",
      borderRadius: "8px",
      border: "1px solid rgba(255, 193, 7, 0.3)"
    }}>
      <strong style={{ color: "var(--foreground)", display: "block", marginBottom: "1rem" }}>
        🎨 {t.highlightSettings}
      </strong>

      {/* Partial Match Toggle */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem",
        padding: "0.75rem",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: "6px"
      }}>
        <div>
          <div style={{ color: "var(--foreground)", fontWeight: "500" }}>
            {t.partialMatching}
          </div>
          <div style={{ fontSize: "0.75rem", color: "rgba(128, 128, 128, 0.7)" }}>
            {t.partialMatchingDesc}
          </div>
        </div>
        <button
          onClick={onTogglePartialMatch}
          role="switch"
          aria-checked={partialMatchHighlight}
          aria-label={t.partialMatching}
          style={{
            width: "50px",
            height: "28px",
            borderRadius: "14px",
            border: "none",
            cursor: "pointer",
            backgroundColor: partialMatchHighlight ? "#4CAF50" : "rgba(128, 128, 128, 0.3)",
            position: "relative",
            transition: "all 0.3s ease",
          }}
        >
          <div style={{
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            backgroundColor: "white",
            position: "absolute",
            top: "3px",
            left: partialMatchHighlight ? "25px" : "3px",
            transition: "all 0.3s ease",
          }} />
        </button>
      </div>

      {/* Add new highlight */}
      <div style={{ 
        marginBottom: "1rem",
        padding: "0.75rem",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: "6px"
      }}>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
          <input
            type="text"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t.wordPlaceholder}
            style={{
              flex: "1 1 150px",
              padding: "0.5rem",
              fontSize: "0.9rem",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "6px",
              color: "var(--foreground)",
            }}
            aria-label={t.word}
          />
          
          {/* Color Picker Button */}
          <div ref={colorPickerRef} style={{ position: "relative", flex: "1 1 120px" }}>
            <button
              type="button"
              onClick={() => setShowColorPicker(!showColorPicker)}
              style={{
                width: "100%",
                padding: "0.5rem",
                fontSize: "0.9rem",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "6px",
                color: "var(--foreground)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                justifyContent: "space-between",
              }}
              aria-label={t.color}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{
                  display: "inline-block",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  backgroundColor: selectedColorConfig.value,
                  border: "2px solid rgba(255, 255, 255, 0.5)",
                  flexShrink: 0,
                }} />
                <span>{language === 'fi' ? selectedColorConfig.nameFi : selectedColorConfig.name}</span>
              </div>
              <span style={{ fontSize: "0.7rem" }}>▼</span>
            </button>
            
            {/* Color Dropdown */}
            {showColorPicker && (
              <div style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                marginTop: "0.25rem",
                backgroundColor: "#1a1a1a",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "6px",
                zIndex: 1000,
                maxHeight: "250px",
                overflowY: "auto",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
              }}>
                {HIGHLIGHT_COLORS.map(color => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => {
                      setSelectedColor(color.value);
                      setShowColorPicker(false);
                    }}
                    style={{
                      width: "100%",
                      padding: "0.6rem",
                      fontSize: "0.9rem",
                      backgroundColor: selectedColor === color.value ? "rgba(255, 255, 255, 0.1)" : "transparent",
                      color: "var(--foreground)",
                      border: "none",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      textAlign: "left",
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (selectedColor !== color.value) {
                        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedColor !== color.value) {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    <span style={{
                      display: "inline-block",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: color.value,
                      border: "2px solid rgba(255, 255, 255, 0.5)",
                      flexShrink: 0,
                    }} />
                    <span>{language === 'fi' ? color.nameFi : color.name}</span>
                    {selectedColor === color.value && (
                      <span style={{ marginLeft: "auto", fontSize: "0.8rem" }}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleAdd}
            disabled={!newWord.trim()}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.9rem",
              cursor: newWord.trim() ? "pointer" : "not-allowed",
              backgroundColor: newWord.trim() ? "#FFC107" : "rgba(128, 128, 128, 0.2)",
              color: newWord.trim() ? "#000" : "rgba(128, 128, 128, 0.5)",
              border: "none",
              borderRadius: "6px",
              fontWeight: "600",
              opacity: newWord.trim() ? 1 : 0.5,
            }}
          >
            ➕ {t.addHighlight}
          </button>
        </div>
      </div>

      {/* List of existing highlights */}
      {highlightRules.length > 0 && (
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "0.5rem" 
        }}>
          {highlightRules.map(rule => {
            const colorConfig = HIGHLIGHT_COLORS.find(c => c.value === rule.color);
            return (
              <div
                key={rule.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.5rem",
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  borderRadius: "6px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span
                    style={{
                      backgroundColor: rule.color,
                      color: colorConfig?.textColor || '#000000',
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontWeight: "600",
                      fontSize: "0.9rem",
                    }}
                  >
                    {rule.word}
                  </span>
                  <span style={{ 
                    fontSize: "0.8rem", 
                    color: "rgba(128, 128, 128, 0.7)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem"
                  }}>
                    <span style={{
                      display: "inline-block",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: rule.color,
                      border: "1px solid rgba(255, 255, 255, 0.3)"
                    }} />
                    {language === 'fi' ? colorConfig?.nameFi : colorConfig?.name}
                  </span>
                </div>
                <button
                  onClick={() => onRemoveHighlight(rule.id)}
                  style={{
                    padding: "0.25rem 0.5rem",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    backgroundColor: "rgba(244, 67, 54, 0.2)",
                    color: "#f44336",
                    border: "1px solid #f44336",
                    borderRadius: "4px",
                  }}
                  aria-label={`Remove highlight for ${rule.word}`}
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
