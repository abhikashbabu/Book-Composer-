import React, { useState } from 'react';
import '../styles/PrintExport.css';

interface ExportSettings {
  paperSize: 'A4' | 'A5' | 'Letter' | 'Legal' | 'Custom';
  customWidth?: number;
  customHeight?: number;
  duplex: boolean;
  colorProfile: 'RGB' | 'CMYK' | 'Grayscale';
  margin: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  bindingMargin: number;
  includeCropMarks: boolean;
  includeBleedMarks: boolean;
}

const PrintExport: React.FC = () => {
  const [settings, setSettings] = useState<ExportSettings>({
    paperSize: 'A4',
    duplex: true,
    colorProfile: 'RGB',
    margin: { top: 10, bottom: 10, left: 10, right: 10 },
    bindingMargin: 5,
    includeCropMarks: true,
    includeBleedMarks: true,
  });
  const [isExporting, setIsExporting] = useState(false);

  const paperSizes = {
    A4: { width: 210, height: 297 },
    A5: { width: 148, height: 210 },
    Letter: { width: 215.9, height: 279.4 },
    Legal: { width: 215.9, height: 355.6 },
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const response = await fetch('/api/export/print', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'book-export.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Export error:', error);
      alert('Error exporting PDF');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="print-export">
      <div className="settings-panel">
        <h2>📄 Print Export Settings</h2>

        <div className="setting-group">
          <label>Paper Size</label>
          <select 
            value={settings.paperSize}
            onChange={(e) => setSettings({...settings, paperSize: e.target.value as any})}
          >
            <option value="A4">A4 (210 × 297 mm)</option>
            <option value="A5">A5 (148 × 210 mm)</option>
            <option value="Letter">Letter (8.5" × 11")</option>
            <option value="Legal">Legal (8.5" × 14")</option>
            <option value="Custom">Custom</option>
          </select>
        </div>

        {settings.paperSize === 'Custom' && (
          <div className="setting-group">
            <label>Custom Dimensions (mm)</label>
            <div className="input-row">
              <input 
                type="number" 
                placeholder="Width"
                value={settings.customWidth || ''}
                onChange={(e) => setSettings({...settings, customWidth: Number(e.target.value)})}
              />
              <input 
                type="number" 
                placeholder="Height"
                value={settings.customHeight || ''}
                onChange={(e) => setSettings({...settings, customHeight: Number(e.target.value)})}
              />
            </div>
          </div>
        )}

        <div className="setting-group">
          <label>
            <input 
              type="checkbox" 
              checked={settings.duplex}
              onChange={(e) => setSettings({...settings, duplex: e.target.checked})}
            />
            Double-Sided Printing (Duplex)
          </label>
        </div>

        <div className="setting-group">
          <label>Color Profile</label>
          <select 
            value={settings.colorProfile}
            onChange={(e) => setSettings({...settings, colorProfile: e.target.value as any})}
          >
            <option value="RGB">RGB</option>
            <option value="CMYK">CMYK</option>
            <option value="Grayscale">Grayscale</option>
          </select>
        </div>

        <div className="setting-group">
          <label>Margins (mm)</label>
          <div className="margins-grid">
            <input 
              type="number" 
              placeholder="Top"
              value={settings.margin.top}
              onChange={(e) => setSettings({...settings, margin: {...settings.margin, top: Number(e.target.value)}})}
            />
            <input 
              type="number" 
              placeholder="Bottom"
              value={settings.margin.bottom}
              onChange={(e) => setSettings({...settings, margin: {...settings.margin, bottom: Number(e.target.value)}})}
            />
            <input 
              type="number" 
              placeholder="Left"
              value={settings.margin.left}
              onChange={(e) => setSettings({...settings, margin: {...settings.margin, left: Number(e.target.value)}})}
            />
            <input 
              type="number" 
              placeholder="Right"
              value={settings.margin.right}
              onChange={(e) => setSettings({...settings, margin: {...settings.margin, right: Number(e.target.value)}})}
            />
          </div>
        </div>

        <div className="setting-group">
          <label>Binding Margin (mm)</label>
          <input 
            type="number" 
            value={settings.bindingMargin}
            onChange={(e) => setSettings({...settings, bindingMargin: Number(e.target.value)})}
          />
        </div>

        <div className="setting-group">
          <label>
            <input 
              type="checkbox" 
              checked={settings.includeCropMarks}
              onChange={(e) => setSettings({...settings, includeCropMarks: e.target.checked})}
            />
            Include Crop Marks
          </label>
        </div>

        <div className="setting-group">
          <label>
            <input 
              type="checkbox" 
              checked={settings.includeBleedMarks}
              onChange={(e) => setSettings({...settings, includeBleedMarks: e.target.checked})}
            />
            Include Bleed Marks
          </label>
        </div>

        <button 
          onClick={handleExport}
          className="btn btn-primary btn-large"
          disabled={isExporting}
        >
          {isExporting ? '⏳ Exporting...' : '📥 Export PDF'}
        </button>
      </div>

      <div className="preview-panel">
        <h3>Preview</h3>
        <div className="preview-box">
          <p>Paper Size: {settings.paperSize}</p>
          <p>Margins: {settings.margin.top}mm all sides</p>
          <p>Color Profile: {settings.colorProfile}</p>
          <p>Double-Sided: {settings.duplex ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </div>
  );
};

export default PrintExport;