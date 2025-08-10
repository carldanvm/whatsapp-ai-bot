const { triggerWord, allowedToReplyContacts, allowedToReplyChats } = require('./botConfig');

/**
 * Validates if a message should be processed by the bot
 * @param {Object} message - WhatsApp message
 * @param {Object} contact - Contact who sent the message
 * @param {Object} chat - Chat where the message was sent
 * @returns {Object} Validation result
 */
module.exports.validateMessage = async (message, contact, chat) => {
    // Don't respond to messages sent by the bot itself
    /* if (message.fromMe) {
        console.log("🚫 Message rejected: sent by bot itself");
        return {
            isTriggered: false,
            shouldProcessContact: false,
            shouldProcessGroup: false
        };
    } */
    
    const contactNameLower = contact.name?.toLowerCase() || "";
    const chatNameLower = chat.name?.toLowerCase() || "";
    
    const isAllowedContact = allowedToReplyContacts.includes(contactNameLower) || 
                            allowedToReplyContacts.includes(contact.number);
    
    const isAllowedChat = allowedToReplyChats.includes(chatNameLower) || 
                         allowedToReplyChats.includes(chat.id);
    
    // If triggerWord is empty/undefined, trigger on any non-self message
    const normalizedTrigger = (triggerWord || "").toLowerCase();
    const isTriggered = normalizedTrigger === "" 
        ? true 
        : message.body.toLowerCase().includes(normalizedTrigger);
    
    return {
        isTriggered,
        shouldProcessContact: !chat.isGroup && isAllowedContact && isTriggered,
        shouldProcessGroup: chat.isGroup && isAllowedChat && isTriggered
    };
};
