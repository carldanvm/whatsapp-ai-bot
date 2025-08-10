// Bot configuration loader
const fs = require('fs');
const path = require('path');

// Load user configuration
let userConfig = {};
const configPath = path.join(__dirname, '..', 'config.json');

try {
    if (fs.existsSync(configPath)) {
        const configFile = fs.readFileSync(configPath, 'utf8');
        userConfig = JSON.parse(configFile);
    } else {
        throw new Error('config.json not found. Please create it from config.example.json');
    }
} catch (error) {
    console.error('❌ Error loading config.json:', error.message);
    throw error;
}

// Build final config (no defaults other than safe normalizations)
const config = {
    // If triggerWord is not provided, set to empty string to enable "always trigger" behavior
    triggerWord: typeof userConfig.triggerWord === 'undefined' ? '' : userConfig.triggerWord,
    // Ensure arrays exist and are lowercase to avoid runtime errors elsewhere
    allowedToReplyContacts: Array.isArray(userConfig.allowedToReplyContacts)
        ? userConfig.allowedToReplyContacts.map(contact => String(contact).toLowerCase())
        : [],
    allowedToReplyChats: Array.isArray(userConfig.allowedToReplyChats)
        ? userConfig.allowedToReplyChats.map(chat => String(chat).toLowerCase())
        : [],
    // Optional system prompt (as-is, no transformations)
    systemPrompt: userConfig.systemPrompt,
    AIprovider: userConfig.AIprovider,
};

module.exports = config;
