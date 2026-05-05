// v3.jsx — All new V3 screens. Each is a standalone HFPhone screen.
// Reads from OFC store, writes via OFC mutations.

// ─── helpers ────────────────────────────────────────────────
function HFScreenHeader({ title, onBack, right }) {
  return (
    <div style={{ padding: '8px 16px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
      {onBack && (
        <div onClick={onBack} style={{ cursor: 'pointer' }}>
          <HFIconBtn size={32}>{HFIcon.back(14)}</HFIconBtn>
        </div>
      )}
      <div style={{ fontFamily: HF.display, fontSize: 24, letterSpacing: -0.6, textTransform: 'uppercase' }}>{title}</div>
      <div style={{ flex: 1 }} />
      {right}
    </div>
  );
}

function HFEmptyState({ label, sub }) {
  return (
    <div style={{ padding: 30, textAlign: 'center' }}>
      <div style={{ fontFamily: HF.mono, fontSize: 11, color: HF.ink2, letterSpacing: 1, fontWeight: 800, textTransform: 'uppercase' }}>{label}</div>
      {sub && <div style={{ fontFamily: HF.mono, fontSize: 10, color: HF.ink3, marginTop: 8, letterSpacing: 0.5, textTransform: 'uppercase' }}>{sub}</div>}
    </div>
  );
}

function HFRowBtn({ label, sub, accent, danger, onClick }) {
  const c = danger ? HF.blood : (accent ? HF.accent : HF.ink);
  return (
    <button onClick={onClick} style={{
      width: '100%', padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: HF.card, border: `1px solid ${HF.ruleSft}`,
      cursor: 'pointer', textAlign: 'left',
    }}>
      <div>
        <div style={{ fontFamily: HF.mono, fontSize: 11, fontWeight: 800, letterSpacing: 1.2, color: c, textTransform: 'uppercase' }}>{label}</div>
        {sub && <div style={{ fontFamily: HF.mono, fontSize: 9, color: HF.ink3, marginTop: 3, letterSpacing: 0.8 }}>{sub}</div>}
      </div>
      <span style={{ color: c, fontFamily: HF.mono, fontSize: 14, fontWeight: 800 }}>→</span>
    </button>
  );
}

// ─── Search ─────────────────────────────────────────────────
function HFSearchScreen() {
  const [q, setQ] = React.useState('');
  const [tab, setTab] = React.useState('TOP');
  const friends = OFC.useStoreSlice(s => s.friends);
  const gyms = OFC.useStoreSlice(s => s.gyms);
  const sends = OFC.useStoreSlice(s => s.sends);
  const search = OFC.useStoreSlice(s => s.search);
  const ql = q.toLowerCase();
  const peopleHits = friends.filter(f => !ql || f.name.toLowerCase().includes(ql) || f.handle.toLowerCase().includes(ql));
  const gymHits    = gyms.filter(g => !ql || g.name.toLowerCase().includes(ql) || g.city.toLowerCase().includes(ql));
  const sendHits   = sends.filter(s => !ql || s.name.toLowerCase().includes(ql));
  const tags = ['#firstV7','#sundayslab','#dynobeta','#chalkup','#projectmode'];
  const tagHits = tags.filter(t => !ql || t.toLowerCase().includes(ql));
  const results = (
    <>
      {(tab === 'TOP' || tab === 'PEOPLE') && peopleHits.length > 0 && (
        <div>
          {tab === 'TOP' && <Section label="PEOPLE" />}
          {peopleHits.slice(0, tab === 'TOP' ? 3 : 99).map(f => (
            <div key={f.id} onClick={() => window.UC.openProfile(f.id)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', cursor: 'pointer' }}>
              <HFAvatar size={40} src={f.avatar} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: HF.ink }}>{f.name}</div>
                <div style={{ fontFamily: HF.mono, fontSize: 10, color: HF.ink3, letterSpacing: 0.5, textTransform: 'uppercase' }}>@{f.handle} · {f.city} · {f.peak} PEAK</div>
              </div>
              {f.amFollowing && <span style={{ fontFamily: HF.mono, fontSize: 9, color: HF.accent, fontWeight: 800, letterSpacing: 1 }}>FOLLOWING</span>}
            </div>
          ))}
        </div>
      )}
      {(tab === 'TOP' || tab === 'SPOTS') && gymHits.length > 0 && (
        <div>
          {tab === 'TOP' && <Section label="SPOTS" />}
          {gymHits.slice(0, tab === 'TOP' ? 3 : 99).map(g => (
            <div key={g.id} onClick={() => window.UC.openGym(g.id)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', cursor: 'pointer' }}>
              <Photo src={g.src} style={{ width: 40, height: 40, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: HF.display, fontSize: 14, letterSpacing: -0.2, textTransform: 'uppercase' }}>{g.name}</div>
                <div style={{ fontFamily: HF.mono, fontSize: 10, color: HF.ink3, letterSpacing: 0.5, textTransform: 'uppercase' }}>{g.city} · {g.dist}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {(tab === 'TOP' || tab === 'SENDS') && sendHits.length > 0 && (
        <div>
          {tab === 'TOP' && <Section label="SENDS" />}
          {sendHits.slice(0, tab === 'TOP' ? 3 : 99).map(s => (
            <div key={s.id} onClick={() => window.UC.openProfile(s.user)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', cursor: 'pointer' }}>
              <Photo src={s.src} style={{ width: 40, height: 40, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: HF.ink }}>"{s.name}"</div>
                <div style={{ fontFamily: HF.mono, fontSize: 10, color: HF.ink3, letterSpacing: 0.5, textTransform: 'uppercase' }}>BY @{s.user} · {s.gym}</div>
              </div>
              <HFGrade grade={s.grade} sent />
            </div>
          ))}
        </div>
      )}
      {(tab === 'TOP' || tab === 'TAGS') && tagHits.length > 0 && (
        <div>
          {tab === 'TOP' && <Section label="TAGS" />}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '6px 14px 14px' }}>
            {tagHits.map(t => (
              <span key={t} onClick={() => setQ(t)} style={{ fontFamily: HF.mono, fontSize: 11, fontWeight: 700, padding: '6px 10px', border: `1px solid ${HF.rule}`, color: HF.accent, cursor: 'pointer' }}>{t}</span>
            ))}
          </div>
        </div>
      )}
    </>
  );
  return (
    <HFPhone>
      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, bottom: 80, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
        <div style={{ padding: '8px 16px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div onClick={() => window.UC.navigate('feed')} style={{ cursor: 'pointer' }}>
            <HFIconBtn size={32}>{HFIcon.back(14)}</HFIconBtn>
          </div>
          <div style={{ flex: 1, height: 36, border: `1.5px solid ${HF.rule}`, display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', background: HF.card }}>
            {HFIcon.search(13, HF.ink3)}
            <input
              autoFocus
              value={q} onChange={e => setQ(e.target.value)}
              placeholder="SEARCH PEOPLE · SPOTS · SENDS · #TAGS"
              style={{ flex: 1, height: '100%', border: 'none', background: 'transparent', outline: 'none', fontFamily: HF.mono, fontSize: 11, color: HF.ink, letterSpacing: 0.5 }}
            />
            {q && <span onClick={() => setQ('')} style={{ fontFamily: HF.mono, fontSize: 10, color: HF.ink3, cursor: 'pointer' }}>✕</span>}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14, padding: '0 16px', borderBottom: `1px solid ${HF.ruleSft}`, overflowX: 'auto' }}>
          {['TOP', 'PEOPLE', 'SPOTS', 'SENDS', 'TAGS'].map(t => (
            <div key={t} onClick={() => setTab(t)} style={{
              padding: '8px 0', fontFamily: HF.mono, fontSize: 10, letterSpacing: 1.2, fontWeight: 800,
              color: tab === t ? HF.ink : HF.ink3,
              borderBottom: tab === t ? `2.5px solid ${HF.accent}` : 'none',
              marginBottom: -1, cursor: 'pointer', whiteSpace: 'nowrap',
            }}>{t}</div>
          ))}
        </div>
        {!q ? (
          <>
            <Section label="RECENT" right={<span onClick={() => window.UC.toast('CLEARED')} style={{ fontFamily: HF.mono, fontSize: 9, color: HF.accent, fontWeight: 800, cursor: 'pointer', letterSpacing: 1 }}>CLEAR</span>} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '4px 14px 14px' }}>
              {search.recent.map(r => (
                <span key={r} onClick={() => setQ(r)} style={{ fontFamily: HF.mono, fontSize: 11, padding: '6px 10px', border: `1px solid ${HF.ruleSft}`, background: HF.card, cursor: 'pointer' }}>{r}</span>
              ))}
            </div>
            <Section label="TRENDING" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '4px 14px 14px' }}>
              {search.trending.map(t => (
                <span key={t} onClick={() => setQ(t)} style={{ fontFamily: HF.mono, fontSize: 11, fontWeight: 700, padding: '6px 10px', border: `1px solid ${HF.accent}`, color: HF.accent, cursor: 'pointer' }}>{t}</span>
              ))}
            </div>
            <Section label="SUGGESTED PEOPLE" />
            {friends.filter(f => !f.amFollowing).map(f => (
              <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px' }}>
                <div onClick={() => window.UC.openProfile(f.id)} style={{ cursor: 'pointer' }}>
                  <HFAvatar size={40} src={f.avatar} />
                </div>
                <div onClick={() => window.UC.openProfile(f.id)} style={{ flex: 1, minWidth: 0, cursor: 'pointer' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: HF.ink }}>{f.name}</div>
                  <div style={{ fontFamily: HF.mono, fontSize: 10, color: HF.ink3, letterSpacing: 0.5, textTransform: 'uppercase' }}>@{f.handle} · {f.peak} PEAK</div>
                </div>
                <button onClick={() => { const next = OFC.toggleFollow(f.id); window.UC.toast(next ? '✓ FOLLOWING' : 'UNFOLLOWED', { accent: next }); }} style={{
                  fontFamily: HF.mono, fontSize: 9, fontWeight: 800, letterSpacing: 1.2,
                  padding: '6px 10px', border: `1.5px solid ${HF.accent}`,
                  background: HF.accent, color: '#fff', cursor: 'pointer', textTransform: 'uppercase',
                }}>+ FOLLOW</button>
              </div>
            ))}
          </>
        ) : results}
      </div>
      <HFTabBar active="home" />
    </HFPhone>
  );
}

function Section({ label, right }) {
  return (
    <div style={{ padding: '14px 14px 6px', display: 'flex', alignItems: 'center' }}>
      <span style={{ fontFamily: HF.mono, fontSize: 9, color: HF.ink3, letterSpacing: 1.8, fontWeight: 800, textTransform: 'uppercase' }}>{label}</span>
      <div style={{ flex: 1 }} />
      {right}
    </div>
  );
}

// ─── Friend profile ─────────────────────────────────────────
function HFFriendProfileScreen({ userId }) {
  const u = OFC.useStoreSlice(s => s.friends.find(f => f.id === userId));
  const sends = OFC.useStoreSlice(s => s.sends.filter(x => x.user === userId));
  const events = OFC.useStoreSlice(s => s.events.filter(e => e.host === userId));
  if (!u) return <HFPhone><HFEmptyState label="USER NOT FOUND" /></HFPhone>;
  const banner = sends[0]?.src || HF_IMG.outdoor1;
  return (
    <HFPhone>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 80, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
        <div style={{ position: 'relative' }}>
          <Photo src={banner} height={140} dim={0.35} />
          <div style={{ position: 'absolute', top: 54, left: 14, right: 14, display: 'flex', justifyContent: 'space-between' }}>
            <div onClick={() => window.UC.navigate('feed')} style={{ cursor: 'pointer' }}>
              <HFIconBtn size={32} dark>{HFIcon.back(14, '#fff')}</HFIconBtn>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div onClick={() => window.UC.toast('LINK COPIED', { accent: true })} style={{ cursor: 'pointer' }}>
                <HFIconBtn size={32} dark>{HFIcon.share(14, '#fff')}</HFIconBtn>
              </div>
              <HFIconBtn size={32} dark>{HFIcon.more(14, '#fff')}</HFIconBtn>
            </div>
          </div>
        </div>
        <div style={{ padding: '0 16px', marginTop: -36, position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
            <div style={{ borderRadius: '50%', padding: 3, background: HF.paper, position: 'relative' }}>
              <HFAvatar src={u.avatar} size={84} />
              {u.online && <span style={{ position: 'absolute', bottom: 4, right: 4, width: 16, height: 16, background: HF.moss, borderRadius: '50%', border: `3px solid ${HF.paper}` }} />}
            </div>
            <div style={{ flex: 1, paddingBottom: 6 }}>
              <div style={{ fontFamily: HF.display, fontSize: 22, letterSpacing: -0.5, lineHeight: 1, textTransform: 'uppercase' }}>{u.name}</div>
              <div style={{ fontFamily: HF.mono, fontSize: 10, color: HF.ink3, letterSpacing: 1, marginTop: 4, textTransform: 'uppercase' }}>@{u.handle} · {u.city}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            <HFTag>{u.peak} PEAK</HFTag>
            {u.followsMe && <HFTag accent>FOLLOWS YOU</HFTag>}
          </div>
          <div style={{ fontSize: 13, color: HF.ink2, lineHeight: 1.45, marginTop: 10 }}>{u.bio}</div>
          <div style={{ display: 'flex', gap: 14, marginTop: 10, fontFamily: HF.mono, fontSize: 11, color: HF.ink2, letterSpacing: 0.5, fontWeight: 700, textTransform: 'uppercase' }}>
            <span><b style={{ color: HF.ink }}>{u.followers}</b> FOLLOWERS</span>
            <span><b style={{ color: HF.ink }}>{u.following}</b> FOLLOWING</span>
            <span><b style={{ color: HF.ink }}>{sends.length}</b> SENDS</span>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <button onClick={() => { const next = OFC.toggleFollow(u.id); window.UC.toast(next ? '✓ FOLLOWING' : 'UNFOLLOWED', { accent: next }); }} style={{
              flex: 1, padding: '10px 0', fontFamily: HF.mono, fontSize: 11, fontWeight: 800, letterSpacing: 1.2,
              background: u.amFollowing ? 'transparent' : HF.accent,
              color: u.amFollowing ? HF.ink : '#fff',
              border: `1.5px solid ${u.amFollowing ? HF.rule : HF.accent}`,
              cursor: 'pointer', textTransform: 'uppercase',
            }}>{u.amFollowing ? '✓ FOLLOWING' : '+ FOLLOW'}</button>
            <button onClick={() => window.UC.navigate('thread')} style={{
              flex: 1, padding: '10px 0', fontFamily: HF.mono, fontSize: 11, fontWeight: 800, letterSpacing: 1.2,
              background: HF.ink, color: '#fff',
              border: `1.5px solid ${HF.ink}`,
              cursor: 'pointer', textTransform: 'uppercase',
            }}>MESSAGE</button>
          </div>
        </div>
        <Section label={`SENDS · ${sends.length}`} />
        {sends.length === 0 && <HFEmptyState label="NO SENDS YET" />}
        {sends.map(s => {
          const gym = OFC.gymById(s.gym);
          return (
            <div key={s.id} onClick={() => window.UC.navigate('shareB')} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 16px', borderBottom: `1px solid ${HF.ruleSft}`, cursor: 'pointer' }}>
              <Photo src={s.src} height={48} style={{ width: 48, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: HF.ink }}>{s.name}</div>
                <div style={{ fontFamily: HF.mono, fontSize: 10, color: HF.ink3, letterSpacing: 0.5, textTransform: 'uppercase' }}>{gym ? gym.name : '—'} · {s.when}</div>
              </div>
              <HFGrade grade={s.grade} sent />
            </div>
          );
        })}
        {events.length > 0 && <Section label={`HOSTING · ${events.length}`} />}
        {events.map(e => (
          <div key={e.id} onClick={() => window.UC.openEvent(e.id)} style={{ padding: '10px 16px', borderBottom: `1px solid ${HF.ruleSft}`, cursor: 'pointer' }}>
            <div style={{ fontFamily: HF.display, fontSize: 14, letterSpacing: -0.2, textTransform: 'uppercase' }}>{e.title}</div>
            <div style={{ fontFamily: HF.mono, fontSize: 9, color: HF.ink3, letterSpacing: 0.5, fontWeight: 700, textTransform: 'uppercase', marginTop: 4 }}>{e.day} {e.date} {e.mo} · {e.time} · {e.loc}</div>
          </div>
        ))}
      </div>
      <HFTabBar active="home" />
    </HFPhone>
  );
}

// ─── Settings ───────────────────────────────────────────────
function HFSettingsScreen() {
  const settings = OFC.useStoreSlice(s => s.settings);
  const me = OFC.useStoreSlice(s => s.me);
  const Toggle = ({ on, onChange }) => (
    <button onClick={onChange} style={{
      width: 44, height: 24, borderRadius: 999, position: 'relative',
      background: on ? HF.accent : HF.ruleSft, border: 'none', cursor: 'pointer',
      transition: 'background 200ms',
    }}>
      <span style={{
        position: 'absolute', top: 2, left: on ? 22 : 2,
        width: 20, height: 20, borderRadius: '50%', background: '#fff',
        transition: 'left 180ms',
        boxShadow: '0 1px 3px rgba(0,0,0,0.35)',
      }} />
    </button>
  );
  const Row = ({ k, on, onToggle, value, onPick, options }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: `1px solid ${HF.ruleSft}` }}>
      <span style={{ flex: 1, fontFamily: HF.mono, fontSize: 11, fontWeight: 700, color: HF.ink, letterSpacing: 0.5, textTransform: 'uppercase' }}>{k}</span>
      {typeof on === 'boolean' ? <Toggle on={on} onChange={onToggle} /> : (
        <div style={{ display: 'flex', gap: 4 }}>
          {options.map(o => (
            <button key={o} onClick={() => onPick(o)} style={{
              fontFamily: HF.mono, fontSize: 9, fontWeight: 800, letterSpacing: 1, padding: '5px 8px',
              border: `1.5px solid ${value === o ? HF.accent : HF.ruleSft}`,
              background: value === o ? HF.accent : 'transparent',
              color: value === o ? '#fff' : HF.ink, cursor: 'pointer', textTransform: 'uppercase',
            }}>{o}</button>
          ))}
        </div>
      )}
    </div>
  );
  return (
    <HFPhone>
      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, bottom: 80, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
        <HFScreenHeader title="SETTINGS" onBack={() => window.UC.navigate('me')} />
        <div onClick={() => window.UC.navigate('editProfile')} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderTop: `1px solid ${HF.ruleSft}`, borderBottom: `1px solid ${HF.ruleSft}`, background: HF.card, cursor: 'pointer' }}>
          <HFAvatar size={48} src={me.avatar} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: HF.display, fontSize: 16, letterSpacing: -0.2 }}>{me.name}</div>
            <div style={{ fontFamily: HF.mono, fontSize: 10, color: HF.ink3, letterSpacing: 0.5, textTransform: 'uppercase' }}>@{me.handle} · TAP TO EDIT</div>
          </div>
          <span style={{ fontFamily: HF.mono, fontSize: 14, fontWeight: 800, color: HF.accent }}>→</span>
        </div>
        <Section label="NOTIFICATIONS" />
        {Object.entries(settings.notifications).map(([k, v]) => (
          <Row key={k} k={k} on={v} onToggle={() => OFC.setSetting('notifications', k, !v)} />
        ))}
        <Section label="PRIVACY" />
        <Row k="PROFILE" value={settings.privacy.profile} options={['PUBLIC','CREW','ONLY ME']} onPick={(o) => OFC.setSetting('privacy', 'profile', o)} />
        <Row k="SENDS"   value={settings.privacy.sends}   options={['PUBLIC','CREW','ONLY ME']} onPick={(o) => OFC.setSetting('privacy', 'sends', o)} />
        <Row k="LOCATION" value={settings.privacy.location} options={['PUBLIC','CREW','OFF']}    onPick={(o) => OFC.setSetting('privacy', 'location', o)} />
        <Section label="APP" />
        <Row k="UNITS" value={settings.units} options={['V-SCALE','FONT']} onPick={(o) => OFC.setSetting('units', null, o)} />
        <Row k="PUSH" on={settings.pushEnabled} onToggle={() => OFC.setSetting('pushEnabled', null, !settings.pushEnabled)} />
        <Section label="ACCOUNT" />
        <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <HFRowBtn label="EXPORT MY DATA"  sub="JSON dump"        onClick={() => window.UC.toast('EXPORT QUEUED')} />
          <HFRowBtn label="HELP & SUPPORT"  sub="Send a love letter" onClick={() => window.UC.toast('SUPPORT EMAIL OPENED')} />
          <HFRowBtn label="RESET MOCK DATA" sub="Restore the sample data" accent onClick={() => { OFC.clearAllAndReseed(); window.UC.toast('RESET TO SEED', { accent: true }); }} />
          <HFRowBtn label="LOG OUT"         sub="See you on the wall" danger onClick={() => { window.UC.toast('SIGNED OUT'); window.UC.navigate('onboarding'); }} />
        </div>
        <div style={{ padding: '0 16px 24px', textAlign: 'center', fontFamily: HF.mono, fontSize: 9, color: HF.ink3, letterSpacing: 1.2, fontWeight: 700, textTransform: 'uppercase' }}>OFC · V3 · MOCK BUILD · 26.04.05</div>
      </div>
      <HFTabBar active="me" />
    </HFPhone>
  );
}

// ─── Edit Profile ───────────────────────────────────────────
function HFEditProfileScreen() {
  const me = OFC.useStoreSlice(s => s.me);
  const [draft, setDraft] = React.useState(me);
  const set = (k, v) => setDraft(d => ({ ...d, [k]: v }));
  const save = () => { OFC.updateMe(draft); window.UC.toast('✓ PROFILE SAVED', { accent: true }); window.UC.navigate('settings'); };
  const Field = ({ k, v, onChange, multi }) => (
    <div style={{ padding: '0 16px 14px' }}>
      <div style={{ fontFamily: HF.mono, fontSize: 9, color: HF.ink3, letterSpacing: 1.5, fontWeight: 800, textTransform: 'uppercase', marginBottom: 4 }}>{k}</div>
      {multi ? (
        <textarea value={v} onChange={e => onChange(e.target.value)} rows={3} style={{ width: '100%', padding: 8, border: `1.5px solid ${HF.rule}`, background: HF.card, fontSize: 14, color: HF.ink, fontFamily: HF.sans, outline: 'none', resize: 'none' }} />
      ) : (
        <input value={v} onChange={e => onChange(e.target.value)} style={{ width: '100%', padding: '8px 10px', border: `1.5px solid ${HF.rule}`, background: HF.card, fontSize: 14, color: HF.ink, fontFamily: HF.sans, outline: 'none' }} />
      )}
    </div>
  );
  return (
    <HFPhone>
      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, bottom: 0, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
        <div style={{ padding: '8px 14px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${HF.ruleSft}` }}>
          <span onClick={() => window.UC.navigate('settings')} style={{ fontFamily: HF.mono, fontSize: 11, color: HF.ink, fontWeight: 700, letterSpacing: 1.5, cursor: 'pointer' }}>CANCEL</span>
          <span style={{ fontFamily: HF.display, fontSize: 14, letterSpacing: -0.2, textTransform: 'uppercase' }}>EDIT PROFILE</span>
          <span onClick={save} style={{ fontFamily: HF.mono, fontSize: 11, color: HF.accent, fontWeight: 800, letterSpacing: 1.5, cursor: 'pointer' }}>SAVE</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
          <div style={{ position: 'relative' }}>
            <HFAvatar size={96} src={draft.avatar} />
            <div onClick={() => window.UC.toast('UPLOAD · COMING IN V4')} style={{ position: 'absolute', bottom: 0, right: 0, width: 32, height: 32, borderRadius: '50%', background: HF.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>{HFIcon.camera(15, '#fff')}</div>
          </div>
        </div>
        <Field k="NAME" v={draft.name} onChange={(v) => set('name', v)} />
        <Field k="HANDLE" v={draft.handle} onChange={(v) => set('handle', v)} />
        <Field k="BIO" v={draft.bio} onChange={(v) => set('bio', v)} multi />
        <Field k="CITY" v={draft.city} onChange={(v) => set('city', v)} />
        <Field k="PRONOUNS" v={draft.pronouns} onChange={(v) => set('pronouns', v)} />
      </div>
    </HFPhone>
  );
}

// ─── Gym Detail ─────────────────────────────────────────────
function HFGymDetailScreen({ gymId }) {
  const gym = OFC.useStoreSlice(s => s.gyms.find(g => g.id === gymId));
  const friendsHere = OFC.useStoreSlice(s => s.friends.slice(0, gym ? gym.friends : 0));
  const sends = OFC.useStoreSlice(s => s.sends.filter(x => x.gym === gymId));
  const events = OFC.useStoreSlice(s => s.events.filter(e => e.gymId === gymId));
  const [tab, setTab] = React.useState('OVERVIEW');
  if (!gym) return <HFPhone><HFEmptyState label="GYM NOT FOUND" /></HFPhone>;
  return (
    <HFPhone>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 80, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
        <div style={{ position: 'relative' }}>
          <Photo src={gym.src} height={180} dim={0.3} />
          <div style={{ position: 'absolute', top: 54, left: 14, right: 14, display: 'flex', justifyContent: 'space-between' }}>
            <div onClick={() => window.UC.navigate('map')} style={{ cursor: 'pointer' }}>
              <HFIconBtn size={32} dark>{HFIcon.back(14, '#fff')}</HFIconBtn>
            </div>
            <div onClick={() => window.UC.toast('SAVED TO SPOTS', { accent: true })} style={{ cursor: 'pointer' }}>
              <HFIconBtn size={32} dark>{HFIcon.bookmark(14, '#fff')}</HFIconBtn>
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: 12, left: 14, right: 14, color: '#fff' }}>
            <div style={{ fontFamily: HF.display, fontSize: 26, letterSpacing: -0.6, textTransform: 'uppercase' }}>{gym.name}</div>
            <div style={{ fontFamily: HF.mono, fontSize: 11, letterSpacing: 1, fontWeight: 700, marginTop: 4, textTransform: 'uppercase' }}>{gym.city} · {gym.dist} · {gym.open}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, padding: '14px 14px 0' }}>
          <button onClick={() => window.UC.toast('✓ DIRECTIONS', { accent: true })} style={{ flex: 1, padding: '10px 0', fontFamily: HF.mono, fontSize: 11, fontWeight: 800, letterSpacing: 1.2, background: HF.accent, color: '#fff', border: 'none', cursor: 'pointer', boxShadow: `2px 2px 0 ${HF.rule}`, textTransform: 'uppercase' }}>DIRECTIONS</button>
          <button onClick={() => window.UC.navigate('plan')} style={{ flex: 1, padding: '10px 0', fontFamily: HF.mono, fontSize: 11, fontWeight: 800, letterSpacing: 1.2, background: 'transparent', color: HF.ink, border: `1.5px solid ${HF.rule}`, cursor: 'pointer', textTransform: 'uppercase' }}>PLAN SESH</button>
          <button onClick={() => window.UC.navigate('composer')} style={{ flex: 1, padding: '10px 0', fontFamily: HF.mono, fontSize: 11, fontWeight: 800, letterSpacing: 1.2, background: HF.ink, color: '#fff', border: `1.5px solid ${HF.ink}`, cursor: 'pointer', textTransform: 'uppercase' }}>LOG SEND</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', margin: '14px 14px 0', border: `1px solid ${HF.rule}`, background: HF.card }}>
          {[['PROBLEMS', gym.problems], ['FRIENDS', gym.friends], ['DIST', gym.dist]].map(([k, v], i, a) => (
            <div key={k} style={{ padding: '10px 4px', textAlign: 'center', borderRight: i < a.length - 1 ? `1px solid ${HF.ruleSft}` : 'none' }}>
              <div style={{ fontFamily: HF.display, fontSize: 18 }}>{v}</div>
              <div style={{ fontFamily: HF.mono, fontSize: 9, color: HF.ink3, letterSpacing: 1.5, fontWeight: 800, marginTop: 4, textTransform: 'uppercase' }}>{k}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, padding: '14px 16px 0', borderBottom: `1px solid ${HF.ruleSft}` }}>
          {['OVERVIEW', 'ROUTES', 'EVENTS', 'FRIENDS'].map(t => (
            <div key={t} onClick={() => setTab(t)} style={{
              padding: '8px 0', fontFamily: HF.mono, fontSize: 10, fontWeight: 800, letterSpacing: 1.2,
              color: tab === t ? HF.ink : HF.ink3,
              borderBottom: tab === t ? `2.5px solid ${HF.accent}` : 'none', marginBottom: -1, cursor: 'pointer',
            }}>{t}</div>
          ))}
        </div>
        {tab === 'OVERVIEW' && (
          <div style={{ padding: '14px 16px' }}>
            <div style={{ fontFamily: HF.mono, fontSize: 9, color: HF.ink3, letterSpacing: 1.5, fontWeight: 800, textTransform: 'uppercase' }}>HOURS</div>
            <div style={{ fontSize: 13, color: HF.ink, marginTop: 4, lineHeight: 1.5 }}>{gym.hours}</div>
            <div style={{ fontFamily: HF.mono, fontSize: 9, color: HF.ink3, letterSpacing: 1.5, fontWeight: 800, textTransform: 'uppercase', marginTop: 14 }}>SET TURNOVER</div>
            <div style={{ fontSize: 13, color: HF.ink, marginTop: 4 }}>Every 2 weeks · last reset 4 days ago</div>
            <div style={{ fontFamily: HF.mono, fontSize: 9, color: HF.ink3, letterSpacing: 1.5, fontWeight: 800, textTransform: 'uppercase', marginTop: 14 }}>GRADES SET</div>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 6 }}>
              {['V0','V1','V2','V3','V4','V5','V6','V7','V8'].map(g => <HFGrade key={g} grade={g} />)}
            </div>
          </div>
        )}
        {tab === 'ROUTES' && (
          <div style={{ padding: '14px 16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
              {Array.from({ length: 25 }).map((_, i) => {
                const grade = 'V' + (i % 9);
                const sent = i % 5 === 0;
                return (
                  <div key={i} onClick={() => window.UC.toast(`ROUTE ${grade} · ${i + 1}`, { accent: sent })} style={{
                    aspectRatio: '1', border: `1.5px solid ${sent ? HF.accent : HF.rule}`,
                    background: sent ? HF.accent + '22' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: HF.mono, fontSize: 10, fontWeight: 800,
                    color: sent ? HF.accent : HF.ink, cursor: 'pointer',
                  }}>{grade}</div>
                );
              })}
            </div>
            <div style={{ marginTop: 10, fontFamily: HF.mono, fontSize: 9, color: HF.ink3, letterSpacing: 1, fontWeight: 700, textTransform: 'uppercase' }}>● TINTED = SENT BY YOU</div>
          </div>
        )}
        {tab === 'EVENTS' && (
          <div>
            {events.length === 0 && <HFEmptyState label="NO UPCOMING EVENTS" />}
            {events.map(e => (
              <div key={e.id} onClick={() => window.UC.openEvent(e.id)} style={{ padding: '12px 16px', borderBottom: `1px solid ${HF.ruleSft}`, cursor: 'pointer' }}>
                <div style={{ fontFamily: HF.display, fontSize: 14, letterSpacing: -0.2, textTransform: 'uppercase' }}>{e.title}</div>
                <div style={{ fontFamily: HF.mono, fontSize: 9, color: HF.ink3, letterSpacing: 0.5, fontWeight: 700, textTransform: 'uppercase', marginTop: 4 }}>{e.day} {e.date} {e.mo} · {e.time}</div>
              </div>
            ))}
          </div>
        )}
        {tab === 'FRIENDS' && (
          <div>
            {friendsHere.map(f => (
              <div key={f.id} onClick={() => window.UC.openProfile(f.id)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', cursor: 'pointer' }}>
                <HFAvatar size={36} src={f.avatar} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: HF.ink }}>{f.name}</div>
                  <div style={{ fontFamily: HF.mono, fontSize: 10, color: HF.ink3, letterSpacing: 0.5, textTransform: 'uppercase' }}>● HERE NOW · @{f.handle}</div>
                </div>
                <span style={{ fontFamily: HF.mono, fontSize: 9, color: HF.accent, fontWeight: 800, letterSpacing: 1 }}>WAVE →</span>
              </div>
            ))}
            {friendsHere.length === 0 && <HFEmptyState label="NO FRIENDS HERE NOW" />}
          </div>
        )}
      </div>
      <HFTabBar active="plan" />
    </HFPhone>
  );
}

// ─── Project Tracker ────────────────────────────────────────
function HFProjectsScreen() {
  const projects = OFC.useStoreSlice(s => s.projects);
  const sendIt = (id) => {
    const p = OFC.projectById(id);
    OFC.logSend({ grade: p.grade, name: p.name, gymId: p.gym, attempts: p.attempts + 1, sessions: p.sessions, src: p.src, notes: 'Finally sent!' });
    OFC.setStore(s => ({ ...s, projects: s.projects.filter(x => x.id !== id) }));
    window.UC.toast(`✓ ${p.grade} SENT — POSTED`, { accent: true });
    window.UC.navigate('feed');
  };
  const addAttempt = (id) => {
    OFC.setStore(s => ({ ...s, projects: s.projects.map(p => p.id === id ? { ...p, attempts: p.attempts + 1, lastTry: 'NOW' } : p) }));
    window.UC.toast('+1 ATTEMPT LOGGED');
  };
  return (
    <HFPhone>
      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, bottom: 80, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
        <HFScreenHeader title="PROJECTS" onBack={() => window.UC.navigate('me')}
          right={<button onClick={() => window.UC.navigate('composer')} style={{ fontFamily: HF.mono, fontSize: 9, fontWeight: 800, letterSpacing: 1.2, color: '#fff', background: HF.accent, border: 'none', padding: '7px 9px', cursor: 'pointer', textTransform: 'uppercase' }}>+ NEW</button>}
        />
        {projects.length === 0 && <HFEmptyState label="NO ACTIVE PROJECTS" sub="Send something hard, log it as a project." />}
        {projects.map(p => {
          const gym = OFC.gymById(p.gym);
          return (
            <div key={p.id} style={{ margin: '0 14px 14px', border: `1px solid ${HF.ruleSft}`, background: HF.card, overflow: 'hidden' }}>
              <Photo src={p.src} height={140} dim={0.25}>
                <div style={{ position: 'absolute', top: 10, left: 10, background: HF.accent, color: '#fff', fontFamily: HF.mono, fontSize: 10, fontWeight: 800, padding: '4px 9px', letterSpacing: 1.2, textTransform: 'uppercase' }}>{p.status}</div>
                <div style={{ position: 'absolute', bottom: 10, left: 12, color: '#fff' }}>
                  <div style={{ fontFamily: HF.display, fontSize: 22, letterSpacing: -0.4, textTransform: 'uppercase' }}>{p.name}</div>
                  <div style={{ fontFamily: HF.mono, fontSize: 10, letterSpacing: 1, fontWeight: 700, marginTop: 2, textTransform: 'uppercase' }}>{p.grade} · {gym ? gym.name : '—'}</div>
                </div>
              </Photo>
              <div style={{ padding: 12, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                {[['ATT', p.attempts], ['SESH', p.sessions], ['LAST', p.lastTry], ['HIGH', p.closest]].map(([k, v]) => (
                  <div key={k} style={{ padding: 8, border: `1px solid ${HF.ruleSft}`, background: HF.paper2 }}>
                    <div style={{ fontFamily: HF.mono, fontSize: 8, letterSpacing: 1.5, color: HF.ink3, fontWeight: 800, textTransform: 'uppercase' }}>{k}</div>
                    <div style={{ fontFamily: HF.display, fontSize: 14, marginTop: 2, textTransform: 'uppercase' }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '0 12px 12px', display: 'flex', gap: 6 }}>
                <button onClick={() => addAttempt(p.id)} style={{ flex: 1, padding: '8px 0', fontFamily: HF.mono, fontSize: 10, fontWeight: 800, letterSpacing: 1.2, background: 'transparent', color: HF.ink, border: `1.5px solid ${HF.rule}`, cursor: 'pointer', textTransform: 'uppercase' }}>+ ATTEMPT</button>
                <button onClick={() => sendIt(p.id)} style={{ flex: 1, padding: '8px 0', fontFamily: HF.mono, fontSize: 10, fontWeight: 800, letterSpacing: 1.2, background: HF.accent, color: '#fff', border: 'none', cursor: 'pointer', boxShadow: `2px 2px 0 ${HF.rule}`, textTransform: 'uppercase' }}>✓ SENT IT</button>
              </div>
            </div>
          );
        })}
      </div>
      <HFTabBar active="me" />
    </HFPhone>
  );
}

// ─── Training Plan ──────────────────────────────────────────
function HFTrainingScreen() {
  const days = OFC.useStoreSlice(s => s.trainingDays);
  const toggle = (idx) => OFC.setStore(s => ({ ...s, trainingDays: s.trainingDays.map((d, i) => i === idx ? { ...d, done: !d.done } : d) }));
  const doneCount = days.filter(d => d.done).length;
  return (
    <HFPhone>
      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, bottom: 80, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
        <HFScreenHeader title="TRAINING" onBack={() => window.UC.navigate('me')} />
        <div style={{ margin: '0 14px 14px', padding: 14, border: `1px solid ${HF.rule}`, background: HF.card }}>
          <div style={{ fontFamily: HF.mono, fontSize: 9, letterSpacing: 1.5, color: HF.ink3, fontWeight: 800, textTransform: 'uppercase' }}>THIS WEEK</div>
          <div style={{ fontFamily: HF.display, fontSize: 26, marginTop: 4, letterSpacing: -0.5, textTransform: 'uppercase' }}>{doneCount} / {days.length} DONE</div>
          <div style={{ height: 8, background: HF.paper2, border: `1px solid ${HF.ruleSft}`, marginTop: 10, overflow: 'hidden' }}>
            <div style={{ width: `${(doneCount / days.length) * 100}%`, height: '100%', background: HF.accent, transition: 'width 200ms' }} />
          </div>
        </div>
        {days.map((d, i) => (
          <div key={i} style={{ margin: '0 14px 8px', border: `1.5px solid ${d.done ? HF.accent : HF.ruleSft}`, background: d.done ? HF.card : HF.paper2, padding: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button onClick={() => toggle(i)} style={{
                width: 28, height: 28, border: `1.5px solid ${d.done ? HF.accent : HF.rule}`,
                background: d.done ? HF.accent : 'transparent', color: '#fff',
                fontFamily: HF.mono, fontSize: 14, fontWeight: 800,
                cursor: 'pointer',
              }}>{d.done ? '✓' : ''}</button>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontFamily: HF.display, fontSize: 14, letterSpacing: -0.2, textTransform: 'uppercase' }}>{d.day}</span>
                  <span style={{ fontFamily: HF.mono, fontSize: 10, color: HF.accent, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase' }}>{d.focus}</span>
                </div>
                <div style={{ fontSize: 12, color: HF.ink2, marginTop: 2 }}>{d.exercises.join(' · ')}</div>
              </div>
            </div>
          </div>
        ))}
        <div style={{ padding: '14px 14px 24px' }}>
          <HFRowBtn label="EDIT TEMPLATE" sub="Adjust focus, add exercises" onClick={() => window.UC.toast('TEMPLATE EDITOR · COMING IN V4')} />
        </div>
      </div>
      <HFTabBar active="me" />
    </HFPhone>
  );
}

// ─── Gear Locker ────────────────────────────────────────────
function HFGearScreen() {
  const gear = OFC.useStoreSlice(s => s.gear);
  return (
    <HFPhone>
      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, bottom: 80, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
        <HFScreenHeader title="GEAR" onBack={() => window.UC.navigate('me')}
          right={<button onClick={() => window.UC.toast('+ GEAR · COMING IN V4')} style={{ fontFamily: HF.mono, fontSize: 9, fontWeight: 800, letterSpacing: 1.2, color: '#fff', background: HF.accent, border: 'none', padding: '7px 9px', cursor: 'pointer', textTransform: 'uppercase' }}>+ ADD</button>}
        />
        {gear.map(g => (
          <div key={g.id} style={{ margin: '0 14px 12px', border: `1px solid ${HF.ruleSft}`, background: HF.card, overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap: 12, padding: 12 }}>
              <Photo src={g.src} style={{ width: 64, height: 64, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 6 }}>
                  <div style={{ fontFamily: HF.display, fontSize: 14, letterSpacing: -0.2, textTransform: 'uppercase' }}>{g.name}</div>
                  <span style={{ fontFamily: HF.mono, fontSize: 9, color: g.status === 'ACTIVE' ? HF.accent : HF.ink3, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase' }}>{g.status}</span>
                </div>
                <div style={{ fontFamily: HF.mono, fontSize: 10, color: HF.ink3, letterSpacing: 0.5, fontWeight: 700, marginTop: 4, textTransform: 'uppercase' }}>{g.kind} · BOUGHT {g.bought} · {g.sends} SENDS</div>
                <div style={{ marginTop: 8, height: 8, background: HF.paper2, border: `1px solid ${HF.ruleSft}` }}>
                  <div style={{ width: `${g.pct}%`, height: '100%', background: g.pct > 80 ? HF.blood : HF.accent }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontFamily: HF.mono, fontSize: 9, color: HF.ink3, letterSpacing: 1, fontWeight: 700, textTransform: 'uppercase' }}>
                  <span>{g.pct}% USED</span>
                  <span>{g.pct > 80 ? 'REPLACE SOON' : 'OK'}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div style={{ padding: '0 14px 24px' }}>
          <HFRowBtn label="GEAR ANALYTICS" sub="Lifetime sends, replacement reminders" onClick={() => window.UC.toast('ANALYTICS · V4')} />
        </div>
      </div>
      <HFTabBar active="me" />
    </HFPhone>
  );
}

// ─── Achievements ───────────────────────────────────────────
function HFAchievementsScreen() {
  const achievements = OFC.useStoreSlice(s => s.achievements);
  const earned = achievements.filter(a => a.earned);
  const locked = achievements.filter(a => !a.earned);
  return (
    <HFPhone>
      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, bottom: 80, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
        <HFScreenHeader title="ACHIEVEMENTS" onBack={() => window.UC.navigate('me')} />
        <div style={{ margin: '0 14px 14px', padding: 14, border: `1px solid ${HF.rule}`, background: HF.card, display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: HF.mono, fontSize: 9, letterSpacing: 1.5, color: HF.ink3, fontWeight: 800, textTransform: 'uppercase' }}>EARNED</div>
            <div style={{ fontFamily: HF.display, fontSize: 32, lineHeight: 1, marginTop: 4 }}>{earned.length}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: HF.mono, fontSize: 9, letterSpacing: 1.5, color: HF.ink3, fontWeight: 800, textTransform: 'uppercase' }}>OF</div>
            <div style={{ fontFamily: HF.display, fontSize: 32, lineHeight: 1, marginTop: 4, color: HF.ink3 }}>{achievements.length}</div>
          </div>
        </div>
        <Section label="EARNED" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, padding: '4px 14px 10px' }}>
          {earned.map(a => (
            <div key={a.id} style={{ padding: 14, border: `1.5px solid ${HF.accent}`, background: HF.card, textAlign: 'center' }}>
              <div style={{ fontSize: 28, color: HF.accent, fontFamily: HF.display }}>{a.icon}</div>
              <div style={{ fontFamily: HF.display, fontSize: 13, marginTop: 6, letterSpacing: -0.2, textTransform: 'uppercase' }}>{a.name}</div>
              <div style={{ fontFamily: HF.mono, fontSize: 9, color: HF.ink3, letterSpacing: 1, marginTop: 4, fontWeight: 700, textTransform: 'uppercase' }}>{a.sub}</div>
              {a.date && <div style={{ fontFamily: HF.mono, fontSize: 8, color: HF.accent, letterSpacing: 1.2, marginTop: 4, fontWeight: 800 }}>{a.date}</div>}
            </div>
          ))}
        </div>
        <Section label="LOCKED" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, padding: '4px 14px 24px' }}>
          {locked.map(a => (
            <div key={a.id} style={{ padding: 14, border: `1.5px dashed ${HF.ruleSft}`, background: HF.paper2, textAlign: 'center', opacity: 0.55 }}>
              <div style={{ fontSize: 28, fontFamily: HF.display, color: HF.ink3 }}>{a.icon}</div>
              <div style={{ fontFamily: HF.display, fontSize: 13, marginTop: 6, letterSpacing: -0.2, textTransform: 'uppercase' }}>{a.name}</div>
              <div style={{ fontFamily: HF.mono, fontSize: 9, color: HF.ink3, letterSpacing: 1, marginTop: 4, fontWeight: 700, textTransform: 'uppercase' }}>{a.sub}</div>
            </div>
          ))}
        </div>
      </div>
      <HFTabBar active="me" />
    </HFPhone>
  );
}

// ─── Leaderboard ────────────────────────────────────────────
function HFLeaderboardScreen() {
  const board = OFC.useStoreSlice(s => s.leaderboard);
  const [tab, setTab] = React.useState('CREW');
  return (
    <HFPhone>
      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, bottom: 80, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
        <HFScreenHeader title="LEADERBOARD" onBack={() => window.UC.navigate('me')} />
        <div style={{ display: 'flex', margin: '0 14px 14px', border: `1px solid ${HF.rule}` }}>
          {['CREW', 'GLOBAL', 'GYM'].map((t, i, a) => (
            <div key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: '8px 0', textAlign: 'center', fontFamily: HF.mono, fontSize: 11, letterSpacing: 1, fontWeight: 700,
              background: tab === t ? HF.ink : 'transparent', color: tab === t ? '#fff' : HF.ink,
              borderRight: i < a.length - 1 ? `1px solid ${HF.rule}` : 'none', cursor: 'pointer',
            }}>{t}</div>
          ))}
        </div>
        <div style={{ padding: '0 14px' }}>
          {board.map(row => {
            const u = OFC.userById(row.id) || { name: row.id, avatar: HF_IMG.you };
            const isMe = row.id === 'you';
            return (
              <div key={row.id} onClick={() => row.id !== 'you' && window.UC.openProfile(row.id)} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: 12,
                background: isMe ? HF.accent + '22' : HF.card,
                border: `1px solid ${isMe ? HF.accent : HF.ruleSft}`,
                marginBottom: 6, cursor: 'pointer',
              }}>
                <div style={{ width: 28, textAlign: 'center', fontFamily: HF.display, fontSize: 18, color: row.rank <= 3 ? HF.accent : HF.ink3 }}>{row.rank}</div>
                <HFAvatar size={36} src={u.avatar} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: HF.ink }}>{u.name} {isMe && <span style={{ color: HF.accent, fontFamily: HF.mono, fontSize: 9, letterSpacing: 1, fontWeight: 800 }}>· YOU</span>}</div>
                  <div style={{ fontFamily: HF.mono, fontSize: 10, color: HF.ink3, letterSpacing: 0.5, fontWeight: 700, textTransform: 'uppercase' }}>{row.peak} PEAK · {row.delta} THIS WEEK</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: HF.display, fontSize: 16 }}>{row.points}</div>
                  <div style={{ fontFamily: HF.mono, fontSize: 8, color: HF.ink3, letterSpacing: 1.2, fontWeight: 800, textTransform: 'uppercase' }}>PTS</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <HFTabBar active="me" />
    </HFPhone>
  );
}

// ─── Weekly Recap ───────────────────────────────────────────
function HFRecapScreen() {
  const r = OFC.useStoreSlice(s => s.recap);
  const total = Object.values(r.style).reduce((a, b) => a + b, 0);
  return (
    <HFPhone>
      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, bottom: 80, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
        <HFScreenHeader title="WEEKLY RECAP" onBack={() => window.UC.navigate('me')} />
        <div style={{ padding: '0 14px' }}>
          <div style={{ background: HF.ink, color: '#fff', padding: 16, marginBottom: 12 }}>
            <div style={{ fontFamily: HF.mono, fontSize: 9, letterSpacing: 1.5, color: HF.accent, fontWeight: 800, textTransform: 'uppercase' }}>{r.week}</div>
            <div style={{ fontFamily: HF.display, fontSize: 32, marginTop: 6, letterSpacing: -0.8, textTransform: 'uppercase' }}>{r.sends} SENDS</div>
            <div style={{ fontFamily: HF.mono, fontSize: 11, letterSpacing: 1, color: 'rgba(255,255,255,0.65)', fontWeight: 700, marginTop: 4 }}>{r.sessions} SESSIONS · {r.minutes} MIN ON THE WALL</div>
          </div>
          <div style={{ background: HF.card, border: `1px solid ${HF.ruleSft}`, padding: 14, marginBottom: 12 }}>
            <div style={{ fontFamily: HF.mono, fontSize: 9, letterSpacing: 1.5, color: HF.ink3, fontWeight: 800, textTransform: 'uppercase' }}>PYRAMID</div>
            {r.pyramid.map(p => (
              <div key={p.g} style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                <span style={{ fontFamily: HF.mono, fontSize: 11, fontWeight: 800, width: 24 }}>{p.g}</span>
                <div style={{ flex: 1, height: 14, background: HF.paper2, border: `1px solid ${HF.ruleSft}` }}>
                  <div style={{ width: `${(p.sent / 4) * 100}%`, height: '100%', background: HF.ink }} />
                </div>
                <span style={{ fontFamily: HF.mono, fontSize: 11, fontWeight: 800, width: 24, textAlign: 'right' }}>{p.sent}</span>
              </div>
            ))}
          </div>
          <div style={{ background: HF.card, border: `1px solid ${HF.ruleSft}`, padding: 14, marginBottom: 12 }}>
            <div style={{ fontFamily: HF.mono, fontSize: 9, letterSpacing: 1.5, color: HF.ink3, fontWeight: 800, textTransform: 'uppercase' }}>STYLE BREAKDOWN</div>
            <div style={{ display: 'flex', height: 16, marginTop: 10, border: `1px solid ${HF.ruleSft}` }}>
              {Object.entries(r.style).map(([k, v]) => (
                <div key={k} style={{ width: `${(v / total) * 100}%`, background: { SLAB: HF.accent, STATIC: HF.ink, DYNO: HF.amber, OVERHANG: HF.moss }[k] || HF.ink2 }} />
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 8 }}>
              {Object.entries(r.style).map(([k, v]) => (
                <span key={k} style={{ fontFamily: HF.mono, fontSize: 9, color: HF.ink2, letterSpacing: 1, fontWeight: 700 }}>● {k} {v}</span>
              ))}
            </div>
          </div>
          <div style={{ background: HF.accent, color: '#fff', padding: 14, marginBottom: 12, boxShadow: `4px 4px 0 ${HF.rule}` }}>
            <div style={{ fontFamily: HF.mono, fontSize: 9, letterSpacing: 1.5, fontWeight: 800, textTransform: 'uppercase', opacity: 0.85 }}>WEEK PR</div>
            <div style={{ fontFamily: HF.display, fontSize: 18, marginTop: 4, letterSpacing: -0.2 }}>{r.pr}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
            <div style={{ padding: 12, border: `1px solid ${HF.ruleSft}`, background: HF.card }}>
              <div style={{ fontFamily: HF.mono, fontSize: 9, letterSpacing: 1.5, color: HF.ink3, fontWeight: 800, textTransform: 'uppercase' }}>SPOTS</div>
              <div style={{ fontFamily: HF.display, fontSize: 22, marginTop: 4 }}>{r.spotsHit}</div>
            </div>
            <div style={{ padding: 12, border: `1px solid ${HF.ruleSft}`, background: HF.card }}>
              <div style={{ fontFamily: HF.mono, fontSize: 9, letterSpacing: 1.5, color: HF.ink3, fontWeight: 800, textTransform: 'uppercase' }}>CREW SESH</div>
              <div style={{ fontFamily: HF.display, fontSize: 22, marginTop: 4 }}>{r.crewSesh}</div>
            </div>
          </div>
          <button onClick={() => window.UC.navigate('shareC')} style={{ width: '100%', padding: '14px 0', fontFamily: HF.mono, fontSize: 12, fontWeight: 800, letterSpacing: 1.5, background: HF.ink, color: '#fff', border: 'none', cursor: 'pointer', boxShadow: `4px 4px 0 ${HF.accent}`, marginBottom: 24, textTransform: 'uppercase' }}>SHARE RECAP →</button>
        </div>
      </div>
      <HFTabBar active="me" />
    </HFPhone>
  );
}

// ─── Event Detail ───────────────────────────────────────────
function HFEventDetailScreen({ eventId }) {
  const ev = OFC.useStoreSlice(s => s.events.find(e => e.id === eventId));
  if (!ev) return <HFPhone><HFEmptyState label="EVENT NOT FOUND" /></HFPhone>;
  const host = OFC.userById(ev.host);
  const going = ev.goingList.includes('you');
  const onRsvp = () => {
    const next = OFC.rsvpEvent(ev.id);
    window.UC.toast(next ? '✓ YOU\'RE GOING' : 'RSVP CANCELLED', { accent: next });
  };
  return (
    <HFPhone>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 80, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
        <div style={{ position: 'relative' }}>
          <Photo src={ev.src} height={220} dim={0.45} />
          <div style={{ position: 'absolute', top: 54, left: 14, right: 14, display: 'flex', justifyContent: 'space-between' }}>
            <div onClick={() => window.UC.navigate('events')} style={{ cursor: 'pointer' }}>
              <HFIconBtn size={32} dark>{HFIcon.back(14, '#fff')}</HFIconBtn>
            </div>
            <div onClick={() => window.UC.toast('LINK COPIED', { accent: true })} style={{ cursor: 'pointer' }}>
              <HFIconBtn size={32} dark>{HFIcon.share(14, '#fff')}</HFIconBtn>
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14, color: '#fff' }}>
            <HFTag accent style={{ background: HF.accent, color: '#fff', borderColor: HF.accent }}>EVENT · {ev.day} {ev.mo} {ev.date}</HFTag>
            <div style={{ fontFamily: HF.display, fontSize: 28, letterSpacing: -0.8, marginTop: 8, textTransform: 'uppercase' }}>{ev.title}</div>
            <div style={{ fontFamily: HF.mono, fontSize: 11, letterSpacing: 1, fontWeight: 700, marginTop: 4, textTransform: 'uppercase' }}>{ev.time} · {ev.loc}</div>
          </div>
        </div>
        <div style={{ padding: '14px 14px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
          <HFAvatar size={36} src={host && host.avatar} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: HF.ink }}>HOSTED BY {host ? host.name : '—'}</div>
            <div style={{ fontFamily: HF.mono, fontSize: 10, color: HF.ink3, letterSpacing: 0.5, textTransform: 'uppercase' }}>@{host ? host.handle : ''}</div>
          </div>
          <button onClick={() => window.UC.openProfile(ev.host)} style={{ fontFamily: HF.mono, fontSize: 9, fontWeight: 800, letterSpacing: 1.2, color: HF.ink, background: 'transparent', border: `1.5px solid ${HF.rule}`, padding: '6px 10px', cursor: 'pointer', textTransform: 'uppercase' }}>VIEW</button>
        </div>
        <div style={{ padding: '14px 16px 0', fontSize: 14, color: HF.ink, lineHeight: 1.5 }}>{ev.desc}</div>
        <Section label={`GOING · ${ev.going}`} />
        <div style={{ padding: '0 14px 14px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {ev.goingList.map(id => {
            const u = OFC.userById(id);
            if (!u) return null;
            return (
              <div key={id} onClick={() => id !== 'you' && window.UC.openProfile(id)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px 4px 4px', background: HF.card, border: `1px solid ${HF.ruleSft}`, cursor: 'pointer' }}>
                <HFAvatar size={26} src={u.avatar} />
                <span style={{ fontFamily: HF.mono, fontSize: 10, fontWeight: 700, letterSpacing: 0.5 }}>{u.name.split(' ')[0]}</span>
              </div>
            );
          })}
        </div>
        <div style={{ padding: '0 14px 24px', display: 'flex', gap: 8 }}>
          <button onClick={onRsvp} style={{ flex: 2, padding: '14px 0', fontFamily: HF.mono, fontSize: 12, fontWeight: 800, letterSpacing: 1.2, background: going ? HF.ink : HF.accent, color: '#fff', border: 'none', cursor: 'pointer', boxShadow: `3px 3px 0 ${HF.rule}`, textTransform: 'uppercase' }}>{going ? '✓ GOING' : "RSVP · I'M IN"}</button>
          <button onClick={() => window.UC.navigate('thread')} style={{ flex: 1, padding: '14px 0', fontFamily: HF.mono, fontSize: 12, fontWeight: 800, letterSpacing: 1.2, background: 'transparent', color: HF.ink, border: `1.5px solid ${HF.rule}`, cursor: 'pointer', textTransform: 'uppercase' }}>CHAT</button>
        </div>
      </div>
      <HFTabBar active="plan" />
    </HFPhone>
  );
}

// ─── Me Hub ─────────────────────────────────────────────────
function HFMeHubScreen() {
  const me = OFC.useStoreSlice(s => s.me);
  const sends = OFC.useStoreSlice(s => s.sends.filter(x => x.user === 'you'));
  const projects = OFC.useStoreSlice(s => s.projects);
  const achievements = OFC.useStoreSlice(s => s.achievements.filter(a => a.earned));
  const links = [
    { id: 'profile',      label: 'MY PROFILE',     sub: 'Stats · pyramid · sends', },
    { id: 'projects',     label: 'PROJECTS',       sub: `${projects.length} active · log attempts` },
    { id: 'training',     label: 'TRAINING PLAN',  sub: 'This week\'s sessions' },
    { id: 'gear',         label: 'GEAR LOCKER',    sub: 'Shoes · chalk · pads' },
    { id: 'achievements', label: 'ACHIEVEMENTS',   sub: `${achievements.length} earned` },
    { id: 'leaderboard',  label: 'LEADERBOARD',    sub: 'Crew + global rankings' },
    { id: 'recap',        label: 'WEEKLY RECAP',   sub: 'Last 7 days at a glance' },
    { id: 'settings',     label: 'SETTINGS',       sub: 'Privacy · notifications · account' },
  ];
  return (
    <HFPhone>
      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, bottom: 80, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
        <div style={{ padding: '8px 16px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <HFAvatar size={56} src={me.avatar} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: HF.display, fontSize: 22, letterSpacing: -0.4, lineHeight: 1, textTransform: 'uppercase' }}>{me.name}</div>
            <div style={{ fontFamily: HF.mono, fontSize: 10, color: HF.ink3, letterSpacing: 1, marginTop: 4, fontWeight: 700, textTransform: 'uppercase' }}>@{me.handle} · {me.city} · {me.peak} PEAK</div>
          </div>
          <button onClick={() => window.UC.navigate('editProfile')} style={{ fontFamily: HF.mono, fontSize: 9, fontWeight: 800, letterSpacing: 1.2, color: HF.accent, background: 'transparent', border: `1.5px solid ${HF.accent}`, padding: '6px 9px', cursor: 'pointer', textTransform: 'uppercase' }}>EDIT</button>
        </div>
        <div style={{ margin: '0 14px 14px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: `1px solid ${HF.rule}`, background: HF.card }}>
          {[['SENDS', sends.length], ['PROJ', projects.length], ['BADGES', achievements.length], ['CREW', 38]].map(([k, v], i, a) => (
            <div key={k} style={{ padding: 10, textAlign: 'center', borderRight: i < a.length - 1 ? `1px solid ${HF.ruleSft}` : 'none' }}>
              <div style={{ fontFamily: HF.display, fontSize: 18 }}>{v}</div>
              <div style={{ fontFamily: HF.mono, fontSize: 8, color: HF.ink3, letterSpacing: 1.5, fontWeight: 800, textTransform: 'uppercase', marginTop: 4 }}>{k}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '0 14px' }}>
          {links.map(l => (
            <div key={l.id} onClick={() => window.UC.navigate(l.id)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 12px', border: `1px solid ${HF.ruleSft}`, background: HF.card, marginBottom: 6, cursor: 'pointer' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: HF.display, fontSize: 14, letterSpacing: -0.2, textTransform: 'uppercase' }}>{l.label}</div>
                <div style={{ fontFamily: HF.mono, fontSize: 10, color: HF.ink3, letterSpacing: 0.5, marginTop: 3, fontWeight: 700, textTransform: 'uppercase' }}>{l.sub}</div>
              </div>
              <span style={{ fontFamily: HF.mono, fontSize: 14, color: HF.accent, fontWeight: 800 }}>→</span>
            </div>
          ))}
        </div>
      </div>
      <HFTabBar active="me" />
    </HFPhone>
  );
}

Object.assign(window, {
  HFSearchScreen, HFFriendProfileScreen, HFSettingsScreen, HFEditProfileScreen,
  HFGymDetailScreen, HFProjectsScreen, HFTrainingScreen, HFGearScreen,
  HFAchievementsScreen, HFLeaderboardScreen, HFRecapScreen,
  HFEventDetailScreen, HFMeHubScreen,
});
