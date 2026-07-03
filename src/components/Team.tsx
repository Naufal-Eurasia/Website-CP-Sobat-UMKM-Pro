import { useState, useEffect, useRef } from 'react';
import { X, Instagram, Facebook, Linkedin, Youtube, ChevronLeft, ChevronRight } from 'lucide-react';
import ar1Image from '../assets/AR1.jpeg';
import ar2Image from '../assets/AR2.png';
import ar5Image from '../assets/AR5.png';
import ar6Image from '../assets/ar6.jpg';
import hrImage from '../assets/hr.png';

interface Member {
  name: string;
  role: string;
  desc: string;
  img: string;
  mainRole?: string;
  shortDesc?: string;
  experience?: string[];
  socials?: {
    instagram?: string;
    facebook?: string;
    threads?: string;
    tikTok?: string;
    linkedin?: string;
    website?: string;
    whatsapp?: string;
    youtube?: string;
  };
}

const members: Member[] = [
  {
    name: 'Arfin Mardiyanto, S.Sos',
    role: 'Founder & Mentor UMKM Pro',
    mainRole: 'Menjadi pengarah strategi, mentor bisnis, dan penggerak ekosistem Sobat UMKM Pro dalam membantu UMKM bertumbuh, bertransformasi digital, dan naik kelas.',
    shortDesc: 'Berpengalaman mendampingi ratusan UMKM dalam pengembangan bisnis, peningkatan omzet, penguatan SDM, dan transformasi usaha melalui mentoring, pelatihan, dan konsultasi.',
    experience: [
      'Pendamping UMKM BNSP RI',
      'Trainer UMKM BNSP RI',
      'Operator K3 BNSP RI',
      'Certified Mentor BRM',
      'Professional Mentor Business Coach',
      'Professional Trainer Corporate Coach'
    ],
    desc: 'Jika rencana Anda adalah untuk satu tahun, tanamlah padi. Jika rencana Anda adalah untuk sepuluh tahun, tanamlah pohon. Jika rencana Anda adalah untuk seumur hidup, tanamlah manusia.',
    img: ar1Image,
    socials: { instagram: 'https://instagram.com/arfinmardiyanto', facebook: 'https://facebook.com/arfinmardiyanto', threads: 'https://www.threads.net/@arfinmardiyanto', linkedin: 'https://www.linkedin.com/in/arfin-mardiyanto-13a713134/', tikTok: 'https://www.tiktok.com/@arfinmardiyanto', youtube: 'https://www.youtube.com/@arfinmardiyanto',whatsapp: 'https://wa.me/6281358894404' },
  },
  {
    name: 'Tri Agustina, S.H',
    role: 'Branding & Digital Marketing Spesialist',
    mainRole: 'Membantu UMKM membangun citra usaha yang kuat dan menjangkau lebih banyak pelanggan melalui strategi pemasaran digital yang efektif.',
    shortDesc: 'Fokus pada pengembangan branding, media sosial, promosi digital, dan strategi komunikasi yang mampu meningkatkan kepercayaan pasar terhadap produk maupun jasa UMKM.',
    experience: [
      'Social Media Management',
      'Content Marketing',
      'Branding Strategy',
      'Digital Campaign',
      'Copywriting'
    ],
    desc: 'Brand yang kuat membuat UMKM lebih mudah dikenal, dipercaya, dipilih, dipesan, dan dibagikan oleh pelanggan.',
    img: ar6Image,
  },
  {
    name: 'Naufal Eurasia N',
    role: 'Pengembangan Sistem & Teknologi',
    mainRole: 'Mengembangkan dan memastikan sistem digital Sobat UMKM Pro berjalan dengan baik untuk mendukung pelayanan yang cepat, modern, dan mudah digunakan.',
    shortDesc: 'Berpengalaman dalam pengembangan website, sistem informasi, dan implementasi teknologi yang membantu UMKM bekerja lebih efektif dan efisien.',
    experience: [
      'Website Development',
      'Sistem Informasi',
      'Database Management',
      'Digitalisasi Proses Bisnis',
      'Integrasi Teknologi'
    ],
    desc: 'Teknologi bukan sekadar alat, melainkan akselerator yang mengubah potensi menjadi performa nyata bagi setiap UMKM.',
    img: ar2Image,
  },
  {
    name: 'Habibah Rahma H',
    role: 'Operasional & Layanan Digital',
    mainRole: 'Memastikan seluruh layanan dan sistem operasional berjalan dengan baik sehingga pengguna mendapatkan pengalaman yang nyaman dan mudah.',
    shortDesc: 'Fokus pada pengelolaan operasional platform, peningkatan kualitas layanan, dan pengembangan fitur berdasarkan kebutuhan UMKM.',
    experience: [
      'Operasional Digital',
      'Administrasi Sistem',
      'Quality Control',
      'Customer Experience',
      'Monitoring Layanan'
    ],
    desc: ' Sistem yang baik adalah yang bisa membantu operasional semua bidang dengan efisien dan terstruktur',
    img: hrImage,
  },
  {
    name: 'Nur Hidayati, S.Si',
    role: 'Pengembangan SDM & Talenta',
    mainRole: 'Membangun tim yang kompeten, produktif, dan memiliki semangat belajar untuk mendukung pertumbuhan Sobat UMKM Pro.',
    shortDesc: 'Berpengalaman dalam rekrutmen, pengembangan kompetensi, pelatihan, dan pembentukan budaya kerja yang positif dan berorientasi pada hasil.',
    experience: [
      'Rekrutmen SDM',
      'Pengembangan Talenta',
      'Training & Development',
      'Penilaian Kinerja',
      'Pengembangan Organisasi'
    ],
    desc: 'Keberuntungan bukanlah sekadar kebetulan, melainkan sebuah keterampilan untuk mempersiapkan talenta terbaik dan membangun ekosistem yang tepat, sehingga setiap peluang pertumbuhan dapat disambut dengan kesiapan yang matang.',
    img: ar5Image,
  },
];

export default function Team() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // Geser sekitar 80% dari lebar container agar user tahu ada elemen berikutnya
      const scrollAmount = clientWidth * 0.8;
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedMember(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [selectedMember]);

  return (
    <section id="team" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-blue-700 font-bold uppercase tracking-wider text-sm">
            Tim Kami
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-slate-900">
            Mengenal Sosok di Balik Layar
          </h2>
          <div className="w-24 h-1 bg-blue-700 mt-4 rounded-full" />
        </div>

        <div className="flex flex-col gap-16">
          {/* Section Founder & Core Team (Atas) */}
          <div className="flex flex-wrap justify-center items-stretch gap-8">
            {members.slice(0, 2).map((m, index) => (
              <div
                key={m.name}
                onClick={() => setSelectedMember(m)}
                className={`bg-slate-50 p-10 rounded-[3rem] text-center hover:shadow-2xl transition duration-500 group border border-slate-100 cursor-pointer w-full max-w-md flex flex-col ${index === 1 ? 'hidden lg:block' : ''}`}
              >
                <div className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-8 border-white shadow-xl group-hover:border-amber-400 transition duration-500 flex-shrink-0">
                  <img
                    src={m.img}
                    alt={m.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col flex-grow justify-between items-center">
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold text-slate-900 mb-2">{m.name}</h3>
                    <p className="text-blue-700 font-bold text-base uppercase tracking-widest">
                      {m.role}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-6 py-2 bg-blue-700 text-white rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Lihat Profil Lengkap
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Section Anggota Lainnya (Slider) */}
          <div className="relative group/slider">
            {/* Tombol Navigasi Slider */}
            <button 
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-10 p-3 bg-white shadow-xl rounded-full text-blue-700 hover:bg-blue-700 hover:text-white transition-all border border-slate-100 lg:hidden"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div 
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto lg:overflow-x-hidden snap-x snap-mandatory scrollbar-hide pb-8 px-4 lg:justify-center"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {members.slice(1).map((m, index) => (
                <div
                  key={m.name}
                  onClick={() => setSelectedMember(m)}
                  className={`min-w-[280px] md:min-w-[320px] bg-slate-50 p-8 rounded-[2.5rem] text-center hover:shadow-xl transition duration-500 group border border-slate-100 cursor-pointer snap-start flex flex-col ${index === 0 ? 'lg:hidden' : ''}`}
                >
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:border-amber-400 transition duration-500 flex-shrink-0">
                    <img
                      src={m.img}
                      alt={m.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-grow justify-between">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{m.name}</h3>
                      <p className="text-blue-700 font-bold text-xs uppercase tracking-widest">
                        {m.role}
                      </p>
                    </div>
                    <p className="text-slate-500 leading-relaxed text-xs">Klik untuk detail →</p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-10 p-3 bg-white shadow-xl rounded-full text-blue-700 hover:bg-blue-700 hover:text-white transition-all border border-slate-100 lg:hidden"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Pop-up Besar */}
      {selectedMember && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md transition-all"
          onClick={() => setSelectedMember(null)}
        >
          <div 
            className="relative w-full max-w-7xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row h-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedMember(null)}
              className="absolute top-6 right-6 z-20 p-2 bg-slate-100 hover:bg-red-500 hover:text-white rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Sisi Kiri: Detail (2/3) */}
            <div className="lg:w-2/3 p-6 md:p-12 lg:p-20 overflow-y-auto">
              <div className="flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
                <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-3xl overflow-hidden shadow-2xl flex-shrink-0 border-8 border-slate-50">
                  <img
                    src={selectedMember.img}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-blue-700 font-bold text-sm uppercase tracking-[0.2em] mb-4 block">
                    {selectedMember.role}
                  </span>
                  <h3 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                    {selectedMember.name}
                  </h3>
                  <div className="w-16 h-1 bg-amber-400 mb-8 mx-auto md:mx-0 rounded-full" />

                  {selectedMember.mainRole && (
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-blue-700 uppercase mb-2">Peran Utama</h4>
                      <p className="text-slate-700 leading-relaxed text-sm md:text-base">{selectedMember.mainRole}</p>
                    </div>
                  )}

                  {selectedMember.shortDesc && (
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-blue-700 uppercase mb-2">Deskripsi Singkat</h4>
                      <p className="text-slate-700 leading-relaxed text-sm md:text-base">{selectedMember.shortDesc}</p>
                    </div>
                  )}

                  {selectedMember.experience && (
                    <div className="mb-8">
                      <h4 className="text-sm font-bold text-blue-700 uppercase mb-3">Pengalaman & Sertifikasi</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                        {selectedMember.experience.map((exp, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-slate-600 text-xs md:text-sm">
                            <span className="text-amber-500 font-bold">✓</span> <span>{exp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-slate-600 text-lg lg:text-xl leading-relaxed mb-10 italic">
                    &ldquo;{selectedMember.desc}&rdquo;
                  </p>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">
                    {selectedMember.socials?.instagram && (
                      <a href={selectedMember.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-amber-400 hover:text-white transition-all">
                        <Instagram className="w-6 h-6" />
                      </a>
                    )}
                    {selectedMember.socials?.facebook && (
                      <a href={selectedMember.socials.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all">
                        <Facebook className="w-6 h-6" />
                      </a>
                    )}
                    {selectedMember.socials?.tikTok && (
                      <a href={selectedMember.socials.tikTok} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .57.04.83.11V9.4a6.33 6.33 0 0 0-3.14-.14 6.34 6.34 0 0 0-5.3 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V7.04a8.1 8.1 0 0 0 5.04 1.75v-3.4a4.78 4.78 0 0 1-3.3-1.7z" />
                        </svg>
                      </a>
                    )}
                    {selectedMember.socials?.threads && (
                      <a href={selectedMember.socials.threads} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                        <svg 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="w-6 h-6"
                        >
                          <path d="M10 10a2 2 0 1 1 4 0v1.5a1.5 1.5 0 0 1-3 0V10a3 3 0 1 0 3 3" />
                          <path d="M17.67 17.67A9 9 0 1 1 12 3c5 0 9 4 9 9v1" />
                        </svg>
                      </a>
                    )}
                    {selectedMember.socials?.linkedin && (
                      <a href={selectedMember.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-all">
                        <Linkedin className="w-6 h-6" />
                      </a>
                    )}
                    {selectedMember.socials?.whatsapp && (
                      <a href={selectedMember.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793 0-.853.43-1.288.601-1.446.159-.15.348-.19.467-.19s.235.014.335.018c.109.005.253-.043.396.299.144.348.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.777 1.394.864.174.087.275.072.376-.043.101-.116.433-.506.549-.68.116-.174.231-.144.39-.087.158.058 1.011.477 1.184.564.173.087.289.129.332.202.043.073.043.464-.101.869zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.011 21.993c-1.803 0-3.518-.465-5.014-1.28l-3.391.891.905-3.307c-.912-1.605-1.392-3.422-1.392-5.291 0-5.51 4.481-9.991 9.991-9.991 5.509 0 9.991 4.481 9.991 9.991 0 5.51-4.482 9.991-9.991 9.991z" />
                        </svg>
                      </a>
                    )}
                    {selectedMember.socials?.youtube && (
                      <a href={selectedMember.socials.youtube} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">
                        <Youtube className="w-6 h-6" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sisi Kanan: Daftar Anggota Lain (1/3) */}
            <div className="lg:w-1/3 bg-slate-50 border-l border-slate-100 p-8 overflow-y-auto hidden lg:block">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                Navigasi Tim
              </h4>
              <div className="space-y-3">
                {members.map((m) => (
                  <button
                    key={m.name}
                    onClick={() => setSelectedMember(m)}
                    className={`w-full text-left p-4 rounded-2xl transition-all flex items-center gap-4 group ${
                      selectedMember.name === m.name 
                        ? 'bg-blue-700 text-white shadow-lg' 
                        : 'hover:bg-white hover:shadow-md text-slate-700'
                    }`}
                  >
                    <img 
                      src={m.img} 
                      alt={m.name} 
                      className="w-10 h-10 rounded-full object-cover border border-slate-200" 
                    />
                    <div className="flex-1">
                      <p className="font-bold text-sm leading-tight">{m.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
