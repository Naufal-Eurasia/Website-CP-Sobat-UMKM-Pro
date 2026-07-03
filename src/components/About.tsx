import { Eye, Target, Check } from 'lucide-react';
import heroImage1 from '../assets/CC12.png';
import heroImage2 from '../assets/CC13.png';

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER SECTION */}
        <div className="text-center mb-12 flex flex-col items-center">
          <span className="text-blue-700 font-bold uppercase tracking-wider text-sm">
            Tentang Kami
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-slate-900">
            Lahirnya Sobat UMKM Pro
          </h2>
          <div className="w-24 h-1 bg-blue-700 mt-4 rounded-full" />
        </div>

        {/* 1. LATAR BELAKANG (INFOGRAFIS DATA UMKM) */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
              Latar Belakang
            </h3>
            <h4 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">
              Gambaran Kondisi UMKM Indonesia Saat Ini
            </h4>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              UMKM merupakan tulang punggung perekonomian Indonesia. Data Kementerian Koperasi & UKM menunjukkan bahwa:
            </p>
          </div>

          {/* Grid Statistik */}
          <div className="grid md:grid-cols-3 gap-6 bg-[#0f2a4a] text-white p-8 md:p-12 rounded-3xl shadow-lg">
            {/* Stat 1 */}
            <div className="text-center flex flex-col items-center p-4 border-b md:border-b-0 md:border-r border-white/10 last:border-0">
              <span className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
                65,5 juta
              </span>
              <p className="text-slate-300 text-sm leading-relaxed max-w-xs">
                Jumlah pelaku UMKM mencapai <span className="font-semibold text-white">65,5 juta unit usaha</span>, atau sekitar <span className="font-semibold text-white">99,9%</span> dari total unit usaha nasional.
              </p>
            </div>

            {/* Stat 2 */}
            <div className="text-center flex flex-col items-center p-4 border-b md:border-b-0 md:border-r border-white/10 last:border-0">
              <span className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
                60,5%
              </span>
              <p className="text-slate-300 text-sm leading-relaxed max-w-xs">
                UMKM berkontribusi sekitar <span className="font-semibold text-white">60,5%</span> terhadap PDB nasional.
              </p>
            </div>

            {/* Stat 3 */}
            <div className="text-center flex flex-col items-center p-4 last:border-0">
              <span className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
                97%
              </span>
              <p className="text-slate-300 text-sm leading-relaxed max-w-xs">
                UMKM menyerap lebih dari <span className="font-semibold text-white">97% tenaga kerja</span> di Indonesia dan berperan besar mendorong pertumbuhan ekonomi lokal serta pemerataan kesejahteraan masyarakat.
              </p>
            </div>
          </div>
        </div>

        {/* 2. MASALAH YANG SERING DIHADAPI */}
        <div className="mb-24 bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Sisi Kiri: List Masalah */}
            <div className="lg:col-span-7 space-y-6">
              {/* Masalah 1 */}
              <div className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center flex-shrink-0 text-lg">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base md:text-lg mb-1">
                    Kurangnya Akses Informasi & Pendampingan
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Akibatnya, banyak pelaku usaha berjalan sendiri-sendiri tanpa arah yang jelas, dan sering kali mengulangi kesalahan yang sama.
                  </p>
                </div>
              </div>

              {/* Masalah 2 */}
              <div className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center flex-shrink-0 text-lg">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base md:text-lg mb-1">
                    Kelemahan dalam Manajemen dan Branding
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Padahal, di era digital saat ini, branding dan manajemen bisnis yang baik menjadi faktor pembeda utama antara usaha yang stagnan dan usaha yang berkembang pesat.
                  </p>
                </div>
              </div>

              {/* Masalah 3 */}
              <div className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center flex-shrink-0 text-lg">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base md:text-lg mb-1">
                    Sulit Naik Kelas ke Level Lebih Profesional
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Alhasil, meskipun jumlah UMKM besar, persentase UMKM yang berhasil naik kelas menjadi usaha menengah atau besar masih sangat kecil.
                  </p>
                </div>
              </div>
            </div>

            {/* Sisi Kanan: Judul Section Masalah */}
            <div className="lg:col-span-5 lg:pl-8 text-center lg:text-left order-first lg:order-last">
              <h3 className="text-xs font-bold text-red-600 uppercase tracking-widest mb-2">
                Tantangan Riil
              </h3>
              <h2 className="text-2xl md:text-3xl font-black text-[#0f2a4a] uppercase tracking-tight leading-tight">
                Masalah Yang <br className="hidden lg:block" />Sering Dihadapi
              </h2>
              <div className="w-16 h-1 bg-red-500 mt-4 rounded-full mx-auto lg:mx-0" />
            </div>
          </div>
        </div>

        {/* 3. SEKSI JEMBATAN SOLUSI (ESENSI PLATFORM) */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-28">
          {/* Sisi Kiri: Deskripsi & Kutipan */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wider mb-1">
                Solusi Kami
              </h3>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                LAHIRNYA <span className="text-blue-700">Sobat UMKM Pro</span>
              </h2>
              <p className="text-base italic font-medium text-slate-500 mt-2">
                Menjadi &ldquo;Jembatan Solusi&rdquo; bagi UMKM Indonesia
              </p>
            </div>

            <p className="text-slate-600 leading-relaxed text-base md:text-lg">
              Kami berperan sebagai jembatan penghubung antara pelaku UMKM, pemerintah, komunitas, dan ekosistem bisnis, dengan tujuan utama:
            </p>

            <blockquote className="bg-blue-50/70 border-l-4 border-blue-700 p-5 rounded-r-2xl">
              <p className="text-slate-800 font-bold text-base md:text-lg leading-relaxed">
                &ldquo;Mendorong UMKM Indonesia untuk tumbuh lebih profesional, naik kelas, dan berdaya saing.&rdquo;
              </p>
            </blockquote>

            <div className="pt-4 border-t border-slate-100">
              <p className="text-blue-800 font-extrabold italic text-sm md:text-base tracking-wide flex items-center gap-2">
                <span className="w-8 h-[2px] bg-blue-700 inline-block" />
                &ldquo;Bersama-sama Naik Kelas, Menuju UMKM Profesional Indonesia.&rdquo;
              </p>
            </div>
          </div>

          {/* Sisi Kanan: Visual Badge Bulat Kombinasi Akurat */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center min-h-[440px] md:min-h-[480px]">
            <div className="relative w-[340px] h-[380px] md:w-[400px] md:h-[440px]">
              
              {/* Gambar 1: Ruang Kerja (heroImage1) */}
              <div className="absolute top-0 left-0 w-64 h-64 md:w-72 md:h-72 rounded-full border-[6px] border-[#0f2a4a] overflow-hidden shadow-xl bg-white z-10">
                <img 
                  src={heroImage1} 
                  alt="Ruang Kerja Profesional Sobat UMKM Pro" 
                  className="w-full h-full object-cover"
                />
                {/* Aksen Ekor Pemotong Biru Tua */}
                <div className="absolute bottom-0 right-0 w-10 h-10 bg-[#0f2a4a] rotate-45 translate-x-5 translate-y-5 pointer-events-none hidden md:block"></div>
              </div>

              {/* Gambar 2: Perencanaan/Catatan (heroImage2) */}
              <div className="absolute bottom-0 right-0 w-56 h-56 md:w-64 md:h-64 rounded-full border-[6px] border-black overflow-hidden shadow-2xl bg-white z-20">
                <img 
                  src={heroImage2} 
                  alt="Perencanaan Bisnis UMKM" 
                  className="w-full h-full object-cover"
                />
                {/* Aksen Sudut Siku-Siku Hitam Pembatas */}
                <div className="absolute top-0 left-0 w-10 h-10 bg-black -rotate-45 -translate-x-5 -translate-y-5 pointer-events-none hidden md:block"></div>
              </div>

            </div>
          </div>
        </div>

        {/* 4. VISI & MISI */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="bg-blue-50 p-8 rounded-2xl shadow-sm border border-blue-100 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5" /> Visi
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Menjadi mitra strategis terpercaya dalam mempercepat transformasi UMKM Indonesia menuju usaha profesional and naik kelas.
              </p>
            </div>
          </div>

          <div className="md:col-span-2 bg-slate-900 p-8 rounded-2xl text-white shadow-xl">
            <h3 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-2">
              <Target className="w-5 h-5" /> Misi Kami
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                'Menghadirkan program pelatihan dan pendampingan berbasis praktik lapangan yang bisa langsung diterapkan pemilik usaha.',
                'Membangun jejaring kolaborasi antara UMKM, komunitas, dan stakeholder pemerintah/swasta.',
                'Mendorong peningkatan literasi bisnis, manajemen, dan adopsi teknologi untuk mempercepat transformasi UMKM.',
                'Menciptakan program inkubasi dan akselerasi bisnis UMKM.',
              ].map((text) => (
                <div key={text} className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="text-slate-300 text-sm md:text-base">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. NILAI-NILAI PERUSAHAAN (PRO-1) */}
        <div>
          <div className="max-w-3xl">
            <h4 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tighter">NILAI-NILAI PERUSAHAAN</h4>
            <h3 className="text-4xl font-black text-red-600 mb-6 uppercase tracking-tighter">PRO-1</h3>
            <p className="text-slate-700 font-semibold mb-6 text-lg leading-relaxed">
              Sobat UMKM Pro dibangun dengan semangat kolaborasi dan semangat gotong royong, melalui 4 pilar utama:
            </p>
            <div className="space-y-4 max-w-4xl">
              <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                <span className="font-bold text-red-600 bg-red-50 px-2 py-1 rounded mr-2">P</span> 
                <span className="font-bold text-slate-900">Profesional</span> — Bekerja dengan standar tinggi, rapi, terukur, dan selalu mengutamakan kualitas.
              </p>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                <span className="font-bold text-red-600 bg-red-50 px-2 py-1 rounded mr-2">R</span> 
                <span className="font-bold text-slate-900">Responsif</span> — Gerak cepat, tanggap, dan tidak menunda; memberikan pelayanan yang sigap dan efektif.
              </p>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                <span className="font-bold text-red-600 bg-red-50 px-2 py-1 rounded mr-2">O</span> 
                <span className="font-bold text-slate-900">Objektif</span> — Keputusan diambil jujur, adil, dan berdasarkan data. Menjaga integritas sebagai fondasi kepercayaan.
              </p>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                <span className="font-bold text-red-600 bg-red-50 px-2 py-1 rounded mr-2">1</span> 
                <span className="font-bold text-slate-900">Satu Tujuan: Naik Kelas</span> — Seluruh tim bergerak dalam satu arah: membantu UMKM tumbuh, berkembang, dan naik kelas secara nyata.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}