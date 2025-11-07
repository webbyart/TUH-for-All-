
import { GoogleGenAI, Type } from "@google/genai";
import { InteractionResult, Drug } from "../types";

// IMPORTANT: Do NOT commit your API key to a public repository.
// The key is accessed via environment variables for security.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // A simple check to ensure the API key is available.
  // In a real app, you might have more robust error handling or a fallback.
  console.warn("Gemini API key is not set. Drug interaction features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const checkDrugInteractions = async (drugs: Drug[]): Promise<InteractionResult[]> => {
  if (drugs.length < 2) {
    return [];
  }
  
  const drugNames = drugs.map(d => d.name.en); // Use English names for the API

  if(!API_KEY) {
    // Simulate an API response for local development without an API key
    return new Promise(resolve => setTimeout(() => resolve([
      {
        drugA: drugNames[0],
        drugB: drugNames[1],
        interaction: {
            th: "นี่คือข้อมูลจำลอง: อาจทำให้เกิดอาการง่วงซึมเพิ่มขึ้น",
            en: "This is mock data: May cause increased drowsiness."
        },
        severity: "Moderate",
        recommendation: {
            th: "นี่คือข้อมูลจำลอง: ควรปรึกษาแพทย์หรือเภสัชกรก่อนใช้ยาร่วมกัน",
            en: "This is mock data: Consult a doctor or pharmacist before using together."
        }
      }
    ]), 1000));
  }

  const prompt = `Analyze the potential drug interactions between the following drugs: ${drugNames.join(', ')}. For each pair of interacting drugs, provide a JSON object containing: the names of the two drugs ('drugA', 'drugB'), the interaction description in both English and Thai ('interaction.en', 'interaction.th'), the severity ('severity'), and the recommendation in both English and Thai ('recommendation.en', 'recommendation.th').`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              drugA: { type: Type.STRING },
              drugB: { type: Type.STRING },
              interaction: { 
                type: Type.OBJECT,
                properties: {
                    en: { type: Type.STRING, description: "Interaction description in English." },
                    th: { type: Type.STRING, description: "Interaction description in Thai." }
                },
                required: ['en', 'th']
              },
              severity: {
                type: Type.STRING,
                enum: ['Mild', 'Moderate', 'Severe', 'Unknown'],
              },
              recommendation: { 
                type: Type.OBJECT,
                properties: {
                    en: { type: Type.STRING, description: "Recommendation in English." },
                    th: { type: Type.STRING, description: "Recommendation in Thai." }
                },
                required: ['en', 'th']
              },
            },
            required: ['drugA', 'drugB', 'interaction', 'severity', 'recommendation']
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const parsedResult = JSON.parse(jsonText);
    return parsedResult as InteractionResult[];

  } catch (error) {
    console.error("Error checking drug interactions:", error);
    throw new Error("ไม่สามารถตรวจสอบปฏิกิริยาระหว่างยาได้ในขณะนี้");
  }
};