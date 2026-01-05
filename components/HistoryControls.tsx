import React from 'react';
import { Undo2, Redo2, RotateCcw } from 'lucide-react';

interface HistoryControlsProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
}

export const HistoryControls: React.FC<HistoryControlsProps> = ({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onClear
}) => {
  return (
    <div className="flex items-center gap-1">
      {/* Undo */}
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className={`p-2 rounded-lg transition-all ${
          canUndo
            ? 'text-slate-600 hover:bg-slate-100 active:scale-95'
            : 'text-slate-300 cursor-not-allowed'
        }`}
        title="Annuler (Ctrl+Z)"
        aria-label="Annuler la dernière action"
      >
        <Undo2 size={18} />
      </button>

      {/* Redo */}
      <button
        onClick={onRedo}
        disabled={!canRedo}
        className={`p-2 rounded-lg transition-all ${
          canRedo
            ? 'text-slate-600 hover:bg-slate-100 active:scale-95'
            : 'text-slate-300 cursor-not-allowed'
        }`}
        title="Rétablir (Ctrl+Y)"
        aria-label="Rétablir l'action annulée"
      >
        <Redo2 size={18} />
      </button>

      {/* Divider */}
      <div className="w-px h-6 bg-slate-200 mx-1" />

      {/* Clear History */}
      <button
        onClick={onClear}
        className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
        title="Effacer l'historique"
        aria-label="Effacer l'historique"
      >
        <RotateCcw size={16} />
      </button>
    </div>
  );
};
