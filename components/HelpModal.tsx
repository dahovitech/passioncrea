import React, { useEffect, useRef } from 'react';
import { X, ChevronRight, ChevronLeft, HelpCircle } from 'lucide-react';
import { useHelp } from '../contexts/HelpContext';

export const HelpModal: React.FC = () => {
  const {
    isHelpActive,
    currentStep,
    steps,
    nextStep,
    prevStep,
    endHelp
  } = useHelp();

  const step = steps[currentStep];
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trap
  useEffect(() => {
    if (isHelpActive && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isHelpActive]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isHelpActive) return;

      if (e.key === 'Escape') {
        endHelp();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        nextStep();
      } else if (e.key === 'ArrowLeft') {
        prevStep();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHelpActive, currentStep, nextStep, prevStep, endHelp]);

  if (!isHelpActive || !step) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={endHelp}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 animate-in zoom-in-95 duration-200 focus:outline-none"
        tabIndex={-1}
      >
        {/* Close button */}
        <button
          onClick={endHelp}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-100 transition-colors text-slate-400"
          aria-label="Fermer l'aide"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-[#005596]/10 flex items-center justify-center mb-4">
          <HelpCircle size={24} className="text-[#005596]" />
        </div>

        {/* Progress */}
        <div className="flex gap-1 mb-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full flex-1 transition-colors ${
                index <= currentStep
                  ? 'bg-[#005596]'
                  : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            {step.title}
          </h2>
          <p className="text-slate-600 leading-relaxed">
            {step.message}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">
            Étape {currentStep + 1} sur {steps.length}
          </span>

          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ChevronLeft size={16} />
                Précédent
              </button>
            )}

            <button
              onClick={nextStep}
              className="flex items-center gap-1 px-4 py-2 text-sm font-bold text-white bg-[#005596] hover:bg-blue-700 rounded-lg transition-colors"
            >
              {currentStep === steps.length - 1 ? 'Commencer' : 'Suivant'}
              {currentStep < steps.length - 1 && <ChevronRight size={16} />}
            </button>
          </div>
        </div>

        {/* Skip option */}
        <div className="mt-4 text-center">
          <button
            onClick={endHelp}
            className="text-xs text-slate-400 hover:text-slate-600 underline"
          >
            Passer ce guide
          </button>
        </div>
      </div>
    </div>
  );
};
