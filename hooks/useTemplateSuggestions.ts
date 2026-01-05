import React from 'react';
import { TemplateType } from '../types';

interface TemplateSuggestion {
  templateType: TemplateType;
  confidence: number;
  reason: string;
}

interface UseTemplateSuggestionsReturn {
  suggestions: TemplateSuggestion[];
  showSuggestions: boolean;
  dismissSuggestions: () => void;
}

const KEYWORD_RULES: Record<string, TemplateType> = {
  // Formation keywords
  'formation': TemplateType.FORMATION,
  'former': TemplateType.FORMATION,
  'apprendre': TemplateType.FORMATION,
  'apprentissage': TemplateType.FORMATION,
  'module': TemplateType.FORMATION,
  'atelier': TemplateType.FORMATION,
  'workshop': TemplateType.FORMATION,
  'séminaire': TemplateType.FORMATION,
  
  // Birthday keywords
  'anniversaire': TemplateType.BIRTHDAY,
  'birthday': TemplateType.BIRTHDAY,
  'joyeux': TemplateType.BIRTHDAY,
  'felicitation': TemplateType.BIRTHDAY,
  'membre': TemplateType.BIRTHDAY,
  'senateur': TemplateType.BIRTHDAY,
  'célébration': TemplateType.BIRTHDAY,
  'celebration': TemplateType.BIRTHDAY,
  
  // Motivation keywords
  'motivation': TemplateType.MOTIVATION,
  'citation': TemplateType.MOTIVATION,
  'inspiration': TemplateType.MOTIVATION,
  'inspire': TemplateType.MOTIVATION,
  'pensee': TemplateType.MOTIVATION,
  'message': TemplateType.MOTIVATION,
  'devo': TemplateType.MOTIVATION,
  'devoir': TemplateType.MOTIVATION,
  
  // Gratitude keywords
  'merci': TemplateType.GRATITUDE,
  'remerciement': TemplateType.GRATITUDE,
  'remercier': TemplateType.GRATITUDE,
  'gratitude': TemplateType.GRATITUDE,
  'thanks': TemplateType.GRATITUDE,
  'reconnaissance': TemplateType.GRATITUDE,
  'hommage': TemplateType.GRATITUDE,
  
  // Agenda keywords
  'agenda': TemplateType.AGENDA,
  'planning': TemplateType.AGENDA,
  'programme': TemplateType.AGENDA,
  'evenement': TemplateType.AGENDA,
  'reunion': TemplateType.AGENDA,
  'meeting': TemplateType.AGENDA,
  'rdv': TemplateType.AGENDA,
  'rendez-vous': TemplateType.AGENDA,
  'calendrier': TemplateType.AGENDA,
  'horaire': TemplateType.AGENDA,
};

export const useTemplateSuggestions = (
  primaryText: string,
  secondaryText: string,
  name: string
): UseTemplateSuggestionsReturn => {
  const [suggestions, setSuggestions] = React.useState<TemplateSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  const analyzeContent = React.useCallback(() => {
    const textToAnalyze = `${primaryText} ${secondaryText} ${name}`.toLowerCase();
    
    const matchedTemplates: Record<TemplateType, number> = {
      [TemplateType.AGENDA]: 0,
      [TemplateType.FORMATION]: 0,
      [TemplateType.BIRTHDAY]: 0,
      [TemplateType.MOTIVATION]: 0,
      [TemplateType.GRATITUDE]: 0,
      [TemplateType.GREETINGS]: 0
    };

    // Check each keyword
    Object.entries(KEYWORD_RULES).forEach(([keyword, templateType]) => {
      if (textToAnalyze.includes(keyword.toLowerCase())) {
        matchedTemplates[templateType]++;
      }
    });

    // Special patterns
    const datePattern = /\d{1,2}\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i;
    if (datePattern.test(textToAnalyze)) {
      matchedTemplates[TemplateType.AGENDA] += 2;
    }

    const dayPattern = /\d{1,2}\s+(mai|MAI|05)/;
    if (dayPattern.test(textToAnalyze)) {
      matchedTemplates[TemplateType.AGENDA] += 1;
    }

    // Sort by match count and get top suggestions
    const sortedSuggestions = Object.entries(matchedTemplates)
      .filter(([_, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([templateType, count]) => {
        const type = templateType as TemplateType;
        const totalKeywords = Object.keys(KEYWORD_RULES).length;
        const confidence = Math.min(count / 3, 1);
        
        let reason = '';
        if (count >= 3) reason = 'Correspondance forte';
        else if (count >= 1) reason = 'Mots-clés détectés';
        else reason = 'Suggestion';

        return {
          templateType: type,
          confidence,
          reason
        };
      });

    setSuggestions(sortedSuggestions);
    setShowSuggestions(sortedSuggestions.length > 0);
  }, [primaryText, secondaryText, name]);

  React.useEffect(() => {
    // Debounce the analysis
    const timeoutId = setTimeout(() => {
      analyzeContent();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [primaryText, secondaryText, name, analyzeContent]);

  const dismissSuggestions = React.useCallback(() => {
    setShowSuggestions(false);
  }, []);

  return {
    suggestions,
    showSuggestions,
    dismissSuggestions
  };
};
