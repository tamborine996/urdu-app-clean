// Local translation handler for development
// This runs when using Python server instead of Vercel dev

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env.local');
  const env = {};
  
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      if (key && value && !key.startsWith('#')) {
        env[key.trim()] = value.trim();
      }
    });
  } catch (error) {
    console.error('Could not load .env.local file:', error.message);
  }
  
  return env;
}

async function translateText(text) {
  const env = loadEnvFile();
  const API_KEY = env.TRANSLATOR_API_KEY;
  const API_REGION = env.TRANSLATOR_API_REGION || 'uksouth';

  if (!API_KEY || API_KEY === 'your_actual_api_key_here') {
    throw new Error('Please set your actual API key in .env.local file');
  }

  const postData = JSON.stringify([{ text: text }]);
  
  const options = {
    hostname: 'api.cognitive.microsofttranslator.com',
    path: '/translate?api-version=3.0&from=ur&to=en',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': API_KEY,
      'Ocp-Apim-Subscription-Region': API_REGION,
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          const translation = result[0]?.translations[0]?.text || 'Translation not found';
          resolve(translation);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

module.exports = { translateText };