import { useState, useEffect } from 'react';
import { X, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import teamTogether from '../assets/bersama.jpg';
import ar1Image from '../assets/AR1.jpeg';
import ar2Image from '../assets/AR2.png';
import dtImage from '../assets/dt.jpeg';
import ar5Image from '../assets/AR5.png';
import ar6Image from '../assets/ar6.jpg';
import hrImage from '../assets/hr.png';

interface Member {
  name: string;
  role: string;
  desc: string;
  img: string;
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
    role: 'Founder & Mentor UMKM',
    desc: 'Ahli strategi bisnis dengan pengalaman 10 tahun membantu transformasi digital UMKM.',
    img: ar1Image,
    socials: { instagram: 'https://instagram.com/arfinmardiyanto', facebook: 'https://facebook.com/arfinmardiyanto', threads: 'https://www.threads.net/@arfinmardiyanto', linkedin: 'https://www.linkedin.com/in/arfin-mardiyanto-13a713134/', tikTok: 'https://www.tiktok.com/@arfinmardiyanto', youtube: 'https://www.youtube.com/@arfinmardiyanto',whatsapp: 'https://wa.me/6281358894404' },
  },
  {
    name: 'Tri Agustina, S.H',
    role: 'Digital Marketing Specialist',
    desc: 'Ahli strategi bisnis dengan pengalaman 10 tahun membantu transformasi digital UMKM.',
    img: ar6Image
  },
  {
    name: 'Naufal Eurasia N',
    role: 'IT Development',
    desc: 'Spesialis HR yang fokus pada pengembangan SDM untuk mendukung pertumbuhan bisnis UMKM secara berkelanjutan, digitalisasi juga naik level.',
    img: ar2Image,
  },
  {
    name: 'Habibah Rahma H',
    role: 'IT Operational',
    desc: 'Mengembangkan sistem IT yang handal namun tetap mudah dioperasikan oleh pemula sekalipun.',
    img: hrImage,
  },
  {
    name: 'Radita Nurdianti, S.Psi',
    role: 'HR - Generalist',
    desc: 'Tata kelola administrasi karyawan, rekrutmen, hubungan kerja, dan pengembangan budaya perusahaan.',
    img: dtImage,
  },
  {
    name: 'Nur Hidayati, S.Si',
    role: 'HR - Talent Acquisition',
    desc: 'Membuat strategi rekrutmen yang efektif dan membangun talent pool kandidat potensial.',
    img: ar5Image,
  },
];

export default function Team() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

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

        <div className="mb-20">
          <div className="relative group overflow-hidden rounded-3xl shadow-xl h-[500px]">
            <img
              src={teamTogether}
              alt="Tim Bersama"
              className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/20 to-transparent flex items-end p-12">
              <p className="text-white text-2xl italic max-w-3xl leading-relaxed">
                &ldquo;Kami percaya bahwa teknologi harus bisa dinikmati oleh siapa
                saja, termasuk pelaku UMKM. Dengan semangat kolaborasi, kami hadir
                untuk mendampingi langkah sukses Anda.&rdquo;
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {/* Row Atas: Founder & Digital Marketing (2 Orang) */}
          <div className="flex flex-wrap justify-center gap-8">
            {members.slice(0, 2).map((m) => (
              <div
                key={m.name}
                onClick={() => setSelectedMember(m)}
                className="bg-slate-50 p-8 rounded-[2.5rem] text-center hover:shadow-xl transition duration-500 group border border-slate-100 cursor-pointer w-full md:w-[calc(50%-1rem)] lg:w-80"
              >
                <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:border-amber-400 transition duration-500">
                  <img
                    src={m.img}
                    alt={m.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{m.name}</h3>
                <p className="text-blue-700 font-bold text-sm uppercase tracking-widest mb-3">
                  {m.role}
                </p>
                <p className="text-slate-500 leading-relaxed text-sm">Klik untuk detail →</p>
              </div>
            ))}
          </div>

          {/* Row Bawah: Tim Pendukung Lainnya */}
          <div className="flex flex-wrap justify-center gap-8">
            {members.slice(2).map((m) => (
              <div
                key={m.name}
                onClick={() => setSelectedMember(m)}
                className="bg-slate-50 p-8 rounded-[2rem] text-center hover:shadow-xl transition duration-500 group border border-slate-100 cursor-pointer w-full md:w-[calc(50%-1rem)] lg:w-72"
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:border-amber-400 transition duration-500">
                  <img
                    src={m.img}
                    alt={m.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{m.name}</h3>
                <p className="text-blue-700 font-bold text-xs uppercase tracking-widest mb-3">
                  {m.role}
                </p>
                <p className="text-slate-500 leading-relaxed text-sm">Klik untuk detail →</p>
              </div>
            ))}
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
            <div className="lg:w-2/3 p-8 lg:p-20 overflow-y-auto">
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
                  <p className="text-slate-600 text-lg lg:text-xl leading-relaxed mb-10 italic">
                    &ldquo;{selectedMember.desc}&rdquo;
                  </p>
                  
                  <div className="flex justify-center md:justify-start gap-4">
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
