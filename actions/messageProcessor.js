const { getChatHistoryString } = require('./getChatHistoryString');
const { generateMessage } = require('./generateMessage');

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
