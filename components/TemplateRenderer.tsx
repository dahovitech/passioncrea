
import React from 'react';
import { Clock, MapPin, User, Bookmark, Quote, Award, Calendar, Heart, Zap, Move, ZoomIn, ZoomOut, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { TemplateType, PosterData } from '../types';
import { LOGO_OPTIONS, LOGO_JCI_COLOR } from '../constants';

interface Props {
  data: PosterData;
  mandateLogoUrl: string;
  onUpdateData?: (newData: Partial<PosterData>) => void;
}

const TemplateRenderer: React.FC<Props> = ({ data, mandateLogoUrl, onUpdateData }) => {
  const { 
    templateType, variant, primaryText, secondaryText, name, role, date, 
    imageUrl, imageZoom, imagePosX, imagePosY, backgroundImageUrl, backgroundImageZoom, backgroundImagePosX, backgroundImagePosY, accentColor, textColor, backgroundColor, selectedLogo, primaryFont, partners, socialIcons,
    formationModules, assistants, agendaItems
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
    <div className="mt-auto h-40 bg-white flex items-center px-12 z-[100] border-t-8" style={{ borderTopColor: accentColor }}>
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

  const ModulesList = () => (
    <div className="space-y-3">
      {formationModules.map(m => (
        <div key={m.id} className="flex items-center gap-5">
           <span className="w-16 text-base font-black opacity-30 tracking-tighter" style={{ color: textColor }}>{m.hour}</span>
           <span className="text-xl font-black uppercase tracking-tight" style={{ color: textColor }}>{m.title}</span>
        </div>
      ))}
    </div>
  );

  const AssistantsList = () => (
    <div className="flex flex-wrap gap-4 mt-6">
      {assistants.map(a => (
        <div key={a.id} className="flex items-center gap-3 bg-white/10 p-2.5 rounded-[25px] backdrop-blur-xl border border-white/20 shadow-xl">
           <div className="w-16 h-16 rounded-[18px] overflow-hidden border-2 border-white shadow-md">
              {a.imageUrl ? <img src={a.imageUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-slate-200 flex items-center justify-center"><User size={20} className="text-slate-400"/></div>}
           </div>
           <div className="flex flex-col">
              <span className="text-base font-black leading-none" style={{ color: textColor }}>{a.name}</span>
              <span className="text-[9px] opacity-80 uppercase font-black mt-1 tracking-[0.2em]" style={{ color: textColor }}>{a.role}</span>
           </div>
        </div>
      ))}
    </div>
  );

  // --- RENDERERS ---

  const renderAgenda = () => {
    if (variant === 1) return (
      <div className="flex-grow pt-52 px-12 flex flex-col items-center">
        <h2 className="text-7xl font-black italic tracking-tighter mb-4" style={{ color: textColor }}>{primaryText || "AGENDA"}</h2>
        <div className="px-10 py-2.5 rounded-full font-black tracking-[0.4em] uppercase mb-10 text-xl shadow-xl text-white" style={{ backgroundColor: accentColor }}>{secondaryText}</div>
        <div className="w-full space-y-4 max-w-4xl">
          {agendaItems.map((item) => (
            <div key={item.id} className="flex gap-5 items-stretch">
              <div className="w-24 bg-white shadow-xl rounded-[25px] flex flex-col items-center justify-center border-b-[8px]" style={{ borderBottomColor: accentColor }}>
                <span className="text-3xl font-black" style={{ color: textColor }}>{item.day}</span>
                <span className="text-[9px] font-black uppercase opacity-60" style={{ color: textColor }}>{item.monthShort}</span>
              </div>
              <div className="flex-grow bg-white/95 p-5 rounded-[25px] border-l-[15px] flex items-center shadow-lg" style={{ borderLeftColor: accentColor }}>
                <p className="text-xl font-black uppercase leading-tight" style={{ color: textColor }}>{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
    if (variant === 2) return (
      <div className="flex-grow pt-56 px-12 flex flex-col">
        <div className="border-l-[25px] pl-10 mb-10" style={{ borderColor: accentColor }}>
          <p className="text-3xl font-black opacity-10 uppercase tracking-[0.4em]" style={{ color: textColor }}>{primaryText || "Planning"}</p>
          <h2 className="text-8xl font-black tracking-tighter uppercase leading-none" style={{ color: textColor }}>{primaryText || "Missions"}</h2>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {agendaItems.map((item) => (
            <div key={item.id} className="flex items-center gap-5 p-5 bg-white rounded-[35px] shadow-2xl border-t-4" style={{ borderTopColor: accentColor }}>
              <div className="text-4xl font-black opacity-10" style={{ color: textColor }}>{item.day}</div>
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
      <div className="flex-grow pt-52 px-12 flex flex-col items-center justify-center">
         <div className="w-full bg-slate-50 border-[10px] border-double rounded-[60px] p-12 shadow-2xl" style={{ borderColor: accentColor }}>
            <h2 className="text-6xl font-black text-center mb-10 uppercase tracking-tighter italic" style={{ color: textColor }}>{primaryText || "Agenda Officiel"}</h2>
            <div className="space-y-5">
               {agendaItems.map(item => (
                 <div key={item.id} className="flex items-center justify-between border-b-2 border-slate-100 pb-4 last:border-0">
                    <p className="text-2xl font-black" style={{ color: textColor }}>{item.title}</p>
                    <div className="bg-white p-3 rounded-xl shadow-md text-center min-w-[100px]" style={{ borderRight: `6px solid ${accentColor}` }}>
                       <p className="text-3xl font-black leading-none" style={{ color: accentColor }}>{item.day}</p>
                       <p className="text-[10px] font-black uppercase tracking-widest opacity-40" style={{ color: textColor }}>{item.monthShort}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    );
  };

  const renderFormation = () => {
    if (variant === 1) return (
      <div className="flex-grow pt-52 flex flex-col">
        <div className="py-6 px-12 text-white relative shadow-2xl" style={{ backgroundColor: accentColor }}>
          <div className="absolute -top-5 left-16 bg-white px-5 py-1.5 font-black text-base rounded-full shadow-md border-2" style={{ color: textColor, borderColor: accentColor }}>FORMATION</div>
          <h2 className="text-4xl font-black uppercase leading-tight tracking-tighter max-w-4xl" style={{ color: textColor }}>{primaryText}</h2>
          <AssistantsList />
        </div>
        <div className="flex-grow flex px-12 pt-10 gap-12 items-start">
          <div className="w-1/2 space-y-6">
            <div className="p-6 bg-slate-50/80 backdrop-blur rounded-[40px] border-l-[20px] shadow-xl" style={{ borderColor: accentColor }}>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 mb-4 flex items-center gap-2" style={{ color: textColor }}><Calendar size={14}/> PROGRAMME</p>
              <ModulesList />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="p-6 bg-white/90 backdrop-blur rounded-[30px] shadow-2xl border-b-4" style={{ borderBottomColor: accentColor }}>
                  <p className="text-[9px] font-black uppercase opacity-30 mb-1" style={{ color: textColor }}>DATE</p>
                  <p className="text-xl font-black leading-none" style={{ color: textColor }}>{date}</p>
               </div>
               <div className="p-6 bg-white/90 backdrop-blur rounded-[30px] shadow-2xl border-b-4" style={{ borderBottomColor: accentColor }}>
                  <p className="text-[9px] font-black uppercase opacity-30 mb-1" style={{ color: textColor }}>LIEU</p>
                  <p className="text-xl font-black leading-none" style={{ color: textColor }}>{secondaryText}</p>
               </div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col items-center">
            <SubjectImage className="w-72 h-72 rounded-[50px] border-[15px] border-white shadow-2xl mb-6 transform -rotate-1" />
            <div className="text-center">
              <p className="text-4xl font-black uppercase tracking-tighter" style={{ color: textColor }}>{name}</p>
              <p className="text-lg font-black tracking-[0.3em] uppercase opacity-40 mt-1" style={{ color: textColor }}>{role}</p>
            </div>
          </div>
        </div>
      </div>
    );
    if (variant === 2) return (
      <div className="flex-grow pt-60 px-12 flex items-center justify-between gap-12">
        <div className="w-[45%] relative">
           <SubjectImage className="w-full aspect-square rounded-full border-[25px] border-white shadow-2xl relative z-10" />
           <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/95 p-6 rounded-[40px] shadow-2xl border-t-[10px] z-20 min-w-[300px]" style={{ borderTopColor: accentColor }}>
              <p className="text-3xl font-black text-center" style={{ color: textColor }}>{name}</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 text-center mt-1" style={{ color: textColor }}>{role}</p>
           </div>
        </div>
        <div className="w-[55%] space-y-8">
           <h2 className="text-6xl font-black leading-tight tracking-tighter" style={{ color: textColor }}>{primaryText}</h2>
           <div className="bg-white/90 backdrop-blur p-8 rounded-[50px] shadow-2xl border-r-[12px]" style={{ borderRightColor: accentColor }}>
              <p className="text-[10px] font-black uppercase opacity-20 mb-4 tracking-widest" style={{ color: textColor }}>CONTENU</p>
              <ModulesList />
           </div>
           <div className="flex items-center gap-10">
              <div className="flex items-center gap-3 text-2xl font-black" style={{ color: textColor }}><Clock size={24} color={accentColor}/> {date}</div>
              <div className="flex items-center gap-3 text-2xl font-black" style={{ color: textColor }}><MapPin size={24} color={accentColor}/> {secondaryText}</div>
           </div>
        </div>
      </div>
    );
    return (
      <div className="flex-grow pt-56 px-12 flex flex-col items-center">
         <div className="w-full bg-white/95 backdrop-blur border-8 rounded-[100px] p-20 relative overflow-hidden shadow-2xl" style={{ borderColor: accentColor }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -translate-y-1/3 translate-x-1/3 opacity-30"></div>
            <p className="text-2xl font-black tracking-[1em] mb-10 text-center opacity-30 uppercase" style={{ color: textColor }}>{primaryText || "Masterclass"}</p>
            <h2 className="text-7xl font-black text-center italic mb-16 leading-none" style={{ color: textColor }}>{primaryText}</h2>
            <div className="grid grid-cols-2 gap-16 items-center">
               <div className="border-r border-slate-100 pr-8"><ModulesList /></div>
               <div className="flex flex-col items-center">
                  <SubjectImage className="w-56 h-56 rounded-full border-[15px] border-slate-50 shadow-2xl mb-6" />
                  <p className="text-3xl font-black tracking-tight" style={{ color: textColor }}>{name}</p>
                  <p className="text-sm font-bold opacity-30 mt-1 uppercase tracking-widest" style={{ color: textColor }}>{role}</p>
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
      <div className="flex-grow flex flex-col items-center pt-48 px-12">
        <div className="relative mb-12">
          <div className="absolute -inset-12 border-[20px] rounded-full opacity-10 animate-spin-slow" style={{ borderColor: accentColor }}></div>
          <div className="absolute top-2 -right-12 bg-white w-36 h-36 rounded-full flex flex-col items-center justify-center shadow-lg border-[12px] border-white z-[50]" style={{ backgroundColor: accentColor }}>
            <span className="text-5xl font-black leading-none" style={{ color: textColor }}>{day}</span>
            <span className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: textColor }}>{month}</span>
          </div>
          <SubjectImage className="w-[360px] h-[360px] rounded-full border-[20px] border-white shadow-xl relative z-[10]" />
        </div>
        <h2 className="text-5xl font-black mb-3 italic tracking-tighter uppercase leading-none" style={{ color: textColor }}>{primaryText}</h2>
        <div className="bg-white py-4 px-20 rounded-full shadow-lg border-4" style={{ borderColor: accentColor }}>
          <p className="text-4xl font-black uppercase tracking-tighter" style={{ color: textColor }}>{name}</p>
        </div>
        <p className="mt-6 text-2xl font-black tracking-[0.4em] opacity-40 uppercase" style={{ color: textColor }}>{role}</p>
        {secondaryText && <p className="mt-3 text-lg font-bold italic opacity-60" style={{ color: textColor }}>{secondaryText}</p>}
      </div>
    );

    if (variant === 2) return (
      <div className="flex-grow flex flex-col pt-60 px-12">
        <div className="flex items-center gap-16">
          <div className="w-[500px] h-[500px] rounded-[100px] border-[20px] border-white shadow-2xl relative transform rotate-2 overflow-hidden">
            <SubjectImage />
            <div className="absolute top-0 left-0 bg-white/20 backdrop-blur px-6 py-3 font-black text-xl tracking-widest uppercase z-10" style={{ color: textColor }}>{primaryText}</div>
          </div>
          <div className="flex-1 space-y-10 transform -rotate-2">
            <div className="border-l-[15px] pl-10" style={{ borderColor: accentColor }}>
               <h2 className="text-8xl font-black leading-none tracking-tighter uppercase mb-4" style={{ color: textColor }}>{name}</h2>
               <p className="text-3xl font-black uppercase tracking-[0.3em] opacity-30" style={{ color: textColor }}>{role || primaryText}</p>
            </div>
            <div className="flex items-baseline gap-6">
               <span className="text-9xl font-black opacity-10" style={{ color: accentColor }}>{day}</span>
               <span className="text-4xl font-black uppercase tracking-widest" style={{ color: accentColor }}>{month}</span>
            </div>
            <p className="text-3xl font-bold italic leading-tight" style={{ color: textColor }}>{secondaryText}</p>
          </div>
        </div>
      </div>
    );

    return (
      <div className="flex-grow pt-40 px-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[400px] font-black opacity-[0.03] select-none" style={{ color: accentColor }}>{primaryText || "HB"}</div>
         <SubjectImage className="w-96 h-96 rounded-full border-[15px] border-white shadow-2xl mb-8 relative z-10" style={{ borderColor: accentColor }} />
         <div className="space-y-4 relative z-10">
            <p className="text-2xl font-black uppercase tracking-[0.8em] opacity-30" style={{ color: textColor }}>{primaryText}</p>
            <h2 className="text-7xl font-black uppercase tracking-tighter leading-none" style={{ color: textColor }}>{name}</h2>
            <div className="h-1 w-32 bg-slate-200 mx-auto" style={{ backgroundColor: accentColor }}></div>
            <p className="text-2xl font-black uppercase tracking-[0.3em] opacity-40" style={{ color: textColor }}>{role}</p>
            <p className="text-4xl font-black italic pt-4" style={{ color: textColor }}>{date}</p>
            {secondaryText && <p className="text-xl font-bold opacity-60 mt-6" style={{ color: textColor }}>{secondaryText}</p>}
         </div>
      </div>
    );
  };

  const renderMotivation = () => {
    if (variant === 1) return (
      <div className="flex-grow flex flex-col items-center justify-center px-12 pt-60 text-center relative overflow-hidden">
         <Quote size={400} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]" />
         <div className="text-[140px] mb-2 opacity-20 leading-none select-none" style={{ color: accentColor }}>"</div>
         <h2 className="text-6xl font-black italic leading-[1.3] mb-16 tracking-tighter max-w-5xl z-10" style={{ color: textColor }}>{primaryText}</h2>
         <div className="flex items-center gap-10 z-10">
            <div className="h-1 w-24 rounded-full" style={{ backgroundColor: accentColor }}></div>
            <div className="text-center">
              <p className="text-4xl font-black uppercase tracking-[0.2em]" style={{ color: textColor }}>{name}</p>
              <p className="text-lg font-bold opacity-40 uppercase tracking-widest mt-1" style={{ color: textColor }}>{role}</p>
            </div>
            <div className="h-1 w-24 rounded-full" style={{ backgroundColor: accentColor }}></div>
         </div>
         {secondaryText && <p className="mt-12 text-xl font-bold opacity-30 italic" style={{ color: textColor }}>{secondaryText}</p>}
      </div>
    );

    if (variant === 2) return (
      <div className="flex-grow flex flex-col pt-60 px-12">
        <div className="flex items-stretch gap-12 h-full">
           <div className="w-[450px] relative shrink-0">
              <div className="absolute inset-0 rounded-[40px] border-[15px] border-white shadow-2xl transform rotate-2 overflow-hidden">
                <SubjectImage />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10 z-10">
                  <p className="text-3xl font-black uppercase leading-none" style={{ color: textColor }}>{name}</p>
                  <p className="text-sm font-bold uppercase tracking-widest mt-2" style={{ color: textColor, opacity: 0.8 }}>{role}</p>
                </div>
              </div>
           </div>
           <div className="flex-1 flex flex-col justify-center space-y-10">
              <div className="bg-white/95 backdrop-blur-sm p-12 rounded-[50px] shadow-2xl relative border-t-[15px]" style={{ borderTopColor: accentColor }}>
                 <div className="absolute -top-8 left-12 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg" style={{ color: accentColor }}>
                    <Quote size={40} fill="currentColor" />
                 </div>
                 <p className="text-4xl font-black italic leading-snug" style={{ color: textColor }}>{primaryText}</p>
                 {secondaryText && <p className="mt-8 text-xl font-black uppercase tracking-[0.3em] opacity-20" style={{ color: textColor }}>{secondaryText}</p>}
              </div>
              <div className="flex items-center gap-4 text-2xl font-black uppercase tracking-widest opacity-30 pl-6" style={{ color: textColor }}>
                 <Zap size={24} style={{ color: accentColor }} /> {secondaryText || primaryText}
              </div>
           </div>
        </div>
      </div>
    );

    return (
      <div className="flex-grow pt-56 px-12 flex flex-col items-center justify-center text-center">
         <div className="w-full max-w-5xl bg-slate-900 rounded-[60px] p-20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
               <div className="w-20 h-2 bg-white/20 mx-auto mb-12 rounded-full" style={{ backgroundColor: accentColor }}></div>
               <h2 className="text-5xl font-black italic leading-tight mb-16 tracking-tight" style={{ color: '#FFFFFF' }}>{primaryText}</h2>
               <div className="space-y-2">
                  <p className="text-4xl font-black uppercase tracking-[0.4em]" style={{ color: '#FFFFFF' }}>{name}</p>
                  <p className="text-lg font-bold uppercase tracking-widest" style={{ color: '#FFFFFF', opacity: 0.4 }}>{role}</p>
               </div>
            </div>
         </div>
         <div className="mt-12 flex gap-4 items-center">
            {[1, 2, 3].map(i => <div key={i} className="w-3 h-3 rounded-full opacity-20" style={{ backgroundColor: accentColor }}></div>)}
         </div>
      </div>
    );
  };

  const renderGratitude = () => {
    if (variant === 1) return (
      <div className="flex-grow pt-64 px-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
         <h2 className="text-[250px] font-black italic leading-none mb-10 tracking-tighter opacity-[0.05] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase select-none" style={{ color: accentColor }}>{secondaryText || "MERCI"}</h2>
         <div className="relative z-10 space-y-10 flex flex-col items-center">
            <SubjectImage className="w-72 h-72 rounded-full border-[15px] border-white shadow-2xl relative z-10 mb-6" style={{ borderColor: backgroundColor === '#FFFFFF' ? '#F1F5F9' : backgroundColor, boxShadow: `0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 10px ${accentColor}20` }} />
            <p className="text-4xl font-black italic leading-tight max-w-4xl mx-auto" style={{ color: textColor }}>
              "{secondaryText}"
            </p>
            <div className="flex flex-col items-center pt-4">
               <p className="text-5xl font-black uppercase tracking-tighter mb-1" style={{ color: textColor }}>{name}</p>
               <p className="text-xl font-black uppercase tracking-[0.3em] opacity-40" style={{ color: textColor }}>{role}</p>
               {secondaryText && <p className="mt-2 text-lg font-bold italic opacity-60" style={{ color: textColor }}>{secondaryText}</p>}
            </div>
         </div>
      </div>
    );

    if (variant === 2) return (
      <div className="flex-grow flex flex-col pt-60 px-12">
        <div className="flex items-center gap-16 h-full">
           <div className="w-[480px] h-[580px] relative shrink-0">
              <div className="absolute inset-0 border-r-[25px] border-b-[25px] rounded-[60px] translate-x-6 translate-y-6 opacity-20" style={{ borderColor: accentColor }}></div>
              <SubjectImage className="absolute inset-0 rounded-[60px] border-8 border-white shadow-2xl" />
              <div className="absolute -top-6 -left-6 bg-white p-4 rounded-full shadow-xl" style={{ color: accentColor }}>
                <Heart size={40} fill="currentColor" />
              </div>
           </div>
           <div className="flex-1 space-y-10">
              <div className="space-y-4">
                 <p className="text-3xl font-black tracking-[0.2em] uppercase opacity-40" style={{ color: textColor }}>{primaryText || "GRATITUDE"}</p>
                 <h2 className="text-8xl font-black leading-none tracking-tighter uppercase" style={{ color: textColor }}>{secondaryText || "MERCI"}</h2>
              </div>
              <div className="bg-white/95 backdrop-blur-sm p-10 rounded-[40px] shadow-xl border-l-[15px]" style={{ borderColor: accentColor }}>
                 <p className="text-3xl font-bold italic leading-relaxed" style={{ color: textColor }}>
                   "{secondaryText}"
                 </p>
              </div>
              <div className="pt-4 border-t-2 border-slate-100">
                 <p className="text-5xl font-black uppercase tracking-tighter" style={{ color: textColor }}>{name}</p>
                 <p className="text-xl font-bold tracking-[0.3em] uppercase opacity-40 mt-1" style={{ color: textColor }}>{role}</p>
                 {secondaryText && <p className="mt-4 text-2xl font-black italic" style={{ color: textColor }}>{secondaryText}</p>}
              </div>
           </div>
        </div>
      </div>
    );

    return (
      <div className="flex-grow pt-48 px-12 flex flex-col items-center">
         <div className="w-full bg-white/95 backdrop-blur-md rounded-[60px] border-[12px] border-double p-10 flex flex-col items-center justify-between shadow-2xl relative overflow-hidden" style={{ borderColor: accentColor }}>
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10 rotate-45" style={{ backgroundColor: accentColor }}></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-10 -rotate-12" style={{ backgroundColor: accentColor }}></div>
            
            <div className="flex flex-col items-center space-y-4 z-10">
               <SubjectImage className="w-48 h-48 rounded-full border-6 border-white shadow-xl" style={{ borderColor: accentColor }} />
               <div className="px-4 py-1.5 rounded-full border-2 font-black uppercase text-xs tracking-[0.5em]" style={{ borderColor: accentColor, color: textColor }}>{primaryText || "HOMMAGE"}</div>
            </div>

            <div className="text-center z-10 px-8">
               <h2 className="text-6xl font-black italic tracking-tighter leading-none mb-4" style={{ color: textColor }}>{secondaryText || "Merci !"}</h2>
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
        fontFamily: primaryFont,
        backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none',
        backgroundSize: `${backgroundImageZoom * 100}%`,
        backgroundPosition: `${backgroundImagePosX / 10}px ${backgroundImagePosY / 10}px`,
        backgroundRepeat: 'no-repeat'
      }}
    >
      {backgroundImageUrl && (
        <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
      )}
      <Header />
      {renderTemplate()}
      <Footer />
    </div>
  );
};

export default TemplateRenderer;
