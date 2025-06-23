document.getElementById('translateBtn').addEventListener('click', async function() {
    const inputText = document.getElementById('inputText').value.trim();
    const fromLang = document.getElementById('fromLang').value;
    const toLang = document.getElementById('toLang').value;
    const outputDiv = document.getElementById('outputText');

    if (!inputText) {
        outputDiv.textContent = 'Please enter text to translate.';
        return;
    }

    outputDiv.textContent = 'Translating...';

    // Directly call Azure Translator API (not secure for production)
    const endpoint = 'https://api.cognitive.microsofttranslator.com';
    const key = '4HsHRyDk0Fb09g8fCjBuD2O4BZhAzGmQ5ZY8PUWyKMWKBGXweRLUJQQJ99BFACLArgHXJ3w3AAAbACOGVj6a';
    const region = 'southcentralus';

    const url = `${endpoint}/translate?api-version=3.0&from=${fromLang}&to=${toLang}`;
    const headers = {
        'Ocp-Apim-Subscription-Key': key,
        'Ocp-Apim-Subscription-Region': region,
        'Content-type': 'application/json',
    };
    const body = JSON.stringify([{ Text: inputText }]);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body
        });
        if (!response.ok) throw new Error('Translation failed.');
        const data = await response.json();
        outputDiv.textContent = data[0].translations[0].text;
        addToHistory(inputText, data[0].translations[0].text, fromLang, toLang);
    } catch (err) {
        outputDiv.textContent = 'Error: ' + err.message;
    }
});

// Voice-to-text feature using Web Speech API
const micBtn = document.getElementById('micBtn');
const micIcon = document.getElementById('micIcon');
const inputText = document.getElementById('inputText');
let recognition;

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // You can set this dynamically if needed
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    micBtn.addEventListener('click', function(e) {
        e.preventDefault();
        micBtn.classList.add('recording');
        recognition.start();
    });

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        inputText.value = transcript;
        micBtn.classList.remove('recording');
        inputText.focus();
    };
    recognition.onerror = function() {
        micBtn.classList.remove('recording');
    };
    recognition.onend = function() {
        micBtn.classList.remove('recording');
    };
} else {
    micBtn.style.display = 'none';
    console.warn('Speech recognition not supported in this browser.');
}

// Text-to-Speech (TTS) for translated text
const ttsBtn = document.getElementById('ttsBtn');
ttsBtn.addEventListener('click', function() {
    const outputDiv = document.getElementById('outputText');
    const text = outputDiv.textContent.trim();
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    // Optionally, set language to match the target language
    const toLang = document.getElementById('toLang').value;
    utterance.lang = toLang;
    window.speechSynthesis.speak(utterance);
});

// Translation History Feature
const historyList = document.getElementById('historyList');
let translationHistory = [];

function addToHistory(original, translated, from, to) {
    translationHistory.unshift({ original, translated, from, to });
    if (translationHistory.length > 10) translationHistory.pop(); // Keep last 10
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = '';
    translationHistory.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="history-from">${item.original} (${item.from} → ${item.to})</span><span class="history-to">${item.translated}</span>`;
        historyList.appendChild(li);
    });
}

// Word meaning lookup (AI-powered)
const defineBtn = document.getElementById('defineBtn');
const defineInput = document.getElementById('defineInput');
const defineResult = document.getElementById('defineResult');
defineBtn.addEventListener('click', async function() {
    const word = defineInput.value.trim();
    if (!word) {
        defineResult.textContent = 'Please enter a word.';
        return;
    }
    defineResult.textContent = 'Searching...';
    try {
        const response = await fetch('/api/define', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ word })
        });
        if (!response.ok) throw new Error('Failed to get definition.');
        const data = await response.json();
        defineResult.textContent = data.definition || 'No definition found.';
    } catch (err) {
        defineResult.textContent = 'Error: ' + err.message;
    }
});
