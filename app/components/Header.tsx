import { Translations } from '../translations';

interface HeaderProps {
  t: Translations;
  isConnected: boolean;
  onToggle: () => void;
  onSettingsClick: () => void;
}

/**
 * Fixed header component with recording toggle and settings button
 * Responsive design hides title text on mobile devices
 */
export default function Header({ t, isConnected, onToggle, onSettingsClick }: HeaderProps) {
  return (
    <header 
      role="banner"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "70px",
        backgroundColor: "rgba(40, 40, 40, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1rem",
        zIndex: 1000,
      }}
    >
      <h1 className="header-title" style={{ 
        fontSize: "1.5rem", 
        fontWeight: "600",
        color: "var(--foreground)",
        margin: 0,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      }}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 100 100"
          width="32"
          height="32"
          style={{ flexShrink: 0 }}
        >
          <defs>
            <linearGradient id="header-icon-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#9C27B0', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#2196F3', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="48" fill="url(#header-icon-bg)"/>
          <g fill="white">
            <rect x="42" y="25" width="16" height="24" rx="8" fill="white"/>
            <path d="M 50 55 Q 35 55 35 65" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <line x1="35" y1="65" x2="65" y2="65" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <line x1="68" y1="35" x2="76" y2="35" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="68" y1="42" x2="80" y2="42" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="68" y1="49" x2="76" y2="49" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </g>
        </svg>
        <span className="title-text">{t.title}</span>
      </h1>
      
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        {/* Recording Toggle Button */}
        <button 
          onClick={onToggle}
          className="start-stop-btn"
          aria-label={isConnected ? t.stop : t.start}
          aria-pressed={isConnected}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            backgroundColor: isConnected ? "#f44336" : "transparent",
            color: isConnected ? "white" : "var(--foreground)",
            border: isConnected ? "none" : "2px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "8px",
            transition: "all 0.3s ease",
            whiteSpace: "nowrap",
            animation: isConnected ? "pulse 2s infinite" : "none",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            height: "45px",
          }}
        >
          <span className="btn-text" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {isConnected ? (
              <>
                <span 
                  className="stop-square"
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "2px",
                    backgroundColor: "white",
                    display: "inline-block",
                  }}
                />
                {t.stop}
              </>
            ) : (
              <>
                <span 
                  className="rec-dot"
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "#f44336",
                    display: "inline-block",
                  }}
                />
                {t.start}
              </>
            )}
          </span>
          <span className="btn-icon" style={{ display: "none", alignItems: "center", justifyContent: "center" }}>
            {isConnected ? (
              <span 
                className="stop-square"
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "2px",
                  backgroundColor: "white",
                  display: "inline-block",
                }}
              />
            ) : (
              <span 
                className="rec-dot"
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  backgroundColor: "#f44336",
                  display: "inline-block",
                }}
              />
            )}
          </span>
        </button>
        
        {/* Settings Button */}
        <button 
          onClick={onSettingsClick}
          aria-label={t.settings}
          aria-expanded={false}
          style={{
            padding: "0.75rem",
            fontSize: "1.2rem",
            cursor: "pointer",
            backgroundColor: "rgba(40, 40, 40, 0.95)",
            color: "var(--foreground)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            transition: "all 0.3s ease",
            width: "45px",
            height: "45px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
          title={t.settings}
        >
          ⚙️
        </button>
      </div>
    </header>
  );
}
