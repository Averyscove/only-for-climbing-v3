// hifi-events.jsx — V3: store-driven Discover / Plan / Map.

function HFEventsScreen() {
  const [tab, setTab] = React.useState('EVENTS');
  const [filters, setFilters] = React.useState(['NEAR ME']);
  const allEvts = OFC.useStoreSlice(s => s.events);
  const gyms = OFC.useStoreSlice(s => s.gyms);
  const evts = allEvts.filter(e => filters.length === 0 || filters.every(f => e.tags.includes(f)));
  const toggleFilter = (f) => setFilters(arr => arr.includes(f) ? arr.filter(x => x !== f) : [...arr, f]);
  return (
    <HFPhone>
      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, bottom: 80, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
        <div style={{ padding: '8px 16px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: HF.display, fontSize: 28, letterSpacing: -0.8, lineHeight: 1, textTransform: 'uppercase' }}>DISCOVER</div>
          <div onClick={() => window.UC.navigate('plan')} style={{ cursor: 'pointer' }}>
            <HFIconBtn size={32} accent>{HFIcon.plus(15, '#fff')}</HFIconBtn>
          </div>
        </div>
        <div style={{ margin: '0 16px 12px', display: 'flex', border: `1px solid ${HF.rule}` }}>
          {['EVENTS', 'MAP', 'GYMS'].map((t, i, arr) => {
            const active = tab === t;
            return (
              <div key={t}
                   onClick={() => { if (t === 'MAP') window.UC.navigate('map'); else setTab(t); }}
                   style={{ flex: 1, padding: '8px 0', textAlign: 'center', fontFamily: HF.mono, fontSize: 11, letterSpacing: 1, fontWeight: 700, background: active ? HF.ink : 'transparent', color: active ? '#fff' : HF.ink, borderRight: i < arr.length - 1 ? `1px solid ${HF.rule}` : 'none', cursor: 'pointer' }}>{t}</div>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: 6, padding: '0 16px 12px', overflowX: 'auto', flexWrap: 'wrap' }}>
          {['NEAR ME', 'THIS WEEK', 'OUTDOOR', 'BEGINNER'].map((t) => {
            const on = filters.includes(t);
            return (
              <button key={t} onClick={() => toggleFilter(t)} style={{
                fontFamily: HF.mono, fontSize: 10, fontWeight: 700, padding: '5px 10px', borderRadius: 999, letterSpacing: 1,
                background: on ? HF.ink : 'transparent', color: on ? '#fff' : HF.ink,
                border: `1px solid ${HF.rule}`, cursor: 'pointer',
              }}>{t}</button>
            );
          })}
        </div>
        {tab === 'EVENTS' && (
          <div style={{ padding: '0 12px' }}>
            {evts.length === 0 && <div style={{ padding: 30, textAlign: 'center', fontFamily: HF.mono, fontSize: 11, color: HF.ink3, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 700 }}>NO EVENTS MATCH · CLEAR FILTERS</div>}
            {evts.map(e => {
              const going = e.goingList.includes('you');
              return (
                <div key={e.id} onClick={() => window.UC.openEvent(e.id)} style={{ display: 'flex', gap: 12, padding: 4, marginBottom: 14, background: HF.card, border: `1px solid ${HF.ruleSft}`, borderRadius: 3, overflow: 'hidden', cursor: 'pointer' }}>
                  <Photo src={e.src} style={{ width: 88, flexShrink: 0 }} dim={0.25}>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: HF.mono }}>
                      <span style={{ fontSize: 9, letterSpacing: 1.5, fontWeight: 700 }}>{e.day}</span>
                      <span style={{ fontFamily: HF.display, fontSize: 26, letterSpacing: -0.5, lineHeight: 1, marginTop: 2 }}>{e.date}</span>
                      <span style={{ fontSize: 9, letterSpacing: 1.5, fontWeight: 700, marginTop: 2 }}>{e.mo}</span>
                    </div>
                  </Photo>
                  <div style={{ flex: 1, minWidth: 0, padding: '10px 12px 10px 0' }}>
                    <div style={{ fontFamily: HF.display, fontSize: 14, lineHeight: 1.1, letterSpacing: -0.2, textTransform: 'uppercase' }}>{e.title}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6, fontFamily: HF.mono, fontSize: 9, color: HF.ink3, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                      {HFIcon.pin(10, HF.ink3)} {e.loc}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2, fontFamily: HF.mono, fontSize: 9, color: HF.ink3, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                      {HFIcon.cal(10, HF.ink3)} {e.time}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                      <HFAvatar size={20} src={OFC.avatarOf(e.host)} />
                      <span style={{ fontFamily: HF.mono, fontSize: 10, color: HF.ink2, letterSpacing: 0.5, fontWeight: 700 }}>{e.going} GOING</span>
                      <div style={{ flex: 1 }} />
                      <button onClick={(ev) => { ev.stopPropagation(); const next = OFC.rsvpEvent(e.id); window.UC.toast(next ? '✓ RSVP CONFIRMED' : 'RSVP CANCELLED', { accent: next }); }} style={{
                        fontFamily: HF.mono, fontSize: 9, fontWeight: 800, letterSpacing: 1, padding: '4px 8px',
                        background: going ? HF.ink : 'transparent', color: going ? '#fff' : HF.ink,
                        border: `1.5px solid ${HF.rule}`, cursor: 'pointer', textTransform: 'uppercase',
                      }}>{going ? '✓ GOING' : 'RSVP'}</button>
                      {e.accent && <span style={{ fontFamily: HF.mono, fontSize: 9, color: HF.accent, fontWeight: 800, letterSpacing: 1 }}>● LIVE</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {tab === 'GYMS' && (
          <div style={{ padding: '0 12px 12px' }}>
            {gyms.map((g) => (
              <div key={g.id} onClick={() => window.UC.openGym(g.id)} style={{ display: 'flex', gap: 10, padding: 8, border: `1px solid ${HF.ruleSft}`, background: HF.card, marginBottom: 10, cursor: 'pointer' }}>
                <Photo src={g.src} style={{ width: 64, height: 64, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: HF.display, fontSize: 15, letterSpacing: -0.2, textTransform: 'uppercase' }}>{g.name}</div>
                  <div style={{ fontFamily: HF.mono, fontSize: 9, color: HF.ink3, letterSpacing: 1, fontWeight: 700, textTransform: 'uppercase', marginTop: 4 }}>{g.city} · {g.dist} · {g.open}</div>
                  <div style={{ marginTop: 6 }}>
                    <span style={{ fontFamily: HF.mono, fontSize: 10, color: g.friends ? HF.accent : HF.ink3, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase' }}>{g.friends ? `● ${g.friends} FRIENDS HERE` : '—'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <HFTabBar active="plan" />
    </HFPhone>
  );
}

function HFPlanScreen() {
  const grades = ['V0','V1','V2','V3','V4','V5','V6','V7','V8','V9','V10'];
  const gyms = OFC.useStoreSlice(s => s.gyms);
  const [low, setLow] = React.useState(2);
  const [high, setHigh] = React.useState(7);
  const [audience, setAudience] = React.useState('PUBLIC');
  const [title, setTitle] = React.useState('Sunday Slab Society');
  const [gymId, setGymId] = React.useState('CR');
  const [date, setDate] = React.useState('Sunday, May 4');
  const [time, setTime] = React.useState('10:00 AM — 1:00 PM');
  const [note, setNote] = React.useState('Slab focus. Bring tape. Pizza after at Tony\'s.');
  const post = () => {
    const id = 'e' + Date.now();
    OFC.setStore(s => ({
      ...s,
      events: [{
        id, day: date.slice(0, 3).toUpperCase(), date: '04', mo: 'MAY',
        title: title.toUpperCase(), loc: (gyms.find(g => g.id === gymId) || {}).name + ' · ' + (gyms.find(g => g.id === gymId) || {}).city,
        time, going: 1, host: 'you', src: HF_IMG.send3,
        desc: note, tags: ['NEAR ME','THIS WEEK'], gymId, goingList: ['you'],
      }, ...s.events],
      posts: [{ id: 'post-' + id, kind: 'event', eventId: id }, ...s.posts],
    }));
    window.UC.toast('✓ CLIMB POSTED', { accent: true });
    window.UC.navigate('feed');
  };
  const tapGrade = (i) => {
    if (i < low) setLow(i);
    else if (i > high) setHigh(i);
    else if (i === low && i !== high) setLow(low + 1);
    else if (i === high && i !== low) setHigh(high - 1);
  };
  return (
    <HFPhone>
      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, bottom: 0, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
        <div style={{ padding: '8px 16px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div onClick={() => window.UC.navigate('events')} style={{ cursor: 'pointer' }}>
            <HFIconBtn size={32}>{HFIcon.back(14)}</HFIconBtn>
          </div>
          <div style={{ fontFamily: HF.mono, fontSize: 11, letterSpacing: 2, color: HF.ink3, textTransform: 'uppercase', fontWeight: 700 }}>NEW · CLIMB</div>
          <div style={{ flex: 1 }} />
          <button onClick={post} style={{ fontFamily: HF.mono, fontSize: 11, color: HF.accent, letterSpacing: 1, fontWeight: 800, cursor: 'pointer', background: 'transparent', border: 'none', textTransform: 'uppercase' }}>POST →</button>
        </div>
        <div style={{ padding: '0 16px' }}>
          <div style={{ fontFamily: HF.display, fontSize: 28, letterSpacing: -0.8, lineHeight: 1.05, textTransform: 'uppercase' }}>
            LET'S BOULDER<br/>
            <span style={{ color: HF.ink4 }}>WHAT'S THE PLAN?</span>
            <span style={{ display: 'inline-block', width: 10, height: 22, background: HF.accent, marginLeft: 6, verticalAlign: 'text-bottom' }} />
          </div>
        </div>
        <div style={{ padding: '20px 16px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Field label="TITLE" value={title} onChange={setTitle} />
          <div>
            <div style={{ fontFamily: HF.mono, fontSize: 9, letterSpacing: 2, color: HF.ink3, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' }}>GYM / CRAG</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {gyms.map(g => (
                <button key={g.id} onClick={() => setGymId(g.id)} style={{
                  fontFamily: HF.mono, fontSize: 10, fontWeight: 800, padding: '7px 9px', letterSpacing: 1,
                  background: gymId === g.id ? HF.ink : 'transparent', color: gymId === g.id ? '#fff' : HF.ink,
                  border: `1.5px solid ${HF.rule}`, cursor: 'pointer', textTransform: 'uppercase',
                }}>{g.name}</button>
              ))}
            </div>
          </div>
          <Field label="DATE" value={date} onChange={setDate} icon="cal" />
          <Field label="TIME" value={time} onChange={setTime} icon="cal" />
          <div>
            <div style={{ fontFamily: HF.mono, fontSize: 9, letterSpacing: 2, color: HF.ink3, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase' }}>GRADE RANGE · {grades[low]}–{grades[high]}</div>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
              {grades.map((g, i) => {
                const active = i >= low && i <= high;
                const edge = i === low || i === high;
                return (
                  <button key={g} onClick={() => tapGrade(i)} style={{ fontFamily: HF.mono, fontSize: 11, fontWeight: 800, padding: '6px 9px', background: active ? (edge ? HF.accent : HF.ink) : 'transparent', color: active ? '#fff' : HF.ink2, border: `1.5px solid ${active ? (edge ? HF.accent : HF.ink) : HF.ruleSft}`, cursor: 'pointer' }}>{g}</button>
                );
              })}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: HF.mono, fontSize: 9, letterSpacing: 2, color: HF.ink3, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase' }}>WHO CAN SEE</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['PUBLIC', 'CREW', 'CRUSHERS'].map(l => {
                const on = audience === l;
                return (
                  <button key={l} onClick={() => setAudience(l)} style={{ flex: 1, padding: '10px 0', textAlign: 'center', fontFamily: HF.mono, fontSize: 10, letterSpacing: 1, fontWeight: 800, border: `1.5px solid ${HF.rule}`, background: on ? HF.ink : 'transparent', color: on ? '#fff' : HF.ink, cursor: 'pointer' }}>{l}</button>
                );
              })}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: HF.mono, fontSize: 9, letterSpacing: 2, color: HF.ink3, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' }}>NOTE</div>
            <textarea value={note} onChange={e => setNote(e.target.value)} rows={3} style={{ width: '100%', padding: 12, background: HF.paper2, border: `1.5px dashed ${HF.rule}`, fontFamily: HF.mono, fontSize: 11, color: HF.ink2, lineHeight: 1.5, outline: 'none', resize: 'none' }} />
          </div>
        </div>
      </div>
    </HFPhone>
  );
}

function Field({ label, value, onChange, icon }) {
  return (
    <div>
      <div style={{ fontFamily: HF.mono, fontSize: 9, letterSpacing: 2, color: HF.ink3, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, borderBottom: `1.5px solid ${HF.rule}`, padding: '6px 0' }}>
        {icon === 'pin' && HFIcon.pin(15, HF.ink2)}
        {icon === 'cal' && HFIcon.cal(15, HF.ink2)}
        <input value={value} onChange={(e) => onChange(e.target.value)} style={{ flex: 1, fontSize: 16, color: HF.ink, fontWeight: 600, border: 'none', outline: 'none', background: 'transparent', fontFamily: HF.sans }} />
      </div>
    </div>
  );
}

function HFMapScreen() {
  const gyms = OFC.useStoreSlice(s => s.gyms);
  const [selectedId, setSelectedId] = React.useState(gyms[0].id);
  const selected = gyms.find(g => g.id === selectedId);
  return (
    <HFPhone>
      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, bottom: 80, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
        <div style={{ padding: '12px 16px 8px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div onClick={() => window.UC.navigate('events')} style={{ cursor: 'pointer' }}>
            <HFIconBtn size={32}>{HFIcon.back(14)}</HFIconBtn>
          </div>
          <div onClick={() => window.UC.navigate('search')} style={{ flex: 1, height: 32, border: `1.5px solid ${HF.rule}`, display: 'flex', alignItems: 'center', gap: 8, padding: '0 10px', background: HF.card, cursor: 'pointer' }}>
            {HFIcon.search(13, HF.ink3)}
            <span style={{ fontFamily: HF.mono, fontSize: 11, color: HF.ink3, letterSpacing: 0.5 }}>SEARCH SPOTS, GYMS</span>
          </div>
        </div>
        <div style={{ position: 'relative', margin: '0 12px', border: `1px solid ${HF.rule}`, height: 380, overflow: 'hidden' }}>
          <Photo src={HF_IMG.outdoor2} height="100%" dim={0.45} />
          <svg width="100%" height="100%" viewBox="0 0 360 380" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
            {[0,1,2,3,4,5,6].map(i => (
              <path key={i} d={`M -20 ${30 + i * 60} Q 100 ${10 + i * 60} 200 ${40 + i * 60} T 380 ${20 + i * 60}`} stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none"/>
            ))}
            <path d="M 0 220 L 360 200" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" strokeDasharray="6 3"/>
            {gyms.map((g) => {
              const active = selectedId === g.id;
              return (
                <g key={g.id} onClick={() => setSelectedId(g.id)} style={{ cursor: 'pointer' }}>
                  <circle cx={g.mapX} cy={g.mapY} r={active ? 28 : 22} fill={HF.accent} fillOpacity={active ? 0.45 : 0.25} />
                  <rect x={g.mapX - 18} y={g.mapY - 18} width="36" height="36" fill={active ? HF.accent : '#fff'} stroke={HF.ink} strokeWidth="1.5"/>
                  <text x={g.mapX} y={g.mapY + 4} textAnchor="middle" fontFamily={HF.mono} fontSize="11" fontWeight="800" fill={active ? '#fff' : HF.ink}>{g.id}</text>
                </g>
              );
            })}
            <g>
              <circle cx="160" cy="180" r="16" fill={HF.accent} fillOpacity="0.35"/>
              <circle cx="160" cy="180" r="7" fill={HF.accent} stroke="#fff" strokeWidth="2"/>
            </g>
          </svg>
        </div>
        <div onClick={() => window.UC.openGym(selected.id)} style={{ margin: '12px 12px 0', border: `1px solid ${HF.rule}`, background: HF.card, padding: 10, display: 'flex', gap: 12, cursor: 'pointer' }}>
          <Photo src={selected.src} style={{ width: 64, height: 64, flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: HF.display, fontSize: 16, letterSpacing: -0.3, textTransform: 'uppercase' }}>{selected.name}</div>
            <div style={{ fontFamily: HF.mono, fontSize: 10, color: HF.ink3, letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 4 }}>{selected.dist} · {selected.city} · {selected.open}</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
              <HFTag>{selected.problems} PROBLEMS</HFTag>
              {selected.friends > 0 ? <HFTag accent>{selected.friends} FRIENDS</HFTag> : <HFTag>0 FRIENDS</HFTag>}
            </div>
          </div>
          <span style={{ fontFamily: HF.mono, fontSize: 14, color: HF.accent, fontWeight: 800, alignSelf: 'center' }}>→</span>
        </div>
        <div style={{ margin: '12px 12px 0', display: 'flex', gap: 8 }}>
          <button onClick={() => window.UC.toast(`✓ DIRECTIONS TO ${selected.name}`, { accent: true })} style={{ flex: 1, padding: '10px 0', fontFamily: HF.mono, fontSize: 11, fontWeight: 800, letterSpacing: 1.2, background: HF.accent, color: '#fff', border: 'none', cursor: 'pointer', textTransform: 'uppercase', boxShadow: `2px 2px 0 ${HF.rule}` }}>DIRECTIONS →</button>
          <button onClick={() => window.UC.navigate('plan')} style={{ flex: 1, padding: '10px 0', fontFamily: HF.mono, fontSize: 11, fontWeight: 800, letterSpacing: 1.2, background: 'transparent', color: HF.ink, border: `1.5px solid ${HF.rule}`, cursor: 'pointer', textTransform: 'uppercase' }}>PLAN A SESH</button>
        </div>
      </div>
      <HFTabBar active="plan" />
    </HFPhone>
  );
}

Object.assign(window, { HFEventsScreen, HFPlanScreen, HFMapScreen });
