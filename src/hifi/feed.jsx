// hifi-feed.jsx — V3: store-driven feed.

function HFFeedHeader() {
  const openPicker = () => window.UC && window.UC.openPicker && window.UC.openPicker();
  const openNotifs = () => window.UC && window.UC.navigate('notifications');
  const openSearch = () => window.UC && window.UC.navigate('search');
  const unread = OFC.useStoreSlice(s => s.notifications.filter(n => n.unread).length);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 16px 12px' }}>
      <AFCLockup size={20} color={HF.ink} accent={HF.accent} />
      <div style={{ flex: 1 }} />
      <button
        onClick={openPicker}
        style={{
          fontFamily: HF.mono, fontSize: 10, fontWeight: 800, letterSpacing: 1.5,
          color: '#fff', background: HF.accent,
          border: 'none', padding: '7px 10px', cursor: 'pointer',
          boxShadow: `2px 2px 0 ${HF.rule}`, textTransform: 'uppercase',
        }}
      >SCREENS</button>
      <div onClick={openSearch} style={{ cursor: 'pointer' }}>
        <HFIconBtn size={34}>{HFIcon.search(15)}</HFIconBtn>
      </div>
      <div onClick={openNotifs} style={{ position: 'relative', cursor: 'pointer' }}>
        <HFIconBtn size={34}>{HFIcon.bell(15)}</HFIconBtn>
        {unread > 0 && (
          <span style={{
            position: 'absolute', top: 2, right: 2,
            minWidth: 16, height: 16, padding: '0 4px',
            background: HF.accent, color: '#fff', borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: HF.mono, fontSize: 9, fontWeight: 800,
            border: `1.5px solid ${HF.paper}`,
          }}>{unread}</span>
        )}
      </div>
    </div>
  );
}

function HFStoryRail() {
  const friends = OFC.useStoreSlice(s => s.friends);
  const me = OFC.useStoreSlice(s => s.me);
  const stories = [
    { id: me.id, label: 'You', mine: true, src: me.avatar },
    ...friends.slice(0, 6).map(f => ({ id: f.id, label: f.name.split(' ')[0], live: f.id === 'mara', grade: f.peak, src: f.avatar })),
  ];
  return (
    <div style={{ display: 'flex', gap: 12, padding: '4px 16px 14px', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
      {stories.map((s) => (
        <div key={s.id}
             onClick={() => window.UC && window.UC.navigate(s.mine ? 'composer' : 'story')}
             style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, flexShrink: 0, cursor: 'pointer' }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              padding: 2.5,
              background: s.live
                ? `conic-gradient(from 220deg, ${HF.accent}, ${HF.amber}, ${HF.accent})`
                : (s.mine ? HF.paper2 : HF.ruleSft),
            }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${HF.paper}` }}>
                <img src={s.src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
            {s.mine && (
              <div style={{ position: 'absolute', bottom: -2, right: -2, width: 22, height: 22, borderRadius: '50%', background: HF.accent, border: `2px solid ${HF.paper}`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{HFIcon.plus(12, '#fff')}</div>
            )}
            {s.grade && !s.mine && (
              <div style={{ position: 'absolute', bottom: -2, left: '50%', transform: 'translateX(-50%)', background: HF.ink, color: '#fff', fontFamily: HF.mono, fontSize: 9, fontWeight: 800, padding: '2px 5px', letterSpacing: 0.5, borderRadius: 2 }}>{s.grade}</div>
            )}
          </div>
          <span style={{ fontFamily: HF.mono, fontSize: 9, letterSpacing: 0.5, textTransform: 'uppercase', color: HF.ink2, fontWeight: 600 }}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

function HFPostHeader({ userId, where, when, group }) {
  const u = OFC.userById(userId);
  if (!u) return null;
  const open = (e) => { e.stopPropagation(); window.UC && window.UC.openProfile && window.UC.openProfile(userId); };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px 10px' }}>
      <div onClick={open} style={{ cursor: 'pointer' }}>
        <HFAvatar size={38} src={u.avatar} label={u.name.slice(0,2).toUpperCase()} />
      </div>
      <div onClick={open} style={{ flex: 1, minWidth: 0, cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: HF.ink }}>{u.name}</span>
          <span style={{ fontFamily: HF.mono, fontSize: 10, color: HF.ink3 }}>@{u.handle}</span>
        </div>
        <div style={{ fontFamily: HF.mono, fontSize: 10, color: HF.ink3, letterSpacing: 0.5, textTransform: 'uppercase' }}>
          {where} · {when}{group && <> · <span style={{ color: HF.accent }}>{group}</span></>}
        </div>
      </div>
      {HFIcon.more(18, HF.ink3)}
    </div>
  );
}

function HFPostActions({ postId, shareGo = 'shareB' }) {
  const post = OFC.useStoreSlice(s => s.posts.find(p => p.id === postId));
  if (!post) return null;
  const stop = (e) => e && e.stopPropagation && e.stopPropagation();
  const onLike = (e) => {
    stop(e);
    OFC.toggleLike(postId);
    const after = OFC.postById(postId);
    window.UC.toast(after.liked ? '♥ LIKED' : 'UNLIKED', { accent: after.liked });
  };
  const onComment = (e) => { stop(e); window.UC.openComments(postId); };
  const onShare   = (e) => { stop(e); window.UC.navigate(shareGo); };
  const onSave    = (e) => {
    stop(e); OFC.toggleSave(postId);
    const after = OFC.postById(postId);
    window.UC.toast(after.saved ? '✓ SAVED' : 'UNSAVED', { accent: after.saved });
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '10px 14px 4px' }}>
      <div onClick={onLike} role="button" style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
        {HFIcon.heart(22, post.liked ? HF.accent : HF.ink, post.liked ? HF.accent : 'none')}
        <span style={{ fontFamily: HF.mono, fontSize: 12, fontWeight: 700, color: post.liked ? HF.accent : HF.ink }}>{post.likes}</span>
      </div>
      <div onClick={onComment} role="button" style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
        {HFIcon.comment(22, HF.ink)}
        <span style={{ fontFamily: HF.mono, fontSize: 12, fontWeight: 700 }}>{post.comments}</span>
      </div>
      <div onClick={onShare} role="button" style={{ cursor: 'pointer' }}>{HFIcon.share(22, HF.ink)}</div>
      <div style={{ flex: 1 }} />
      <div onClick={onSave} role="button" style={{ cursor: 'pointer' }}>
        {HFIcon.bookmark(22, post.saved ? HF.accent : HF.ink, post.saved ? HF.accent : 'none')}
      </div>
    </div>
  );
}

function HFAchievementPost({ postId }) {
  const post = OFC.useStoreSlice(s => s.posts.find(p => p.id === postId));
  if (!post) return null;
  const send = OFC.sendById(post.sendId);
  if (!send) return null;
  const gym = OFC.gymById(send.gym);
  return (
    <div style={{ margin: '0 12px 16px', background: HF.card, border: `1px solid ${HF.ruleSft}`, borderRadius: 4, overflow: 'hidden', boxShadow: `0 1px 0 ${HF.ruleSft}, 4px 4px 0 ${HF.rule}` }}>
      <HFPostHeader userId={post.user} where={`${gym.name} · ${gym.city}`} when={post.when} group={post.group} />
      <div style={{ position: 'relative' }}>
        <Photo src={send.src} height={340} dim={0.15}>
          <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(13,12,10,0.55)', backdropFilter: 'blur(10px)', borderRadius: 999, padding: '5px 10px', color: '#fff', fontFamily: HF.mono, fontSize: 10, fontWeight: 700, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 5 }}>
            {HFIcon.play(10)} 0:24
          </div>
          <div style={{ position: 'absolute', top: 12, left: 12, background: HF.accent, color: '#fff', padding: '6px 11px', fontFamily: HF.mono, fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', boxShadow: `2px 2px 0 ${HF.accent2}` }}>SENT ↑</div>
          <div style={{ position: 'absolute', left: 12, right: 12, bottom: 12, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8 }}>
            <div style={{ background: 'rgba(13,12,10,0.6)', backdropFilter: 'blur(14px)', padding: '10px 13px', borderRadius: 4, color: '#fff', flex: 1 }}>
              <div style={{ fontFamily: HF.mono, fontSize: 9, letterSpacing: 1.5, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', fontWeight: 700 }}>{send.hero ? 'FIRST OF GRADE · ' : ''}{`"${send.name}"`}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 4 }}>
                <span style={{ fontFamily: HF.display, fontSize: 28, letterSpacing: -0.8, lineHeight: 1 }}>{send.grade}</span>
                <span style={{ fontFamily: HF.mono, fontSize: 10, opacity: 0.85 }}>{send.attempts} ATT · {send.sessions} SESH</span>
              </div>
            </div>
          </div>
        </Photo>
      </div>
      {send.notes && (
        <div style={{ padding: '12px 14px 0', fontSize: 14, color: HF.ink, lineHeight: 1.45 }}>
          {send.notes} <span style={{ color: HF.accent, fontWeight: 600 }}>#first{send.grade}</span>
        </div>
      )}
      <HFPostActions postId={postId} shareGo="shareB" />
      <CommentPreview postId={postId} />
    </div>
  );
}

function CommentPreview({ postId }) {
  const post = OFC.useStoreSlice(s => s.posts.find(p => p.id === postId));
  const comments = OFC.useStoreSlice(s => s.comments[postId] || []);
  if (!post || comments.length === 0) return null;
  const c = comments[0];
  return (
    <div onClick={() => window.UC.openComments(postId)} style={{ padding: '4px 14px 14px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
      <HFAvatar size={22} src={OFC.avatarOf(c.who)} />
      <span style={{ fontFamily: HF.mono, fontSize: 11, color: HF.ink3, letterSpacing: 0.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        <b style={{ color: HF.ink }}>{c.who}</b> {c.body.length > 40 ? c.body.slice(0, 40) + '…' : c.body}
      </span>
      <div style={{ flex: 1 }} />
      <span style={{ fontFamily: HF.mono, fontSize: 9, color: HF.accent, fontWeight: 800, letterSpacing: 1, whiteSpace: 'nowrap' }}>VIEW {post.comments} →</span>
    </div>
  );
}

function HFEventPost({ postId }) {
  const post = OFC.useStoreSlice(s => s.posts.find(p => p.id === postId));
  if (!post) return null;
  const ev = OFC.useStoreSlice(s => s.events.find(e => e.id === post.eventId));
  if (!ev) return null;
  const going = ev.goingList.includes('you');
  const host = OFC.userById(ev.host);
  const onRsvp = (e) => {
    e.stopPropagation();
    const next = OFC.rsvpEvent(ev.id);
    window.UC.toast(next ? '✓ YOU\'RE GOING' : 'RSVP CANCELLED', { accent: next });
  };
  return (
    <div onClick={() => window.UC.openEvent(ev.id)} style={{ margin: '0 12px 16px', background: HF.paper2, border: `1px dashed ${HF.rule}`, borderRadius: 4, overflow: 'hidden', cursor: 'pointer' }}>
      <Photo src={ev.src} height={150} dim={0.5}>
        <div style={{ position: 'absolute', inset: 0, padding: 14, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <HFTag accent style={{ background: 'rgba(13,12,10,0.4)', backdropFilter: 'blur(8px)', borderColor: '#fff', color: '#fff' }}>EVENT · {ev.mo} {ev.date}</HFTag>
            <span style={{ fontFamily: HF.mono, fontSize: 10, color: 'rgba(255,255,255,0.85)', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>HOSTED BY {host ? host.name.split(' ')[0].toUpperCase() : '—'}</span>
          </div>
          <div>
            <div style={{ fontFamily: HF.display, fontSize: 28, color: '#fff', letterSpacing: -0.8, lineHeight: 1, textTransform: 'uppercase' }}>{ev.title}</div>
            <div style={{ fontFamily: HF.mono, fontSize: 10, color: 'rgba(255,255,255,0.85)', letterSpacing: 1, marginTop: 4, textTransform: 'uppercase' }}>{ev.time} · {ev.loc}</div>
          </div>
        </div>
      </Photo>
      <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ display: 'flex' }}>
          {ev.goingList.slice(0, 4).map((id, i) => (
            <div key={id + i} style={{ marginLeft: i === 0 ? 0 : -8 }}>
              <HFAvatar size={26} src={OFC.avatarOf(id)} />
            </div>
          ))}
        </div>
        <span style={{ fontFamily: HF.mono, fontSize: 10, color: HF.ink2, letterSpacing: 0.5, fontWeight: 700 }}>{ev.going} GOING</span>
        <div style={{ flex: 1 }} />
        <button onClick={onRsvp} style={{
          padding: '7px 14px',
          background: going ? HF.ink : HF.accent,
          color: '#fff', fontFamily: HF.mono, fontSize: 10, fontWeight: 800, letterSpacing: 1,
          textTransform: 'uppercase', boxShadow: `2px 2px 0 ${HF.rule}`,
          border: 'none', cursor: 'pointer',
        }}>{going ? '✓ GOING' : "I'M IN"}</button>
      </div>
    </div>
  );
}

function HFSessionPost({ postId }) {
  const post = OFC.useStoreSlice(s => s.posts.find(p => p.id === postId));
  if (!post) return null;
  const gym = post.sends && post.sends[0] ? OFC.gymById((OFC.sendById(post.sends[0]) || {}).gym) : null;
  return (
    <div style={{ margin: '0 12px 16px', background: HF.card, border: `1px solid ${HF.ruleSft}`, borderRadius: 4, overflow: 'hidden' }}>
      <HFPostHeader userId={post.user} where={gym ? `${gym.name} · ${gym.city}` : ''} when={post.when} />
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 2 }}>
        <Photo src={post.photos[0]} height={200} />
        <div style={{ display: 'grid', gap: 2, gridTemplateRows: '1fr 1fr' }}>
          {(post.photos.slice(1, 3)).map((p, i) => <Photo key={i} src={p} height={99} />)}
        </div>
      </div>
      <div style={{ padding: '12px 14px 0', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {post.stats.map((s, i) => i === post.stats.length - 1 && s.includes('PR')
          ? <HFTag key={i} accent filled>{s}</HFTag>
          : <HFTag key={i}>{s}</HFTag>)}
      </div>
      <div style={{ padding: '10px 14px 0', fontSize: 14, color: HF.ink, lineHeight: 1.45 }}>{post.caption}</div>
      <HFPostActions postId={postId} shareGo="shareC" />
      <CommentPreview postId={postId} />
    </div>
  );
}

function HFFeedScreen() {
  const posts = OFC.useStoreSlice(s => s.posts);
  return (
    <HFPhone>
      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, bottom: 80, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
        <HFFeedHeader />
        <div style={{ borderTop: `1px solid ${HF.ruleSft}` }} />
        <HFStoryRail />
        <div style={{ borderTop: `1px solid ${HF.ruleSft}`, paddingTop: 14 }}>
          {posts.map(p => {
            if (p.kind === 'send')    return <HFAchievementPost key={p.id} postId={p.id} />;
            if (p.kind === 'event')   return <HFEventPost      key={p.id} postId={p.id} />;
            if (p.kind === 'session') return <HFSessionPost    key={p.id} postId={p.id} />;
            return null;
          })}
          <div style={{ padding: '20px 16px 24px', textAlign: 'center' }}>
            <span style={{ fontFamily: HF.mono, fontSize: 10, letterSpacing: 1.5, color: HF.ink3, fontWeight: 800, textTransform: 'uppercase' }}>━ END OF FEED ━</span>
          </div>
        </div>
      </div>
      <HFTabBar active="home" />
    </HFPhone>
  );
}

// ─── Comments sheet ─────────────────────────────────────────
function HFCommentSheet({ postId }) {
  const comments = OFC.useStoreSlice(s => s.comments[postId] || []);
  const [draft, setDraft] = React.useState('');
  const send = () => {
    if (!draft.trim()) return;
    OFC.postComment(postId, draft);
    setDraft('');
    window.UC.toast('COMMENT POSTED', { accent: true });
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '4px 16px 12px', flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {comments.map((c, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: i < comments.length - 1 ? `1px solid ${HF.ruleSft}` : 'none' }}>
            <HFAvatar size={30} src={OFC.avatarOf(c.who)} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ fontWeight: 800, fontSize: 13, color: HF.ink }}>@{c.who}</span>
                <span style={{ fontFamily: HF.mono, fontSize: 9, color: HF.ink3, letterSpacing: 1, fontWeight: 700 }}>{c.when}</span>
              </div>
              <div style={{ fontSize: 13, color: HF.ink, lineHeight: 1.4, marginTop: 2 }}>{c.body}</div>
              <div onClick={() => OFC.toggleCommentLike(postId, i)} style={{ display: 'flex', gap: 14, marginTop: 6, fontFamily: HF.mono, fontSize: 9, color: c.liked ? HF.accent : HF.ink3, letterSpacing: 1, fontWeight: 700, cursor: 'pointer' }}>
                <span>{c.liked ? '♥' : '♡'} {c.likes}</span>
                <span>REPLY</span>
              </div>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <div style={{ padding: '40px 0', textAlign: 'center', fontFamily: HF.mono, fontSize: 11, color: HF.ink3, letterSpacing: 1, fontWeight: 700, textTransform: 'uppercase' }}>BE THE FIRST TO COMMENT</div>
        )}
      </div>
      <div style={{
        padding: '10px 14px 14px', borderTop: `1px solid ${HF.ruleSft}`, background: HF.card,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <HFAvatar size={30} src={OFC.avatarOf('you')} />
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Add a comment…"
          style={{
            flex: 1, height: 36, padding: '0 12px',
            border: `1.5px solid ${HF.ruleSft}`, background: HF.paper,
            fontSize: 13, color: HF.ink, outline: 'none', fontFamily: HF.sans,
          }}
        />
        <button onClick={send} style={{
          width: 36, height: 36, borderRadius: '50%', background: HF.accent, color: '#fff',
          border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>{HFIcon.send(15, '#fff')}</button>
      </div>
    </div>
  );
}

// ─── Notifications ──────────────────────────────────────────
function HFNotificationsScreen() {
  const items = OFC.useStoreSlice(s => s.notifications);
  const iconFor = (t) => ({ like:'♥', comment:'✎', rsvp:'✓', follow:'+', mention:'@', send:'↑', crew:'◇', system:'·' }[t] || '·');
  return (
    <HFPhone>
      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, bottom: 80, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
        <div style={{ padding: '8px 16px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div onClick={() => window.UC.navigate('feed')} style={{ cursor: 'pointer' }}>
            <HFIconBtn size={32}>{HFIcon.back(14)}</HFIconBtn>
          </div>
          <div style={{ fontFamily: HF.display, fontSize: 24, letterSpacing: -0.6, textTransform: 'uppercase' }}>NOTIFICATIONS</div>
          <div style={{ flex: 1 }} />
          <button onClick={() => { OFC.markAllNotifsRead(); window.UC.toast('ALL READ', { accent: true }); }} style={{
            fontFamily: HF.mono, fontSize: 9, fontWeight: 800, letterSpacing: 1.2,
            color: HF.accent, background: 'transparent', border: `1.5px solid ${HF.accent}`,
            padding: '6px 8px', cursor: 'pointer', textTransform: 'uppercase',
          }}>MARK ALL READ</button>
        </div>
        <div style={{ padding: '0 14px 12px' }}>
          {['NEW', 'EARLIER'].map((section) => {
            const isNew = section === 'NEW';
            const sub = items.filter(n => isNew ? n.unread : !n.unread);
            if (!sub.length) return null;
            return (
              <div key={section}>
                <div style={{ fontFamily: HF.mono, fontSize: 9, letterSpacing: 1.5, color: HF.ink3, fontWeight: 800, textTransform: 'uppercase', padding: '12px 4px 6px' }}>{section}</div>
                {sub.map(n => (
                  <div key={n.id} onClick={() => OFC.tapNotif(n.id)} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '12px 8px',
                    background: n.unread ? HF.card : 'transparent',
                    border: `1px solid ${n.unread ? HF.ruleSft : 'transparent'}`,
                    borderLeft: n.unread ? `3px solid ${HF.accent}` : '3px solid transparent',
                    marginBottom: 6, cursor: 'pointer',
                  }}>
                    <div style={{ position: 'relative' }}>
                      <HFAvatar size={36} src={OFC.avatarOf(n.who.toLowerCase()) || HF_IMG.you} label={n.who.slice(0, 2).toUpperCase()} />
                      <span style={{ position: 'absolute', bottom: -2, right: -2, width: 18, height: 18, borderRadius: '50%', background: HF.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, border: `2px solid ${HF.paper}` }}>{iconFor(n.type)}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, color: HF.ink, lineHeight: 1.35 }}><b>{n.who}</b> {n.body}</div>
                      <div style={{ fontFamily: HF.mono, fontSize: 9, color: HF.ink3, letterSpacing: 1, fontWeight: 700, marginTop: 3 }}>{n.when} AGO</div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      <HFTabBar active="home" />
    </HFPhone>
  );
}

Object.assign(window, { HFFeedScreen, HFAchievementPost, HFCommentSheet, HFNotificationsScreen });
