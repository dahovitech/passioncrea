import React from 'react';
import { PosterData } from '../types';

const MAX_HISTORY = 10; // Reduced from 20 to save storage
const STORAGE_KEY = 'passioncrea_history';

// Helper to estimate the size of an object in bytes
const getObjectSize = (obj: unknown): number => {
  return new Blob([JSON.stringify(obj)]).size;
};

// Helper to strip images from state for storage (Base64 images are too large)
const stripImages = (state: PosterData): PosterData => {
  return {
    ...state,
    imageUrl: undefined, // Don't store subject image
    backgroundImageUrl: undefined, // Don't store background image
    assistants: state.assistants.map(a => ({
      ...a,
      imageUrl: undefined // Don't store assistant images
    })),
    partners: state.partners.map(p => ({
      ...p,
      logo: undefined // Don't store partner logos
    }))
  };
};

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

  // Save to localStorage on change (with error handling for quota exceeded)
  React.useEffect(() => {
    const toSave = {
      past: history.past.slice(-MAX_HISTORY).map(stripImages),
      present: stripImages(history.present),
      future: history.future.map(stripImages)
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      // If quota exceeded, try to clear and save just the present state
      console.warn('LocalStorage quota exceeded, clearing history');
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          past: [],
          present: stripImages(history.present),
          future: []
        }));
      } catch (e2) {
        // If still fails, give up on saving to localStorage
        console.warn('Could not save to localStorage');
      }
    }
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
    // Check if any relevant fields have changed
    const hasChanged = 
      history.present.templateType !== newState.templateType ||
      history.present.variant !== newState.variant ||
      history.present.primaryText !== newState.primaryText ||
      history.present.secondaryText !== newState.secondaryText ||
      history.present.name !== newState.name ||
      history.present.role !== newState.role ||
      history.present.date !== newState.date ||
      history.present.imageUrl !== newState.imageUrl ||
      history.present.imageZoom !== newState.imageZoom ||
      history.present.imagePosX !== newState.imagePosX ||
      history.present.imagePosY !== newState.imagePosY ||
      history.present.backgroundImageUrl !== newState.backgroundImageUrl ||
      history.present.accentColor !== newState.accentColor ||
      history.present.textColor !== newState.textColor ||
      history.present.backgroundColor !== newState.backgroundColor ||
      history.present.selectedLogo !== newState.selectedLogo ||
      history.present.primaryFont !== newState.primaryFont ||
      history.present.birthdayTitleFont !== newState.birthdayTitleFont ||
      history.present.nameColor !== newState.nameColor ||
      history.present.roleColor !== newState.roleColor ||
      history.present.dateColor !== newState.dateColor ||
      history.present.primaryTextColor !== newState.primaryTextColor ||
      JSON.stringify(history.present.agendaItems) !== JSON.stringify(newState.agendaItems) ||
      JSON.stringify(history.present.formationModules) !== JSON.stringify(newState.formationModules) ||
      JSON.stringify(history.present.assistants) !== JSON.stringify(newState.assistants) ||
      JSON.stringify(history.present.partners) !== JSON.stringify(newState.partners) ||
      JSON.stringify(history.present.socialIcons) !== JSON.stringify(newState.socialIcons);
    
    if (!hasChanged) return;
    
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
