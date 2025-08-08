const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { handleMessage } = require("./actions/messageHandler");
const { logClientEvents } = require("./actions/messageLogger");

// Initialize WhatsApp client
const client = new Client({
    authStrategy: new LocalAuth(),
});

// Client Event Listeners
client.on("ready", logClientEvents.ready);

client.on("qr", (qr) => {
    logClientEvents.qrCode();
    qrcode.generate(qr, { small: true });
});

client.on("authenticated", logClientEvents.authenticated);

client.on("auth_failure", logClientEvents.authFailure);

client.on("message_create", handleMessage);

// Initialize the bot
client.initialize();