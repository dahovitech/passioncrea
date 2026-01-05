import React, { useState } from 'react';
import { TemplateType, PosterData, Partner, FormationModule, AssistantTrainer, SocialIcon } from './types';
import { TEMPLATES, JCI_BLUE, JCI_DARK, JCI_WHITE, LOGO_OPTIONS, FONT_OPTIONS, DEFAULT_PARTNERS, LOGO_MANDAT_2026, SOCIAL_ICONS } from './constants';
import TemplateRenderer from './components/TemplateRenderer';
import { Download, Plus, Layout, Palette, X, RefreshCcw, UserCircle, Layers, Trash2, UserPlus, ListPlus, Type as TypeIcon, Image as ImageIcon, Settings, Share2, ImageIcon as BgIcon, CalendarDays, Award } from 'lucide-react';
import * as htmlToImage from 'html-to-image';

// Hooks
import { useHistory } from './hooks/useHistory';
import { useZoom } from './hooks/useZoom';
import { HelpProvider, useHelp } from './contexts/HelpContext';

// Components
import { HistoryControls } from './components/HistoryControls';
import { ZoomControls } from './components/ZoomControls';
import { HelpModal } from './components/HelpModal';

const App: React.FC = () => {
  const [mandateLogo, setMandateLogo] = React.useState(LOGO_MANDAT_2026);
  const [isLoading, setIsLoading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'design' | 'branding' | 'content' | 'partners'>('design');

  // Initial data for the poster
  const initialData: PosterData = {
    templateType: TemplateType.AGENDA,
    variant: 1,
    primaryText: 'ÉVÉNEMENTS À VENIR',
    secondaryText: 'MAI 2024',
    name: '',
    role: '',
    date: '10 MAI',
    imageUrl: '',
    backgroundImageUrl: '',
    agendaItems: [{ id: '1', day: '06', monthShort: 'AVR', title: 'Réunion de zone' }],
    formationModules: [{ id: '1', title: 'Module 1: Leadership JCI', hour: '09:00' }],
    assistants: [],
    accentColor: JCI_BLUE,
    textColor: JCI_DARK,
    backgroundColor: JCI_WHITE,
    selectedLogo: 'color',
    primaryFont: FONT_OPTIONS[0].family,
    partners: [...DEFAULT_PARTNERS],
    socialIcons: [
      { ...SOCIAL_ICONS[0], id: 'fb-1' },
      { ...SOCIAL_ICONS[1], id: 'ig-1' }
    ]
  };

  // Use the useHistory hook for state management with undo/redo support
  const { state: historyState, undo, redo, canUndo, canRedo, push, clear } = useHistory(initialData);
  const data = historyState.present;

  // Use the useZoom hook for zoom controls
  const { zoom, setZoom, increaseZoom, decreaseZoom, resetZoom, toggleFullscreen, isFullscreen } = useZoom();

  // Get help context
  const { hasSeenHelp, startHelp, markHelpSeen } = useHelp();

  const handleTemplateChange = (newType: TemplateType) => {
    const defaults: Record<TemplateType, Partial<PosterData>> = {
      [TemplateType.AGENDA]: {
        primaryText: 'ÉVÉNEMENTS À VENIR',
        secondaryText: 'MAI 2024',
        name: '',
        role: '',
        date: '01 MAI',
        imageUrl: '',
        agendaItems: [{ id: '1', day: '01', monthShort: 'MAI', title: 'Réunion de coordination' }],
        formationModules: [{ id: '1', title: 'Module 1: Leadership', hour: '09:00' }],
        assistants: []
      },
      [TemplateType.FORMATION]: {
        primaryText: 'FORMATION JCI',
        secondaryText: 'Salle de réunion A',
        name: 'Formateur',
        role: 'Expert',
        date: '15 MAI 2024',
        imageUrl: '',
        agendaItems: [{ id: '1', day: '06', monthShort: 'AVR', title: 'Réunion de zone' }],
        formationModules: [{ id: '1', title: 'Module 1: Leadership JCI', hour: '09:00' }],
        assistants: []
      },
      [TemplateType.BIRTHDAY]: {
        primaryText: 'BON ANNIVERSAIRE',
        secondaryText: '',
        name: 'Membre',
        role: 'JCI',
        date: '15 MAI',
        imageUrl: '',
        agendaItems: [{ id: '1', day: '06', monthShort: 'AVR', title: 'Réunion de zone' }],
        formationModules: [{ id: '1', title: 'Module 1: Leadership', hour: '09:00' }],
        assistants: []
      },
      [TemplateType.MOTIVATION]: {
        primaryText: 'La réussite est la somme de petits efforts répétés jour après jour.',
        secondaryText: '',
        name: 'Citation',
        role: 'Inspiration',
        date: '',
        imageUrl: '',
        agendaItems: [{ id: '1', day: '06', monthShort: 'AVR', title: 'Réunion de zone' }],
        formationModules: [{ id: '1', title: 'Module 1: Leadership', hour: '09:00' }],
        assistants: []
      },
      [TemplateType.GRATITUDE]: {
        primaryText: 'REMERCIEMENTS',
        secondaryText: 'MERCI',
        name: 'Personne',
        role: 'Rôle',
        date: '',
        imageUrl: '',
        agendaItems: [{ id: '1', day: '06', monthShort: 'AVR', title: 'Réunion de zone' }],
        formationModules: [{ id: '1', title: 'Module 1: Leadership', hour: '09:00' }],
        assistants: []
      },
      [TemplateType.GREETINGS]: {
        primaryText: 'FÉLICITATIONS',
        secondaryText: '',
        name: '',
        role: '',
        date: '',
        imageUrl: '',
        agendaItems: [{ id: '1', day: '06', monthShort: 'AVR', title: 'Réunion de zone' }],
        formationModules: [{ id: '1', title: 'Module 1: Leadership', hour: '09:00' }],
        assistants: []
      }
    };

    push({
      ...data,
      ...defaults[newType],
      templateType: newType,
      variant: 1
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    push({ ...data, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string, id?: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (field === 'imageUrl') push({ ...data, imageUrl: result });
        if (field === 'backgroundImageUrl') push({ ...data, backgroundImageUrl: result });
        if (field === 'mandate') setMandateLogo(result);
        if (field === 'assistant' && id) {
          push({
            ...data,
            assistants: data.assistants.map(a => a.id === id ? { ...a, imageUrl: result } : a)
          });
        }
        if (field === 'partner' && id) {
          push({
            ...data,
            partners: data.partners.map(p => p.id === id ? { ...p, logo: result } : p)
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addSocial = () => {
    const nextIcon = SOCIAL_ICONS[0];
    push({ ...data, socialIcons: [...data.socialIcons, { ...nextIcon, id: Date.now().toString() }] });
  };

  const addAgendaItem = () => {
    push({
      ...data,
      agendaItems: [...data.agendaItems, { id: Date.now().toString(), day: '01', monthShort: 'MOI', title: 'Nouvel événement' }]
    });
  };

  const removeAgendaItem = (id: string) => {
    push({ ...data, agendaItems: data.agendaItems.filter(item => item.id !== id) });
  };

  const updateAgendaItem = (id: string, field: string, value: string) => {
    push({
      ...data,
      agendaItems: data.agendaItems.map(item => item.id === id ? { ...item, [field]: value } : item)
    });
  };

  const addModule = () => push({
    ...data,
    formationModules: [...data.formationModules, { id: Date.now().toString(), title: 'Nouveau module', hour: '09:00' }]
  });

  const addAssistant = () => push({
    ...data,
    assistants: [...data.assistants, { id: Date.now().toString(), name: 'Nom Assistant', role: 'Co-formateur', imageUrl: '' }]
  });

  const addPartner = () => push({
    ...data,
    partners: [...data.partners, { id: Date.now().toString(), name: 'Partenaire', logo: '', color: JCI_BLUE }]
  });

  const handleExport = async (format: 'png' | 'jpg') => {
    setIsLoading(true);
    try {
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const node = document.getElementById('poster-canvas');
      if (!node) throw new Error('Poster element not found');
      
      const images = Array.from(node.querySelectorAll('img'));
      for (const img of images) {
        if (!(img as HTMLImageElement).complete) {
          await new Promise(resolve => {
            (img as HTMLImageElement).onload = () => resolve();
            (img as HTMLImageElement).onerror = () => resolve();
          });
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let dataUrl: string;
      
      if (format === 'png') {
        dataUrl = await htmlToImage.toPng(node, {
          pixelRatio: 2,
          backgroundColor: '#ffffff',
          skipAutoScale: true
        });
      } else {
        dataUrl = await htmlToImage.toJpeg(node, {
          pixelRatio: 2,
          quality: 0.95,
          backgroundColor: '#ffffff',
          skipAutoScale: true
        });
      }
      
      const link = document.createElement('a');
      link.download = `PassionCrea_${Date.now()}.${format}`;
      link.href = dataUrl;
      link.click();
      
    } catch (err) {
      console.error('Export error:', err);
      alert('Erreur d\'exportation: ' + (err instanceof Error ? err.message : 'Erreur inconnue'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-100 font-sans h-screen overflow-hidden" id="app-container">
      {/* SIDEBAR - LÉGÈREMENT ÉLARGIE POUR LA LISIBILITÉ (320px) */}
      <aside className="w-full md:w-[320px] bg-white border-r flex flex-col shadow-xl z-30 overflow-hidden shrink-0" id="sidebar">
        <div className="p-3 border-b flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <div className="bg-[#005596] p-1.5 rounded text-white shadow-sm"><Layout size={16}/></div>
            <h1 className="text-sm font-black text-[#005596] tracking-tighter uppercase">PassionCréa</h1>
          </div>
          <HistoryControls
            canUndo={canUndo}
            canRedo={canRedo}
            onUndo={undo}
            onRedo={redo}
            onClear={clear}
          />
        </div>

        <div className="flex border-b bg-slate-50">
          {(['design', 'branding', 'content', 'partners'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-wider transition-all relative ${activeTab === tab ? 'text-[#005596] bg-white' : 'text-slate-400 hover:bg-slate-100'}`}
              id={tab === 'content' ? 'sidebar-content' : tab === 'branding' ? 'sidebar-branding' : tab === 'partners' ? 'sidebar-partners' : undefined}
            >
              {tab === 'design' ? 'Design' : tab === 'branding' ? 'Identité' : tab === 'content' ? 'Contenu' : 'Partenaires'}
              {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#005596]" />}
            </button>
          ))}
        </div>

        <div className="flex-grow overflow-y-auto p-3 space-y-4 pb-24">
          {activeTab === 'design' && (
            <div className="space-y-4 animate-in slide-in-from-left-1 duration-200">
              <section>
                <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Layers size={12}/> Modèles</h2>
                <div className="grid grid-cols-3 gap-1.5">
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => handleTemplateChange(t.id)}
                      className={`flex flex-col items-center p-2 rounded-lg border-2 transition-all ${data.templateType === t.id ? 'border-[#005596] bg-blue-50 text-[#005596]' : 'border-slate-100 grayscale opacity-60 hover:opacity-100'}`}>
                      <span className="text-lg mb-1">{t.icon}</span>
                      <span className="text-[8px] font-black uppercase text-center leading-none">{t.label}</span>
                    </button>
                  ))}
                </div>
              </section>
              <section>
                <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Palette size={12}/> Variantes</h2>
                <div className="grid grid-cols-3 gap-1.5">
                  {[1, 2, 3].map(v => (
                    <button key={v} onClick={() => push({ ...data, variant: v as 1 | 2 | 3 })}
                      className={`py-2 rounded-lg border-2 text-[10px] font-black transition-all ${data.variant === v ? 'bg-[#005596] border-[#005596] text-white shadow-sm' : 'bg-white border-slate-200 text-slate-400 hover:border-blue-200'}`}>
                      V{v}
                    </button>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'branding' && (
            <div className="space-y-4 animate-in slide-in-from-left-1 duration-200">
              <section className="bg-slate-50 p-2.5 rounded-xl space-y-2 border border-slate-100">
                <h2 className="text-[11px] font-black text-[#005596] uppercase tracking-widest flex items-center gap-1.5"><Settings size={12}/> Identité Visuelle</h2>
                <div className="grid grid-cols-1 gap-2">
                  <div>
                    <label className="text-[9px] font-bold text-slate-500 uppercase block mb-1 ml-0.5">Logo JCI</label>
                    <select name="selectedLogo" value={data.selectedLogo} onChange={handleInputChange} className="w-full p-1.5 bg-white border rounded text-[11px] text-black font-bold outline-none">
                      {LOGO_OPTIONS.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-slate-500 uppercase block mb-1 ml-0.5">Police</label>
                    <select name="primaryFont" value={data.primaryFont} onChange={handleInputChange} className="w-full p-1.5 bg-white border rounded text-[11px] text-black font-bold outline-none">
                      {FONT_OPTIONS.map(f => <option key={f.id} value={f.family}>{f.label}</option>)}
                    </select>
                  </div>
                </div>
                <label className="flex items-center gap-2 p-2 bg-white border border-dashed border-slate-200 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                  <div className="w-6 h-6 flex items-center justify-center bg-slate-50 rounded overflow-hidden shadow-sm"><img src={mandateLogo} className="object-contain" /></div>
                  <span className="text-[10px] font-bold text-[#005596] uppercase">Logo Mandat</span>
                  <input type="file" onChange={(e) => handleImageUpload(e, 'mandate')} className="hidden" accept="image/*" />
                </label>
              </section>

              <section className="bg-blue-50/20 p-2.5 rounded-xl space-y-2 border border-blue-100/50">
                <h2 className="text-[11px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><BgIcon size={12}/> Fond & Couleurs</h2>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase ml-0.5">Fond</label>
                    <div className="flex gap-1.5 items-center bg-white p-1 rounded-lg border">
                      <input type="color" name="backgroundColor" value={data.backgroundColor} onChange={handleInputChange} className="w-4 h-4 rounded-md border-none p-0 cursor-pointer overflow-hidden" />
                      <span className="text-[10px] font-mono opacity-60 uppercase truncate">{data.backgroundColor}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase ml-0.5">Accent</label>
                    <div className="flex gap-1.5 items-center bg-white p-1 rounded-lg border">
                      <input type="color" name="accentColor" value={data.accentColor} onChange={handleInputChange} className="w-4 h-4 rounded-md border-none p-0 cursor-pointer overflow-hidden" />
                      <span className="text-[10px] font-mono opacity-60 uppercase truncate">{data.accentColor}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <label className="flex-1 flex items-center justify-center gap-2 p-1.5 bg-white border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 text-[10px] font-bold uppercase transition-colors">
                    <BgIcon size={12} className="text-slate-400"/> Image de Fond
                    <input type="file" onChange={(e) => handleImageUpload(e, 'backgroundImageUrl')} className="hidden" accept="image/*" />
                  </label>
                  {data.backgroundImageUrl && (
                    <button onClick={() => push({ ...data, backgroundImageUrl: '' })} className="p-1.5 bg-red-50 text-red-500 border border-red-100 rounded-lg hover:bg-red-100 transition-colors">
                      <Trash2 size={12}/>
                    </button>
                  )}
                </div>
              </section>

              <section className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Share2 size={12}/> Réseaux Sociaux</h2>
                  <button onClick={addSocial} className="p-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"><Plus size={10}/></button>
                </div>
                <div className="space-y-1">
                  {data.socialIcons.map(icon => (
                    <div key={icon.id} className="flex items-center gap-1.5 p-1.5 bg-white border rounded-lg group">
                       <select value={icon.name} onChange={e => {
                         const match = SOCIAL_ICONS.find(s => s.name === e.target.value);
                         if (match) push({ ...data, socialIcons: data.socialIcons.map(si => si.id === icon.id ? { ...si, ...match } : si) });
                       }} className="flex-1 p-1 bg-slate-50 rounded text-[11px] font-bold text-black border-none outline-none">
                         {SOCIAL_ICONS.map(s => <option key={s.name} value={s.name}>{s.label}</option>)}
                       </select>
                       <input type="color" value={icon.color} onChange={e => push({ ...data, socialIcons: data.socialIcons.map(si => si.id === icon.id ? { ...si, color: e.target.value } : si) })} className="w-4 h-4 rounded-md border-none p-0 cursor-pointer" />
                       <button onClick={() => push({ ...data, socialIcons: data.socialIcons.filter(si => si.id !== icon.id) })} className="text-red-300 hover:text-red-500 transition-colors"><X size={10}/></button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-4 animate-in slide-in-from-left-1 duration-200">
              <section className="space-y-2">
                <div className="flex items-center gap-2.5 p-2 bg-blue-50/30 rounded-xl border border-blue-100/50">
                  <div className="w-12 h-12 rounded-lg bg-white border shadow-sm overflow-hidden relative flex items-center justify-center group shrink-0">
                    {data.imageUrl ? <img src={data.imageUrl} className="w-full h-full object-cover" /> : <UserCircle size={20} className="text-slate-200"/>}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity pointer-events-none"><ImageIcon size={14} className="text-white"/></div>
                    <input type="file" onChange={(e) => handleImageUpload(e, 'imageUrl')} className="absolute inset-0 opacity-0 cursor-pointer z-10" accept="image/*" />
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-[#005596] uppercase leading-none">Photo du Sujet</p>
                    <p className="text-[9px] text-slate-400 italic">Cliquer pour importer</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase block ml-1">Message / Titre Principal</label>
                  <textarea name="primaryText" value={data.primaryText} onChange={handleInputChange} rows={2} className="w-full p-2 bg-slate-50 border rounded-lg text-[11px] font-medium text-black focus:bg-white focus:ring-1 focus:ring-blue-100 outline-none transition-all" />
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-0.5">
                      <label className="text-[9px] text-slate-400 uppercase ml-1">Nom</label>
                      <input name="name" value={data.name} onChange={handleInputChange} className="w-full p-1.5 bg-slate-50 border rounded-lg text-[11px] font-bold text-black" placeholder="Nom Complet" />
                    </div>
                    <div className="space-y-0.5">
                      <label className="text-[9px] text-slate-400 uppercase ml-1">Rôle</label>
                      <input name="role" value={data.role} onChange={handleInputChange} className="w-full p-1.5 bg-slate-50 border rounded-lg text-[11px] text-black" placeholder="Ex: Sénateur" />
                    </div>
                    <div className="space-y-0.5">
                      <label className="text-[9px] text-slate-400 uppercase ml-1">Date</label>
                      <input name="date" value={data.date} onChange={handleInputChange} className="w-full p-1.5 bg-slate-50 border rounded-lg text-[11px] font-bold text-black" placeholder="Ex: 10 MAI" />
                    </div>
                    <div className="space-y-0.5">
                      <label className="text-[9px] text-slate-400 uppercase ml-1">Détails</label>
                      <input name="secondaryText" value={data.secondaryText} onChange={handleInputChange} className="w-full p-1.5 bg-slate-50 border rounded-lg text-[11px] text-black" placeholder="Lieu / Info" />
                    </div>
                  </div>
                </div>
              </section>

              {data.templateType === TemplateType.AGENDA && (
                <section className="border-t pt-3 space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <h3 className="text-[11px] font-black uppercase text-[#005596] tracking-widest flex items-center gap-1.5"><CalendarDays size={12}/> Agenda de l'Évènement</h3>
                    <button onClick={addAgendaItem} className="p-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"><Plus size={10}/></button>
                  </div>
                  <div className="space-y-1">
                    {data.agendaItems.map(item => (
                      <div key={item.id} className="p-1.5 bg-slate-50 border rounded-lg flex flex-col gap-1.5 relative group">
                        <div className="flex gap-1.5">
                          <input value={item.day} onChange={e => updateAgendaItem(item.id, 'day', e.target.value)} className="w-8 p-1 text-[11px] border rounded bg-white font-black text-center text-black" placeholder="JJ" />
                          <input value={item.monthShort} onChange={e => updateAgendaItem(item.id, 'monthShort', e.target.value)} className="w-10 p-1 text-[11px] border rounded bg-white font-bold text-center text-black" placeholder="MOIS" />
                          <input value={item.title} onChange={e => updateAgendaItem(item.id, 'title', e.target.value)} className="flex-1 p-1 text-[11px] border rounded bg-white text-black" placeholder="Titre de l'évènement" />
                        </div>
                        <button onClick={() => removeAgendaItem(item.id)} className="absolute -top-1.5 -right-1.5 p-1 bg-white text-red-400 rounded-full shadow-md opacity-0 group-hover:opacity-100 hover:text-red-600 transition-all">
                          <X size={10}/>
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {data.templateType === TemplateType.FORMATION && (
                <section className="border-t pt-3 space-y-3">
                   <div>
                      <div className="flex justify-between items-center mb-1.5 px-1">
                         <h3 className="text-[11px] font-black uppercase text-[#005596] tracking-widest">Programme</h3>
                         <button onClick={addModule} className="p-1 bg-blue-600 text-white rounded-md transition-colors"><Plus size={10}/></button>
                      </div>
                      <div className="space-y-1">
                        {data.formationModules.map(m => (
                          <div key={m.id} className="flex gap-1.5 items-center bg-slate-50 p-1 rounded-lg">
                            <input value={m.hour} onChange={e => push({ ...data, formationModules: data.formationModules.map(mod => mod.id === m.id ? { ...mod, hour: e.target.value } : mod) })} className="w-10 p-1 text-[11px] border rounded bg-white text-black text-center" placeholder="00:00" />
                            <input value={m.title} onChange={e => push({ ...data, formationModules: data.formationModules.map(mod => mod.id === m.id ? { ...mod, title: e.target.value } : mod) })} className="flex-1 p-1 text-[11px] border rounded bg-white text-black" placeholder="Nom du module" />
                            <button onClick={() => push({ ...data, formationModules: data.formationModules.filter(mod => mod.id !== m.id) })} className="text-red-300 hover:text-red-500"><X size={12}/></button>
                          </div>
                        ))}
                      </div>
                   </div>
                   <div>
                      <div className="flex justify-between items-center mb-1.5 px-1">
                         <h3 className="text-[11px] font-black uppercase text-[#005596] tracking-widest">Co-Formateurs</h3>
                         <button onClick={addAssistant} className="p-1 bg-blue-600 text-white rounded-md transition-colors"><Plus size={10}/></button>
                      </div>
                      <div className="space-y-1.5">
                        {data.assistants.map(a => (
                          <div key={a.id} className="flex items-center gap-2 p-1.5 bg-white border border-slate-100 rounded-lg group relative">
                            <div className="w-8 h-8 rounded-lg bg-slate-50 border relative overflow-hidden flex items-center justify-center shrink-0">
                               {a.imageUrl ? <img src={a.imageUrl} className="w-full h-full object-cover" /> : <UserCircle size={14} className="opacity-20"/>}
                               <input type="file" onChange={(e) => handleImageUpload(e, 'assistant', a.id)} className="absolute inset-0 opacity-0 cursor-pointer z-10" accept="image/*" />
                            </div>
                            <div className="flex-1 min-w-0">
                               <input value={a.name} onChange={e => push({ ...data, assistants: data.assistants.map(as => as.id === a.id ? { ...as, name: e.target.value } : as) })} className="w-full bg-transparent text-[11px] font-black border-none p-0 text-black leading-tight" placeholder="Nom" />
                               <input value={a.role} onChange={e => push({ ...data, assistants: data.assistants.map(as => as.id === a.id ? { ...as, role: e.target.value } : as) })} className="w-full bg-transparent text-[9px] text-blue-600 border-none p-0" placeholder="Rôle" />
                            </div>
                            <button onClick={() => push({ ...data, assistants: data.assistants.filter(as => as.id !== a.id) })} className="text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"><X size={12}/></button>
                          </div>
                        ))}
                      </div>
                   </div>
                </section>
              )}
            </div>
          )}

          {activeTab === 'partners' && (
            <div className="space-y-4 animate-in slide-in-from-left-1 duration-200">
              <section className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <h2 className="text-[11px] font-black text-[#005596] uppercase tracking-widest flex items-center gap-1.5"><Award size={12}/> Partenaires</h2>
                  <button onClick={addPartner} className="p-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"><Plus size={10}/></button>
                </div>
                <div className="space-y-1.5">
                  {data.partners.map(partner => (
                    <div key={partner.id} className="p-2 bg-white border border-slate-200 rounded-lg group relative">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-slate-50 border flex items-center justify-center overflow-hidden relative shrink-0">
                          {partner.logo ? (
                            <img src={partner.logo} className="w-full h-full object-contain" />
                          ) : (
                            <span className="text-[8px] font-black text-slate-300 text-center uppercase">{partner.name.substring(0, 3)}</span>
                          )}
                          <input type="file" onChange={(e) => handleImageUpload(e, 'partner', partner.id)} className="absolute inset-0 opacity-0 cursor-pointer z-10" accept="image/*" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <input value={partner.name} onChange={e => push({ ...data, partners: data.partners.map(p => p.id === partner.id ? { ...p, name: e.target.value } : p) })} className="w-full bg-transparent text-[11px] font-bold border-none p-0 text-black" placeholder="Nom du partenaire" />
                        </div>
                        <input type="color" value={partner.color} onChange={e => push({ ...data, partners: data.partners.map(p => p.id === partner.id ? { ...p, color: e.target.value } : p) })} className="w-6 h-6 rounded-md border-none p-0 cursor-pointer shrink-0" />
                        <button onClick={() => push({ ...data, partners: data.partners.filter(p => p.id !== partner.id) })} className="text-red-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><X size={14}/></button>
                      </div>
                    </div>
                  ))}
                  {data.partners.length === 0 && (
                    <p className="text-[10px] text-slate-400 text-center py-4 italic">Aucun partenaire. Cliquez sur + pour en ajouter.</p>
                  )}
                </div>
              </section>
            </div>
          )}
        </div>

        <div className="mt-auto p-2.5 border-t bg-white shadow-inner" id="export-buttons">
          <div className="flex gap-2">
            <button onClick={() => handleExport('png')} disabled={isLoading} className="flex-1 bg-[#005596] text-white py-2 rounded-xl font-black text-[10px] flex items-center justify-center gap-1.5 hover:bg-blue-800 transition-all shadow-sm active:scale-95">
               <Download size={14} /> PNG
            </button>
            <button onClick={() => handleExport('jpg')} disabled={isLoading} className="flex-1 bg-slate-800 text-white py-2 rounded-xl font-black text-[10px] flex items-center justify-center gap-1.5 hover:bg-black transition-all shadow-sm active:scale-95">
               <Download size={14} /> JPG (HQ)
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-grow flex items-center justify-center p-4 bg-slate-200 overflow-hidden relative">
        <div id="preview-wrapper" className="w-full h-full flex items-center justify-center overflow-auto p-4">
            <div id="preview-container" className="origin-center transition-all duration-300 rounded-xl overflow-hidden shrink-0" style={{ transform: `scale(${zoom})` }}>
                <TemplateRenderer 
                  data={data} 
                  mandateLogoUrl={mandateLogo}
                />
            </div>
        </div>
      </main>

      {isLoading && (
        <div id="export-loading" className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center text-white flex-col">
          <RefreshCcw className="animate-spin mb-3 text-blue-400" size={32} />
          <p className="font-black tracking-widest uppercase text-xs animate-pulse">PassionCréa...</p>
        </div>
      )}

      {/* Zoom Controls */}
      <ZoomControls
        zoom={zoom}
        setZoom={setZoom}
        increaseZoom={increaseZoom}
        decreaseZoom={decreaseZoom}
        resetZoom={resetZoom}
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
      />

      {/* Help Modal - Show if user hasn't seen help yet */}
      {!hasSeenHelp && <HelpModal />}
    </div>
  );
};

const AppWithHelp: React.FC = () => (
  <HelpProvider>
    <App />
  </HelpProvider>
);

export default AppWithHelp;
