/**
 * 【推しの子】× 有馬温泉 お買い物ラリー達成度ログ アプリケーションロジック
 */

// ==========================================================================
// 1. ラリー店舗データマスター
// ==========================================================================
const RALLY_DATA = [
  {
    id: 'mitsumori',
    name: '三ツ森',
    reading: 'みつもり',
    product: 'クリーム炭酸せんべい',
    category: 'souvenir',
    categoryLabel: 'お土産・銘菓',
    categoryIcon: '🍘',
    color: '#ff2a85', // アイピンク
    description: '有馬名物の炭酸せんべいにバニラクリームをサンドした不動の人気銘菓。お土産にもぴったり！',
    mapUrl: 'https://www.google.com/maps/place/%E4%B8%89%E3%83%84%E6%A3%AE+%E6%9C%AC%E5%BA%97/@34.7978655,135.247416,17z/data=!4m6!3m5!1s0x60008a6a069318bd:0xda7bfc1733c1ad!8m2!3d34.7978655!4d135.247416!16s%2Fg%2F1tfc6gtf'
  },
  {
    id: 'tosen_shrine',
    name: '湯泉神社',
    reading: 'とうせんじんじゃ',
    product: '1,000円以上お買い上げ',
    category: 'shrine',
    categoryLabel: '神社・授与品',
    categoryIcon: '⛩️',
    color: '#ff4081', // ルビーピンク
    description: '有馬温泉の守護神。お守り・絵馬・御朱印などの授与品を1,000円以上受けるとオリジナルカード対象となります。',
    mapQuery: '湯泉神社 兵庫県神戸市北区有馬町1908'
  },
  {
    id: 'kawakami',
    name: '佃煮元祖 川上商店本店',
    reading: 'かわかみしょうてん ほんてん',
    product: 'ちりめん山椒 & てまり昆布(生姜)',
    category: 'gourmet',
    categoryLabel: '佃煮・伝統グルメ',
    categoryIcon: '🥢',
    color: '#7c4dff', // あかねパープル
    description: '室町時代より続く伝統の味。ご飯のお供に最高な特製ちりめん山椒と生姜入りてまり昆布のセット。',
    mapQuery: '川上商店 本店 兵庫県神戸市北区有馬町1193'
  },
  {
    id: 'hetekara',
    name: 'hetekara',
    reading: 'へてから',
    product: 'あぶらとり紙 & 無添加石鹸',
    category: 'goods',
    categoryLabel: 'コスメ・雑貨',
    categoryIcon: '🧼',
    color: '#ffd600', // MEMイエロー
    description: '温泉街のおしゃれなセレクトショップ。温泉水配合の無添加石鹸と天然和紙あぶらとり紙。',
    mapQuery: 'hetekara 兵庫県神戸市北区有馬町1166'
  },
  {
    id: 'koki',
    name: '湯屋の宿 康貴',
    reading: 'ゆやのやど こうき',
    product: '日帰り入浴利用',
    category: 'onsen',
    categoryLabel: '日帰り温泉',
    categoryIcon: '♨️',
    color: '#00b0ff', // アクアブルー
    description: '有馬の名湯「金泉」と「銀泉」を源泉かけ流しでゆったりと堪能できる風情ある温泉宿。',
    mapQuery: '湯屋の宿 康貴 兵庫県神戸市北区有馬町1401'
  },
  {
    id: 'kamiobo',
    name: '上大坊',
    reading: 'かみおおぼう',
    product: '日帰り入浴利用',
    category: 'onsen',
    categoryLabel: '日帰り温泉',
    categoryIcon: '♨️',
    color: '#ff3b30', // かなレッド
    description: '有馬屈指の濃厚な金泉（赤湯）を源泉かけ流しで楽しめる歴史深い宿。',
    specialNotice: '土日に日帰り入浴を利用される場合は、事前に電話で「推しの子コラボで日帰り入浴したい」とお伝えいただく必要があります！',
    mapQuery: '上大坊 兵庫県神戸市北区有馬町1175'
  }
];

// ==========================================================================
// 2. 状態管理 & 定数
// ==========================================================================
const STORAGE_KEY = 'nakasa_oshinoko_rally_data_v1';
const THEME_STORAGE_KEY = 'nakasa_oshinoko_theme_preference';

// ユーザーデータ構造:
// {
//   [spotId]: {
//     completed: boolean,
//     count: number, // 訪問・利用回数（周回判定用: 1周目で1, 2周目で2...）
//     date: string, // YYYY-MM-DD
//     memo: string
//   }
// }
let rallyLogs = {};
let currentFilter = 'all';
let currentSearchQuery = '';
let editingSpotId = null;
let currentViewLap = 1; // 現在表示・操作中の周回 (1, 2, 3...)
let previousCompleted = false; // お祝い演出トリガー用

// スポットログ取得・下位互換性マイグレーションヘルパー
function getSpotLog(id) {
  if (!rallyLogs[id]) {
    rallyLogs[id] = {
      completed: false,
      count: 0,
      date: '',
      memo: ''
    };
  }

  // 既存データ（v1形式: count未定義）からの正規化
  if (typeof rallyLogs[id].count !== 'number') {
    rallyLogs[id].count = rallyLogs[id].completed ? 1 : 0;
  }
  rallyLogs[id].completed = rallyLogs[id].count > 0;

  return rallyLogs[id];
}

// ==========================================================================
// 3. 初期化処理
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  generateStars();
  loadLogs();
  currentViewLap = getActiveLap();
  initEventListeners();
  renderAll();
});

// 星空背景生成
function generateStars() {
  const container = document.getElementById('bgStars');
  if (!container) return;
  container.innerHTML = '';
  const starCount = 45;
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2.5 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 4}s`;
    star.style.animationDuration = `${Math.random() * 3 + 2}s`;
    container.appendChild(star);
  }
}

// テーマ初期化
function initTheme() {
  const saved = localStorage.getItem(THEME_STORAGE_KEY) || 'auto';
  applyTheme(saved);
}

function applyTheme(mode) {
  if (mode === 'auto') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', mode);
  }
  localStorage.setItem(THEME_STORAGE_KEY, mode);

  // テーマボタンのアクティブ更新
  document.querySelectorAll('#themeSelector .theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === mode);
  });
}

// ==========================================================================
// 4. ストレージ（localStorage）処理
// ==========================================================================
function loadLogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      rallyLogs = JSON.parse(raw);
    } else {
      rallyLogs = {};
    }
  } catch (e) {
    console.error('Failed to load rally data from localStorage:', e);
    rallyLogs = {};
  }
}

function saveLogs() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rallyLogs));
  } catch (e) {
    console.error('Failed to save rally data to localStorage:', e);
  }
}

// ==========================================================================
// 5. 周回（Lap）進捗計算 & 統計
// ==========================================================================
// 指定した周回 (lap = 1, 2, 3...) における進捗を計算
function getLapProgress(lap = 1) {
  const total = RALLY_DATA.length; // 6
  let completedCount = 0;
  let onsenCompleted = 0;
  let onsenTotal = 0;
  let shopCompleted = 0;
  let shopTotal = 0;

  RALLY_DATA.forEach(spot => {
    const log = getSpotLog(spot.id);
    const isDone = (log.count >= lap);

    if (spot.category === 'onsen') {
      onsenTotal++;
      if (isDone) onsenCompleted++;
    } else {
      shopTotal++;
      if (isDone) shopCompleted++;
    }

    if (isDone) {
      completedCount++;
    }
  });

  const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;
  const isCompleted = (completedCount === total && total > 0);

  return {
    lap,
    total,
    completedCount,
    percent,
    isCompleted,
    onsenCompleted,
    onsenTotal,
    shopCompleted,
    shopTotal
  };
}

// 累計カード獲得枚数の算出
function getTotalCardCount() {
  return RALLY_DATA.reduce((sum, spot) => {
    const log = getSpotLog(spot.id);
    return sum + (log.count || 0);
  }, 0);
}

// 選択・表示可能な最大周回数を算出
function getMaxAvailableLap() {
  const lap1 = getLapProgress(1);
  let maxCount = 0;
  RALLY_DATA.forEach(spot => {
    const log = getSpotLog(spot.id);
    if (log.count > maxCount) maxCount = log.count;
  });

  // 1周目を全制覇していれば、最低でも2周目まで選べる
  if (lap1.isCompleted) {
    return Math.max(2, maxCount + 1);
  }
  // 1周目未制覇でも2回以上利用したものがあればその回数まで選べる
  return Math.max(1, maxCount);
}

// 現在ユーザーが挑戦中の最新周回数を算出
function getActiveLap() {
  const maxLap = getMaxAvailableLap();
  for (let l = 1; l <= maxLap; l++) {
    const p = getLapProgress(l);
    if (!p.isCompleted) return l;
  }
  return maxLap;
}

// 互換用: 現在選択中の周回の進捗を返す
function calculateStats() {
  return getLapProgress(currentViewLap);
}

// ==========================================================================
// 6. UIレンダリング
// ==========================================================================
function renderAll() {
  renderProgress();
  renderSpotList();
}

// プログレスサマリーの描画（周回対応）
function renderProgress() {
  const maxLap = getMaxAvailableLap();
  if (currentViewLap > maxLap) currentViewLap = maxLap;
  if (currentViewLap < 1) currentViewLap = 1;

  const stats = getLapProgress(currentViewLap);
  const totalCards = getTotalCardCount();

  const completedCountEl = document.getElementById('completedCount');
  const progressFillEl = document.getElementById('progressFill');
  const trophyPercentEl = document.getElementById('trophyPercent');
  const trophyBadgeEl = document.getElementById('trophyBadge');
  const cardCountEl = document.getElementById('cardCount');
  const statOnsenEl = document.getElementById('statOnsen');
  const statShopEl = document.getElementById('statShop');
  const lapPillGroup = document.getElementById('lapPillGroup');
  const progressLabel = document.getElementById('progressLabel');

  if (completedCountEl) completedCountEl.textContent = stats.completedCount;
  if (progressFillEl) progressFillEl.style.width = `${stats.percent}%`;
  if (trophyPercentEl) trophyPercentEl.textContent = `${stats.percent}%`;

  if (trophyBadgeEl) {
    if (stats.isCompleted) {
      trophyBadgeEl.classList.add('all-completed');
      trophyBadgeEl.querySelector('.trophy-icon').textContent = '👑';
    } else {
      trophyBadgeEl.classList.remove('all-completed');
      trophyBadgeEl.querySelector('.trophy-icon').textContent = '⭐';
    }
  }

  if (cardCountEl) {
    if (maxLap > 1) {
      cardCountEl.textContent = `${stats.completedCount} / ${stats.total} 枚 (累計 ${totalCards}枚)`;
    } else {
      cardCountEl.textContent = `${stats.completedCount} / ${stats.total} 枚`;
    }
    if (stats.isCompleted) {
      cardCountEl.classList.add('gold');
    } else {
      cardCountEl.classList.remove('gold');
    }
  }

  if (statOnsenEl) {
    statOnsenEl.textContent = `${stats.onsenCompleted}/${stats.onsenTotal}`;
  }

  if (statShopEl) {
    statShopEl.textContent = `${stats.shopCompleted}/${stats.shopTotal}`;
  }

  // 周回切り替えピル（maxLap > 1 の時のみ表示）
  if (lapPillGroup) {
    if (maxLap > 1) {
      lapPillGroup.style.display = 'inline-flex';
      lapPillGroup.innerHTML = '';

      for (let l = 1; l <= maxLap; l++) {
        const lapStats = getLapProgress(l);
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `lap-pill-btn ${l === currentViewLap ? 'active' : ''} ${lapStats.isCompleted ? 'is-completed' : ''}`;
        btn.textContent = `${l}周目${lapStats.isCompleted ? '✓' : ''}`;
        btn.setAttribute('data-lap', l);
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          currentViewLap = l;
          renderAll();
        });
        lapPillGroup.appendChild(btn);
      }

      if (progressLabel) {
        progressLabel.textContent = `${currentViewLap}周目 ラリー達成度`;
      }
    } else {
      lapPillGroup.style.display = 'none';
      if (progressLabel) {
        progressLabel.textContent = 'ラリー達成度';
      }
    }
  }

  // 周回コンプリート（100%達成）時の祝福演出
  if (stats.isCompleted && !previousCompleted && stats.total > 0) {
    showCompleteToast(currentViewLap);
  }
  previousCompleted = stats.isCompleted;
}

// 店舗カード一覧の描画
function renderSpotList() {
  const container = document.getElementById('spotsContainer');
  const emptyState = document.getElementById('emptyState');
  if (!container) return;

  container.innerHTML = '';

  let visibleCount = 0;

  RALLY_DATA.forEach((spot, index) => {
    const spotLog = getSpotLog(spot.id);
    // 現在選択中の周回で達成しているか
    const isCompleted = spotLog.count >= currentViewLap;

    // フィルタリング判定
    if (currentFilter === 'uncompleted' && isCompleted) return;
    if (currentFilter === 'completed' && !isCompleted) return;
    if (currentFilter === 'onsen' && spot.category !== 'onsen') return;
    if (currentFilter === 'shop' && spot.category === 'onsen') return;

    // 検索語句判定
    if (currentSearchQuery) {
      const q = currentSearchQuery.toLowerCase();
      const matchName = spot.name.toLowerCase().includes(q);
      const matchReading = spot.reading.toLowerCase().includes(q);
      const matchProduct = spot.product.toLowerCase().includes(q);
      const matchDesc = spot.description.toLowerCase().includes(q);
      if (!matchName && !matchReading && !matchProduct && !matchDesc) return;
    }

    visibleCount++;

    const card = document.createElement('div');
    card.className = `rally-spot-card ${isCompleted ? 'completed' : ''}`;
    card.id = `card_${spot.id}`;

    let specialWarningHtml = '';
    if (spot.specialNotice) {
      specialWarningHtml = `
        <div class="spot-special-warning">
          <span style="font-size: 13px; line-height: 1.3;">⚠️</span>
          <div>
            <span class="warning-mini-tag">土日利用時のご注意</span>
            <div>土日に日帰り入浴を利用される際は、事前に電話で<strong>「推しの子コラボで日帰り入浴したい」</strong>とお伝えください。</div>
          </div>
        </div>
      `;
    }

    // 周回・カード獲得バッジの文言
    let badgeText = '';
    if (currentViewLap === 1) {
      badgeText = isCompleted ? 'オリジナルカード獲得済！' : 'オリジナルカード対象';
    } else {
      badgeText = isCompleted 
        ? `${currentViewLap}周目カード獲得済！` 
        : `${currentViewLap}周目カード対象`;
    }

    // 複数回訪問している場合のカウント表示
    let countBadgeHtml = '';
    if (spotLog.count > 0) {
      countBadgeHtml = `<span class="spot-visit-count-badge">訪問: ${spotLog.count}回</span>`;
    }

    card.innerHTML = `
      <div class="spot-card-top">
        <div class="spot-info-left">
          <div class="spot-meta-row">
            <span class="spot-number-badge">#${index + 1}</span>
            <span class="spot-cat-badge">
              <span>${spot.categoryIcon}</span>
              ${spot.categoryLabel}
            </span>
            ${countBadgeHtml}
          </div>
          <h3 class="spot-name">
            ${escapeHtml(spot.name)}
            <span class="spot-reading">${escapeHtml(spot.reading)}</span>
          </h3>
        </div>
        <div class="spot-check-wrap">
          <button type="button" class="custom-checkbox-btn" aria-label="${escapeHtml(spot.name)}を達成済みにする" data-id="${spot.id}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <div class="spot-product-box">
        <div class="product-label-wrap">
          <div class="product-guide-tag">対象商品 / ご利用</div>
          <div class="product-title">${escapeHtml(spot.product)}</div>
        </div>
      </div>

      <p class="desc-text" style="font-size:12px; margin: 4px 0 8px 0; color: var(--text-secondary); line-height: 1.45;">
        ${escapeHtml(spot.description)}
      </p>

      ${specialWarningHtml}

      <div class="spot-card-footer">
        <div class="spot-card-status-info">
          <span class="card-reward-badge">
            <span>🎁</span>
            ${badgeText}
          </span>
        </div>
        <a href="${spot.mapUrl || ('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(spot.mapQuery))}" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="spot-map-btn" 
           title="${escapeHtml(spot.name)}の場所をGoogleマップで開く">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          マップ
        </a>
      </div>
    `;

    container.appendChild(card);
  });

  if (emptyState) {
    emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
  }
}

// ==========================================================================
// 7. イベントリスナー & 操作
// ==========================================================================
function initEventListeners() {
  // カード全体またはチェックボックストグル（イベント委譲）
  document.getElementById('spotsContainer')?.addEventListener('click', (e) => {
    // マップボタンクリック時は達成チェックのトグルを行わない
    if (e.target.closest('.spot-map-btn')) {
      return;
    }
    const card = e.target.closest('.rally-spot-card');
    if (card) {
      const spotId = card.id.replace('card_', '');
      toggleSpotCompletion(spotId);
    }
  });

  // 検索入力
  const searchInput = document.getElementById('searchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.trim();
      if (searchClearBtn) {
        searchClearBtn.style.display = currentSearchQuery ? 'block' : 'none';
      }
      renderSpotList();
    });
  }
  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      currentSearchQuery = '';
      searchClearBtn.style.display = 'none';
      renderSpotList();
    });
  }

  // フィルタータブ切り替え
  document.querySelectorAll('.segment-btn[data-filter]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.segment-btn[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderSpotList();
    });
  });

  // シェアボタン
  document.getElementById('shareBtn')?.addEventListener('click', shareRallyStatus);
  document.getElementById('shareResultBtn')?.addEventListener('click', shareRallyStatus);

  // 設定ボタン & モーダル
  document.getElementById('menuSettingsBtn')?.addEventListener('click', openSettingsModal);
  document.getElementById('settingsCloseBtn')?.addEventListener('click', closeSettingsModal);
  document.getElementById('settingsModalBackdrop')?.addEventListener('click', (e) => {
    if (e.target.id === 'settingsModalBackdrop') closeSettingsModal();
  });

  // テーマ切り替え
  document.querySelectorAll('#themeSelector .theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyTheme(btn.dataset.theme);
    });
  });

  // エクスポート / インポート / リセット
  document.getElementById('exportDataBtn')?.addEventListener('click', exportData);
  document.getElementById('importFile')?.addEventListener('change', importData);
  document.getElementById('dangerResetBtn')?.addEventListener('click', resetAllData);
  document.getElementById('resetConfirmBtn')?.addEventListener('click', resetAllData);
}

// 達成状況トグル（周回対応）
function toggleSpotCompletion(spotId) {
  const log = getSpotLog(spotId);
  const targetLap = currentViewLap;

  // 現在の周回ですでに達成しているか
  const isDoneInCurrentLap = log.count >= targetLap;

  if (isDoneInCurrentLap) {
    // 達成取り消し：この周回より前の回数に戻す
    log.count = Math.max(0, targetLap - 1);
  } else {
    // 達成：この周回数まで回数を引き上げる
    log.count = targetLap;
    if (!log.date) {
      log.date = new Date().toISOString().split('T')[0];
    }
  }
  log.completed = log.count > 0;

  saveLogs();
  renderAll();

  // コンプリート達成チェック
  const stats = getLapProgress(targetLap);
  if (stats.isCompleted && !isDoneInCurrentLap) {
    showCompleteToast(targetLap);
  }
}

// ==========================================================================
// 9. X（Twitter）シェア機能（周回対応）
// ==========================================================================
function shareRallyStatus() {
  const stats = getLapProgress(currentViewLap);
  const lap1Stats = getLapProgress(1);
  const totalCards = getTotalCardCount();
  const title = '【推しの子】× 有馬温泉 お買い物ラリー達成度ログ';

  let shareText = `【推しの子】× 有馬温泉 お買い物ラリー\n`;

  if (currentViewLap === 1) {
    if (stats.isCompleted) {
      shareText += `🎉 全${stats.total}店舗完全制覇！！🌟\n`;
      shareText += `🎁 特典オリジナルカード全種コンプリート達成！\n\n`;
    } else {
      shareText += `全${stats.total}店舗中 ${stats.completedCount}店舗達成（達成率${stats.percent}%）！⭐\n`;
      shareText += `🎁 特典カード: ${stats.completedCount}/${stats.total}枚獲得\n\n`;
    }
  } else {
    // 2周目以降
    if (stats.isCompleted) {
      const stars = '🌟'.repeat(Math.min(currentViewLap, 4));
      shareText += `🎊 ${currentViewLap}周目 全${stats.total}店舗完全制覇！！${stars}\n`;
      shareText += `🎁 特典カード累計: ${totalCards}枚獲得（全${stats.total}店舗 × ${currentViewLap}周制覇）\n\n`;
    } else {
      shareText += `🔥 ${currentViewLap}周目挑戦中！ ${stats.completedCount}/${stats.total}店舗達成（達成率${stats.percent}%）⭐\n`;
      if (currentViewLap === 2 && lap1Stats.isCompleted) {
        shareText += `（1周目全6店舗制覇済🎉）\n`;
      } else if (currentViewLap > 2) {
        shareText += `（${currentViewLap - 1}周目まで全店舗制覇済🎉）\n`;
      }
      shareText += `🎁 特典カード累計: ${totalCards}枚獲得\n\n`;
    }
  }

  shareText += `#推しの子 #お食事処なかさ #なかさ推しの子コラボ`;

  const shareUrl = window.location.href;

  // X (Twitter) Web Intentで直接開く（iOSでの本文欠落バグを回避）
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  window.open(xUrl, '_blank', 'noopener,noreferrer');
}

// ==========================================================================
// 10. コンプリートお祝い演出（周回対応）
// ==========================================================================
function showCompleteToast(lap = 1) {
  const toast = document.getElementById('completeToast');
  if (!toast) return;

  const toastTitle = toast.querySelector('.toast-title');
  const toastDesc = toast.querySelector('.toast-desc');

  if (toastTitle && toastDesc) {
    if (lap > 1) {
      toastTitle.textContent = `🎉 ${lap}周目 全店舗完全制覇！！`;
      toastDesc.textContent = `全6店舗 × ${lap}周制覇！素晴らしい推し活記録です⭐`;
    } else {
      toastTitle.textContent = '🎉 全店舗完全制覇！！';
      toastDesc.textContent = 'お買い物ラリー全店舗制覇おめでとうございます！オリジナルカード全種コンプリート達成！🌟';
    }
  }

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

// ==========================================================================
// 11. 設定モーダル & データ管理
// ==========================================================================
function openSettingsModal() {
  const backdrop = document.getElementById('settingsModalBackdrop');
  if (backdrop) backdrop.classList.add('is-open');
}

function closeSettingsModal() {
  const backdrop = document.getElementById('settingsModalBackdrop');
  if (backdrop) backdrop.classList.remove('is-open');
}

// エクスポート (JSONダウンロード)
function exportData() {
  const data = {
    app: 'nakasa_oshinoko_rally',
    version: '1.0',
    exportDate: new Date().toISOString(),
    logs: rallyLogs
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `nakasa_oshinoko_rally_backup_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// インポート
function importData(e) {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const parsed = JSON.parse(event.target.result);
      if (parsed.logs) {
        rallyLogs = parsed.logs;
      } else if (typeof parsed === 'object') {
        rallyLogs = parsed;
      }
      saveLogs();
      renderAll();
      closeSettingsModal();
      alert('記録データをインポートしました！');
    } catch (err) {
      alert('ファイルの読み込みに失敗しました。正しいJSONファイルかご確認ください。');
    }
  };
  reader.readAsText(file);
}

// 全リセット
function resetAllData() {
  if (confirm('お買い物ラリーのすべての達成チェック・メモ記録をリセットしますか？\n（この操作は取り消せません）')) {
    rallyLogs = {};
    saveLogs();
    renderAll();
    closeSettingsModal();
    alert('記録を初期化しました。');
  }
}

// エスケープ関数
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
