// store.jsx — global mock-data store + tiny pub/sub for V3.
// Keeps every screen reading/writing the same data so toggles stick.

const STORE_KEY = 'ofc.v3.store.v1';

// ─── Seed dataset ───────────────────────────────────────────
function seed() {
  const me = {
    id: 'you',
    handle: 'you.sends',
    name: 'You',
    avatar: HF_IMG.you,
    bio: 'Project mode. Slab > overhang. Always one move away.',
    city: 'OAK · CA',
    since: "'22",
    peak: 'V6',
    pronouns: 'they/them',
  };
  const friends = [
    { id: 'mara',  handle: 'mara.sends', name: 'Mara Kaur',  avatar: HF_IMG.mara,  city: 'OAK · CA', peak: 'V7', followers: 1820, following: 312, bio: 'Boulderer · slab > overhang · always projecting something. Sponsored by coffee.', amFollowing: true,  followsMe: true,  online: true },
    { id: 'jules', handle: 'jules.r',    name: 'Jules R.',   avatar: HF_IMG.jules, city: 'OAK · CA', peak: 'V5', followers: 612,  following: 401, bio: 'Gym rat. Crimps for breakfast. New to lead.',                                  amFollowing: true,  followsMe: true,  online: true },
    { id: 'ben',   handle: 'bent.send',  name: 'Ben T.',     avatar: HF_IMG.ben,   city: 'DEN · CO', peak: 'V9', followers: 4310, following: 220, bio: 'Comp climber. Currently projecting V10 in Bishop.',                            amFollowing: true,  followsMe: true,  online: false },
    { id: 'ari',   handle: 'arimoves',   name: 'Ari M.',     avatar: HF_IMG.ari,   city: 'SF · CA',  peak: 'V6', followers: 985,  following: 540, bio: 'Coach + setter @ The Crag. Tape + chalk fiend.',                              amFollowing: true,  followsMe: true,  online: false },
    { id: 'tomo',  handle: 'tomohawk',   name: 'Tomo R.',    avatar: HF_IMG.tomo,  city: 'DEN · CO', peak: 'V8', followers: 2204, following: 188, bio: 'Movement DEN regular. Comp prep year-round.',                                  amFollowing: false, followsMe: true,  online: true },
    { id: 'nat',   handle: 'natclimbs',  name: 'Nat O.',     avatar: HF_IMG.nat,   city: 'SLC · UT', peak: 'V8', followers: 3110, following: 244, bio: 'Outdoor only. Joshua Tree, Bishop, Hueco.',                                    amFollowing: true,  followsMe: false, online: false },
    { id: 'finn',  handle: 'finn.beta',  name: 'Finn O.',    avatar: HF_IMG.finn,  city: 'OAK · CA', peak: 'V4', followers: 144,  following: 220, bio: 'Beta enthusiast. Slab convert.',                                                amFollowing: false, followsMe: true,  online: false },
  ];
  const gyms = [
    { id: 'BP', name: 'Boulder Project', city: 'OAK',     dist: '2.4 MI', open: 'Open · 11p', friends: 12, problems: 140, src: HF_IMG.gym1, mapX: 80, mapY: 110, hours: 'Mon–Fri 6a–11p · Sat–Sun 8a–10p' },
    { id: 'CR', name: 'The Crag SF',     city: 'SF',      dist: '8.1 MI', open: 'Open · 11p', friends: 6,  problems: 96,  src: HF_IMG.send3, mapX: 240, mapY: 80, hours: 'Mon–Sun 6a–11p' },
    { id: 'MV', name: 'Movement DEN',    city: 'DEN',     dist: '✈ partner', open: 'Open · 10p', friends: 4, problems: 200, src: HF_IMG.gym2, mapX: 180, mapY: 280, hours: 'Mon–Sun 6a–10p' },
    { id: 'CG', name: 'Castle Rock',     city: 'OUTDOOR', dist: '32 MI',  open: 'Sunrise–Sunset', friends: 0, problems: 60, src: HF_IMG.outdoor1, mapX: 300, mapY: 320, hours: 'Daylight only' },
    { id: 'BS', name: 'Bishop · Buttermilks', city: 'OUTDOOR', dist: '6.5 HR', open: 'Always', friends: 2, problems: 320, src: HF_IMG.outdoor2, mapX: 60, mapY: 320, hours: 'Always' },
  ];
  const sends = [
    { id: 's1', user: 'mara', grade: 'V7', name: 'Blood Orange',    gym: 'BP', when: 'TODAY · 18:42', attempts: 14, sessions: 3, style: 'DYNO',   holds: 'CRIMPS', src: HF_IMG.send1, hero: true,  notes: 'Finally stuck the dyno. Crimps still hate me.' },
    { id: 's2', user: 'mara', grade: 'V6', name: 'Slabbath',         gym: 'BP', when: 'TODAY · 17:10', attempts: 4,  sessions: 1, style: 'SLAB',   holds: 'SMEARS', src: HF_IMG.send2, hero: false, notes: '' },
    { id: 's3', user: 'mara', grade: 'V5', name: 'Crimp Reaper',     gym: 'MV', when: '2D AGO',         attempts: 7,  sessions: 2, style: 'STATIC', holds: 'CRIMPS', src: HF_IMG.gym1,  hero: false, notes: '' },
    { id: 's4', user: 'mara', grade: 'V6', name: 'Lichen It',        gym: 'CG', when: '4D AGO',         attempts: 9,  sessions: 1, style: 'TECHY',  holds: 'PINCHES',src: HF_IMG.outdoor1, hero: false, notes: '' },
    { id: 's5', user: 'tomo', grade: 'V6', name: 'Compression Test', gym: 'MV', when: '6H AGO',         attempts: 12, sessions: 2, style: 'COMP',   holds: 'PINCHES',src: HF_IMG.gym1,  hero: false, notes: 'Comp prep round 1. Quads are toast.' },
    { id: 's6', user: 'ben',  grade: 'V9', name: 'Cave Dweller',     gym: 'MV', when: '1D AGO',         attempts: 38, sessions: 6, style: 'POWER',  holds: 'SLOPERS',src: HF_IMG.send3, hero: true,  notes: 'Best send of the year.' },
    { id: 's7', user: 'jules',grade: 'V5', name: 'Pinch Patrol',     gym: 'BP', when: '3D AGO',         attempts: 6,  sessions: 2, style: 'STATIC', holds: 'PINCHES',src: HF_IMG.gym2,  hero: false, notes: '' },
    { id: 's8', user: 'ari',  grade: 'V4', name: 'Set Day Special',  gym: 'CR', when: '2D AGO',         attempts: 1,  sessions: 1, style: 'FLASH',  holds: 'JUGS',   src: HF_IMG.send3, hero: false, notes: 'Flashed it. Easy day.' },
    { id: 's9', user: 'you',  grade: 'V5', name: 'Project A',        gym: 'BP', when: '1H AGO',         attempts: 3,  sessions: 1, style: 'STATIC', holds: 'CRIMPS', src: HF_IMG.gym2,  hero: false, notes: '' },
    { id: 's10',user: 'you',  grade: 'V4', name: 'Slab Train',       gym: 'BP', when: '2H AGO',         attempts: 1,  sessions: 1, style: 'SLAB',   holds: 'SMEARS', src: HF_IMG.send2, hero: false, notes: '' },
    { id: 's11',user: 'you',  grade: 'V3', name: 'Warm Up',          gym: 'BP', when: '2H AGO',         attempts: 1,  sessions: 1, style: 'STATIC', holds: 'JUGS',   src: HF_IMG.gym1,  hero: false, notes: '' },
  ];
  const projects = [
    { id: 'p1', user: 'you', grade: 'V6', name: 'Red Dragon',  gym: 'BP', attempts: 18, sessions: 5, lastTry: '1D AGO', closest: 'Last move',     src: HF_IMG.gym1,  status: 'CLOSE' },
    { id: 'p2', user: 'you', grade: 'V5', name: 'Static Cling',gym: 'BP', attempts: 7,  sessions: 2, lastTry: '3D AGO', closest: 'Crux + 2',      src: HF_IMG.gym2,  status: 'PROGRESS' },
    { id: 'p3', user: 'you', grade: 'V7', name: 'Wishbone',    gym: 'CG', attempts: 25, sessions: 4, lastTry: '7D AGO', closest: '3 moves in',    src: HF_IMG.outdoor1, status: 'STALLED' },
  ];
  const gear = [
    { id: 'g1', kind: 'SHOES',  name: 'La Sportiva Solution',  status: 'ACTIVE',  bought: 'JAN 26',   sends: 142, src: HF_IMG.shoes,  pct: 64, color: 'orange' },
    { id: 'g2', kind: 'SHOES',  name: 'Scarpa Drago',          status: 'BACKUP',  bought: 'OCT 25',   sends: 286, src: HF_IMG.shoes,  pct: 92, color: 'red' },
    { id: 'g3', kind: 'CHALK',  name: 'Friction Labs Unicorn Dust', status: 'ACTIVE', bought: 'APR 26', sends: 28,  src: HF_IMG.hands, pct: 22, color: 'cream' },
    { id: 'g4', kind: 'BAG',    name: 'Mammut Boulder Pad',    status: 'ACTIVE',  bought: 'MAR 24',   sends: 18,  src: HF_IMG.outdoor2, pct: 30, color: 'olive' },
    { id: 'g5', kind: 'TAPE',   name: 'Metolius Tape · 1.5 in',status: 'ACTIVE',  bought: 'APR 26',   sends: 12,  src: HF_IMG.hands, pct: 41, color: 'cream' },
  ];
  const achievements = [
    { id: 'a1', name: 'FIRST V7',   sub: 'Logged on Apr 27',  icon: '★', earned: true,  date: '04.27.26' },
    { id: 'a2', name: '100 SENDS',  sub: 'Lifetime',          icon: '◆', earned: true,  date: '02.14.26' },
    { id: 'a3', name: 'CHALK BAG',  sub: 'First spot · gym',  icon: '◇', earned: true,  date: '01.04.22' },
    { id: 'a4', name: 'OUTDOOR',    sub: 'First crag visit',  icon: '▲', earned: true,  date: '04.10.23' },
    { id: 'a5', name: 'PROJECT',    sub: 'Spend 5+ sesh on one route', icon: '⌖', earned: true, date: '08.18.25' },
    { id: 'a6', name: 'V8 CLUB',    sub: 'Send a V8',         icon: '✕', earned: false },
    { id: 'a7', name: '50 PROBLEMS / DAY', sub: 'Mileage day',icon: '∞', earned: false },
    { id: 'a8', name: 'GLOBAL',     sub: 'Climb in 3 countries', icon: '◐', earned: false },
  ];
  const trainingDays = [
    { day: 'MON', focus: 'POWER',     done: true,  exercises: ['Hangboard 7-3 repeaters', 'Limit boulders V6'] },
    { day: 'TUE', focus: 'TECHNIQUE', done: true,  exercises: ['Slab pyramid V0–V4', 'Footwork drills'] },
    { day: 'WED', focus: 'REST',      done: true,  exercises: ['Mobility', 'Light forearm flush'] },
    { day: 'THU', focus: 'POWER ENDU',done: false, exercises: ['4×4 V4', 'Campus rungs 1-3-5'] },
    { day: 'FRI', focus: 'PROJECT',   done: false, exercises: ['Red Dragon + V7 try-hard'] },
    { day: 'SAT', focus: 'OUTDOOR',   done: false, exercises: ['Castle Rock · slab session'] },
    { day: 'SUN', focus: 'REST',      done: false, exercises: ['Mobility'] },
  ];
  const events = [
    { id: 'e1', day: 'TODAY', date: '27', mo: 'APR', title: 'TUESDAY NIGHT FLASH', loc: 'Boulder Project · OAK', time: '7:00 PM', going: 18, host: 'ari',   src: HF_IMG.gym2, accent: true,  desc: 'Flash league — 10 problems, 1 try each. Free shoes raffle.', tags: ['NEAR ME','THIS WEEK'], gymId: 'BP', goingList: ['mara','jules','tomo','ben','ari'] },
    { id: 'e2', day: 'WED',   date: '28', mo: 'APR', title: 'NEW SETS · V4-V7',    loc: 'Movement · DEN',        time: '6:30 PM', going: 7,  host: 'tomo',  src: HF_IMG.gym1, desc: 'Reveal of the new winter set. V4–V7 problems on the back wall.', tags: ['THIS WEEK'], gymId: 'MV', goingList: ['tomo','ben'] },
    { id: 'e3', day: 'SAT',   date: '03', mo: 'MAY', title: 'SLAB SOCIETY',        loc: 'The Crag · SF',         time: '10:00 AM',going: 12, host: 'jules', src: HF_IMG.send3,desc: 'Slab focus. Bring tape. Pizza at Tony\'s after.',           tags: ['NEAR ME','THIS WEEK','BEGINNER'], gymId: 'CR', goingList: ['mara','jules','ari','finn','you'] },
    { id: 'e4', day: 'SUN',   date: '04', mo: 'MAY', title: 'OUTDOOR · CASTLE ROCK',loc:'Castle Rock SP',         time: '8:00 AM', going: 24, host: 'ben',   src: HF_IMG.outdoor2, desc: 'Outdoor day. Pads + tape required. Carpool meet at gas.',  tags: ['NEAR ME','THIS WEEK','OUTDOOR'], gymId: 'CG', goingList: ['ben','nat','tomo','ari'] },
    { id: 'e5', day: 'TUE',   date: '06', mo: 'MAY', title: 'BEGINNER NIGHT',      loc: 'Boulder Project · OAK', time: '6:00 PM', going: 5,  host: 'nat',   src: HF_IMG.send2, desc: 'New climbers welcome. Free intro to the wall.',            tags: ['NEAR ME','BEGINNER'], gymId: 'BP', goingList: ['nat','finn'] },
  ];
  const posts = [
    { id: 'post1', kind: 'send',    user: 'mara', sendId: 's1', when: '2H', group: 'CRUSHERS', likes: 284, liked: true,  saved: false, comments: 32 },
    { id: 'post2', kind: 'event',   eventId: 'e3' },
    { id: 'post3', kind: 'session', user: 'tomo', when: '6H', sends: ['s5'],  src: HF_IMG.gym1, photos: [HF_IMG.gym1, HF_IMG.shoes, HF_IMG.hands], stats: ['2H 14M · 8 PROBLEMS', 'NEW PR · V6'], caption: 'Comp prep round 1. Quads are toast.', likes: 86, liked: false, saved: false, comments: 11 },
    { id: 'post4', kind: 'send',    user: 'ben',  sendId: 's6', when: '1D', likes: 511, liked: false, saved: false, comments: 47 },
    { id: 'post5', kind: 'session', user: 'jules',when: '3D', sends: ['s7'], src: HF_IMG.gym2, photos: [HF_IMG.gym2, HF_IMG.send2], stats: ['1H 30M · 6 PROBLEMS'], caption: 'Quick after-work flash session.', likes: 41, liked: true, saved: false, comments: 4 },
  ];
  const comments = {
    post1: [
      { who: 'jules', when: '2H', body: 'Insane!! you owe me a sesh 🤝',  likes: 12, liked: false },
      { who: 'ben',   when: '2H', body: "told you the heel-toe was the move 😤", likes: 7,  liked: true },
      { who: 'tomo',  when: '1H', body: 'sending congrats from DEN 🔥',  likes: 4,  liked: false },
      { who: 'ari',   when: '1H', body: 'WAS WAITING FOR THIS',           likes: 9,  liked: false },
      { who: 'nat',   when: '52M',body: 'cooked the dyno fr',             likes: 2,  liked: false },
      { who: 'finn',  when: '40M',body: 'beta queen',                     likes: 1,  liked: false },
    ],
    post3: [
      { who: 'mara', when: '5H', body: 'campus rungs??', likes: 2, liked: false },
      { who: 'ben',  when: '4H', body: 'your shoe rubber is cooked, switch to drago 😅', likes: 6, liked: false },
      { who: 'ari',  when: '3H', body: 'comp prep ✓ pizza after ✗', likes: 4, liked: true },
      { who: 'nat',  when: '2H', body: 'looking strong tomohawk', likes: 3, liked: false },
    ],
    post4: [
      { who: 'mara',  when: '1D', body: 'the cave 😈', likes: 18, liked: false },
      { who: 'tomo',  when: '23H',body: '38 attempts. respect.', likes: 14, liked: false },
    ],
    post5: [
      { who: 'ari',   when: '3D', body: 'come saturday', likes: 1, liked: false },
    ],
  };
  const chats = [
    { id: 'c1', kind: 'group', name: 'CRUSHERS CREW',     members: ['you','mara','ari','jules','ben','tomo','nat'], unread: 3, lastTime: '2M' },
    { id: 'c2', kind: 'dm',    other: 'jules',                                                                       unread: 1, lastTime: '14M' },
    { id: 'c3', kind: 'group', name: 'BAY AREA BOULDER',  members: ['you','tomo','ben','nat','finn','jules','ari','mara'], unread: 12, lastTime: '1H' },
    { id: 'c4', kind: 'dm',    other: 'ari',                                                                         unread: 0,  lastTime: '3H' },
    { id: 'c5', kind: 'dm',    other: 'ben',                                                                         unread: 0,  lastTime: '5H', story: true },
    { id: 'c6', kind: 'group', name: 'PROJECT BLOOD ORANGE', members: ['you','mara'],                                 unread: 0,  lastTime: '1D' },
    { id: 'c7', kind: 'dm',    other: 'finn',                                                                        unread: 0,  lastTime: '2D' },
  ];
  const messages = {
    c1: [
      { id: 'm1', who: 'mara', body: 'finally got blood orange today 😭🔥', time: '4:12', kind: 'text' },
      { id: 'm2', who: 'mara', kind: 'send', sendId: 's1' },
      { id: 'm3', who: 'ari',  body: "insane!!! who's coming sat to celebrate 🍻", time: '4:14', kind: 'text' },
      { id: 'm4', who: 'you',  body: "i'm in. 10am? 🤝", time: '4:16', kind: 'me' },
    ],
    c2: [
      { id: 'm5', who: 'jules', body: 'sent you that beta vid 🎥', time: '14M', kind: 'text' },
    ],
    c3: [
      { id: 'm6', who: 'tomo', body: 'comp prep monday?', time: '1H', kind: 'text' },
    ],
    c4: [
      { id: 'm7', who: 'you', body: 'pulling up at 7', time: '3H', kind: 'me' },
    ],
    c5: [
      { id: 'm8', who: 'ben', body: '(sent a story)', time: '5H', kind: 'text' },
    ],
    c6: [
      { id: 'm9', who: 'mara', body: 'SENT ITTTT 🔥🔥', time: '1D', kind: 'text' },
    ],
    c7: [
      { id: 'm10', who: 'finn', body: 'haha that slab was wild', time: '2D', kind: 'text' },
    ],
  };
  const reactions = {
    m2: { fire: 4, flex: 2 },
  };
  const notifications = [
    { id: 1, type: 'like',   who: 'jules', body: 'liked your V5 send',                   when: '4M',  unread: true },
    { id: 2, type: 'comment',who: 'ben',   body: 'commented: "told you the heel-toe was the move 😤"', when: '12M', unread: true },
    { id: 3, type: 'rsvp',   who: 'ari',   body: 'is going to Sunday Slab Society',      when: '32M', unread: true },
    { id: 4, type: 'follow', who: 'tomo',  body: 'started following you',                when: '1H',  unread: false },
    { id: 5, type: 'mention',who: 'nat',   body: 'mentioned you in a story',             when: '2H',  unread: false },
    { id: 6, type: 'send',   who: 'mara',  body: 'sent V7 "Blood Orange" — first of grade', when: '4H', unread: false },
    { id: 7, type: 'crew',   who: 'Crushers',body: 'added you to the Crushers Crew chat',when: '1D',  unread: false },
    { id: 8, type: 'system', who: 'OFC',   body: 'Your weekly recap is ready',           when: '2D',  unread: false },
  ];
  const leaderboard = [
    { id: 'mara', rank: 1, points: 4820, delta: '+120', peak: 'V7' },
    { id: 'ben',  rank: 2, points: 4501, delta: '+92',  peak: 'V9' },
    { id: 'tomo', rank: 3, points: 3987, delta: '+71',  peak: 'V8' },
    { id: 'nat',  rank: 4, points: 3404, delta: '+58',  peak: 'V8' },
    { id: 'ari',  rank: 5, points: 2901, delta: '+48',  peak: 'V6' },
    { id: 'you',  rank: 6, points: 2402, delta: '+62',  peak: 'V6' },
    { id: 'jules',rank: 7, points: 2100, delta: '+34',  peak: 'V5' },
    { id: 'finn', rank: 8, points: 1408, delta: '+18',  peak: 'V4' },
  ];
  const recap = {
    week: 'APR 21–27',
    sends: 9,
    sessions: 4,
    minutes: 412,
    pyramid: [
      { g: 'V6', sent: 1 },
      { g: 'V5', sent: 3 },
      { g: 'V4', sent: 4 },
      { g: 'V3', sent: 1 },
    ],
    style: { SLAB: 4, STATIC: 3, DYNO: 1, OVERHANG: 1 },
    pr: 'V6 · "Red Dragon flash" — first V6 of the week',
    spotsHit: 2,
    crewSesh: 3,
  };
  const settings = {
    notifications: { likes: true, comments: true, rsvps: true, mentions: true, follows: true, system: false },
    privacy: { profile: 'PUBLIC', sends: 'PUBLIC', location: 'CREW' },
    units: 'V-SCALE',
    pushEnabled: true,
    darkMode: false,
  };
  const search = {
    recent: ['mara', 'crimps', 'V7 first', 'castle rock', 'movement den'],
    trending: ['#firstV7', '#sundayslab', '#dynobeta', '#chalkup', '#projectmode'],
  };
  return {
    me, friends, gyms, sends, projects, gear, achievements,
    trainingDays, events, posts, comments, chats, messages, reactions,
    notifications, leaderboard, recap, settings, search,
    drafts: { caption: '', tile: 0, grade: 'V7', sent: true, audience: 'PUBLIC' },
  };
}

let __store = null;
function loadStore() {
  if (__store) return __store;
  let saved = null;
  try { const raw = localStorage.getItem(STORE_KEY); if (raw) saved = JSON.parse(raw); } catch (e) {}
  __store = saved && saved._v === 1 ? saved.data : seed();
  return __store;
}
function persist() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify({ _v: 1, data: __store })); } catch (e) {}
}

const subs = new Set();
function notify() {
  persist();
  subs.forEach(fn => { try { fn(); } catch (e) {} });
}

function getStore() { return loadStore(); }
function setStore(updater) {
  __store = typeof updater === 'function' ? updater(loadStore()) : updater;
  notify();
}
// shallow patch helper
function patch(path, fn) {
  const s = loadStore();
  const arr = path.split('.');
  let target = s;
  for (let i = 0; i < arr.length - 1; i++) target = target[arr[i]];
  const key = arr[arr.length - 1];
  target[key] = fn(target[key]);
  notify();
}

function useStoreSlice(selector) {
  const [, force] = React.useReducer((x) => x + 1, 0);
  React.useEffect(() => {
    subs.add(force);
    return () => subs.delete(force);
  }, []);
  return selector(loadStore());
}

// ─── Domain helpers ─────────────────────────────────────────
function userById(id) {
  const s = loadStore();
  if (id === 'you') return s.me;
  return s.friends.find(f => f.id === id);
}
function avatarOf(id) {
  const u = userById(id);
  return u ? u.avatar : null;
}
function nameOf(id) {
  const u = userById(id);
  return u ? u.name : id;
}
function gymById(id) {
  return loadStore().gyms.find(g => g.id === id);
}
function sendById(id) {
  return loadStore().sends.find(s => s.id === id);
}
function eventById(id) {
  return loadStore().events.find(e => e.id === id);
}
function chatById(id) {
  return loadStore().chats.find(c => c.id === id);
}
function projectById(id) {
  return loadStore().projects.find(p => p.id === id);
}
function postById(id) {
  return loadStore().posts.find(p => p.id === id);
}

// ─── Mutations ──────────────────────────────────────────────
function toggleLike(postId) {
  patch('posts', posts => posts.map(p => {
    if (p.id !== postId) return p;
    const liked = !p.liked;
    return { ...p, liked, likes: (p.likes || 0) + (liked ? 1 : -1) };
  }));
}
function toggleSave(postId) {
  patch('posts', posts => posts.map(p => p.id === postId ? { ...p, saved: !p.saved } : p));
}
function rsvpEvent(eventId) {
  let nowGoing = false;
  patch('events', evts => evts.map(e => {
    if (e.id !== eventId) return e;
    const has = e.goingList.includes('you');
    nowGoing = !has;
    const goingList = has ? e.goingList.filter(x => x !== 'you') : [...e.goingList, 'you'];
    return { ...e, goingList, going: e.going + (has ? -1 : 1) };
  }));
  return nowGoing;
}
function isGoing(eventId) {
  const e = eventById(eventId);
  return !!(e && e.goingList.includes('you'));
}
function toggleFollow(userId) {
  let nowFollowing = false;
  patch('friends', friends => friends.map(f => {
    if (f.id !== userId) return f;
    nowFollowing = !f.amFollowing;
    return { ...f, amFollowing: nowFollowing };
  }));
  return nowFollowing;
}
function postComment(postId, body) {
  if (!body.trim()) return;
  patch('comments', cmts => ({
    ...cmts,
    [postId]: [...(cmts[postId] || []), { who: 'you', when: 'NOW', body: body.trim(), likes: 0, liked: false }],
  }));
  patch('posts', posts => posts.map(p => p.id === postId ? { ...p, comments: (p.comments || 0) + 1 } : p));
}
function toggleCommentLike(postId, idx) {
  patch('comments', cmts => ({
    ...cmts,
    [postId]: (cmts[postId] || []).map((c, i) => i === idx ? { ...c, liked: !c.liked, likes: c.likes + (c.liked ? -1 : 1) } : c),
  }));
}
function sendMessage(chatId, body) {
  if (!body.trim()) return;
  const time = new Date().toTimeString().slice(0, 5);
  const msg = { id: 'm' + Date.now(), who: 'you', body: body.trim(), time, kind: 'me' };
  patch('messages', m => ({ ...m, [chatId]: [...(m[chatId] || []), msg] }));
  patch('chats', cs => cs.map(c => c.id === chatId ? { ...c, lastTime: 'NOW' } : c));
  // simulated reply
  setTimeout(() => {
    const replies = [
      { who: 'mara', body: 'hell yeah 🤘' },
      { who: 'ari',  body: "i'll bring pads" },
      { who: 'jules',body: 'count me in' },
      { who: 'tomo', body: '🔥' },
      { who: 'ben',  body: 'pizza after?' },
    ];
    const r = replies[Math.floor(Math.random() * replies.length)];
    const t = new Date().toTimeString().slice(0, 5);
    patch('messages', m => ({ ...m, [chatId]: [...(m[chatId] || []), { id: 'm' + Date.now() + 'r', who: r.who, body: r.body, time: t, kind: 'text' }] }));
  }, 1300);
}
function reactToMessage(msgId, kind) {
  patch('reactions', r => ({ ...r, [msgId]: { ...(r[msgId] || {}), [kind]: ((r[msgId] || {})[kind] || 0) + 1 } }));
}
function logSend({ grade, name, gymId, attempts, sessions, style, holds, src, notes }) {
  const id = 's' + Date.now();
  patch('sends', sends => [{
    id, user: 'you', grade, name: name || 'Untitled', gym: gymId || 'BP',
    when: 'NOW', attempts: attempts || 1, sessions: sessions || 1,
    style: style || 'STATIC', holds: holds || 'CRIMPS',
    src: src || HF_IMG.send1, hero: false, notes: notes || '',
  }, ...sends]);
  patch('posts', posts => [{
    id: 'post-' + id, kind: 'send', user: 'you', sendId: id, when: 'NOW',
    likes: 0, liked: false, saved: false, comments: 0,
  }, ...posts]);
  return id;
}
function markAllNotifsRead() {
  patch('notifications', list => list.map(n => ({ ...n, unread: false })));
}
function tapNotif(id) {
  patch('notifications', list => list.map(n => n.id === id ? { ...n, unread: false } : n));
}
function setSetting(group, key, value) {
  patch('settings', s => ({ ...s, [group]: typeof s[group] === 'object' ? { ...s[group], [key]: value } : value }));
}
function updateMe(patchObj) {
  patch('me', me => ({ ...me, ...patchObj }));
}
function clearAllAndReseed() {
  __store = seed();
  notify();
}

window.OFC = {
  getStore, setStore, useStoreSlice,
  userById, avatarOf, nameOf, gymById, sendById, eventById, chatById, projectById, postById,
  toggleLike, toggleSave, rsvpEvent, isGoing, toggleFollow,
  postComment, toggleCommentLike,
  sendMessage, reactToMessage,
  logSend, markAllNotifsRead, tapNotif, setSetting, updateMe, clearAllAndReseed,
};
