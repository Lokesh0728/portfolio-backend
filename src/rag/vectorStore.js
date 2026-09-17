import { PORTFOLIO_CHUNKS } from './documents.js';

/**
 * In-Memory Vector Store & Semantic Retriever
 * 
 * Implements the Vector Space Model with TF-IDF and Cosine Similarity:
 * 1. Tokenization & Stopword Filtering
 * 2. Term Frequency (TF) & Inverse Document Frequency (IDF) Vectorization
 * 3. Dot-Product Cosine Similarity Ranking: cos(θ) = (A · B) / (||A|| * ||B||)
 */

const STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
  'is', 'are', 'was', 'were', 'it', 'its', 'he', 'his', 'him', 'this', 'that',
  'by', 'from', 'as', 'into', 'about', 'tell', 'me', 'what', 'who', 'how', 'can'
]);

class InMemoryVectorStore {
  constructor(documents = []) {
    this.documents = documents;
    this.vocabulary = new Map(); // term -> index
    this.docVectors = [];        // array of Float32Array normalized vectors
    this.idf = [];               // array of IDF weights per term
    this.initialize();
  }

  // Tokenize text: lowercase, strip punctuation, filter stopwords
  tokenize(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 1 && !STOPWORDS.has(w));
  }

  // Build the TF-IDF Vector Space Model
  initialize() {
    const N = this.documents.length;
    if (N === 0) return;

    // 1. Build Vocabulary & Document Frequencies
    const docTokenLists = this.documents.map((doc) => {
      const fullText = `${doc.title} ${doc.content}`;
      return this.tokenize(fullText);
    });

    const docFreq = new Map();

    docTokenLists.forEach((tokens) => {
      const uniqueTokens = new Set(tokens);
      uniqueTokens.forEach((token) => {
        docFreq.set(token, (docFreq.get(token) || 0) + 1);
        if (!this.vocabulary.has(token)) {
          this.vocabulary.set(token, this.vocabulary.size);
        }
      });
    });

    const vocabSize = this.vocabulary.size;

    // 2. Compute IDF: ln(1 + N / DF)
    this.idf = new Float32Array(vocabSize);
    for (const [token, index] of this.vocabulary.entries()) {
      const df = docFreq.get(token) || 1;
      this.idf[index] = Math.log(1 + N / df);
    }

    // 3. Compute normalized TF-IDF vector for each document
    this.docVectors = docTokenLists.map((tokens) => {
      return this.createVector(tokens);
    });
  }

  // Create L2-normalized vector for a list of tokens
  createVector(tokens) {
    const vocabSize = this.vocabulary.size;
    const vector = new Float32Array(vocabSize);

    if (tokens.length === 0) return vector;

    // Term frequencies
    const tfMap = new Map();
    tokens.forEach((t) => tfMap.set(t, (tfMap.get(t) || 0) + 1));

    let norm = 0;
    for (const [token, count] of tfMap.entries()) {
      const idx = this.vocabulary.get(token);
      if (idx !== undefined) {
        const tf = count / tokens.length;
        const weight = tf * this.idf[idx];
        vector[idx] = weight;
        norm += weight * weight;
      }
    }

    // L2 Normalization (so vector magnitude = 1.0)
    norm = Math.sqrt(norm);
    if (norm > 0) {
      for (let i = 0; i < vocabSize; i++) {
        vector[i] /= norm;
      }
    }

    return vector;
  }

  // Cosine Similarity between two L2-normalized vectors is simply their dot product!
  cosineSimilarity(vecA, vecB) {
    let dot = 0;
    const len = vecA.length;
    for (let i = 0; i < len; i++) {
      dot += vecA[i] * vecB[i];
    }
    return dot;
  }

  /**
   * Semantic Search: Query retrieval
   * Returns top-K most relevant chunks with similarity score
   */
  search(query, topK = 3) {
    const queryTokens = this.tokenize(query);
    const queryVector = this.createVector(queryTokens);

    const scored = this.documents.map((doc, idx) => {
      const score = this.cosineSimilarity(queryVector, this.docVectors[idx]);
      return {
        ...doc,
        score: Number(score.toFixed(4)),
      };
    });

    // Sort descending by similarity score
    scored.sort((a, b) => b.score - a.score);

    // Filter out zero similarity and take topK
    const results = scored.filter((item) => item.score > 0).slice(0, topK);

    // Fallback if no specific keywords matched: return the top bio overview
    if (results.length === 0) {
      return [this.documents[0]];
    }

    return results;
  }
}

// Singleton export
export const vectorStore = new InMemoryVectorStore(PORTFOLIO_CHUNKS);
