# WhatsApp AI Bot

WhatsApp AI bot that automatically responds to messages from specific contacts and groups. Supports Anthropic (Claude) and OpenAI providers.

## 🚀 Features

- **Smart Message Filtering**: Only responds to messages from allowed contacts and groups
- **Multi‑provider AI**: Use Anthropic (Claude) or OpenAI by configuring the provider
- **Configurable Prompt**: System prompt is loaded from your local `config.json` (kept out of Git)
- **Optional Trigger Word**: If `triggerWord` is omitted or empty, the bot triggers on any non‑self message
- **Chat History Context**: Analyzes recent conversation history for better responses (last 50 messages)
- **Image Generation (OpenAI)**: Generate images via OpenAI with the `/generateimage` command

## 📋 Prerequisites

- Node.js
- WhatsApp account
- Relevant AI API key(s): Anthropic and/or OpenAI (depending on provider you choose)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd whatsapp-ai-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add the API key(s) for the provider(s) you intend to use:
   ```bash
   # If using Anthropic
   ANTHROPIC_API_KEY=your_anthropic_api_key_here

   # If using OpenAI
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Configure allowed contacts and groups**
   ```bash
   cp config.example.json config.json
   ```
   Edit `config.json` with your specific settings:
   ```json
   {
      "triggerWord": "your-trigger-word", // leave empty or omit to trigger on any message
      "allowedToReplyContacts": ["your-contact-names"],
      "allowedToReplyChats": ["your-group-chats"],
      "systemPrompt": "your-private-system-prompt kept locally",
      "AIprovider": "openai-or-anthropic"
   }
   ```
   Notes:
   - `config.json` is required. If it is missing, the app will throw an error on startup.
   - `systemPrompt` is required. The bot appends chat history automatically when generating.

## ⚙️ Configuration

### Environment Variables (.env)
- `ANTHROPIC_API_KEY`: Your Anthropic API key (required if `AIprovider` is `anthropic`)
- `OPENAI_API_KEY`: Your OpenAI API key (required if `AIprovider` is `openai`)

### Bot Configuration (config.json)
- `AIprovider`: Either `anthropic` or `openai`
- `systemPrompt`: The system prompt used to guide responses (required)
- `triggerWord`: Word that activates the bot. If omitted or empty, all non‑self messages are considered triggered
- `allowedToReplyContacts`: Array of contact names (lowercased internally)
- `allowedToReplyChats`: Array of group chat names (lowercased internally)


## 🚀 Usage

1. **Start the bot**
   ```bash
   npm start
   ```

2. **Scan QR Code**
   - A QR code will appear in your terminal
   - Scan it with WhatsApp on your phone
   - Wait for authentication confirmation

3. **Interact with the bot**
   - If `triggerWord` is set: include it in a message from an allowed contact/group
   - If `triggerWord` is empty or omitted: any non‑self message from an allowed contact/group will be processed
   - The bot will respond with an AI-generated message

4. **Generate images (OpenAI provider only)**
   - Command: `/generateimage <your-description>`
   - Works even with a trigger word, e.g. `{triggerWord} /generateimage a cute dog`
   - The bot first replies: `Processing your image request...`, then sends the image
   - Requires `AIprovider: "openai"` in `config.json` and a valid `OPENAI_API_KEY`


## 🤖 How It Works

1. **Message Reception**: Bot receives all WhatsApp messages
2. **Filtering**: Validates if message is from allowed contact/group
3. **Trigger Detection**: If `triggerWord` is set, checks its presence; otherwise always triggers (excluding self messages)
4. **Context Analysis**: Retrieves recent chat history for context
5. **AI Processing**: Sends prompts to the selected provider (Anthropic or OpenAI)
6. **Response Generation**: The selected provider generates a text response; when `/generateimage` is used, OpenAI generates an image that is sent as media
7. **Message Sending**: Bot sends AI response back to the chat

## ⏱️ Concurrency

- The bot processes a maximum of 2 tasks at the same time (text or image across all chats).
- If 2 tasks are already running, new requests receive: "I'm currently busy processing other messages. Please try again in a moment."


## 📄 License

This project is for personal use. Please respect WhatsApp's Terms of Service.

## 🤝 Contributing

This is a personal project, but suggestions and improvements are welcome through issues.

---

**Created by Carlos Daniel Vieira** - Botniel WhatsApp AI Bot

https://github.com/carldanvm

