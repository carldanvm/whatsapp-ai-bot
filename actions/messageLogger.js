/**
 * Handles logging of non-processed messages
 * @param {boolean} isTriggered - Whether the message was triggered
 * @param {Object} contact - Contact who sent the message
 * @param {Object} chat - Chat where the message was sent
 */
module.exports.logRejectedMessage = (isTriggered, contact, chat) => {
    const reason = !isTriggered ? "not triggered" : "not allowed to reply";
    console.log(`❌ Message ${reason}: contact:`, contact.name || contact.number, 
               chat.isGroup ? "| from group: " + chat.name : "");
};

/**
 * WhatsApp client event logs
 */
module.exports.logClientEvents = {
    ready: () => console.log("✅ WhatsApp Client is ready!"),
    authenticated: () => console.log("🔐 Authentication successful! Session saved."),
    authFailure: (msg) => console.error("❌ Authentication failed:", msg),
    qrCode: () => console.log("📱 Scan this QR code with WhatsApp:")
};
