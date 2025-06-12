const axios = require('axios');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const {
    school,
    sport,
    opponent,
    date,
    graphicType,
    notes,
    imageUrls
  } = req.body;

  const taskName = `${graphicType} – ${school} vs ${opponent} (${date})`;

  const descriptionLines = [
    `📍 School: ${school}`,
    `🏈 Sport: ${sport}`,
    `🗂 Graphic Type: ${graphicType}`,
    `📆 Date: ${date}`,
    `⚔️ Opponent: ${opponent}`,
    `📝 Notes: ${notes || 'None'}`,
    `📎 Uploaded Images:\n${(imageUrls || []).map(url => '- ' + url).join('\n') || 'None'}`
  ];

  try {
    const response = await axios.post('https://app.asana.com/api/1.0/tasks', {
      name: taskName,
      notes: descriptionLines.join('\n'),
      projects: ['1209644725271007'],
      memberships: [
        {
          project: '1209644725271007',
          section: '1210535818472509'
        }
      ]
    }, {
      headers: {
        Authorization: `Bearer ${process.env.ASANA_TOKEN}`
      }
    });

    res.status(200).json({ success: true, taskId: response.data.data.gid });
  } catch (error) {
    console.error('Error creating Asana task:', error.response?.data || error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}