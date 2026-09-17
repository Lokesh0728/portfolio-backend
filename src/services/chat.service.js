import { openai } from '../config/openai.js';
import { getSystemPrompt } from '../data/portfolioContext.js';

/**
 * Chat Service
 * 
 * Handles the pure AI logic:
 * 1. Formats the conversation history (context memory).
 * 2. Injects system instructions and portfolio knowledge.
 * 3. Communicates with OpenAI SDK.
 * 4. Limits token output and prevents hallucinations via low temperature (0.3).
 */
export const generateChatResponse = async ({ message, history = [] }) => {
  // Validate model configuration from environment
  const model = process.env.OPENAI_MODEL || 'openai/gpt-oss-120b';

  // 1. Prepare system prompt with verified portfolio context
  const systemMessage = {
    role: 'system',
    content: getSystemPrompt(),
  };

  // 2. Prepare conversation memory:
  // We sanitize and take only the last 6 messages from history to:
  // a) Keep conversational context (e.g. "Tell me more about the first one")
  // b) Prevent runaway token usage and avoid exceeding model context limits
  const sanitizedHistory = history
    .slice(-6)
    .filter(
      (msg) =>
        (msg.role === 'user' || msg.role === 'assistant') &&
        typeof msg.content === 'string'
    )
    .map((msg) => ({
      role: msg.role,
      content: msg.content.trim(),
    }));

  // 3. Assemble full messages array
  const messages = [
    systemMessage,
    ...sanitizedHistory,
    {
      role: 'user',
      content: message.trim(),
    },
  ];

  try {
    // 4. Call the AI model
    const completion = await openai.chat.completions.create({
      model,
      messages,
      temperature: 0.3, // Low temperature ensures factual adherence and prevents hallucinating
      max_tokens: 450,   // Sufficient for clear answers while keeping generation fast and economical
    });

    const reply = completion.choices?.[0]?.message?.content;

    if (!reply) {
      throw new Error('Received an empty response from AI model.');
    }

    return reply;
  } catch (error) {
    console.error('[OpenAI Service Error]:', error.message);

    // Map common error codes to informative developer messages
    if (error.status === 401) {
      const err = new Error('Invalid API Key. Please verify your OPENAI_API_KEY in backend/.env.');
      err.statusCode = 401;
      throw err;
    }
    if (error.status === 429) {
      const err = new Error('AI provider rate limit or quota reached. Please try again shortly.');
      err.statusCode = 429;
      throw err;
    }

    throw error;
  }
};
