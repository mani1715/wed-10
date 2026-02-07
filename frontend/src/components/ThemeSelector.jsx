import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { getAllThemes } from '../config/themeSystem';

/**
 * ThemeSelector Component - Example Implementation
 * 
 * Demonstrates how to use the theme system with dynamic switching.
 * This is a reference implementation that can be integrated into the admin panel.
 * 
 * Features:
 * - Display all available themes
 * - Visual theme cards with colors
 * - Feature badges (Lord, Gantalu, Fire)
 * - One-click theme switching
 * - Current theme highlight
 */
const ThemeSelector = ({ initialThemeId, onThemeChange }) => {
  const { theme, themeId, switchTheme, features } = useTheme(initialThemeId);
  const allThemes = getAllThemes();

  const handleThemeSelect = (newThemeId) => {
    const success = switchTheme(newThemeId);
    if (success && onThemeChange) {
      onThemeChange(newThemeId);
    }
  };

  return (
    <div className="theme-selector-container">
      <div className="current-theme-info">
        <h3>Current Theme: {theme.name}</h3>
        <div className="theme-features">
          {features.hasLord && <span className="feature-badge">🕉️ Lord</span>}
          {features.hasGantalu && <span className="feature-badge">🔔 Gantalu</span>}
          {features.hasFire && <span className="feature-badge">🪔 Fire</span>}
        </div>
      </div>

      <div className="themes-grid">
        {allThemes.map((t) => (
          <div
            key={t.themeId}
            className={`theme-card ${themeId === t.themeId ? 'active' : ''}`}
            onClick={() => handleThemeSelect(t.themeId)}
            style={{
              borderColor: t.colors.primary,
              backgroundColor: t.backgroundColor
            }}
          >
            <div className="theme-card-header">
              <h4 style={{ color: t.colors.primary }}>{t.name}</h4>
              {themeId === t.themeId && (
                <span className="active-indicator">✓</span>
              )}
            </div>

            <div className="theme-colors">
              {t.accentColors.map((color, idx) => (
                <div
                  key={idx}
                  className="color-swatch"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>

            <div className="theme-features-small">
              {t.hasLord && <span>🕉️</span>}
              {t.hasGantalu && <span>🔔</span>}
              {t.hasFire && <span>🪔</span>}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .theme-selector-container {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .current-theme-info {
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: var(--theme-card, #fff);
          border-radius: 12px;
          box-shadow: var(--theme-card-shadow);
        }

        .current-theme-info h3 {
          margin: 0 0 1rem 0;
          color: var(--theme-primary);
          font-family: var(--theme-font-heading);
        }

        .theme-features {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .feature-badge {
          padding: 0.5rem 1rem;
          background: var(--theme-accent-1);
          color: white;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .themes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .theme-card {
          padding: 1.5rem;
          border: 3px solid transparent;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .theme-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }

        .theme-card.active {
          border-width: 3px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .theme-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .theme-card-header h4 {
          margin: 0;
          font-size: 1.125rem;
          font-weight: 600;
        }

        .active-indicator {
          font-size: 1.5rem;
          color: #10b981;
        }

        .theme-colors {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .color-swatch {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          border: 2px solid rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: transform 0.2s;
        }

        .color-swatch:hover {
          transform: scale(1.1);
        }

        .theme-features-small {
          display: flex;
          gap: 0.5rem;
          font-size: 1.25rem;
        }

        @media (max-width: 768px) {
          .themes-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default ThemeSelector;
