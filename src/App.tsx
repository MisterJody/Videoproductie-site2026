import { useState, useEffect } from 'react';

const heroVideos = [
  "https://www.youtube.com/embed/1SUua3RI64s?autoplay=1&mute=1&loop=1&playlist=1SUua3RI64s&controls=0&showinfo=0",
  "https://www.youtube.com/embed/rYZyjcWdo84?autoplay=1&mute=1&loop=1&playlist=rYZyjcWdo84&controls=0&showinfo=0",
  "https://www.youtube.com/embed/74n1-o3GtwY?autoplay=1&mute=1&loop=1&playlist=74n1-o3GtwY&controls=0&showinfo=0",
  "https://www.youtube.com/embed/VEp3eaRsNX8?autoplay=1&mute=1&loop=1&playlist=VEp3eaRsNX8&controls=0&showinfo=0"
];

const translations = {
  // ... existing translations ...
  en: {
// ...
    nav: { quote: "Get a Quote" },
    hero: {
      title1: "From the club to the main stage.",
      title2: "Get the video that lands the gig.",
      desc: "Transform your live performances into high-end cinematic productions. The ultimate visual tool to impress booking agents, festivals, and fans.",
      btn1: "Book Your Recording",
      btn2: "Watch Our Work"
    },
    value: {
      title: "Your Performance is World-Class.",
      sub: "Does your video look like it?",
      feat1: ["The Booking Magnet", "Use your recording as a professional EPK. Show festivals exactly what it feels like to have you on their stage."],
      feat2: ["Social Media Engine", "We provide high-quality assets optimized for Instagram, TikTok, and YouTube to grow your digital presence."],
      feat3: ["Professional Exposé", "Stop sending grainy smartphone footage. Send a cinematic experience that justifies your premium booking fee."]
    },
    tech: {
      title: "Cinema Quality. Concert Precision.",
      l1: "4K Broadcast Quality", l1d: "Multi-camera setup designed for cinema-style storytelling",
      l2: "Dynamic Movement", l2d: "Manned TV-zoom lens for perfect, high-energy close-ups",
      l3: "The Hollywood Look", l3d: "Anamorphic lenses for that ultra-wide, cinematic aesthetic",
      l4: "Mastered Audio", l4d: "We sync your professional live mix for a seamless broadcast result"
    },
    portfolio: { title: "See the Magic in Action" },
    pricing: {
      title: "Professional Production.",
      sub: "Transparent pricing for serious artists.",
      card: "The Standard Live",
      ex: "/ex. BTW",
      items: ["Full 4K Multi-camera Setup", "Manned TV-zoom Camera", "Anamorphic Wide Shots", "Professional Color & Audio Mastering", "Final 4K Delivery"],
      btn: "Inquire for Your Date",
      note: "*Travel costs €0,42 per km from Zoetermeer"
    },
    contact: {
      title: "Get in touch",
      name: "Name",
      email: "Email",
      subject: "Subject",
      msg: "Message",
      send: "Send Message"
    }
  },
  nl: {
    nav: { quote: "Vraag een offerte aan" },
    hero: {
      title1: "Van het café naar het hoofdpodium.",
      title2: "De video die de boeking binnenhaalt.",
      desc: "Transformeer je liveoptredens in hoogwaardige cinematografische producties. De ultieme visuele tool om indruk te maken op boekingsagenten, festivals en fans.",
      btn1: "Boek je opname",
      btn2: "Bekijk ons werk"
    },
    value: {
      title: "Je optreden is van wereldklasse.",
      sub: "Ziet je video er ook zo uit?",
      feat1: ["De Boekingsmagneet", "Gebruik je opname als een professionele EPK. Laat festivals zien hoe het voelt om je op hun podium te hebben."],
      feat2: ["Social Media Motor", "Wij leveren assets van hoge kwaliteit, geoptimaliseerd voor Instagram, TikTok en YouTube om je digitale aanwezigheid te vergroten."],
      feat3: ["Professionele Exposé", "Stop met het versturen van korrelige smartphonebeelden. Verzend een cinematografische ervaring die je premium boekingsprijs rechtvaardigt."]
    },
    tech: {
      title: "Bioscoopkwaliteit. Concertprecisie.",
      l1: "4K Broadcast Kwaliteit", l1d: "Multi-camera opstelling ontworpen voor cinematografische storytelling",
      l2: "Dynamische Beweging", l2d: "Bemande TV-zoomlens voor perfecte, energieke close-ups",
      l3: "De Hollywood Look", l3d: "Anamorfische lenzen voor die ultrabrede, cinematografische esthetiek",
      l4: "Gmastered Audio", l4d: "We synchroniseren je professionele livemix voor een naadloos broadcastresultaat"
    },
    portfolio: { title: "Zie de magie in actie" },
    pricing: {
      title: "Professionele Productie.",
      sub: "Transparante prijzen voor serieuze artiesten.",
      card: "De Standaard Live",
      ex: "/ex. BTW",
      items: ["Volledige 4K Multi-camera opstelling", "Bemande TV-zoomlens", "Anamorfische brede beelden", "Professionele kleurcorrectie & Audio mastering", "Definitieve 4K oplevering"],
      btn: "Informeer voor je datum",
      note: "*Reiskosten €0,42 per km vanaf Zoetermeer"
    },
    contact: {
      title: "Neem contact op",
      name: "Naam",
      email: "E-mail",
      subject: "Onderwerp",
      msg: "Bericht",
      send: "Bericht versturen"
    }
  }
};

export default function App() {
  const [lang, setLang] = useState<'en' | 'nl'>('en');
  const t = translations[lang];
  const [heroVideo, setHeroVideo] = useState(heroVideos[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * heroVideos.length);
    setHeroVideo(heroVideos[randomIndex]);
  }, []);

  return (
    <div className="min-h-screen text-gray-100">
      {/* NAVIGATION */}
      <nav className="fixed w-full z-50 py-6">
        <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
          <div className="text-sm font-black tracking-[0.2em] uppercase flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            VIDEOPRODUCTIE.LIVE
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
            {['Specials', 'Pricing', 'Portfolio', 'Contact'].map(item => <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>)}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setLang(lang === 'en' ? 'nl' : 'en')} className="font-bold text-white hover:text-blue-500 transition-colors">
              {lang.toUpperCase()}
            </button>
            <a href="mailto:Studio3@koewe.nl" className="bg-white text-black px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-200 transition-all">
              {t.nav.quote}
            </a>
          </div>
        </div>
      </nav>
      {/* HERO */}
      <section className="relative pt-24 pb-12 px-6 max-w-[1200px] mx-auto flex flex-col-reverse md:grid md:grid-cols-2 gap-8 md:gap-12 items-center transition-all duration-1000 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <iframe
            className="w-full h-full object-cover"
            src={heroVideo}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            title="Hero Video"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="content text-center md:text-left relative z-10">
          <h1 className="text-[45px] font-black leading-[62.6px] mb-[28px] tracking-tighter w-[414.017px]">
            {t.hero.title1} <span className="gradient-text">{t.hero.title2}</span>
          </h1>
          <p className="description text-base md:text-lg text-gray-400 mb-8 max-w-md mx-auto md:mx-0">{t.hero.desc}</p>
          <a href="mailto:Studio3@koewe.nl" className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20">
            {t.hero.btn1}
          </a>
        </div>
        <div className="preview-window glass aspect-video rounded-3xl flex items-center justify-center relative overflow-hidden w-full z-10">
            <img src="/hero-concert.jpg" alt="Concert Registratie" className="object-cover object-[50%_30%] w-full h-full opacity-100" />
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-20 px-6 max-w-[1200px] mx-auto grid md:grid-cols-3 gap-8">
          {[t.value.feat1, t.value.feat2, t.value.feat3].map((feat, i) => (
            <div key={i} className="glass p-8 rounded-3xl">
                <div className="text-blue-500 font-bold mb-4">✓</div>
                <h3 className="text-lg font-bold mb-2">{feat[0]}</h3>
                <p className="text-sm text-gray-400">{feat[1]}</p>
            </div>
          ))}
      </section>
      
      {/* PORTFOLIO GRID */}
      <section className="py-20 px-6 max-w-[1200px] mx-auto grid md:grid-cols-2 gap-8">
          {[
            "https://www.youtube.com/embed/1SUua3RI64s",
            "https://www.youtube.com/embed/rYZyjcWdo84",
            "https://www.youtube.com/embed/74n1-o3GtwY",
            "https://www.youtube.com/embed/VEp3eaRsNX8"
          ].map((url, i) => (
            <div key={i} className="glass aspect-video rounded-3xl overflow-hidden relative">
              <iframe
                className="w-full h-full"
                src={url}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          ))}
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 max-w-[1200px] mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-12 tracking-tighter">What Artists Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { quote: "Absolute game changer for our booking requests.", name: "Ralph van Manen", role: "Singer-Songwriter" },
            { quote: "The cinematography is levels above anything else.", name: "The Rock Collective", role: "Alternative Band" },
            { quote: "Professional result, easy process, festival-ready.", name: "Jazz Duo Echo", role: "Jazz Musicians" }
          ].map((t, i) => (
            <div key={i} className="glass p-8 rounded-3xl flex flex-col justify-between">
              <p className="text-gray-300 italic mb-6">"{t.quote}"</p>
              <div>
                <p className="font-bold text-white">{t.name}</p>
                <p className="text-sm text-blue-400">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER AREA - Pricing/Contact */}
      <footer className="py-20 px-6 max-w-[1200px] mx-auto grid md:grid-cols-3 gap-8">
          <div className="glass p-8 rounded-3xl md:col-span-2 space-y-8">
            <h2 className="text-3xl font-bold">{t.pricing.title}</h2>
            <div className="grid md:grid-cols-2 gap-4">
                {t.pricing.items.map((item, i) => <div key={i} className="text-sm border border-white/5 p-4 rounded-xl">{item}</div>)}
            </div>
            
            <form action="mailto:Studio3@koewe.nl" method="POST" encType="text/plain" className="space-y-4 pt-8">
              <input type="text" name="name" placeholder={t.contact.name} required className="w-full bg-[#050505] border border-[rgba(255,255,255,0.1)] rounded-xl p-4 text-white" />
              <textarea name="message" placeholder={t.contact.msg} rows={3} required className="w-full bg-[#050505] border border-[rgba(255,255,255,0.1)] rounded-xl p-4 text-white"></textarea>
              <button type="submit" className="w-full bg-[#3b82f6] p-4 rounded-xl font-bold hover:bg-[#2563eb] transition-all">{t.contact.send}</button>
            </form>
          </div>
          <div className="glass p-8 rounded-3xl text-center flex flex-col justify-center">
            <div className="text-4xl font-bold mb-2">€750,-</div>
            <div className="text-xs uppercase text-gray-500 mb-6 tracking-widest">{t.pricing.ex}</div>
            <a href="mailto:Studio3@koewe.nl" className="bg-blue-600 p-4 rounded-xl font-bold hover:bg-blue-500 transition-all">{t.pricing.btn}</a>
          </div>
      </footer>
    </div>
  );
}

