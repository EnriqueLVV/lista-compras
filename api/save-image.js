export default async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image_base64, name } = req.body;

    if (!image_base64) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const id = Math.random().toString(36).substring(2, 9);
    const image_url = `http://localhost:3000/api/get-image?id=${id}`;

    return res.status(200).json({ 
      id, 
      image_url,
      message: 'Image endpoint working' 
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};