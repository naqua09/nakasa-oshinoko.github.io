/**
 * 【推しの子】× お食事処なかさ コラボ飯ログ アプリケーションロジック
 */

// ==========================================================================
// 1. メニューデータマスター
// ==========================================================================
const MENU_DATA = [
  // --- フード ---
  {
    id: 'food_1',
    category: 'food',
    categoryName: 'フード',
    name: 'アイのとびきり丼',
    characters: ['アイ'],
    charColor: '#ff2a85',
    charBg: 'rgba(255, 42, 133, 0.15)',
    description: 'アイをイメージした特製コラボ丼'
  },
  {
    id: 'food_2',
    category: 'food',
    categoryName: 'フード',
    name: '星を宿すアクアのとり天カレーうどん',
    characters: ['アクア'],
    charColor: '#00b0ff',
    charBg: 'rgba(0, 176, 255, 0.15)',
    description: 'アクアの瞳の星をモチーフにした熱々とり天カレーうどん'
  },
  {
    id: 'food_3',
    category: 'food',
    categoryName: 'フード',
    name: 'ルビーの天真爛漫ピンクソースカツ丼',
    characters: ['ルビー'],
    charColor: '#ff4081',
    charBg: 'rgba(255, 64, 129, 0.15)',
    description: 'ルビーの元気いっぱいなピンクソースカツ丼'
  },
  {
    id: 'food_4',
    category: 'food',
    categoryName: 'フード',
    name: '有馬かなへの全力コール!!サイリウム丼',
    characters: ['有馬かな'],
    charColor: '#ff3b30',
    charBg: 'rgba(255, 59, 48, 0.15)',
    description: 'かな推しのサイリウム熱気が詰まったコラボ丼'
  },
  {
    id: 'food_5',
    category: 'food',
    categoryName: 'フード',
    name: 'あかねのぷくーっとネギトロ丼',
    characters: ['黒川あかね'],
    charColor: '#7c4dff',
    charBg: 'rgba(124, 77, 255, 0.15)',
    description: 'あかねのぷくー顔が浮かぶ贅沢ネギトロ丼'
  },
  {
    id: 'food_6',
    category: 'food',
    categoryName: 'フード',
    name: 'いいね爆増♡MEMちょの冷やしおでん',
    characters: ['MEMちょ'],
    charColor: '#ffd600',
    charBg: 'rgba(255, 214, 0, 0.15)',
    description: 'SNS映え抜群！バズ間違いなしの特製冷やしおでん'
  },

  // --- デザート ---
  {
    id: 'dessert_1',
    category: 'dessert',
    categoryName: 'デザート',
    name: '好きが集まる☆B小町プレート',
    characters: ['B小町', 'ルビー', '有馬かな', 'MEMちょ'],
    charColor: '#ff6090',
    charBg: 'rgba(255, 96, 144, 0.15)',
    description: '新生B小町の魅力がぎゅっと詰まったスペシャルプレート'
  },
  {
    id: 'dessert_2',
    category: 'dessert',
    categoryName: 'デザート',
    name: 'アイ無限恒久永遠推し♡あんみつ',
    characters: ['アイ'],
    charColor: '#ff2a85',
    charBg: 'rgba(255, 42, 133, 0.15)',
    description: 'アイへの愛を表現した至高のあんみつ'
  },
  {
    id: 'dessert_3',
    category: 'dessert',
    categoryName: 'デザート',
    name: 'アクアとあかねのデートセット',
    characters: ['アクア', '黒川あかね'],
    charColor: '#536dfe',
    charBg: 'rgba(83, 109, 254, 0.15)',
    description: '二人の距離感を感じる特別なデートデザートセット'
  },
  {
    id: 'dessert_4',
    category: 'dessert',
    categoryName: 'デザート',
    name: '有馬かなのホワイトサイリウムパフェ',
    characters: ['有馬かな'],
    charColor: '#ff3b30',
    charBg: 'rgba(255, 59, 48, 0.15)',
    description: 'かなの白サイリウムが輝く上品な純白パフェ'
  },

  // --- ドリンク ---
  {
    id: 'drink_1',
    category: 'drink',
    categoryName: 'ドリンク',
    name: 'アイのきらめき白桃クリームオーレ',
    characters: ['アイ'],
    charColor: '#ff2a85',
    charBg: 'rgba(255, 42, 133, 0.15)',
    description: 'アイの輝きをイメージしたまろやか白桃オーレ'
  },
  {
    id: 'drink_2',
    category: 'drink',
    categoryName: 'ドリンク',
    name: 'アクアのちょっと大人なメロンクリームソーダ',
    characters: ['アクア'],
    charColor: '#00b0ff',
    charBg: 'rgba(0, 176, 255, 0.15)',
    description: 'アクアの落ち着いた深みを感じるメロンクリームソーダ'
  },
  {
    id: 'drink_3',
    category: 'drink',
    categoryName: 'ドリンク',
    name: 'ルビーの元気ハツラツいちごオーレ',
    characters: ['ルビー'],
    charColor: '#ff4081',
    charBg: 'rgba(255, 64, 129, 0.15)',
    description: 'フレッシュで甘酸っぱいいちごオーレ'
  },
  {
    id: 'drink_4',
    category: 'drink',
    categoryName: 'ドリンク',
    name: '有馬かなのとろあま爆レスバナナオーレ',
    characters: ['有馬かな'],
    charColor: '#ff3b30',
    charBg: 'rgba(255, 59, 48, 0.15)',
    description: 'とろける甘さで爆レス確定なバナナオーレ'
  },
  {
    id: 'drink_5',
    category: 'drink',
    categoryName: 'ドリンク',
    name: 'バズらせMEMちょのはちみつレモンティー',
    characters: ['MEMちょ'],
    charColor: '#ffd600',
    charBg: 'rgba(255, 214, 0, 0.15)',
    description: '爽やかで飲みやすい、元気チャージレモンティー'
  },
  {
    id: 'drink_6',
    category: 'drink',
    categoryName: 'ドリンク',
    name: '黒川あかねの覚醒ぶどうソーダ',
    characters: ['黒川あかね'],
    charColor: '#7c4dff',
    charBg: 'rgba(124, 77, 255, 0.15)',
    description: '深い紫が引き立つ芳醇な覚醒ぶどうソーダ'
  }
];

// ============================================================================
// Cloudflare Worker API 設定 (イチオシメニュー集計用)
// ============================================================================
const CLOUDFLARE_WORKER_URL = 'https://nakasa-oshi.naqua09.workers.dev';

// 2. ストレージキー & アプリケーション状態
const STORAGE_KEY = 'nakasa_oshinoko_collab_data_v1';
const THEME_STORAGE_KEY = 'nakasa_oshinoko_theme_preference';
const FAVORITES_STORAGE_KEY = 'nakasa_oshi_favorites_v2';
const FAVORITE_DATES_STORAGE_KEY = 'nakasa_oshi_fav_dates_v2';
// 旧キー（マイグレーション用）
const OLD_FAVORITE_STORAGE_KEY = 'nakasa_oshi_favorite_id_v1';
const OLD_FAVORITE_DATE_STORAGE_KEY = 'nakasa_oshi_favorite_date_v1';

let userLogs = {};
// 3部門それぞれの最推しメニューID
let departmentFavorites = {
  food: null,
  dessert: null,
  drink: null
};
// 3部門それぞれの最終投票日 (YYYY-MM-DD)
let departmentVoteDates = {
  food: null,
  dessert: null,
  drink: null
};

let currentFilter = 'all'; // 'all' | 'food' | 'dessert' | 'drink' | 'uneaten'
let currentCharFilter = 'all';
let currentTheme = 'auto'; // 'auto' | 'light' | 'dark'
let searchQuery = '';
let editingItemId = null;
let previousCompleted = false;
let globalRankingStats = null; // Cloudflare Workerから取得した統計データ
let currentRankingCategory = 'food'; // ランキング表示中の部門 ('food' | 'dessert' | 'drink')

// 指定部門で本日すでに最推しを投票/変更したか判定
function hasVotedCategoryToday(category) {
  return departmentVoteDates[category] === getTodayString();
}

// 指定アイテムがその部門の最推しになっているか
function isItemFavorite(itemId) {
  const item = MENU_DATA.find(i => i.id === itemId);
  if (!item) return false;
  return departmentFavorites[item.category] === itemId;
}

// 読み込み & 旧データからのマイグレーション
function loadLogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      userLogs = JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load logs from localStorage', e);
    userLogs = {};
  }

  // 3部門最推しメニューと最終投票日の読み込み
  try {
    const rawFavs = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (rawFavs) {
      departmentFavorites = { ...departmentFavorites, ...JSON.parse(rawFavs) };
    } else {
      // 旧単一最推しキーからの自動マイグレーション
      const oldFavId = localStorage.getItem(OLD_FAVORITE_STORAGE_KEY);
      if (oldFavId) {
        const item = MENU_DATA.find(i => i.id === oldFavId);
        if (item && departmentFavorites[item.category] !== undefined) {
          departmentFavorites[item.category] = oldFavId;
        }
      }
    }

    const rawDates = localStorage.getItem(FAVORITE_DATES_STORAGE_KEY);
    if (rawDates) {
      departmentVoteDates = { ...departmentVoteDates, ...JSON.parse(rawDates) };
    } else {
      const oldDate = localStorage.getItem(OLD_FAVORITE_DATE_STORAGE_KEY);
      if (oldDate) {
        const oldFavId = localStorage.getItem(OLD_FAVORITE_STORAGE_KEY);
        if (oldFavId) {
          const item = MENU_DATA.find(i => i.id === oldFavId);
          if (item && departmentVoteDates[item.category] !== undefined) {
            departmentVoteDates[item.category] = oldDate;
          }
        }
      }
    }
  } catch (e) {
    console.error('Failed to load department favorites from localStorage', e);
  }
}

// 保存
function saveLogs() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userLogs));
  } catch (e) {
    console.error('Failed to save logs to localStorage', e);
  }
  updateStats();
  updateCyalumeShelf();
}

// 部門別最推しメニューの保存 & Cloudflare Worker への投票送信（部門ごと1日1回限定）
async function setCategoryFavorite(category, newItemId, force = false) {
  const previousItemId = departmentFavorites[category];
  if (previousItemId === newItemId) return true;

  const catName = category === 'food' ? 'フード' : (category === 'dessert' ? 'デザート' : 'ドリンク');

  // 1日1回制限チェック (forceがtrueの場合を除く)
  if (!force && hasVotedCategoryToday(category)) {
    alert(`【${catName}部門】の最推しの投票・変更は1日1回までです。\n日付が変わると（明日以降に）再度変更できます。`);
    return false;
  }

  departmentFavorites[category] = newItemId;
  departmentVoteDates[category] = getTodayString();

  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(departmentFavorites));
    localStorage.setItem(FAVORITE_DATES_STORAGE_KEY, JSON.stringify(departmentVoteDates));
  } catch (e) {
    console.error('Failed to save department favorites to localStorage', e);
  }

  // UI更新
  updateFavoriteDisplay();
  renderMenuList();

  // Cloudflare Workers への非同期投票送信
  if (CLOUDFLARE_WORKER_URL) {
    await submitVoteToWorker(newItemId, previousItemId);
  } else {
    // Worker未設定時はローカル集計でランキング表示更新
    updateRankingDisplay();
  }
  return true;
}

function getItemLog(id) {
  if (!userLogs[id]) {
    userLogs[id] = {
      eaten: false,
      count: 0,
      date: '',
      memo: '',
      history: []
    };
  }

  // 既存データ（v1/旧形式）から履歴配列への自動移行・正規化
  if (!Array.isArray(userLogs[id].history)) {
    userLogs[id].history = [];
    if (userLogs[id].eaten) {
      userLogs[id].history.push({
        id: 'h_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        date: userLogs[id].date || getTodayString(),
        count: userLogs[id].count || 1
      });
    }
  }

  // 履歴から合計杯数と最新日付を同期
  if (userLogs[id].history.length > 0) {
    userLogs[id].count = calculateHistoryTotal(userLogs[id].history);
    userLogs[id].date = getLatestHistoryDate(userLogs[id].history);
    userLogs[id].eaten = true;
  }

  return userLogs[id];
}

// 履歴合計杯数の計算ヘルパー
function calculateHistoryTotal(history) {
  if (!Array.isArray(history)) return 0;
  return history.reduce((sum, h) => sum + (parseInt(h.count, 10) || 0), 0);
}

// 履歴の最新日付の取得ヘルパー
function getLatestHistoryDate(history) {
  if (!Array.isArray(history) || history.length === 0) return '';
  const sorted = [...history].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  return sorted[0].date || '';
}

// 一覧画面用: 訪問履歴の要約文字列
function formatHistorySummary(log) {
  if (!log.eaten) return '';
  const history = log.history || [];
  if (history.length === 0) {
    return log.date ? `🗓 ${log.date}` : '🗓 済';
  }
  if (history.length === 1) {
    const h = history[0];
    return `🗓 ${h.date} (${h.count}杯)`;
  }
  // 複数日訪問の場合 (例: 9/1(1), 9/6(2) [計3杯])
  const dateSummaries = history.map(h => {
    const parts = (h.date || '').split('-');
    const m = parts[1] ? parseInt(parts[1], 10) : '';
    const d = parts[2] ? parseInt(parts[2], 10) : '';
    const dateStr = (m && d) ? `${m}/${d}` : (h.date || '日付不明');
    return `${dateStr}(${h.count})`;
  });
  return `🗓 ${dateSummaries.join(', ')} [計${log.count}杯]`;
}

// 今日の日付文字列（YYYY-MM-DD）
function getTodayString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// ==========================================================================
// 3. UIレンダリング & DOM要素
// ==========================================================================
const menuSectionsContainer = document.getElementById('menuSectionsContainer');
const searchInput = document.getElementById('searchInput');
const searchClearBtn = document.getElementById('searchClearBtn');
const stickyControls = document.getElementById('stickyControls');

const emptyState = document.getElementById('emptyState');
const eatenCountEl = document.getElementById('eatenCount');
const trophyPercentEl = document.getElementById('trophyPercent');
const progressFillEl = document.getElementById('progressFill');
const statFoodEl = document.getElementById('statFood');
const statDessertEl = document.getElementById('statDessert');
const statDrinkEl = document.getElementById('statDrink');
const navbar = document.getElementById('navbar');
const navTitle = document.getElementById('navTitle');
const completeToast = document.getElementById('completeToast');

// ランキング・最推し関連要素
const rankingCard = document.getElementById('rankingCard');
const rankingList = document.getElementById('rankingList');
const reloadRankingBtn = document.getElementById('reloadRankingBtn');
const myFavFood = document.getElementById('myFavFood');
const myFavDessert = document.getElementById('myFavDessert');
const myFavDrink = document.getElementById('myFavDrink');
const rankingTotalVotes = document.getElementById('rankingTotalVotes');
const rankingStatusBadge = document.getElementById('rankingStatusBadge');

// ボトムシート関連
const bottomSheetBackdrop = document.getElementById('bottomSheetBackdrop');
const sheetCloseBtn = document.getElementById('sheetCloseBtn');
const sheetTitle = document.getElementById('sheetTitle');
const sheetCharBadge = document.getElementById('sheetCharBadge');
const sheetCatBadge = document.getElementById('sheetCatBadge');
const sheetCheckInput = document.getElementById('sheetCheckInput');
const sheetFavoriteLabel = document.getElementById('sheetFavoriteLabel');
const sheetFavoriteSublabel = document.getElementById('sheetFavoriteSublabel');
const sheetFavoriteInput = document.getElementById('sheetFavoriteInput');
const sheetFavoriteNotice = document.getElementById('sheetFavoriteNotice');
const sheetMemoInput = document.getElementById('sheetMemoInput');
const saveSheetBtn = document.getElementById('saveSheetBtn');

// 訪問履歴関連
const historySection = document.getElementById('historySection');
const historyTotalBadge = document.getElementById('historyTotalBadge');
const historyList = document.getElementById('historyList');
const addHistoryBtn = document.getElementById('addHistoryBtn');
let currentEditingHistory = []; // モーダル編集用の一時配列

// 設定モーダル関連
const settingsModalBackdrop = document.getElementById('settingsModalBackdrop');
const settingsCloseBtn = document.getElementById('settingsCloseBtn');
const menuSettingsBtn = document.getElementById('menuSettingsBtn');
const shareBtn = document.getElementById('shareBtn');
const shareResultBtn = document.getElementById('shareResultBtn');
const resetConfirmBtn = document.getElementById('resetConfirmBtn');
const exportDataBtn = document.getElementById('exportDataBtn');
const importFile = document.getElementById('importFile');
const dangerResetBtn = document.getElementById('dangerResetBtn');

// ==========================================================================
// 4. テーマ管理（ダーク・ライト・OS自動連動）
// ==========================================================================
function applyTheme(mode) {
  currentTheme = mode;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch (e) {}

  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  const metaStatusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
  
  const isSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const effectiveTheme = (mode === 'auto') ? (isSystemDark ? 'dark' : 'light') : mode;

  if (mode === 'auto') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', mode);
  }

  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', effectiveTheme === 'dark' ? '#12131f' : '#f2f2f7');
  }
  if (metaStatusBar) {
    metaStatusBar.setAttribute('content', effectiveTheme === 'dark' ? 'black-translucent' : 'default');
  }

  // 設定モーダル内のUIボタンのアクティブ更新
  const themeBtns = document.querySelectorAll('#themeSelector .theme-btn');
  themeBtns.forEach(btn => {
    if (btn.getAttribute('data-theme') === mode) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function initTheme() {
  let saved = 'auto';
  try {
    saved = localStorage.getItem(THEME_STORAGE_KEY) || 'auto';
  } catch (e) {}
  applyTheme(saved);

  // スマホ・OSの外観設定のリアルタイム変更をリッスン
  if (window.matchMedia) {
    const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    try {
      darkMediaQuery.addEventListener('change', () => {
        if (currentTheme === 'auto') {
          applyTheme('auto');
        }
      });
    } catch (e) {
      // 古いブラウザ対応 (addListener)
      darkMediaQuery.addListener(() => {
        if (currentTheme === 'auto') {
          applyTheme('auto');
        }
      });
    }
  }
}

// ==========================================================================
// 5. アプリケーション初期化
// ==========================================================================
function initApp() {
  initTheme();
  loadLogs();
  updateFavoriteDisplay();
  renderMenuList();
  updateCyalumeShelf();
  updateStats();
  initRankingSystem();
  setupEventListeners();
  setupScrollListener();
}

// リスト描画
function renderMenuList() {
  menuSectionsContainer.innerHTML = '';

  // フィルタリング処理
  const filtered = MENU_DATA.filter(item => {
    const log = getItemLog(item.id);
    // カテゴリフィルター
    if (currentFilter === 'uneaten') {
      if (log.eaten) return false;
    } else if (currentFilter !== 'all' && item.category !== currentFilter) {
      return false;
    }

    // キャラクターフィルター
    if (currentCharFilter !== 'all') {
      if (!item.characters.includes(currentCharFilter)) {
        return false;
      }
    }

    // 検索クエリフィルター
    if (searchQuery.trim() !== '') {
      const q = searchQuery.trim().toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchChar = item.characters.some(c => c.toLowerCase().includes(q));
      const matchDesc = item.description ? item.description.toLowerCase().includes(q) : false;
      if (!matchName && !matchChar && !matchDesc) return false;
    }

    return true;
  });

  if (filtered.length === 0) {
    emptyState.style.display = 'block';
    return;
  } else {
    emptyState.style.display = 'none';
  }

  // カテゴリごとにグループ化
  const categories = [
    { key: 'food', name: 'フード' },
    { key: 'dessert', name: 'デザート' },
    { key: 'drink', name: 'ドリンク' }
  ];

  categories.forEach(cat => {
    const itemsInCat = filtered.filter(it => it.category === cat.key);
    if (itemsInCat.length === 0) return;

    // グループコンテナ
    const groupEl = document.createElement('div');
    groupEl.className = 'menu-group';

    // グループヘッダー
    const headerEl = document.createElement('div');
    headerEl.className = 'group-header';
    const eatenInCat = itemsInCat.filter(i => getItemLog(i.id).eaten).length;
    headerEl.innerHTML = `
      <span>${cat.name}</span>
      <span class="group-header-badge">${eatenInCat} / ${itemsInCat.length}</span>
    `;
    groupEl.appendChild(headerEl);

    // リストコンテナ
    const listEl = document.createElement('div');
    listEl.className = 'ios-grouped-list';

    itemsInCat.forEach(item => {
      const log = getItemLog(item.id);
      const isEaten = log.eaten;
      const isFavorite = isItemFavorite(item.id);

      const rowEl = document.createElement('div');
      rowEl.className = `menu-item-row ${isEaten ? 'is-eaten' : ''}`;
      rowEl.setAttribute('data-id', item.id);

      rowEl.innerHTML = `
        <div class="item-check-area" data-action="toggle-check" aria-label="食べたチェック">
          <div class="ios-checkbox">
            <span class="check-mark">✓</span>
          </div>
        </div>
        <div class="item-content" data-action="open-detail">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 3px; flex-wrap: wrap;">
            <div class="item-character-tag" style="background: ${item.charBg}; color: ${item.charColor}; border: 1px solid ${item.charColor}44;">
              ★ ${item.characters.join('・')}
            </div>
            ${isFavorite ? '<span class="item-fav-badge">👑 最推し</span>' : ''}
          </div>
          <div class="item-title">${item.name}</div>
          <div class="item-meta-row">
            ${isEaten ? `<span class="item-eaten-badge">${formatHistorySummary(log)}</span>` : ''}
            ${log.memo ? `<span class="item-memo-preview">💬 ${escapeHtml(log.memo)}</span>` : ''}
          </div>
        </div>
        <div class="item-action-area" data-action="open-detail">
          <span class="item-count-badge">${isEaten ? `${log.count || 1}杯/皿` : '未食'}</span>
          <button type="button" class="chevron-btn" aria-label="詳細編集">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      `;

      listEl.appendChild(rowEl);
    });

    groupEl.appendChild(listEl);
    menuSectionsContainer.appendChild(groupEl);
  });
}

// 達成率・進捗バー更新
function updateStats() {
  const total = MENU_DATA.length;
  let eaten = 0;
  let foodEaten = 0, foodTotal = 0;
  let dessertEaten = 0, dessertTotal = 0;
  let drinkEaten = 0, drinkTotal = 0;

  MENU_DATA.forEach(item => {
    const log = getItemLog(item.id);
    if (item.category === 'food') foodTotal++;
    if (item.category === 'dessert') dessertTotal++;
    if (item.category === 'drink') drinkTotal++;

    if (log.eaten) {
      eaten++;
      if (item.category === 'food') foodEaten++;
      if (item.category === 'dessert') dessertEaten++;
      if (item.category === 'drink') drinkEaten++;
    }
  });

  const percent = Math.round((eaten / total) * 100);

  eatenCountEl.textContent = eaten;
  trophyPercentEl.textContent = `${percent}%`;
  progressFillEl.style.width = `${percent}%`;

  statFoodEl.textContent = `${foodEaten}/${foodTotal}`;
  statDessertEl.textContent = `${dessertEaten}/${dessertTotal}`;
  statDrinkEl.textContent = `${drinkEaten}/${drinkTotal}`;

  // 全制覇（100%達成）時の祝福演出
  if (eaten === total && !previousCompleted && total > 0) {
    triggerCelebration();
  }
  previousCompleted = (eaten === total);
}


// --------------------------------------------------------------------------
// 推しサイリウム点灯棚の更新
// --------------------------------------------------------------------------
function updateCyalumeShelf() {
  const characters = ['アイ', 'アクア', 'ルビー', '有馬かな', '黒川あかね', 'MEMちょ'];
  characters.forEach(charName => {
    const hasEaten = MENU_DATA.some(item => {
      return item.characters.includes(charName) && getItemLog(item.id).eaten;
    });

    const lightEl = document.querySelector(`.cyalume-light[data-char="${charName}"]`);
    if (lightEl) {
      if (hasEaten) {
        lightEl.classList.add('is-lit');
      } else {
        lightEl.classList.remove('is-lit');
      }
    }
  });
}


// 全制覇セレブレーション演出
function triggerCelebration() {
  // トースト表示
  completeToast.classList.add('is-visible');
  setTimeout(() => {
    completeToast.classList.remove('is-visible');
  }, 4500);
}

// チェック切り替え（ワンタップ）
// チェック切り替え（ワンタップ）
function toggleItemCheck(id) {
  const log = getItemLog(id);
  log.eaten = !log.eaten;
  
  if (log.eaten) {
    if (!log.history || log.history.length === 0) {
      log.history = [{
        id: 'h_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        date: getTodayString(),
        count: 1
      }];
    }
    log.count = calculateHistoryTotal(log.history);
    log.date = getLatestHistoryDate(log.history);
    

  } else {
    log.count = 0;
    log.history = [];
  }

  saveLogs();
  renderMenuList();
}

// ==========================================================================
// 5. 詳細モーダル（iOSボトムシート） & 訪問履歴管理
// ==========================================================================
function openDetailModal(id) {
  const item = MENU_DATA.find(i => i.id === id);
  if (!item) return;

  editingItemId = id;
  const log = getItemLog(id);

  sheetTitle.textContent = item.name;
  sheetCharBadge.textContent = `★ ${item.characters.join('・')}`;
  sheetCharBadge.style.background = item.charBg;
  sheetCharBadge.style.color = item.charColor;
  sheetCatBadge.textContent = item.categoryName;

  // 編集用一時履歴のクローン
  currentEditingHistory = Array.isArray(log.history) 
    ? JSON.parse(JSON.stringify(log.history)) 
    : [];

  // もし食べたフラグがONで履歴が空なら、今日1杯を自動追加
  if (log.eaten && currentEditingHistory.length === 0) {
    currentEditingHistory.push({
      id: 'h_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      date: log.date || getTodayString(),
      count: log.count || 1
    });
  }

  sheetCheckInput.checked = (currentEditingHistory.length > 0 && calculateHistoryTotal(currentEditingHistory) > 0);
  sheetMemoInput.value = log.memo || '';

  // 履歴リストの描画
  renderHistoryList();

  // 最推しトグル初期化 & 部門別1日1回制限のUI制御
  const itemCategory = item.category;
  const isVotedToday = hasVotedCategoryToday(itemCategory);
  const isCurrentFav = (departmentFavorites[itemCategory] === id);
  const catName = item.categoryName || (itemCategory === 'food' ? 'フード' : (itemCategory === 'dessert' ? 'デザート' : 'ドリンク'));

  if (sheetFavoriteLabel) {
    sheetFavoriteLabel.textContent = `👑 【${catName}部門】最推しに設定`;
  }
  if (sheetFavoriteSublabel) {
    sheetFavoriteSublabel.textContent = `${catName}部門のお気に入りメニュー（1日1回限定）`;
  }

  if (sheetFavoriteInput) {
    sheetFavoriteInput.checked = isCurrentFav;
    // 今日すでにこの部門で最推しを変更/投票済みの場合はトグルを無効化
    if (isVotedToday) {
      sheetFavoriteInput.disabled = true;
    } else {
      sheetFavoriteInput.disabled = false;
    }
  }

  if (sheetFavoriteNotice) {
    if (isVotedToday) {
      if (isCurrentFav) {
        sheetFavoriteNotice.textContent = `✅ 本日の${catName}部門最推しに決定済みです（明日以降に変更可能）`;
        sheetFavoriteNotice.style.color = '#10b981';
      } else {
        sheetFavoriteNotice.textContent = `🔒 本日はすでに${catName}部門の最推しを決定済みです（明日以降に変更可能）`;
        sheetFavoriteNotice.style.color = 'var(--text-tertiary)';
      }
    } else {
      sheetFavoriteNotice.textContent = `※ ${catName}部門の最推し投票は1日1回のみ選択・変更できます。`;
      sheetFavoriteNotice.style.color = 'var(--text-tertiary)';
    }
  }

  bottomSheetBackdrop.classList.add('is-open');
}

function closeDetailModal() {
  bottomSheetBackdrop.classList.remove('is-open');
  editingItemId = null;
  currentEditingHistory = [];
}

// モーダル内の訪問履歴行レンダリング
function renderHistoryList() {
  if (!historyList) return;
  historyList.innerHTML = '';

  const total = calculateHistoryTotal(currentEditingHistory);
  if (historyTotalBadge) {
    historyTotalBadge.textContent = `合計 ${total}杯/皿`;
  }

  if (currentEditingHistory.length === 0) {
    historyList.innerHTML = `
      <div class="history-empty-hint">
        まだ訪問記録がありません。<br>「＋ 訪問日・杯数を追加」を押して記録してください。
      </div>
    `;
    return;
  }

  currentEditingHistory.forEach((h, index) => {
    const row = document.createElement('div');
    row.className = 'history-row';
    row.setAttribute('data-id', h.id);

    row.innerHTML = `
      <div class="history-row-left">
        <span style="font-size:12px;font-weight:700;color:var(--text-tertiary);width:16px;">${index + 1}.</span>
        <input type="date" class="history-date-input" value="${h.date || getTodayString()}">
      </div>
      <div class="history-row-right">
        <div class="history-stepper">
          <button type="button" class="history-stepper-btn" data-action="minus">−</button>
          <span class="history-stepper-val">${h.count || 1}</span>
          <button type="button" class="history-stepper-btn" data-action="plus">＋</button>
        </div>
        <button type="button" class="history-del-btn" data-action="delete" title="この訪問記録を削除">✕</button>
      </div>
    `;

    // 日付変更イベント
    const dateInput = row.querySelector('.history-date-input');
    dateInput.addEventListener('change', (e) => {
      h.date = e.target.value;
    });

    // ステッパー＆削除イベント
    row.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const action = btn.getAttribute('data-action');

      if (action === 'minus') {
        if (h.count > 1) {
          h.count--;
          renderHistoryList();
        } else if (h.count === 1) {
          // 1の時にマイナスを押したら行を削除
          currentEditingHistory = currentEditingHistory.filter(item => item.id !== h.id);
          sheetCheckInput.checked = (currentEditingHistory.length > 0);
          renderHistoryList();
        }
      } else if (action === 'plus') {
        h.count = (parseInt(h.count, 10) || 1) + 1;
        renderHistoryList();
      } else if (action === 'delete') {
        currentEditingHistory = currentEditingHistory.filter(item => item.id !== h.id);
        sheetCheckInput.checked = (currentEditingHistory.length > 0);
        renderHistoryList();
      }
    });

    historyList.appendChild(row);
  });
}

async function saveDetailModal() {
  if (!editingItemId) return;
  const log = getItemLog(editingItemId);

  // 履歴の反映
  log.history = currentEditingHistory;
  log.count = calculateHistoryTotal(log.history);
  log.date = getLatestHistoryDate(log.history);
  log.eaten = (log.count > 0 && log.history.length > 0);
  log.memo = sheetMemoInput.value.trim();

  // 最推し設定の反映（部門ごと1日1回のみ）
  const item = MENU_DATA.find(i => i.id === editingItemId);
  if (item && sheetFavoriteInput && !sheetFavoriteInput.disabled) {
    const category = item.category;
    if (sheetFavoriteInput.checked) {
      if (departmentFavorites[category] !== editingItemId) {
        const ok = await setCategoryFavorite(category, editingItemId);
        if (!ok) return;
      }
    } else {
      if (departmentFavorites[category] === editingItemId) {
        const ok = await setCategoryFavorite(category, null);
        if (!ok) return;
      }
    }
  }

  saveLogs();
  renderMenuList();
  closeDetailModal();
}

// ==========================================================================
// 6. イチオシ表示 & ランキング統計 (Cloudflare Workers連携)
// ==========================================================================
function updateFavoriteDisplay() {
  const cats = [
    { key: 'food', el: myFavFood },
    { key: 'dessert', el: myFavDessert },
    { key: 'drink', el: myFavDrink }
  ];

  cats.forEach(({ key, el }) => {
    if (!el) return;
    const favId = departmentFavorites[key];
    if (favId) {
      const item = MENU_DATA.find(i => i.id === favId);
      el.textContent = item ? `【${item.name}】` : '未設定';
    } else {
      el.textContent = '未設定';
    }
  });
}

async function initRankingSystem() {
  updateFavoriteDisplay();
  if (CLOUDFLARE_WORKER_URL) {
    if (rankingStatusBadge) {
      rankingStatusBadge.textContent = '通信中...';
      rankingStatusBadge.classList.remove('live');
    }
    await fetchStatsFromWorker();
  } else {
    // ローカルモード
    if (rankingStatusBadge) {
      rankingStatusBadge.textContent = 'ローカル';
      rankingStatusBadge.classList.remove('live');
    }
    updateRankingDisplay();
  }
}

// Cloudflare Workers から統計データ取得
async function fetchStatsFromWorker() {
  if (!CLOUDFLARE_WORKER_URL) {
    updateRankingDisplay();
    return;
  }
  try {
    if (reloadRankingBtn) reloadRankingBtn.classList.add('is-spinning');
    const res = await fetch(`${CLOUDFLARE_WORKER_URL.replace(/\/$/, '')}/api/stats`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    globalRankingStats = data;
    if (rankingStatusBadge) {
      rankingStatusBadge.textContent = 'LIVE';
      rankingStatusBadge.classList.add('live');
    }
    updateRankingDisplay();
  } catch (err) {
    console.warn('Failed to fetch stats from Cloudflare Worker:', err);
    if (rankingStatusBadge) {
      rankingStatusBadge.textContent = 'オフライン';
      rankingStatusBadge.classList.remove('live');
    }
    updateRankingDisplay();
  } finally {
    if (reloadRankingBtn) {
      setTimeout(() => reloadRankingBtn.classList.remove('is-spinning'), 400);
    }
  }
}

// Cloudflare Workers へ投票送信
async function submitVoteToWorker(newItemId, previousItemId) {
  if (!CLOUDFLARE_WORKER_URL) return;
  try {
    const res = await fetch(`${CLOUDFLARE_WORKER_URL.replace(/\/$/, '')}/api/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        itemId: newItemId,
        previousItemId: previousItemId
      })
    });
    if (res.ok) {
      const data = await res.json();
      globalRankingStats = data;
      if (rankingStatusBadge) {
        rankingStatusBadge.textContent = 'LIVE';
        rankingStatusBadge.classList.add('live');
      }
      updateRankingDisplay();
    }
  } catch (err) {
    console.warn('Failed to submit vote to Cloudflare Worker:', err);
  }
}

// ランキング表示の描画（3部門対応）
function updateRankingDisplay() {
  if (!rankingList) return;
  rankingList.innerHTML = '';

  const catName = currentRankingCategory === 'food' ? 'フード' : (currentRankingCategory === 'dessert' ? 'デザート' : 'ドリンク');

  // 現在選択中の部門に属するメニュー
  const categoryItems = MENU_DATA.filter(item => item.category === currentRankingCategory);
  const categoryItemIds = new Set(categoryItems.map(i => i.id));

  let categoryTotalVotes = 0;
  let categoryRanking = [];

  if (globalRankingStats && globalRankingStats.votes) {
    const votes = globalRankingStats.votes;
    for (const [itemId, count] of Object.entries(votes)) {
      if (categoryItemIds.has(itemId) && count > 0) {
        categoryTotalVotes += count;
        categoryRanking.push({ itemId, count });
      }
    }
    categoryRanking.sort((a, b) => b.count - a.count);
  } else {
    // ローカル集計
    const myFavId = departmentFavorites[currentRankingCategory];
    if (myFavId) {
      categoryTotalVotes = 1;
      categoryRanking = [{ itemId: myFavId, count: 1 }];
    }
  }

  if (rankingTotalVotes) {
    rankingTotalVotes.textContent = `${catName}部門: ${categoryTotalVotes} 票`;
  }

  if (categoryRanking.length === 0) {
    rankingList.innerHTML = `
      <div class="ranking-empty">
        ${catName}部門の投票はまだありません。<br>メニュー詳細からあなたの「👑 最推し」を投票してください！
      </div>
    `;
    return;
  }

  const medals = ['🥇', '🥈', '🥉'];
  const top3 = categoryRanking.slice(0, 3);

  top3.forEach((rankItem, index) => {
    const item = MENU_DATA.find(i => i.id === rankItem.itemId);
    if (!item) return;

    const percent = categoryTotalVotes > 0 ? Math.round((rankItem.count / categoryTotalVotes) * 100) : 0;
    const medal = medals[index] || `${index + 1}位`;

    const row = document.createElement('div');
    row.className = 'ranking-item';
    row.innerHTML = `
      <div class="ranking-item-top">
        <div class="ranking-item-left">
          <span class="ranking-medal">${medal}</span>
          <span class="ranking-item-name" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</span>
        </div>
        <div class="ranking-item-right">
          <span>${rankItem.count}票 (${percent}%)</span>
        </div>
      </div>
      <div class="ranking-bar-track">
        <div class="ranking-bar-fill" style="width: ${percent}%;"></div>
      </div>
    `;
    rankingList.appendChild(row);
  });
}

// ==========================================================================
// 7. 設定・シェア・データ管理
// ==========================================================================
function openSettingsModal() {
  settingsModalBackdrop.classList.add('is-open');
}

function closeSettingsModal() {
  settingsModalBackdrop.classList.remove('is-open');
}

function shareCurrentProgress() {
  const total = MENU_DATA.length;
  let eaten = 0;
  let foodEaten = 0;
  let dessertEaten = 0;
  let drinkEaten = 0;

  MENU_DATA.forEach(item => {
    const log = getItemLog(item.id);
    if (log.eaten) {
      eaten++;
      if (item.category === 'food') foodEaten++;
      else if (item.category === 'dessert') dessertEaten++;
      else if (item.category === 'drink') drinkEaten++;
    }
  });

  const percent = Math.round((eaten / total) * 100);
  const title = `【推しの子】× お食事処なかさ コラボ飯ログ`;

  let shareText = `${title}\n`;
  if (eaten === total) {
    shareText += `🎉 全${total}品コンプリート達成！！🌟\n`;
  } else {
    shareText += `全${total}品中 ${eaten}品制覇（達成率${percent}%）！⭐\n`;
  }

  shareText += `🍚フード: ${foodEaten}/6品\n`;
  shareText += `🍰デザート: ${dessertEaten}/4品\n`;
  shareText += `🍹ドリンク: ${drinkEaten}/6品\n\n`;
  shareText += `#推しの子 #お食事処なかさ #なかさ推しの子コラボ`;

  const shareUrl = window.location.href;

  if (navigator.share) {
    navigator.share({
      title: title,
      text: shareText,
      url: shareUrl
    }).catch(() => {});
  } else {
    // X (Twitter) Web Intent
    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(xUrl, '_blank', 'noopener,noreferrer');
  }
}

// 全チェックリセット
function resetAllData() {
  if (confirm('すべての食べたチェック・最推し・メモの記録をリセットしますか？\n（この操作は取り消せません）')) {
    userLogs = {};
    saveLogs();

    // 3部門最推しのリセット
    ['food', 'dessert', 'drink'].forEach(cat => {
      setCategoryFavorite(cat, null, true);
    });
    departmentFavorites = { food: null, dessert: null, drink: null };
    departmentVoteDates = { food: null, dessert: null, drink: null };
    try {
      localStorage.removeItem(FAVORITES_STORAGE_KEY);
      localStorage.removeItem(FAVORITE_DATES_STORAGE_KEY);
      localStorage.removeItem(OLD_FAVORITE_STORAGE_KEY);
      localStorage.removeItem(OLD_FAVORITE_DATE_STORAGE_KEY);
    } catch (e) {}

    updateFavoriteDisplay();
    renderMenuList();
    closeSettingsModal();
    alert('記録を初期化しました。');
  }
}

// JSONエクスポート
function exportData() {
  const exportPayload = {
    version: 3,
    departmentFavorites: departmentFavorites,
    departmentVoteDates: departmentVoteDates,
    logs: userLogs
  };
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
  const dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute("href", dataStr);
  const now = new Date().toISOString().slice(0, 10);
  dlAnchorElem.setAttribute("download", `nakasa_oshinoko_log_${now}.json`);
  dlAnchorElem.click();
}

// JSONインポート
function importData(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (typeof imported === 'object' && imported !== null) {
        if (imported.logs && typeof imported.logs === 'object') {
          userLogs = imported.logs;
          // v3フォーマット
          if (imported.departmentFavorites) {
            departmentFavorites = { ...departmentFavorites, ...imported.departmentFavorites };
            departmentVoteDates = imported.departmentVoteDates ? { ...departmentVoteDates, ...imported.departmentVoteDates } : departmentVoteDates;
            localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(departmentFavorites));
            localStorage.setItem(FAVORITE_DATES_STORAGE_KEY, JSON.stringify(departmentVoteDates));
          } else if (imported.favoriteItemId) {
            // v2フォーマットからのマイグレーション
            const item = MENU_DATA.find(i => i.id === imported.favoriteItemId);
            if (item) {
              departmentFavorites[item.category] = imported.favoriteItemId;
              if (imported.favoriteVoteDate) {
                departmentVoteDates[item.category] = imported.favoriteVoteDate;
              }
              localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(departmentFavorites));
              localStorage.setItem(FAVORITE_DATES_STORAGE_KEY, JSON.stringify(departmentVoteDates));
            }
          }
        } else {
          userLogs = imported;
        }
        // 全アイテムのhistory構造を正規化
        Object.keys(userLogs).forEach(id => {
          getItemLog(id);
        });
        saveLogs();
        renderMenuList();
        closeSettingsModal();
        alert('記録データをインポートしました！');
      } else {
        throw new Error('Invalid format');
      }
    } catch (err) {
      alert('無効なデータファイルです。正しいJSONファイルを選択してください。');
    }
  };
  reader.readAsText(file);
}

// ==========================================================================
// 7. イベントリスナー
// ==========================================================================
function setupEventListeners() {
  // メニューリストのタップイベント（イベントデリゲーション）
  menuSectionsContainer.addEventListener('click', (e) => {
    const row = e.target.closest('.menu-item-row');
    if (!row) return;
    const itemId = row.getAttribute('data-id');

    // チェックボックスタップ
    if (e.target.closest('[data-action="toggle-check"]')) {
      e.stopPropagation();
      toggleItemCheck(itemId);
      return;
    }

    // 行全体または詳細ボタンタップ
    openDetailModal(itemId);
  });

  // カテゴリセグメントコントロール
  const segmentBtns = document.querySelectorAll('.segment-btn');
  segmentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      segmentBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      renderMenuList();
    });
  });

  // キャラクターピル
  const charPills = document.querySelectorAll('.char-pill');
  charPills.forEach(pill => {
    pill.addEventListener('click', () => {
      charPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCharFilter = pill.getAttribute('data-char');
      renderMenuList();
    });
  });

  // ボトムシート内操作
  sheetCloseBtn.addEventListener('click', closeDetailModal);
  bottomSheetBackdrop.addEventListener('click', (e) => {
    if (e.target === bottomSheetBackdrop) closeDetailModal();
  });

  // 「食べた！」スイッチ切り替え
  sheetCheckInput.addEventListener('change', () => {
    if (sheetCheckInput.checked) {
      if (currentEditingHistory.length === 0) {
        currentEditingHistory.push({
          id: 'h_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
          date: getTodayString(),
          count: 1
        });
      }
    } else {
      currentEditingHistory = [];
    }
    renderHistoryList();
  });

  // 「＋ 訪問日・杯数を追加」ボタン
  if (addHistoryBtn) {
    addHistoryBtn.addEventListener('click', () => {
      currentEditingHistory.push({
        id: 'h_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        date: getTodayString(),
        count: 1
      });
      sheetCheckInput.checked = true;
      renderHistoryList();
    });
  }

  saveSheetBtn.addEventListener('click', saveDetailModal);

  // 設定・シェア関連
  shareBtn.addEventListener('click', shareCurrentProgress);
  shareResultBtn.addEventListener('click', shareCurrentProgress);
  resetConfirmBtn.addEventListener('click', resetAllData);
  menuSettingsBtn.addEventListener('click', openSettingsModal);
  settingsCloseBtn.addEventListener('click', closeSettingsModal);
  settingsModalBackdrop.addEventListener('click', (e) => {
    if (e.target === settingsModalBackdrop) closeSettingsModal();
  });

  exportDataBtn.addEventListener('click', exportData);
  dangerResetBtn.addEventListener('click', resetAllData);
  importFile.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      importData(e.target.files[0]);
      e.target.value = '';
    }
  });

  // テーマセレクター切り替え
  const themeSelector = document.getElementById('themeSelector');
  if (themeSelector) {
    themeSelector.addEventListener('click', (e) => {
      const btn = e.target.closest('.theme-btn');
      if (!btn) return;
      const mode = btn.getAttribute('data-theme');
      applyTheme(mode);
    });
  }

  // ランキング再読み込みボタン
  if (reloadRankingBtn) {
    reloadRankingBtn.addEventListener('click', () => {
      fetchStatsFromWorker();
    });
  }

  // ランキング部門タブ切り替え
  const rankingTabBtns = document.querySelectorAll('.ranking-tab-btn');
  rankingTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      rankingTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentRankingCategory = btn.getAttribute('data-ranking-cat');
      updateRankingDisplay();
    });
  });


  // 検索入力イベント
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (searchClearBtn) {
        searchClearBtn.style.display = searchQuery ? 'flex' : 'none';
      }
      renderMenuList();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchQuery = '';
        searchClearBtn.style.display = 'none';
        searchInput.focus();
        renderMenuList();
      }
    });
  }
}

// スクロール時のiOSラージタイトル ↔ ナビゲーションタイトルアニメーション
function setupScrollListener() {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 75) {
      navTitle.classList.add('scrolled-in');
    } else {
      navTitle.classList.remove('scrolled-in');
    }
  }, { passive: true });
}

// ユーティリティ: HTMLエスケープ
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// アプリ起動
document.addEventListener('DOMContentLoaded', initApp);
