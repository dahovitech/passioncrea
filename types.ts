
export enum TemplateType {
  AGENDA = 'AGENDA',
  BIRTHDAY = 'BIRTHDAY',
  MOTIVATION = 'MOTIVATION',
  GRATITUDE = 'GRATITUDE',
  GREETINGS = 'GREETINGS',
  FORMATION = 'FORMATION'
}

export interface SocialIcon {
  id: string;
  name: string;
  path: string;
  color: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  color: string;
}

export interface AgendaItem {
  id: string;
  day: string;
  monthShort: string;
  title: string;
}

export interface FormationModule {
  id: string;
  title: string;
  hour: string;
}

export interface AssistantTrainer {
  id: string;
  name: string;
  role: string;
  imageUrl?: string;
}

export interface PosterData {
  templateType: TemplateType;
  variant: 1 | 2 | 3;
  primaryText: string;
  secondaryText: string;
  name: string;
  role: string;
  date: string;
  imageUrl?: string;
  imageZoom: number;
  imagePosX: number;
  imagePosY: number;
  backgroundImageUrl?: string;
  agendaItems: AgendaItem[];
  formationModules: FormationModule[];
  assistants: AssistantTrainer[];
  accentColor: string;
  textColor: string;
  backgroundColor: string;
  selectedLogo: 'color' | 'white' | 'black';
  primaryFont: string;
  birthdayTitleFont: string;
  partners: Partner[];
  socialIcons: SocialIcon[];
  nameColor?: string;
  roleColor?: string;
  dateColor?: string;
  primaryTextColor?: string;
}

export interface TemplateConfig {
  id: TemplateType;
  label: string;
  icon: string;
  description: string;
}
