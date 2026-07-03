import React, { useState, useEffect, useRef } from 'react';
import { PlusCircle, Image as ImageIcon, Link as LinkIcon, Calendar as CalendarIcon, Save, Trash2, ChevronLeft, ChevronRight, LogOut, AlertTriangle, X, CheckCircle, Info, Edit2, BookOpen, Type } from 'lucide-react';
import { ProgramItem } from '../App';
import { KulwaItem } from './Articles';

interface AdminProps {
  onLogout: () => void;
  events: ProgramItem[];
  setEvents: React.Dispatch<React.SetStateAction<ProgramItem[]>>;
  articles: KulwaItem[];
  setArticles: React.Dispatch<React.SetStateAction<KulwaItem[]>>;
}

export default function Admin({ onLogout, events, setEvents, articles, setArticles }: AdminProps) {
  const [activeTab, setActiveTab] = useState<'form' | 'calendar' | 'kulwa'>('form');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [deleteType, setDeleteType] = useState<'event' | 'kulwa'>('event');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const [editingArticleId, setEditingArticleId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [viewDate, setViewDate] = useState(new Date());
  
  const [eventData, setEventData] = useState({
    title: '',
    link: '',
    date: '',
    type: 'Workshop',
    poster: null as File | null
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [eventPosterCleared, setEventPosterCleared] = useState(false);

  // State untuk form Kulwa
  const [kulwaData, setKulwaData] = useState({
    title: '',
    date: '',
    content: '',
    poster: null as File | null
  });
  const [kulwaPreviewUrl, setKulwaPreviewUrl] = useState<string | null>(null);
  const [kulwaPosterCleared, setKulwaPosterCleared] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  // Fungsi Kompresi Gambar: Support PNG dan JPG dengan kompresi optimal
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1600; // Disesuaikan untuk portrait 3:4
          let width = img.width;
          let height = img.height;

          // Mempertahankan aspek rasio
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Semua format: gunakan JPEG dengan quality 0.85 untuk ukuran optimal
          // PNG lossless data URL terlalu besar (2-5MB), tidak cocok untuk storage
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEventData({ ...eventData, poster: file });
      if (previewUrl && !events.some(ev => ev.poster === previewUrl)) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let posterUrl: string | undefined = editingEventId 
      ? events.find(ev => ev.id === editingEventId)?.poster 
      : undefined;
    
    // Jika poster dihapus user, set ke undefined
    if (eventPosterCleared) {
      posterUrl = undefined;
    } else if (eventData.poster) {
      try {
        posterUrl = await compressImage(eventData.poster as File);
      } catch (error) {
        console.error("Gagal memproses gambar event:", error);
        setNotification({ message: 'Gagal memproses gambar poster.', type: 'error' });
        return;
      }
    }

    const payload = {
      id: editingEventId,
      title: eventData.title,
      date: eventData.date,
      link: eventData.link,
      type: eventData.type,
      poster: posterUrl
    };

    try {
      const response = await fetch('https://sobatumkmpro.com/api.php?action=save_program', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      
      if (result.success) {
        if (editingEventId) {
          setEvents(events.map(ev => ev.id === editingEventId ? { ...payload, id: editingEventId } : ev));
        } else {
          setEvents([{ ...payload, id: result.id }, ...events]);
        }
        setNotification({ message: 'Data berhasil disimpan!', type: 'success' });
        setEditingEventId(null);

        setEventData({ title: '', link: '', date: '', type: 'Workshop', poster: null });
        setPreviewUrl(null);
        setEventPosterCleared(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        setNotification({ message: `Gagal: ${result.message}`, type: 'error' });
      }
    } catch (err: any) {
      setNotification({ message: 'Gagal koneksi ke API server.', type: 'error' });
    }
  };

  const handleKulwaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!kulwaData.title || !kulwaData.content) {
        setNotification({ message: 'Judul dan isi materi wajib diisi!', type: 'error' });
        return;
      }

      const safeArticles = articles || [];
      
      if (!setArticles || typeof setArticles !== 'function') {
        console.error("Missing setArticles prop in Admin component");
        setNotification({ message: 'Gagal menyimpan: Sistem sinkronisasi data tidak terdeteksi.', type: 'error' });
        return;
      }

      let posterUrl: string | undefined = editingArticleId 
        ? safeArticles.find(a => a.id === editingArticleId)?.poster 
        : undefined;
      
      // Jika poster dihapus user, set ke undefined
      if (kulwaPosterCleared) {
        posterUrl = undefined;
      } else if (kulwaData.poster) {
        posterUrl = await compressImage(kulwaData.poster as File);
      }

      const payload = {
        id: editingArticleId,
        title: kulwaData.title,
        date: kulwaData.date,
        content: kulwaData.content,
        poster: posterUrl
      };

      const response = await fetch('https://sobatumkmpro.com/api.php?action=save_article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      
      if (result.success) {
        if (editingArticleId) {
          setArticles(safeArticles.map(a => a.id === editingArticleId ? { ...payload, id: editingArticleId } : a));
        } else {
          setArticles([{ ...payload, id: result.id }, ...safeArticles]);
        }
        setNotification({ message: 'KULWA berhasil disimpan!', type: 'success' });
        setEditingArticleId(null);
      }
      else if (result.message) {
        setNotification({ message: `Gagal menyimpan KULWA: ${result.message}`, type: 'error' });
      } else {
        setNotification({ message: 'Gagal menyimpan KULWA karena respons tidak terduga.', type: 'error' });
      }
      setKulwaData({ title: '', date: '', content: '', poster: null });
      setKulwaPreviewUrl(null);
      setKulwaPosterCleared(false);
      
      const fileInput = document.getElementById('kulwa-poster') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (err) {
      console.error("Detail Error:", err);
      let errorMessage = 'Gagal memproses artikel.';
      
      if (err instanceof Error && err.message.includes('quota')) {
        errorMessage = 'Penyimpanan penuh! Coba gunakan gambar yang lebih kecil.';
      } else if (err instanceof Error) {
        errorMessage = `Error: ${err.message}`;
      }

      setNotification({ message: errorMessage, type: 'error' });
    }
  };

  const startEdit = (ev: ProgramItem) => {
    setEditingEventId(ev.id);
    setEventData({ title: ev.title, link: ev.link || '', date: ev.date, type: ev.type, poster: null });
    setPreviewUrl(ev.poster || null);
    setEventPosterCleared(false);
    setActiveTab('form');
  };

  const startEditKulwa = (article: KulwaItem) => {
    setEditingArticleId(article.id);
    setKulwaData({ title: article.title, date: article.date, content: article.content, poster: null });
    setKulwaPreviewUrl(article.poster || null);
    setKulwaPosterCleared(false);
    setActiveTab('kulwa');
  };

  const confirmDelete = (id: number, type: 'event' | 'kulwa') => {
    setDeleteType(type);
    setShowDeleteConfirm(id);
  };

  const executeDelete = async () => {
    if (showDeleteConfirm !== null) {
      const action = deleteType === 'event' ? 'delete_program' : 'delete_article';
      try {
        const response = await fetch(`https://sobatumkmpro.com/api.php?action=${action}&id=${showDeleteConfirm}`, {
          method: 'DELETE'
        });
        const result = await response.json();
        if (result.success) {
          if (deleteType === 'event') setEvents(events.filter(ev => ev.id !== showDeleteConfirm));
          else setArticles(articles.filter(a => a.id !== showDeleteConfirm));
          setNotification({ message: 'Data berhasil dihapus!', type: 'success' });
        } else if (result.message) {
          setNotification({ message: `Gagal menghapus data: ${result.message}`, type: 'error' });
        } else {
          setNotification({ message: 'Gagal menghapus data karena respons tidak terduga.', type: 'error' });
        }
      } catch (err: any) {
        setNotification({ message: 'Gagal menghapus data di server.', type: 'error' });
      }
      setShowDeleteConfirm(null);
    }
  };

  // --- Logika Kalender Dinamis ---
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const startDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();
  
  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const getEventsForDay = (day: number) => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const monthNameInIndonesian = monthNames[month].toLowerCase();
    
    return events.filter(ev => {
      if (!ev.date) return false;

      const dateLower = ev.date.toLowerCase();
      
      const evDate = new Date(ev.date);
      if (!isNaN(evDate.getTime())) {
        return evDate.getFullYear() === year && evDate.getMonth() === month && evDate.getDate() === day;
      }

      if (dateLower.includes(monthNameInIndonesian) && dateLower.includes(year.toString())) {
        const dayRegex = new RegExp(`\\b${day}\\b`);
        return dayRegex.test(dateLower);
      }

      return false;
    });
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <>
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Admin */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Panel Admin Sobat UMKM Pro</h1>
            <p className="text-slate-500">Kelola program, poster, dan jadwal kegiatan mendatang.</p>
          </div>
          <button 
            onClick={onLogout}
            className="px-6 py-3 bg-red-50 text-red-600 font-bold rounded-2xl hover:bg-red-600 hover:text-white transition flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" /> Keluar
          </button>
          <div className="flex bg-slate-100 p-1.5 rounded-2xl">
            <button 
              onClick={() => setActiveTab('form')}
              className={`px-6 py-2.5 rounded-xl font-bold transition ${activeTab === 'form' ? 'bg-blue-700 text-white shadow-lg' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Input Acara
            </button>
            <button 
              onClick={() => setActiveTab('calendar')}
              className={`px-6 py-2.5 rounded-xl font-bold transition ${activeTab === 'calendar' ? 'bg-blue-700 text-white shadow-lg' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Kalender
            </button>
            <button 
              onClick={() => setActiveTab('kulwa')}
              className={`px-6 py-2.5 rounded-xl font-bold transition ${activeTab === 'kulwa' ? 'bg-blue-700 text-white shadow-lg' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Kulwa
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Kolom Kiri: Form atau Kalender */}
          <div className="lg:col-span-2">
            {activeTab === 'form' && (
              <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100">
                <div className="flex items-center gap-3 mb-8 text-blue-700">
                  {editingEventId ? <Edit2 className="w-8 h-8" /> : <PlusCircle className="w-8 h-8" />}
                  <h2 className="text-2xl font-bold">{editingEventId ? 'Edit Acara' : 'Tambah Acara Baru'}</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Nama Acara / Workshop</label>
                      <input 
                        name="title" value={eventData.title} onChange={handleInputChange}
                        type="text" placeholder="Contoh: Workshop Super Team" required
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Tipe Kegiatan</label>
                      <select 
                        name="type" value={eventData.type} onChange={handleInputChange}
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                      >
                        <option>Workshop</option>
                        <option>Mentoring</option>
                        <option>Consulting</option>
                        <option>Event Khusus</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <LinkIcon className="w-4 h-4" /> Link Pendaftaran
                      </label>
                      <input 
                        name="link" value={eventData.link} onChange={handleInputChange}
                        type="url" placeholder="https://crauniversity.id/... (Opsional)" 
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" /> Tanggal Pelaksanaan
                      </label>
                      <input 
                        name="date" value={eventData.date} onChange={handleInputChange}
                        type="text" required placeholder="Contoh: 3-4 Mei 2026"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" /> Upload Poster (Opsional)
                    </label>
                    <label 
                      htmlFor="poster-upload" 
                      className={`border-2 border-dashed rounded-2xl p-8 text-center transition cursor-pointer bg-slate-50 flex flex-col items-center justify-center min-h-[160px] ${eventData.poster || previewUrl ? 'border-blue-500 bg-blue-50/30' : 'border-slate-200 hover:border-blue-400'}`}
                    >
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        className="hidden" 
                        id="poster-upload" 
                        accept="image/*" 
                        onChange={handleFileChange}
                      />
                      {previewUrl ? (
                        <div className="relative group w-full flex flex-col items-center max-w-[420px]">
                          <div className="relative w-full overflow-hidden rounded-lg shadow-md bg-slate-100 min-h-[260px] max-h-[420px]">
                            <img 
                              src={previewUrl} 
                              alt="Preview" 
                              className="w-full h-auto max-h-[420px] object-contain"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition rounded-lg flex-col gap-2">
                              <p className="text-white text-xs font-bold">Klik untuk Ganti Gambar</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setPreviewUrl(null);
                                setEventData({ ...eventData, poster: null });
                                setEventPosterCleared(true);
                                if (fileInputRef.current) fileInputRef.current.value = '';
                              }}
                              className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-lg opacity-0 group-hover:opacity-100"
                              title="Hapus poster"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm text-slate-500 font-medium mt-2">
                            {eventData.poster ? `File: ${eventData.poster.name}` : 'Poster Terpasang (Klik untuk ganti)'}
                          </p>
                        </div>
                      ) : (
                        <>
                          <ImageIcon className="w-10 h-10 text-slate-400 mb-2" />
                          <p className="text-sm text-slate-500 font-medium">
                            Klik untuk pilih gambar poster
                          </p>
                          <p className="text-xs text-slate-400 mt-1">Rekomendasi rasio 3:4 (Portrait)</p>
                        </>
                      )}
                    </label>
                  </div>

                  <div className="flex gap-4">
                    {editingEventId && (
                      <button 
                        type="button"
                        onClick={() => {
                          setEditingEventId(null);
                          setEventData({ title: '', link: '', date: '', type: 'Workshop', poster: null });
                          setPreviewUrl(null);
                          setEventPosterCleared(false);
                        }}
                        className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition"
                      >
                        Batal
                      </button>
                    )}
                    <button type="submit" className="flex-[2] py-4 bg-blue-700 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-800 transition flex items-center justify-center gap-2">
                      <Save className="w-5 h-5" /> {editingEventId ? 'Perbarui Program' : 'Simpan Program'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'kulwa' && (
              <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100">
                <div className="flex items-center gap-3 mb-8 text-blue-700">
                  <BookOpen className="w-8 h-8" />
                  <h2 className="text-2xl font-bold">{editingArticleId ? 'Edit Artikel KULWA' : 'Tulis Artikel KULWA'}</h2>
                </div>
                
                <form onSubmit={handleKulwaSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Judul KULWA</label>
                      <input 
                        value={kulwaData.title} onChange={(e) => setKulwaData({...kulwaData, title: e.target.value})}
                        type="text" placeholder="Contoh: KULWA SUPER TEAM #16" required
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Tanggal Posting</label>
                      <input 
                        value={kulwaData.date} onChange={(e) => setKulwaData({...kulwaData, date: e.target.value})}
                        type="text" required placeholder="Contoh: 15 Mei 2026"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Type className="w-4 h-4" /> Isi Materi Kulwa
                    </label>
                    <textarea 
                      value={kulwaData.content} onChange={(e) => setKulwaData({...kulwaData, content: e.target.value})}
                      rows={12} required placeholder="Masukkan seluruh teks materi KULWA di sini..."
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" /> Poster Materi
                    </label>
                    <label 
                      className={`border-2 border-dashed rounded-2xl p-6 text-center transition cursor-pointer bg-slate-50 flex flex-col items-center justify-center min-h-[220px] ${kulwaPreviewUrl ? 'border-blue-500 bg-blue-50/30' : 'border-slate-200 hover:border-blue-400'}`}
                    >
                      <input 
                        type="file" 
                        id="kulwa-poster"
                        className="hidden" 
                        accept="image/*" 
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setKulwaData({...kulwaData, poster: e.target.files[0]});
                            setKulwaPreviewUrl(URL.createObjectURL(e.target.files[0]));
                          }
                        }}
                      />
                      {kulwaPreviewUrl ? (
                        <div className="relative group w-full max-w-[360px] overflow-hidden rounded-lg shadow-md bg-slate-100 min-h-[260px] max-h-[420px]">
                          <img 
                            src={kulwaPreviewUrl} 
                            alt="Preview" 
                            className="w-full h-auto max-h-[420px] object-contain"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition rounded-lg flex-col gap-2">
                            <p className="text-white text-xs font-bold">Klik untuk Ganti</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setKulwaPreviewUrl(null);
                              setKulwaData({ ...kulwaData, poster: null });
                              setKulwaPosterCleared(true);
                              const fileInput = document.getElementById('kulwa-poster') as HTMLInputElement;
                              if (fileInput) fileInput.value = '';
                            }}
                            className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-lg opacity-0 group-hover:opacity-100"
                            title="Hapus poster"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <ImageIcon className="w-8 h-8 text-slate-400 mb-2" />
                          <p className="text-xs text-slate-500">Klik untuk upload poster KULWA</p>
                          <p className="text-[10px] text-slate-400 mt-1">Rekomendasi rasio 3:4 (Portrait)</p>
                        </>
                      )}
                    </label>
                  </div>

                  <div className="flex gap-4">
                    {editingArticleId && (
                      <button 
                        type="button"
                        onClick={() => {
                          setEditingArticleId(null);
                          setKulwaData({ title: '', date: '', content: '', poster: null });
                          setKulwaPreviewUrl(null);
                          setKulwaPosterCleared(false);
                        }}
                        className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition"
                      >
                        Batal
                      </button>
                    )}
                    <button type="submit" className="flex-[2] py-4 bg-blue-700 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-800 transition flex items-center justify-center gap-2">
                      <Save className="w-5 h-5" /> {editingArticleId ? 'Perbarui KULWA' : 'Posting KULWA'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'calendar' && (
              /* Tampilan Kalender Sederhana */
              <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {viewDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                  </h2>
                  <div className="flex gap-2">
                    <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-100 rounded-xl transition text-slate-600"><ChevronLeft /></button>
                    <button onClick={handleNextMonth} className="p-2 hover:bg-slate-100 rounded-xl transition text-slate-600"><ChevronRight /></button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(d => (
                    <div key={d} className="text-center text-xs font-bold text-slate-400 py-2">{d}</div>
                  ))}
                  
                  {Array.from({ length: startDayOfMonth(viewDate.getFullYear(), viewDate.getMonth()) }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-24 p-2"></div>
                  ))}

                  {Array.from({ length: daysInMonth(viewDate.getFullYear(), viewDate.getMonth()) }).map((_, i) => {
                    const day = i + 1;
                    const dayEvents = getEventsForDay(day);
                    
                    const now = new Date();
                    const isToday = 
                      day === now.getDate() && 
                      viewDate.getMonth() === now.getMonth() && 
                      viewDate.getFullYear() === now.getFullYear();
                    
                    return (
                      <div 
                        key={day} 
                        className={`h-24 p-2 border border-slate-100 rounded-xl transition hover:bg-blue-50 relative overflow-hidden flex flex-col ${isToday ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-100' : ''}`}
                      >
                        <span className={`text-sm font-bold ${isToday ? 'text-blue-700' : 'text-slate-400'}`}>{day}</span>
                        <div className="mt-1 flex-grow overflow-y-auto scrollbar-hide space-y-1">
                          {dayEvents.map(ev => (
                            <div 
                              key={ev.id} 
                              onClick={() => startEdit(ev)}
                              className="p-1 bg-blue-700 text-[9px] text-white rounded-md truncate font-medium cursor-pointer hover:bg-blue-800 transition shadow-sm"
                              title={`${ev.type}: ${ev.title}`}
                            >
                              {ev.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Kolom Kanan: List Data yang Sudah Ada */}
          <div className="space-y-6">
            {activeTab === 'kulwa' ? (
              <div className="bg-blue-900 rounded-[2.5rem] p-8 text-white shadow-xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-amber-400">
                  <BookOpen className="w-5 h-5" /> Materi Terbit
                </h3>
                <div className="space-y-4">
                  {articles?.map(a => (
                    <div key={a.id} className="p-4 bg-white/5 border border-white/10 rounded-2xl group relative hover:bg-white/10 transition">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">{a.date}</span>
                        <div className="flex gap-1">
                          <button onClick={() => startEditKulwa(a)} className="text-slate-400 hover:text-white p-1"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => confirmDelete(a.id, 'kulwa')} className="text-slate-400 hover:text-red-400 p-1"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                      <h4 className="font-bold text-sm leading-tight">{a.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-2 line-clamp-2">{a.content}</p>
                      {a.poster && (
                        <div className="mt-3 rounded-lg overflow-hidden border border-white/10 bg-white/5 p-2">
                          <img 
                            src={a.poster} 
                            alt={a.title} 
                            className="w-full h-auto max-h-32 object-contain"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  {(!articles || articles.length === 0) && (
                    <p className="text-slate-400 text-sm text-center py-8">Belum ada materi KULWA</p>
                  )}
                </div>
              </div>
            ) : (
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-amber-400">
                <CalendarIcon className="w-5 h-5" /> Acara Terdaftar
              </h3>
              <div className="space-y-4">
                {events.map(ev => (
                  <div key={ev.id} className="p-4 bg-white/5 border border-white/10 rounded-2xl group relative hover:bg-white/10 transition">
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-2 py-0.5 bg-amber-500 text-[10px] font-bold rounded-md uppercase tracking-widest">
                        {ev.type}
                      </span>
                      <div className="flex gap-1">
                        <button 
                          onClick={() => startEdit(ev)}
                          className="text-slate-500 hover:text-blue-400 transition opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-white/10"
                          title="Edit Program"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => confirmDelete(ev.id, 'event')}
                          className="text-slate-500 hover:text-red-400 transition opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-white/10"
                          title="Hapus Program"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <h4 className="font-bold text-sm mb-1">{ev.title}</h4>
                    <p className="text-xs text-slate-400">
                      {ev.date}
                    </p>
                    {ev.poster && (
                      <div className="mt-3 rounded-lg overflow-hidden border border-white/10 bg-white/5 p-2">
                        <img 
                          src={ev.poster} 
                          alt={ev.title} 
                          className="w-full h-auto max-h-32 object-contain"
                        />
                      </div>
                    )}
                  </div>
                ))}
                {events.length === 0 && (
                  <p className="text-slate-400 text-sm text-center py-8">Belum ada acara terdaftar</p>
                )}
              </div>
            </div>
            )}
            
            <div className="bg-blue-50 rounded-[2.5rem] p-8 border border-blue-100">
              <h3 className="font-bold text-blue-800 mb-2">Tips Admin</h3>
              <p className="text-sm text-blue-600 leading-relaxed">
                Gunakan aspek rasio 3:4 (portrait) untuk hasil tampilan poster terbaik di halaman depan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Custom Delete Confirmation Modal */}
    {showDeleteConfirm !== null && (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setShowDeleteConfirm(null)}
      >
        <div 
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 transform scale-100 transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="w-7 h-7" />
              <h3 className="text-xl font-bold text-slate-900">Konfirmasi Hapus {deleteType === 'event' ? 'Program' : 'Kulwa'}</h3>
            </div>
            <button 
              onClick={() => setShowDeleteConfirm(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="text-slate-700 leading-relaxed mb-8">
            <p>Anda yakin ingin menghapus {deleteType === 'event' ? 'program' : 'artikel KULWA'} ini dari daftar?</p>
            <p className="font-semibold mt-2">Tindakan ini tidak dapat dibatalkan.</p>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowDeleteConfirm(null)}
              className="px-6 py-3 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-100 transition"
            >
              Batal
            </button>
            <button
              onClick={executeDelete}
              className="px-6 py-3 text-sm font-semibold bg-red-600 text-white rounded-xl hover:bg-red-700 transition flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> Ya, Hapus {deleteType === 'event' ? 'Program' : 'Kulwa'}
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Notification Toast */}
    {notification && (
      <div className={`fixed top-8 right-8 z-[100] flex items-center gap-4 p-5 bg-white rounded-[2rem] shadow-2xl border transition-all animate-fade-in ${
        notification.type === 'success' ? 'border-green-100' : 'border-blue-100'
      }`}>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
          notification.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle className="w-6 h-6" />
          ) : (
            <Info className="w-6 h-6" />
          )}
        </div>
        <div className="pr-8">
          <p className="text-slate-900 font-bold">{notification.message}</p>
        </div>
        <button 
          onClick={() => setNotification(null)}
          className="absolute top-4 right-4 p-1 hover:bg-slate-50 rounded-lg text-slate-400 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    )}
    </>
  );
}