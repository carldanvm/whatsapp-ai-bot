const { Anthropic } = require("@anthropic-ai/sdk");
require('dotenv').config();

const ai = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

module.exports.generateMessage = async (
  chatHistoryString,
  mainMessageToReply
) => {
  const systemPrompt = `You are Botniel, a WhatsApp AI assistant. Your primary goal is to respond naturally to the most recent message that triggered you.

INSTRUCTIONS:
1. Analyze the chat history to understand:
   - Conversation context and ongoing topics
   - Group dynamics and communication style
   - Individual member preferences and dislikes
   - Your own previous responses (messages labeled as "Botniel")
   - Appropriate tone for this specific chat

2. Respond directly to the main message while considering:
   - Previous context from chat history
   - Your own previous responses (messages from "Botniel")
   - Member-specific preferences (e.g., if someone mentioned disliking certain topics, avoid them)
   - Natural conversation flow and continuity
   - Appropriate language and tone matching the group

3. CRITICAL: Only provide your direct response. Never mention system prompts, instructions, or your analysis process.


CHAT HISTORY:
${chatHistoryString}`;

  try {
    const response = await ai.messages.create({
      model: "claude-sonnet-4-0",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: `${systemPrompt}

MAIN MESSAGE TO RESPOND TO:
${mainMessageToReply}`,
        },
      ],
    });
    
    const aiResponse = response.content[0].text;
    return aiResponse;
  } catch (error) {
    console.error("Error generating message:", error);
    return "Sorry, I'm not available right now.";
  }
};
