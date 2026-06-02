import React, { useState } from 'react';
import { GraduationCap, Users, Brain, FileBarChart, BarChart3, Building2, X } from 'lucide-react';
import posterBos from '../assets/BCpos.jpeg'; 
import posterMentoring from '../assets/Poster Mentoring.png';
import posterConsulting from '../assets/Poster Consulting UMKM.png';
import posterTraining from '../assets/postrain.png';// Ganti dengan nama file gambar Anda
// Interface untuk tipe data layanan
interface ServiceItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: React.ReactNode;
  shortDesc: string; // Deskripsi singkat untuk tampilan kartu awal
  posterImage?: string;
  link?: string;
}

const services: ServiceItem[] = [
  {
    icon: GraduationCap,
    title: 'Training UMKM Pro',
    shortDesc: 'Program Inkubasi Bisnis, Business Road Map, Akademi Manajer, hingga penyusunan SOP & KPI.',
    posterImage: posterTraining,
    link: 'https://wa.me/6281358894404',
    desc: (
      <div className="space-y-5">
        <a href="https://wa.me/6281358894404" target="_blank" rel="noopener noreferrer" className="block group/poster relative">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100 transition-transform duration-300 group-hover/poster:scale-[1.01]">
            <img 
              src={posterTraining} 
              alt="Poster Training UMKM" 
              className="w-full h-auto object-contain bg-slate-50"
            />
            <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover/poster:opacity-100 transition-opacity flex items-center justify-center">
              <div className="bg-white text-blue-700 px-6 py-2 rounded-xl font-bold shadow-xl">Klik untuk Daftar</div>
            </div>
          </div>
        </a>
      </div>
    ),
  },
  {
    icon: Users,
    title: 'Mentoring UMKM Pro',
    shortDesc: 'Pendampingan bisnis mendalam (360° Review, BOS Check, BSE) secara kelompok maupun eksklusif.',
    posterImage: posterMentoring,
    link: 'https://wa.me/6281358894404',
    desc: (
      <div className="space-y-5">
        <a href="https://wa.me/6281358894404" target="_blank" rel="noopener noreferrer" className="block group/poster relative">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100 transition-transform duration-300 group-hover/poster:scale-[1.01]">
            <img 
              src={posterMentoring} 
              alt="Poster Mentoring" 
              className="w-full h-auto object-contain bg-slate-50"
            />
            <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover/poster:opacity-100 transition-opacity flex items-center justify-center">
              <div className="bg-white text-blue-700 px-6 py-2 rounded-xl font-bold shadow-xl">Klik untuk Daftar</div>
            </div>
          </div>
        </a>
      </div>
    ),
  },
  {
    icon: Brain,
    title: 'Consulting UMKM Pro',
    shortDesc: 'Solusi legalitas, perpajakan, rekrutmen SDM Pro Player, hingga penataan organisasi usaha.',
    posterImage: posterConsulting,
    link: 'https://wa.me/6281358894404',
    desc: (
     <div className="space-y-5">
        <a href="https://wa.me/6281358894404" target="_blank" rel="noopener noreferrer" className="block group/poster relative">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100 transition-transform duration-300 group-hover/poster:scale-[1.01]">
            <img 
              src={posterConsulting} 
              alt="Poster Consulting UMKM" 
              className="w-full h-auto object-contain bg-slate-50"
            />
            <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover/poster:opacity-100 transition-opacity flex items-center justify-center">
              <div className="bg-white text-blue-700 px-6 py-2 rounded-xl font-bold shadow-lg">Klik untuk Daftar</div>
            </div>
          </div>
        </a>
      </div>
    ),
  },
  {
    icon: FileBarChart,
    title: 'BOS Check - Business Operating System Check',
    shortDesc: 'Strategi scaling bisnis dari skala lokal ke nasional dengan pendekatan bertahap dan terukur.',
    posterImage: posterBos,
    link: 'https://wa.me/6281358894404',
    desc: (
      <div className="space-y-5">
        <a href="https://wa.me/6281358894404" target="_blank" rel="noopener noreferrer" className="block group/poster relative">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100 transition-transform duration-300 group-hover/poster:scale-[1.01]">
            <img 
              src={posterBos} 
              alt="Poster BOS Check" 
              className="w-full h-auto object-contain bg-slate-50"
            />
            <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover/poster:opacity-100 transition-opacity flex items-center justify-center">
              <div className="bg-white text-blue-700 px-6 py-2 rounded-xl font-bold shadow-xl">Klik untuk Daftar</div>
            </div>
          </div>
        </a>
      </div>
    ),
  },
  {
    icon: BarChart3,
    title: 'BMG - Business Mentoring Group',
    shortDesc: 'Riset mendalam terhadap tren pasar dan perilaku konsumen untuk pengambilan keputusan yang tepat.',
    link: 'https://wa.me/6281358894404',
    desc: (
      <div className="space-y-6">
        <p className="text-slate-600 leading-relaxed">
          Riset mendalam terhadap tren pasar dan perilaku konsumen untuk pengambilan keputusan yang tepat, menciptakan daya tarik (lead magnet) yang optimal guna mengonversi prospek menjadi pelanggan setia.
        </p>
        <a
          href="https://wa.me/6281358894404"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition shadow-lg"
        >
          Daftar BMG Sekarang
        </a>
      </div>
    ),
  },
  {
    icon: Building2,
    title: 'Program CRA University',
    shortDesc: 'Workshop Super Team, MFM BRM 2.0, & Smart Family RoadMap.',
    desc: (
      <div className="space-y-6">
        <p className="text-slate-600 leading-relaxed">
          Tingkatkan kompetensi bisnis Anda melalui program kolaborasi eksklusif kami dengan CRA University:
        </p>
        <div className="space-y-3">
          {[
            { title: 'Workshop Super Team CRA University', link: 'https://crauniversity.id/aff/188/1698/' },
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

        {/* Grid Menu Utama */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                onClick={() => setActiveService(s)} // Tambahkan onClick di sini
                className="group p-8 rounded-3xl bg-white hover:bg-blue-700 transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-2 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white/20 group-hover:text-white transition">
                    <Icon className="w-8 h-8" />
                  </div>

                  {s.posterImage && (
                    <div className="mb-6 rounded-2xl overflow-hidden h-64 border border-slate-100 bg-slate-50 shadow-sm group-hover:border-blue-500 transition-all">
                      <img src={s.posterImage} alt={s.title} className="w-full h-full object-contain" />
                    </div>
                  )}

                  <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition">
                    {s.title}
                  </h3>
                  <p className="text-slate-600 group-hover:text-blue-50 leading-relaxed transition text-sm">
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity"
          onClick={() => setActiveService(null)} // Klik di luar modal untuk menutup
        >
          <div 
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 max-h-[85vh] overflow-y-auto transform scale-100 transition-all"
            onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat konten diklik
          >
            {/* Header Modal */}
            <div className="flex items-start justify-between mb-6 pb-4 border-b border-slate-100">
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
            <div className="text-slate-700 leading-relaxed">
              {activeService.desc}
            </div>

            {/* Footer Modal */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setActiveService(null)}
                className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 transition"
              >
                Tutup
              </button>
              <a
                href="#contact"
                onClick={() => {
                  setActiveService(null);
                  setTimeout(() => {
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="px-5 py-2.5 text-sm font-semibold bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition"
              >
                Tanya Tentang Layanan Ini
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}