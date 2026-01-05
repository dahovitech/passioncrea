import React from 'react';
import { Sparkles, X, Lightbulb } from 'lucide-react';
import { TemplateType } from '../types';
import { TEMPLATES } from '../constants';

interface TemplateSuggestion {
  templateType: TemplateType;
  confidence: number;
  reason: string;
}

interface TemplateSuggestionsProps {
  suggestions: TemplateSuggestion[];
  showSuggestions: boolean;
  onDismiss: () => void;
  onSelectTemplate: (templateType: TemplateType) => void;
}

const TEMPLATE_LABELS: Record<TemplateType, string> = {
  [TemplateType.AGENDA]: 'Agenda',
  [TemplateType.FORMATION]: 'Formation',
  [TemplateType.BIRTHDAY]: 'Anniversaire',
  [TemplateType.MOTIVATION]: 'Motivation',
  [TemplateType.GRATITUDE]: 'Gratitude',
  [TemplateType.GREETINGS]: 'Félicitations'
};

export const TemplateSuggestions: React.FC<TemplateSuggestionsProps> = ({
  suggestions,
  showSuggestions,
  onDismiss,
  onSelectTemplate
}) => {
  if (!showSuggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden animate-in slide-in-from-top-2 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#005596]/5 to-[#005596]/10 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-[#005596]" />
            <span className="text-sm font-bold text-slate-700">
              Suggestions de modèles
            </span>
          </div>
          <button
            onClick={onDismiss}
            className="p-1 rounded-full hover:bg-slate-100 transition-colors text-slate-400"
            aria-label="Fermer les suggestions"
          >
            <X size={14} />
          </button>
        </div>

        {/* Suggestions List */}
        <div className="p-3 space-y-2">
          {suggestions.map((suggestion, index) => {
            const template = TEMPLATES.find(t => t.id === suggestion.templateType);
            if (!template) return null;

            const confidencePercent = Math.round(suggestion.confidence * 100);

            return (
              <button
                key={suggestion.templateType}
                onClick={() => onSelectTemplate(suggestion.templateType)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                  index === 0
                    ? 'bg-[#005596]/5 border border-[#005596]/20 hover:bg-[#005596]/10'
                    : 'bg-slate-50 border border-slate-100 hover:bg-slate-100'
                }`}
              >
                {/* Icon */}
                <span className="text-2xl">{template.icon}</span>

                {/* Content */}
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-700">
                      {TEMPLATE_LABELS[suggestion.templateType]}
                    </span>
                    <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-700 rounded">
                      {confidencePercent}% match
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Lightbulb size={10} className="text-amber-500" />
                    <span className="text-xs text-slate-500">
                      {suggestion.reason}
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <span className="text-slate-300">→</span>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100">
          <p className="text-xs text-slate-400 text-center">
            Basé sur les mots-clés détectés dans votre contenu
          </p>
        </div>
      </div>
    </div>
  );
};
