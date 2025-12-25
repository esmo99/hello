import { GoogleGenAI, Type } from "@google/genai";
import { GreetingData, GreetingStyle } from "../types";

// Initialize Gemini Client
// Note: In a real environment, ensure process.env.API_KEY is set.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateGreeting = async (style: GreetingStyle): Promise<GreetingData> => {
  // Fallback for standard to save tokens and be instant
  if (style === GreetingStyle.STANDARD) {
    return {
      text: "Hello World!",
      language: "English",
      description: "The classic greeting that started it all.",
      codeSnippet: 'console.log("Hello World!");'
    };
  }

  const model = "gemini-3-flash-preview";
  
  const prompt = `Generate a 'Hello World' greeting in the style of: ${style}. 
  If the style involves a specific programming language (like 'Code'), choose a popular one other than simple console.log if possible, or make it creative.
  If the style is 'Alien', make it sound sci-fi.
  If the style is 'Norwegian', translate it to 'Hei Verden!' or something culturally witty.
  
  Return a JSON object.`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: {
              type: Type.STRING,
              description: "The actual greeting text (e.g., 'Ahoy, World!').",
            },
            language: {
              type: Type.STRING,
              description: "The language or style name (e.g., 'Pirate Speak', 'Python', 'Norwegian').",
            },
            description: {
              type: Type.STRING,
              description: "A short, fun fact or context about this specific greeting style.",
            },
            codeSnippet: {
              type: Type.STRING,
              description: "Optional: If applicable, a small code snippet representation. If not applicable, leave empty.",
            },
          },
          required: ["text", "language", "description"],
        },
      },
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("Empty response from Gemini");
    }

    return JSON.parse(jsonText) as GreetingData;

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback in case of API error
    return {
      text: "Hello World (Offline)",
      language: "System",
      description: "We couldn't connect to the AI, but we're still happy to see you.",
      codeSnippet: `Error: ${error instanceof Error ? error.message : "Unknown error"}`
    };
  }
};