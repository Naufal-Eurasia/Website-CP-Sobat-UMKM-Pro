import { useState, MouseEvent } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/nobghor.png';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'Tentang Kami' },
  { href: '#services', label: 'Layanan' },
  { href: '#programs', label: 'Program' },
  { href: '#team', label: 'Tim Kami' },
  { href: '#kulwa', label: 'Kulwa' },
  { href: '#testimonials', label: 'Testimoni' },
  { href: '#faq', label: 'FAQ' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (
    e: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    if (href === '#admin') {
      window.location.hash = '#admin';
    } else {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav
  className="fixed w-full z-50 bg-white shadow-lg"
>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleClick(e, '#home')}
            className="flex items-center"
          >
            <img
              src={logo}
              alt="Sobat UMKM Logo"
              className="h-20 object-contain"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 font-medium">
            {navLinks.map((link) => (
              <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleClick(e, link.href)}
            className="transition hover:text-blue-500 active:text-amber-600 text-slate-700"
          >
          {link.label}
        </a>
            ))}

            <a
              href="#contact"
              onClick={(e) => handleClick(e, '#contact')}
              className="bg-blue-700 text-white px-5 py-2.5 rounded-lg hover:bg-blue-800 active:bg-amber-600 active:scale-95 transition shadow-md font-semibold"
            >
              Kontak
            </a>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-slate-900" />
            ) : (
              <Menu className="w-6 h-6 text-slate-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-3 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="block text-slate-700 font-medium py-2 hover:text-blue-700 active:text-amber-600 transition"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={(e) => handleClick(e, '#contact')}
            className="block bg-blue-700 text-white px-4 py-3 rounded-lg text-center font-semibold active:bg-amber-600"
          >
            Kontak
          </a>
        </div>
      )}
    </nav>
  );
}