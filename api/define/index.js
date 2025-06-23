const fetch = require('node-fetch');

module.exports = async function (context, req) {
    const { word } = req.body || {};
    if (!word) {
        context.res = {
            status: 400,
            body: { error: 'Missing word parameter.' }
        };
        return;
    }

    // These should be set as environment variables in Azure
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;
    const key = process.env.AZURE_OPENAI_KEY;

    const url = `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=2024-02-15-preview`;
    const headers = {
        'api-key': key,
        'Content-Type': 'application/json',
    };
    const prompt = `What is the meaning of the word '${word}'? Give a clear, concise definition suitable for a language learner.`;
    const body = JSON.stringify({
        messages: [
            { role: 'system', content: 'You are a helpful dictionary assistant.' },
            { role: 'user', content: prompt }
        ],
        max_tokens: 100,
        temperature: 0.2
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body
        });
        if (!response.ok) throw new Error('Failed to get definition.');
        const data = await response.json();
        const aiText = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
        context.res = {
            status: 200,
            body: { definition: aiText || 'No definition found.' }
        };
    } catch (err) {
        context.res = {
            status: 500,
            body: { error: err.message }
        };
    }
};
