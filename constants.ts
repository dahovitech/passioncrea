import { TemplateType, TemplateConfig } from './types';

// Import partner logos as Vite assets
import partnerBanqueAlimentaire from './public/logos/Logo/Partenaires/ba1.pdf.png?url';
import partnerCredoMedia from './public/logos/Logo/Partenaires/Design sans titre (10).png?url';
import partnerONG from './public/logos/Logo/Partenaires/ONG Yves & Lucienne Millet.png?url';
import partnerMairie from './public/logos/Logo/Partenaires/logo_mairie-PNG.png?url';
import partner2 from './public/logos/Logo/Partenaires/Design sans titre (12).png?url';
import partner3 from './public/logos/Logo/Partenaires/Design sans titre (13).png?url';
import partner4 from './public/logos/Logo/Partenaires/Design sans titre (14).png?url';
import partner5 from './public/logos/Logo/Partenaires/LOGO 2 DS CM2.png?url';

export const JCI_DARK = '#000000';
export const JCI_BLUE = '#005596';
export const JCI_LIGHT_BLUE = '#00AEEF';
export const JCI_GOLD = '#C99700';
export const JCI_WHITE = '#FFFFFF';
export const JCI_SOFT_BG = '#F8FAFC';

// Liste des couleurs officielles JCI pour les presets
export const JCI_PALETTE = [
  { label: 'Bleu JCI', value: '#005596' },
  { label: 'Or JCI', value: '#C99700' },
  { label: 'Bleu Ciel', value: '#00AEEF' },
  { label: 'Blanc', value: '#FFFFFF' },
  { label: 'Noir', value: '#000000' },
  { label: 'Gris Doux', value: '#F1F5F9' }
];

// Logos JCI
export const LOGO_JCI_COLOR = '/logos/Logo/Organisation/nLogo_JCI Seme Passion_Color.png';
export const LOGO_JCI_WHITE = '/logos/Logo/Organisation/nLogo_JCI Seme Passion_ColorWhite.png';
export const LOGO_JCI_BLACK = '/logos/Logo/Organisation/nLogo_JCI Seme Passion_Black.png';
export const LOGO_MANDAT_2026 = '/logos/Logo/Partenaires/LOGO-MANDAT.png';

export const LOGO_OPTIONS = [
  { id: 'color', label: 'JCI Couleur', path: LOGO_JCI_COLOR },
  { id: 'white', label: 'JCI Blanc', path: LOGO_JCI_WHITE },
  { id: 'black', label: 'JCI Noir', path: LOGO_JCI_BLACK }
];

export const FONT_OPTIONS = [
  { id: 'montserrat', label: 'Montserrat (Moderne)', family: "'Montserrat', sans-serif" },
  { id: 'poppins', label: 'Poppins (Standard)', family: "'Poppins', sans-serif" },
  { id: 'dancing', label: 'Dancing Script (Cursif)', family: "'Dancing Script', cursive" },
  { id: 'playfair', label: 'Playfair Display (Élégant)', family: "'Playfair Display', serif" }
];

export const BIRTHDAY_TITLE_FONTS = [
  { id: 'dancing', label: 'Dancing Script', family: "'Dancing Script', cursive", className: 'font-dancing' },
  { id: 'greatvibes', label: 'Great Vibes', family: "'Great Vibes', cursive", className: 'font-vibes' },
  { id: 'clicker', label: 'Clicker Script', family: "'Clicker Script', cursive", className: 'font-clicker' },
  { id: 'sacramento', label: 'Sacramento', family: "'Sacramento', cursive", className: 'font-sacramento' },
  { id: 'alexbrush', label: 'Alex Brush', family: "'Alex Brush', cursive", className: 'font-alex' },
  { id: 'allura', label: 'Allura', family: "'Allura', cursive", className: 'font-allura' },
  { id: 'playfair', label: 'Playfair Display', family: "'Playfair Display', serif", className: 'font-playfair' },
  { id: 'merriweather', label: 'Merriweather', family: "'Merriweather', serif", className: 'font-merriweather' }
];

export const TEMPLATES: TemplateConfig[] = [
  { id: TemplateType.AGENDA, label: 'Agenda', icon: '📅', description: 'Événements planifiés' },
  { id: TemplateType.FORMATION, label: 'Formation', icon: '🎓', description: 'Session & Webinaire' },
  { id: TemplateType.BIRTHDAY, label: 'Anniversaire', icon: '🎂', description: 'Célébrations' },
  { id: TemplateType.MOTIVATION, label: 'Motivation', icon: '💡', description: 'Citations' },
  { id: TemplateType.GRATITUDE, label: 'Gratitude', icon: '🙏', description: 'Remerciements' }
];

export interface BackgroundPreset {
  url: string;
  label: string;
  category: 'Anniversaires' | 'Agenda' | 'Formation' | 'Motivation' | 'Gratitude';
}

// Bibliothèque enrichie d'illustrations professionnelles JCI pour chaque type de template
// Catégories: Anniversaires, Agenda, Formation, Motivation, Gratitude
export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  // ========================================
  // ANNIVERSAIRES - Designs festifs avec ballons, rubans, confettis et touche or
  // ========================================
  { 
    label: 'Anniversaire Classique', 
    category: 'Anniversaires', 
    url: '/backgrounds/background_birthday.svg' 
  },
  { 
    label: 'Fête Élégante', 
    category: 'Anniversaires', 
    url: '/backgrounds/background_birthday_2.svg' 
  },
  { 
    label: 'Celebration Party', 
    category: 'Anniversaires', 
    url: '/backgrounds/background_birthday_3.svg' 
  },

  // ========================================
  // FORMATION : Designs éducatifs professionnels
  // Géométrie bleue, progressions, diplômes et éléments de formation
  // ========================================
  { 
    label: 'Formation JCI', 
    category: 'Formation', 
    url: '/backgrounds/background_formation.svg' 
  },
  { 
    label: 'Formation Moderne', 
    category: 'Formation', 
    url: '/backgrounds/background_formation_2.svg' 
  },
  { 
    label: 'Formation Réseaux', 
    category: 'Formation', 
    url: '/backgrounds/background_formation_3.svg' 
  },

  // ========================================
  // AGENDA : Designs pour la planification
  // Listes, calendriers, chronologies et éléments de planification
  // ========================================
  { 
    label: 'Agenda JCI', 
    category: 'Agenda', 
    url: '/backgrounds/background_agenda.svg' 
  },
  { 
    label: 'Agenda Planning', 
    category: 'Agenda', 
    url: '/backgrounds/background_agenda_2.svg' 
  },
  { 
    label: 'Agenda Chronologie', 
    category: 'Agenda', 
    url: '/backgrounds/background_agenda_3.svg' 
  },

  // ========================================
  // MOTIVATION : Designs inspirants
  // Flèches ascendantes, étoiles, sommets et réussites
  // ========================================
  { 
    label: 'Motivation Leadership', 
    category: 'Motivation', 
    url: '/backgrounds/background_motivation.svg' 
  },
  { 
    label: 'Motivation Ascension', 
    category: 'Motivation', 
    url: '/backgrounds/background_motivation_2.svg' 
  },
  { 
    label: 'Motivation Inspiration', 
    category: 'Motivation', 
    url: '/backgrounds/background_motivation_3.svg' 
  },

  // ========================================
  // GRATITUDE : Designs chaleureux
  // Cœurs, remerciements, chaleur et appréciation
  // ========================================
  { 
    label: 'Gratitude Chaleureuse', 
    category: 'Gratitude', 
    url: '/backgrounds/background_gratitude.svg' 
  },
  { 
    label: 'Gratitude Cœurs', 
    category: 'Gratitude', 
    url: '/backgrounds/background_gratitude_2.svg' 
  },
  { 
    label: 'Gratitude Élégante', 
    category: 'Gratitude', 
    url: '/backgrounds/background_gratitude_3.svg' 
  }
];

export const SOCIAL_ICONS = [
  // Réseaux principaux
  { name: 'facebook', label: 'Facebook', path: 'M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z', color: '#1877F2' },
  { name: 'instagram', label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z', color: '#E4405F' },
  { name: 'linkedin', label: 'LinkedIn', path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z', color: '#0077B5' },
  { name: 'whatsapp', label: 'WhatsApp', path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.411 0 .01 5.403.007 12.04c0 2.12.54 4.19 1.563 6.02L0 24l6.124-1.605a11.822 11.822 0 005.922 1.577h.004c6.639 0 12.04-5.403 12.042-12.04a11.75 11.75 0 00-3.517-8.411z', color: '#25D366' },
  // X (Twitter)
  { name: 'x', label: 'X (Twitter)', path: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z', color: '#000000' },
  // YouTube
  { name: 'youtube', label: 'YouTube', path: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z', color: '#FF0000' },
  // TikTok
  { name: 'tiktok', label: 'TikTok', path: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z', color: '#000000' },
  // Website/Globe
  { name: 'website', label: 'Site Web', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z', color: '#666666' },
  // Email
  { name: 'email', label: 'Email', path: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z', color: '#EA4335' },
  // Phone
  { name: 'phone', label: 'Téléphone', path: 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-939 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z', color: '#4CAF50' }
];

export const PARTNERS = [
  { name: 'Banque Alimentaire', logo: partnerBanqueAlimentaire, color: '#F37021' },
  { name: 'CREDO MÉDIA', logo: partnerCredoMedia, color: '#00B4B0' },
  { name: 'ONG Yves & Lucienne Millet', logo: partnerONG, color: '#2E7D32' },
  { name: 'Mairie', logo: partnerMairie, color: '#1565C0' },
  { name: 'Partenaire 2', logo: partner2, color: '#EF6C00' },
  { name: 'Partenaire 3', logo: partner3, color: '#6A1B9A' },
  { name: 'Partenaire 4', logo: partner4, color: '#C62828' },
  { name: 'Partenaire 5', logo: partner5, color: '#00838F' }
];

export const DEFAULT_PARTNERS = PARTNERS.map(p => ({ ...p, id: Math.random().toString(36).substr(2, 9) }));
