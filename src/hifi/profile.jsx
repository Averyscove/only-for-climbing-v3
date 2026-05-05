// hifi-profile.jsx — V3: store-driven own-profile.

function HFProfileScreen() {
  const me = OFC.useStoreSlice(s => s.me);
  const sends = OFC.useStoreSlice(s => s.sends.filter(x => x.user === 'you'));
  const projects = OFC.useStoreSlice(s => s.projects);
  const gyms = OFC.useStoreSlice(s => s.gyms);
  const visited = gyms.slice(0, 5);
  const [tab, setTab] = React.useState('SENDS');
  const pyramid = [
    { g: 'V8', sent: 0, project: projects.filter(p => p.grade === 'V8').length },
    { g: 'V7', sent: sends.filter(s => s.grade === 'V7').length, project: projects.filter(p => p.grade === 'V7').length },
    { g: 'V6', sent: sends.filter(s => s.grade === 'V6').length || 1, project: projects.filter(p => p.grade === 'V6').length },
    { g: 'V5', sent: sends.filter(s => s.grade === 'V5').length || 4, project: projects.filter(p => p.grade === 'V5').length },
    { g: 'V4', sent: sends.filter(s => s.grade === 'V4').length || 9, project: 0 },
    { g: 'V3', sent: sends.filter(s => s.grade === 'V3').length || 16, project: 0 },
  ];
  const max = Math.max(...pyramid.map(p => p.sent + p.project), 1);
  const media = sends.length ? sends.map(s => s.src) : [HF_IMG.send1, HF_IMG.send2, HF_IMG.gym1, HF_IMG.gym2, HF_IMG.shoes, HF_IMG.hands];

  return (
    <HFPhone>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 80, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
        <div style={{ position: 'relative' }}>
          <Photo src={HF_IMG.outdoor1} height={140} dim={0.35} />
          <div style={{ position: 'absolute', top: 54, left: 14, right: 14, display: 'flex', justifyContent: 'space-between' }}>
            <div onClick={() => window.UC.navigate('me')} style={{ cursor: 'pointer' }}>
              <HFIconBtn size={32} dark>{HFIcon.back(14, '#fff')}</HFIconBtn>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div onClick={() => window.UC.navigate('shareC')} style={{ cursor: 'pointer' }}>
                <HFIconBtn size={32} dark>{HFIcon.share(14, '#fff')}</HFIconBtn>
              </div>
              <div onClick={() => window.UC.navigate('settings')} style={{ cursor: 'pointer' }}>
                <HFIconBtn size={32} dark>{HFIcon.more(14, '#fff')}</HFIconBtn>
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding: '0 16px', marginTop: -36, position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
            <div style={{ borderRadius: '50%', padding: 3, background: HF.paper }}>
              <HFAvatar src={me.avatar} size={84} />
            </div>
            <div style={{ flex: 1, paddingBottom: 6 }}>
              <div style={{ fontFamily: HF.display, fontSize: 22, letterSpacing: -0.5, lineHeight: 1, textTransform: 'uppercase' }}>{me.name}</div>
              <div style={{ fontFamily: HF.mono, fontSize: 10, color: HF.ink3, letterSpacing: 1, marginTop: 4, textTransform: 'uppercase' }}>@{me.handle} · {me.city}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            <HFTag>{me.peak} PEAK</HFTag>
            <HFTag accent>YOU</HFTag>
            <HFTag>SINCE {me.since}</HFTag>
          </div>
          <div style={{ fontSize: 13, color: HF.ink2, lineHeight: 1.45, marginTop: 10 }}>{me.bio}</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button onClick={() => window.UC.navigate('editProfile')} style={{
              flex: 1, padding: '10px 0', fontFamily: HF.mono, fontSize: 11, fontWeight: 800, letterSpacing: 1.2,
              background: HF.accent, color: '#fff', border: 'none', cursor: 'pointer', textTransform: 'uppercase',
              boxShadow: `2px 2px 0 ${HF.rule}`,
            }}>EDIT PROFILE</button>
            <button onClick={() => window.UC.navigate('shareC')} style={{
              flex: 1, padding: '10px 0', fontFamily: HF.mono, fontSize: 11, fontWeight: 800, letterSpacing: 1.2,
              background: 'transparent', color: HF.ink, border: `1.5px solid ${HF.rule}`, cursor: 'pointer', textTransform: 'uppercase',
            }}>SHARE</button>
          </div>
        </div>
        <div style={{ margin: '14px 16px 12px', border: `1px solid ${HF.rule}`, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', background: HF.card }}>
          {[['SENDS', sends.length || 212], ['SESH', '64'], ['SPOTS', visited.length], ['CREW', '38']].map(([k, v], i) => (
            <div key={k} onClick={() => k === 'SPOTS' && window.UC.navigate('map')} style={{ padding: '10px 4px', textAlign: 'center', borderRight: i < 3 ? `1px solid ${HF.ruleSft}` : 'none', background: i === 0 ? HF.paper2 : 'transparent', cursor: k === 'SPOTS' ? 'pointer' : 'default' }}>
              <div style={{ fontFamily: HF.display, fontSize: 20, lineHeight: 1 }}>{v}</div>
              <div style={{ fontFamily: HF.mono, fontSize: 9, letterSpacing: 1.5, color: HF.ink3, textTransform: 'uppercase', marginTop: 4 }}>{k}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '0 16px', display: 'flex', gap: 14, borderBottom: `1px solid ${HF.ruleSft}` }}>
          {['SENDS', 'PYRAMID', 'SPOTS', 'MEDIA'].map((t) => {
            const active = tab === t;
            return (
              <div key={t} onClick={() => setTab(t)} style={{
                padding: '8px 0', fontFamily: HF.mono, fontSize: 11, letterSpacing: 1, fontWeight: active ? 800 : 600,
                color: active ? HF.ink : HF.ink3,
                borderBottom: active ? `2.5px solid ${HF.accent}` : 'none', marginBottom: -1, cursor: 'pointer',
              }}>{t}</div>
            );
          })}
        </div>
        {tab === 'SENDS' && (
          <div style={{ padding: '12px 16px 0' }}>
            <div style={{ fontFamily: HF.mono, fontSize: 10, letterSpacing: 1.5, color: HF.ink3, textTransform: 'uppercase', marginBottom: 8 }}>RECENT</div>
            {sends.length === 0 && <div style={{ fontFamily: HF.mono, fontSize: 11, color: HF.ink3, padding: 14, textAlign: 'center', letterSpacing: 1, fontWeight: 700 }}>NO SENDS YET — TAP THE + TO LOG ONE</div>}
            {sends.map((s, i) => {
              const gym = OFC.gymById(s.gym);
              return (
                <div key={s.id} onClick={() => window.UC.navigate(s.hero ? 'shareB' : 'shareA')} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: i < sends.length - 1 ? `1px solid ${HF.ruleSft}` : 'none', cursor: 'pointer' }}>
                  <Photo src={s.src} height={48} style={{ width: 48, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: HF.ink }}>{s.name}</div>
                    <div style={{ fontFamily: HF.mono, fontSize: 10, color: HF.ink3, letterSpacing: 0.5, textTransform: 'uppercase' }}>{gym ? gym.name : '—'} · {s.when}</div>
                  </div>
                  <HFGrade grade={s.grade} sent />
                </div>
              );
            })}
          </div>
        )}
        {tab === 'PYRAMID' && (
          <div style={{ padding: '12px 16px 4px' }}>
            <div style={{ fontFamily: HF.mono, fontSize: 10, letterSpacing: 1.5, color: HF.ink3, textTransform: 'uppercase', marginBottom: 8 }}>30-DAY · ▮ SENT  ▮ PROJECT</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {pyramid.map(p => (
                <div key={p.g} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: HF.mono, fontSize: 11, fontWeight: 800, width: 24 }}>{p.g}</span>
                  <div style={{ flex: 1, height: 14, background: HF.paper2, border: `1px solid ${HF.ruleSft}`, display: 'flex' }}>
                    <div style={{ width: `${(p.sent / max) * 100}%`, background: HF.ink }} />
                    <div style={{ width: `${(p.project / max) * 100}%`, background: HF.amber }} />
                  </div>
                  <span style={{ fontFamily: HF.mono, fontSize: 10, color: HF.ink3, width: 38, textAlign: 'right' }}>{p.sent}·{p.project}P</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === 'SPOTS' && (
          <div style={{ padding: '12px 16px 0' }}>
            {visited.map((g, i) => (
              <div key={g.id} onClick={() => window.UC.openGym(g.id)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < visited.length - 1 ? `1px solid ${HF.ruleSft}` : 'none', cursor: 'pointer' }}>
                <Photo src={g.src} height={48} style={{ width: 48, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: HF.display, fontSize: 14, letterSpacing: -0.2, textTransform: 'uppercase' }}>{g.name}</div>
                  <div style={{ fontFamily: HF.mono, fontSize: 10, color: HF.ink3, letterSpacing: 0.5, textTransform: 'uppercase' }}>{g.city}</div>
                </div>
                <span style={{ fontFamily: HF.mono, fontSize: 14, color: HF.accent, fontWeight: 800 }}>→</span>
              </div>
            ))}
          </div>
        )}
        {tab === 'MEDIA' && (
          <div style={{ padding: '12px 14px 0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
            {media.map((m, i) => (
              <div key={i} onClick={() => window.UC.navigate('story')} style={{ position: 'relative', cursor: 'pointer' }}>
                <Photo src={m} ar="1" />
              </div>
            ))}
          </div>
        )}
      </div>
      <HFTabBar active="me" />
    </HFPhone>
  );
}

Object.assign(window, { HFProfileScreen });
