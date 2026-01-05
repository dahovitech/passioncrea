import React from 'react';
import { ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react';

interface ZoomControlsProps {
  zoom: number;
  setZoom: (value: number) => void;
  increaseZoom: () => void;
  decreaseZoom: () => void;
  resetZoom: () => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  zoom,
  setZoom,
  increaseZoom,
  decreaseZoom,
  resetZoom,
  isFullscreen,
  toggleFullscreen
}) => {
  const percentage = Math.round(zoom * 100);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZoom(parseFloat(e.target.value));
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 bg-white rounded-full shadow-lg px-4 py-2 border border-slate-200">
        {/* Zoom Out */}
        <button
          onClick={decreaseZoom}
          className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-600"
          title="Diminuer le zoom (-)"
          aria-label="Diminuer le zoom"
        >
          <ZoomOut size={18} />
        </button>

        {/* Zoom Slider */}
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0.25"
            max="2.0"
            step="0.05"
            value={zoom}
            onChange={handleSliderChange}
            className="w-24 h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#005596]"
            aria-label="Niveau de zoom"
          />
          <span className="text-xs font-bold text-slate-600 min-w-[40px] text-right">
            {percentage}%
          </span>
        </div>

        {/* Zoom In */}
        <button
          onClick={increaseZoom}
          className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-600"
          title="Augmenter le zoom (+)"
          aria-label="Augmenter le zoom"
        >
          <ZoomIn size={18} />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200" />

        {/* Reset Zoom */}
        <button
          onClick={resetZoom}
          className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-600"
          title="Réinitialiser le zoom (0)"
          aria-label="Réinitialiser le zoom"
        >
          <span className="text-xs font-bold">100%</span>
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className={`p-1.5 rounded-full transition-colors ${
            isFullscreen 
              ? 'bg-[#005596] text-white' 
              : 'hover:bg-slate-100 text-slate-600'
          }`}
          title={isFullscreen ? 'Quitter le plein écran (F)' : 'Plein écran (F)'}
          aria-label={isFullscreen ? 'Quitter le plein écran' : 'Activer le plein écran'}
        >
          {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>
      </div>
    </div>
  );
};
