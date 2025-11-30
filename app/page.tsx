"use client"

import { useScribe } from "@elevenlabs/react";
import { useState, useEffect, useRef } from "react";
import { translations } from "./translations";
import { useSettings } from "./hooks/useSettings";
import { useMicrophones } from "./hooks/useMicrophones";
import { exportAsCSV, exportAsPDF } from "./utils/exportUtils";
import Header from "./components/Header";
import Notification from "./components/Notification";
import StatusIndicator from "./components/StatusIndicator";
import TranscriptDisplay from "./components/TranscriptDisplay";
import Footer from "./components/Footer";
import SettingsPanel from "./components/SettingsPanel";
import ApiKeyModal from "./components/ApiKeyModal";
import FirstTimeNotices from "./components/FirstTimeNotices";

/**
 * Fetches a single-use authentication token from the ElevenLabs API
 * 
 * @param customApiKey - Optional custom API key provided by user through UI
 * @returns Promise resolving to authentication token
 * @throws Error if token fetch fails
 */
async function fetchTokenFromServer(customApiKey?: string): Promise<string> {
  const response = await fetch("/api/token", {
    method: "GET",
    headers: customApiKey ? {
      'X-Custom-API-Key': customApiKey
    } : {}
  });
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch token");
  }
  
  return data.token;
}

/**
 * Main Application Component
 * 
 * comLedger - Professional real-time speech-to-text transcription application
 * 
 * Features:
 * - Real-time transcription with ElevenLabs Scribe v2 API
 * - Smart word highlighting with partial matching for inflected forms
 * - Bilingual interface (English/Finnish)
 * - Export to PDF and CSV with highlights preserved
 * - WCAG 2.1 AA accessibility compliance
 * - Auto-save of partial transcripts on disconnect
 * - Persistent settings via localStorage
 * 
 * @component
 */
export default function Page() {
  // UI state
  const [showSettings, setShowSettings] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [tempApiKey, setTempApiKey] = useState("");
  const [notification, setNotification] = useState<{
    message: string;
    type: 'error' | 'success' | 'info';
  } | null>(null);
  
  // Transcript data
  const [transcriptsWithTimestamps, setTranscriptsWithTimestamps] = useState<Array<{
    id: string;
    text: string;
    timestamp: string;
  }>>([]);

  // Reference to store the latest partial transcript
  const lastPartialTranscriptRef = useRef<string>("");

  // Custom hooks for settings and microphone management
  const settings = useSettings();
  const availableMicrophones = useMicrophones();
  
  // Current translation object based on selected language
  const t = translations[settings.language];

  /**
   * Check for HTTPS on mount
   * Required for microphone access on mobile browsers
   */
  useEffect(() => {
    if (typeof window !== 'undefined' && 
        window.location.protocol !== 'https:' && 
        window.location.hostname !== 'localhost') {
      setNotification({
        message: '⚠️ HTTPS required for microphone access. Please use HTTPS connection.',
        type: 'error'
      });
    }
  }, []);
  /**
   * Initialize ElevenLabs Scribe hook for real-time transcription
   * Handles connection lifecycle and transcript events
   */
  const scribe = useScribe({
    modelId: "scribe_v2_realtime",
    onConnect: () => {
      console.log("✅ Connected successfully!");
    },
    onDisconnect: () => {
      console.log("❌ Disconnected");
      
      // Save partial transcript if it exists when disconnecting
      const partialText = lastPartialTranscriptRef.current;
      if (partialText && partialText.trim()) {
        const now = new Date();
        const timestamp = now.toLocaleTimeString('fi-FI', { 
          hour: '2-digit', 
          minute: '2-digit',
          second: '2-digit'
        });
        
        setTranscriptsWithTimestamps(prev => {
          // Check if this partial transcript is already saved
          if (prev.some(t => t.text === partialText)) {
            return prev;
          }
          // Add the partial transcript to confirmed transcripts
          console.log("📝 Saving partial transcript on disconnect:", partialText);
          return [...prev, {
            id: `${Date.now()}-${Math.random()}`,
            text: partialText,
            timestamp
          }];
        });
        
        // Clear the reference after saving
        lastPartialTranscriptRef.current = "";
      }
    },
    onError: (error) => {
      console.error("🚨 Error:", error);
      const errorMessage = error instanceof Error ? error.message : t.unknownError;
      setNotification({
        message: `${t.connectionError}: ${errorMessage}`,
        type: 'error'
      });
      setTimeout(() => setNotification(null), 5000);
    },
    onPartialTranscript: (data) => {
      console.log("⚡ Partial:", data.text);
      // Store the latest partial transcript in ref
      lastPartialTranscriptRef.current = data.text;
    },
    onCommittedTranscriptWithTimestamps: (data) => {
      console.log("✅ Committed:", data.text);
      const now = new Date();
      const timestamp = now.toLocaleTimeString('fi-FI', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      });
      
      // Clear the partial transcript ref since it's now committed
      lastPartialTranscriptRef.current = "";
      
      // Add to transcripts list, avoiding duplicates
      setTranscriptsWithTimestamps(prev => {
        if (prev.some(t => t.text === data.text)) {
          return prev;
        }
        return [...prev, {
          id: `${Date.now()}-${Math.random()}`,
          text: data.text,
          timestamp
        }];
      });
    },
  });

  /**
   * Start recording handler
   * Validates browser support, fetches token, and connects to microphone
   */
  const handleStart = async () => {
    try {
      // Check if browser supports required APIs
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Your browser does not support audio recording. Please use a modern browser like Chrome, Safari, or Firefox.');
      }

      // Fetch a single use token from the server
      console.log("🔄 Fetching token...");
      const token = await fetchTokenFromServer(settings.apiKey || undefined);
      console.log("✅ Token received:", token.substring(0, 20) + "...");

      console.log("🔄 Connecting to microphone...");
      console.log("Device info:", {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        echoCancellation: settings.echoCancellation,
        noiseSuppression: settings.noiseSuppression,
        selectedMicrophoneId: settings.selectedMicrophoneId
      });

      // Connect with microphone settings
      await scribe.connect({
        token,
        microphone: {
          echoCancellation: settings.echoCancellation,
          noiseSuppression: settings.noiseSuppression,
          ...(settings.selectedMicrophoneId && { deviceId: settings.selectedMicrophoneId }),
        },
      });
      console.log("✅ Connected successfully!");
      setNotification({
        message: t.recordingStarted,
        type: 'success'
      });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error("❌ Connection error:", error);
      
      let errorMessage = t.unknownError;
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Check for specific error types
        if (errorMessage.includes('does not support')) {
          errorMessage = `🚫 ${t.browserNotSupported}. ${t.useModernBrowser}`;
        } else if (errorMessage.includes('Permission denied') || errorMessage.includes('NotAllowedError')) {
          errorMessage = `🎤 ${t.microphonePermissionDenied}`;
        } else if (errorMessage.includes('Krediitit') || errorMessage.includes('QUOTA_EXCEEDED')) {
          errorMessage = `💳 ${t.creditsExhausted}`;
        } else if (errorMessage.includes('INVALID_API_KEY')) {
          errorMessage = `🔑 ${t.invalidApiKey}`;
        }
      }
      
      setNotification({
        message: errorMessage,
        type: 'error'
      });
      // Keep error notifications longer
      setTimeout(() => setNotification(null), 10000);
    }
  };

  /**
   * Save API key handler
   */
  const handleSaveApiKey = () => {
    if (tempApiKey.trim()) {
      settings.updateApiKey(tempApiKey.trim());
      setShowApiKeyModal(false);
      setNotification({
        message: `✅ ${t.apiKeySavedSuccess}`,
        type: 'success'
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  /**
   * Warn user before reload/close if there are unsaved transcripts
   */
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (transcriptsWithTimestamps.length > 0) {
        e.preventDefault();
        // Modern browsers display their own message, but we set returnValue for compatibility
        const message = t.reloadWarning;
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [transcriptsWithTimestamps.length, t.reloadWarning]);

  /**
   * Clear API key handler
   */
  const handleClearApiKey = () => {
    settings.updateApiKey("");
    setTempApiKey("");
    setNotification({
      message: t.apiKeyRemoved,
      type: 'info'
    });
    setTimeout(() => setNotification(null), 3000);
  };

  /**
   * Toggle echo cancellation
   */
  const handleToggleEchoCancellation = () => {
    const newValue = !settings.echoCancellation;
    settings.updateEchoCancellation(newValue);
    setNotification({
      message: newValue ? t.echoCancellationEnabled : t.echoCancellationDisabled,
      type: 'info'
    });
    setTimeout(() => setNotification(null), 2000);
  };

  /**
   * Toggle noise suppression
   */
  const handleToggleNoiseSuppression = () => {
    const newValue = !settings.noiseSuppression;
    settings.updateNoiseSuppression(newValue);
    setNotification({
      message: newValue ? t.noiseSuppressionEnabled : t.noiseSuppressionDisabled,
      type: 'info'
    });
    setTimeout(() => setNotification(null), 2000);
  };

  /**
   * Change microphone device
   */
  const handleMicrophoneChange = (deviceId: string) => {
    settings.updateMicrophone(deviceId);
    const device = availableMicrophones.find(m => m.deviceId === deviceId);
    setNotification({
      message: `${t.microphoneChanged}: ${device?.label || t.defaultMicrophone}`,
      type: 'info'
    });
    setTimeout(() => setNotification(null), 2000);
  };

  /**
   * Change UI language
   */
  /**
   * Change UI language
   */
  const handleLanguageChange = (lang: 'en' | 'fi') => {
    settings.updateLanguage(lang);
    setNotification({
      message: translations[lang].languageChanged,
      type: 'info'
    });
    setTimeout(() => setNotification(null), 2000);
  };

  /**
   * Export transcripts as CSV
   */
  const handleExportCSV = () => {
    if (transcriptsWithTimestamps.length === 0) {
      setNotification({
        message: t.noTranscriptsToExport,
        type: 'info'
      });
      setTimeout(() => setNotification(null), 2000);
      return;
    }

    // transcripts array is oldest-first, reverse for newest-first export
    const orderedTranscripts = settings.newestFirst 
      ? [...transcriptsWithTimestamps].reverse()
      : transcriptsWithTimestamps;
    
    exportAsCSV(orderedTranscripts, 'transcripts');
    setNotification({
      message: t.transcriptsExported,
      type: 'success'
    });
    setTimeout(() => setNotification(null), 3000);
  };

  /**
   * Export transcripts as PDF
   */
  const handleExportPDF = () => {
    if (transcriptsWithTimestamps.length === 0) {
      setNotification({
        message: t.noTranscriptsToExport,
        type: 'info'
      });
      setTimeout(() => setNotification(null), 2000);
      return;
    }

    // transcripts array is oldest-first, reverse for newest-first export
    const orderedTranscripts = settings.newestFirst 
      ? [...transcriptsWithTimestamps].reverse()
      : transcriptsWithTimestamps;

    const success = exportAsPDF(
      orderedTranscripts, 
      t.title, 
      t.confirmedTranscripts,
      t.pdfDate,
      t.pdfTotalTranscripts,
      settings.highlightRules,
      settings.partialMatchHighlight
    );
    if (!success) {
      setNotification({
        message: 'Please allow popups to export PDF',
        type: 'error'
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    setNotification({
      message: t.transcriptsExported,
      type: 'success'
    });
    setTimeout(() => setNotification(null), 3000);
  };

  /**
   * Add highlight rule handler
   */
  const handleAddHighlight = (word: string, color: string) => {
    settings.addHighlightRule(word, color);
    setNotification({
      message: t.highlightAdded,
      type: 'success'
    });
    setTimeout(() => setNotification(null), 2000);
  };

  /**
   * Remove highlight rule handler
   */
  const handleRemoveHighlight = (id: string) => {
    settings.removeHighlightRule(id);
    setNotification({
      message: t.highlightRemoved,
      type: 'info'
    });
    setTimeout(() => setNotification(null), 2000);
  };

  /**
   * Clear all transcripts handler
   */
  const handleClearTranscripts = () => {
    if (window.confirm(t.language === 'en' 
      ? 'Are you sure you want to clear all transcripts? This cannot be undone.' 
      : 'Haluatko varmasti tyhjentää kaikki transkriptiot? Tätä ei voi perua.')) {
      setTranscriptsWithTimestamps([]);
      setNotification({
        message: t.language === 'en' ? 'All transcripts cleared' : 'Kaikki transkriptiot tyhjennetty',
        type: 'info'
      });
      setTimeout(() => setNotification(null), 2000);
    }
  };

  /**
   * Toggle partial match highlight handler
   */
  const handleTogglePartialMatch = () => {
    const newValue = !settings.partialMatchHighlight;
    settings.updatePartialMatchHighlight(newValue);
    setNotification({
      message: newValue ? t.partialMatchingEnabled : t.partialMatchingDisabled,
      type: 'info'
    });
    setTimeout(() => setNotification(null), 2000);
  };

  /**
   * Toggle transcript order handler
   */
  const handleToggleNewestFirst = () => {
    const newValue = !settings.newestFirst;
    settings.updateNewestFirst(newValue);
    setNotification({
      message: t.transcriptOrderChanged,
      type: 'info'
    });
    setTimeout(() => setNotification(null), 2000);
  };

  /**
   * Toggle recording on/off
   */
  const handleToggle = () => {
    if (scribe.isConnected) {
      scribe.disconnect();
    } else {
      handleStart();
    }
  };

  return (
    <div 
      style={{ 
        minHeight: "100vh", 
        display: "flex", 
        flexDirection: "column",
        paddingTop: "70px",
        paddingBottom: "60px"
      }}
      lang={settings.language}
    >
      {/* Fixed Header */}
      <Header
        t={t}
        isConnected={scribe.isConnected}
        onToggle={handleToggle}
        onSettingsClick={() => setShowSettings(!showSettings)}
      />

      {/* Main Content */}
      <main 
        role="main"
        style={{ 
          flex: 1,
          padding: "2rem 1rem",
          maxWidth: "900px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {/* First Time User Notices */}
        <FirstTimeNotices t={t} onSettingsClick={() => setShowSettings(true)} />

        {/* Notification */}
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}

        {/* Settings Panel */}
        {showSettings && (
          <SettingsPanel
            t={t}
            language={settings.language}
            onLanguageChange={handleLanguageChange}
            echoCancellation={settings.echoCancellation}
            onToggleEchoCancellation={handleToggleEchoCancellation}
            noiseSuppression={settings.noiseSuppression}
            onToggleNoiseSuppression={handleToggleNoiseSuppression}
            selectedMicrophoneId={settings.selectedMicrophoneId}
            availableMicrophones={availableMicrophones}
            onMicrophoneChange={handleMicrophoneChange}
            apiKey={settings.apiKey}
            onShowApiKeyModal={() => {
              setTempApiKey(settings.apiKey);
              setShowApiKeyModal(true);
            }}
            onClearApiKey={handleClearApiKey}
            transcriptsCount={transcriptsWithTimestamps.length}
            onExportPDF={handleExportPDF}
            onExportCSV={handleExportCSV}
            onClearTranscripts={handleClearTranscripts}
            highlightRules={settings.highlightRules}
            partialMatchHighlight={settings.partialMatchHighlight}
            onAddHighlight={handleAddHighlight}
            onRemoveHighlight={handleRemoveHighlight}
            onTogglePartialMatch={handleTogglePartialMatch}
            newestFirst={settings.newestFirst}
            onToggleNewestFirst={handleToggleNewestFirst}
          />
        )}

        {/* Status Indicator */}
        {scribe.isConnected && (
          <StatusIndicator t={t} />
        )}

        {/* Transcript Display */}
        <TranscriptDisplay
          t={t}
          transcripts={transcriptsWithTimestamps}
          partialTranscript={scribe.partialTranscript}
          highlightRules={settings.highlightRules}
          partialMatchHighlight={settings.partialMatchHighlight}
          newestFirst={settings.newestFirst}
        />
      </main>

      {/* Fixed Footer */}
      <Footer t={t} />

      {/* API Key Modal */}
      {showApiKeyModal && (
        <ApiKeyModal
          t={t}
          tempApiKey={tempApiKey}
          onTempApiKeyChange={setTempApiKey}
          onSave={handleSaveApiKey}
          onClose={() => setShowApiKeyModal(false)}
        />
      )}

      {/* Global Styles and Animations */}
      <style jsx global>{`
        /* Pulse animation for recording indicator and button */
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }

        /* Pulse animation for red recording dot */
        @keyframes dotPulse {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 0 0 rgba(244, 67, 54, 0.7);
          }
          50% {
            opacity: 0.8;
            box-shadow: 0 0 0 4px rgba(244, 67, 54, 0);
          }
        }

        /* Apply pulse to rec dot */
        .rec-dot {
          animation: dotPulse 2s ease-in-out infinite;
        }

        /* Subtle glow for stop square */
        .stop-square {
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
        }
        
        /* Slide down animation for notifications */
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive styles for mobile devices */
        @media (max-width: 640px) {
          /* Hide title text on small screens */
          .title-text {
            display: none;
          }
          
          .header-title {
            font-size: 1.5rem !important;
          }

          /* Adjust button padding for mobile */
          .start-stop-btn {
            padding: 0.75rem !important;
            font-size: 0.9rem !important;
            min-width: 45px;
            justify-content: center;
          }

          /* Hide button text, show only icon on mobile */
          .btn-text {
            display: none !important;
          }

          .btn-icon {
            display: flex !important;
            font-size: 1.2rem;
          }

          /* Make red dot slightly bigger on mobile */
          .btn-icon .rec-dot {
            width: 16px !important;
            height: 16px !important;
          }

          /* Make stop square slightly bigger on mobile */
          .btn-icon .stop-square {
            width: 16px !important;
            height: 16px !important;
          }
        }

        /* Extra small devices */
        @media (max-width: 480px) {
          header {
            padding: 0 0.75rem !important;
          }

          .start-stop-btn {
            padding: 0.6rem 0.8rem !important;
            min-width: 45px;
          }

          footer p {
            font-size: 0.75rem !important;
          }
        }

        /* Focus styles for accessibility */
        button:focus-visible {
          outline: 2px solid #2196F3;
          outline-offset: 2px;
        }

        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
