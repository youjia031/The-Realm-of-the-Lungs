// api/logs.js
export default async function handler(req, res) {
  // 設定 CORS 標頭（方便本地測試）
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = req.body;

    // ✅ 這裡就是 Vercel 的 logs 輸出處
    // 在 Vercel 部署後，這些會顯示在 Dashboard 的 Function Logs 中
    console.log('[GAME_LOG]', JSON.stringify(body, null, 2));

    // 你也可以依照需求將資料存入資料庫，或發送到第三方服務

    return res.status(200).json({
      ok: true,
      received: body,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[LOG_ERROR]', error);
    return res.status(500).json({ ok: false, error: String(error) });
  }
}
