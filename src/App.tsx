import {useEffect, useState} from 'react';
import {Footer} from './components/Footer';
import {Features} from './components/Features';
import {Hero} from './components/Hero';
import {Nav} from './components/Nav';
import {Portfolio} from './components/Portfolio';
import {Testimonials} from './components/Testimonials';
import {testimonials} from './content/testimonials';
import {type Lang, translations} from './content/translations';
import {heroVideos, portfolioVideos} from './content/videos';

export default function App() {
  const [lang, setLang] = useState<Lang>('en');
  const t = translations[lang];
  const [heroVideo, setHeroVideo] = useState(heroVideos[0]);
  const navItems = [
    { label: 'Specials', href: '#specials' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * heroVideos.length);
    setHeroVideo(heroVideos[randomIndex]);
  }, []);

  return (
    <div className="min-h-screen text-gray-100">
      <Nav
        lang={lang}
        onToggleLang={() => setLang(lang === 'en' ? 'nl' : 'en')}
        quoteLabel={t.nav.quote}
        items={navItems}
      />
      <Hero t={t.hero} videoUrl={heroVideo} />
      <Features t={t.value} />
      <Portfolio videos={[...portfolioVideos]} />
      <Testimonials items={[...testimonials]} />
      <Footer pricing={t.pricing} contact={t.contact} />
    </div>
  );
}
