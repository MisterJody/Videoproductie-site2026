export const translations = {
  en: {
    nav: {quote: 'Get a Quote'},
    hero: {
      title1: 'From the club to the main stage.',
      title2: 'Get the video that lands the gig.',
      desc: 'Transform your live performances into high-end cinematic productions. The ultimate visual tool to impress booking agents, festivals, and fans.',
      btn1: 'Book Your Recording',
      btn2: 'Watch Our Work',
    },
    value: {
      title: 'Your Performance is World-Class.',
      sub: 'Does your video look like it?',
      feat1: [
        'The Booking Magnet',
        'Use your recording as a professional EPK. Show festivals exactly what it feels like to have you on their stage.',
      ],
      feat2: [
        'Social Media Engine',
        'We provide high-quality assets optimized for Instagram, TikTok, and YouTube to grow your digital presence.',
      ],
      feat3: [
        'Professional Exposé',
        'Stop sending grainy smartphone footage. Send a cinematic experience that justifies your premium booking fee.',
      ],
    },
    tech: {
      title: 'Cinema Quality. Concert Precision.',
      l1: '4K Broadcast Quality',
      l1d: 'Multi-camera setup designed for cinema-style storytelling',
      l2: 'Dynamic Movement',
      l2d: 'Manned TV-zoom lens for perfect, high-energy close-ups',
      l3: 'The Hollywood Look',
      l3d: 'Anamorphic lenses for that ultra-wide, cinematic aesthetic',
      l4: 'Mastered Audio',
      l4d: 'We sync your professional live mix for a seamless broadcast result',
    },
    portfolio: {title: 'See the Magic in Action'},
    pricing: {
      title: 'Professional Production.',
      sub: 'Transparent pricing for serious artists.',
      card: 'The Standard Live',
      ex: '/ex. BTW',
      items: [
        'Full 4K Multi-camera Setup',
        'Manned TV-zoom Camera',
        'Anamorphic Wide Shots',
        'Professional Color & Audio Mastering',
        'Final 4K Delivery',
      ],
      btn: 'Inquire for Your Date',
      note: '*Travel costs €0,42 per km from Zoetermeer',
    },
    contact: {
      title: 'Get in touch',
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      msg: 'Message',
      send: 'Send Message',
    },
  },
  nl: {
    nav: {quote: 'Vraag een offerte aan'},
    hero: {
      title1: 'Van het café naar het hoofdpodium.',
      title2: 'De video die de boeking binnenhaalt.',
      desc: 'Transformeer je liveoptredens in hoogwaardige cinematografische producties. De ultieme visuele tool om indruk te maken op boekingsagenten, festivals en fans.',
      btn1: 'Boek je opname',
      btn2: 'Bekijk ons werk',
    },
    value: {
      title: 'Je optreden is van wereldklasse.',
      sub: 'Ziet je video er ook zo uit?',
      feat1: [
        'De Boekingsmagneet',
        'Gebruik je opname als een professionele EPK. Laat festivals zien hoe het voelt om je op hun podium te hebben.',
      ],
      feat2: [
        'Social Media Motor',
        'Wij leveren assets van hoge kwaliteit, geoptimaliseerd voor Instagram, TikTok en YouTube om je digitale aanwezigheid te vergroten.',
      ],
      feat3: [
        'Professionele Exposé',
        'Stop met het versturen van korrelige smartphonebeelden. Verzend een cinematografische ervaring die je premium boekingsprijs rechtvaardigt.',
      ],
    },
    tech: {
      title: 'Bioscoopkwaliteit. Concertprecisie.',
      l1: '4K Broadcast Kwaliteit',
      l1d: 'Multi-camera opstelling ontworpen voor cinematografische storytelling',
      l2: 'Dynamische Beweging',
      l2d: 'Bemande TV-zoomlens voor perfecte, energieke close-ups',
      l3: 'De Hollywood Look',
      l3d: 'Anamorfische lenzen voor die ultrabrede, cinematografische esthetiek',
      l4: 'Gmastered Audio',
      l4d: 'We synchroniseren je professionele livemix voor een naadloos broadcastresultaat',
    },
    portfolio: {title: 'Zie de magie in actie'},
    pricing: {
      title: 'Professionele Productie.',
      sub: 'Transparante prijzen voor serieuze artiesten.',
      card: 'De Standaard Live',
      ex: '/ex. BTW',
      items: [
        'Volledige 4K Multi-camera opstelling',
        'Bemande TV-zoomlens',
        'Anamorfische brede beelden',
        'Professionele kleurcorrectie & Audio mastering',
        'Definitieve 4K oplevering',
      ],
      btn: 'Informeer voor je datum',
      note: '*Reiskosten €0,42 per km vanaf Zoetermeer',
    },
    contact: {
      title: 'Neem contact op',
      name: 'Naam',
      email: 'E-mail',
      subject: 'Onderwerp',
      msg: 'Bericht',
      send: 'Bericht versturen',
    },
  },
} as const;

export type Lang = keyof typeof translations;
export type Translations = (typeof translations)[Lang];
