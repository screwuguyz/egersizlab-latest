import React from 'react';
import { Check, X } from 'lucide-react';

const packages = [
  {
    id: 'basic',
    title: 'Temel Analiz & Egzersiz Planı',
    tagline: 'Vücudunuzun neye ihtiyacı olduğunu öğrenin ve hemen başlayın.',
    features: [
      'Detaylı anamnez değerlendirmesi',
      'Fizyoterapist tarafından vaka analizi',
      '4-6 haftalık kişiye özel egzersiz reçetesi',
      'Egzersiz videoları ve açıklamaları',
    ],
    note: 'Takip ve revizyon hizmeti içermez',
    recommended: false,
  },
  {
    id: 'recommended',
    title: 'Klinik Takip & İlerleme Paketi',
    tagline: 'Sadece bir liste değil, dinamik bir iyileşme süreci.',
    features: [
      'Temel paketteki tüm hizmetler',
      'Haftalık kontrol ve değerlendirme',
      'Ağrı ve gelişime göre program revizyonu',
      'Sistem üzerinden soru-cevap hakkı',
      '1 aylık aktif takip',
    ],
    recommended: true,
    badge: 'Fizyoterapist önerisi',
  },
  {
    id: 'premium',
    title: 'Premium Danışmanlık & Video Analizi',
    tagline: 'Fizyoterapistiniz cebinizde - yanlış yapma riskini sıfıra indirin.',
    features: [
      'Tüm paketlerdeki hizmetler',
      'Video analizi: Egzersizlerinizi kaydedin, geri bildirim alın',
      'Hızlı destek (chat/WhatsApp)',
      'Öncelikli değerlendirme (aynı gün dönüş)',
      'Sınırsız program güncellemesi',
    ],
    recommended: false,
  },
];

const Categories = () => {
  return (
    <section
      id="packages"
      className="relative overflow-hidden"
      style={{ scrollMarginTop: '140px' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#e3ecff] via-[#e8eaff] to-[#e3f4ff]" />
      <div className="absolute -top-24 -left-16 w-64 h-64 bg-blue-300/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-10 w-72 h-72 bg-indigo-300/25 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hizmet Paketleri
          </h2>
          <p className="mt-3 text-base md:text-lg text-slate-600">
            Bilimsel egzersiz reçetenizi alın, iyileşme sürecinizi profesyonel kontrolde yönetin.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-white/90 border rounded-2xl p-8 shadow-lg backdrop-blur card-shadow ${
                pkg.recommended ? 'border-blue-200 ring-2 ring-blue-200/70' : 'border-gray-100'
              }`}
            >
              {pkg.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white text-xs font-semibold shadow-md">
                  {pkg.badge}
                </div>
              )}

              <h3 className="text-2xl font-bold text-slate-900 mb-2">{pkg.title}</h3>
              <p className="text-slate-600 text-sm mb-6">{pkg.tagline}</p>

              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                Paket içeriği
              </h4>
              <ul className="space-y-3">
                {pkg.features.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700 leading-relaxed">
                    <span className="check-icon inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600">
                      <Check size={14} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
                {pkg.note && (
                  <li className="flex items-start gap-3 text-slate-500 italic">
                    <span className="cross-icon inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-100 text-rose-500">
                      <X size={14} />
                    </span>
                    <span>{pkg.note}</span>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md">
            <div className="flex items-start gap-3">
              <div className="text-3xl">📊</div>
              <div>
                <h5 className="text-lg font-bold text-slate-900 mb-1">Bilimsel Not</h5>
                <p className="text-slate-700 leading-relaxed">
                  Egzersiz tedavisi ilaç gibidir; adaptasyon için zamana ihtiyaç vardır. Literatür,
                  anlamlı iyileşme için en az 4-6 hafta düzenli uygulama önerir.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md">
            <div className="flex items-start gap-3">
              <div className="text-3xl">✅</div>
              <div>
                <h5 className="text-lg font-bold text-slate-900 mb-1">Memnuniyet Garantisi</h5>
                <p className="text-slate-700 leading-relaxed">
                  Program size uymazsa ilk hafta içinde ücretsiz revizyon hakkınız var.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
