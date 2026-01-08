import React from 'react';
import { Clock, MapPin, User, Bookmark, Quote, Award, Calendar, Heart, Zap, Move, ZoomIn, ZoomOut, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Users, Star } from 'lucide-react';
import { TemplateType, PosterData } from '../types';
import { LOGO_OPTIONS, LOGO_JCI_COLOR, JCI_BLUE } from '../constants';

interface Props {
  data: PosterData;
  mandateLogoUrl: string;
  onUpdateData?: (newData: Partial<PosterData>) => void;
}

const TemplateRenderer: React.FC<Props> = ({ data, mandateLogoUrl, onUpdateData }) => {
  const { 
    templateType, variant, primaryText, secondaryText, name, role, date, 
    imageUrl, imageZoom, imagePosX, imagePosY, backgroundImageUrl, backgroundOpacity, accentColor, textColor, backgroundColor, selectedLogo, primaryFont, birthdayTitleFont, partners, socialIcons,
    formationModules, assistants, agendaItems,
    nameColor, roleColor, dateColor, primaryTextColor
  } = data;

  const getSelectedLogoPath = () => {
    const option = LOGO_OPTIONS.find(opt => opt.id === selectedLogo);
    return option ? option.path : LOGO_JCI_COLOR;
  };

  // Helper component for adjustable subject image
  const SubjectImage = ({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) => {
    const handleAdjust = (field: keyof PosterData, value: number) => {
      if (onUpdateData) onUpdateData({ [field]: value });
    };

    return (
      <div className={`relative group overflow-hidden ${className}`} style={style}>
        {imageUrl ? (
          <img 
            src={imageUrl} 
            className="w-full h-full object-cover origin-center transition-transform duration-75" 
            style={{ 
              transform: `scale(${imageZoom}) translate(${imagePosX / imageZoom}px, ${imagePosY / imageZoom}px)` 
            }} 
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center">
            <User size={64} className="text-slate-300" />
          </div>
        )}

        {/* Interactive Controls Overlay - Hidden on export */}
        {imageUrl && onUpdateData && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 no-export z-50">
            <div className="flex gap-2">
              <button onClick={() => handleAdjust('imageZoom', imageZoom + 0.1)} className="p-2 bg-white rounded-full hover:bg-blue-50 text-blue-600 shadow-lg"><ZoomIn size={20}/></button>
              <button onClick={() => handleAdjust('imageZoom', Math.max(0.5, imageZoom - 0.1))} className="p-2 bg-white rounded-full hover:bg-blue-50 text-blue-600 shadow-lg"><ZoomOut size={20}/></button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div />
              <button onClick={() => handleAdjust('imagePosY', imagePosY - 10)} className="p-2 bg-white rounded-full hover:bg-blue-50 text-slate-700 shadow-lg"><ArrowUp size={16}/></button>
              <div />
              <button onClick={() => handleAdjust('imagePosX', imagePosX - 10)} className="p-2 bg-white rounded-full hover:bg-blue-50 text-slate-700 shadow-lg"><ArrowLeft size={16}/></button>
              <div className="p-2 bg-blue-600 rounded-full text-white shadow-lg"><Move size={16}/></div>
              <button onClick={() => handleAdjust('imagePosX', imagePosX + 10)} className="p-2 bg-white rounded-full hover:bg-blue-50 text-slate-700 shadow-lg"><ArrowRight size={16}/></button>
              <div />
              <button onClick={() => handleAdjust('imagePosY', imagePosY + 10)} className="p-2 bg-white rounded-full hover:bg-blue-50 text-slate-700 shadow-lg"><ArrowDown size={16}/></button>
              <div />
            </div>
            <p className="text-[10px] font-black text-white uppercase tracking-widest bg-[#005596] px-3 py-1 rounded-full">Ajuster Cadrage</p>
          </div>
        )}
      </div>
    );
  };

  const Header = () => (
    <div className="absolute top-10 px-12 left-0 right-0 flex justify-between items-center z-[100]">
      <img src={getSelectedLogoPath()} alt="JCI" style={{ height: '110px', objectFit: 'contain' }} loading="eager" />
      <img src={mandateLogoUrl} alt="Mandat" style={{ height: '110px', objectFit: 'contain' }} loading="eager" />
    </div>
  );

  const Footer = () => (
    <div className="mt-auto h-40 bg-white flex items-center px-12 z-[100] border-t-8 shrink-0" style={{ borderTopColor: accentColor }}>
      <div className="flex items-center gap-6 w-full">
        <div className="flex gap-3 items-center h-14">
          {partners.map(p => (
            <div key={p.id} className="h-full aspect-square flex items-center justify-center bg-white border border-slate-200 rounded-lg p-2 shadow-sm overflow-hidden">
              {p.logo ? <img src={p.logo} className="max-h-full max-w-full object-contain" loading="lazy" decoding="async" /> : <span className="text-[7px] font-black uppercase text-slate-300 text-center">{p.name}</span>}
            </div>
          ))}
        </div>
        <div className="flex gap-2 ml-auto">
          {socialIcons.map(icon => (
            <div key={icon.id} className="w-10 h-10 rounded-full flex items-center justify-center shadow-md border-2 border-white" style={{ backgroundColor: icon.color }}>
               <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d={icon.path}/></svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ModulesList = () => {
    if (formationModules.length === 0) return null;
    return (
      <div className="space-y-3">
        {formationModules.map(m => (
          <div key={m.id} className="flex items-center gap-5">
             <span className="w-16 text-base font-black tracking-tighter" style={{ color: '#C6A967' }}>
               {m.hour}
             </span>
             <span className="text-xl font-black uppercase tracking-tight" style={{ color: textColor }}>{m.title}</span>
          </div>
        ))}
      </div>
    );
  };

  const AssistantsList = () => {
    if (assistants.length === 0) return null;
    return (
      <div className="flex flex-wrap gap-4">
        {assistants.map(a => (
          <div key={a.id} className="flex items-center gap-2.5 bg-white/50 p-1.5 rounded-[20px] border border-slate-100 shadow-sm shrink-0">
             <div className="w-12 h-12 rounded-[14px] overflow-hidden border border-white shadow-sm shrink-0">
                {a.imageUrl ? <img src={a.imageUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-slate-200 flex items-center justify-center"><User size={16} className="text-slate-400"/></div>}
             </div>
             <div className="flex flex-col pr-3">
                <span className="text-[10px] font-black leading-tight" style={{ color: textColor }}>{a.name}</span>
                <span className="text-[7px] uppercase font-black tracking-widest" style={{ color: '#C6A967' }}>
                  {a.role}
                </span>
             </div>
          </div>
        ))}
      </div>
    );
  };

  // --- RENDERERS ---

  const renderAgenda = () => {
    const itemCount = agendaItems.length;
    const getSpaceClass = () => {
      if (itemCount <= 3) return 'space-y-12';
      if (itemCount <= 5) return 'space-y-8';
      if (itemCount <= 7) return 'space-y-4';
      return 'space-y-2';
    };

    if (variant === 1) return (
      <div className="flex-grow pt-56 pb-10 px-12 flex flex-col items-center">
        <div className="flex flex-col items-center shrink-0 mb-8">
          <h2 className="text-7xl font-black italic tracking-tighter mb-4" style={{ color: textColor }}>{primaryText || "AGENDA"}</h2>
          <div className="px-10 py-2.5 rounded-full font-black tracking-[0.4em] uppercase text-xl shadow-xl text-white" style={{ backgroundColor: accentColor }}>{secondaryText}</div>
        </div>
        <div className="flex-grow flex flex-col w-full max-w-4xl min-h-0 overflow-hidden">
          <div className={`w-full ${getSpaceClass()} flex flex-col items-center`}>
            {agendaItems.map((item) => (
              <div key={item.id} className="flex gap-5 items-stretch w-full">
                <div className="w-24 bg-white shadow-xl rounded-[25px] flex flex-col items-center justify-center border-b-[8px] shrink-0" style={{ borderBottomColor: accentColor }}>
                  <span className="text-3xl font-black" style={{ color: textColor }}>{item.day}</span>
                  <span className="text-[9px] font-black uppercase" style={{ color: '#C6A967' }}>{item.monthShort}</span>
                </div>
                <div className="flex-grow bg-white/95 p-5 rounded-[25px] border-l-[15px] flex items-center shadow-lg" style={{ borderLeftColor: accentColor }}>
                  <p className="text-xl font-black uppercase leading-tight" style={{ color: textColor }}>{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    if (variant === 2) return (
      <div className="flex-grow pt-56 pb-10 px-12 flex flex-col">
        <div className="border-l-[25px] pl-10 mb-10" style={{ borderColor: accentColor }}>
          <p className="text-3xl font-bold uppercase tracking-[0.4em]" style={{ color: '#C6A967' }}>{secondaryText || "Planning"}</p>
          <h2 className="text-8xl font-black tracking-tighter uppercase leading-none" style={{ color: textColor }}>{primaryText || "AGENDA"}</h2>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {agendaItems.map((item) => (
            <div key={item.id} className="flex items-center gap-5 p-5 bg-white rounded-[35px] shadow-2xl border-t-4" style={{ borderTopColor: accentColor }}>
              <div className="text-4xl font-bold shrink-0" style={{ color: '#C6A967' }}>{item.day}</div>
              <div>
                <p className="text-lg font-black uppercase tracking-widest leading-none" style={{ color: accentColor }}>{item.monthShort}</p>
                <p className="text-lg font-bold italic" style={{ color: textColor }}>{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div className="flex-grow pt-56 pb-10 px-16 flex flex-col">
        <div className="mb-12 flex justify-between items-end border-b-4 pb-4" style={{ borderColor: accentColor }}>
           <h2 className="text-6xl font-black tracking-tight" style={{ color: textColor }}>{primaryText}</h2>
           <p className="text-2xl font-black uppercase tracking-widest text-[#C6A967]">{secondaryText}</p>
        </div>
        <div className="space-y-6">
          {agendaItems.map((item) => (
            <div key={item.id} className="flex items-center gap-10 group">
              <div className="flex flex-col items-center">
                <span className="text-5xl font-black" style={{ color: accentColor }}>{item.day}</span>
                <span className="text-xs font-black uppercase" style={{ color: '#C6A967' }}>{item.monthShort}</span>
              </div>
              <div className="h-12 w-1.5 rounded-full" style={{ backgroundColor: '#f1f5f9' }}></div>
              <p className="text-2xl font-black uppercase" style={{ color: textColor }}>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderFormation = () => {
    const hasModules = formationModules.length > 0;
    const hasAssistants = assistants.length > 0;
    const isMinimal = !hasModules && !hasAssistants;

    if (variant === 1) return (
      <div className="flex-grow pt-56 px-12 flex flex-col min-h-0 overflow-hidden">
        <div className="mb-8 border-l-[25px] pl-10 shrink-0" style={{ borderColor: accentColor }}>
          <h2 className="text-6xl font-black tracking-tighter uppercase leading-tight" style={{ color: textColor }}>{primaryText}</h2>
        </div>

        <div className="flex-grow grid grid-cols-12 gap-10 min-h-0 overflow-hidden">
          <div className={`col-span-7 flex flex-col ${isMinimal ? 'justify-center items-start' : 'gap-6'} min-h-0 overflow-hidden`}>
            {hasModules && (
              <div className="p-8 bg-slate-50/80 backdrop-blur rounded-[40px] border-l-[20px] shadow-xl overflow-y-auto" style={{ borderColor: accentColor }}>
                <p className="text-[11px] font-black uppercase tracking-[0.5em] mb-6 flex items-center gap-2" style={{ color: '#C6A967' }}><Calendar size={16}/> PROGRAMME</p>
                <ModulesList />
              </div>
            )}
            <div className={`grid ${hasModules ? 'grid-cols-2' : 'grid-cols-1'} gap-4 shrink-0 ${isMinimal ? 'w-full max-w-xl scale-110' : ''}`}>
               <div className="p-8 bg-white/90 rounded-[35px] shadow-lg border-b-8" style={{ borderBottomColor: accentColor }}>
                  <p className="text-[11px] font-black uppercase mb-2" style={{ color: '#C6A967' }}>DATE</p>
                  <p className={`${isMinimal ? 'text-4xl' : 'text-2xl'} font-black transition-all duration-500`} style={{ color: textColor }}>{date}</p>
               </div>
               <div className="p-8 bg-white/90 rounded-[35px] shadow-lg border-b-8" style={{ borderBottomColor: accentColor }}>
                  <p className="text-[11px] font-black uppercase mb-2" style={{ color: '#C6A967' }}>LIEU</p>
                  <p className={`${isMinimal ? 'text-4xl' : 'text-2xl'} font-black transition-all duration-500`} style={{ color: textColor }}>{secondaryText}</p>
               </div>
            </div>
          </div>

          <div className="col-span-5 flex flex-col items-center justify-center">
            <SubjectImage className={`${isMinimal ? 'w-80 h-80' : 'w-full aspect-square'} rounded-[60px] border-[20px] border-white shadow-2xl mb-8 transition-all duration-700`} />
            <div className="text-center">
              <p className={`${isMinimal ? 'text-4xl' : 'text-4xl'} font-black uppercase tracking-tighter transition-all duration-700`} style={{ color: textColor }}>{name}</p>
              <p className={`${isMinimal ? 'text-lg' : 'text-lg'} font-black tracking-[0.3em] uppercase mt-2`} style={{ color: '#C6A967' }}>{role}</p>
            </div>
            {hasAssistants && (
              <div className="mt-8 w-full animate-in slide-in-from-bottom-4 duration-500">
                <p className="text-[9px] font-black text-center uppercase tracking-widest mb-3" style={{ color: '#C6A967' }}>CO-FORMATEURS</p>
                <div className="flex justify-center"><AssistantsList /></div>
              </div>
            )}
          </div>
        </div>
      </div>
    );

    if (variant === 2) return (
      <div className={`flex-grow pt-48 px-12 flex flex-col min-h-0 overflow-hidden transition-all duration-500`}>
        <div className="mb-10 self-start flex flex-col shrink-0">
           <h2 className={`${isMinimal ? 'text-6xl' : 'text-7xl'} font-black uppercase tracking-tighter leading-none mb-4 transition-all duration-700`} style={{ color: textColor }}>{primaryText}</h2>
           <div className={`h-2 ${isMinimal ? 'w-48' : 'w-48'} rounded-full transition-all duration-700`} style={{ backgroundColor: '#C6A967' }}></div>
        </div>

        <div className="flex-grow grid grid-cols-12 gap-12 min-h-0 overflow-hidden">
          <div className={`${isMinimal ? 'col-span-12' : 'col-span-5'} flex flex-col ${isMinimal ? 'items-center pt-10' : ''} justify-center min-h-0 transition-all duration-700`}>
             <div className="relative shrink-0 flex justify-center">
               <SubjectImage className={`${isMinimal ? 'w-[420px] h-[420px]' : 'w-full aspect-square'} rounded-[80px] border-[25px] border-white shadow-2xl relative z-10 transition-all duration-700`} />
               <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white/95 ${isMinimal ? 'px-14 py-7' : 'px-12 py-6'} rounded-[40px] shadow-2xl border-t-[10px] z-20 min-w-[320px] transition-all duration-700`} style={{ borderTopColor: accentColor }}>
                  <p className={`${isMinimal ? 'text-4xl' : 'text-3xl'} font-black text-center leading-none transition-all`} style={{ color: textColor }}>{name}</p>
                  <p className={`${isMinimal ? 'text-[13px]' : 'text-[12px]'} font-bold uppercase tracking-[0.3em] text-center mt-3 transition-all`} style={{ color: '#C6A967' }}>{role}</p>
               </div>
             </div>
             
             {isMinimal && (
               <div className="mt-20 flex gap-12 items-center animate-in fade-in duration-1000">
                  <div className="flex items-center gap-4 text-3xl font-black" style={{ color: textColor }}>
                    <div className="p-4 rounded-[22px] bg-white shadow-xl" style={{ color: '#C6A967' }}><Clock size={32}/></div>
                    {date}
                  </div>
                  <div className="h-10 w-0.5 bg-slate-200"></div>
                  <div className="flex items-center gap-4 text-3xl font-black" style={{ color: textColor }}>
                    <div className="p-4 rounded-[22px] bg-white shadow-xl" style={{ color: '#C6A967' }}><MapPin size={32}/></div>
                    {secondaryText}
                  </div>
               </div>
             )}

             {!isMinimal && (
               <div className={`mt-20 flex flex-col gap-8 pl-4`}>
                  <div className="flex items-center gap-6 text-2xl font-black" style={{ color: textColor }}>
                    <div className="p-4 rounded-[25px] bg-white shadow-xl" style={{ color: '#C6A967' }}><Clock size={28}/></div>
                    {date}
                  </div>
                  <div className="flex items-center gap-6 text-2xl font-black" style={{ color: textColor }}>
                    <div className="p-4 rounded-[25px] bg-white shadow-xl" style={{ color: '#C6A967' }}><MapPin size={28}/></div>
                    {secondaryText}
                  </div>
               </div>
             )}
          </div>

          {!isMinimal && (
            <div className="col-span-7 flex flex-col min-h-0 overflow-hidden">
               {hasModules && (
                 <div className="flex-grow bg-white/90 backdrop-blur p-12 rounded-[70px] shadow-2xl border-r-[20px] overflow-y-auto mb-10" style={{ borderRightColor: accentColor }}>
                    <p className="text-[14px] font-black uppercase mb-10 tracking-[0.4em]" style={{ color: '#C6A967' }}>DÉROULEMENT</p>
                    <ModulesList />
                 </div>
               )}
               
               {hasAssistants && (
                 <div className="shrink-0 bg-white/40 p-8 rounded-[50px] border border-white/50 backdrop-blur-sm shadow-inner">
                   <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-5 flex items-center gap-2" style={{ color: '#C6A967' }}><Users size={16}/> ÉQUIPE PÉDAGOGIQUE</p>
                   <AssistantsList />
                 </div>
               )}
            </div>
          )}
        </div>
      </div>
    );

    // VARIANT 3 - Mode Minimal Optimisé
    return (
      <div className="flex-grow pt-56 px-16 flex flex-col relative min-h-0 overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03] pointer-events-none" style={{ backgroundColor: accentColor }}></div>

         <div className="relative z-10 flex flex-col h-full overflow-hidden">
            <div className="mb-10 shrink-0 flex items-baseline gap-4">
              <h2 className={`${isMinimal ? 'text-6xl' : 'text-8xl'} font-black tracking-tighter uppercase leading-[0.8] transition-all duration-700`} style={{ color: textColor }}>{primaryText}</h2>
              <div className="h-1 flex-grow bg-slate-100"></div>
            </div>

            <div className="grid grid-cols-12 gap-10 flex-grow min-h-0 overflow-hidden">
               <div className={`${isMinimal ? 'col-span-5' : 'col-span-5'} flex flex-col items-center justify-center min-h-0 transition-all duration-700`}>
                  <SubjectImage className={`${isMinimal ? 'w-[380px] h-[380px]' : 'w-full aspect-square'} rounded-full shadow-[0_40px_80px_-20px_rgba(0,0,0,0.35)] mb-10 border-white border-[15px] shrink-0 transition-all duration-700`} />
                  <div className="text-center">
                    <p className={`${isMinimal ? 'text-4xl' : 'text-4xl'} font-black uppercase tracking-tighter transition-all duration-700`} style={{ color: textColor }}>{name}</p>
                    <div className={`inline-block mt-4 px-10 py-3 rounded-full text-white font-black ${isMinimal ? 'text-[11px]' : 'text-sm'} uppercase tracking-widest shadow-xl transition-all duration-700`} style={{ backgroundColor: accentColor }}>
                      {role}
                    </div>
                  </div>
               </div>

               <div className={`${isMinimal ? 'col-span-7 pl-12' : 'col-span-7'} flex flex-col justify-center overflow-hidden transition-all duration-700`}>
                  <div className={`flex flex-col ${isMinimal ? 'gap-8' : 'gap-10'} ${!isMinimal ? 'border-b-2 border-slate-50 pb-10' : ''} shrink-0 transition-all`}>
                    <div className="space-y-2">
                      <p className={`${isMinimal ? 'text-base' : 'text-[11px]'} font-black uppercase tracking-widest transition-all`} style={{ color: '#C6A967' }}>QUAND</p>
                      <p className={`${isMinimal ? 'text-5xl' : 'text-4xl'} font-black transition-all duration-700 leading-none`} style={{ color: textColor }}>{date}</p>
                    </div>
                    <div className="space-y-2">
                      <p className={`${isMinimal ? 'text-base' : 'text-[11px]'} font-black uppercase tracking-widest transition-all`} style={{ color: '#C6A967' }}>OÙ</p>
                      <p className={`${isMinimal ? 'text-5xl' : 'text-4xl'} font-black transition-all duration-700 leading-none`} style={{ color: textColor }}>{secondaryText}</p>
                    </div>
                  </div>

                  {!isMinimal && (
                    <div className="flex-grow overflow-y-auto pt-10 animate-in fade-in duration-1000">
                      {hasModules && (
                        <div className="space-y-8 mb-10">
                           <p className="text-[14px] font-black uppercase tracking-[0.5em] text-[#C6A967]">PROGRAMME</p>
                           <div className="pl-8 border-l-4 border-slate-100">
                             <ModulesList />
                           </div>
                        </div>
                      )}

                      {hasAssistants && (
                        <div className="pt-6 border-t border-slate-50">
                          <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-6" style={{ color: '#C6A967' }}>PANEL INTERVENANTS</p>
                          <AssistantsList />
                        </div>
                      )}
                    </div>
                  )}
               </div>
            </div>
         </div>
      </div>
    );
  };

  const renderBirthday = () => {
    const day = date.split(' ')[0] || "01";
    const month = date.split(' ')[1] || "JAN";

    if (variant === 1) return (
      <div className="flex-grow pt-56 px-20 flex items-center">
        <div className="flex items-center justify-between w-full gap-4">
          <div className="text-left space-y-4 min-w-0 flex-grow">
            <h2 className="italic leading-none" style={{ fontFamily: birthdayTitleFont, fontSize: '4.5rem', color: '#C6A967', textShadow: '3px 3px 0px rgba(0,0,0,0.1)', whiteSpace: 'nowrap' }}>HAPPY<br/>BIRTHDAY</h2>
            <p className="text-5xl font-black tracking-tighter" style={{ color: nameColor || textColor }}>{name}</p>
            <div className="pl-2">
              <p className="text-2xl font-black tracking-[0.4em]" style={{ color: roleColor || '#005596' }}>{role}</p>
              {secondaryText && <p className="text-lg font-bold italic mt-2 opacity-70" style={{ color: textColor }}>{secondaryText}</p>}
            </div>
          </div>
          <div className="relative shrink-0 ml-10">
            <div className="absolute -inset-8 border-[15px] rounded-full opacity-10 animate-spin-slow" style={{ borderColor: accentColor }}></div>
            <div className="absolute -top-4 -right-4 bg-white w-28 h-28 rounded-full flex flex-col items-center justify-center shadow-lg border-[10px] border-white z-[50]" style={{ backgroundColor: accentColor }}>
              <span className="text-4xl font-black leading-none" style={{ color: dateColor || textColor }}>{day}</span>
              <span className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: dateColor || textColor }}>{month}</span>
            </div>
            <SubjectImage className="w-[320px] h-[320px] rounded-full border-[15px] border-white shadow-xl relative z-[10]" />
          </div>
        </div>
      </div>
    );

    if (variant === 2) return (
      <div className="flex-grow flex flex-col items-center pt-56 px-12">
        <h2 className="tracking-widest mb-8" style={{ fontFamily: birthdayTitleFont, fontSize: '4rem', color: '#C6A967', textShadow: '4px 4px 0px rgba(0,0,0,0.15)' }}>HAPPY BIRTHDAY</h2>
        <div className="flex items-center gap-20">
          <SubjectImage className="w-[450px] h-[450px] rounded-[100px] border-[20px] border-white shadow-2xl" />
          <div className="flex-1 space-y-10">
            <div className="border-l-[15px] pl-10" style={{ borderColor: accentColor }}>
               <h2 className="text-6xl font-black leading-none tracking-tighter mb-4" style={{ color: nameColor || textColor }}>{name}</h2>
               <p className="text-3xl font-black tracking-[0.3em]" style={{ color: roleColor || '#005596' }}>{role || primaryText}</p>
            </div>
            <div className="flex items-baseline gap-6">
               <span className="text-9xl font-bold" style={{ color: '#C6A967' }}>{day}</span>
               <span className="text-4xl font-black uppercase tracking-widest" style={{ color: accentColor }}>{month}</span>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="flex-grow pt-56 px-12 flex flex-col items-center justify-center">
         <div className="flex flex-col items-center text-center">
            {/* Header HAPPY BIRTHDAY */}
            <h2 className="text-5xl italic mb-8" style={{ fontFamily: birthdayTitleFont, color: '#C6A967' }}>HAPPY BIRTHDAY</h2>
            
            {/* Photo principale */}
            <div className="relative mb-8">
               <SubjectImage className="w-64 h-64 rounded-full shadow-xl" />
               {/* Badge date */}
               <div className="absolute -bottom-2 -right-2 bg-white rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-lg z-10">
                  <span className="text-3xl font-black leading-none" style={{ color: dateColor || '#C6A967' }}>{day}</span>
                  <span className="text-[7px] font-bold uppercase tracking-widest mt-0.5" style={{ color: accentColor }}>{month}</span>
               </div>
            </div>
            
            {/* Nom */}
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-4 leading-none" style={{ color: nameColor || textColor }}>{name}</h2>
            
            {/* Rôle */}
            <p className="text-xl font-black uppercase tracking-[0.4em]" style={{ color: roleColor || accentColor }}>{role}</p>
            
            {/* Secondary text si présent */}
            {secondaryText && (
               <p className="text-lg font-bold italic opacity-60 mt-4" style={{ color: textColor }}>{secondaryText}</p>
            )}
         </div>
      </div>
    );
  };

  const renderMotivation = () => {
    if (variant === 1) return (
      <div className="flex-grow flex flex-col items-center justify-center px-12 pt-56 text-center relative overflow-hidden">
         <Quote size={400} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]" style={{ color: '#C6A967' }} />
         <div className="text-[140px] mb-2 opacity-20 leading-none" style={{ color: '#C6A967' }}>"</div>
         <h2 className="text-6xl font-black italic leading-[1.3] mb-16 tracking-tighter max-w-5xl z-10" style={{ color: textColor }}>{primaryText}</h2>
         <div className="flex items-center gap-10 z-10">
            <div className="h-1 w-24 rounded-full" style={{ backgroundColor: '#C6A967' }}></div>
            <div className="text-center">
              <p className="text-4xl font-black uppercase tracking-[0.2em]" style={{ color: textColor }}>{name}</p>
              <p className="text-lg font-bold uppercase tracking-widest mt-1" style={{ color: '#C6A967' }}>{role}</p>
            </div>
            <div className="h-1 w-24 rounded-full" style={{ backgroundColor: '#C6A967' }}></div>
         </div>
      </div>
    );

    if (variant === 2) return (
      <div className="flex-grow flex flex-col pt-56 px-20">
         <div className="border-l-[30px] pl-12 py-10" style={{ borderColor: accentColor }}>
           <Quote size={80} className="mb-8" style={{ color: '#C6A967' }} />
           <h2 className="text-5xl font-black leading-tight italic tracking-tight mb-12" style={{ color: textColor }}>
             {primaryText}
           </h2>
           <div className="space-y-1">
             <p className="text-3xl font-black uppercase tracking-widest" style={{ color: accentColor }}>{name}</p>
             <p className="text-xl font-bold uppercase text-slate-400">{role}</p>
           </div>
         </div>
      </div>
    );

    return (
      <div className="flex-grow flex items-center justify-center pt-56 px-16">
        <div className="relative p-16 rounded-[80px] overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundColor: '#C6A967' }}></div>
          <div className="relative z-10 text-center space-y-12">
            <div className="flex justify-center gap-2">
              <Star size={24} fill={accentColor} color={accentColor} />
              <Star size={24} fill={accentColor} color={accentColor} />
              <Star size={24} fill={accentColor} color={accentColor} />
            </div>
            <h2 className="text-7xl font-black uppercase tracking-tighter leading-none italic" style={{ color: textColor }}>
              {primaryText}
            </h2>
            <div className="pt-8">
              <span className="px-10 py-3 rounded-full text-white font-black text-xl tracking-[0.3em] uppercase" style={{ backgroundColor: accentColor }}>
                {name}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderGratitude = () => {
    if (variant === 1) return (
      <div className="flex-grow pt-56 px-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
         <h2 className="text-[250px] font-black italic leading-none mb-10 tracking-tighter opacity-[0.05] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase select-none" style={{ color: '#C6A967' }}>{secondaryText || "MERCI"}</h2>
         <div className="relative z-10 space-y-10 flex flex-col items-center">
            <SubjectImage className="w-72 h-72 rounded-full border-[15px] border-white shadow-2xl mb-6" style={{ boxShadow: `0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 10px ${accentColor}20` }} />
            <p className="text-4xl font-black italic leading-tight max-w-4xl mx-auto" style={{ color: textColor }}>"{primaryText}"</p>
            <div className="flex flex-col items-center pt-4">
               <p className="text-5xl font-black uppercase tracking-tighter mb-1" style={{ color: textColor }}>{name}</p>
               <p className="text-xl font-black uppercase tracking-[0.3em]" style={{ color: '#C6A967' }}>{role}</p>
            </div>
         </div>
      </div>
    );

    if (variant === 2) return (
      <div className="flex-grow pt-56 px-20 flex flex-col justify-center">
        <div className="bg-white/80 backdrop-blur p-16 rounded-[80px] shadow-2xl border-t-[20px]" style={{ borderTopColor: accentColor }}>
           <Award size={80} className="mx-auto mb-10" style={{ color: '#C6A967' }} />
           <p className="text-4xl font-black text-center italic mb-12 leading-relaxed" style={{ color: textColor }}>"{primaryText}"</p>
           <div className="flex items-center gap-8 justify-center">
              <SubjectImage className="w-32 h-32 rounded-[30px] border-4 border-white shadow-lg" />
              <div className="flex flex-col">
                <p className="text-3xl font-black uppercase" style={{ color: accentColor }}>{name}</p>
                <p className="text-lg font-bold text-slate-400 uppercase tracking-widest">{role}</p>
              </div>
           </div>
        </div>
      </div>
    );

    return (
      <div className="flex-grow pt-56 px-12 flex flex-col items-center">
         <div className="w-full bg-white/95 backdrop-blur-md rounded-[60px] border-[12px] border-double p-10 flex flex-col items-center justify-between shadow-2xl relative overflow-hidden" style={{ borderColor: accentColor }}>
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10 rotate-45" style={{ backgroundColor: accentColor }}></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-10 -rotate-12" style={{ backgroundColor: accentColor }}></div>
            <div className="flex flex-col items-center space-y-4 z-10">
               <SubjectImage className="w-48 h-48 rounded-full border-6 border-white shadow-xl" style={{ borderColor: accentColor }} />
               <div className="px-4 py-1.5 rounded-full border-2 font-black uppercase text-xs tracking-[0.5em]" style={{ borderColor: accentColor, color: textColor }}>{primaryText || "HOMMAGE"}</div>
            </div>
            <div className="text-center z-10 px-8">
               <h2 className="text-6xl font-black italic tracking-tighter Bitallic leading-none mb-4" style={{ color: textColor }}>{secondaryText || "Merci !"}</h2>
               <p className="text-2xl font-bold italic leading-snug" style={{ color: textColor }}>
                 "{primaryText}"
               </p>
            </div>
            <div className="flex flex-col items-center z-10">
               <div className="h-1 w-24 mb-4 rounded-full" style={{ backgroundColor: accentColor }}></div>
               <p className="text-4xl font-black uppercase tracking-tight" style={{ color: textColor }}>{name}</p>
               <p className="text-base font-bold uppercase tracking-widest opacity-40 mt-1" style={{ color: textColor }}>{role}</p>
               {secondaryText && <p className="text-lg mt-3 font-black italic bg-slate-100 px-6 py-1.5 rounded-full" style={{ color: textColor }}>{secondaryText}</p>}
            </div>
         </div>
      </div>
    );
  };

  const renderTemplate = () => {
    switch (templateType) {
      case TemplateType.AGENDA: return renderAgenda();
      case TemplateType.FORMATION: return renderFormation();
      case TemplateType.BIRTHDAY: return renderBirthday();
      case TemplateType.MOTIVATION: return renderMotivation();
      case TemplateType.GRATITUDE: return renderGratitude();
      default: return renderAgenda();
    }
  };

  return (
    <div 
      id="poster-canvas" 
      className="flex flex-col overflow-hidden relative shadow-2xl shrink-0" 
      style={{ 
        backgroundColor, 
        width: '1080px', 
        height: '1080px',
        fontFamily: primaryFont
      }}
    >
      {backgroundImageUrl && (
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ 
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: backgroundOpacity
          }}
        />
      )}
      <div className="relative z-10 flex flex-col h-full w-full">
        <Header />
        <div className="flex-grow flex flex-col min-h-0 overflow-hidden">
          {renderTemplate()}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default TemplateRenderer;