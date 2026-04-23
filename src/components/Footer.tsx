type PricingTranslations = {
  title: string;
  ex: string;
  items: readonly string[];
  btn: string;
};

type ContactTranslations = {
  name: string;
  msg: string;
  send: string;
};

export function Footer({
  pricing,
  contact,
}: {
  pricing: PricingTranslations;
  contact: ContactTranslations;
}) {
  return (
    <footer id="pricing" className="py-20 px-6 max-w-[1200px] mx-auto grid md:grid-cols-3 gap-8 scroll-mt-28">
      <div className="glass p-8 rounded-3xl md:col-span-2 space-y-8">
        <h2 className="text-3xl font-bold">{pricing.title}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {pricing.items.map((item, i) => (
            <div key={i} className="text-sm border border-white/5 p-4 rounded-xl">
              {item}
            </div>
          ))}
        </div>

        <form
          id="contact"
          action="mailto:Studio3@koewe.nl"
          method="POST"
          encType="text/plain"
          className="space-y-4 pt-8 scroll-mt-28"
        >
          <input
            type="text"
            name="name"
            placeholder={contact.name}
            required
            className="w-full bg-[#050505] border border-[rgba(255,255,255,0.1)] rounded-xl p-4 text-white"
          />
          <textarea
            name="message"
            placeholder={contact.msg}
            rows={3}
            required
            className="w-full bg-[#050505] border border-[rgba(255,255,255,0.1)] rounded-xl p-4 text-white"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-[#3b82f6] p-4 rounded-xl font-bold hover:bg-[#2563eb] transition-all"
          >
            {contact.send}
          </button>
        </form>
      </div>
      <div className="glass p-8 rounded-3xl text-center flex flex-col justify-center">
        <div className="text-4xl font-bold mb-2">€750,-</div>
        <div className="text-xs uppercase text-gray-500 mb-6 tracking-widest">{pricing.ex}</div>
        <a href="mailto:Studio3@koewe.nl" className="bg-blue-600 p-4 rounded-xl font-bold hover:bg-blue-500 transition-all">
          {pricing.btn}
        </a>
      </div>
    </footer>
  );
}
