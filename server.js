const express = require('express');
const app = express();

app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  next();
});

// Endpoint save-image
app.post('/api/save-image', (req, res) => {
  const { image_base64, name } = req.body;
  
  if (!image_base64) {
    return res.status(400).json({ error: 'No image provided' });
  }
  
  const id = Math.random().toString(36).substring(2, 9);
  const image_url = `http://localhost:3000/api/get-image?id=${id}`;
  
  res.status(200).json({ id, image_url, message: 'Image saved' });
});

// Endpoint get-image
app.get('/api/get-image', (req, res) => {
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ error: 'No image ID provided' });
  }
  
  res.status(200).json({ message: 'Get image working', id });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});