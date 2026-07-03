import { useRef } from 'react';
import { Calendar, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProgramItem } from '../App';

interface ProgramsProps {
  programs: ProgramItem[];
}

export default function Programs({ programs }: ProgramsProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollPrograms = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const offset = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: direction === 'left' ? -offset : offset, behavior: 'smooth' });
  };

  return (
    <section id="programs" className="relative py-24 bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#1a4b8c] text-white overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 translate-y1/4 -translate-x-1/4 w-[400px] h-[400px] bg-amber-400/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-blue-300 font-bold uppercase tracking-wider text-sm">Program & Event</span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-white">Acara dan Program Mendatang</h2>
          <div className="w-24 h-1 bg-blue-500 mt-4 rounded-full" />
        </div>

        <div className="relative">
          <div className="absolute left-0 top-1/2 z-10 -translate-y-1/2 hidden md:flex">
            <button
              type="button"
              onClick={() => scrollPrograms('left')}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg shadow-slate-200 hover:bg-white transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute right-0 top-1/2 z-10 -translate-y-1/2 hidden md:flex">
            <button
              type="button"
              onClick={() => scrollPrograms('right')}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg shadow-slate-200 hover:bg-white transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto overflow-y-hidden px-2 md:px-0 pb-6 snap-x snap-mandatory scroll-smooth hide-scrollbar"
          >
            {programs.length === 0 ? (
              <div className="min-w-full rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center text-slate-300">
                Belum ada program atau event untuk ditampilkan.
              </div>
            ) : (
              programs.map((program) => (
                <article
                  key={program.id}
                  className="min-w-[280px] sm:min-w-[320px] lg:min-w-[360px] flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-xl shadow-slate-950/20 transition duration-500 hover:bg-white/10 snap-start"
                >
                  <div className="overflow-hidden bg-slate-950 border-b border-white/10">
                    {program.poster ? (
                      <div className="relative flex h-48 items-center justify-center bg-slate-900">
                        <img src={program.poster} alt={program.title} className="max-h-full max-w-full" />
                      </div>
                    ) : (
                      <div className="h-48 bg-slate-900" />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col gap-4 p-5">
                    <div>
                      <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-blue-200">
                        <Calendar className="w-3.5 h-3.5" />
                        {program.type}
                      </span>

                      <h3 className="mt-4 text-xl font-semibold text-white leading-tight line-clamp-2">{program.title}</h3>
                      <p className="mt-2 text-sm text-slate-300">
                        {isNaN(Date.parse(program.date))
                          ? program.date
                          : new Date(program.date).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                      </p>
                    </div>

                    <div className="mt-auto">
                      {program.link ? (
                        <a
                          href={program.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
                        >
                          Daftar Sekarang
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <div className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-slate-400">
                          Info segera hadir
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
