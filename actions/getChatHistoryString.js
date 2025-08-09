module.exports.getChatHistoryString = async (chat) => {
    const chatHistory = await chat.fetchMessages({limit: 50})
    const parsedChatHistory = await Promise.all(chatHistory.map(async(message) => {
        const contact = await message.getContact()
        
        // If message is from the bot (fromMe = true), label it as "Botniel"
        if (message.fromMe) {
            return "Botniel: " + message.body
        }
        
        // Otherwise, use the contact's name or number
        return (contact.name || contact.number) + ": " + message.body
    }))
    const chatHistoryString = parsedChatHistory.join("\n")
    return chatHistoryString
}