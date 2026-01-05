import React from 'react';
import { PosterData } from '../types';

const MAX_HISTORY = 20;
const STORAGE_KEY = 'passioncrea_history';

interface HistoryState {
  past: PosterData[];
  present: PosterData;
  future: PosterData[];
}

interface UseHistoryReturn {
  state: HistoryState;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  push: (newState: PosterData) => void;
  clear: () => void;
  goToState: (state: PosterData) => void;
}

export const useHistory = (initialState: PosterData): UseHistoryReturn => {
  const [history, setHistory] = React.useState<HistoryState>(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          past: parsed.past || [],
          present: parsed.present || initialState,
          future: parsed.future || []
        };
      } catch (e) {
        return {
          past: [],
          present: initialState,
          future: []
        };
      }
    }
    return {
      past: [],
      present: initialState,
      future: []
    };
  });

  // Save to localStorage on change
  React.useEffect(() => {
    const toSave = {
      past: history.past.slice(-MAX_HISTORY),
      present: history.present,
      future: history.future
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }, [history]);

  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  const undo = React.useCallback(() => {
    if (!canUndo) return;
    
    const previous = history.past[history.past.length - 1];
    const newPast = history.past.slice(0, -1);
    
    setHistory({
      past: newPast,
      present: previous,
      future: [history.present, ...history.future]
    });
  }, [history.past, history.future, history.present, canUndo]);

  const redo = React.useCallback(() => {
    if (!canRedo) return;
    
    const next = history.future[0];
    const newFuture = history.future.slice(1);
    
    setHistory({
      past: [...history.past, history.present],
      present: next,
      future: newFuture
    });
  }, [history.past, history.future, history.present, canRedo]);

  const push = React.useCallback((newState: PosterData) => {
    // Don't push if state hasn't changed
    if (JSON.stringify(newState) === JSON.stringify(history.present)) {
      return;
    }
    
    setHistory({
      past: [...history.past.slice(-MAX_HISTORY + 1), history.present],
      present: newState,
      future: [] // Clear future on new action
    });
  }, [history.present, history.past]);

  const clear = React.useCallback(() => {
    setHistory({
      past: [],
      present: initialState,
      future: []
    });
    localStorage.removeItem(STORAGE_KEY);
  }, [initialState]);

  const goToState = React.useCallback((state: PosterData) => {
    setHistory({
      past: [],
      present: state,
      future: []
    });
  }, []);

  return {
    state: history,
    undo,
    redo,
    canUndo,
    canRedo,
    push,
    clear,
    goToState
  };
};
