const { kv } = require('@vercel/kv');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Método no permitido' });

  try {
    const { id } = req.query;

    if (!id) return res.status(400).json({ error: 'No image ID provided' });

    // Recuperar imagen de KV
    const image_base64 = await kv.get(`image:${id}`);

    if (!image_base64) return res.status(404).json({ error: 'Image not found' });

    // Devolver como imagen
    const imageBuffer = Buffer.from(image_base64, 'base64');
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    
    return res.status(200).send(imageBuffer);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
