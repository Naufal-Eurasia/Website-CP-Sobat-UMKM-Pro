import React, { useState, useEffect } from 'react';
import { PlusCircle, Image as ImageIcon, Link as LinkIcon, Calendar as CalendarIcon, Save, Trash2, ChevronLeft, ChevronRight, LogOut, AlertTriangle, X, CheckCircle, Info, Edit2 } from 'lucide-react';
import { ProgramItem } from '../App';

interface AdminProps {
  onLogout: () => void;
  events: ProgramItem[];
  setEvents: React.Dispatch<React.SetStateAction<ProgramItem[]>>;
}

export default function Admin({ onLogout, events, setEvents }: AdminProps) {
  const [activeTab, setActiveTab] = useState<'form' | 'calendar'>('form');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null); // State untuk ID program yang akan dihapus
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null); // State untuk notifikasi
  const [editingEventId, setEditingEventId] = useState<number | null>(null); // State untuk ID program yang sedang diedit
  
  // State untuk form input
  const [eventData, setEventData] = useState({
    title: '',
    link: '',
    date: '',
    type: 'Workshop',
    poster: null as File | null
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // Preview untuk form

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEventData({ ...eventData, poster: file });
      // Buat preview untuk file baru
      if (previewUrl && !events.some(ev => ev.poster === previewUrl)) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ambil poster lama jika sedang edit, atau undefined jika baru
    let posterUrl: string | undefined = editingEventId 
      ? events.find(ev => ev.id === editingEventId)?.poster 
      : undefined;
    
    // Jika ada file poster baru yang dipilih, buat URL baru
    if (eventData.poster) {
      // Konversi file ke Base64 agar bisa disimpan permanen di localStorage
      try {
        posterUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(eventData.poster as File);
        });
      } catch (error) {
        console.error("Gagal memproses gambar:", error);
        setNotification({ message: 'Gagal memproses gambar poster.', type: 'error' });
        return;
      }
    }

    if (editingEventId !== null) {
      // Mode Edit: Update data yang sudah ada
      setEvents(events.map(ev => 
        ev.id === editingEventId 
          ? { ...ev, title: eventData.title, date: eventData.date, link: eventData.link || undefined, type: eventData.type, poster: posterUrl }
          : ev
      ));
      setNotification({ message: 'Program berhasil diperbarui!', type: 'success' });
      setEditingEventId(null);
    } else {
      // Mode Tambah: Buat data baru
      const newEvent = {
        id: Date.now(),
        title: eventData.title,
        date: eventData.date,
        link: eventData.link || undefined,
        type: eventData.type,
        poster: posterUrl
      };
      setEvents([...events, newEvent]);
      setNotification({ message: 'Program berhasil ditambahkan!', type: 'success' });
    }

    setEventData({ title: '', link: '', date: '', type: 'Workshop', poster: null });
    setPreviewUrl(null);
    // Reset input file secara manual agar bisa upload file yang sama
    const fileInput = document.getElementById('poster-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  // Fungsi untuk memicu mode edit dan mengisi form
  const startEdit = (ev: ProgramItem) => {
    setEditingEventId(ev.id);
    setEventData({ title: ev.title, link: ev.link || '', date: ev.date, type: ev.type, poster: null });
    setPreviewUrl(ev.poster || null);
    setActiveTab('form');
  };

  // Fungsi untuk menampilkan modal konfirmasi
  const confirmDelete = (id: number) => {
    setShowDeleteConfirm(id);
  };

  // Fungsi untuk melakukan penghapusan setelah konfirmasi
  const executeDelete = () => {
    if (showDeleteConfirm !== null) {
      setEvents(events.filter((ev) => ev.id !== showDeleteConfirm));
      setShowDeleteConfirm(null); // Tutup modal setelah dihapus
      setNotification({ message: 'Program berhasil dihapus!', type: 'success' });
    }
  };

  // Efek untuk menghilangkan notifikasi secara otomatis
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000); // Notifikasi akan hilang setelah 3 detik
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
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Kolom Kiri: Form atau Kalender */}
          <div className="lg:col-span-2">
            {activeTab === 'form' ? (
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
                        type="text" required placeholder="Contoh: 17 – 19 Juli 2026"
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
                        className="hidden" 
                        id="poster-upload" 
                        accept="image/*" 
                        onChange={handleFileChange}
                      />
                      {previewUrl ? (
                        <div className="relative group">
                          <img src={previewUrl} alt="Preview" className="h-48 w-auto rounded-lg shadow-md mb-2 object-contain bg-slate-100" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition rounded-lg">
                            <p className="text-white text-xs font-bold">Ganti Gambar</p>
                          </div>
                        </div>
                      ) : (
                        <ImageIcon className="w-10 h-10 text-slate-400 mb-2" />
                      )}
                      <p className="text-sm text-slate-500 font-medium">
                        {eventData.poster ? `File: ${eventData.poster.name}` : previewUrl ? 'Poster Terpasang (Klik untuk ganti)' : 'Klik untuk pilih gambar poster'}
                      </p>
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
            ) : (
              /* Tampilan Kalender Sederhana */
              <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-slate-900">Mei 2024</h2>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-slate-100 rounded-xl transition"><ChevronLeft /></button>
                    <button className="p-2 hover:bg-slate-100 rounded-xl transition"><ChevronRight /></button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(d => (
                    <div key={d} className="text-center text-xs font-bold text-slate-400 py-2">{d}</div>
                  ))}
                  {Array.from({ length: 31 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-24 p-2 border border-slate-50 rounded-xl transition hover:bg-blue-50 relative ${i + 1 === 20 ? 'bg-blue-50 border-blue-200' : ''}`}
                    >
                      <span className="text-sm font-bold text-slate-400">{i + 1}</span>
                      {i + 1 === 20 && (
                        <div className="mt-1 p-1 bg-blue-700 text-[10px] text-white rounded-md truncate font-medium">
                          Super Team WS
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Kolom Kanan: List Data yang Sudah Ada */}
          <div className="space-y-6">
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
                          onClick={() => confirmDelete(ev.id)}
                          className="text-slate-500 hover:text-red-400 transition opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-white/10"
                          title="Hapus Program"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <h4 className="font-bold text-sm mb-1">{ev.title}</h4>
                    <p className="text-xs text-slate-400">
                      {isNaN(Date.parse(ev.date)) 
                        ? ev.date 
                        : new Date(ev.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    {ev.poster && (
                      <div className="mt-2 rounded-lg overflow-hidden h-24 border border-white/10 bg-white/5">
                        <img src={ev.poster} alt="Preview" className="w-full h-full object-contain" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-[2.5rem] p-8 border border-blue-100">
              <h3 className="font-bold text-blue-800 mb-2">Tips Admin</h3>
              <p className="text-sm text-blue-600 leading-relaxed">
                Gunakan aspek rasio 1:1 atau 16:9 untuk hasil tampilan poster terbaik di halaman depan.
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
          onClick={() => setShowDeleteConfirm(null)} // Klik di luar modal untuk menutup
        >
          <div 
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 transform scale-100 transition-all"
            onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat konten diklik
          >
            {/* Header Modal */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3 text-red-600">
                <AlertTriangle className="w-7 h-7" />
                <h3 className="text-xl font-bold text-slate-900">Konfirmasi Hapus Program</h3>
              </div>
              <button 
                onClick={() => setShowDeleteConfirm(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Konten Modal */}
            <div className="text-slate-700 leading-relaxed mb-8">
              <p>Anda yakin ingin menghapus program ini dari daftar?</p>
              <p className="font-semibold mt-2">Tindakan ini tidak dapat dibatalkan.</p>
            </div>

            {/* Footer Modal - Tombol Aksi */}
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
                <Trash2 className="w-4 h-4" /> Ya, Hapus Program
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Toast - Untuk pesan sukses tambah/hapus */}
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