import React, { useState, useRef } from 'react';
import { GraduationCap, FileBarChart, Users, Brain, Building2, X, ChevronLeft, ChevronRight } from 'lucide-react'; 
import posterMentoring from '../assets/Poster Mentoring.png';
import posterConsulting from '../assets/Poster Consulting UMKM.png';
import posterTraining from '../assets/postrain.png';
import posterBos from '../assets/BCpos.jpeg'; // Pastikan nama file sesuai (misal .png atau .jpg)
// Interface untuk tipe data layanan
interface ServiceItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc?: React.ReactNode; // Menjadi opsional
  shortDesc: string; // Deskripsi singkat untuk tampilan kartu awal
  posterImage?: string;
  link?: string;
}

const services: ServiceItem[] = [
  {
    icon: GraduationCap,
    title: 'Training UMKM Pro',
    shortDesc: 'Inkubasi bisnis, roadmap, SOP, dan KPI.',
    posterImage: posterTraining,
    link: 'https://wa.me/6281358894404',
  },
  {
    icon: Users,
    title: 'Mentoring UMKM Pro',
    shortDesc: 'Pendampingan 360° bisnis dan BOS Check.',
    posterImage: posterMentoring,
    link: 'https://wa.me/6281358894404',
  },
  {
    icon: Brain,
    title: 'Consulting UMKM Pro',
    shortDesc: 'Legalitas, perpajakan, SDM, dan organisasi.',
    posterImage: posterConsulting,
    link: 'https://wa.me/6281358894404',
  },
  {
    icon: FileBarChart,
    title: 'BOS Check - Business Operating System Check',
    shortDesc: 'Strategi scaling bisnis lokal ke nasional.',
    posterImage: posterBos,
    link: 'https://docs.google.com/forms/d/e/1FAIpQLSdrCFwj1XAc2Q1JIx8Wce3r5hyAxXZc-ism6sflDq0c8qKgNg/viewform?usp=header',
  },
  {
    icon: Building2,
    title: 'Program CRA University',
    shortDesc: 'Workshop Super Team & Smart Family RoadMap.',
    desc: (
      <div className="space-y-6">
        <p className="text-slate-600 leading-relaxed">
          Tingkatkan kompetensi bisnis Anda melalui program kolaborasi eksklusif kami dengan CRA University:
        </p>
        <div className="space-y-3">
          {[
            { title: 'MFM BRM 2.0', link: 'https://crauniversity.id/aff/188/1693/' },
            { title: 'Smart Family RoadMap', link: 'https://crauniversity.id/aff/188/1687/' },
          ].map((item) => (
            <a
              key={item.link}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-2xl hover:bg-blue-100 transition group"
            >
              <span className="font-bold text-blue-800">{item.title}</span>
              <div className="flex items-center gap-2 text-blue-700 text-sm font-semibold">
                Daftar <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </a>
          ))}
        </div>
        <p className="text-xs text-slate-400 italic">
          *Klik link di atas untuk menuju halaman pendaftaran resmi.
        </p>
      </div>
    ),
  },
];

export default function Services() {
  // State untuk melacak data layanan apa yang sedang aktif di pop-up
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const offset = carouselRef.current.clientWidth * 0.8;
    carouselRef.current.scrollBy({ left: direction === 'left' ? -offset : offset, behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-blue-700 font-bold uppercase tracking-wider text-sm">
            Layanan Kami
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-slate-900">
            Solusi Strategis Bisnis Mengembangkan Bisnis Anda
          </h2>
          <div className="w-24 h-1 bg-blue-700 mt-4 rounded-full" />
        </div>

        {/* Carousel / Grid Menu Utama */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              type="button"
              onClick={() => scrollCarousel('left')}
              className="ml-2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg shadow-slate-200 hover:bg-white transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center md:hidden">
            <button
              type="button"
              onClick={() => scrollCarousel('right')}
              className="mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg shadow-slate-200 hover:bg-white transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div
            ref={carouselRef}
            className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory touch-pan-x px-4 md:px-0 -mx-4 md:mx-0 pb-6 md:pb-0"
          >
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  onClick={() => setActiveService(s)} // Tambahkan onClick di sini
                  className="min-w-[65vw] sm:min-w-[48vw] md:min-w-0 max-w-[300px] snap-center flex-shrink-0 group p-5 sm:p-6 rounded-3xl bg-white hover:bg-blue-700 transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-2 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20 group-hover:text-white transition">
                      <Icon className="w-7 h-7" />
                    </div>

                    {s.posterImage && (
                      <div className="hidden md:block mb-4 rounded-2xl overflow-hidden aspect-[3/4] border border-slate-100 bg-slate-50 shadow-sm group-hover:border-blue-500 transition-all">
                        <img src={s.posterImage} alt={s.title} className="w-full h-full object-contain" loading="lazy" />
                      </div>
                    )}

                    <h3 className="text-lg font-bold mb-2 group-hover:text-white transition">
                      {s.title}
                    </h3>
                    <p className="text-slate-600 group-hover:text-blue-50 leading-relaxed transition text-sm line-clamp-2">
                      {s.shortDesc}
                    </p>
                  </div>

                  {/* Tombol Pemicu Pop-up */}
                  <div className="mt-6 pt-4 border-t border-slate-100 group-hover:border-blue-600 transition">
                    <button
                      className="text-sm font-semibold text-blue-700 group-hover:text-white inline-flex items-center gap-1 hover:underline pointer-events-none" // pointer-events-none agar tidak double click
                    >
                      Lihat Detail Layanan &rarr;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition shadow-lg shadow-amber-500/20"
          >
            Konsultasi Gratis Sekarang
          </a>
        </div>
      </div>

      {/* --- KOMPONEN POP-UP MENU (MODAL) --- */}
      {activeService && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity"
          onClick={() => setActiveService(null)} // Klik di luar modal untuk menutup
        >
          <div 
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-h-[95vh] md:max-h-[90vh] overflow-hidden flex flex-col transform scale-100 transition-all"
            onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat konten diklik
          >
            {/* Header Modal */}
            <div className="flex items-start justify-between mb-4 pb-4 border-b border-slate-100 flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center">
                  {/* Render icon dinamis */}
                  {React.createElement(activeService.icon, { className: "w-6 h-6" })}
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {activeService.title}
                </h3>
              </div>
              <button 
                onClick={() => setActiveService(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Konten Utama Deskripsi di dalam Pop-up */}
            <div className="text-slate-700 leading-relaxed overflow-hidden flex-grow flex flex-col items-center justify-center">
              {activeService.desc ? (
                <div className="overflow-y-auto w-full pr-1 max-h-[60vh]">{activeService.desc}</div>
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full">
                  {activeService.posterImage && (
                    <button 
                      onClick={() => {
                        if (activeService.link) {
                          window.open(activeService.link, '_blank', 'noopener,noreferrer');
                          setActiveService(null);
                        }
                      }}
                      className="relative group/poster w-full max-w-[45vh] aspect-[3/4] block rounded-2xl overflow-hidden shadow-lg border border-slate-100 transition-transform duration-300 hover:scale-[1.01] cursor-pointer"
                    >
                      <img 
                        src={activeService.posterImage} 
                        alt={activeService.title} 
                        className="w-full h-full object-contain bg-slate-50"
                      />
                      <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover/poster:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="bg-white text-blue-700 px-6 py-2 rounded-xl font-bold shadow-xl text-sm md:text-base">Klik untuk Daftar</div>
                      </div>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Footer Modal - flex-shrink-0 agar tidak terpotong */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end gap-3 flex-shrink-0">
              <button
                onClick={() => setActiveService(null)}
                className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 transition"
              >
                Tutup
              </button>
              <a
                href={activeService.link || "#contact"}
                target={activeService.link ? "_blank" : "_self"}
                rel={activeService.link ? "noopener noreferrer" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  if (activeService.link) {
                    // Gunakan window.open untuk memastikan link eksternal (s.id/WhatsApp) terbuka
                    window.open(activeService.link, '_blank', 'noopener,noreferrer');
                  } else {
                    // Scroll internal ke bagian kontak
                    setTimeout(() => {
                      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                  setActiveService(null); // Tutup modal setelah perintah kirim
                }}
                className="px-5 py-2.5 text-sm font-semibold bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition"
              >
                {activeService.link ? 'Daftar / Konsultasi Sekarang' : 'Tanya Tentang Layanan Ini'}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}