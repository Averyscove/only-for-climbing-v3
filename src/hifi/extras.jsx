// hifi-extras.jsx — V3: composer, onboarding (multi-step), share-card host helpers.

function HFComposerScreen() {
  const tiles = [HF_IMG.send1, HF_IMG.send2, HF_IMG.gym1, HF_IMG.shoes];
  const gyms = OFC.useStoreSlice(s => s.gyms);
  const [selectedTile, setSelectedTile] = React.useState(0);
  const [audience, setAudience] = React.useState('PUBLIC');
  const [sent, setSent] = React.useState(true);
  const [grade, setGrade] = React.useState('V5');
  const [routeName, setRouteName] = React.useState('Project A');
  const [gymId, setGymId] = React.useState('BP');
  const [attempts, setAttempts] = React.useState(3);
  const [style, setStyle] = React.useState('STATIC');
  const [holds, setHolds] = React.useState('CRIMPS');
  const [caption, setCaption] = React.useState('Quick after-work session.');
  const grades = ['V0','V1','V2','V3','V4','V5','V6','V7','V8','V9','V10'];
  const styles = ['STATIC','DYNO','SLAB','POWER','TECHY','COMP','FLASH'];
  const holdsList = ['CRIMPS','PINCHES','SLOPERS','JUGS','SMEARS'];
  const share = () => {
    const id = OFC.logSend({ grade, name: routeName, gymId, attempts, sessions: 1, style, holds, src: tiles[selectedTile], notes: caption });
    window.UC.toast('✓ SEND POSTED', { accent: true });
    window.UC.navigate('shareA');
  };
  return (
    <HFPhone dark>
      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '8px 14px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span onClick={() => window.UC.navigate('feed')} style={{ color: '#fff', fontFamily: HF.mono, fontSize: 11, letterSpacing: 1.5, fontWeight: 700, cursor: 'pointer' }}>CANCEL</span>
          <span style={{ fontFamily: HF.display, fontSize: 14, color: '#fff', letterSpacing: -0.2, textTransform: 'uppercase' }}>NEW SEND</span>
          <span onClick={share} style={{ color: HF.accent, fontFamily: HF.mono, fontSize: 11, letterSpacing: 1.5, fontWeight: 800, cursor: 'pointer' }}>SHARE →</span>
        </div>
        <div style={{ position: 'relative', margin: '0 14px', borderRadius: 4, overflow: 'hidden' }}>
          <Photo src={tiles[selectedTile]} height={250} dim={0.1}>
            <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', color: '#fff', fontFamily: HF.mono, fontSize: 10, fontWeight: 700, padding: '4px 8px', borderRadius: 999, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 5 }}>{HFIcon.play(10)} 0:24</div>
            <div style={{ position: 'absolute', bottom: 10, left: 10, right: 10, display: 'flex', gap: 6 }}>
              {tiles.map((s, i) => (
                <div key={i} onClick={() => setSelectedTile(i)} style={{ width: 44, height: 44, border: i === selectedTile ? `2px solid ${HF.accent}` : '2px solid rgba(255,255,255,0.4)', overflow: 'hidden', cursor: 'pointer' }}>
                  <img src={s} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                </div>
              ))}
              <div onClick={() => window.UC.toast('UPLOAD · V4')} style={{ width: 44, height: 44, border: '2px dashed rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}>{HFIcon.plus(16, '#fff')}</div>
            </div>
          </Photo>
        </div>
        <div style={{ padding: '14px 14px 24px', flex: 1, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
          <Label dark>CAPTION</Label>
          <textarea
            value={caption} onChange={(e) => setCaption(e.target.value)} rows={2}
            style={{ width: '100%', resize: 'none', background: 'transparent', color: '#fff', fontSize: 15, lineHeight: 1.45, border: 'none', outline: 'none', fontFamily: HF.sans, padding: 0 }}
          />
          <div style={{ marginTop: 12, padding: 14, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <Label dark>LOG IT AS</Label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: HF.display, fontSize: 32, color: '#fff', letterSpacing: -1 }}>{grade}</span>
              <div style={{ flex: 1 }}>
                <input value={routeName} onChange={(e) => setRouteName(e.target.value)} style={{ width: '100%', color: '#fff', fontSize: 13, fontWeight: 700, background: 'transparent', border: 'none', outline: 'none', fontFamily: HF.sans }} />
                <select value={gymId} onChange={(e) => setGymId(e.target.value)} style={{ background: 'transparent', color: 'rgba(255,255,255,0.55)', border: 'none', fontFamily: HF.mono, fontSize: 10, letterSpacing: 0.8, marginTop: 2, textTransform: 'uppercase', outline: 'none' }}>
                  {gyms.map(g => <option key={g.id} value={g.id} style={{ color: '#000' }}>{g.name} · {g.city}</option>)}
                </select>
              </div>
              <button onClick={() => { setSent(v => !v); window.UC.toast(sent ? 'PROJECT' : '✓ SENT', { accent: !sent }); }} style={{
                background: sent ? HF.accent : 'transparent', color: '#fff',
                fontFamily: HF.mono, fontSize: 10, fontWeight: 800, padding: '4px 8px',
                letterSpacing: 1.5, border: `1.5px solid ${sent ? HF.accent : 'rgba(255,255,255,0.4)'}`, cursor: 'pointer',
              }}>{sent ? 'SENT' : 'PROJECT'}</button>
            </div>
            <div style={{ display: 'flex', gap: 4, marginTop: 12, flexWrap: 'wrap' }}>
              {grades.map(g => (
                <button key={g} onClick={() => setGrade(g)} style={{
                  fontFamily: HF.mono, fontSize: 10, fontWeight: 800, padding: '5px 8px', letterSpacing: 1,
                  background: g === grade ? HF.accent : 'transparent', color: '#fff',
                  border: `1.5px solid ${g === grade ? HF.accent : 'rgba(255,255,255,0.2)'}`, cursor: 'pointer',
                }}>{g}</button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
              <Stat dark k="ATTEMPTS" v={
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <button onClick={() => setAttempts(Math.max(1, attempts - 1))} style={{ fontFamily: HF.display, color: '#fff', background: 'transparent', border: 'none', fontSize: 16, cursor: 'pointer' }}>−</button>
                  <span style={{ fontFamily: HF.display, fontSize: 14, color: '#fff' }}>{attempts}</span>
                  <button onClick={() => setAttempts(attempts + 1)} style={{ fontFamily: HF.display, color: '#fff', background: 'transparent', border: 'none', fontSize: 16, cursor: 'pointer' }}>+</button>
                </div>
              } />
              <Stat dark k="STYLE" v={
                <select value={style} onChange={(e) => setStyle(e.target.value)} style={{ background: 'transparent', color: '#fff', border: 'none', fontFamily: HF.display, fontSize: 14, outline: 'none' }}>
                  {styles.map(s => <option key={s} value={s} style={{ color: '#000' }}>{s}</option>)}
                </select>
              } />
              <Stat dark k="HOLDS" v={
                <select value={holds} onChange={(e) => setHolds(e.target.value)} style={{ background: 'transparent', color: '#fff', border: 'none', fontFamily: HF.display, fontSize: 14, outline: 'none' }}>
                  {holdsList.map(h => <option key={h} value={h} style={{ color: '#000' }}>{h}</option>)}
                </select>
              } />
            </div>
          </div>
          <div style={{ marginTop: 14, display: 'flex', gap: 6 }}>
            {[['📡 PUBLIC', 'PUBLIC'], ['👥 CRUSHERS', 'CRUSHERS'], ['🔒 ONLY ME', 'ONLY ME']].map(([label, key]) => {
              const on = audience === key;
              return (
                <button key={key} onClick={() => setAudience(key)} style={{
                  padding: '7px 11px', fontFamily: HF.mono, fontSize: 10, fontWeight: 800, letterSpacing: 1,
                  background: on ? HF.accent : 'transparent', color: '#fff',
                  border: `1.5px solid ${on ? HF.accent : 'rgba(255,255,255,0.25)'}`, cursor: 'pointer',
                }}>{label}</button>
              );
            })}
          </div>
        </div>
      </div>
    </HFPhone>
  );
}

function Label({ children, dark }) {
  return <div style={{ fontFamily: HF.mono, fontSize: 9, letterSpacing: 2, color: dark ? 'rgba(255,255,255,0.55)' : HF.ink3, textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>{children}</div>;
}
function Stat({ k, v, dark }) {
  return (
    <div style={{ flex: 1, padding: 8, border: `1px solid ${dark ? 'rgba(255,255,255,0.15)' : HF.ruleSft}` }}>
      <div style={{ fontFamily: HF.mono, fontSize: 8, letterSpacing: 1.5, color: dark ? 'rgba(255,255,255,0.5)' : HF.ink3, fontWeight: 700, textTransform: 'uppercase' }}>{k}</div>
      <div style={{ marginTop: 2 }}>{v}</div>
    </div>
  );
}

function HFOnboardingScreen() {
  const [step, setStep] = React.useState(0);
  const slides = [
    { hero: HF_IMG.send1, eyebrow: '● FOR CLIMBERS · BY CLIMBERS', title: ['FIND YOUR', { color: HF.accent, t: 'CREW.' }, 'SEND', 'HARDER.'], body: 'Log every send. Plan climbs with friends. Share the moments worth bragging about.' },
    { hero: HF_IMG.gym2,  eyebrow: '● TRACK · YOUR · PROGRESS',     title: ['LOG SENDS.', { color: HF.accent, t: 'BUILD' }, 'YOUR', 'PYRAMID.'], body: 'Auto-recaps, project tracking, gear life — all your data, your wall.' },
    { hero: HF_IMG.outdoor2, eyebrow: '● PLAN · TOGETHER',           title: ['MEET', { color: HF.accent, t: 'CRUSHERS.' }, 'PLAN', 'CLIMBS.'], body: 'Discover events. RSVP. Group chats with embedded sends.' },
  ];
  const s = slides[step];
  const next = () => step < slides.length - 1 ? setStep(step + 1) : window.UC.navigate('feed');
  return (
    <HFPhone dark>
      <div style={{ position: 'absolute', inset: 0 }}>
        <Photo src={s.hero} height="100%" dim={0.5} />
        <div style={{ position: 'absolute', inset: 0, padding: 28, display: 'flex', flexDirection: 'column', boxSizing: 'border-box', color: '#fff' }}>
          <div style={{ paddingTop: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <AFCLockup size={22} color="#fff" accent={HF.accent} />
            <span onClick={() => window.UC.navigate('feed')} style={{ fontFamily: HF.mono, fontSize: 10, color: 'rgba(255,255,255,0.7)', letterSpacing: 1.2, fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase' }}>SKIP</span>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ fontFamily: HF.mono, fontSize: 11, letterSpacing: 2, color: HF.accent, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12 }}>{s.eyebrow}</div>
          <div style={{ fontFamily: HF.display, fontSize: 52, lineHeight: 0.92, letterSpacing: -2, textTransform: 'uppercase' }}>
            {s.title.map((line, i) => typeof line === 'string'
              ? <React.Fragment key={i}>{line}<br/></React.Fragment>
              : <React.Fragment key={i}><span style={{ color: line.color }}>{line.t}</span><br/></React.Fragment>
            )}
          </div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, marginTop: 18, maxWidth: 280 }}>{s.body}</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 22, justifyContent: 'center' }}>
            {slides.map((_, i) => (
              <div key={i} style={{ width: i === step ? 22 : 8, height: 8, borderRadius: 4, background: i === step ? HF.accent : 'rgba(255,255,255,0.3)', transition: 'width 200ms' }} />
            ))}
          </div>
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button onClick={next} style={{ background: HF.accent, color: '#fff', padding: '16px 14px', textAlign: 'center', fontFamily: HF.mono, fontSize: 12, letterSpacing: 1.5, fontWeight: 800, boxShadow: `4px 4px 0 ${HF.dark}`, border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}>{step < slides.length - 1 ? 'NEXT →' : 'CREATE PROFILE →'}</button>
            <button onClick={() => window.UC.navigate('feed')} style={{ border: '1.5px solid rgba(255,255,255,0.4)', padding: '14px', textAlign: 'center', fontFamily: HF.mono, fontSize: 11, letterSpacing: 1.5, fontWeight: 700, color: '#fff', background: 'transparent', cursor: 'pointer', textTransform: 'uppercase' }}>I ALREADY HAVE AN ACCOUNT</button>
          </div>
          <div style={{ marginTop: 14, fontFamily: HF.mono, fontSize: 9, letterSpacing: 1.5, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', textAlign: 'center', fontWeight: 700 }}>BOULDER · SPORT · TRAD · GYMS · CRAGS</div>
        </div>
      </div>
    </HFPhone>
  );
}

Object.assign(window, { HFComposerScreen, HFOnboardingScreen });
