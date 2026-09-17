import { generateRAGResponse } from '../rag/rag.service.js';

/**
 * Chat Controller (RAG Enabled)
 * 
 * HTTP Layer Responsibilities:
 * 1. Validates incoming request payload (type, non-empty, max length).
 * 2. Delegates query to the RAG (Retrieval-Augmented Generation) pipeline.
 * 3. Returns HTTP 200 JSON with AI reply and retrieved sources.
 * 4. Forwards exceptions to error middleware via next(err).
 */
export const handleChatMessage = async (req, res, next) => {
  try {
    const { message, history } = req.body;

    // 1. Validation: Check message existence & type
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: 'A non-empty message string is required in the request body.',
      });
    }

    // 2. Validation: Request length constraint (prevent flood/injection attacks)
    const trimmedMessage = message.trim();
    if (trimmedMessage.length > 500) {
      return res.status(400).json({
        success: false,
        error: 'Message is too long. Please limit your question to 500 characters.',
      });
    }

    // 3. Validation: Optional history array check
    if (history && !Array.isArray(history)) {
      return res.status(400).json({
        success: false,
        error: 'History, if provided, must be an array of message objects.',
      });
    }

    // 4. Call the RAG service layer
    const result = await generateRAGResponse({
      message: trimmedMessage,
      history: history || [],
    });

    // 5. Send clean JSON response
    return res.status(200).json({
      success: true,
      reply: result.reply,
      sources: result.retrievedSources,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // Pass to central error middleware
    next(error);
  }
};
