import React, { useState } from 'react';
import { Lock, Mail, Loader2, ArrowLeft } from 'lucide-react';
import logo from '../assets/nobghor.png';

interface LoginProps {
  onLogin: (status: boolean) => void;
  onBack: () => void;
}

export default function Login({ onLogin, onBack }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulasi Verifikasi Login (Ganti dengan integrasi Backend/Supabase nanti)
    setTimeout(() => {
      if (email === 'admin@sobatumkm.pro' && password === 'admin123') {
        onLogin(true);
      } else {
        setError('Email atau password salah. Silakan coba lagi.');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <button 
          onClick={onBack}
          className="text-slate-400 hover:text-white flex items-center gap-2 mb-8 transition group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Kembali ke Beranda
        </button>

        <div className="bg-white rounded-[3rem] p-10 shadow-2xl">
          <div className="text-center mb-10">
            <img src={logo} alt="Logo" className="h-16 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-slate-900">Login Admin</h1>
            <p className="text-slate-500">Akses Panel Pengelolaan Konten</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email Resmi
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sobatumkm.pro"
                required
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Lock className="w-4 h-4" /> Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-blue-700 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-800 transition flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Masuk Sekarang'
              )}
            </button>
          </form>
          
          <p className="mt-8 text-center text-xs text-slate-400">
            Hanya untuk otoritas internal Sobat UMKM Pro.
          </p>
        </div>
      </div>
    </div>
  );
}