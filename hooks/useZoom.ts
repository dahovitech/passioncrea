import React from 'react';

interface UseZoomReturn {
  zoom: number;
  setZoom: (value: number) => void;
  increaseZoom: () => void;
  decreaseZoom: () => void;
  resetZoom: () => void;
  toggleFullscreen: () => void;
  isFullscreen: boolean;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 2.0;
const ZOOM_STEP = 0.1;

export const useZoom = (): UseZoomReturn => {
  const [zoom, setZoomState] = React.useState(() => {
    const saved = localStorage.getItem('passioncrea_zoom');
    if (saved) {
      const parsed = parseFloat(saved);
      if (parsed >= MIN_ZOOM && parsed <= MAX_ZOOM) {
        return parsed;
      }
    }
    return 0.55; // Default zoom based on responsive breakpoints
  });

  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem('passioncrea_zoom', zoom.toString());
  }, [zoom]);

  const setZoom = React.useCallback((value: number) => {
    const clamped = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, value));
    setZoomState(clamped);
  }, []);

  const increaseZoom = React.useCallback(() => {
    setZoom(zoom + ZOOM_STEP);
  }, [zoom, setZoom]);

  const decreaseZoom = React.useCallback(() => {
    setZoom(zoom - ZOOM_STEP);
  }, [zoom, setZoom]);

  const resetZoom = React.useCallback(() => {
    setZoom(0.55);
  }, [setZoom]);

  const toggleFullscreen = React.useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  const toggleSidebar = React.useCallback(() => {
    setIsSidebarCollapsed(prev => !prev);
  }, []);

  // Keyboard shortcuts for zoom
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        increaseZoom();
      } else if (e.key === '-') {
        e.preventDefault();
        decreaseZoom();
      } else if (e.key === '0') {
        e.preventDefault();
        resetZoom();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [increaseZoom, decreaseZoom, resetZoom, toggleFullscreen, toggleSidebar]);

  return {
    zoom,
    setZoom,
    increaseZoom,
    decreaseZoom,
    resetZoom,
    toggleFullscreen,
    isFullscreen,
    isSidebarCollapsed,
    toggleSidebar
  };
};
