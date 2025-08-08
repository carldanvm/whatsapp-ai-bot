# WhatsApp AI Bot

WhatsApp AI bot powered by Claude AI to automatically respond to messages from specific contacts and groups.

## 🚀 Features

- **Smart Message Filtering**: Only responds to messages from allowed contacts and groups
- **Claude AI Integration**: Uses Anthropic's Claude for intelligent, context-aware responses
- **Trigger Word System**: Activates only when mentioned by specific trigger word (can be set in config.json, default is "botniel")
- **Chat History Context**: Analyzes recent conversation history for better responses (last 30 messages)

## 📋 Prerequisites

- Node.js
- WhatsApp account
- Anthropic Claude API key

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
   Edit `.env` and add your Anthropic API key:
   ```
   CLAUDE_API_KEY=your_claude_api_key_here
   ```

4. **Configure allowed contacts and groups**
   ```bash
   cp config.example.json config.json
   ```
   Edit `config.json` with your specific settings:
   ```json
   {
     "triggerWord": "botniel",
     "allowedToReplyContacts": [
       "contact_name_1",
       "contact_name_2"
     ],
     "allowedToReplyChats": [
       "group_name_1",
       "group_name_2"
     ]
   }
   ```

## ⚙️ Configuration

### Environment Variables (.env)
- `CLAUDE_API_KEY`: Your Anthropic Claude API key

### Bot Configuration (config.json)
- `triggerWord`: Word that activates the bot (default: "botniel")
- `allowedToReplyContacts`: Array of contact names allowed to trigger the bot
- `allowedToReplyChats`: Array of group chat names allowed to trigger the bot


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
   - Send a message containing "botniel" from an allowed contact or group
   - Example: "botniel, how are you today?"
   - The bot will respond with an AI-generated message


## 🤖 How It Works

1. **Message Reception**: Bot receives all WhatsApp messages
2. **Filtering**: Validates if message is from allowed contact/group
3. **Trigger Detection**: Checks if message contains trigger word
4. **Context Analysis**: Retrieves recent chat history for context
5. **AI Processing**: Sends context and message to Claude AI
6. **Response Generation**: Claude generates contextually appropriate response
7. **Message Sending**: Bot sends AI response back to the chat


## 📄 License

This project is for personal use. Please respect WhatsApp's Terms of Service.

## 🤝 Contributing

This is a personal project, but suggestions and improvements are welcome through issues.

---

**Created by Carlos Daniel Vieira** - Botniel WhatsApp AI Bot
