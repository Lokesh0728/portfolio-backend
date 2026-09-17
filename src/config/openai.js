import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

/**
 * OpenAI Client Configuration
 * 
 * Why this design?
 * We use the official OpenAI JavaScript SDK.
 * By setting `baseURL` optionally from the environment, this exact configuration
 * works seamlessly with:
 * 1. Standard OpenAI (api.openai.com)
 * 2. OpenAI-compatible providers like Groq, DeepSeek, or Azure OpenAI
 * 
 * No hardcoded API keys exist here; everything is pulled securely from process.env.
 */

if (!process.env.OPENAI_API_KEY) {
  console.warn('⚠️ WARNING: OPENAI_API_KEY is not set in backend/.env');
}

const config = {
  apiKey: process.env.OPENAI_API_KEY,
};

// If a custom base URL is specified (e.g. Groq or Azure), apply it
if (process.env.OPENAI_BASE_URL) {
  config.baseURL = process.env.OPENAI_BASE_URL;
}

export const openai = new OpenAI(config);
