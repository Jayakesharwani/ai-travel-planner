import { GoogleGenAI } from '@google/genai';
import { env } from '../config/env';

console.log('Gemini service loaded');

const genAI = new GoogleGenAI({
apiKey: env.geminiApiKey,
});

export class GeminiService {
    async generateTravelPlan(input: {
        destination: string;
        startDate: Date;
        endDate: Date;
        budget: number;
        interests: string[];
      }) {
        const prompt = `
      You are an AI Travel Advisor.
      
      Destination: ${input.destination}
      Start Date: ${input.startDate}
      End Date: ${input.endDate}
      Budget: ${input.budget}
      Interests: ${input.interests.join(', ')}
      
      Return ONLY valid JSON.
      
      Do not use markdown.
      Do not use code fences.
      Do not include explanations.
      
      {
        "itinerary": {
          "days": [
            {
              "day": 1,
              "activities": [
                {
                  "time": "09:00",
                  "title": "Activity name",
                  "description": "Short description"
                }
              ]
            }
          ]
        },
      
        "budgetEstimate": {
          "flights": 0,
          "accommodation": 0,
          "food": 0,
          "activities": 0,
          "total": 0
        },
      
        "destinationNotes": [
          "note 1",
          "note 2"
        ],
      
        "hotelSuggestions": [
          {
            "name": "Hotel Name",
            "category": "Budget"
          }
        ]
      }
      `;
      
        try {
          const response = await genAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
          });
      
          const text = response.text ?? '';
      
          const cleaned = text
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();
      
          return JSON.parse(cleaned);
        } catch (error) {
          console.log('Gemini failed. Retrying in 3 seconds...');
      
          await new Promise((resolve) => setTimeout(resolve, 3000));
      
          try {
            const retryResponse = await genAI.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: prompt,
            });
      
            const retryText = retryResponse.text ?? '';
      
            const cleaned = retryText
              .replace(/```json/g, '')
              .replace(/```/g, '')
              .trim();
      
            return JSON.parse(cleaned);
          } catch (retryError) {
            console.log(
              'Gemini still unavailable. Using fallback travel plan.'
            );
      
            return this.generateFallbackPlan(input);
          }
        }
      }

private generateFallbackPlan(input: {
  destination: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  interests: string[];
}) {
  return {
    itinerary: {
      days: [
        {
          day: 1,
          activities: [
            {
              time: '09:00',
              title: `Explore ${input.destination}`,
              description: 'Visit famous attractions and city center.',
            },
            {
              time: '14:00',
              title: 'Local Food Tour',
              description: 'Experience popular local cuisine.',
            },
          ],
        },
        {
          day: 2,
          activities: [
            {
              time: '10:00',
              title: 'Cultural Sightseeing',
              description: 'Visit museums and historical landmarks.',
            },
          ],
        },
      ],
    },

    budgetEstimate: {
      flights: Math.round(input.budget * 0.35),
      accommodation: Math.round(input.budget * 0.30),
      food: Math.round(input.budget * 0.20),
      activities: Math.round(input.budget * 0.15),
      total: input.budget,
    },

    destinationNotes: [
      `Best time to explore ${input.destination} is during the morning.`,
      'Keep local currency available.',
      'Check weather before travelling.',
    ],

    hotelSuggestions: [
      {
        name: `${input.destination} Budget Inn`,
        category: 'Budget',
      },
      {
        name: `${input.destination} Grand Hotel`,
        category: 'Luxury',
      },
    ],
  };
}

}

export const geminiService = new GeminiService();