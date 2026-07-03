import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const logoModules = import.meta.glob('../assets/Client/*.{png,jpg,jpeg}', { eager: true }) as Record<string, { default: string }>;

type LogoItem = {
  src: string;
  alt: string;
};

const logos: LogoItem[] = Object.entries(logoModules)
  .map(([path, module]) => ({
    src: (module as { default: string }).default,
    alt: path.split('/').pop()?.replace(/\.[^/.]+$/, '')?.replace(/[-_]/g, ' ') || 'client',
  }))
  .sort((a, b) => a.alt.localeCompare(b.alt));

export default function Clients() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const offset = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({ left: direction === 'left' ? -offset : offset, behavior: 'smooth' });
    setAutoScroll(false);
    setTimeout(() => setAutoScroll(true), 5000);
  };

  useEffect(() => {
    if (!autoScroll || !scrollRef.current) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;
        
        scrollRef.current.scrollBy({
          left: isAtEnd ? -scrollWidth : clientWidth * 0.7,
          behavior: 'smooth',
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [autoScroll]);

  return (
    <section id="clients" className="relative py-24 bg-white text-slate-950 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-white via-white to-transparent opacity-80" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">Our Clients</span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-3 text-slate-950">Mitra & Klien Kami</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Sobat UMKM Pro telah dipercaya oleh {logos.length} brand dan komunitas. Berikut beberapa logo klien yang sudah bekerja sama.
          </p>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-4 md:-translate-x-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto overflow-y-hidden px-4 md:px-0 pb-4 snap-x snap-mandatory scroll-smooth hide-scrollbar"
          >
            {logos.map((logo) => (
              <div key={logo.alt} className="min-w-[120px] sm:min-w-[140px] md:min-w-[160px] flex items-center justify-center p-2 snap-start">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-20 max-w-full object-contain bg-white p-3 rounded-2xl"
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-4 md:translate-x-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
