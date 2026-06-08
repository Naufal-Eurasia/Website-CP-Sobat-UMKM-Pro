import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Programs from './components/Programs';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './components/Admin';
import Login from './components/Login';
import Articles, { KulwaItem } from './components/Articles';

// Interface untuk menyamakan struktur data
export interface ProgramItem {
  id: number;
  title: string;
  date: string;
  link?: string;
  poster?: string;
  type: string;
}

// Helper sederhana untuk mengelola IndexedDB secara Asynchronous
const dbConfig = { name: 'SobatUMKM_DB', store: 'programs_store', key: 'list_programs' };

const getDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbConfig.name, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(dbConfig.store)) {
        request.result.createObjectStore(dbConfig.store);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const saveToDB = async (data: ProgramItem[]) => {
  try {
    const db = await getDB();
    const tx = db.transaction(dbConfig.store, 'readwrite');
    tx.objectStore(dbConfig.store).put(data, dbConfig.key);
  } catch (err) {
    console.error("Gagal menyimpan ke IndexedDB:", err);
  }
};

const loadFromDB = async (): Promise<ProgramItem[] | null> => {
  try {
    const db = await getDB();
    return new Promise((resolve) => {
      const tx = db.transaction(dbConfig.store, 'readonly');
      const request = tx.objectStore(dbConfig.store).get(dbConfig.key);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => resolve(null);
    });
  } catch (err) {
    return null;
  }
};

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [programs, setPrograms] = useState<ProgramItem[]>([
    {
      id: 1,
      title: 'Workshop Super Team CRA University',
      link: 'https://crauniversity.id/aff/188/1698/',
      date: '2024-05-20',
      type: 'Workshop',
    },
    {
      id: 2,
      title: 'MFM BRM 2.0',
      link: 'https://crauniversity.id/aff/188/1693/',
      date: '2024-06-15',
      type: 'Mentoring',
    },
    {
      id: 3,
      title: 'Smart Family RoadMap',
      link: 'https://crauniversity.id/aff/188/1687/',
      date: '2024-07-10',
      type: 'Strategy',
    },
  ]);

  // State untuk data KULWA
  const [articles, setArticles] = useState<KulwaItem[]>(() => {
    const saved = localStorage.getItem('sobat_umkm_kulwa');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const handleHashChange = () => setCurrentPath(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    // Muat data dari IndexedDB saat aplikasi pertama kali dibuka
    const init = async () => {
      const saved = await loadFromDB();
      if (saved) setPrograms(saved);
      setIsDataLoaded(true);
    };
    init();
  }, []);

  useEffect(() => {
    // Simpan data ke IndexedDB setiap kali ada perubahan, 
    // tapi hanya jika data awal sudah selesai dimuat agar tidak tertimpa default
    if (isDataLoaded) {
      saveToDB(programs);
    }
  }, [programs, isDataLoaded]);

  // Simpan KULWA ke LocalStorage setiap ada perubahan
  useEffect(() => {
    localStorage.setItem('sobat_umkm_kulwa', JSON.stringify(articles));
  }, [articles]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.hash = '#home';
  };

  if (currentPath === '#admin') {
    if (!isLoggedIn) {
      return <Login onLogin={setIsLoggedIn} onBack={() => window.location.hash = '#home'} />;
    }
    return (
      <Admin 
        onLogout={handleLogout} 
        events={programs} 
        setEvents={setPrograms} 
        articles={articles} 
        setArticles={setArticles} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Articles articles={articles} />
      <Programs programs={programs} />
      <Services />
      <Team />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
