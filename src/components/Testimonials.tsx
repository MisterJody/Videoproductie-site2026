type Testimonial = {quote: string; name: string; role: string};

export function Testimonials({items}: {items: Testimonial[]}) {
  return (
    <section className="py-20 px-6 max-w-[1200px] mx-auto">
      <h2 className="text-3xl md:text-5xl font-black text-center mb-12 tracking-tighter">What Artists Say</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {items.map((t, i) => (
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
  );
}
