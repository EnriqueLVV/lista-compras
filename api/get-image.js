export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Método no permitido' });

  try {
    const { id } = req.query;

    if (!id) return res.status(400).json({ error: 'No image ID provided' });

    // Por ahora devolvemos una imagen de prueba
    // En producción aquí iría la lógica de recuperar de KV
    
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    
    return res.status(200).json({ 
      message: 'Image endpoint working',
      id: id
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
