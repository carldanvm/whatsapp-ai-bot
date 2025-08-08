const { validateMessage } = require('./messageValidator');
const { processMessage } = require('./messageProcessor');
const { logRejectedMessage } = require('./messageLogger');

// Simple queue management - maximum 3 concurrent messages
let processingCount = 0;
const MAX_CONCURRENT_MESSAGES = 3;

/**
 * Main handler for processing incoming messages
 * @param {Object} message - WhatsApp message
 */
module.exports.handleMessage = async (message) => {
    try {
        const contact = await message.getContact();
        const chat = await message.getChat();
        
        // Validate if the message should be processed
        const validation = await validateMessage(message, contact, chat);
        
        if (validation.shouldProcessContact || validation.shouldProcessGroup) {
            // Check if we're at capacity
            if (processingCount >= MAX_CONCURRENT_MESSAGES) {
                // Send busy message and return
                await message.reply("🤖 I'm currently busy processing other messages. Please try again in a moment.");
                return;
            }
            
            // Increment processing counter
            processingCount++;
            
            try {
                if (validation.shouldProcessContact) {
                    // Process individual contact message
                    await processMessage(message, contact, chat, 'contact');
                } else {
                    // Process group message
                    await processMessage(message, contact, chat, 'group');
                }
            } finally {
                // Always decrement counter when done
                processingCount--;
            }
        } 
        else {
            // Log rejected message
            logRejectedMessage(validation.isTriggered, contact, chat);
        }
    } catch (error) {
        console.error("❌ Error in message handler:", error);
    }
};
