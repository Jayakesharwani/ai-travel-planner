import { Router } from 'express';
import { GoogleGenAI } from '@google/genai';

const router = Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

router.get('/', async (_req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Say hello in one sentence',
    });

    res.json({
      success: true,
      text: response.text,
    });
  } catch (error) {
    console.error('GEMINI TEST ERROR:', error);

    res.status(500).json({
      success: false,
      error: String(error),
    });
  }
});

export default router;