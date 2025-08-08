// Bot configuration loader
const fs = require('fs');
const path = require('path');

// Default configuration
const defaultConfig = {
    triggerWord: "botniel",
    allowedToReplyContacts: [],
    allowedToReplyChats: []
};

// Load user configuration
let userConfig = {};
const configPath = path.join(__dirname, '..', 'config.json');

try {
    if (fs.existsSync(configPath)) {
        const configFile = fs.readFileSync(configPath, 'utf8');
        userConfig = JSON.parse(configFile);
    } else {
        console.warn('⚠️  config.json not found. Please create it from config.example.json');
    }
} catch (error) {
    console.error('❌ Error loading config.json:', error.message);
}

// Merge configurations
const config = {
    ...defaultConfig,
    ...userConfig,
    // Ensure arrays are lowercase
    allowedToReplyContacts: (userConfig.allowedToReplyContacts || []).map(contact => contact.toLowerCase()),
    allowedToReplyChats: (userConfig.allowedToReplyChats || []).map(chat => chat.toLowerCase())
};

module.exports = config;
