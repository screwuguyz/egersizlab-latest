import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Kayıt Ol",
    desc: "Hesap oluştur ve sisteme giriş yap.",
    detail: "İlk adımda güvenli bir hesap açarak kişisel paneline erişirsin. Hesabınla birlikte ilerlemelerin ve kayıtların seninle kalır.",
    icon: "📝",
  },
  {
    id: 2,
    title: "Bilgileri Gir",
    desc: "Gerekli verileri sisteme gir.",
    detail: "Formları doldur, gerekli dokümanları ekle ve bize ihtiyaçlarını anlat. Sistem, eksiklerini adım adım bildirir.",
    icon: "⚙️",
  },
  {
    id: 3,
    title: "Sonuçları Al",
    desc: "Sistem analiz eder ve sonuçları gösterir.",
    detail: "Girilen bilgilere göre sana özel çıktılar, raporlar ve öneriler oluşur. Sonuçları kaydedebilir veya paylaşabilirsin.",
    icon: "✅",
  },
];

const KnowledgeHub = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const activeData = steps.find((s) => s.id === activeStep) ?? steps[0];

  return (
    <section
      id="process"
      className="py-16"
      style={{ scrollMarginTop: '140px' }}
    >
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#dbeafe] via-[#e9ecff] to-[#e0f5ff] border border-white shadow-xl">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -left-10 w-56 h-56 bg-blue-200/40 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-6 w-64 h-64 bg-indigo-200/40 rounded-full blur-3xl" />
          </div>

          <div className="relative p-6 md:p-10 lg:p-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Sistem Nasıl İşliyor?</h2>
              <p className="mt-3 text-base md:text-lg text-slate-600">
                Adımları keşfetmek için tıkla; her adımda ne yapman gerektiğini ve sistemin senin için ne üreteceğini gör.
              </p>
            </div>

            <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-8">
              {steps.map((step, idx) => (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => setActiveStep(step.id)}
                    className={`group text-left relative w-full max-w-[320px] bg-white/90 backdrop-blur border rounded-2xl px-6 py-8 shadow-md transition transform ${
                      activeStep === step.id
                        ? "border-blue-200 shadow-blue-200/60 -translate-y-1 ring-2 ring-blue-300"
                        : "hover:-translate-y-1 hover:shadow-lg border-gray-100"
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg ${
                        activeStep === step.id
                          ? "bg-gradient-to-br from-blue-600 to-teal-500"
                          : "bg-gradient-to-br from-slate-400 to-slate-500"
                      }`}>
                        {step.id}
                      </div>
                    </div>
                    <div className="text-5xl text-center mt-4">{step.icon}</div>
                    <h3 className="mt-4 text-xl font-semibold text-slate-900 text-center">{step.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 text-center leading-relaxed">{step.desc}</p>
                  </button>

                  {idx < steps.length - 1 && (
                    <div className="flex items-center justify-center text-slate-500 shrink-0">
                      <ArrowRight className="hidden md:inline-block" />
                      <ArrowRight className="md:hidden rotate-90" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="mt-10 bg-white/90 border border-gray-100 rounded-2xl p-6 shadow-md">
              <p className="text-sm font-semibold text-blue-700 mb-2">Adım {activeData.id}</p>
              <h4 className="text-2xl font-bold text-slate-900 mb-3">{activeData.title}</h4>
              <p className="text-base text-slate-700 leading-relaxed">{activeData.detail}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeHub;
