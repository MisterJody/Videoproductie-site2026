import type {Lang} from '../content/translations';

type NavItem = {label: string; href: string};

export function Nav({
  lang,
  onToggleLang,
  quoteLabel,
  items,
}: {
  lang: Lang;
  onToggleLang: () => void;
  quoteLabel: string;
  items: NavItem[];
}) {
  return (
    <nav className="fixed w-full z-50 py-6">
      <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
        <div className="text-sm font-black tracking-[0.2em] uppercase flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          VIDEOPRODUCTIE.LIVE
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
          {items.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-white transition-colors">
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onToggleLang} className="font-bold text-white hover:text-blue-500 transition-colors">
            {lang.toUpperCase()}
          </button>
          <a
            href="mailto:Studio3@koewe.nl"
            className="bg-white text-black px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-200 transition-all"
          >
            {quoteLabel}
          </a>
        </div>
      </div>
    </nav>
  );
}
