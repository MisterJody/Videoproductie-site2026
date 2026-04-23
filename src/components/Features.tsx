type ValueTranslations = {
  feat1: readonly [string, string];
  feat2: readonly [string, string];
  feat3: readonly [string, string];
};

export function Features({t}: {t: ValueTranslations}) {
  return (
    <section
      id="specials"
      className="py-20 px-6 max-w-[1200px] mx-auto grid md:grid-cols-3 gap-8 scroll-mt-28"
    >
      {[t.feat1, t.feat2, t.feat3].map((feat, i) => (
        <div key={i} className="glass p-8 rounded-3xl">
          <div className="text-blue-500 font-bold mb-4">✓</div>
          <h3 className="text-lg font-bold mb-2">{feat[0]}</h3>
          <p className="text-sm text-gray-400">{feat[1]}</p>
        </div>
      ))}
    </section>
  );
}
