import { useState, useEffect } from 'react';
import { BookOpen, Calendar, Clock, X, ChevronRight, Quote } from 'lucide-react';

export interface KulwaItem {
  id: number;
  title: string;
  date: string;
  content: string;
  poster?: string;
}

interface ArticlesProps {
  articles: KulwaItem[];
}

export default function Articles({ articles }: ArticlesProps) {
  const [selectedArticle, setSelectedArticle] = useState<KulwaItem | null>(null);

  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedArticle]);

  return (
    <section id="kulwa" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-blue-700 font-bold uppercase tracking-wider text-sm">
            Edukasi Bisnis
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-slate-900">
            KULWA (Kuliah WhatsApp)
          </h2>
          <div className="w-24 h-1 bg-blue-700 mt-4 rounded-full" />
          <p className="mt-6 text-slate-600 max-w-2xl mx-auto">
            Kumpulan materi edukasi bisnis praktis untuk membantu UMKM Indonesia naik kelas secara sistematis.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {!articles || articles.length === 0 ? (
            <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">Belum ada materi KULWA yang diposting.</p>
              <p className="text-slate-400 text-sm mt-1">Silakan tambahkan melalui Panel Admin.</p>
            </div>
          ) : (
            articles.map((article) => (
            <div 
              key={article.id}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 flex flex-col group cursor-pointer"
              onClick={() => setSelectedArticle(article)}
            >
              {article.poster ? (
                <div className="h-52 overflow-hidden bg-slate-200">
                  <img 
                    src={article.poster} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="h-52 bg-blue-700 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-white/20" />
                </div>
              )}
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {article.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 5 Menit Baca</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-700 transition">
                  {article.title}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-3 mb-6 leading-relaxed">
                  {article.content.substring(0, 150)}...
                </p>
                <div className="mt-auto flex items-center text-blue-700 font-bold text-sm">
                  Baca Selengkapnya <ChevronRight className="w-4 h-4 ml-1 group-hover:ml-2 transition-all" />
                </div>
              </div>
            </div>
          )))}
        </div>
      </div>

      {/* Modal Detail Artikel */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md transition-all"
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 z-20 p-2 bg-slate-100 hover:bg-red-500 hover:text-white rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="overflow-y-auto">
              {selectedArticle.poster && (
                <div className="w-full h-64 md:h-96 bg-slate-200">
                  <img 
                    src={selectedArticle.poster} 
                    alt={selectedArticle.title} 
                    className="w-full h-full object-contain bg-slate-100"
                  />
                </div>
              )}

              <div className="p-8 md:p-16">
                <div className="flex items-center gap-4 text-xs font-bold text-blue-600 uppercase tracking-widest mb-6">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {selectedArticle.date}</span>
                  <span className="px-3 py-1 bg-blue-50 rounded-full">KULWA Series</span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 leading-tight">
                  {selectedArticle.title}
                </h1>

                <div className="w-20 h-1.5 bg-amber-400 mb-10 rounded-full" />

                <div className="prose prose-blue max-w-none">
                  <div className="text-slate-700 leading-relaxed whitespace-pre-line text-lg">
                    {selectedArticle.content}
                  </div>
                </div>

                <div className="mt-16 p-8 bg-blue-50 rounded-[2rem] border border-blue-100 flex flex-col md:flex-row items-center gap-6">
                  <div className="w-16 h-16 bg-blue-700 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Quote className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-blue-900 font-bold text-lg mb-1">Punya Pertanyaan tentang Materi ini?</p>
                    <p className="text-blue-700/80">Konsultasikan langsung dengan Mentor Sobat UMKM Pro via WhatsApp.</p>
                  </div>
                  <a href="#contact" onClick={() => setSelectedArticle(null)} className="ml-auto px-6 py-3 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition shadow-lg whitespace-nowrap">Hubungi Mentor</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}