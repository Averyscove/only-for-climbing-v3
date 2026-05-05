// hifi-chat.jsx — V3: store-driven story / chats / thread.

function HFStoryView() {
  const slides = [
    { bg: HF_IMG.send2, who: 'Ben T.', avatar: HF_IMG.ben, label: '● LIVE · MOVEMENT DEN',
      stickers: [
        { x: 24, y: 180, rot: -6, kind: 'orange', text: 'PROJECT DAY ✕', big: true },
        { x: 'right', y: 250, rot: 4, kind: 'white', text: 'V9 ATTEMPT #38' },
        { x: 30, y: 330, rot: 0, kind: 'pin', text: '📍 THE CAVE · BAY 3' },
      ],
    },
    { bg: HF_IMG.gym2, who: 'Ben T.', avatar: HF_IMG.ben, label: '● LIVE · MOVEMENT DEN',
      stickers: [
        { x: 30, y: 220, rot: -3, kind: 'orange', text: 'STILL TRYING', big: true },
        { x: 'right', y: 340, rot: 6, kind: 'white', text: 'BETA WANTED 🙏' },
      ],
    },
    { bg: HF_IMG.send3, who: 'Ben T.', avatar: HF_IMG.ben, label: '● LIVE · MOVEMENT DEN',
      stickers: [
        { x: 24, y: 200, rot: -4, kind: 'orange', text: 'GOT IT 🤝', big: true },
        { x: 'right', y: 290, rot: 5, kind: 'white', text: '38 ATTEMPTS · SENT' },
      ],
    },
  ];
  const [i, setI] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const DURATION_MS = 5000;
  React.useEffect(() => {
    if (paused) return;
    const start = Date.now();
    const tick = setInterval(() => {
      const dt = (Date.now() - start) / DURATION_MS;
      if (dt >= 1) {
        clearInterval(tick);
        if (i < slides.length - 1) { setI(i + 1); setProgress(0); }
        else window.UC.navigate('feed');
      } else setProgress(dt);
    }, 50);
    return () => clearInterval(tick);
  }, [i, paused]);
  const tap = (e) => {
    e.stopPropagation();
    const x = e.clientX;
    const w = e.currentTarget.getBoundingClientRect().width;
    if (x < w / 3) { if (i > 0) { setI(i - 1); setProgress(0); } else setProgress(0); }
    else { if (i < slides.length - 1) { setI(i + 1); setProgress(0); } else window.UC.navigate('feed'); }
  };
  const s = slides[i];
  const stickerStyle = (st) => ({
    position: 'absolute',
    top: st.y,
    ...(st.x === 'right' ? { right: 24 } : { left: st.x }),
    transform: `rotate(${st.rot}deg)`,
    ...(st.kind === 'orange' ? { background: HF.accent, color: '#fff', padding: '10px 14px', fontFamily: HF.display, fontSize: st.big ? 22 : 16, letterSpacing: -0.5, textTransform: 'uppercase', boxShadow: `4px 4px 0 ${HF.dark}` }
      : st.kind === 'white' ? { background: '#fff', color: HF.ink, padding: '8px 12px', fontFamily: HF.mono, fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', boxShadow: `3px 3px 0 ${HF.accent}` }
      : { color: '#fff', fontFamily: HF.mono, fontSize: 12, letterSpacing: 1, fontWeight: 700, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', padding: '6px 10px', borderRadius: 999 }),
  });
  return (
    <HFPhone dark>
      <div onClick={tap}
           onMouseDown={() => setPaused(true)}
           onMouseUp={() => setPaused(false)}
           onTouchStart={() => setPaused(true)}
           onTouchEnd={() => setPaused(false)}
           style={{ position: 'absolute', inset: 0, cursor: 'pointer' }}>
        <Photo src={s.bg} height="100%" dim={0.25} />
        <div style={{ position: 'absolute', top: 56, left: 12, right: 12, display: 'flex', gap: 4 }}>
          {slides.map((_, idx) => {
            const p = idx < i ? 1 : idx === i ? progress : 0;
            return (
              <div key={idx} style={{ flex: 1, height: 2.5, background: 'rgba(255,255,255,0.25)', overflow: 'hidden' }}>
                <div style={{ width: `${p * 100}%`, height: '100%', background: '#fff', transition: 'width 50ms linear' }} />
              </div>
            );
          })}
        </div>
        <div style={{ position: 'absolute', top: 70, left: 14, right: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
          <HFAvatar size={32} src={s.avatar} ring={HF.accent} />
          <div style={{ flex: 1 }}>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>{s.who}</div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontFamily: HF.mono, fontSize: 9, letterSpacing: 1, textTransform: 'uppercase' }}>{s.label}</div>
          </div>
          <div onClick={(e) => { e.stopPropagation(); window.UC.navigate('feed'); }}>
            <HFIconBtn size={30} dark>{HFIcon.more(14, '#fff')}</HFIconBtn>
          </div>
        </div>
        {s.stickers.map((st, idx) => <div key={idx} style={stickerStyle(st)}>{st.text}</div>)}
        <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', left: 12, right: 12, bottom: 30, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, height: 42, border: '1.5px solid rgba(255,255,255,0.5)', borderRadius: 999, padding: '0 16px', display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.7)', fontSize: 13, fontFamily: HF.mono, letterSpacing: 0.5 }}>SEND BETA →</div>
          <div onClick={() => window.UC.toast('♥ REACTED', { accent: true })} style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>{HFIcon.heart(20, '#fff')}</div>
          <div onClick={() => window.UC.openThread('c5')} style={{ width: 42, height: 42, borderRadius: '50%', background: HF.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 18px ${HF.accent}88`, cursor: 'pointer' }}>{HFIcon.send(18, '#fff')}</div>
        </div>
      </div>
    </HFPhone>
  );
}

function HFChatListScreen() {
  const chats = OFC.useStoreSlice(s => s.chats);
  const messages = OFC.useStoreSlice(s => s.messages);
  return (
    <HFPhone>
      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, bottom: 80, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
        <div style={{ padding: '8px 16px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: HF.display, fontSize: 28, letterSpacing: -0.8, textTransform: 'uppercase' }}>CHAT</div>
          <div onClick={() => window.UC.toast('NEW CHAT · COMING IN V4')} style={{ cursor: 'pointer' }}>
            <HFIconBtn size={32} accent>{HFIcon.plus(15, '#fff')}</HFIconBtn>
          </div>
        </div>
        <div onClick={() => window.UC.navigate('search')} style={{ padding: '0 16px 12px', display: 'flex', gap: 12, alignItems: 'center', height: 36, border: `1.5px solid ${HF.ruleSft}`, margin: '0 16px 14px', background: HF.card, cursor: 'pointer' }}>
          <span style={{ paddingLeft: 12 }}>{HFIcon.search(13, HF.ink3)}</span>
          <span style={{ fontFamily: HF.mono, fontSize: 11, color: HF.ink3, letterSpacing: 0.5 }}>SEARCH PEOPLE & GROUPS</span>
        </div>
        <div style={{ padding: '0 16px' }}>
          {chats.map(c => {
            const last = (messages[c.id] || []).slice(-1)[0];
            const subtitle = last ? `${last.who === 'you' ? 'you' : last.who}: ${(last.body || '(media)').slice(0, 40)}` : '—';
            const avs = c.kind === 'group' ? c.members.filter(m => m !== 'you').slice(0, 2).map(OFC.avatarOf) : null;
            const other = c.kind === 'dm' ? OFC.userById(c.other) : null;
            return (
              <div key={c.id} onClick={() => window.UC.openThread(c.id)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderTop: `1px solid ${HF.ruleSft}`, cursor: 'pointer' }}>
                {c.kind === 'group' ? (
                  <div style={{ width: 44, height: 44, position: 'relative', flexShrink: 0 }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: 30, height: 30, borderRadius: '50%', overflow: 'hidden', border: `2px solid ${HF.paper}` }}>
                      <img src={avs[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ position: 'absolute', bottom: 0, right: 0, width: 30, height: 30, borderRadius: '50%', overflow: 'hidden', border: `2px solid ${HF.paper}` }}>
                      <img src={avs[1]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </div>
                ) : (
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <HFAvatar size={44} src={other && other.avatar} ring={c.story ? HF.accent : null} />
                    {other && other.online && <span style={{ position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, background: HF.moss, borderRadius: '50%', border: `2.5px solid ${HF.paper}` }} />}
                  </div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontWeight: c.unread ? 800 : 600, fontSize: 13, color: HF.ink, letterSpacing: c.kind === 'group' ? 0.5 : 0, textTransform: c.kind === 'group' ? 'uppercase' : 'none' }}>{c.kind === 'group' ? c.name : (other ? other.name : '—')}</span>
                    <span style={{ fontFamily: HF.mono, fontSize: 9, color: c.unread ? HF.accent : HF.ink3, letterSpacing: 1, fontWeight: 700 }}>{c.lastTime}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginTop: 2 }}>
                    <span style={{ fontSize: 12, color: c.unread ? HF.ink2 : HF.ink3, fontWeight: c.unread ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{subtitle}</span>
                    {c.unread > 0 && <span style={{ minWidth: 18, height: 18, padding: '0 5px', borderRadius: 9, background: HF.accent, color: '#fff', fontFamily: HF.mono, fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.unread}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <HFTabBar active="chat" />
    </HFPhone>
  );
}

function HFGroupChatScreen({ chatId = 'c1' }) {
  const chat = OFC.useStoreSlice(s => s.chats.find(c => c.id === chatId)) || OFC.useStoreSlice(s => s.chats[0]);
  const messages = OFC.useStoreSlice(s => s.messages[chat.id] || []);
  const reactions = OFC.useStoreSlice(s => s.reactions);
  const [draft, setDraft] = React.useState('');
  const scrollerRef = React.useRef(null);
  const send = () => { if (draft.trim()) { OFC.sendMessage(chat.id, draft); setDraft(''); window.UC.toast('SENT', { accent: true }); } };
  React.useEffect(() => {
    if (scrollerRef.current) scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
  }, [messages.length]);
  const title = chat.kind === 'group' ? chat.name : (OFC.userById(chat.other) || {}).name || '—';
  const sub = chat.kind === 'group' ? `● ${chat.members.length} MEMBERS` : '● ONLINE';
  return (
    <HFPhone>
      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '8px 14px 12px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${HF.ruleSft}` }}>
          <div onClick={() => window.UC.navigate('chats')} style={{ cursor: 'pointer' }}>
            <HFIconBtn size={32}>{HFIcon.back(14)}</HFIconBtn>
          </div>
          {chat.kind === 'group' && (
            <div style={{ display: 'flex' }}>
              {chat.members.filter(m => m !== 'you').slice(0, 3).map((m, i) => (
                <div key={i} style={{ marginLeft: i ? -8 : 0 }}><HFAvatar size={26} src={OFC.avatarOf(m)} /></div>
              ))}
            </div>
          )}
          {chat.kind === 'dm' && <HFAvatar size={32} src={(OFC.userById(chat.other) || {}).avatar} />}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: HF.display, fontSize: 13, letterSpacing: -0.2, textTransform: 'uppercase' }}>{title}</div>
            <div style={{ fontFamily: HF.mono, fontSize: 9, color: HF.accent, letterSpacing: 1, fontWeight: 700, textTransform: 'uppercase' }}>{sub}</div>
          </div>
          <HFIconBtn size={32}>{HFIcon.more(14)}</HFIconBtn>
        </div>
        <div ref={scrollerRef} style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch', padding: '14px 14px 8px' }}>
          {messages.map((m, i) => {
            if (m.kind === 'me') {
              const next = messages[i + 1];
              return (
                <React.Fragment key={m.id || i}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 6 }}>
                    <div style={{ background: HF.accent, color: '#fff', padding: '8px 11px', fontSize: 13, lineHeight: 1.4, maxWidth: '74%', boxShadow: `2px 2px 0 ${HF.accent2}` }}>{m.body}</div>
                  </div>
                  {(!next || next.kind !== 'me') && <div style={{ textAlign: 'right', fontFamily: HF.mono, fontSize: 9, color: HF.ink3, letterSpacing: 1, fontWeight: 700, marginBottom: 14 }}>READ · {m.time}</div>}
                </React.Fragment>
              );
            }
            if (m.kind === 'send') {
              const send = OFC.sendById(m.sendId);
              if (!send) return null;
              const r = reactions[m.id] || {};
              return (
                <React.Fragment key={m.id || i}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                    <div style={{ width: 26 }} />
                    <div onClick={() => window.UC.navigate('shareB')} style={{ width: 220, border: `1.5px solid ${HF.rule}`, background: HF.dark, color: '#fff', overflow: 'hidden', cursor: 'pointer' }}>
                      <Photo src={send.src} height={130}>
                        <div style={{ position: 'absolute', top: 8, left: 8, background: HF.accent, color: '#fff', fontFamily: HF.mono, fontSize: 9, fontWeight: 800, padding: '3px 7px', letterSpacing: 1.5 }}>SENT {send.grade}</div>
                      </Photo>
                      <div style={{ padding: '8px 10px' }}>
                        <div style={{ fontFamily: HF.display, fontSize: 13, letterSpacing: -0.2, textTransform: 'uppercase' }}>{send.name} · {send.grade}</div>
                        <div style={{ fontFamily: HF.mono, fontSize: 9, color: 'rgba(255,255,255,0.6)', letterSpacing: 0.8, marginTop: 3, textTransform: 'uppercase' }}>{send.attempts} ATTEMPTS · {send.gym}</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginLeft: 34, marginTop: -8, marginBottom: 16 }}>
                    <button onClick={() => OFC.reactToMessage(m.id, 'fire')} style={{ fontFamily: HF.mono, fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 999, border: `1px solid ${HF.rule}`, background: HF.paper2, cursor: 'pointer' }}>🔥 {r.fire || 0}</button>
                    <button onClick={() => OFC.reactToMessage(m.id, 'flex')} style={{ fontFamily: HF.mono, fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 999, border: `1px solid ${HF.rule}`, background: HF.paper2, cursor: 'pointer' }}>💪 {r.flex || 0}</button>
                  </div>
                </React.Fragment>
              );
            }
            return (
              <div key={m.id || i} style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <HFAvatar size={26} src={OFC.avatarOf(m.who)} />
                <div style={{ maxWidth: '74%' }}>
                  <div style={{ fontFamily: HF.mono, fontSize: 9, color: HF.ink3, letterSpacing: 1, marginBottom: 3, fontWeight: 700, textTransform: 'uppercase' }}>{m.who} · {m.time}</div>
                  <div style={{ background: HF.card, border: `1px solid ${HF.ruleSft}`, padding: '8px 11px', fontSize: 13, color: HF.ink, lineHeight: 1.4 }}>{m.body}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ padding: '10px 14px 14px', borderTop: `1px solid ${HF.ruleSft}`, display: 'flex', alignItems: 'center', gap: 8, background: HF.card }}>
          <div onClick={() => window.UC.toast('CAMERA · V4')} style={{ cursor: 'pointer' }}>
            <HFIconBtn size={36}>{HFIcon.camera(15)}</HFIconBtn>
          </div>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="say something good…"
            style={{ flex: 1, height: 36, border: `1.5px solid ${HF.ruleSft}`, padding: '0 12px', background: HF.paper, fontSize: 13, color: HF.ink, outline: 'none', fontFamily: HF.sans }}
          />
          <div onClick={send} style={{ cursor: 'pointer' }}>
            <HFIconBtn size={36} accent>{HFIcon.send(15, '#fff')}</HFIconBtn>
          </div>
        </div>
      </div>
    </HFPhone>
  );
}

Object.assign(window, { HFStoryView, HFChatListScreen, HFGroupChatScreen });
