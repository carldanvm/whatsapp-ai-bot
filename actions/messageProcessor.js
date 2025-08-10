const { getChatHistoryString } = require('./getChatHistoryString');
const { generateMessage, generateImage } = require('./generateMessage');
const { MessageMedia } = require('whatsapp-web.js');

/**
 * Processes a valid message and generates a Botniel response
 * @param {Object} message - WhatsApp message
 * @param {Object} contact - Contact who sent the message
 * @param {Object} chat - Chat where the message was sent
 * @param {string} messageType - Message type ('contact' or 'group')
 */
module.exports.processMessage = async (message, contact, chat, messageType) => {
    try {
        console.log(`✅ Triggered from allowed ${messageType}:`, 
                   messageType === 'contact' ? contact.name : chat.name, 
                   "| Is group:", chat.isGroup);
        
        // Get chat history
        const chatHistoryString = await getChatHistoryString(chat);
        const mainMessageToReply = contact.name + ": " + message.body;
        
        console.log("📝 Chat History:", chatHistoryString);

        // Image generation command: allow '/generateimage' anywhere (e.g., '<trigger> /generateimage ...')
        const rawBody = String(message.body || "");
        const marker = "/generateimage";
        const lower = rawBody.toLowerCase();
        const idx = lower.indexOf(marker);
        if (idx !== -1) {
            const prompt = rawBody.slice(idx + marker.length).trim();
            if (!prompt) {
                await message.reply("Please provide a description after '/generateimage'.");
                return { success: false, error: "empty image prompt" };
            }
            await message.reply("Processing your image request...");
            console.log("🖼️ Generating image with prompt:", prompt);
            try {
                const b64 = await generateImage(prompt, "1024x1024");
                const media = new MessageMedia("image/png", b64, "image.png");
                await message.reply(media);
                console.log("📤 Image sent successfully");
                return { success: true, response: "[image sent]" };
            } catch (imgErr) {
                console.error("❌ Error generating/sending image:", imgErr);
                await message.reply("Sorry, I couldn't generate that image right now.");
                return { success: false, error: imgErr.message };
            }
        }
        
        // Generate response with Claude
        console.log("🤖 Generating Botniel response...");
        const aiResponse = await generateMessage(chatHistoryString, mainMessageToReply);
        
        console.log("📤 Botniel response:", aiResponse);
        
        // Send response
        await message.reply(aiResponse);
        
        return { success: true, response: aiResponse };
    } catch (error) {
        console.error("❌ Error processing message:", error);
        await message.reply("Sorry, I had a problem processing your message.");
        return { success: false, error: error.message };
    }
};
