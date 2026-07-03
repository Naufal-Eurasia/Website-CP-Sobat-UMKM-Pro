import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Programs from './components/Programs';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Clients from './components/Clients';
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
  type: string;
  date: string;
  poster?: string;
  link?: string;
  isPortrait?: boolean; // true untuk portrait (3:4), false untuk landscape (16:9)
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
  const [articles, setArticles] = useState<KulwaItem[]>([]);

  useEffect(() => {
    const handleHashChange = () => setCurrentPath(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const init = async () => {
      // 1. Attempt to load from local storage/IndexedDB first for a quicker initial render or offline support
      try {
        const storedPrograms = await loadFromDB();
        if (storedPrograms && storedPrograms.length > 0) { // Check for actual data
          setPrograms(storedPrograms);
          console.log("Programs loaded from IndexedDB.");
        }
      } catch (dbErr) {
        console.warn("Gagal memuat program dari IndexedDB:", dbErr);
      }

      try {
        const storedArticles = localStorage.getItem('sobat_umkm_kulwa');
        if (storedArticles) {
          const parsedArticles = JSON.parse(storedArticles);
          if (parsedArticles.length > 0) { // Check for actual data
            setArticles(parsedArticles);
            console.log("Articles loaded from LocalStorage.");
          }
        }
      } catch (lsErr) {
        console.warn("Gagal memuat artikel dari LocalStorage:", lsErr);
      }

      // 2. Fetch from API to get the latest data
      try {
        const [resProg, resArt] = await Promise.all([
          fetch('https://sobatumkmpro.com/api.php?action=get_programs'),
          fetch('https://sobatumkmpro.com/api.php?action=get_articles')
        ]);
        const progs = await resProg.json();
        const arts = await resArt.json(); // Assuming arts is also an array

        if (Array.isArray(progs)) {
          setPrograms(progs);
          saveToDB(progs); // Save to IndexedDB after successful fetch
        }
        if (Array.isArray(arts)) {
          setArticles(arts);
          localStorage.setItem('sobat_umkm_kulwa', JSON.stringify(arts)); // Save to LocalStorage after successful fetch
        }
      } catch (apiErr) {
        console.error("Gagal sinkronisasi data dari server. Menggunakan data lokal jika tersedia.", apiErr);
      }
      setIsDataLoaded(true); // Mark data as loaded regardless of API success, as local data might be used
    };
    init();
  }, []);

  useEffect(() => {
    // Simpan data ke IndexedDB setiap kali ada perubahan, 
    // tapi hanya jika data awal sudah selesai dimuat agar tidak menimpa data lokal dengan default kosong
    if (isDataLoaded) {
      saveToDB(programs);
    }
  }, [programs, isDataLoaded]);

  // Simpan KULWA ke LocalStorage setiap ada perubahan
  useEffect(() => {
    // Simpan KULWA ke LocalStorage setiap ada perubahan,
    // tapi hanya jika data awal sudah selesai dimuat agar tidak menimpa data lokal dengan default kosong
    if (isDataLoaded) {
      localStorage.setItem('sobat_umkm_kulwa', JSON.stringify(articles));
    }
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
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Articles articles={articles} />
      <Programs programs={programs} />
      <Services />
      <Team />
      <Clients />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
