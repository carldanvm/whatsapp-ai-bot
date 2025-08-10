const { Anthropic } = require("@anthropic-ai/sdk");
const { OpenAI } = require("openai");
require("dotenv").config();
const { systemPrompt: configuredSystemPrompt, AIprovider } = require("./botConfig");

async function generateWithAnthropic(systemPrompt, userPrompt) {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-0",
    max_tokens: 1000,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });
  return response.content[0].text;
}

async function generateWithOpenAI(systemPrompt, userPrompt) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await openai.chat.completions.create({
    model: "gpt-5",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],  
  });
  return completion.choices?.[0]?.message?.content || "";
}

// Image generation (OpenAI only)
async function generateImageWithOpenAI(prompt, size = "1024x1024") {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const result = await openai.images.generate({
    model: "gpt-image-1",
    prompt,
    size,
    moderation: "low",
    quality: "low"
  });
  const b64 = result?.data?.[0]?.b64_json;
  if (!b64) throw new Error("OpenAI image generation returned no data");
  return b64;
}

module.exports.generateMessage = async (chatHistoryString, mainMessageToReply) => {
  if (!configuredSystemPrompt || typeof configuredSystemPrompt !== "string" || configuredSystemPrompt.trim() === "") {
    throw new Error("systemPrompt is required in config.json");
  }

  const systemPrompt = configuredSystemPrompt + `\n\nCHAT HISTORY:\n${chatHistoryString}`;
  const userPrompt = `MAIN MESSAGE TO RESPOND TO:\n${mainMessageToReply}`;

  try {
    if (AIprovider === "anthropic") {
      return await generateWithAnthropic(systemPrompt, userPrompt);
    }
    if (AIprovider === "openai") {
      return await generateWithOpenAI(systemPrompt, userPrompt);
    }
    throw new Error("Unsupported AIprovider. Use 'anthropic' or 'openai'.");
  } catch (error) {
    console.error("Error generating message:", error);
    return "Sorry, I'm not available right now.";
  }
};

module.exports.generateImage = async (prompt, size = "1024x1024") => {
  if (AIprovider !== "openai") {
    throw new Error("Image generation is only supported when AIprovider is 'openai'.");
  }
  try {
    return await generateImageWithOpenAI(prompt, size);
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};
