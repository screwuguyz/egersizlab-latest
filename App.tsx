import React, { useState } from 'react';
import Header from '@/components/Header';
import CourseCard from './components/CourseCard';
import GeminiAssistant from './components/GeminiAssistant';
import PopularCourses from './PopularCourses'; // Düzeltilmiş yol
import Hero from './components/Hero';
import FeaturesBar from './components/FeaturesBar';
import KnowledgeHub from './components/KnowledgeHub';
import Categories from './components/Categories';
import WebinarPromo from './components/WebinarPromo';
import { CartItem, Course } from './types';

// Mock Data
const courses: Course[] = [
  {
    id: 1,
    title: "Vakalarla Omurgada Radyolojik Değerlendirme: MR-XRay-BT",
    instructor: "Dr. Ahmet Yılmaz",
    price: 1100,
    rating: 5.0,
    reviewCount: 2,
    image: "https://picsum.photos/400/250?random=1",
    category: "Workshop",
    duration: "3 Saat",
    students: 46
  },
  {
    id: 2,
    title: "Diz Cerrahileri Sonrası Rehabilitasyon Sertifika Programı",
    instructor: "Prof. Dr. Ayşe Demir",
    price: 3000,
    rating: 4.8,
    reviewCount: 4,
    image: "https://picsum.photos/400/250?random=2",
    category: "Ortopedi",
    duration: "38 Ders",
    students: 54
  },
  {
    id: 3,
    title: "Fonksiyonel Bantlama Teknikleri",
    instructor: "Uzm. Fzt. Mehmet Kaya",
    price: 3000,
    rating: 4.9,
    reviewCount: 14,
    image: "https://picsum.photos/400/250?random=3",
    category: "Manuel Terapi",
    duration: "15 Ders",
    students: 65
  },
  {
    id: 4,
    title: "İnmede Fizyoterapi ve Rehabilitasyon",
    instructor: "Dr. Zeynep Çelik",
    price: 1499,
    rating: 5.0,
    reviewCount: 7,
    image: "https://picsum.photos/400/250?random=4",
    category: "Nöroloji",
    duration: "2 Saat",
    students: 26
  }
];

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => [...prev, item]);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header cartItems={cartItems} />
      <Hero />
      <KnowledgeHub />
      <FeaturesBar />
      <Categories onAddToCart={handleAddToCart} />

      {/* Popular Courses */}
      <PopularCourses courses={courses} />

      <WebinarPromo />

      {/* Stats Counter */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
            <div>
              <div className="text-4xl font-bold text-teal-500 mb-2">%100</div>
              <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">Kişiye Özel Analiz</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-500 mb-2">7/24</div>
              <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">Dijital Erişim ve Destek</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-500 mb-2">Kanıta Dayalı</div>
              <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">Bilimsel Egzersiz Reçetesi</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">Birebir</div>
              <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">Fizyoterapist Takibi</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-gray-900 text-gray-300 pt-20 pb-10 w-full"
        style={{ scrollMarginTop: '140px' }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Marka ve vizyon */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src="/logo.png" alt="EgzersizLab Logo" className="h-10 w-auto" />
                <span className="text-xl font-bold text-white">EgzersizLab</span>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                EgzersizLab, bilimin ışığında kişiye özel rehabilitasyon ve egzersiz çözümleri sunan yeni nesil dijital
                sağlık platformudur. Hareket, en güçlü ilaçtır.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition cursor-pointer"
                  title="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition cursor-pointer"
                  title="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition cursor-pointer"
                  title="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Keşfet */}
            <div>
              <h4 className="text-white font-bold mb-6">Keşfet</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#process" className="hover:text-blue-400 transition">Sistem Nasıl İşliyor?</a></li>
                <li><a href="#packages" className="hover:text-blue-400 transition">Hizmet Paketleri</a></li>
                <li><a href="#blog" className="hover:text-blue-400 transition">Blog (Sağlık Rehberi)</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Sıkça Sorulan Sorular</a></li>
              </ul>
            </div>

            {/* Kurumsal */}
            <div>
              <h4 className="text-white font-bold mb-6">Kurumsal</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#about" className="hover:text-blue-400 transition">Hakkımızda</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">KVKK Aydınlatma Metni</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Mesafeli Satış Sözleşmesi</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">İptal ve İade Koşulları</a></li>
              </ul>
            </div>

            {/* İletişim */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Bize Ulaşın</h4>
              <div className="contact-item flex items-start gap-3 mb-4">
                <svg className="contact-icon w-5 h-5 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm">Teknopark İzmir / Türkiye</p>
              </div>
              <div className="contact-item flex items-start gap-3 mb-4">
                <svg className="contact-icon w-5 h-5 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="mailto:iletisim@egzersizlab.com" className="text-sm hover:text-blue-400 transition">
                  iletisim@egzersizlab.com
                </a>
              </div>
              <div className="contact-item flex items-start gap-3 mb-4">
                <svg className="contact-icon w-5 h-5 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a href="https://wa.me/905551234567" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-blue-400 transition">
                  WhatsApp: 0555 123 45 67
                </a>
              </div>
              <div className="contact-item flex items-start gap-3 mb-4">
                <svg className="contact-icon w-5 h-5 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <p className="text-sm">Pzt - Cuma: 09:00 - 18:00</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm gap-4">
            <p>© 2024 EgzersizLab. Tüm hakları saklıdır.</p>
            <div className="flex gap-6 flex-wrap justify-center">
              <a href="#" className="hover:text-white transition">Gizlilik Politikası</a>
              <a href="#" className="hover:text-white transition">Kullanım Şartları</a>
              <a href="#" className="hover:text-white transition">Çerez Politikası</a>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Assistant */}
      <GeminiAssistant />
    </div>
  );
}

export default App;
