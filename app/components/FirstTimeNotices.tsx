import { useState, useEffect } from 'react';
import { Translations } from '../translations';

interface FirstTimeNoticesProps {
  t: Translations;
  onSettingsClick: () => void;
}

/**
 * Dismissable notices for first-time users
 * Shows important information about data persistence and privacy
 */
export default function FirstTimeNotices({ t, onSettingsClick }: FirstTimeNoticesProps) {
  const [showNotice0, setShowNotice0] = useState(false);
  const [showNotice1, setShowNotice1] = useState(false);
  const [showNotice2, setShowNotice2] = useState(false);

  useEffect(() => {
    // Check if user has seen the notices before
    const notice0Dismissed = localStorage.getItem('notice_apikey_dismissed');
    const notice1Dismissed = localStorage.getItem('notice_privacy_dismissed');
    const notice2Dismissed = localStorage.getItem('notice_persistence_dismissed');

    if (!notice0Dismissed) {
      setShowNotice0(true);
    }
    if (!notice1Dismissed) {
      setShowNotice1(true);
    }
    if (!notice2Dismissed) {
      setShowNotice2(true);
    }
  }, []);

  const dismissNotice0 = () => {
    localStorage.setItem('notice_apikey_dismissed', 'true');
    setShowNotice0(false);
  };

  const dismissNotice1 = () => {
    localStorage.setItem('notice_privacy_dismissed', 'true');
    setShowNotice1(false);
  };

  const dismissNotice2 = () => {
    localStorage.setItem('notice_persistence_dismissed', 'true');
    setShowNotice2(false);
  };

  if (!showNotice0 && !showNotice1 && !showNotice2) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '80px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      maxWidth: '800px',
      width: 'calc(100% - 2rem)',
    }}>
      {/* API Key Notice */}
      {showNotice0 && (
        <div
          role="alert"
          aria-live="polite"
          style={{
            backgroundColor: '#9C27B0',
            color: '#ffffff',
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            animation: 'slideInUp 0.3s ease-out',
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '0.5rem',
          }}>
            <h3 style={{
              margin: 0,
              fontSize: '1rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <span style={{ fontSize: '1.2rem' }}>🔑</span>
              {t.firstTimeNotice0Title}
            </h3>
            <button
              onClick={dismissNotice0}
              aria-label={t.dismiss}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                fontSize: '1.2rem',
                cursor: 'pointer',
                padding: '0',
                lineHeight: '1',
                opacity: 0.8,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
            >
              ✕
            </button>
          </div>
          <p style={{
            margin: 0,
            fontSize: '0.9rem',
            lineHeight: '1.5',
            marginBottom: '0.75rem',
          }}>
            {t.firstTimeNotice0Text}
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                window.open('https://elevenlabs.io/app/speech-synthesis', '_blank', 'noopener,noreferrer');
              }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: '#9C27B0',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {t.firstTimeNotice0GetKey} →
            </button>
            <button
              onClick={() => {
                onSettingsClick();
                dismissNotice0();
              }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              ⚙️ {t.firstTimeNotice0OpenSettings}
            </button>
          </div>
        </div>
      )}

      {/* Privacy Notice */}
      {showNotice1 && (
        <div
          role="alert"
          aria-live="polite"
          style={{
            backgroundColor: '#1565C0',
            color: '#ffffff',
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            animation: 'slideInUp 0.3s ease-out',
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '0.5rem',
          }}>
            <h3 style={{
              margin: 0,
              fontSize: '1rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <span style={{ fontSize: '1.2rem' }}>🔒</span>
              {t.firstTimeNotice1Title}
            </h3>
            <button
              onClick={dismissNotice1}
              aria-label={t.dismiss}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                fontSize: '1.2rem',
                cursor: 'pointer',
                padding: '0',
                lineHeight: '1',
                opacity: 0.8,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
            >
              ✕
            </button>
          </div>
          <p style={{
            margin: 0,
            fontSize: '0.9rem',
            lineHeight: '1.5',
            marginBottom: '0.75rem',
          }}>
            {t.firstTimeNotice1Text}
          </p>
          <button
            onClick={dismissNotice1}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              fontSize: '0.85rem',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            {t.dismiss}
          </button>
        </div>
      )}

      {/* Persistence Notice */}
      {showNotice2 && (
        <div
          role="alert"
          aria-live="polite"
          style={{
            backgroundColor: '#EF6C00',
            color: '#ffffff',
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            animation: 'slideInUp 0.3s ease-out 0.15s both',
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '0.5rem',
          }}>
            <h3 style={{
              margin: 0,
              fontSize: '1rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <span style={{ fontSize: '1.2rem' }}>⚠️</span>
              {t.firstTimeNotice2Title}
            </h3>
            <button
              onClick={dismissNotice2}
              aria-label={t.dismiss}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                fontSize: '1.2rem',
                cursor: 'pointer',
                padding: '0',
                lineHeight: '1',
                opacity: 0.8,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
            >
              ✕
            </button>
          </div>
          <p style={{
            margin: 0,
            fontSize: '0.9rem',
            lineHeight: '1.5',
            marginBottom: '0.75rem',
          }}>
            {t.firstTimeNotice2Text}
          </p>
          <button
            onClick={dismissNotice2}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              fontSize: '0.85rem',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            {t.dismiss}
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
