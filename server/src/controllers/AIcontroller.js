import main from "../configs/geminiAi.js";
import handleError from "../utils/handleError.js";

// AI Integration
export const generateTitle = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res
        .status(400)
        .json({ message: "Category is required to generate a title" });
    }
    const title = await main(`
        Category: ${prompt}
      Generate a long, catchy, modern blog title based on the category. 
      Output ONLY the title text, nothing else.
        `);
    res.status(200).json(title);
  } catch (error) {
    handleError(res, error.message);
  }
};

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res
        .status(400)
        .json({ message: "A blog title is required to generate the content." });
    }
    const content = await main(
      `Write a long, engaging blog post based on this title: "${prompt}". 
      Create a captivating introduction, clear structure, and a strong conclusion. 
      Use a modern, natural tone that reads smoothly. 
      Avoid lists unless necessary. 
      Return only the final blog content in clean text format.`
    );
    res.status(200).json(content);
  } catch (error) {
    handleError(res, error.message);
  }
};

export const optimizeContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res
        .status(400)
        .json({ message: "Content is required to run optimization" });
    }
    const content = await main(
      `${prompt}. 
     Rewrite and optimize this blog content. 
     Improve clarity, flow, readability, grammar, and engagement. 
     Keep the meaning the same. 
     Return only the improved content in clean text format.`
    );
    res.status(200).json(content);
  } catch (error) {
    handleError(res, error.message);
  }
};

export const generateTags = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({
        message: "Blog content is required to generate relevant tags.",
      });
    }
    const content = await main(
      `Analyze the following blog content and extract exactly 5 relevant tags. 
      Each tag should be a short keyword or phrase. 
      Do not include hashtags, numbering, bullet points, or extra text. 
      Return only the 5 tags in a comma-separated list.
      
      Content: ${prompt}`
    );
    res.status(200).json(content);
  } catch (error) {
    handleError(res, error.message);
  }
};

export const generateReadTime = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({
        message:
          "Blog content is required to calculate an estimated reading time.",
      });
    }
    const content = await main(
      `Analyze the following blog content and calculate an estimated reading time.
       Return only the reading time as a short value like "5 mins" or "3 minutes".
       Do not include any explanation, intro text, or additional words.
       
       Content: ${prompt}`
    );
    res.status(200).json(content);
  } catch (error) {
    handleError(res, error.message);
  }
};

export const generateSentiment = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({
        message:
          "Blog content is required to generate a sentiment analysis result.",
      });
    }
    const content = await main(
      `Analyze the sentiment of the following blog content.
      Return only one word: Positive, Negative, or Neutral.
      Do not include explanations or additional text.
      
      Content: ${prompt}`
    );
    res.status(200).json(content);
  } catch (error) {
    handleError(res, error.message);
  }
};

export const generateSearchSummary = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return;
    }
    const aiSummary = await main(
      `You are a helpful assistant that explains topics in a clear, human, friendly, and engaging way.

The user searched for the following topic.  
Write a brief overview that:
- feels conversational and helpful,
- is factual and easy to understand,
- gives context around the topic,
- mentions what people typically look for when searching this topic,
- and stays under 120 words.

If the search term is vague, unclear, or misspelled, interpret it and still give the best possible explanation.

Search Term: "${prompt}`
    );
    res.status(200).json(aiSummary);
  } catch (error) {
    handleError(res, error.message);
  }
};
