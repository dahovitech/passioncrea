import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface HelpStep {
  id: string;
  targetId: string;
  title: string;
  message: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

interface HelpContextValue {
  isHelpActive: boolean;
  currentStep: number;
  steps: HelpStep[];
  startHelp: () => void;
  nextStep: () => void;
  prevStep: () => void;
  endHelp: () => void;
  hasSeenHelp: boolean;
  markHelpSeen: () => void;
}

const HELP_STEPS: HelpStep[] = [
  {
    id: 'welcome',
    targetId: 'app-container',
    title: 'Bienvenue sur PassionCréa',
    message: 'Cet outil vous permet de créer rapidement des posters professionnels pour JCI. Suivez ce guide pour commencer.',
    position: 'bottom'
  },
  {
    id: 'template',
    targetId: 'sidebar',
    title: '1. Choisissez un modèle',
    message: 'Sélectionnez un type de poster (Agenda, Formation, Anniversaire, etc.) et une variante de design.',
    position: 'right'
  },
  {
    id: 'content',
    targetId: 'sidebar-content',
    title: '2. Personnalisez le contenu',
    message: 'Renseignez le texte principal, la date, le nom et téléchargez une photo si nécessaire.',
    position: 'right'
  },
  {
    id: 'branding',
    targetId: 'sidebar-branding',
    title:  "3. Configurez l'identité",
    message: 'Ajustez les couleurs, la police et téléchargez votre logo de mandat.',
    position: 'right'
  },
  {
    id: 'partners',
    targetId: 'sidebar-partners',
    title: '4. Gérez les partenaires',
    message: 'Ajoutez, modifiez ou supprimez les logos de vos partenaires.',
    position: 'right'
  },
  {
    id: 'export',
    targetId: 'export-buttons',
    title: '5. Exportez votre poster',
    message: ' Téléchargez votre poster en PNG (rapide) ou JPG (haute qualité).',
    position: 'top'
  },
  {
    id: 'tips',
    targetId: 'app-container',
    title: 'Astuces',
    message: 'Utilisez Ctrl+Z pour annuler, les touches +/- pour zoomer, et F pour plein écran.',
    position: 'bottom'
  }
];

const HelpContext = createContext<HelpContextValue | undefined>(undefined);

export const HelpProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isHelpActive, setIsHelpActive] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [hasSeenHelp, setHasSeenHelp] = React.useState(true);

  React.useEffect(() => {
    const seen = localStorage.getItem('passioncrea_help_seen');
    setHasSeenHelp(seen === 'true');
  }, []);

  const startHelp = React.useCallback(() => {
    setCurrentStep(0);
    setIsHelpActive(true);
  }, []);

  const nextStep = React.useCallback(() => {
    if (currentStep < HELP_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      endHelp();
    }
  }, [currentStep]);

  const prevStep = React.useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const endHelp = React.useCallback(() => {
    setIsHelpActive(false);
    markHelpSeen();
  }, []);

  const markHelpSeen = React.useCallback(() => {
    localStorage.setItem('passioncrea_help_seen', 'true');
    setHasSeenHelp(true);
  }, []);

  return (
    <HelpContext.Provider value={{
      isHelpActive,
      currentStep,
      steps: HELP_STEPS,
      startHelp,
      nextStep,
      prevStep,
      endHelp,
      hasSeenHelp,
      markHelpSeen
    }}>
      {children}
    </HelpContext.Provider>
  );
};

export const useHelp = (): HelpContextValue => {
  const context = useContext(HelpContext);
  if (context === undefined) {
    throw new Error('useHelp must be used within a HelpProvider');
  }
  return context;
};
