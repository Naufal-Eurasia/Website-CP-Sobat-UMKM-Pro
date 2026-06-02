import { ArrowRight, Play } from 'lucide-react';
import heroImage from '../assets/p1.png';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#1a4b8c] text-white overflow-hidden"
    >
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-amber-400/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center relative z-10">
        <div className="lg:w-1/2 text-center lg:text-left">
          <span className="inline-block px-4 py-1.5 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-semibold mb-6">
            Partner Terpercaya UMKM Indonesia
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
            Profesional{' '}
            <span className="text-amber-400 italic">UMKM</span>
            <br />
            Naik Kelas!
          </h1>
          <p className="text-lg text-blue-100/80 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Bersama-sama Naik Kelas, Menuju UMKM Profesional Indonesia
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 active:bg-amber-600 active:scale-95 transition shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
            >
              Pelajari Layanan <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl font-bold hover:bg-white/20 active:bg-white/30 active:scale-95 transition flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" /> Kenali Kami
            </a>
          </div>
        </div>

        <div className="lg:w-1/2 mt-16 lg:mt-0 relative">
          <div className="absolute -inset-4 bg-blue-500/20 blur-2xl rounded-full" />
          <img
            src={heroImage}
            alt="Hero"
            className="relative rounded-3xl shadow-2xl border border-white/10 w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
