# TaTU Translate

A modern, professional web app for translating text between multiple languages using Azure Translator. Features include voice input (speech-to-text), text-to-speech, and translation history.

## Features
- **Language Translation:** Translate text between English, Spanish, French, German, and Italian using Azure Translator.
- **Voice Input:** Click the microphone button to speak and convert your speech to text for translation.
- **Text-to-Speech:** Listen to the translated text with a single click.
- **Translation History:** View your last 10 translations in a session.
- **Responsive Design:** Works well on desktop and mobile devices.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (for local development, only if you want to use a backend)
- An [Azure Translator](https://portal.azure.com/) resource (get your endpoint, key, and region)
- A modern web browser (Chrome, Edge, or Firefox recommended)

### Setup
1. **Clone or Download the Repository**
2. **Configure Azure Translator Key**
   - Open `app.js`.
   - Replace the placeholders for `key` and `region` with your actual Azure Translator key and region:
     ```js
     const key = 'YOUR_AZURE_TRANSLATOR_KEY';
     const region = 'YOUR_AZURE_TRANSLATOR_REGION';
     ```
3. **Run the App**
   - Open `index.html` in your browser.
   - Enter or speak text, select languages, and click "Translate".

### Notes
- **Security:** The Azure Translator key is exposed in the frontend for simplicity. For production, use a backend to keep your key secret.
- **CORS:** Direct browser calls to Azure Translator may be blocked by CORS. This app is intended for local/demo use.
- **Browser Support:** Voice input and text-to-speech features require a browser that supports the Web Speech API (Chrome/Edge recommended).

## Project Structure
```
Translation/
├── app.js           # Main JavaScript logic
├── index.html       # Main HTML file
├── styles.css       # Styling
├── README.md        # This file
```

## Customization
- **Add More Languages:** Add more `<option>` elements to the language dropdowns in `index.html`.
- **Change UI Theme:** Edit `styles.css` for colors, fonts, and layout.
- **Extend Features:** Add copy-to-clipboard, persistent history, dark mode, etc.

## Credits
- Built with [Azure Translator](https://azure.microsoft.com/en-us/products/ai-services/translator/)
- Voice features use the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

## License
MIT License
