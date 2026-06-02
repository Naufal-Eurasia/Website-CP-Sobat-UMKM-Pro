import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Apa itu Sobat UMKM Pro?',
    a: 'Sobat UMKM Pro adalah konsultan bisnis dan teknologi yang secara khusus mendampingi pelaku UMKM Indonesia untuk naik kelas melalui transformasi digital, strategi pemasaran, dan pengembangan sistem IT.',
  },
  {
    q: 'Berapa biaya konsultasi awal?',
    a: 'Konsultasi awal kami GRATIS! Kami percaya setiap UMKM berhak mendapatkan arahan yang tepat sebelum memutuskan langkah selanjutnya. Silakan hubungi kami untuk menjadwalkan sesi konsultasi.',
  },
  {
    q: 'Berapa lama proses pendampingan?',
    a: 'Durasi pendampingan bervariasi sesuai kebutuhan, mulai dari 1 bulan untuk program intensif hingga 6 bulan untuk pendampingan menyeluruh. Kami akan menyesuaikan dengan kondisi dan target bisnis Anda.',
  },
  {
    q: 'Apakah Sobat UMKM melayani seluruh Indonesia?',
    a: 'Ya! Kami melayani seluruh wilayah Indonesia. Pendampingan dilakukan secara hybrid — kombinasi online dan tatap muka — sehingga lokasi bukan lagi penghalang.',
  },
  {
    q: 'Apa saja yang dibutuhkan untuk memulai?',
    a: 'Cukup niat dan keterbukaan untuk belajar! Kami akan membantu mengidentifikasi kebutuhan bisnis Anda dan menyusun rencana aksi yang realistis pada sesi konsultasi pertama.',
  },
  {
    q: 'Apakah ada garansi hasil?',
    a: 'Kami memberikan komitmen penuh dalam pendampingan. Meskipun hasil akhir bergantung pada banyak faktor, klien kami rata-rata mengalami peningkatan signifikan dalam 3 bulan pertama kerja sama.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4">
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
                  : 'bg-white border-slate-100 hover:border-slate-200'
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
                  open === i ? 'max-h-96 pb-6' : 'max-h-0'
                }`}
              >
                <p className="px-6 text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
