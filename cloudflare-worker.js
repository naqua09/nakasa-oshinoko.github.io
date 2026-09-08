/**
 * ============================================================================
 * お食事処なかさ ×【推しの子】コラボメニュー
 * イチオシメニュー集計 Cloudflare Worker
 * ============================================================================
 * 
 * 【デプロイ手順 (5分で完了・完全無料)】
 * 1. Cloudflare (https://dash.cloudflare.com/) に無料サインアップ / ログイン
 * 2. 左メニュー「Workers & Pages」->「KV」を選択し、「名前空間を作成」をクリック
 *    - 名前空間名: NAKASA_STATS と入力して保存
 * 3. 左メニュー「Workers & Pages」->「作成」->「Worker を作成」をクリック
 *    - Worker名（例: nakasa-oshi-api）を決めて「デプロイ」
 * 4. デプロイ後、「コードを編集」を開き、本ファイルの内容を全て貼り付けて「デプロイ」
 * 5. Workerの「設定」->「変数」->「KV 名前空間のバインド」で以下を追加して「保存してデプロイ」:
 *    - 変数名: NAKASA_STATS
 *    - KV 名前空間: 先ほど作成した NAKASA_STATS を選択
 * 6. Workerのダッシュボードにある公開URL（例: https://nakasa-oshi-api.xxxx.workers.dev）をコピー
 * 7. 本アプリの app.js の CLOUDFLARE_WORKER_URL にそのURLを貼り付ければ完了！
 */

// CORS レスポンスヘッダー生成
function corsHeaders(origin = '*') {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json; charset=utf-8'
  };
}

export default {
  async fetch(request, env) {
    // OPTIONS プリフライトリクエストの処理
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders()
      });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // KV バインドの確認
    if (!env.NAKASA_STATS) {
      return new Response(JSON.stringify({
        error: 'KV namespace NAKASA_STATS is not bound.',
        help: 'Please bind NAKASA_STATS in Cloudflare Worker settings.'
      }), {
        status: 500,
        headers: corsHeaders()
      });
    }

    try {
      // ----------------------------------------------------------------------
      // 1. GET /api/stats (集計結果・ランキング取得)
      // ----------------------------------------------------------------------
      if (path === '/api/stats' || path === '/') {
        const raw = await env.NAKASA_STATS.get('votes_data');
        const votes = raw ? JSON.parse(raw) : {};

        let totalVotes = 0;
        const ranking = [];

        for (const [itemId, count] of Object.entries(votes)) {
          if (count > 0) {
            totalVotes += count;
            ranking.push({ itemId, count });
          }
        }

        // 票数順にソート
        ranking.sort((a, b) => b.count - a.count);

        return new Response(JSON.stringify({
          success: true,
          totalVotes,
          votes,
          ranking,
          updatedAt: new Date().toISOString()
        }), {
          status: 200,
          headers: {
            ...corsHeaders(),
            'Cache-Control': 'public, max-age=15' // 15秒エッジキャッシュ
          }
        });
      }

      // ----------------------------------------------------------------------
      // 2. POST /api/vote (イチオシメニュー投票)
      // ----------------------------------------------------------------------
      if (path === '/api/vote' && request.method === 'POST') {
        let body;
        try {
          body = await request.json();
        } catch (e) {
          return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
            status: 400,
            headers: corsHeaders()
          });
        }

        const { itemId, previousItemId } = body;

        if (!itemId && !previousItemId) {
          return new Response(JSON.stringify({ error: 'itemId or previousItemId is required' }), {
            status: 400,
            headers: corsHeaders()
          });
        }

        // 現在の集計データを取得
        const raw = await env.NAKASA_STATS.get('votes_data');
        const votes = raw ? JSON.parse(raw) : {};

        // 以前の投票の取り消し（変更の場合）
        if (previousItemId && votes[previousItemId]) {
          votes[previousItemId] = Math.max(0, votes[previousItemId] - 1);
        }

        // 新しい投票の加算
        if (itemId) {
          votes[itemId] = (votes[itemId] || 0) + 1;
        }

        // KVへ保存
        await env.NAKASA_STATS.put('votes_data', JSON.stringify(votes));

        // 最新の統計を計算して返却
        let totalVotes = 0;
        const ranking = [];
        for (const [id, count] of Object.entries(votes)) {
          if (count > 0) {
            totalVotes += count;
            ranking.push({ itemId: id, count });
          }
        }
        ranking.sort((a, b) => b.count - a.count);

        return new Response(JSON.stringify({
          success: true,
          totalVotes,
          votes,
          ranking,
          updatedAt: new Date().toISOString()
        }), {
          status: 200,
          headers: corsHeaders()
        });
      }

      // 該当エンドポイントなし
      return new Response(JSON.stringify({ error: 'Not Found' }), {
        status: 404,
        headers: corsHeaders()
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: corsHeaders()
      });
    }
  }
};
