// hifi-share.jsx — three polished hero share cards for the achievement

// Variant A — chalkboard / stamped certificate (light, gritty paper)
function HFShareA() {
  return (
    <div style={{ width: 360, height: 720, position: 'relative', overflow: 'hidden', background: HF.paper, color: HF.ink, fontFamily: HF.sans }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: HF_NOISE, backgroundSize: '220px 220px', opacity: 0.7, mixBlendMode: 'multiply', pointerEvents: 'none' }} />
      <div style={{ padding: 24, height: '100%', boxSizing: 'border-box', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <AFCLockup size={18} color={HF.ink} accent={HF.accent} />
          <div style={{ fontFamily: HF.mono, fontSize: 10, letterSpacing: 1.5, color: HF.ink3, fontWeight: 700 }}>27.04.26</div>
        </div>
        <div style={{ marginTop: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
          <HFAvatar size={42} src={HF_IMG.mara} />
          <div>
            <div style={{ fontWeight: 800, fontSize: 14 }}>MARA KAUR</div>
            <div style={{ fontFamily: HF.mono, fontSize: 9, color: HF.ink3, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 700 }}>@MARA.SENDS · BOULDER PROJECT</div>
          </div>
        </div>
        {/* Photo */}
        <div style={{ marginTop: 16, position: 'relative' }}>
          <Photo src={HF_IMG.send1} height={300} dim={0.05}>
            <div style={{ position: 'absolute', top: 10, left: 10, background: HF.ink, color: '#fff', fontFamily: HF.mono, fontSize: 10, fontWeight: 800, padding: '4px 8px', letterSpacing: 1.5, textTransform: 'uppercase' }}>SENT ↑</div>
          </Photo>
          {/* Stamp */}
          <div style={{ position: 'absolute', top: 14, right: 10, transform: 'rotate(8deg)', border: `2.5px solid ${HF.blood}`, color: HF.blood, fontFamily: HF.display, fontSize: 12, letterSpacing: 1, padding: '4px 10px', background: 'rgba(236,228,214,0.85)', textAlign: 'center' }}>
            ★ FIRST V7 ★<br/><span style={{ fontFamily: HF.mono, fontSize: 9, fontWeight: 700 }}>04 · 27 · 26</span>
          </div>
        </div>
        {/* Big readout */}
        <div style={{ marginTop: 18 }}>
          <div style={{ fontFamily: HF.mono, fontSize: 10, letterSpacing: 1.5, color: HF.ink3, textTransform: 'uppercase', fontWeight: 700 }}>"BLOOD ORANGE"</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 4 }}>
            <span style={{ fontFamily: HF.display, fontSize: 80, lineHeight: 0.85, letterSpacing: -3 }}>V7</span>
            <span style={{ fontFamily: HF.display, fontSize: 26, color: HF.accent, letterSpacing: -0.5, textTransform: 'uppercase' }}>SENT</span>
          </div>
        </div>
        <div style={{ borderTop: `1.5px solid ${HF.rule}`, marginTop: 16, paddingTop: 12, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {[['ATTEMPTS', '14'], ['SESH', '3'], ['STYLE', 'DYNO']].map(([k, v]) => (
            <div key={k}>
              <div style={{ fontFamily: HF.mono, fontSize: 9, letterSpacing: 1.5, color: HF.ink3, textTransform: 'uppercase', fontWeight: 700 }}>{k}</div>
              <div style={{ fontFamily: HF.display, fontSize: 22, marginTop: 2 }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${HF.ruleSft}`, paddingTop: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ fontFamily: HF.mono, fontSize: 9, color: HF.ink3, letterSpacing: 1.5, fontWeight: 700, textTransform: 'uppercase' }}>ONLYFORCLIMBING.APP/MARA</span></div>
          <svg width="32" height="32" viewBox="0 0 32 32"><rect x="0" y="0" width="32" height="32" fill={HF.ink}/>{[...Array(64)].map((_,i)=>{const x=i%8,y=Math.floor(i/8);return Math.random()>0.4&&<rect key={i} x={x*4} y={y*4} width="4" height="4" fill={HF.paper}/>})}</svg>
        </div>
      </div>
    </div>
  );
}

// Variant B — full-bleed editorial photo with chunky type
function HFShareB() {
  return (
    <div style={{ width: 360, height: 720, position: 'relative', overflow: 'hidden', background: HF.dark, color: '#fff', fontFamily: HF.sans }}>
      <Photo src={HF_IMG.send1} height="100%" dim={0.35} />
      <div style={{ position: 'absolute', inset: 0, padding: 24, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <AFCLockup size={18} color="#fff" accent={HF.accent} />
          <HFTag style={{ borderColor: '#fff', color: '#fff' }}>27.04.26 · OAK</HFTag>
        </div>
        <div style={{ flex: 1 }} />
        {/* Massive grade */}
        <div style={{ position: 'relative' }}>
          <div style={{ fontFamily: HF.display, fontSize: 220, lineHeight: 0.78, letterSpacing: -10, color: HF.accent, textShadow: `4px 4px 0 ${HF.dark}` }}>V7</div>
          <div style={{ position: 'absolute', top: 20, right: 8, transform: 'rotate(-6deg)', background: '#fff', color: HF.ink, padding: '6px 10px', fontFamily: HF.mono, fontSize: 11, fontWeight: 800, letterSpacing: 1.5 }}>FIRST EVER ✕</div>
        </div>
        <div style={{ fontFamily: HF.display, fontSize: 32, letterSpacing: -1, lineHeight: 1, textTransform: 'uppercase', marginTop: 4 }}>BLOOD ORANGE.</div>
        <div style={{ fontFamily: HF.mono, fontSize: 11, letterSpacing: 1.5, color: 'rgba(255,255,255,0.75)', marginTop: 8, fontWeight: 700, textTransform: 'uppercase' }}>14 ATTEMPTS · 3 SESSIONS · 2 MO PROJECT</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 18, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <HFAvatar size={36} src={HF_IMG.mara} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 13 }}>MARA KAUR</div>
            <div style={{ fontFamily: HF.mono, fontSize: 9, color: 'rgba(255,255,255,0.65)', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 700 }}>@MARA.SENDS</div>
          </div>
          <div style={{ fontFamily: HF.mono, fontSize: 9, color: 'rgba(255,255,255,0.65)', letterSpacing: 1.5, textAlign: 'right', textTransform: 'uppercase', fontWeight: 700 }}>ALL FOR<br/>CLIMBING<br/>/MARA</div>
        </div>
      </div>
    </div>
  );
}

// Variant C — newspaper clipping / report
function HFShareC() {
  return (
    <div style={{ width: 360, height: 720, position: 'relative', overflow: 'hidden', background: HF.paper, color: HF.ink, fontFamily: HF.sans }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: HF_NOISE, backgroundSize: '220px 220px', opacity: 0.7, mixBlendMode: 'multiply', pointerEvents: 'none' }} />
      <div style={{ padding: 22, position: 'relative', zIndex: 2, height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        <div style={{ borderTop: `2.5px solid ${HF.ink}`, borderBottom: `1px solid ${HF.ink}`, padding: '6px 0', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: HF.mono, fontSize: 9, letterSpacing: 1.5, fontWeight: 700, textTransform: 'uppercase' }}>ONLY FOR CLIMBING DAILY · VOL XII</span>
          <span style={{ fontFamily: HF.mono, fontSize: 9, letterSpacing: 1.5, fontWeight: 700 }}>27.IV.26</span>
        </div>
        <div style={{ fontFamily: HF.display, fontSize: 38, letterSpacing: -1.4, lineHeight: 0.95, textTransform: 'uppercase', marginTop: 14 }}>
          KAUR<br/>CRACKS<br/>“BLOOD<br/>ORANGE”
        </div>
        <div style={{ fontFamily: HF.mono, fontSize: 10, letterSpacing: 1, color: HF.ink3, textTransform: 'uppercase', marginTop: 8, fontWeight: 700 }}>
          OAKLAND, CA — A CAREER FIRST.
        </div>
        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <Photo src={HF_IMG.send1} height={140} />
          <div>
            <div style={{ fontFamily: HF.display, fontSize: 64, letterSpacing: -2.5, lineHeight: 0.85, color: HF.accent }}>V7</div>
            <div style={{ fontFamily: HF.mono, fontSize: 10, letterSpacing: 1.5, color: HF.ink2, fontWeight: 700, textTransform: 'uppercase', marginTop: 4 }}>FIRST OF THE GRADE</div>
            <div style={{ fontFamily: HF.mono, fontSize: 11, letterSpacing: 0.5, marginTop: 10, lineHeight: 1.5 }}>
              ATTEMPTS . . 14<br/>
              SESSIONS . . 03<br/>
              STYLE . . . . DYNO<br/>
              PROJECT . . . 2 MO
            </div>
          </div>
        </div>
        <div style={{ fontSize: 12, lineHeight: 1.5, color: HF.ink2, marginTop: 14, columnCount: 2, columnGap: 14, columnRule: `1px solid ${HF.ruleSft}` }}>
          KAUR, 28, FINALLY STUCK THE OPENING DYNO TUESDAY EVENING AT BOULDER PROJECT'S NEW SET, ENDING A TWO-MONTH PROJECT. "THE CRIMPS STILL HATE ME," SHE SAID, FLASHING A GRIN.
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 10, borderTop: `1.5px solid ${HF.ink}` }}>
          <HFAvatar size={32} src={HF_IMG.mara} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 12 }}>MARA KAUR · @mara.sends</div>
            <div style={{ fontFamily: HF.mono, fontSize: 9, color: HF.ink3, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 700 }}>FILED FROM BAY 4 · 19:42</div>
          </div>
          <AFCLockup size={14} color={HF.ink} accent={HF.accent} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HFShareA, HFShareB, HFShareC });
