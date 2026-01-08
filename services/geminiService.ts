
import { GoogleGenAI, Type } from "@google/genai";

// Always use process.env.API_KEY for initialization
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMotivation = async () => {
  try {
    const response = await ai.models.generateContent({
      // Use 'gemini-3-flash-preview' for basic text tasks
      model: "gemini-3-flash-preview",
      contents: "Génère une citation de motivation courte et inspirante pour un leader de la Jeune Chambre Internationale (JCI).",
      config: {
        responseMimeType: "application/json",
        // Use responseSchema for structured JSON output
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quote: {
              type: Type.STRING,
              description: "The motivational quote text.",
            },
            author: {
              type: Type.STRING,
              description: "The author of the quote.",
            },
          },
          required: ["quote", "author"],
        },
      },
    });
    // Access text property directly
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Error:", error);
    return { quote: "L'action est la clé fondamentale de tout succès.", author: "Pablo Picasso" };
  }
};

export const generateAnniversaryText = async (name: string) => {
  try {
    const response = await ai.models.generateContent({
      // Use 'gemini-3-flash-preview' for basic text tasks
      model: "gemini-3-flash-preview",
      contents: `Génère un message d'anniversaire chaleureux et professionnel pour un membre JCI nommé ${name}. Garde-le court (max 10 mots).`,
    });
    // Access text property directly
    return response.text?.trim() || `Joyeux Anniversaire à notre cher membre ${name} !`;
  } catch (error) {
    return `Joyeux Anniversaire à notre cher membre ${name} !`;
  }
};
