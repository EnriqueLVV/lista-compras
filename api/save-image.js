export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  try {
    const { image_base64, name } = req.body;

    if (!image_base64) return res.status(400).json({ error: 'No image provided' });

    // Generar ID único
    const id = Math.random().toString(36).substring(2, 9);
    
    // Devolver URL pública
    const image_url = `https://ealde-lista.vercel.app/api/get-image?id=${id}`;

    return res.status(200).json({ id, image_url, message: 'Image saved' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
