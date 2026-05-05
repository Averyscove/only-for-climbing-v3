// hifi-shared.jsx — refined token system + atoms for the hi-fi mockup.
// Aesthetic: chalk + rock + dusk. Real climbing photography, layered
// textures, deeper contrast than the wireframe pass.

const HF = {
  // Surfaces
  paper:   '#ece4d6',          // chalky cream base
  paper2:  '#e2d9c8',          // slightly darker cream for cards on paper
  card:    '#f6efe1',          // subtle off-white card
  ink:     '#13110e',          // near-black
  ink2:    '#2c2823',
  ink3:    '#5e564b',
  ink4:    '#9a907f',
  rule:    '#1a1714',
  ruleSft: '#bfb4a0',
  // Brand
  accent:  '#e85d2a',          // chalk orange
  accent2: '#c43c0c',          // burnt
  amber:   '#d49323',          // for projects
  moss:    '#3d6e3a',
  blood:   '#7a1a0c',          // deep red marker
  // Dark surfaces (story viewer, dark cards)
  dark:    '#13110e',
  dark2:   '#1f1b16',
  // Typography
  display: '"Archivo Black", "Inter", system-ui, sans-serif',
  sans:    '"Inter", -apple-system, system-ui, sans-serif',
  mono:    '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace',
};

// Real climbing photos — keyed so we can swap consistently.
// All from Unsplash (free to use).
const HF_IMG = {
  // Full-bleed climbing/bouldering photos
  send1:    'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=1200&q=80', // bouldering overhang
  send2:    'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&q=80', // climber on wall (verified)
  send3:    'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=1200&q=80', // gym wall colorful
  outdoor1: 'https://images.unsplash.com/photo-1502323777036-f29e3972d82f?w=1200&q=80', // outdoor boulderer
  outdoor2: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80', // mountains/crag dusk (verified)
  gym1:     'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=1200&q=80', // gym interior (verified)
  gym2:     'https://images.unsplash.com/photo-1522163723043-478ef79a5bb4?w=1200&q=80', // bouldering shapes (verified)
  hands:    'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=1200&q=80', // chalked hands
  shoes:    'https://images.unsplash.com/photo-1600881333168-2ef49b341f30?w=1200&q=80', // climbing shoes
  // Square portraits for avatars (keyed by person)
  // Climbing-flavored portraits — climbers on wall, chalked hands, gear, gym candids
  mara:     'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&q=80', // woman bouldering, chalk
  jules:    'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=200&q=80', // climber in gym
  ben:      'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=200&q=80', // climber on colorful wall
  ari:      'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=200&q=80', // chalked hands
  tomo:     'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=200&q=80', // bouldering overhang
  nat:      'https://images.unsplash.com/photo-1502323777036-f29e3972d82f?w=200&q=80', // outdoor boulderer
  you:      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=200&q=80', // climber on wall
  finn:     'https://images.unsplash.com/photo-1522163723043-478ef79a5bb4?w=200&q=80', // bouldering shapes
};

// ─── Brand mark — All for Climbing ──────────────────────────
// Mountain-with-zigzag-bolt silhouette extracted from the official icon.
// Pure SVG so it scales crisp at any size and recolors via `color` prop.
function AFCMark({ size = 22, color = '#fff', bg, rounded = 0.22, style = {} }) {
  // viewBox 0..100 — traced from the source PNG.
  // Path: bottom-left → up to lower peak → bolt-notch valley → up to main peak →
  //       down right slope (with small step notch) → bottom-right → close.
  const path = "M 10.5 76.2 L 29.7 51.3 L 34.8 56.6 L 57.7 21.6 L 64.5 39 L 60 41.5 L 68 41.5 L 75 51.7 L 88.7 76.2 Z";
  if (bg) {
    const r = rounded * 100;
    return (
      <svg viewBox="0 0 100 100" width={size} height={size} style={style} aria-label="Only for Climbing">
        <rect x="0" y="0" width="100" height="100" rx={r} ry={r} fill={bg} />
        <path d={path} fill={color} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={style} aria-label="Only for Climbing">
      <path d={path} fill={color} />
    </svg>
  );
}

// Wordmark-only lockup: "ONLY FOR CLIMBING." in Archivo Black, orange period.
// (Standalone wordmark — no icon mark — per brand spec.)
function AFCLockup({ size = 22, color, accent, mono = false, style = {} }) {
  const ink = color || HF.ink;
  const dot = accent || HF.accent;
  return (
    <span style={{
      fontFamily: mono ? HF.mono : HF.display,
      fontSize: Math.round(size * 0.82),
      fontWeight: mono ? 800 : 900,
      letterSpacing: mono ? 1.5 : -0.8,
      textTransform: 'uppercase',
      lineHeight: 1, color: ink, whiteSpace: 'nowrap',
      display: 'inline-block',
      ...style,
    }}>
      ONLY FOR CLIMBING<span style={{ color: dot }}>.</span>
    </span>
  );
}

// Subtle paper noise (already used in wireframes — same recipe)
const HF_NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.08 0 0 0 0 0.06 0 0 0 0 0.04 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.16'/%3E%3C/svg%3E")`;

// ─── Photo / image with optional dim + caption ──────────────
function Photo({ src, height, ar, dim = 0, alt, style = {}, children, fit = 'cover' }) {
  const imgStyle = ar
    ? { aspectRatio: ar, width: '100%' }
    : { height };
  return (
    <div style={{ position: 'relative', overflow: 'hidden', ...imgStyle, ...style }}>
      <img src={src} alt={alt || ''} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: fit, display: 'block',
      }} />
      {dim > 0 && (
        <div style={{ position: 'absolute', inset: 0, background: `rgba(13,12,10,${dim})` }} />
      )}
      {children}
    </div>
  );
}

function HFAvatar({ src, label, size = 36, ring, dark }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: dark ? '#2a2622' : HF.paper2,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, position: 'relative',
      boxShadow: ring ? `0 0 0 2px ${HF.paper}, 0 0 0 ${2 + 2}px ${ring}` : 'none',
      overflow: 'hidden',
    }}>
      {src
        ? <img src={src} alt={label || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        : <span style={{ fontFamily: HF.mono, fontSize: size * 0.34, fontWeight: 800, color: dark ? '#fff' : HF.ink }}>{label}</span>}
    </div>
  );
}

function HFTag({ children, accent, dark, filled, style = {} }) {
  const fg = accent ? HF.accent : (dark ? '#fff' : HF.ink);
  return (
    <span style={{
      fontFamily: HF.mono, fontSize: 10, fontWeight: 700,
      letterSpacing: 1.2, textTransform: 'uppercase',
      padding: '4px 8px', lineHeight: 1,
      border: `1px solid ${fg}`,
      color: filled ? '#fff' : fg,
      background: filled ? fg : 'transparent',
      display: 'inline-flex', alignItems: 'center', gap: 4,
      ...style,
    }}>{children}</span>
  );
}

function HFGrade({ grade, big, dark, sent, project }) {
  const fg = project ? HF.amber : (dark ? '#fff' : HF.ink);
  return (
    <span style={{
      fontFamily: HF.mono, fontWeight: 800,
      fontSize: big ? 18 : 11,
      padding: big ? '7px 11px' : '3px 6px',
      border: `${big ? 2 : 1.5}px solid ${fg}`,
      background: sent ? fg : 'transparent',
      color: sent ? (dark ? HF.ink : '#fff') : fg,
      letterSpacing: 0.5,
      display: 'inline-block', lineHeight: 1,
    }}>{grade}</span>
  );
}

function HFIconBtn({ children, size = 36, accent, dark, style = {} }) {
  return (
    <button style={{
      width: size, height: size, borderRadius: '50%',
      background: accent ? HF.accent : (dark ? 'rgba(255,255,255,0.08)' : 'transparent'),
      color: accent ? '#fff' : (dark ? '#fff' : HF.ink),
      border: accent ? 'none' : `1.5px solid ${dark ? 'rgba(255,255,255,0.2)' : HF.rule}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', padding: 0, flexShrink: 0,
      ...style,
    }}>{children}</button>
  );
}

const HFIcon = {
  plus: (s = 18, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 18 18" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M9 3v12M3 9h12"/></svg>
  ),
  search: (s = 18, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 18 18" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round"><circle cx="8" cy="8" r="5"/><path d="M12 12l3.5 3.5"/></svg>
  ),
  bell: (s = 18, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 18 18" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 13V8a5 5 0 0110 0v5l1.5 2H2.5L4 13z"/><path d="M7 16a2 2 0 004 0"/></svg>
  ),
  heart: (s = 22, c = 'currentColor', fill = 'none') => (
    <svg width={s} height={s} viewBox="0 0 22 22" fill={fill} stroke={c} strokeWidth="1.7" strokeLinejoin="round"><path d="M11 19s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0118 9c0 5.5-7 10-7 10z"/></svg>
  ),
  comment: (s = 22, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 22 22" fill="none" stroke={c} strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round"><path d="M3 6a3 3 0 013-3h10a3 3 0 013 3v7a3 3 0 01-3 3H9l-4 3v-3H6a3 3 0 01-3-3V6z"/></svg>
  ),
  share: (s = 22, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 22 22" fill="none" stroke={c} strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round"><path d="M11 3v12M11 3l-4 4M11 3l4 4M4 13v4a2 2 0 002 2h10a2 2 0 002-2v-4"/></svg>
  ),
  bookmark: (s = 22, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 22 22" fill="none" stroke={c} strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round"><path d="M5 3h12v17l-6-4-6 4V3z"/></svg>
  ),
  pin: (s = 14, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 18 18" fill="none" stroke={c} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"><path d="M9 1.5c-3 0-5 2-5 5 0 3.5 5 9 5 9s5-5.5 5-9c0-3-2-5-5-5z"/><circle cx="9" cy="6.5" r="1.5"/></svg>
  ),
  cal: (s = 14, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 18 18" fill="none" stroke={c} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"><rect x="2.5" y="3.5" width="13" height="12" rx="1"/><path d="M2.5 7h13M6 2v3M12 2v3"/></svg>
  ),
  back: (s = 18, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 18 18" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 9H3M7 5L3 9l4 4"/></svg>
  ),
  arrow: (s = 18, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 18 18" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9h12M11 5l4 4-4 4"/></svg>
  ),
  more: (s = 18, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 18 18" fill={c}><circle cx="3.5" cy="9" r="1.5"/><circle cx="9" cy="9" r="1.5"/><circle cx="14.5" cy="9" r="1.5"/></svg>
  ),
  send: (s = 18, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 18 18" fill="none" stroke={c} strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round"><path d="M2 9l14-6-5 14-2.5-5L2 9z"/></svg>
  ),
  camera: (s = 18, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 18 18" fill="none" stroke={c} strokeWidth="1.6" strokeLinejoin="round"><path d="M2 5h3l1.5-2h5L13 5h3v9H2V5z"/><circle cx="9" cy="9.5" r="3"/></svg>
  ),
  play: (s = 22, c = '#fff') => (
    <svg width={s} height={s} viewBox="0 0 22 22" fill={c}><path d="M5 3l13 8-13 8V3z"/></svg>
  ),
  flame: (s = 22, c = 'currentColor', fill = false) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={fill ? c : 'none'} stroke={c} strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round"><path d="M12 3c1 3 3 4 3 7a3 3 0 01-6 0c0-1 .5-2 1-2.5C9.5 9 8 11 8 14a4 4 0 008 0c0-3.5-2.5-6-4-11z"/></svg>
  ),
  home: (s = 22, c = 'currentColor', fill = false) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={fill ? c : 'none'} stroke={c} strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round"><path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-9z"/></svg>
  ),
  chat: (s = 22, c = 'currentColor', fill = false) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={fill ? c : 'none'} stroke={c} strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round"><path d="M3 6a3 3 0 013-3h12a3 3 0 013 3v8a3 3 0 01-3 3h-7l-5 4v-4H6a3 3 0 01-3-3V6z"/></svg>
  ),
  user: (s = 22, c = 'currentColor', fill = false) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={fill ? c : 'none'} stroke={c} strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M3 21c1.5-4 5-6 9-6s7.5 2 9 6"/></svg>
  ),
  trophy: (s = 14, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 18 18" fill="none" stroke={c} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"><path d="M5 3h8v3a4 4 0 01-8 0V3z"/><path d="M3 4H1.5v2A2 2 0 003.5 8M15 4h1.5v2A2 2 0 0114.5 8M9 10v3M6 16h6"/></svg>
  ),
};

// ─── Tab bar (hi-fi) ────────────────────────────────────────
function HFTabBar({ active = 'home' }) {
  const nav = (s) => () => window.UC && window.UC.navigate(s);
  const items = [
    { id: 'home', icon: HFIcon.home, label: 'Feed', go: 'feed' },
    { id: 'plan', icon: HFIcon.flame, label: 'Discover', go: 'events' },
    { id: 'post', icon: HFIcon.plus, label: '', go: 'composer' },
    { id: 'chat', icon: HFIcon.chat, label: 'Chat', go: 'chats' },
    { id: 'me',   icon: HFIcon.user, label: 'Me', go: 'profile' },
  ];
  return (
    <div className="uc-tabbar" style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 30,
      paddingBottom: 28, paddingTop: 10,
      background: HF.paper,
      borderTop: `1px solid ${HF.ruleSft}`,
      display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start',
      backdropFilter: 'blur(8px)',
    }}>
      {items.map((it) => {
        const isActive = it.id === active;
        if (it.id === 'post') {
          return (
            <div key={it.id} onClick={nav(it.go)} role="button" style={{
              width: 52, height: 52, borderRadius: '50%',
              background: HF.accent, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 8px 22px ${HF.accent}55, 0 2px 0 ${HF.accent2}`,
              marginTop: -8, cursor: 'pointer',
            }}>{it.icon(24, '#fff')}</div>
          );
        }
        return (
          <div key={it.id} onClick={nav(it.go)} role="button" style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            color: isActive ? HF.ink : HF.ink3, cursor: 'pointer',
            padding: '0 8px',
          }}>
            {it.icon(22, isActive ? HF.ink : HF.ink3, isActive)}
            <span style={{
              fontFamily: HF.mono, fontSize: 9, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 700,
            }}>{it.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// Phone shell for hi-fi (paper + noise; integrates with iOS frame above)
function HFPhone({ children, dark, bg }) {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      background: dark ? HF.dark : (bg || HF.paper),
      color: dark ? '#f4f1ec' : HF.ink,
      fontFamily: HF.sans,
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        backgroundImage: HF_NOISE, backgroundSize: '220px 220px',
        opacity: 0.55, mixBlendMode: 'multiply',
      }} />
      <div style={{ position: 'relative', zIndex: 2, height: '100%' }}>
        {children}
      </div>
    </div>
  );
}

// ─── Toast (top, mono pill) ─────────────────────────────────
function HFToast({ msg, accent }) {
  if (!msg) return null;
  return (
    <div style={{
      position: 'absolute', top: 80, left: '50%', transform: 'translateX(-50%)', zIndex: 90,
      background: accent ? HF.accent : HF.ink, color: '#fff',
      fontFamily: HF.mono, fontSize: 11, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase',
      padding: '10px 14px', boxShadow: `3px 3px 0 ${accent ? HF.accent2 : '#000'}`,
      animation: 'uc-toast-in 220ms cubic-bezier(0.2,0.8,0.2,1)',
      whiteSpace: 'nowrap',
    }}>{msg}</div>
  );
}

// ─── Bottom sheet ───────────────────────────────────────────
function HFBottomSheet({ open, onClose, title, children, height = 0.78 }) {
  return (
    <>
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0, zIndex: 80,
        background: 'rgba(13,12,10,0.55)', backdropFilter: 'blur(4px)',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 200ms ease',
      }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 81,
        height: `${Math.round(height * 100)}%`,
        background: HF.paper,
        borderTop: `2px solid ${HF.rule}`,
        boxShadow: `0 -10px 40px rgba(0,0,0,0.25)`,
        transform: open ? 'translateY(0)' : 'translateY(110%)',
        transition: 'transform 280ms cubic-bezier(0.2,0.8,0.2,1)',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          padding: '10px 16px 8px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: `1px solid ${HF.ruleSft}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 36, height: 4, borderRadius: 2, background: HF.ruleSft }} />
          </div>
          <span style={{ fontFamily: HF.display, fontSize: 14, letterSpacing: -0.2, textTransform: 'uppercase' }}>{title}</span>
          <button onClick={onClose} style={{
            fontFamily: HF.mono, fontSize: 10, fontWeight: 800, letterSpacing: 1.5,
            color: HF.ink, background: 'transparent', border: `1.5px solid ${HF.rule}`,
            padding: '4px 8px', cursor: 'pointer', textTransform: 'uppercase',
          }}>CLOSE ✕</button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
          {children}
        </div>
      </div>
    </>
  );
}

// ─── Toggle helper hook ─────────────────────────────────────
function useUCToggle(initial) {
  const [on, setOn] = React.useState(initial);
  return [on, () => setOn(v => !v), setOn];
}

// Keyframes injected once for toast animation
if (typeof document !== 'undefined' && !document.getElementById('uc-fx-keyframes')) {
  const s = document.createElement('style');
  s.id = 'uc-fx-keyframes';
  s.textContent = '@keyframes uc-toast-in { from { transform: translate(-50%, -10px); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }';
  document.head.appendChild(s);
}

Object.assign(window, {
  HF, HF_IMG, HF_NOISE, Photo, HFAvatar, HFTag, HFGrade,
  HFIconBtn, HFIcon, HFTabBar, HFPhone,
  AFCMark, AFCLockup,
  HFToast, HFBottomSheet, useUCToggle,
});
