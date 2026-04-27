export default async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'No image ID provided' });
    }

    res.setHeader('Content-Type', 'application/json');
    
    return res.status(200).json({ 
      message: 'Get image endpoint working',
      id: id
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};