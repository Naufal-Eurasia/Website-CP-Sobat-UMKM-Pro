import { Star, Quote } from 'lucide-react';
import sr12Image from '../assets/unnamed.png';
import hrdImage from '../assets/hrd.png';
import davidImage from '../assets/david.png';

const testimonials = [
  {
    name: 'Indra Irawan',
    role: 'Local Guide & dan Mahasiswa Bisnis',
    text: 'Untuk anda yang ingin meningkatkan bisnis dan naik level sangat disarankan',
    rating: 5,
    img: sr12Image,
  },
  {
    name: 'Atikah',
    role: 'HRD Operation - Sugeh Bareng',
    text: 'Pendampingan dari tim Sobat UMKM sangat intensif dan hasilnya nyata. Branding kami sekarang lebih profesional.',
    rating: 5,
    img: hrdImage,
  },
  {
    name: 'David Hendrawan',
    role: 'Local Guide & Reviewer Perusahaan',
    text: 'Mentor pak arvin sangat membantu saya memahami bisnis untuk mengembangkan UMKM supaya naik kelas!',
    rating: 5,
    img: davidImage,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-blue-700 font-bold uppercase tracking-wider text-sm">
            Testimoni
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-slate-900">
            Kata Mereka tentang Kami
          </h2>
          <div className="w-24 h-1 bg-blue-700 mt-4 rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition duration-500 border border-slate-100 relative"
            >
              <Quote className="w-10 h-10 text-amber-400/30 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                />
                <div>
                  <h4 className="font-bold text-slate-900">{t.name}</h4>
                  <p className="text-sm text-blue-700">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
