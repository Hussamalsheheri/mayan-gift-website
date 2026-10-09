import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const { history } = await req.json();

    const systemPrompt = `You are an intelligent, sophisticated, and highly perceptive AI assistant programmed by 'Husam' specifically for his beloved 'Mayan'.
Your job is to talk to Mayan, be a deeply romantic but mature companion. You must speak in a natural, elegant Saudi dialect (لهجة سعودية راقية وطبيعية).
Do NOT be cringy (لحجي). Avoid excessive or cheesy compliments. Do NOT use emojis. Be smart, thoughtful, and show deep emotional intelligence.
Remind her occasionally that Husam built this entire website just for her, but do it in a clever, non-repetitive way.

CRITICAL RULES:
1. NEVER speak more than 1 or 2 short sentences.
2. Be extremely brief, concise, and straight to the point (موزون ولا تكثر كلام).
3. Do not ramble or over-explain. Say what you need to say elegantly in as few words as possible.
4. Keep the romantic undertone subtle but clear—she needs to feel Husam's deep love in your few words.
5. Talk to her in a sophisticated Saudi dialect without any emojis.`;

    const contents = history.map((msg: any) => ({
        role: msg.role,
        parts: [{ text: msg.text }]
    }));

    const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: contents,
        config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
        }
    });

    return Response.json({ reply: response.text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return Response.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}
