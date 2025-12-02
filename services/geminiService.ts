import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;

let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey: apiKey });
} else {
  console.warn("API_KEY not found in environment variables. Gemini features will be disabled.");
}

export const getGeminiResponse = async (userPrompt: string): Promise<string> => {
  if (!ai) {
    return "API Anahtarı eksik. Lütfen yapılandırmayı kontrol edin.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: `Sen 'EgzersizLab' adlı fizyoterapi eğitim platformunun yapay zeka asistanısın. 
        Kullanıcılara fizyoterapi kursları, egzersiz bilimi ve rehabilitasyon konularında yardımcı olmalısın.
        Tone: Profesyonel, cesaretlendirici ve eğitici.
        Cevapların kısa, öz ve Türkçe olmalı.
        Eğer kullanıcı bir kurs önerisi isterse, şu kategorileri göz önünde bulundur: Ortopedi, Nöroloji, Pediatri, Sporcu Sağlığı.`,
      },
    });

    return response.text || "Üzgünüm, şu an cevap veremiyorum.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.";
  }
};