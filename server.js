
const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 8080;

// This endpoint dynamically creates a script that injects a 'process.env' object
// into the window scope, allowing the frontend code to access the API_KEY
// without modification. The API_KEY is provided as an environment variable to the
// Cloud Run container.
app.get('/env.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || '';
    res.send(`window.process = { env: { API_KEY: '${apiKey}' } };`);
});

// Serve all other static files from the root directory
app.use(express.static(path.resolve(__dirname)));

// Fallback for Single Page Applications (SPAs): always serve index.html for any
// route that doesn't match a static file.
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
