const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Logs any incoming WhatsApp message
function logIncomingMessage(message) {
  try {
    const ts = new Date().toISOString();
    const from = message.from || 'unknown';
    const body = (message.body || '').replace(/\n/g, ' ');
    console.log(`[${ts}] From ${from}: ${body}`);
  } catch (err) {
    console.error('Failed to log message:', err);
  }
}

// Create and configure the WhatsApp client
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
});

client.on('qr', (qr) => {
  console.log('Scan the QR code below with WhatsApp (Linked devices):');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('WhatsApp client is ready.');
});

client.on('auth_failure', (msg) => {
  console.error('Authentication failure:', msg);
});

client.on('disconnected', (reason) => {
  console.warn('Client was disconnected:', reason);
});

client.on('message', (message) => {
  logIncomingMessage(message);
});

client.initialize();

module.exports = { client, logIncomingMessage };
