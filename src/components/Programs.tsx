import { useRef } from 'react';
import { Calendar, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProgramItem } from '../App';

interface ProgramsProps {
  programs: ProgramItem[];
}

export default function Programs({ programs }: ProgramsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="programs" className="relative py-24 bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#1a4b8c] text-white overflow-hidden">
      {/* Dekorasi Blobs agar seragam dengan Hero */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-amber-400/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-blue-300 font-bold uppercase tracking-wider text-sm">
            Program & Event
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-white">
            Acara dan Program Mendatang
          </h2>
          <div className="w-24 h-1 bg-blue-500 mt-4 rounded-full" />
        </div>

        <div className="relative group">
          {/* Tombol Navigasi Kiri */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-4 bg-white/10 backdrop-blur-md shadow-xl rounded-full text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden md:block border border-white/20 hover:bg-blue-600"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Container Slider */}
          <div 
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 transition-all"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {programs.map((prog) => (
              <div key={prog.id} className="min-w-full md:min-w-[calc(33.333%-1.5rem)] snap-start">
                {prog.link ? (
                  <a 
                    href={prog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-full block group bg-white/5 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/10 hover:bg-white/10 hover:shadow-2xl hover:shadow-blue-900/40 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between"
                  >
                  <div>
                    {prog.poster ? (
                      <div className="w-full h-72 mb-6 rounded-2xl overflow-hidden border border-slate-200 bg-slate-200/30">
                        <img src={prog.poster} alt={prog.title} className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 bg-blue-500/20 text-blue-300 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Calendar className="w-6 h-6" />
                      </div>
                    )}
                    <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
                      {prog.type}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-4">{prog.title}</h3>
                    <p className="text-blue-100/70 text-sm leading-relaxed mb-8">
                      Pelaksanaan: {isNaN(Date.parse(prog.date)) 
                        ? prog.date 
                        : new Date(prog.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="inline-flex items-center justify-center gap-2 w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 active:scale-95 transition-all">
                    Daftar Sekarang <ExternalLink className="w-4 h-4" />
                  </div>
                </a>
              ) : (
                <div className="h-full group bg-white/5 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all duration-500 flex flex-col justify-between">
                  <div>
                    {prog.poster ? (
                      <div className="w-full h-72 mb-6 rounded-2xl overflow-hidden border border-slate-200 bg-slate-200/30">
                        <img src={prog.poster} alt={prog.title} className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 bg-blue-500/20 text-blue-300 rounded-2xl flex items-center justify-center mb-6">
                        <Calendar className="w-6 h-6" />
                      </div>
                    )}
                    <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
                      {prog.type}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-4">{prog.title}</h3>
                    <p className="text-blue-100/70 text-sm leading-relaxed mb-8">
                      Pelaksanaan: {isNaN(Date.parse(prog.date)) 
                        ? prog.date 
                        : new Date(prog.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              )}
              </div>
            ))}
          </div>

          {/* Tombol Navigasi Kanan */}
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-4 bg-white/10 backdrop-blur-md shadow-xl rounded-full text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden md:block border border-white/20 hover:bg-blue-600"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}