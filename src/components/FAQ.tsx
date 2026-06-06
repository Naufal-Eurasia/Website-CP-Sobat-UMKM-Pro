import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Apa itu Sobat UMKM Pro?',
    a: 'Sobat UMKM Pro adalah mitra pendamping UMKM yang membantu pelaku usaha membangun bisnis yang lebih terarah, lebih profesional, dan siap naik kelas melalui mentoring, consulting, training, digitalisasi, serta pengembangan sistem bisnis. Kami hadir untuk membantu UMKM bertumbuh dengan strategi yang tepat, sistem yang kuat, dan eksekusi yang terukur.',
  },
  {
    q: 'Siapa yang cocok bergabung dengan Sobat UMKM Pro?',
    a: `Program kami cocok untuk:
✓ UMKM yang ingin meningkatkan omzet dan profit
✓ Owner yang merasa bisnisnya berjalan tetapi sulit berkembang
✓ Usaha yang belum memiliki sistem kerja yang jelas
✓ Bisnis yang ingin membangun tim yang lebih produktif
✓ Pelaku usaha yang ingin scale up dan naik kelas
✓ Komunitas, lembaga, dan perusahaan yang ingin mengembangkan UMKM binaannya`,
  },
  {
    q: 'Apa yang membedakan Sobat UMKM Pro dengan pelatihan biasa?',
    a: `✓ Kami tidak hanya memberikan materi.
✓ Kami membantu mengidentifikasi kondisi bisnis dan menemukan akar masalah, menyusun strategi perbaikan, serta mendampingi proses implementasi agar perubahan benar-benar terjadi dalam bisnis.
✓ Fokus kami bukan sekadar menambah pengetahuan, tetapi menghasilkan pertumbuhan yang nyata.`,
  },
  {
    q: 'Bagaimana Sobat UMKM Pro membantu UMKM naik kelas?',
    a: `Sobat UMKM Pro menyediakan tiga layanan utama yang saling terintegrasi:

1. Training UMKM Pro
Program pelatihan yang berfokus pada peningkatan kompetensi owner dan tim agar mampu mengelola bisnis secara lebih profesional.
Program unggulan:
✓ Inkubasi Bisnis UMKM (IBU)
✓ Business Road Map (BRM)
✓ Akademi Manajer Profesional (AMP)
✓ Mastering Business Systems (MBS)

2. Mentoring UMKM Pro
Pendampingan bisnis secara individu maupun kelompok untuk membantu owner mengambil keputusan yang tepat dan mencapai target bisnis lebih cepat.
Program unggulan:
✓ 360° Business Review (360 BR)
✓ Grow Meeting (GM)
✓ Business Systems Excellence (BSE)
✓ Business Mentoring Group (BMG)

3. Consulting UMKM Pro
Layanan konsultasi untuk membantu UMKM membangun fondasi bisnis yang kuat dan siap berkembang.
Ruang lingkup:
✓ Legalitas dan Perizinan Usaha
✓ Branding dan Pengembangan Merek
✓ Penataan Organisasi dan Struktur Perusahaan
✓ Rekrutmen dan Pengembangan SDM
✓ Penyusunan KPI dan SOP
✓ Penguatan Budaya dan Nilai Perusahaan`,
  },
  {
    q: 'Bagaimana Sobat UMKM Pro menganalisis kondisi bisnis saya?',
    a: `Sebelum memberikan rekomendasi, kami melakukan pemetaan kondisi bisnis melalui beberapa tools dan metode pendampingan, seperti:
✓ BOS Check
✓ 360° Business Review
✓ BRM Checking
Tujuannya agar solusi yang diberikan sesuai dengan kondisi nyata dan kebutuhan bisnis Anda.`,
  },
  {
    q: 'Apakah usaha yang masih kecil bisa mengikuti program?',
    a: `Tentu.
Justru semakin awal bisnis dibangun dengan sistem yang benar, semakin besar peluang untuk tumbuh lebih cepat dan menghindari kesalahan yang sering terjadi pada UMKM.
`,
  },
  {
    q: 'Berapa biaya konsultasi dan pendampingan?',
    a: `Biaya disesuaikan dengan kebutuhan, ruang lingkup program, dan durasi pendampingan.
Setiap bisnis memiliki tantangan yang berbeda sehingga solusi yang diberikan juga perlu disesuaikan.
Silakan hubungi tim kami untuk mendapatkan informasi program yang paling sesuai dengan kebutuhan usaha Anda.
`,
  },
  {
    q: 'Apakah Sobat UMKM Pro melayani seluruh Indonesia?',
    a: `Ya.
Layanan kami dapat dilakukan secara online maupun offline sehingga dapat menjangkau UMKM dari berbagai daerah di Indonesia.
`,
  },
   {
    q: 'Apa manfaat yang akan saya dapatkan?',
    a: `Melalui program pendampingan, Anda akan memperoleh:
✓ Peta kondisi bisnis yang lebih jelas
✓ Strategi pertumbuhan yang terukur
✓ Sistem bisnis yang lebih rapi dan efektif
✓ Tim yang lebih produktif dan bertanggung jawab
✓ Peningkatan efektivitas pemasaran
✓ Pendampingan langsung dari mentor dan praktisi berpengalaman
✓ Akses ke jaringan dan ekosistem UMKM
✓ Arah pengembangan bisnis yang lebih jelas dan terukur
`,
  },
   {
    q: 'Apakah Sobat UMKM Pro menjamin bisnis saya pasti berhasil?',
    a: `Tidak ada pihak yang dapat menjamin keberhasilan bisnis secara instan.
Namun kami berkomitmen membantu Anda dengan strategi yang tepat, pengalaman praktis, serta pendampingan yang terarah agar peluang keberhasilan bisnis menjadi lebih besar.
Keberhasilan tetap ditentukan oleh kualitas eksekusi dan komitmen pemilik usaha.
`,
  },
  {
    q: ' Apakah Sobat UMKM Pro dapat membantu legalitas dan pengembangan usaha ?',
    a: `Ya.
Kami dapat membantu UMKM dalam penguatan legalitas usaha, penyusunan sistem bisnis, pengembangan SDM, branding, pemasaran, serta berbagai kebutuhan yang mendukung pertumbuhan usaha secara berkelanjutan.

`,
  },
  {
    q: ' Apakah Sobat UMKM Pro membuka kerja sama dengan pemerintah, kampus, dan komunitas?',
    a: `Ya.
Kami terbuka untuk kolaborasi dalam bidang:
✓ Pelatihan dan Pendampingan UMKM
✓ Inkubasi Bisnis
✓ Digitalisasi UMKM
✓ Pengembangan SDM
✓ Program Pemberdayaan Ekonomi Masyarakat
✓ Seminar, Workshop, dan Program Kemitraan
`,
  },
  {
    q: 'Bagaimana cara memulai pendampingan?',
    a: `Sangat mudah.
1. Hubungi Tim Sobat UMKM Pro.
2. Ceritakan kondisi usaha Anda.
3. Ikuti proses Business Check-Up.
4. Dapatkan hasil analisis dan rekomendasi strategi.
5. Pilih program yang sesuai.
6. Mulai proses pendampingan dan pengembangan bisnis.
`,
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 relative">
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-blue-700 font-bold uppercase tracking-wider text-sm">
            FAQ
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-slate-900">
            Pertanyaan yang Sering Diajukan
          </h2>
          <div className="w-24 h-1 bg-blue-700 mt-4 rounded-full" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-2xl border transition duration-300 ${
                open === i
                  ? 'bg-blue-50 border-blue-200 shadow-md'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-bold text-slate-900 pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-blue-700 flex-shrink-0 transition-transform duration-300 ${
                    open === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? 'max-h-[1000px] pb-6' : 'max-h-0'
                }`}
              >
                <p className="px-6 text-slate-600 leading-relaxed whitespace-pre-line">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Kotak Informasi Khusus (Di Luar Accordion) */}
        <div className="mt-16 bg-blue-700 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/20 transition-all duration-700" />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Masih Bingung Harus Mulai dari Mana?
            </h3>
            <div className="space-y-4 text-blue-50 text-lg leading-relaxed mb-10">
              <p className="flex gap-3">
                <span className="text-amber-400 font-bold">✓</span>
                <span>Tidak perlu menunggu bisnis besar untuk mulai berbenah.</span>
              </p>
              <p className="flex gap-3">
                <span className="text-amber-400 font-bold">✓</span>
                <span>Banyak UMKM terhambat bukan karena kurang produk, tetapi karena belum memiliki arah yang jelas dan sistem yang kuat.</span>
              </p>
            </div>

            <div className="space-y-6 text-blue-50 text-lg leading-relaxed mb-10">
              <p>
                Sobat UMKM Pro hadir sebagai mitra strategis bagi UMKM Indonesia untuk tumbuh lebih profesional, lebih terukur, dan lebih siap naik kelas.
              </p>
              <div className="border-l-4 border-amber-400 pl-6 py-1 italic bg-white/10 rounded-r-2xl">
                <p className="mb-2">Karena bisnis yang besar tidak dibangun sendirian.</p>
                <p>Bisnis yang besar dibangun dengan strategi yang tepat, sistem yang kuat, dan eksekusi yang konsisten.</p>
              </div>
              <p className="font-bold text-white">
                👉 Hubungi Tim Sobat UMKM Pro sekarang dan mulai perjalanan bisnis Anda menuju level berikutnya.
              </p>
            </div>

            <a 
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-block bg-white hover:bg-blue-50 text-blue-700 font-black px-10 py-4 rounded-2xl transition-all shadow-xl hover:scale-105 active:scale-95"
            >
              Konsultasi Sekarang
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
