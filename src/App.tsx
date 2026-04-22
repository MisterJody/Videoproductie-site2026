import { useState, useEffect, useRef } from 'react';
import { Pencil, Save, X, Plus, Trash2, LogIn, Move, ExternalLink } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<any>(null);
  const [lang, setLang] = useState<'en' | 'nl'>('en');
  const [heroVideo, setHeroVideo] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [editPanel, setEditPanel] = useState<{ type: string, path: string, value: any } | null>(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dataRef = useRef<any>(null);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(json => {
        setData(json);
        dataRef.current = json;
        const randomIndex = Math.floor(Math.random() * json.heroVideos.length);
        setHeroVideo(json.heroVideos[randomIndex]);
      });

    const token = localStorage.getItem('adminToken');
    if (token) setIsAdmin(true);
  }, []);

  if (!data) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;

  const t = data.translations[lang];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem('adminToken', token);
      setIsAdmin(true);
      setLoginModal(false);
    } else {
      alert('Invalid credentials');
    }
  };

  const saveToBackend = async (newData: any) => {
    const res = await fetch('/api/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('adminToken') || ""
      },
      body: JSON.stringify(newData)
    });
    if (!res.ok) {
      alert('Failed to save to server');
    }
  };

  const updatePath = (path: string, value: any, silent = false) => {
    const newData = JSON.parse(JSON.stringify(dataRef.current));
    const parts = path.split('.');
    let current = newData;
    for (let i = 0; i < parts.length - 1; i++) {
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;

    setData(newData);
    dataRef.current = newData;

    if (!silent) {
      saveToBackend(newData);
    }
  };

  const toEmbedUrl = (url: string, isBackground = false) => {
    if (url.includes('youtube.com/embed/')) {
      if (isBackground && !url.includes('autoplay=1')) {
        const id = url.split('/embed/')[1].split('?')[0];
        return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0`;
      }
      return url;
    }
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:v\/|u\/\w\/|embed\/|watch\?v=))([^#&?]*)/);
    if (match && match[1].length === 11) {
      const id = match[1];
      if (isBackground) {
        return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0`;
      }
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  };

  const EditButton = ({ path, type, value, className = "" }: { path: string, type: string, value: any, className?: string }) => {
    if (!isEditMode) return null;
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setEditPanel({ type, path, value });
        }}
        className={`absolute top-0 right-0 z-[60] bg-blue-500 p-1.5 rounded-full shadow-lg hover:bg-blue-600 transition-colors ${className}`}
      >
        <Pencil size={14} className="text-white" />
      </button>
    );
  };

  return (
    <div className={`min-h-screen text-gray-100 bg-[#050505] selection:bg-blue-500/30 ${isEditMode ? 'pt-12' : ''}`}>
      {/* ADMIN BAR */}
      {isAdmin && (
        <div className="fixed top-0 left-0 w-full bg-blue-900/90 backdrop-blur-md z-[100] h-12 flex items-center justify-between px-6 border-b border-white/10 shadow-2xl">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200">Editor Panel</span>
            <div className="h-4 w-px bg-white/20"></div>
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`text-[10px] px-4 py-1 rounded-full font-black uppercase tracking-widest transition-all ${isEditMode ? 'bg-white text-blue-900' : 'bg-blue-600 text-white'}`}
            >
              {isEditMode ? 'Viewing Live' : 'Enable Editing'}
            </button>
          </div>
          <button onClick={() => { localStorage.removeItem('adminToken'); setIsAdmin(false); setIsEditMode(false); }} className="text-[10px] font-black uppercase tracking-widest hover:text-white text-blue-200">Sign Out</button>
        </div>
      )}

      {/* NAVIGATION */}
      <nav className="fixed w-full z-50 py-6">
        <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center bg-black/20 backdrop-blur-xl rounded-full py-3 border border-white/5">
          <div className="text-xs font-black tracking-[0.3em] uppercase flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            VIDEOPRODUCTIE.LIVE
          </div>
          <div className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-gray-400 relative">
            {t.nav.items.map((item: any, i: number) => (
              <a key={i} href={item.href} className="hover:text-white transition-colors">{item.label}</a>
            ))}
            <EditButton path={`translations.${lang}.nav.items`} type="nav_items" value={t.nav.items} className="-top-4 -right-4" />
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setLang(lang === 'en' ? 'nl' : 'en')} className="text-[11px] font-black text-white hover:text-blue-500 transition-colors uppercase tracking-widest">
              {lang}
            </button>
            <div className="relative group">
              <a href="#contact" className="bg-white text-black px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] hover:bg-blue-500 hover:text-white transition-all">
                {t.nav.quote}
              </a>
              <EditButton path={`translations.${lang}.nav.quote`} type="text" value={t.nav.quote} className="-top-2 -right-2" />
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <iframe
            className="w-full h-full object-cover scale-110 opacity-40 blur-sm"
            src={toEmbedUrl(heroVideo, true)}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            title="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-[#050505]"></div>
          <EditButton path="heroVideos" type="list" value={data.heroVideos} className="top-24 right-8" />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-center md:text-left">
            <div className="relative inline-block group mb-6">
              <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tighter">
                {t.hero.title1} <br/>
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">{t.hero.title2}</span>
              </h1>
              <EditButton path={`translations.${lang}.hero`} type="object" value={t.hero} className="-top-4 -right-8" />
            </div>
            <div className="relative group mb-10">
              <p className="text-lg md:text-xl text-gray-400 max-w-lg mx-auto md:mx-0 leading-relaxed font-medium">{t.hero.desc}</p>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <a href="#contact" className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-2xl shadow-blue-900/40">
                {t.hero.btn1}
              </a>
              <a href="#portfolio" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all">
                {t.hero.btn2}
              </a>
            </div>
          </div>

          <div className="relative group">
            <div
              className="glass rounded-[2rem] overflow-hidden shadow-2xl mx-auto relative border border-white/10"
              style={{ width: data.images.hero.width, height: data.images.hero.height }}
            >
              <img src={data.images.hero.url} className="w-full h-full object-cover" alt="Hero" />
              {isEditMode && (
                <div
                  className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 cursor-nwse-resize flex items-center justify-center rounded-tl-xl z-20 hover:bg-blue-400 transition-colors"
                  onMouseDown={(e) => {
                    const startX = e.clientX;
                    const startY = e.clientY;
                    const startWidth = parseInt(data.images.hero.width);
                    const startHeight = parseInt(data.images.hero.height);
                    const onMouseMove = (m: MouseEvent) => {
                      updatePath('images.hero.width', `${startWidth + (m.clientX - startX)}px`, true);
                      updatePath('images.hero.height', `${startHeight + (m.clientY - startY)}px`, true);
                    };
                    const onMouseUp = () => {
                      document.removeEventListener('mousemove', onMouseMove);
                      document.removeEventListener('mouseup', onMouseUp);
                      saveToBackend(dataRef.current);
                    };
                    document.addEventListener('mousemove', onMouseMove);
                    document.addEventListener('mouseup', onMouseUp);
                  }}
                >
                  <Move size={14} />
                </div>
              )}
            </div>
            <EditButton path="images.hero" type="image" value={data.images.hero} className="-top-4 -right-4" />
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section id="specials" className="py-32 px-6 max-w-[1200px] mx-auto">
          <div className="text-center mb-20 relative group">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">{t.value.title}</h2>
            <p className="text-blue-500 font-black uppercase tracking-[0.3em] text-xs">{t.value.sub}</p>
            <EditButton path={`translations.${lang}.value`} type="object" value={t.value} className="-top-4 right-0" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
              {[t.value.feat1, t.value.feat2, t.value.feat3].map((feat, i) => (
                <div key={i} className="glass p-10 rounded-[2.5rem] border border-white/5 hover:border-blue-500/30 transition-all group relative">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-8">
                      <Save size={20} />
                    </div>
                    <h3 className="text-xl font-black mb-4">{feat[0]}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm font-medium">{feat[1]}</p>
                    <EditButton path={`translations.${lang}.value.feat${i+1}`} type="feat" value={feat} />
                </div>
              ))}
          </div>
      </section>

      {/* TECH SPECS */}
      <section className="py-32 px-6 bg-[#080808] border-y border-white/5">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-12">{t.tech.title}</h2>
            <div className="space-y-8">
              {t.tech.specs.map((spec: any, i: number) => (
                <div key={i} className="flex gap-6">
                  <div className="w-6 h-6 rounded-full border-2 border-blue-500 flex-shrink-0 mt-1 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-black text-lg mb-1">{spec.label}</h4>
                    <p className="text-gray-500 text-sm font-medium">{spec.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <EditButton path={`translations.${lang}.tech`} type="tech" value={t.tech} className="-top-4 -right-4" />
          </div>
          <div className="aspect-square glass rounded-[3rem] p-4 relative border border-white/10">
              <div className="w-full h-full bg-blue-900/10 rounded-[2.5rem] flex items-center justify-center">
                 <div className="text-center p-12">
                    <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-8 flex items-center justify-center animate-pulse shadow-2xl shadow-blue-500/50">
                       <ExternalLink size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-black mb-2">Cinematic DNA</h3>
                    <p className="text-gray-500 font-medium">We don't just record; we produce a visual legacy.</p>
                 </div>
              </div>
          </div>
        </div>
      </section>
      
      {/* PORTFOLIO GRID */}
      <section id="portfolio" className="py-32 px-6 max-w-[1200px] mx-auto">
          <div className="flex justify-between items-end mb-16 relative group">
            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter">{t.portfolio.title}</h2>
            </div>
            <EditButton path="portfolioVideos" type="list" value={data.portfolioVideos} className="bottom-0 right-0" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
              {data.portfolioVideos.map((url: string, i: number) => (
                <div key={i} className="glass aspect-video rounded-[2rem] overflow-hidden relative border border-white/5 shadow-2xl group">
                  <iframe
                    className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                    src={toEmbedUrl(url)}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
          </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-32 px-6 bg-gradient-to-b from-transparent to-blue-900/5">
        <div className="max-w-[1200px] mx-auto relative group">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-center mb-20">{t.testimonials.title}</h2>
          <EditButton path="testimonials" type="testimonials" value={data.testimonials} className="top-0 right-0" />
          <div className="grid md:grid-cols-3 gap-8">
            {data.testimonials.map((test: any, i: number) => (
              <div key={i} className="glass p-12 rounded-[3rem] border border-white/5 flex flex-col justify-between hover:border-white/10 transition-colors">
                <p className="text-lg text-gray-300 font-medium leading-relaxed italic mb-10">"{test.quote}"</p>
                <div>
                  <p className="font-black text-white uppercase tracking-widest text-sm">{test.name}</p>
                  <p className="text-xs font-black text-blue-500 uppercase tracking-widest mt-1">{test.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <footer id="pricing" className="py-32 px-6 max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass p-12 rounded-[3rem] md:col-span-2 relative group border border-white/5">
              <h2 className="text-3xl font-black mb-10 uppercase tracking-tight">{t.pricing.title}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                  {t.pricing.items.map((item: string, i: number) => (
                    <div key={i} className="text-xs font-black uppercase tracking-widest bg-white/5 border border-white/5 p-5 rounded-2xl flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      {item}
                    </div>
                  ))}
              </div>
              <EditButton path={`translations.${lang}.pricing`} type="object" value={t.pricing} className="top-8 right-8" />
            </div>
            
            <div className="glass p-12 rounded-[3rem] text-center flex flex-col justify-center relative border border-blue-500/20 bg-blue-500/5 shadow-2xl shadow-blue-500/10">
              <div className="text-5xl font-black mb-2 tracking-tighter">€750,-</div>
              <div className="text-[10px] font-black uppercase text-blue-400 mb-8 tracking-[0.2em]">{t.pricing.ex}</div>
              <a href="#contact" className="bg-blue-600 p-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20">
                {t.pricing.btn}
              </a>
            </div>
          </div>

          <div id="contact" className="mt-32 glass p-12 md:p-20 rounded-[4rem] max-w-4xl mx-auto border border-white/5 relative">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center mb-12">{t.contact.title}</h2>
              <form action="mailto:Studio3@koewe.nl" method="POST" encType="text/plain" className="grid md:grid-cols-2 gap-6">
                <input type="text" name="name" placeholder={t.contact.name} required className="bg-black border border-white/10 rounded-2xl p-5 text-sm font-medium focus:border-blue-500 outline-none transition-colors" />
                <input type="email" name="email" placeholder={t.contact.email} required className="bg-black border border-white/10 rounded-2xl p-5 text-sm font-medium focus:border-blue-500 outline-none transition-colors" />
                <textarea name="message" placeholder={t.contact.msg} rows={4} required className="md:col-span-2 bg-black border border-white/10 rounded-2xl p-5 text-sm font-medium focus:border-blue-500 outline-none transition-colors"></textarea>
                <button type="submit" className="md:col-span-2 bg-white text-black p-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-500 hover:text-white transition-all">
                  {t.contact.send}
                </button>
              </form>
              <EditButton path={`translations.${lang}.contact`} type="object" value={t.contact} className="top-8 right-8" />
          </div>
      </footer>

      <div className="py-12 text-center text-[10px] font-black text-gray-700 uppercase tracking-[0.5em]">
          &copy; 2024 VIDEOPRODUCTIE.LIVE — CINEMATIC LIVE CAPTURE
      </div>

      {/* ADMIN LOGIN TRIGGER */}
      {!isAdmin && (
        <button
          onClick={() => setLoginModal(true)}
          className="fixed bottom-6 right-6 text-white/5 hover:text-white/20 transition-colors"
        >
          <LogIn size={16} />
        </button>
      )}

      {/* LOGIN MODAL */}
      {loginModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[200] flex items-center justify-center p-6">
          <div className="bg-[#111] border border-white/10 p-12 rounded-[3rem] w-full max-w-md shadow-2xl">
            <h2 className="text-3xl font-black mb-8 tracking-tighter">Access Editor</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-blue-500"
              />
              <div className="flex gap-4 pt-6">
                <button type="button" onClick={() => setLoginModal(false)} className="flex-1 bg-white/5 p-5 rounded-2xl font-black uppercase tracking-widest text-[10px]">Cancel</button>
                <button type="submit" className="flex-1 bg-blue-600 p-5 rounded-2xl font-black uppercase tracking-widest text-[10px]">Sign In</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT SIDEBAR */}
      {editPanel && (
        <div className="fixed top-0 right-0 w-[450px] h-full bg-[#0a0a0a] border-l border-white/10 z-[150] shadow-2xl p-10 overflow-y-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h3 className="text-2xl font-black tracking-tighter">Editor</h3>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mt-1">{editPanel.path}</p>
            </div>
            <button onClick={() => setEditPanel(null)} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"><X size={18} /></button>
          </div>

          <div className="space-y-8">
            {editPanel.type === 'text' && (
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Value</label>
                <input
                  type="text"
                  value={editPanel.value}
                  className="w-full bg-black border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-blue-500"
                  onChange={(e) => {
                    const val = e.target.value;
                    setEditPanel({ ...editPanel, value: val });
                    updatePath(editPanel.path, val);
                  }}
                />
              </div>
            )}

            {editPanel.type === 'textarea' && (
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Description</label>
                <textarea
                  rows={6}
                  value={editPanel.value}
                  className="w-full bg-black border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-blue-500"
                  onChange={(e) => {
                    const val = e.target.value;
                    setEditPanel({ ...editPanel, value: val });
                    updatePath(editPanel.path, val);
                  }}
                />
              </div>
            )}

            {editPanel.type === 'object' && (
              <div className="space-y-6">
                {Object.keys(editPanel.value).map(key => {
                  if (Array.isArray(editPanel.value[key])) return null; // Handle arrays separately
                  if (typeof editPanel.value[key] === 'object') return null; // Nested objects not supported in generic
                  return (
                    <div key={key} className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">{key}</label>
                      <textarea
                        rows={editPanel.value[key].length > 50 ? 3 : 1}
                        value={editPanel.value[key]}
                        className="w-full bg-black border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-blue-500 text-sm"
                        onChange={(e) => {
                          const newVal = { ...editPanel.value, [key]: e.target.value };
                          setEditPanel({ ...editPanel, value: newVal });
                          updatePath(editPanel.path, newVal);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {editPanel.type === 'tech' && (
               <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Title</label>
                    <input
                      type="text"
                      value={editPanel.value.title}
                      className="w-full bg-black border border-white/10 rounded-2xl p-5 text-white"
                      onChange={(e) => {
                        const newVal = { ...editPanel.value, title: e.target.value };
                        setEditPanel({ ...editPanel, value: newVal });
                        updatePath(editPanel.path, newVal);
                      }}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Specifications</label>
                    {editPanel.value.specs.map((spec: any, i: number) => (
                      <div key={i} className="p-5 bg-black rounded-2xl border border-white/5 space-y-3">
                         <div className="flex justify-between">
                            <span className="text-[10px] font-black text-blue-500">SPEC {i+1}</span>
                            <button onClick={() => {
                              const newList = editPanel.value.specs.filter((_: any, idx: number) => idx !== i);
                              const newVal = { ...editPanel.value, specs: newList };
                              setEditPanel({ ...editPanel, value: newVal });
                              updatePath(editPanel.path, newVal);
                            }} className="text-red-500"><Trash2 size={14}/></button>
                         </div>
                         <input type="text" value={spec.label} className="w-full bg-[#050505] border border-white/5 p-3 rounded-xl text-sm" onChange={(e) => {
                            const newList = [...editPanel.value.specs];
                            newList[i] = { ...newList[i], label: e.target.value };
                            const newVal = { ...editPanel.value, specs: newList };
                            setEditPanel({ ...editPanel, value: newVal });
                            updatePath(editPanel.path, newVal);
                         }} />
                         <textarea value={spec.desc} className="w-full bg-[#050505] border border-white/5 p-3 rounded-xl text-xs" onChange={(e) => {
                            const newList = [...editPanel.value.specs];
                            newList[i] = { ...newList[i], desc: e.target.value };
                            const newVal = { ...editPanel.value, specs: newList };
                            setEditPanel({ ...editPanel, value: newVal });
                            updatePath(editPanel.path, newVal);
                         }} />
                      </div>
                    ))}
                    <button onClick={() => {
                       const newList = [...editPanel.value.specs, { label: "New Spec", desc: "" }];
                       const newVal = { ...editPanel.value, specs: newList };
                       setEditPanel({ ...editPanel, value: newVal });
                       updatePath(editPanel.path, newVal);
                    }} className="w-full p-4 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest">+ Add Spec</button>
                  </div>
               </div>
            )}

            {editPanel.type === 'nav_items' && (
              <div className="space-y-4">
                {editPanel.value.map((item: any, i: number) => (
                  <div key={i} className="p-4 bg-black border border-white/5 rounded-2xl flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-black text-blue-500">ITEM {i+1}</span>
                       <button onClick={() => {
                          const newList = editPanel.value.filter((_: any, idx: number) => idx !== i);
                          setEditPanel({ ...editPanel, value: newList });
                          updatePath(editPanel.path, newList);
                       }} className="text-red-500"><Trash2 size={14} /></button>
                    </div>
                    <input
                      type="text"
                      value={item.label}
                      className="w-full bg-[#050505] border border-white/5 p-3 rounded-xl text-xs"
                      onChange={(e) => {
                        const newList = [...editPanel.value];
                        newList[i] = { ...newList[i], label: e.target.value };
                        setEditPanel({ ...editPanel, value: newList });
                        updatePath(editPanel.path, newList);
                      }}
                    />
                    <input
                      type="text"
                      value={item.href}
                      className="w-full bg-[#050505] border border-white/5 p-3 rounded-xl text-xs"
                      onChange={(e) => {
                        const newList = [...editPanel.value];
                        newList[i] = { ...newList[i], href: e.target.value };
                        setEditPanel({ ...editPanel, value: newList });
                        updatePath(editPanel.path, newList);
                      }}
                    />
                  </div>
                ))}
                <button onClick={() => {
                  const newList = [...editPanel.value, { label: "New Link", href: "#" }];
                  setEditPanel({ ...editPanel, value: newList });
                  updatePath(editPanel.path, newList);
                }} className="w-full p-4 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest">+ Add Navigation Item</button>
              </div>
            )}

            {editPanel.type === 'feat' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Feature Title</label>
                  <input
                    type="text"
                    value={editPanel.value[0]}
                    className="w-full bg-black border border-white/10 rounded-2xl p-5 text-white"
                    onChange={(e) => {
                      const newValue = [...editPanel.value];
                      newValue[0] = e.target.value;
                      setEditPanel({ ...editPanel, value: newValue });
                      updatePath(editPanel.path, newValue);
                    }}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Feature Description</label>
                  <textarea
                    rows={6}
                    value={editPanel.value[1]}
                    className="w-full bg-black border border-white/10 rounded-2xl p-5 text-white"
                    onChange={(e) => {
                      const newValue = [...editPanel.value];
                      newValue[1] = e.target.value;
                      setEditPanel({ ...editPanel, value: newValue });
                      updatePath(editPanel.path, newValue);
                    }}
                  />
                </div>
              </div>
            )}

            {editPanel.type === 'testimonials' && (
              <div className="space-y-8">
                {editPanel.value.map((test: any, i: number) => (
                  <div key={i} className="space-y-4 p-6 border border-white/5 rounded-[2rem] bg-black/50">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Testimonial {i+1}</span>
                       <button onClick={() => {
                          const newList = editPanel.value.filter((_: any, idx: number) => idx !== i);
                          updatePath(editPanel.path, newList);
                          setEditPanel({ ...editPanel, value: newList });
                       }} className="text-red-500"><Trash2 size={16}/></button>
                    </div>
                    <textarea
                      rows={3}
                      value={test.quote}
                      className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm text-white"
                      onChange={(e) => {
                        const newList = [...editPanel.value];
                        newList[i] = { ...newList[i], quote: e.target.value };
                        setEditPanel({ ...editPanel, value: newList });
                        updatePath(editPanel.path, newList);
                      }}
                    />
                    <input
                      type="text"
                      value={test.name}
                      className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm text-white"
                      onChange={(e) => {
                        const newList = [...editPanel.value];
                        newList[i] = { ...newList[i], name: e.target.value };
                        setEditPanel({ ...editPanel, value: newList });
                        updatePath(editPanel.path, newList);
                      }}
                    />
                    <input
                      type="text"
                      value={test.role}
                      className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm text-white"
                      onChange={(e) => {
                        const newList = [...editPanel.value];
                        newList[i] = { ...newList[i], role: e.target.value };
                        setEditPanel({ ...editPanel, value: newList });
                        updatePath(editPanel.path, newList);
                      }}
                    />
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newList = [...editPanel.value, { quote: "", name: "", role: "" }];
                    updatePath(editPanel.path, newList);
                    setEditPanel({ ...editPanel, value: newList });
                  }}
                  className="w-full bg-white/5 p-5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3"
                >
                  <Plus size={16} /> Add Testimonial
                </button>
              </div>
            )}

            {editPanel.type === 'list' && (
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Items (URLs or Text)</label>
                {editPanel.value.map((item: string, i: number) => (
                  <div key={i} className="flex gap-3">
                    <input
                      type="text"
                      value={item}
                      className="flex-1 bg-black border border-white/10 rounded-2xl p-4 text-sm text-white"
                      onChange={(e) => {
                        const newList = [...editPanel.value];
                        newList[i] = e.target.value;
                        setEditPanel({ ...editPanel, value: newList });
                        updatePath(editPanel.path, newList);
                      }}
                    />
                    <button onClick={() => {
                      const newList = editPanel.value.filter((_: any, idx: number) => idx !== i);
                      setEditPanel({ ...editPanel, value: newList });
                      updatePath(editPanel.path, newList);
                    }} className="text-red-500"><Trash2 size={18}/></button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newList = [...editPanel.value, ""];
                    setEditPanel({ ...editPanel, value: newList });
                    updatePath(editPanel.path, newList);
                  }}
                  className="w-full bg-white/5 p-5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3"
                >
                  <Plus size={16} /> Add Item
                </button>
              </div>
            )}

            {editPanel.type === 'image' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Upload New</label>
                  <div className="relative group overflow-hidden bg-black border border-white/10 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-500/50 transition-colors">
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const formData = new FormData();
                          formData.append('image', file);
                          const res = await fetch('/api/upload', {
                            method: 'POST',
                            headers: { 'Authorization': localStorage.getItem('adminToken') || "" },
                            body: formData
                          });
                          if (res.ok) {
                            const { url } = await res.json();
                            const newVal = { ...editPanel.value, url };
                            setEditPanel({ ...editPanel, value: newVal });
                            updatePath(editPanel.path, newVal);
                          }
                        }
                      }}
                    />
                    <div className="text-xs font-black uppercase tracking-widest text-gray-500 group-hover:text-blue-500 transition-colors">Choose File</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Width</label>
                    <input
                      type="text"
                      value={editPanel.value.width}
                      className="w-full bg-black border border-white/10 rounded-2xl p-5 text-white"
                      onChange={(e) => {
                        const newVal = { ...editPanel.value, width: e.target.value };
                        setEditPanel({ ...editPanel, value: newVal });
                        updatePath(editPanel.path, newVal);
                      }}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Height</label>
                    <input
                      type="text"
                      value={editPanel.value.height}
                      className="w-full bg-black border border-white/10 rounded-2xl p-5 text-white"
                      onChange={(e) => {
                        const newVal = { ...editPanel.value, height: e.target.value };
                        setEditPanel({ ...editPanel, value: newVal });
                        updatePath(editPanel.path, newVal);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
