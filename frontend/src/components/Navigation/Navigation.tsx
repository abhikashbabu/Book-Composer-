import React from 'react';
import '../styles/Navigation.css';

interface NavigationProps {
  activeSection: 'reader' | 'export';
  onSectionChange: (section: 'reader' | 'export') => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onSectionChange,
  isDarkMode,
  onThemeToggle,
}) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>📚 Book Composer</h1>
      </div>
      <div className="navbar-menu">
        <button
          className={`nav-link ${activeSection === 'reader' ? 'active' : ''}`}
          onClick={() => onSectionChange('reader')}
        >
          📖 Reader
        </button>
        <button
          className={`nav-link ${activeSection === 'export' ? 'active' : ''}`}
          onClick={() => onSectionChange('export')}
        >
          🖨️ Print Export
        </button>
      </div>
      <div className="navbar-actions">
        <button
          className="btn btn-theme"
          onClick={onThemeToggle}
          title="Toggle theme"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;