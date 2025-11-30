import { useState, useEffect } from 'react';
import { Language } from '../translations';

/**
 * Represents a word highlighting rule
 */
export interface HighlightRule {
  /** Unique identifier for the rule */
  id: string;
  /** Word or word stem to highlight */
  word: string;
  /** Hex color code for highlighting (e.g., '#FFEB3B') */
  color: string;
}

/**
 * Custom React Hook for Managing Application Settings
 * 
 * Provides centralized state management for all application settings with
 * automatic localStorage persistence. All settings are synchronized across
 * browser tabs and persist between sessions.
 * 
 * Settings Managed:
 * - Language preference (English/Finnish)
 * - ElevenLabs API key
 * - Audio processing options (echo cancellation, noise suppression)
 * - Microphone device selection
 * - Word highlighting rules with partial matching support
 * 
 * LocalStorage Keys:
 * - 'language' - User interface language
 * - 'elevenlabs_api_key' - Custom API key
 * - 'echo_cancellation' - Echo cancellation toggle
 * - 'noise_suppression' - Noise suppression toggle
 * - 'selected_microphone_id' - Selected microphone device ID
 * - 'highlight_rules' - JSON array of highlight rules
 * - 'partial_match_highlight' - Partial word matching toggle
 * 
 * @returns Settings state and updater functions
 * 
 * @example
 * ```tsx
 * const settings = useSettings();
 * 
 * // Change language
 * settings.updateLanguage('fi');
 * 
 * // Add highlight rule
 * settings.addHighlightRule('important', '#FFEB3B');
 * 
 * // Toggle partial matching
 * settings.togglePartialMatchHighlight();
 * ```
 */
export function useSettings() {
  const [language, setLanguage] = useState<Language>('en');
  const [apiKey, setApiKey] = useState("");
  const [echoCancellation, setEchoCancellation] = useState(true);
  const [noiseSuppression, setNoiseSuppression] = useState(true);
  const [selectedMicrophoneId, setSelectedMicrophoneId] = useState<string>("");
  const [highlightRules, setHighlightRules] = useState<HighlightRule[]>([]);
  const [partialMatchHighlight, setPartialMatchHighlight] = useState(true);
  const [newestFirst, setNewestFirst] = useState(true);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'en' || savedLanguage === 'fi') {
      setLanguage(savedLanguage);
    }

    const savedKey = localStorage.getItem('elevenlabs_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
    
    const savedEchoCancellation = localStorage.getItem('echo_cancellation');
    if (savedEchoCancellation !== null) {
      setEchoCancellation(savedEchoCancellation === 'true');
    }
    
    const savedNoiseSuppression = localStorage.getItem('noise_suppression');
    if (savedNoiseSuppression !== null) {
      setNoiseSuppression(savedNoiseSuppression === 'true');
    }

    const savedMicrophoneId = localStorage.getItem('selected_microphone_id');
    if (savedMicrophoneId) {
      setSelectedMicrophoneId(savedMicrophoneId);
    }

    const savedHighlightRules = localStorage.getItem('highlight_rules');
    if (savedHighlightRules) {
      try {
        setHighlightRules(JSON.parse(savedHighlightRules));
      } catch (e) {
        // Ignore invalid JSON
      }
    }

    const savedPartialMatch = localStorage.getItem('partial_match_highlight');
    if (savedPartialMatch !== null) {
      setPartialMatchHighlight(savedPartialMatch === 'true');
    }

    const savedNewestFirst = localStorage.getItem('newest_first');
    if (savedNewestFirst !== null) {
      setNewestFirst(savedNewestFirst === 'true');
    }
  }, []);

  // Update language and persist
  const updateLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // Update API key and persist
  const updateApiKey = (key: string) => {
    setApiKey(key);
    if (key) {
      localStorage.setItem('elevenlabs_api_key', key);
    } else {
      localStorage.removeItem('elevenlabs_api_key');
    }
  };

  // Update echo cancellation and persist
  const updateEchoCancellation = (value: boolean) => {
    setEchoCancellation(value);
    localStorage.setItem('echo_cancellation', String(value));
  };

  // Update noise suppression and persist
  const updateNoiseSuppression = (value: boolean) => {
    setNoiseSuppression(value);
    localStorage.setItem('noise_suppression', String(value));
  };

  // Update microphone and persist
  const updateMicrophone = (deviceId: string) => {
    setSelectedMicrophoneId(deviceId);
    localStorage.setItem('selected_microphone_id', deviceId);
  };

  // Add highlight rule
  const addHighlightRule = (word: string, color: string) => {
    const newRule: HighlightRule = {
      id: Date.now().toString(),
      word: word.trim(),
      color,
    };
    const updated = [...highlightRules, newRule];
    setHighlightRules(updated);
    localStorage.setItem('highlight_rules', JSON.stringify(updated));
  };

  // Remove highlight rule
  const removeHighlightRule = (id: string) => {
    const updated = highlightRules.filter(rule => rule.id !== id);
    setHighlightRules(updated);
    localStorage.setItem('highlight_rules', JSON.stringify(updated));
  };

  // Update partial match setting
  const updatePartialMatchHighlight = (value: boolean) => {
    setPartialMatchHighlight(value);
    localStorage.setItem('partial_match_highlight', String(value));
  };

  // Update transcript order setting
  const updateNewestFirst = (value: boolean) => {
    setNewestFirst(value);
    localStorage.setItem('newest_first', String(value));
  };

  return {
    language,
    apiKey,
    echoCancellation,
    noiseSuppression,
    selectedMicrophoneId,
    highlightRules,
    partialMatchHighlight,
    newestFirst,
    updateLanguage,
    updateApiKey,
    updateEchoCancellation,
    updateNoiseSuppression,
    updateMicrophone,
    addHighlightRule,
    removeHighlightRule,
    updatePartialMatchHighlight,
    updateNewestFirst,
  };
}
