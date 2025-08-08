# WhatsApp AI Bot

A minimal Node.js setup using `whatsapp-web.js` that logs all incoming WhatsApp messages to the console.

## Requirements
- Node.js 18+

## Setup
1. Install dependencies:
   - On PowerShell (policy may block npm): use `cmd` prefix
     ```bash
     cmd /c npm install whatsapp-web.js qrcode-terminal
     ```
2. Start the bot:
   ```bash
   node index.js
   ```
   - On first run, a QR code will appear in the terminal. Scan it with WhatsApp (linked devices).

## Files
- `index.js`: Initializes the WhatsApp client and logs incoming messages.
- `.gitignore`: Ignores `node_modules` and WhatsApp session/cache folders.

## Notes
- Sessions are stored locally via `LocalAuth` in `.wwebjs_auth/`. Keep this folder private.
