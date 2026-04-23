type HeroTranslations = {
  title1: string;
  title2: string;
  desc: string;
  btn1: string;
};

export function Hero({t, videoUrl}: {t: HeroTranslations; videoUrl: string}) {
  return (
    <section className="relative pt-24 pb-12 px-6 max-w-[1200px] mx-auto flex flex-col-reverse md:grid md:grid-cols-2 gap-8 md:gap-12 items-center transition-all duration-1000 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <iframe
          className="w-full h-full object-cover"
          src={videoUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          title="Hero video"
          allowFullScreen
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className="content text-center md:text-left relative z-10">
        <h1 className="text-6xl font-black leading-[62.6px] mb-[23px] tracking-tighter">
          {t.title1} <span className="gradient-text">{t.title2}</span>
        </h1>
        <p className="description text-base md:text-lg text-gray-400 mb-8 max-w-md mx-auto md:mx-0">{t.desc}</p>
        <a
          href="mailto:Studio3@koewe.nl"
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20"
        >
          {t.btn1}
        </a>
      </div>
      <div className="preview-window glass aspect-video rounded-3xl flex items-center justify-center relative overflow-hidden w-full z-10">
        <img
          src="/hero-concert.jpg"
          alt="Concert Registratie"
          className="object-cover object-[50%_30%] w-full h-full opacity-100"
        />
      </div>
    </section>
  );
}
