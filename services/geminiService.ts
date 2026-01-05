
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateMotivation = async () => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: "Génère une citation de motivation courte et inspirante pour un leader de la Jeune Chambre Internationale (JCI). Réponds uniquement avec un JSON: { 'quote': 'text', 'author': 'name' }",
      config: {
        responseMimeType: "application/json",
      },
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return { quote: "L'action est la clé fondamentale de tout succès.", author: "Pablo Picasso" };
  }
};

export const generateAnniversaryText = async (name: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: `Génère un message d'anniversaire chaleureux et professionnel pour un membre JCI nommé ${name}. Garde-le court (max 10 mots).`,
    });
    return response.text.trim();
  } catch (error) {
    return `Joyeux Anniversaire à notre cher membre ${name} !`;
  }
};
