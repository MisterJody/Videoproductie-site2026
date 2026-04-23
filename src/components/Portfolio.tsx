export function Portfolio({videos}: {videos: string[]}) {
  return (
    <section id="portfolio" className="py-20 px-6 max-w-[1200px] mx-auto grid md:grid-cols-2 gap-8 scroll-mt-28">
      {videos.map((url, i) => (
        <div key={url} className="glass aspect-video rounded-3xl overflow-hidden relative">
          <iframe
            className="w-full h-full"
            src={url}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title={`Portfolio video ${i + 1}`}
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </section>
  );
}
