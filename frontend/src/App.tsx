import React, { useState } from 'react';
import BookReader from './components/BookReader/BookReader';
import PrintExport from './components/PrintExport/PrintExport';
import Navigation from './components/Navigation/Navigation';
import './styles/App.css';

type Section = 'reader' | 'export';

function App() {
  const [activeSection, setActiveSection] = useState<Section>('reader');
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        isDarkMode={isDarkMode}
        onThemeToggle={() => setIsDarkMode(!isDarkMode)}
      />
      <main className="main-content">
        {activeSection === 'reader' && <BookReader />}
        {activeSection === 'export' && <PrintExport />}
      </main>
    </div>
  );
}

export default App;