import { MouseEvent } from 'react';
import { Instagram, Youtube } from 'lucide-react';
import logo from '../assets/nobghor.png';

const footerLinks = [
  { href: '#about', label: 'Tentang' },
  { href: '#services', label: 'Layanan' },
  { href: '#programs', label: 'Program' },
  { href: '#team', label: 'Tim Kami' },
  { href: '#testimonials', label: 'Testimoni' },
  { href: '#faq', label: 'FAQ' },
];

export default function Footer() {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#admin') {
      window.location.hash = '#admin';
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#F5F5F5] text-slate-500 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <a href="#home" onClick={(e) => handleClick(e, '#home')} className="flex items-center gap-2">
            <img
              src={logo}
              alt="Sobat UMKM Logo"
              className="h-20 object-contain"
            />            
          </a>

          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="hover:text-amber-500 active:text-amber-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/sobat.umkmpro"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center hover:bg-amber-400 hover:text-white active:bg-amber-600 active:scale-95 transition-all"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.tiktok.com/@sobat.umkmpro"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center hover:bg-amber-400 hover:text-white active:bg-amber-600 active:scale-95 transition-all"
            >
              <svg 
                viewBox="0 0 24 24" 
                className="w-5 h-5 fill-current"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .57.04.83.11V9.4a6.33 6.33 0 0 0-3.14-.14 6.34 6.34 0 0 0-5.3 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V7.04a8.1 8.1 0 0 0 5.04 1.75v-3.4a4.78 4.78 0 0 1-3.3-1.7z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@sobat.umkmpro"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center hover:bg-amber-400 hover:text-white active:bg-amber-600 active:scale-95 transition-all"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 text-center text-xs tracking-widest uppercase">
          &copy; 2026 Sobat UMKM Pro. Indonesia&apos;s Leading UMKM Consultant.
        </div>
      </div>
    </footer>
  );
}
