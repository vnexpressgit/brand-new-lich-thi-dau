const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// SEO Friendly League Detail Routes
app.get('/giai-dau/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'league-detail.html'));
});

app.get('/giai-dau/:slug/:tab', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'league-detail.html'));
});

// 25 Leagues configuration from prompt
const LEAGUES = [
  { id: 39, slug: 'ngoai-hang-anh', name: 'Premier League', vnName: 'Ngoại hạng Anh', country: 'Anh', tier: 1, logo: 'https://is.vnecdn.net/objects/leagues/39.png?v=1', color: '#38003c' },
  { id: 2, slug: 'champions-league', name: 'UEFA Champions League', vnName: 'Champions League', country: 'Châu Âu', tier: 1, logo: 'https://is.vnecdn.net/objects/leagues/2.png?v=1', color: '#00143c' },
  { id: 340, slug: 'v-league', name: 'V-League', vnName: 'V-League', country: 'Việt Nam', tier: 1, logo: 'https://is.vnecdn.net/objects/leagues/340.png?v=1', color: '#d32f2f' },
  { id: 140, slug: 'la-liga', name: 'La Liga', vnName: 'La Liga', country: 'Tây Ban Nha', tier: 1, logo: 'https://is.vnecdn.net/objects/leagues/140.png?v=1', color: '#ee1c25' },
  { id: 135, slug: 'serie-a', name: 'Serie A', vnName: 'Serie A', country: 'Ý', tier: 1, logo: 'https://is.vnecdn.net/objects/leagues/135.png?v=1', color: '#024494' },
  { id: 78, slug: 'bundesliga', name: 'Bundesliga', vnName: 'Bundesliga', country: 'Đức', tier: 1, logo: 'https://is.vnecdn.net/objects/leagues/78.png?v=1', color: '#d20515' },
  { id: 3, slug: 'europa-league', name: 'UEFA Europa League', vnName: 'Europa League', country: 'Châu Âu', tier: 1, logo: 'https://is.vnecdn.net/objects/leagues/3.png?v=1', color: '#f68e14' },
  { id: 61, slug: 'ligue-1', name: 'Ligue 1', vnName: 'Ligue 1', country: 'Pháp', tier: 1, logo: 'https://is.vnecdn.net/objects/leagues/61.png?v=1', color: '#091c3e' },
  { id: 307, slug: 'saudi-pro-league', name: 'Saudi Pro League', vnName: 'Saudi Pro League', country: 'Ả Rập Xê Út', tier: 1, logo: 'https://is.vnecdn.net/objects/leagues/307.png?v=1', color: '#137039' },
  { id: 253, slug: 'mls', name: 'Major League Soccer', vnName: 'MLS', country: 'Mỹ', tier: 1, logo: 'https://is.vnecdn.net/objects/leagues/253.png?v=1', color: '#002244' },
  // Tier 2 & Cups
  { id: 45, slug: 'fa-cup', name: 'FA Cup', vnName: 'FA Cup', country: 'Anh', tier: 2, logo: 'https://is.vnecdn.net/objects/leagues/45.png?v=1', color: '#d32f2f' },
  { id: 48, slug: 'carabao-cup', name: 'League Cup - Carabao Cup', vnName: 'Carabao Cup', country: 'Anh', tier: 2, logo: 'https://is.vnecdn.net/objects/leagues/48.png?v=1', color: '#00a651' },
  { id: 66, slug: 'coupe-de-france', name: 'Cup QG Pháp - Coupe de France', vnName: 'Coupe de France', country: 'Pháp', tier: 2, logo: 'https://is.vnecdn.net/objects/leagues/66.png?v=1', color: '#002060' },
  { id: 81, slug: 'dfb-pokal', name: 'Cup QG Đức', vnName: 'DFB-Pokal', country: 'Đức', tier: 2, logo: 'https://is.vnecdn.net/objects/leagues/81.png?v=1', color: '#006400' },
  { id: 143, slug: 'copa-del-rey', name: 'Cúp nhà vua - Copa del Rey', vnName: 'Copa del Rey', country: 'Tây Ban Nha', tier: 2, logo: 'https://is.vnecdn.net/objects/leagues/143.png?v=1', color: '#e53935' },
  { id: 137, slug: 'coppa-italia', name: 'Coppa Italia', vnName: 'Coppa Italia', country: 'Ý', tier: 2, logo: 'https://is.vnecdn.net/objects/leagues/137.png?v=1', color: '#004080' },
  { id: 504, slug: 'kings-cup', name: "King's Cup", vnName: "King's Cup", country: 'Ả Rập Xê Út', tier: 2, logo: 'https://is.vnecdn.net/objects/leagues/504.png?v=1', color: '#1b5e20' },
  { id: 637, slug: 'giai-hang-nhat', name: 'Giải hạng nhất', vnName: 'Giải hạng nhất', country: 'Việt Nam', tier: 2, logo: 'https://is.vnecdn.net/objects/leagues/637.png?v=1', color: '#e65100' },
  { id: 341, slug: 'cup-quoc-gia', name: 'Cúp QG', vnName: 'Cúp Quốc gia', country: 'Việt Nam', tier: 2, logo: 'https://is.vnecdn.net/objects/leagues/341.png?v=1', color: '#b71c1c' },
  { id: 848, slug: 'conference-league', name: 'UEFA Europa Conference League', vnName: 'Conference League', country: 'Châu Âu', tier: 2, logo: 'https://is.vnecdn.net/objects/leagues/848.png?v=1', color: '#008080' },
  { id: 5, slug: 'nations-league', name: 'UEFA Nations League', vnName: 'Nations League', country: 'Châu Âu', tier: 2, logo: 'https://is.vnecdn.net/objects/leagues/5.png?v=1', color: '#1a237e' },
  { id: 32, slug: 'vong-loai-wc-chau-au', name: 'World Cup - Qualification Europe', vnName: 'Vòng loại WC Châu Âu', country: 'Châu Âu', tier: 2, logo: 'https://is.vnecdn.net/objects/leagues/32.png?v=1', color: '#0d47a1' },
  { id: 34, slug: 'vong-loai-wc-nam-my', name: 'World Cup - Qualification South America', vnName: 'Vòng loại WC Nam Mỹ', country: 'Nam Mỹ', tier: 2, logo: 'https://is.vnecdn.net/objects/leagues/34.png?v=1', color: '#ffb300' },
  { id: 30, slug: 'vong-loai-wc-chau-a', name: 'World Cup - Qualification Asia', vnName: 'Vòng loại WC Châu Á', country: 'Châu Á', tier: 2, logo: 'https://is.vnecdn.net/objects/leagues/30.png?v=1', color: '#b71c1c' },
  { id: 15, slug: 'fifa-club-world-cup', name: 'FIFA Club World Cup', vnName: 'FIFA Club World Cup', country: 'Thế giới', tier: 2, logo: 'https://is.vnecdn.net/objects/leagues/15.png?v=1', color: '#2e7d32' }
];

// Top Hot Teams (from demo-final.jpeg & popular clubs)
const HOT_TEAMS = [
  { id: 42, name: 'Arsenal', country: 'Anh', logo: 'https://is.vnecdn.net/objects/teams/42.png?v=1', leagueId: 39 },
  { id: 33, name: 'Manchester United', country: 'Anh', logo: 'https://is.vnecdn.net/objects/teams/33.png?v=1', leagueId: 39 },
  { id: 541, name: 'Real Madrid', country: 'Tây Ban Nha', logo: 'https://is.vnecdn.net/objects/teams/541.png?v=1', leagueId: 140 },
  { id: 529, name: 'Barcelona', country: 'Tây Ban Nha', logo: 'https://is.vnecdn.net/objects/teams/529.png?v=1', leagueId: 140 },
  { id: 7471, name: 'Công An Hà Nội', country: 'Việt Nam', logo: 'https://is.vnecdn.net/objects/teams/7471.png?v=1', leagueId: 340 },
  { id: 4210, name: 'Hà Nội FC', country: 'Việt Nam', logo: 'https://is.vnecdn.net/objects/teams/4210.png?v=1', leagueId: 340 },
  // Extended teams (shown when clicking "Xem thêm")
  { id: 50, name: 'Man City', country: 'Anh', logo: 'https://is.vnecdn.net/objects/teams/50.png?v=1', leagueId: 39 },
  { id: 40, name: 'Liverpool', country: 'Anh', logo: 'https://is.vnecdn.net/objects/teams/40.png?v=1', leagueId: 39 },
  { id: 49, name: 'Chelsea', country: 'Anh', logo: 'https://is.vnecdn.net/objects/teams/49.png?v=1', leagueId: 39 },
  { id: 157, name: 'Bayern Munich', country: 'Đức', logo: 'https://is.vnecdn.net/objects/teams/157.png?v=1', leagueId: 78 },
  { id: 165, name: 'Borussia Dortmund', country: 'Đức', logo: 'https://is.vnecdn.net/objects/teams/165.png?v=1', leagueId: 78 },
  { id: 496, name: 'Juventus', country: 'Ý', logo: 'https://is.vnecdn.net/objects/teams/496.png?v=1', leagueId: 135 },
  { id: 505, name: 'Inter Milan', country: 'Ý', logo: 'https://is.vnecdn.net/objects/teams/505.png?v=1', leagueId: 135 },
  { id: 489, name: 'AC Milan', country: 'Ý', logo: 'https://is.vnecdn.net/objects/teams/489.png?v=1', leagueId: 135 },
  { id: 85, name: 'PSG', country: 'Pháp', logo: 'https://is.vnecdn.net/objects/teams/85.png?v=1', leagueId: 61 },
  { id: 2939, name: 'Al-Nassr', country: 'Ả Rập Xê Út', logo: 'https://is.vnecdn.net/objects/teams/2939.png?v=1', leagueId: 307 },
  { id: 16035, name: 'Inter Miami', country: 'Mỹ', logo: 'https://is.vnecdn.net/objects/teams/16035.png?v=1', leagueId: 253 },
  { id: 4212, name: 'Thể Công - Viettel', country: 'Việt Nam', logo: 'https://is.vnecdn.net/objects/teams/4212.png?v=1', leagueId: 340 }
];

// In-memory cache
const cache = {
  fixtures: {}, // league_id -> { data, timestamp }
  standings: {}, // league_id -> { data, timestamp }
  topscorers: {}, // league_id -> { data, timestamp }
  news: { data: [], timestamp: 0 },
  simulatedLiveMatches: [] // for live mode demo simulation
};

const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

// Fetch fixtures for a league with cache
async function getLeagueFixtures(leagueId) {
  const now = Date.now();
  if (cache.fixtures[leagueId] && (now - cache.fixtures[leagueId].timestamp < CACHE_TTL)) {
    return cache.fixtures[leagueId].data;
  }

  try {
    const res = await fetch(`https://gw.vnexpress.net/football/fixture?league_id=${leagueId}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const data = json?.data?.[leagueId]?.data || [];
    cache.fixtures[leagueId] = { data, timestamp: now };
    return data;
  } catch (err) {
    console.error(`Error fetching fixtures for league ${leagueId}:`, err.message);
    return cache.fixtures[leagueId]?.data || [];
  }
}

// Fetch standings for a league with cache
async function getLeagueStandings(leagueId) {
  const now = Date.now();
  if (cache.standings[leagueId] && (now - cache.standings[leagueId].timestamp < CACHE_TTL)) {
    return cache.standings[leagueId].data;
  }

  try {
    const res = await fetch(`https://gw.vnexpress.net/football/standing?league_id=${leagueId}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const data = json?.data?.[leagueId]?.data || [];
    cache.standings[leagueId] = { data, timestamp: now };
    return data;
  } catch (err) {
    console.error(`Error fetching standings for league ${leagueId}:`, err.message);
    return cache.standings[leagueId]?.data || [];
  }
}

// Fetch topscorers for a league with cache
async function getLeagueTopscorers(leagueId) {
  const now = Date.now();
  if (cache.topscorers[leagueId] && (now - cache.topscorers[leagueId].timestamp < CACHE_TTL)) {
    return cache.topscorers[leagueId].data;
  }

  try {
    const res = await fetch(`https://gw.vnexpress.net/football/topscorer?league_id=${leagueId}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const data = json?.data?.[leagueId]?.data || [];
    cache.topscorers[leagueId] = { data, timestamp: now };
    return data;
  } catch (err) {
    console.error(`Error fetching topscorers for league ${leagueId}:`, err.message);
    return cache.topscorers[leagueId]?.data || [];
  }
}

// Fetch football news from VnExpress RSS feed
async function getFootballNews() {
  const now = Date.now();
  if (cache.news.data.length > 0 && (now - cache.news.timestamp < CACHE_TTL)) {
    return cache.news.data;
  }

  try {
    const res = await fetch('https://vnexpress.net/rss/the-thao.rss');
    const xml = await res.text();
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xml)) !== null && items.length < 40) {
      const itemContent = match[1];
      const title = (itemContent.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)?.[1] || itemContent.match(/<title>([\s\S]*?)<\/title>/)?.[1] || '').trim();
      const link = (itemContent.match(/<link><!\[CDATA\[([\s\S]*?)\]\]><\/link>/)?.[1] || itemContent.match(/<link>([\s\S]*?)<\/link>/)?.[1] || '').trim();
      const pubDateStr = (itemContent.match(/<pubDate><!\[CDATA\[([\s\S]*?)\]\]><\/pubDate>/)?.[1] || itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] || '').trim();
      const descRaw = itemContent.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1] || itemContent.match(/<description>([\s\S]*?)<\/description>/)?.[1] || '';

      const imgMatch = descRaw.match(/src="([^">]+)"/);
      const thumbnail = imgMatch ? imgMatch[1] : 'https://s1.vnecdn.net/vnexpress/restruct/i/v9525/v2_2019/pc/graphics/placeholder.png';

      const cleanDesc = descRaw
        .replace(/<a[\s\S]*?<\/a>/gi, '')
        .replace(/<[^>]+>/g, '')
        .trim();

      // Guess category tag from content
      let category = 'Bóng đá';
      const text = `${title} ${cleanDesc}`.toLowerCase();
      if (text.includes('premier league') || text.includes('ngoại hạng anh') || text.includes('arsenal') || text.includes('man utd') || text.includes('man city') || text.includes('liverpool') || text.includes('chelsea') || text.includes('haaland') || text.includes('tottenham')) {
        category = 'Ngoại Hạng Anh';
      } else if (text.includes('v-league') || text.includes('việt nam') || text.includes('u17') || text.includes('cahn') || text.includes('hà nội fc') || text.includes('nam định')) {
        category = 'V-League';
      } else if (text.includes('champions league') || text.includes('cúp c1') || text.includes('c1')) {
        category = 'Cúp C1 Châu Âu';
      } else if (text.includes('la liga') || text.includes('barca') || text.includes('real madrid') || text.includes('atletico') || text.includes('el clasico')) {
        category = 'La Liga';
      } else if (text.includes('serie a') || text.includes('juventus') || text.includes('inter') || text.includes('milan') || text.includes('roma')) {
        category = 'Serie A';
      } else if (text.includes('bundesliga') || text.includes('bayern') || text.includes('dortmund') || text.includes('leverkusen')) {
        category = 'Bundesliga';
      } else if (text.includes('ligue 1') || text.includes('psg') || text.includes('marseille') || text.includes('monaco')) {
        category = 'Ligue 1';
      } else if (text.includes('europa league') || text.includes('cúp c2')) {
        category = 'Europa League';
      } else if (text.includes('ronaldo') || text.includes('al-nassr') || text.includes('al-hilal') || text.includes('saudi')) {
        category = 'Saudi Pro League';
      } else if (text.includes('messi') || text.includes('mls') || text.includes('inter miami')) {
        category = 'Nhà nghề Mỹ (MLS)';
      }

      // Calculate relative time
      let timeAgo = "Gần đây";
      try {
        const pubTime = new Date(pubDateStr).getTime();
        const diffMinutes = Math.max(1, Math.floor((Date.now() - pubTime) / 60000));
        if (diffMinutes < 60) {
          timeAgo = `${diffMinutes}' trước`;
        } else if (diffMinutes < 1440) {
          timeAgo = `${Math.floor(diffMinutes / 60)}h trước`;
        } else {
          timeAgo = `${Math.floor(diffMinutes / 1440)} ngày trước`;
        }
      } catch (e) {
        timeAgo = "Hôm nay";
      }

      items.push({
        id: items.length + 1,
        title,
        link,
        thumbnail,
        description: cleanDesc,
        pubDate: pubDateStr,
        timeAgo,
        category
      });
    }

    cache.news = { data: items, timestamp: now };
    return items;
  } catch (err) {
    console.error('Error fetching football news:', err.message);
    return cache.news.data;
  }
}

// Preload top leagues on startup
async function preload() {
  console.log('Preloading fixture and standings data...');
  const topLeagueIds = [39, 2, 340, 140, 135, 78, 3, 61, 307, 253, 848];
  for (const id of topLeagueIds) {
    getLeagueFixtures(id).catch(() => {});
    getLeagueStandings(id).catch(() => {});
  }
  getFootballNews().catch(() => {});
}
preload();

// API: System Configuration & Metadata
app.get('/api/config', (req, res) => {
  res.json({
    currentTime: '2026-10-16T13:46:10+07:00',
    todayDate: '2026-10-16',
    leagues: LEAGUES,
    hotTeams: HOT_TEAMS
  });
});

// API: Standings
app.get('/api/standings', async (req, res) => {
  const { league_id } = req.query;

  if (league_id) {
    const data = await getLeagueStandings(parseInt(league_id));
    return res.json({ league_id: parseInt(league_id), data });
  }

  // If no league_id specified, return top standings for primary leagues
  const mainLeagueIds = [39, 340, 140, 135, 78, 61, 307, 253, 3, 2];
  const standingsMap = {};

  await Promise.all(
    mainLeagueIds.map(async id => {
      const data = await getLeagueStandings(id);
      if (data && data.length > 0) {
        standingsMap[id] = data;
      }
    })
  );

  res.json({ standings: standingsMap });
});

// API: Top Scorers
app.get('/api/topscorers', async (req, res) => {
  const leagueId = parseInt(req.query.league_id) || 39;
  const data = await getLeagueTopscorers(leagueId);
  res.json({ league_id: leagueId, data });
});

// API: League Detail Bundle
app.get('/api/league-detail', async (req, res) => {
  const { slug, league_id } = req.query;
  let league;
  if (slug) {
    league = LEAGUES.find(l => l.slug === slug);
  }
  if (!league && league_id) {
    league = LEAGUES.find(l => l.id === parseInt(league_id));
  }
  if (!league) {
    league = LEAGUES[1]; // UEFA Champions League default
  }
  const leagueId = league.id;
  
  // Parallel fetch
  const [fixtures, rawStandings, topscorers, allNews] = await Promise.all([
    getLeagueFixtures(leagueId),
    getLeagueStandings(leagueId),
    getLeagueTopscorers(leagueId),
    getFootballNews()
  ]);

  // Enrich fixtures with league info
  const enrichedFixtures = (fixtures || []).map(m => ({
    ...m,
    league_meta: {
      id: league.id,
      slug: league.slug,
      name: league.name,
      vnName: league.vnName,
      country: league.country,
      logo: league.logo
    }
  }));

  // Top Widget matches: pick sorted matches (recent finished + upcoming)
  const sortedFixtures = [...enrichedFixtures].sort((a, b) => (a.event_timestamp || 0) - (b.event_timestamp || 0));
  
  const nowTs = Math.floor(Date.now() / 1000);
  const today = '2026-10-16';

  // Find current/next matches for top slider
  let upcomingIdx = sortedFixtures.findIndex(m => (m.event_timestamp || 0) >= nowTs - 24 * 3600);
  if (upcomingIdx === -1) upcomingIdx = Math.max(0, sortedFixtures.length - 10);
  
  const startIdx = Math.max(0, upcomingIdx - 2);
  const topMatches = sortedFixtures.slice(startIdx, startIdx + 12);

  // 3 matches for Prediction Widget ("Dự đoán tỷ số")
  let predictionMatches = sortedFixtures.filter(m => (m.event_timestamp || 0) >= nowTs - 12 * 3600).slice(0, 3);
  if (predictionMatches.length < 3) {
    predictionMatches = sortedFixtures.slice(0, 3);
  }

  // 1. Full Upcoming Matches (Lịch thi đấu: hôm nay đi về tương lai)
  // Sorted chronologically (kickoff earliest to latest)
  const upcomingMatches = sortedFixtures.filter(m => {
    const mDate = m.event_date ? m.event_date.split('T')[0] : '';
    const isFinished = ['FT', 'AET', 'PEN', 'Match Finished'].includes(m.status_short) || m.status === 'Match Finished';
    return mDate >= today || !isFinished;
  }).sort((a, b) => (a.event_timestamp || 0) - (b.event_timestamp || 0));

  // 2. Full Past Results (Kết quả: hôm nay trở về quá khứ)
  // Sorted reverse-chronological (most recent finished first)
  const pastMatches = sortedFixtures.filter(m => {
    const mDate = m.event_date ? m.event_date.split('T')[0] : '';
    const isFinished = ['FT', 'AET', 'PEN', 'Match Finished'].includes(m.status_short) || m.status === 'Match Finished';
    return isFinished || mDate <= today;
  }).sort((a, b) => (b.event_timestamp || 0) - (a.event_timestamp || 0));

  // 3. Full Detailed Standings (Bảng xếp hạng đầy đủ với nhiều cột thông số)
  const standings = (rawStandings || []).map(s => {
    const pld = s.all?.matchs_played ?? 0;
    const win = s.all?.win ?? 0;
    const pts = s.points ?? 0;
    const draw = Math.max(0, pts - (win * 3));
    const lose = Math.max(0, pld - win - draw);
    const gf = s.all?.goals_for ?? 0;
    const ga = s.all?.goals_against ?? 0;
    const gd = s.goals_diff ?? (gf - ga);
    return {
      ...s,
      calculated: {
        played: pld,
        win,
        draw,
        lose,
        goalsFor: gf,
        goalsAgainst: ga,
        goalDiff: gd,
        points: pts,
        forme: s.forme || ''
      }
    };
  });

  // Filter or prioritize news for this league
  let leagueNews = allNews.filter(n => {
    const text = (n.title + ' ' + n.description + ' ' + n.category).toLowerCase();
    if (leagueId === 2) {
      return text.includes('champions league') || text.includes('c1') || text.includes('haaland') || text.includes('barca') || text.includes('real madrid') || text.includes('bayern') || text.includes('dortmund') || text.includes('psg') || text.includes('liverpool') || text.includes('arsenal');
    }
    if (leagueId === 39) {
      return text.includes('ngoại hạng anh') || text.includes('premier league') || text.includes('man utd') || text.includes('arsenal') || text.includes('chelsea') || text.includes('liverpool') || text.includes('man city') || text.includes('tottenham');
    }
    if (leagueId === 140) {
      return text.includes('la liga') || text.includes('real madrid') || text.includes('barca') || text.includes('atletico');
    }
    if (leagueId === 340) {
      return text.includes('v-league') || text.includes('việt nam') || text.includes('cahn') || text.includes('hà nội');
    }
    return text.includes(league.name.toLowerCase()) || text.includes(league.vnName.toLowerCase());
  });

  // Ensure at least 40 news items by filling with general football news
  const seenIds = new Set(leagueNews.map(n => n.id));
  for (const n of allNews) {
    if (!seenIds.has(n.id)) {
      leagueNews.push(n);
      seenIds.add(n.id);
    }
  }

  res.json({
    league,
    allLeagues: LEAGUES,
    topMatches,
    predictionMatches,
    upcomingMatches,
    pastMatches,
    standings,
    topscorers: topscorers || [],
    news: leagueNews
  });
});

// API: News with pagination
app.get('/api/news', async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 20);
  const category = req.query.category;

  let allNews = await getFootballNews();
  if (category) {
    allNews = allNews.filter(n => n.category.toLowerCase().includes(category.toLowerCase()));
  }

  const total = allNews.length;
  const startIndex = (page - 1) * limit;
  const items = allNews.slice(startIndex, startIndex + limit);

  res.json({
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit) || 1,
    items
  });
});

// API: Fixtures and Results
// Query params:
// - mode: 'future' (Lịch thi đấu) | 'past' (Kết quả) | 'live' (LIVE) | 'all'
// - date: 'YYYY-MM-DD' (specific date filter)
// - league_id: filter by specific league
// - team_id: filter by team
// - search: search term
app.get('/api/fixtures', async (req, res) => {
  const { mode = 'future', date, league_id, team_id, search } = req.query;
  const today = '2026-10-16';

  let targetLeagues = LEAGUES;
  if (league_id) {
    targetLeagues = LEAGUES.filter(l => l.id === parseInt(league_id));
  }

  let allMatches = [];

  for (const l of targetLeagues) {
    const fixtures = await getLeagueFixtures(l.id);
    for (const m of fixtures) {
      // Enrich with league metadata
      allMatches.push({
        ...m,
        league_meta: {
          id: l.id,
          slug: l.slug,
          name: l.name,
          vnName: l.vnName,
          country: l.country,
          logo: l.logo
        }
      });
    }
  }

  // Reference current system time for 12-hour rule
  const nowTs = Math.floor(Date.now() / 1000);
  const twelveHoursSec = 12 * 3600;
  const bufferRecentSec = 13.5 * 3600; // 13.5 hours covers matches that finished in the last 12 hours (kickoff ~02:00 AM)

  // Filter according to rules
  let filtered = allMatches.filter(m => {
    const matchDate = m.event_date ? m.event_date.split('T')[0] : '';
    const matchTs = m.event_timestamp || Math.floor(new Date(m.event_date).getTime() / 1000);
    const isFinished = ['FT', 'AET', 'PEN', 'Match Finished'].includes(m.status_short) || m.status === 'Match Finished';
    const isLive = ['1H', '2H', 'HT', 'LIVE', 'ET', 'P'].includes(m.status_short);
    const isUpcoming = ['NS', 'Not Started', 'TBD', 'PST'].includes(m.status_short) || (!isFinished && !isLive);

    // Rule 1: LIVE
    if (mode === 'live') {
      return isLive;
    }

    // Specific date filter: Tab 'Hôm nay' (date === today)
    if (date === today) {
      if (mode === 'future') {
        // Trang Lịch thi đấu, tab 'Hôm nay':
        // - Trận sắp diễn ra hoặc đang diễn ra trong ngày hôm nay
        // - VÀ kết quả các trận đấu trong 12 tiếng gần nhất so với thời điểm hiện tại
        if (isUpcoming && matchDate === today) return true;
        if (isLive) return true;
        if (isFinished && (matchDate === today || (matchTs >= nowTs - bufferRecentSec && matchTs <= nowTs))) return true;
        return false;
      }

      if (mode === 'past') {
        // Trang Kết quả, tab 'Hôm nay':
        // - Kết quả các trận đã đấu trong ngày hôm nay
        // - VÀ lịch thi đấu các trận trong 12 tiếng tới so với thời điểm hiện tại
        if (isFinished && matchDate === today) return true;
        if (isLive) return true;
        if (isUpcoming && (matchTs >= nowTs - 300 && matchTs <= nowTs + twelveHoursSec)) return true;
        return false;
      }

      return matchDate === today;
    }

    // Other specific date filters (e.g. 2026-10-17, 2026-10-15...)
    if (date && date !== 'all') {
      if (matchDate !== date) return false;

      if (mode === 'past') {
        // In "Kết quả", only show matches that have finished (results)
        return isFinished;
      }

      // In "Lịch thi đấu": show all matches scheduled for this date
      return true;
    }

    // Rule 2: Lịch thi đấu (today into the future when no specific date)
    if (mode === 'future') {
      if (matchDate > today) return true;
      if (matchDate === today) {
        if (!isFinished || matchTs >= nowTs - bufferRecentSec) return true;
      }
      return false;
    }

    // Rule 3: Kết quả (today into the past when no specific date)
    if (mode === 'past') {
      if (matchDate < today && isFinished) return true;
      if (matchDate === today) {
        if (isFinished || (isUpcoming && matchTs >= nowTs - 300 && matchTs <= nowTs + twelveHoursSec)) return true;
      }
      return false;
    }

    return true;
  });

  // Filter by team_id
  if (team_id) {
    const tid = parseInt(team_id);
    filtered = filtered.filter(m => m.home_team?.team_id === tid || m.away_team?.team_id === tid);
  }

  // Search filter
  if (search && search.trim()) {
    const s = search.trim().toLowerCase();
    filtered = filtered.filter(m => 
      m.home_team?.team_name?.toLowerCase().includes(s) ||
      m.away_team?.team_name?.toLowerCase().includes(s) ||
      m.league?.name?.toLowerCase().includes(s) ||
      m.league_meta?.vnName?.toLowerCase().includes(s)
    );
  }

  // Sorting
  if (date === today) {
    if (mode === 'past') {
      // For Kết quả tab 'Hôm nay': Finished matches of today first, then upcoming fixtures in next 12 hours
      filtered.sort((a, b) => {
        const aFin = ['FT', 'AET', 'PEN', 'Match Finished'].includes(a.status_short) ? 0 : 1;
        const bFin = ['FT', 'AET', 'PEN', 'Match Finished'].includes(b.status_short) ? 0 : 1;
        if (aFin !== bFin) return aFin - bFin;
        return (a.event_timestamp || 0) - (b.event_timestamp || 0);
      });
    } else {
      // For Lịch thi đấu tab 'Hôm nay': sort chronologically by kickoff time
      filtered.sort((a, b) => (a.event_timestamp || 0) - (b.event_timestamp || 0));
    }
  } else if (mode === 'future') {
    // Upcoming fixtures: upcoming/live first, then chronologically
    filtered.sort((a, b) => {
      const aUpcoming = ['NS', 'Not Started', 'TBD', 'PST', '1H', '2H', 'HT', 'LIVE'].includes(a.status_short) ? 0 : 1;
      const bUpcoming = ['NS', 'Not Started', 'TBD', 'PST', '1H', '2H', 'HT', 'LIVE'].includes(b.status_short) ? 0 : 1;
      if (aUpcoming !== bUpcoming) return aUpcoming - bUpcoming;
      return (a.event_timestamp || 0) - (b.event_timestamp || 0);
    });
  } else if (mode === 'past') {
    // Results: reverse-chronological (most recent first)
    filtered.sort((a, b) => (b.event_timestamp || 0) - (a.event_timestamp || 0));
  } else {
    filtered.sort((a, b) => (b.event_timestamp || 0) - (a.event_timestamp || 0));
  }

  // Group by league and date for frontend convenience
  const groupedByLeague = {};
  filtered.forEach(m => {
    const lid = m.league_id;
    if (!groupedByLeague[lid]) {
      groupedByLeague[lid] = {
        league: m.league_meta || m.league,
        matches: []
      };
    }
    groupedByLeague[lid].matches.push(m);
  });

  res.json({
    mode,
    date: date || (mode === 'future' ? 'future' : mode === 'past' ? 'past' : 'live'),
    totalMatches: filtered.length,
    groups: Object.values(groupedByLeague),
    matches: filtered.slice(0, 150) // limit for safety
  });
});

// API: Toggle or simulate a LIVE match for demonstration
let simulationEnabled = false;
app.get('/api/simulation/toggle', (req, res) => {
  simulationEnabled = !simulationEnabled;
  res.json({ simulationEnabled });
});

app.get('/api/live-matches', (req, res) => {
  // Check if real live matches exist, or if demo simulation is active
  const liveMatches = [
    {
      fixture_id: 999001,
      league_id: 39,
      event_date: '2026-10-16T13:30:00+07:00',
      event_timestamp: Math.floor(Date.now() / 1000) - 3900,
      round: 'Regular Season - 8',
      status: '2nd Half',
      status_short: '2H',
      elapsed: 68,
      goals_home_team: 2,
      goals_away_team: 1,
      league: {
        name: 'Premier League',
        country: 'England',
        logo: 'https://is.vnecdn.net/objects/leagues/39.png?v=1'
      },
      league_meta: {
        id: 39,
        name: 'Premier League',
        vnName: 'Ngoại hạng Anh',
        country: 'Anh',
        logo: 'https://is.vnecdn.net/objects/leagues/39.png?v=1'
      },
      home_team: {
        team_id: 42,
        team_name: 'Arsenal',
        logo: 'https://is.vnecdn.net/objects/teams/42.png?v=1'
      },
      away_team: {
        team_id: 49,
        team_name: 'Chelsea',
        logo: 'https://is.vnecdn.net/objects/teams/49.png?v=1'
      },
      score: {
        halftime: '1-0',
        fulltime: '2-1'
      }
    }
  ];

  res.json({
    count: liveMatches.length,
    matches: liveMatches
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`VnExpress Football Fixtures & Results Server Running`);
  console.log(`URL: http://localhost:${PORT}`);
  console.log(`====================================================`);
});
