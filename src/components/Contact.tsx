import React, { useState } from 'react';
import { Mail, Phone, Send, Loader2 } from 'lucide-react';

export default function Contact() {
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // State untuk menampung input form (Sekarang ditambah field whatsapp)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    message: ''
  });

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Mengizinkan kirim form dengan Enter saja, dan Shift+Enter untuk baris baru
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendToWhatsApp(e as unknown as React.FormEvent);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setStatus('idle');

    // Nomor WhatsApp Admin Utama Sobat UMKM Pro
    const NOMOR_WA_MENTOR = '6281358894404'; 

    // Menyusun teks pesan agar admin langsung dapat data komplit pengunjung
    const textMessage = 
      `*Halo Sobat UMKM Pro!*\n` +
      `Ada data konsultasi masuk dari form website:\n\n` +
      `• *Nama Lengkap:* ${formData.name}\n` +
      `• *Email Pengunjung:* ${formData.email}\n` +
      `• *WhatsApp Pengunjung:* ${formData.whatsapp}\n` +
      `• *Pesan/Kendala:* ${formData.message}`;

    const encodedText = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/${NOMOR_WA_MENTOR}?text=${encodedText}`;

    try {
      // Membuka WhatsApp di tab baru
      window.open(whatsappUrl, '_blank');
      
      // Mengeset status sukses & menghapus tulisan di form agar kembali bersih
      setStatus('success');
      setFormData({ name: '', email: '', whatsapp: '', message: '' }); 
    } catch (error) {
      console.error('WhatsApp Redirect Error:', error);
      setStatus('error');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0a1628] text-white relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-[80px]" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
              Mulai Konsultasi Bisnis Hari Ini!
            </h2>
            <p className="text-blue-100/80 text-base md:text-lg mb-12 max-w-lg leading-relaxed">
              Konsultasikan kebutuhan bisnis Anda dan dapatkan penawaran strategi
              terbaik dari tim ahli Sobat UMKM Pro.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 md:gap-5 p-5 md:p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-700 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-blue-300 uppercase font-bold tracking-widest mb-1">
                    Email Respon Cepat
                  </p>
                  <a 
                    href="mailto:sobat.umkmpro@gmail.com"
                    className="text-lg sm:text-xl font-semibold hover:text-amber-400 active:text-amber-600 transition block break-all"
                  >
                    sobat.umkmpro@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 md:gap-5 p-5 md:p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-700 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-blue-300 uppercase font-bold tracking-widest mb-1">
                    Telepon / WhatsApp
                  </p>
                  <a 
                    href="https://wa.me/6281259823825"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg sm:text-xl font-semibold hover:text-amber-400 active:text-amber-600 transition block"
                  >
                    +62 812-5982-3825
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 md:gap-5 p-5 md:p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-700 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-8 h-8">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EA4335" />
                    <circle cx="12" cy="9" r="2.5" fill="#FFFFFF" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-blue-300 uppercase font-bold tracking-widest mb-1">
                    Kantor
                  </p>
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <p className="text-base font-semibold group-hover:text-amber-400 transition leading-tight mb-1">
                      Perumahan Taman Dhika Kota Cluster Wilis No.F9-6, Buduran, Sidoarjo
                    </p>
                    <span className="text-xs text-blue-300 font-bold uppercase tracking-widest group-active:text-amber-600 transition flex items-center gap-1">
                      Buka di Google Maps →
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-2xl text-slate-800">
            <h3 className="text-2xl font-bold mb-2 text-center">Hubungi Kami</h3>
            <p className="text-slate-500 text-center mb-8">
              Isi formulir di bawah untuk memulai chat konsultasi langsung dengan WhatsApp Admin kami.
            </p>
            <form className="space-y-5" onSubmit={sendToWhatsApp}>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Budi Santoso"
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="budi@email.com"
                    required
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    No. WhatsApp Anda
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="08123456xxx"
                    required
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Pesan Anda
                </label>
                <textarea
                  placeholder="Ceritakan masalah bisnis Anda..."
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onKeyDown={handleTextareaKeyDown}
                  rows={4}
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-none"
                />
              </div>
              
              {status === 'success' && (
                <p className="text-green-600 text-sm font-semibold text-center bg-green-50 py-2 rounded-lg animate-fade-in">
                  Form berhasil dikirim! Mengalihkan Anda ke WhatsApp Admin...
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-600 text-sm font-semibold text-center bg-red-50 py-2 rounded-lg animate-fade-in">
                  Gagal membuka WhatsApp. Silakan gunakan tombol kontak di sebelah kiri.
                </p>
              )}

              <button
                type="submit"
                disabled={isSending}
                className={`w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-700/20 transition transform hover:-translate-y-1 flex items-center justify-center gap-3 ${isSending ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                {isSending ? 'Menghubungkan...' : 'Mulai Konsultasi via WhatsApp'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}