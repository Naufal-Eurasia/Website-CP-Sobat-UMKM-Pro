import { Eye, Target, Check, Rocket } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-blue-700 font-bold uppercase tracking-wider text-sm">
            Tentang Kami
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-slate-900">
            Lahirnya Sobat UMKM Pro
          </h2>
          <div className="w-24 h-1 bg-blue-700 mt-4 rounded-full" />
        </div>
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <p className="text-xl italic text-slate-600 mb-8 border-l-4 border-blue-700 pl-6 leading-relaxed">
              Menjadi &ldquo;Jembatan Solusi&rdquo; bagi UMKM Indonesia untuk
              menghadapi tantangan era digital dengan pendampingan yang intensif
              dan hasil nyata.
            </p>
            <div className="mt-12">
              <h4 className="text-3xl font-black text-black-600 mb-4 uppercase tracking-tighter">NILAI-NILAI PERUSAHAAN</h4>
              <h3 className="text-3xl font-black text-red-600 mb-4 uppercase tracking-tighter">PRO-1</h3>
              <p className="text-slate-700 font-semibold mb-4 leading-relaxed">
                Sobat UMKM Pro dibangun dengan semangat kolaborasi dan semangat gotong royong, melalui 4 pilar utama:
              </p>
              <div className="space-y-3">
                <p className="text-slate-600 leading-relaxed">
                  <span className="font-bold text-red-600">P - Profesional</span> — Bekerja dengan standar tinggi, rapi, terukur, dan selalu mengutamakan kualitas.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  <span className="font-bold text-red-600">R - Responsif</span> — Gerak cepat, tanggap, dan tidak menunda; memberikan pelayanan yang sigap dan efektif.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  <span className="font-bold text-red-600">O - Objektif</span> — Keputusan diambil jujur, adil, dan berdasarkan data. Menjaga integritas sebagai fondasi kepercayaan.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  <span className="font-bold text-red-600">1 – Satu Tujuan: Naik Kelas</span> — Seluruh tim bergerak dalam satu arah: membantu UMKM tumbuh, berkembang, dan naik kelas secara nyata.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#0a1628] p-10 rounded-3xl text-white flex flex-col justify-center gap-6 relative overflow-hidden shadow-xl">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <Rocket className="w-12 h-12 text-amber-400" />
            <div>
              <h4 className="text-2xl font-bold mb-3">Siap Naik Kelas?</h4>
              <p className="text-blue-100 leading-relaxed">
                Kami berperan sebagai jembatan penghubung antara pelaku UMKM, pemerintah, komunitas, dan ekosistem bisnis, dengan tujuan utama:
               <br /><br />
                Mendorong UMKM Indonesia untuk tumbuh lebih profesional, naik kelas, dan berdaya saing.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-blue-50 p-8 rounded-2xl shadow-sm border border-blue-100">
            <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" /> Visi
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Menjadi mitra strategis terpercaya dalam mempercepat transformasi UMKM Indonesia menuju usaha profesional dan naik kelas.
            </p>
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
                  <p className="text-slate-300">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
