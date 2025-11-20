import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let ai: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

export const initializeGemini = (apiKey: string) => {
  ai = new GoogleGenAI({ apiKey });
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    throw new Error("Gemini not initialized. Please set API Key.");
  }
  try {
    const result: GenerateContentResponse = await chatSession.sendMessage({ message });
    return result.text || "I processed that, but couldn't generate a text response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Communication error with the neural link. Please try again.";
  }
};
