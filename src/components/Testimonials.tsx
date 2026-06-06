import { useState, useRef, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Camera, X, Maximize2, ZoomIn, ZoomOut } from 'lucide-react';
import sr12Image from '../assets/unnamed.png';
import hrdImage from '../assets/hrd.png';
import davidImage from '../assets/david.png';
import kk1Image from '../assets/KK1.png';
import kk2Image from '../assets/KK2.png';
import kk3Image from '../assets/KK3.png';
import kk4Image from '../assets/KK4.png';

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

const galleryPhotos = [
  { url: kk1Image},
  { url: kk2Image},
  { url: kk3Image},
  { url: kk4Image},
];

export default function Testimonials() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [scale, setScale] = useState(1);

  // Menangani scroll lock saat gambar di-zoom
  useEffect(() => {
    if (zoomImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setZoomImage(null);
        setScale(1);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [zoomImage]);

  const handleCloseZoom = () => {
    setZoomImage(null);
    setScale(1);
  };

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => (prev === 1 ? 1.5 : 1));
  };

  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const { scrollLeft, clientWidth } = galleryRef.current;
      const scrollAmount = clientWidth * 0.8; // Geser 80% dari lebar layar
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      galleryRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="testimonials" className="relative py-24 bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#1a4b8c] text-white overflow-hidden">
      {/* Dekorasi Blobs agar serasi dengan Hero & Programs */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-amber-400/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-blue-300 font-bold uppercase tracking-wider text-sm">
            Testimoni
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-white">
            Kata Mereka tentang Kami
          </h2>
          <div className="w-24 h-1 bg-blue-500 mt-4 rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white/5 backdrop-blur-md p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:bg-white/10 transition duration-500 border border-white/10 relative group"
            >
              <Quote className="w-10 h-10 text-amber-400/10 absolute top-6 right-6 group-hover:text-amber-400/20 transition-colors" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
              <p className="text-blue-100/90 leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-400/30"
                />
                <div>
                  <h4 className="font-bold text-white">{t.name}</h4>
                  <p className="text-sm text-blue-300">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bagian Galeri Kegiatan Baru */}
        <div className="mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2 text-blue-300 font-bold uppercase tracking-wider text-sm mb-2">
                <Camera className="w-4 h-4" /> Dokumentasi
              </div>
              <h2 className="text-3xl font-bold text-white">Kegiatan Kita</h2>
              <p className="text-blue-100/60 mt-2">Melihat lebih dekat pendampingan dan workshop Sobat UMKM Pro.</p>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => scrollGallery('left')}
                className="p-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-blue-600 transition-all shadow-sm backdrop-blur-md"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => scrollGallery('right')}
                className="p-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-blue-600 transition-all shadow-sm backdrop-blur-md"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div 
            ref={galleryRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {galleryPhotos.map((photo, index) => (
              <div 
                key={index} 
                onClick={() => setZoomImage(photo.url)}
                className="min-w-[320px] md:min-w-[650px] h-[400px] md:h-[520px] relative rounded-[3rem] overflow-hidden group snap-start shadow-xl border border-white/5 transition-all duration-500 cursor-zoom-in"
              >
                <img 
                  src={photo.url} 
                  className="w-full h-full object-contain bg-white/5 transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 p-4 rounded-full shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 className="w-6 h-6 text-blue-700" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Zoom Gambar dengan Fitur Zoom & Minimize Scale */}
      {zoomImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/95 backdrop-blur-md p-4 md:p-12 transition-all duration-500 animate-fade-in"
          onClick={handleCloseZoom}
        >
          {/* Tombol Kontrol */}
          <div className="absolute top-6 right-6 flex items-center gap-3 z-[110]">
            <button 
              onClick={toggleZoom}
              className="p-3 bg-white/10 hover:bg-blue-600 text-white rounded-xl transition-all duration-300 flex items-center gap-2"
              title={scale === 1 ? "Zoom In" : "Minimize"}
            >
              {scale === 1 ? <ZoomIn className="w-6 h-6" /> : <ZoomOut className="w-6 h-6" />}
              <span className="hidden md:inline font-bold">{scale === 1 ? 'Zoom In' : 'Minimize'}</span>
            </button>
            <button 
              className="p-3 bg-white/10 hover:bg-red-500 text-white rounded-xl transition-all duration-300"
              onClick={handleCloseZoom}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="relative w-full h-full flex items-center justify-center overflow-auto scrollbar-hide">
            <div 
              className="transition-transform duration-500 ease-out cursor-zoom-out"
              style={{ transform: `scale(${scale})` }}
              onClick={toggleZoom}
            >
              <img 
                src={zoomImage} 
                alt="Zoomed view" 
                className="max-w-[90vw] max-h-[85vh] md:max-w-7xl md:max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
