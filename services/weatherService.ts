import { GoogleGenAI } from "@google/genai";
import { WeatherResponse, WeatherData } from "../types";

// Initialize the client with the API key from the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchWeather = async (city: string): Promise<WeatherResponse> => {
  try {
    // We use gemini-2.5-flash for speed and search capability
    const modelId = 'gemini-2.5-flash';

    const prompt = `
      Search for the current weather in ${city}.
      I need the current temperature (Celsius and Fahrenheit), weather condition (e.g., Sunny, Cloudy), humidity, wind speed, and a brief 1-sentence description.
      Also, find the temperature forecast for the next 5 hours.

      Return the data strictly as a JSON object. Do not include markdown formatting like \`\`\`json.
      The JSON structure must be:
      {
        "city": "${city}",
        "temp_c": number,
        "temp_f": number,
        "condition": "string",
        "humidity": "string",
        "wind": "string",
        "description": "string",
        "forecast": [
          { "time": "HH:MM", "temp": number (in Celsius) },
          ... (next 5 hours)
        ]
      }
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // Note: responseMimeType and responseSchema are NOT supported when using googleSearch tool
        // so we rely on the prompt to get JSON.
      },
    });

    const text = response.text || "{}";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    // Clean up the response if it contains markdown code blocks
    let cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    // Sometimes the model adds extra text before or after the JSON
    const jsonStartIndex = cleanText.indexOf('{');
    const jsonEndIndex = cleanText.lastIndexOf('}');
    
    if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
      cleanText = cleanText.substring(jsonStartIndex, jsonEndIndex + 1);
    }

    let weatherData: WeatherData | null = null;
    try {
      weatherData = JSON.parse(cleanText);
    } catch (e) {
      console.error("Failed to parse weather JSON:", e, cleanText);
      // Fallback: If parsing fails, we might still have useful text, but for this app strictly expecting data, return null
    }

    return {
      data: weatherData,
      sources: groundingChunks as any[], // Casting for simplified handling
      rawText: text
    };

  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};
