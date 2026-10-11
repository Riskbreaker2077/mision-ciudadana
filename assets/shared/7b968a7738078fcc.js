// m5-modules.jsx — Bloques 6, 7, 8 · Misión Ciudadana Módulo 5
// Mecanismos de protección ciudadana

// ── BadgeAward — overlay fixed (cubre el viewport) ────────
function BadgeAward({ shown, color = "yellow", letter, title, subtitle, onClose }) {
  React.useEffect(() => {
    if (!shown) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [shown]);

  if (!shown) return null;
  const confettiColors = ["#5f0f40","#9a031e","#fb8b24","#e36414","#0f4c5c","#fdeacd"];
  const confetti = [];
  for (let i = 0; i < 22; i++) {
    confetti.push(
      <div key={i} className="confetti" style={{
        left: `${Math.random()*100}%`,
        top: -20,
        background: confettiColors[i % confettiColors.length],
        animationDelay: `${Math.random()*0.6}s`,
        transform: `rotate(${Math.random()*360}deg)`,
      }} />
    );
  }
  return (
    <div className="badge-overlay">
      {confetti}
      <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-green)", letterSpacing: "0.2em", marginBottom: 12 }}>
        ▸ INSIGNIA DESBLOQUEADA
      </div>
      <div className="badge pop-in" style={{ width: 160, height: 160, marginBottom: 18 }}>
        <div className="badge-core glow-pulse" style={{
          width: 140, height: 140, fontSize: 36,
          background: `linear-gradient(135deg, var(--neon-${color}), var(--neon-purple))`,
          color: "var(--cream)",
        }}>{letter}</div>
      </div>
      <div className={`h-arcade glow-${color}`} style={{ fontSize: 16, color: `var(--neon-${color})`, marginBottom: 8, textAlign: "center", lineHeight: 1.5 }}>
        {title}
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 19, color: "var(--ink)", marginBottom: 24, lineHeight: 1.2, maxWidth: 300, textAlign: "center" }}>
        {subtitle}
      </div>
      <button className={`px-btn px-btn--${color}`} onClick={onClose}>
        AL MAPA ▸
      </button>
    </div>
  );
}

function YTEmbed({ id }) {
  return (
    <div className="embed-wrap">
      <iframe
        src={`https://www.youtube.com/embed/${id}?rel=0`}
        title={`YouTube video ${id}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}

function CanvaEmbed({ designUrl, color = "cyan" }) {
  const embedSrc = designUrl.endsWith("?embed") ? designUrl : `${designUrl}?embed`;
  return (
    <>
      <div style={{
        position: "relative", width: "100%", height: 0, paddingTop: "56.25%",
        border: `2px solid var(--neon-${color})`,
        boxShadow: `4px 4px 0 #08040a, 4px 4px 0 2px var(--neon-${color})`,
        overflow: "hidden", background: "#000",
      }}>
        <iframe
          loading="lazy"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
          src={embedSrc}
          title="Presentación Canva"
          allow="fullscreen"
          allowFullScreen
        />
      </div>
      <a
        href={designUrl}
        target="_blank"
        rel="noopener"
        style={{
          display: "inline-block", marginTop: 10,
          fontFamily: "var(--font-mono)", fontSize: 18, color: `var(--neon-${color})`,
          textDecoration: "underline", lineHeight: 1.2,
        }}
      >↗ Abrir presentación en Canva</a>
    </>
  );
}

function WordwallEmbed({ src, color = "orange" }) {
  return (
    <div style={{
      position: "relative", width: "100%", height: 0, paddingTop: "76%",
      border: `2px solid var(--neon-${color})`,
      boxShadow: `4px 4px 0 #08040a, 4px 4px 0 2px var(--neon-${color})`,
      overflow: "hidden", background: "#000",
    }}>
      <iframe
        loading="lazy"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
        src={src}
        title="Wordwall — actividad"
        allowFullScreen
      />
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// BLOQUE 6 — CONTENIDO
// Insignia: GUARDIANES DE DERECHOS
// ────────────────────────────────────────────────────────────
function Block6Content({ go, state, setState }) {
  const tabs = [
    { label: "VIDEO INTRO",  color: "orange", kind: "yt",     src: "i7utTqN5SB8" },
    { label: "CANVA · MEC",  color: "cyan",   kind: "canva",  src: "https://www.canva.com/design/DAHI3Lh6u2c/tvgS0NIHLr38GGQzV8cVyg/view" },
    { label: "WORDWALL 1",   color: "orange", kind: "ww",     src: "https://wordwall.net/es/embed/72016bee34e547fa8fa8e7b232425d01?themeId=23&templateId=49&fontStackId=0" },
    { label: "CANVA · TUT",  color: "cyan",   kind: "canva",  src: "https://www.canva.com/design/DAHI3LNAKx0/N1-aVaTxicEHdYPn1mZozg/view" },
    { label: "SHORT",        color: "pink",   kind: "yt",     src: "1xCZHKkOAMY" },
    { label: "WORDWALL 2",   color: "orange", kind: "ww",     src: "https://wordwall.net/es/embed/4dc7258cfec247e3aa69500c31ac8179?themeId=22&templateId=71&fontStackId=0" },
    { label: "WORDWALL 3",   color: "orange", kind: "ww",     src: "https://wordwall.net/es/embed/52ded8d35a4f488580ecdef26b5adf14?themeId=22&templateId=45&fontStackId=0" },
    { label: "WORDWALL 4",   color: "orange", kind: "ww",     src: "https://wordwall.net/es/embed/fe5599d37aff49a6b3f878de571138c0?themeId=1&templateId=23&fontStackId=0" },
  ];

  const TOTAL = tabs.length;
  const [tab, setTab] = React.useState(0);
  const initialSeen = (state.b6Seen && state.b6Seen.length >= TOTAL)
    ? state.b6Seen.slice(0, TOTAL) : Array(TOTAL).fill(false);
  const [seen, setSeen] = React.useState(initialSeen);
  const allSeen = seen.every(Boolean);
  const [showBadge, setShowBadge] = React.useState(false);
  const alreadyAwarded = (state.badges || [])[0];

  const toggleSeen = (idx) => {
    setSeen(prev => {
      const n = [...prev]; n[idx] = !n[idx];
      setState(s => ({ ...s, b6Seen: n }));
      return n;
    });
  };

  const award = () => {
    setState(s => {
      const b = [...(s.badges || [false,false,false])]; b[0] = true;
      return { ...s, badges: b };
    });
    setShowBadge(true);
  };

  const t = tabs[tab];

  return (
    <div className="screen-body" style={{ paddingBottom: 130 }}>
      <h2 className="h-arcade glow-orange" style={{ fontSize: 19, color: "var(--neon-orange)", margin: "6px 0 10px", lineHeight: 1.5 }}>
        PARTE 1<br />CONTENIDO
      </h2>

      <div className="px-card px-card--orange" style={{ marginBottom: 14, padding: 14 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 10, color: "var(--neon-orange)", marginBottom: 6, letterSpacing: "0.08em" }}>
          🎯 OBJETIVO
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 19, lineHeight: 1.2, margin: 0 }}>
          Comprende qué son los <span style={{ color: "var(--neon-green)" }}>mecanismos de protección ciudadana</span> y
          para qué sirven: tutela, habeas corpus, derecho de petición y más.
        </p>
      </div>

      <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-yellow)", margin: "10px 0 8px", letterSpacing: "0.08em" }}>
        ★ INSTRUCCIONES
      </div>
      <ol className="steps" style={{ marginBottom: 18 }}>
        <li>Observa el <strong>video</strong> explicativo.</li>
        <li>Revisa la <strong>presentación</strong> de mecanismos y luego la de <strong>tutela, habeas corpus y derecho de petición</strong>.</li>
        <li>Mira el <strong>short</strong> de apoyo y analízalo bien.</li>
        <li>Resuelve las <strong>actividades en Wordwall</strong>.</li>
        <li>El equipo con mejor puntaje recibe la insignia <strong style={{ color: "var(--neon-orange)" }}>Guardianes de Derechos</strong>.</li>
      </ol>

      {/* Tab strip */}
      <div style={{ display: "flex", gap: 4, marginBottom: 10, overflowX: "auto", paddingBottom: 4 }}>
        {tabs.map((tt, i) => (
          <button key={i} onClick={() => setTab(i)} style={{
            flex: "0 0 auto",
            fontFamily: "var(--font-arcade)", fontSize: 10,
            padding: "8px 9px",
            background: tab === i ? `var(--neon-${tt.color})` : "transparent",
            color: tab === i ? "#160a14" : `var(--neon-${tt.color})`,
            border: `2px solid var(--neon-${tt.color})`,
            cursor: "pointer", letterSpacing: "0.05em", whiteSpace: "nowrap",
            position: "relative",
          }}>
            {seen[i] && (
              <span style={{
                position: "absolute", top: -6, right: -6,
                background: "var(--neon-green)", color: "#160a14",
                width: 14, height: 14, fontSize: 9,
                display: "grid", placeItems: "center",
                border: "1px solid #160a14",
              }}>✓</span>
            )}
            {tt.label}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: 12 }}>
        {t.kind === "yt"    && <YTEmbed     id={t.src} />}
        {t.kind === "canva" && <CanvaEmbed  designUrl={t.src} color={t.color} />}
        {t.kind === "ww"    && <WordwallEmbed src={t.src} color={t.color} />}

        <button
          className={`px-btn ${seen[tab] ? "px-btn--green" : `px-btn--${t.color}`}`}
          style={{ width: "100%", marginTop: 12, fontSize: 12 }}
          onClick={() => toggleSeen(tab)}
        >
          {seen[tab] ? "✓ MARCADO COMO VISTO" : "MARCAR COMO VISTO"}
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <ProgressBar value={seen.filter(Boolean).length} total={TOTAL} />
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-green)", whiteSpace: "nowrap" }}>
          {seen.filter(Boolean).length}/{TOTAL}
        </div>
      </div>

      <div className="px-card px-card--yellow" style={{ padding: 12, marginBottom: 12 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-yellow)", marginBottom: 6 }}>
          ✎ INSIGNIA EN JUEGO
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 18, margin: 0, lineHeight: 1.2 }}>
          El equipo con mejor puntaje en los Wordwall recibe la insignia{" "}
          <strong style={{ color: "var(--neon-orange)" }}>Guardianes de Derechos</strong>.
        </p>
      </div>

      <button
        className="px-btn px-btn--green"
        disabled={!allSeen || alreadyAwarded}
        style={{ width: "100%", fontSize: 13 }}
        onClick={award}
      >
        {alreadyAwarded ? "★ INSIGNIA OBTENIDA ★" : allSeen ? "★ RECLAMAR INSIGNIA ★" : `Completa los ${TOTAL} recursos (${seen.filter(Boolean).length}/${TOTAL})`}
      </button>

      <div style={{ marginTop: 12 }}>
        <button className="px-btn px-btn--ghost" onClick={() => go(5)}>← MAPA</button>
      </div>

      <BadgeAward
        shown={showBadge}
        color="orange"
        letter="A"
        title="GUARDIANES DE DERECHOS"
        subtitle="¡Conoces los mecanismos de protección ciudadana!"
        onClose={() => { setShowBadge(false); go(5); }}
      />
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// BLOQUE 7 — ENTRENAMIENTO
// Insignia: DEFENSORES DE DERECHOS
// ────────────────────────────────────────────────────────────
function Block7Training({ go, state, setState }) {
  const tabs = [
    { label: "CASOS REALES", color: "orange", kind: "yt", src: "pr_vZ9U5LgQ" },
    { label: "LA TUTELA",    color: "cyan",   kind: "yt", src: "Hl3NvH6ovG0" },
    { label: "WORDWALL",     color: "green",  kind: "ww", src: "https://wordwall.net/es/embed/9f6df88936d94ab1a7bdc40eee4ccf0f?themeId=1&templateId=5&fontStackId=0" },
  ];
  const TOTAL = tabs.length;
  const [tab, setTab] = React.useState(0);
  const initialSeen = (state.b7Steps && state.b7Steps.length >= TOTAL)
    ? state.b7Steps.slice(0, TOTAL) : Array(TOTAL).fill(false);
  const [seen, setSeen] = React.useState(initialSeen);
  const allSeen = seen.every(Boolean);
  const [showBadge, setShowBadge] = React.useState(false);
  const alreadyAwarded = (state.badges || [])[1];

  const toggleSeen = (idx) => {
    setSeen(prev => {
      const n = [...prev]; n[idx] = !n[idx];
      const padded = n.length >= 6 ? n : [...n, ...Array(6 - n.length).fill(false)];
      setState(s => ({ ...s, b7Steps: padded }));
      return n;
    });
  };

  const award = () => {
    setState(s => {
      const b = [...(s.badges || [false,false,false])]; b[1] = true;
      return { ...s, badges: b, b7Done: true };
    });
    setShowBadge(true);
  };

  const t = tabs[tab];

  return (
    <div className="screen-body" style={{ paddingBottom: 130 }}>
      <h2 className="h-arcade glow-green" style={{ fontSize: 19, color: "var(--neon-green)", margin: "6px 0 10px", lineHeight: 1.5 }}>
        PARTE 2<br />ENTRENAMIENTO
      </h2>

      <div className="px-card px-card--green" style={{ marginBottom: 14, padding: 14 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 10, color: "var(--neon-green)", marginBottom: 6, letterSpacing: "0.08em" }}>
          🎯 OBJETIVO
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 19, lineHeight: 1.2, margin: 0 }}>
          Aplica los mecanismos a <span style={{ color: "var(--neon-yellow)" }}>situaciones reales</span> de
          vulneración de derechos en Colombia.
        </p>
      </div>

      <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-yellow)", margin: "10px 0 8px", letterSpacing: "0.08em" }}>
        ★ INSTRUCCIONES
      </div>
      <ol className="steps" style={{ marginBottom: 18 }}>
        <li>Observa el video sobre <strong>casos reales</strong> donde colombianos usaron mecanismos de protección.</li>
        <li>Mira el video de apoyo <em>"La tutela y la protección de derechos en Colombia"</em>.</li>
        <li>Participa en el concurso <strong>Wordwall</strong> con tu equipo.</li>
        <li>El equipo con mayor puntaje gana la insignia <strong style={{ color: "var(--neon-green)" }}>Defensores de Derechos</strong>.</li>
      </ol>

      <div style={{ display: "flex", gap: 4, marginBottom: 10, overflowX: "auto", paddingBottom: 4 }}>
        {tabs.map((tt, i) => (
          <button key={i} onClick={() => setTab(i)} style={{
            flex: "0 0 auto",
            fontFamily: "var(--font-arcade)", fontSize: 11,
            padding: "8px 10px",
            background: tab === i ? `var(--neon-${tt.color})` : "transparent",
            color: tab === i ? "#160a14" : `var(--neon-${tt.color})`,
            border: `2px solid var(--neon-${tt.color})`,
            cursor: "pointer", letterSpacing: "0.06em", whiteSpace: "nowrap",
            position: "relative",
          }}>
            {seen[i] && (
              <span style={{
                position: "absolute", top: -6, right: -6,
                background: "var(--neon-green)", color: "#160a14",
                width: 14, height: 14, fontSize: 9,
                display: "grid", placeItems: "center",
                border: "1px solid #160a14",
              }}>✓</span>
            )}
            {tt.label}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: 12 }}>
        {t.kind === "yt" && <YTEmbed id={t.src} />}
        {t.kind === "ww" && <WordwallEmbed src={t.src} color={t.color} />}

        <button
          className={`px-btn ${seen[tab] ? "px-btn--green" : `px-btn--${t.color}`}`}
          style={{ width: "100%", marginTop: 12, fontSize: 12 }}
          onClick={() => toggleSeen(tab)}
        >
          {seen[tab] ? "✓ MARCADO COMO VISTO" : "MARCAR COMO VISTO"}
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <ProgressBar value={seen.filter(Boolean).length} total={TOTAL} />
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-green)", whiteSpace: "nowrap" }}>
          {seen.filter(Boolean).length}/{TOTAL}
        </div>
      </div>

      <div className="px-card px-card--yellow" style={{ padding: 12, marginBottom: 12 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-yellow)", marginBottom: 6 }}>
          ✎ INSIGNIA EN JUEGO
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 18, margin: 0, lineHeight: 1.2 }}>
          El equipo con mayor puntaje en Wordwall gana la insignia{" "}
          <strong style={{ color: "var(--neon-green)" }}>Defensores de Derechos</strong>.
        </p>
      </div>

      <button
        className="px-btn px-btn--green"
        disabled={!allSeen || alreadyAwarded}
        style={{ width: "100%", fontSize: 13 }}
        onClick={award}
      >
        {alreadyAwarded ? "★ INSIGNIA OBTENIDA ★" : allSeen ? "★ RECLAMAR INSIGNIA ★" : `Completa los ${TOTAL} recursos (${seen.filter(Boolean).length}/${TOTAL})`}
      </button>

      <div style={{ marginTop: 12 }}>
        <button className="px-btn px-btn--ghost" onClick={() => go(5)}>← MAPA</button>
      </div>

      <BadgeAward
        shown={showBadge}
        color="green"
        letter="B"
        title="DEFENSORES DE DERECHOS"
        subtitle="¡Aplicaste los mecanismos a casos reales en Colombia!"
        onClose={() => { setShowBadge(false); go(5); }}
      />
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// BLOQUE 8 — VIAJE
// Insignia: PROTECTORES DEL PUEBLO
// ────────────────────────────────────────────────────────────
function Block8Journey({ go, state, setState }) {
  const tabs = [
    { label: "LABERINTO", color: "cyan", kind: "ww", src: "https://wordwall.net/es/embed/c58c1b7a1fbb42018ba732c03e02ba37?themeId=23&templateId=49&fontStackId=0" },
  ];
  const TOTAL = tabs.length;
  const [tab, setTab] = React.useState(0);
  const initialSeen = (state.qrFound && state.qrFound.length >= TOTAL)
    ? state.qrFound.slice(0, TOTAL) : Array(TOTAL).fill(false);
  const [seen, setSeen] = React.useState(initialSeen);
  const allSeen = seen.every(Boolean);
  const [showBadge, setShowBadge] = React.useState(false);
  const alreadyAwarded = (state.badges || [])[2];

  const toggleSeen = (idx) => {
    setSeen(prev => {
      const n = [...prev]; n[idx] = !n[idx];
      const padded = [...n, ...Array(10 - n.length).fill(false)];
      setState(s => ({ ...s, qrFound: padded }));
      return n;
    });
  };

  const award = () => {
    setState(s => {
      const b = [...(s.badges || [false,false,false])]; b[2] = true;
      return { ...s, badges: b };
    });
    setShowBadge(true);
  };

  const t = tabs[tab];

  return (
    <div className="screen-body" style={{ paddingBottom: 130 }}>
      <h2 className="h-arcade glow-cyan" style={{ fontSize: 19, color: "var(--neon-cyan)", margin: "6px 0 10px", lineHeight: 1.5 }}>
        PARTE 3<br />VIAJE
      </h2>

      <div className="px-card px-card--cyan" style={{ marginBottom: 14, padding: 14 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 10, color: "var(--neon-cyan)", marginBottom: 6, letterSpacing: "0.08em" }}>
          🎯 OBJETIVO
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 19, lineHeight: 1.2, margin: 0 }}>
          Relaciona los mecanismos con <span style={{ color: "var(--neon-yellow)" }}>casos reales</span> de
          protección en Colombia.
        </p>
      </div>

      <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-yellow)", margin: "10px 0 8px", letterSpacing: "0.08em" }}>
        ★ INSTRUCCIONES
      </div>
      <ol className="steps" style={{ marginBottom: 18 }}>
        <li>Resuelve el <strong>laberinto</strong> en Wordwall con tu equipo: <span style={{ color: "var(--neon-green)" }}>{state.groupName || "____"}</span></li>
        <li>Suma el mejor puntaje en el menor tiempo posible.</li>
        <li>El equipo con mejor puntaje + menor tiempo gana la insignia <strong style={{ color: "var(--neon-cyan)" }}>Protectores del Pueblo</strong>.</li>
      </ol>

      <div style={{ display: "flex", gap: 4, marginBottom: 10, overflowX: "auto", paddingBottom: 4 }}>
        {tabs.map((tt, i) => (
          <button key={i} onClick={() => setTab(i)} style={{
            flex: "0 0 auto",
            fontFamily: "var(--font-arcade)", fontSize: 11,
            padding: "8px 10px",
            background: tab === i ? `var(--neon-${tt.color})` : "transparent",
            color: tab === i ? "#160a14" : `var(--neon-${tt.color})`,
            border: `2px solid var(--neon-${tt.color})`,
            cursor: "pointer", letterSpacing: "0.06em", whiteSpace: "nowrap",
            position: "relative",
          }}>
            {seen[i] && (
              <span style={{
                position: "absolute", top: -6, right: -6,
                background: "var(--neon-green)", color: "#160a14",
                width: 14, height: 14, fontSize: 9,
                display: "grid", placeItems: "center",
                border: "1px solid #160a14",
              }}>✓</span>
            )}
            {tt.label}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: 12 }}>
        {t.kind === "ww" && <WordwallEmbed src={t.src} color={t.color} />}

        <button
          className={`px-btn ${seen[tab] ? "px-btn--green" : `px-btn--${t.color}`}`}
          style={{ width: "100%", marginTop: 12, fontSize: 12 }}
          onClick={() => toggleSeen(tab)}
        >
          {seen[tab] ? "✓ MARCADO COMO VISTO" : "MARCAR COMO VISTO"}
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <ProgressBar value={seen.filter(Boolean).length} total={TOTAL} />
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-green)", whiteSpace: "nowrap" }}>
          {seen.filter(Boolean).length}/{TOTAL}
        </div>
      </div>

      <div className="px-card px-card--yellow" style={{ padding: 12, marginBottom: 12 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-yellow)", marginBottom: 6 }}>
          ✎ INSIGNIA EN JUEGO
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 18, margin: 0, lineHeight: 1.2 }}>
          Mejor puntaje + menor tiempo gana la insignia{" "}
          <strong style={{ color: "var(--neon-cyan)" }}>Protectores del Pueblo</strong>.
        </p>
      </div>

      <button
        className="px-btn px-btn--green"
        disabled={!allSeen || alreadyAwarded}
        style={{ width: "100%", fontSize: 13 }}
        onClick={award}
      >
        {alreadyAwarded ? "★ INSIGNIA OBTENIDA ★" : allSeen ? "★ RECLAMAR INSIGNIA ★" : `Completa la actividad (${seen.filter(Boolean).length}/${TOTAL})`}
      </button>

      <div style={{ marginTop: 12 }}>
        <button className="px-btn px-btn--ghost" onClick={() => go(5)}>← MAPA</button>
      </div>

      <BadgeAward
        shown={showBadge}
        color="cyan"
        letter="C"
        title="PROTECTORES DEL PUEBLO"
        subtitle={`¡${state.groupName || "Equipo"} resuelve casos reales de protección!`}
        onClose={() => { setShowBadge(false); go(5); }}
      />
    </div>
  );
}

Object.assign(window, {
  Block6Content, Block7Training, Block8Journey, BadgeAward, YTEmbed,
  CanvaEmbed, WordwallEmbed,
});
