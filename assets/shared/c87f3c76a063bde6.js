// m4-modules.jsx — Bloques 6, 7, 8 · Misión Ciudadana Módulo 4
// Mecanismos de participación ciudadana

// ── BadgeAward — overlay fixed (cubre el viewport) ────────
function BadgeAward({ shown, color = "yellow", letter, title, subtitle, onClose }) {
  React.useEffect(() => {
    if (!shown) return;
    // Bloquea scroll del body mientras se muestra
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [shown]);

  if (!shown) return null;
  const confettiColors = ["#386641","#6a994e","#a7c957","#f2e8cf","#bc4749","#d96062"];
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
      <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-cyan)", letterSpacing: "0.2em", marginBottom: 12 }}>
        ▸ INSIGNIA DESBLOQUEADA
      </div>
      <div className="badge pop-in" style={{ width: 160, height: 160, marginBottom: 18 }}>
        <div className="badge-core glow-pulse" style={{
          width: 140, height: 140, fontSize: 36,
          background: `linear-gradient(135deg, var(--neon-${color}), var(--neon-purple))`,
          color: "#f2e8cf",
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

// ────────────────────────────────────────────────────────────
// BLOQUE 6 — CONTENIDO
// Insignia: CIUDADANOS ACTIVOS
// ────────────────────────────────────────────────────────────
function Block6Content({ go, state, setState }) {
  const [tab, setTab] = React.useState(0);
  const initialSeen = (state.b6Seen && state.b6Seen.length >= 3)
    ? state.b6Seen.slice(0, 3) : [false, false, false];
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

  const tabs = [
    { label: "VIDEO",         color: "purple" },
    { label: "PRESENTACIÓN",  color: "cyan"   },
    { label: "WORDWALL",      color: "orange" },
  ];

  const award = () => {
    setState(s => {
      const b = [...(s.badges || [false,false,false])]; b[0] = true;
      return { ...s, badges: b };
    });
    setShowBadge(true);
  };

  return (
    <div className="screen-body" style={{ paddingBottom: 130 }}>
      <h2 className="h-arcade glow-cyan" style={{ fontSize: 19, color: "var(--neon-cyan)", margin: "6px 0 10px", lineHeight: 1.5 }}>
        PARTE 1<br />CONTENIDO
      </h2>

      <div className="px-card px-card--cyan" style={{ marginBottom: 14, padding: 14 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 10, color: "var(--neon-cyan)", marginBottom: 6, letterSpacing: "0.08em" }}>
          🎯 OBJETIVO
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 19, lineHeight: 1.2, margin: 0 }}>
          Comprende qué son los <span style={{ color: "var(--neon-yellow)" }}>mecanismos de participación</span> ciudadana
          y para qué sirven.
        </p>
      </div>

      <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-yellow)", margin: "10px 0 8px", letterSpacing: "0.08em" }}>
        ★ INSTRUCCIONES
      </div>
      <ol className="steps" style={{ marginBottom: 18 }}>
        <li>Observa el <strong>video</strong> introductorio.</li>
        <li>Revisa la <strong>presentación</strong> en Canva.</li>
        <li>Resuelve la actividad en <strong>Wordwall</strong>.</li>
        <li>El equipo con mejor puntaje recibe la insignia <strong style={{ color: "var(--neon-cyan)" }}>Ciudadanos Activos</strong>.</li>
      </ol>

      {/* Tab strip */}
      <div style={{ display: "flex", gap: 4, marginBottom: 10, overflowX: "auto", paddingBottom: 4 }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)} style={{
            flex: "0 0 auto",
            fontFamily: "var(--font-arcade)", fontSize: 11,
            padding: "8px 10px",
            background: tab === i ? `var(--neon-${t.color})` : "transparent",
            color: tab === i ? "#1a2818" : `var(--neon-${t.color})`,
            border: `2px solid var(--neon-${t.color})`,
            cursor: "pointer", letterSpacing: "0.06em", whiteSpace: "nowrap",
            position: "relative",
          }}>
            {seen[i] && (
              <span style={{
                position: "absolute", top: -6, right: -6,
                background: "var(--neon-cyan)", color: "#1a2818",
                width: 14, height: 14, fontSize: 9,
                display: "grid", placeItems: "center",
                border: "1px solid #1a2818",
              }}>✓</span>
            )}
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: 12 }}>
        {tab === 0 && <YTEmbed id="NvnU8rznTiE" />}

        {tab === 1 && (
          <>
            <div style={{
              position: "relative", width: "100%", height: 0, paddingTop: "56.25%",
              border: "2px solid var(--neon-cyan)",
              boxShadow: "4px 4px 0 #0a140a, 4px 4px 0 2px var(--neon-cyan)",
              overflow: "hidden", background: "#000",
            }}>
              <iframe
                loading="lazy"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                src="https://www.canva.com/design/DAHI2bf3on4/P_aaAvMmKWVH6dkywXaAEQ/view?embed"
                title="Mecanismos de participación ciudadana — Presentación"
                allow="fullscreen"
                allowFullScreen
              />
            </div>
            <a
              href="https://www.canva.com/design/DAHI2bf3on4/P_aaAvMmKWVH6dkywXaAEQ/view"
              target="_blank"
              rel="noopener"
              style={{
                display: "inline-block", marginTop: 10,
                fontFamily: "var(--font-mono)", fontSize: 18, color: "var(--neon-cyan)",
                textDecoration: "underline", lineHeight: 1.2,
              }}
            >↗ Abrir presentación en Canva</a>
          </>
        )}

        {tab === 2 && (
          <div style={{
            position: "relative", width: "100%", height: 0, paddingTop: "76%",
            border: "2px solid var(--neon-orange)",
            boxShadow: "4px 4px 0 #0a140a, 4px 4px 0 2px var(--neon-orange)",
            overflow: "hidden", background: "#000",
          }}>
            <iframe
              loading="lazy"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
              src="https://wordwall.net/es/embed/a0d8c32d5ad1454ab4daa3c898f54ede?themeId=1&templateId=5&fontStackId=0"
              title="Mecanismos de participación — Wordwall"
              allowFullScreen
            />
          </div>
        )}

        <button
          className={`px-btn ${seen[tab] ? "px-btn--green" : "px-btn--cyan"}`}
          style={{ width: "100%", marginTop: 12, fontSize: 12 }}
          onClick={() => toggleSeen(tab)}
        >
          {seen[tab] ? "✓ MARCADO COMO VISTO" : "MARCAR COMO VISTO"}
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <ProgressBar value={seen.filter(Boolean).length} total={3} />
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-cyan)", whiteSpace: "nowrap" }}>
          {seen.filter(Boolean).length}/3
        </div>
      </div>

      <div className="px-card px-card--yellow" style={{ padding: 12, marginBottom: 12 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-yellow)", marginBottom: 6 }}>
          ✎ INSIGNIA EN JUEGO
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 18, margin: 0, lineHeight: 1.2 }}>
          El equipo con mejor puntaje en Wordwall recibe la insignia{" "}
          <strong style={{ color: "var(--neon-cyan)" }}>Ciudadanos Activos</strong>.
        </p>
      </div>

      <button
        className="px-btn px-btn--green"
        disabled={!allSeen || alreadyAwarded}
        style={{ width: "100%", fontSize: 13 }}
        onClick={award}
      >
        {alreadyAwarded ? "★ INSIGNIA OBTENIDA ★" : allSeen ? "★ RECLAMAR INSIGNIA ★" : `Completa los 3 recursos (${seen.filter(Boolean).length}/3)`}
      </button>

      <div style={{ marginTop: 12 }}>
        <button className="px-btn px-btn--ghost" onClick={() => go(5)}>← MAPA</button>
      </div>

      <BadgeAward
        shown={showBadge}
        color="cyan"
        letter="A"
        title="CIUDADANOS ACTIVOS"
        subtitle="¡Conoces los mecanismos de participación ciudadana!"
        onClose={() => { setShowBadge(false); go(5); }}
      />
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// BLOQUE 7 — ENTRENAMIENTO
// Insignia: ANALISTAS DEMOCRÁTICOS
// ────────────────────────────────────────────────────────────
function Block7Training({ go, state, setState }) {
  const [tab, setTab] = React.useState(0);
  const initialSeen = (state.b7Steps && state.b7Steps.length >= 2)
    ? state.b7Steps.slice(0, 2) : [false, false];
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

  const tabs = [
    { label: "VIDEO",     color: "purple" },
    { label: "WORDWALL",  color: "orange" },
  ];

  const award = () => {
    setState(s => {
      const b = [...(s.badges || [false,false,false])]; b[1] = true;
      return { ...s, badges: b, b7Done: true };
    });
    setShowBadge(true);
  };

  return (
    <div className="screen-body" style={{ paddingBottom: 130 }}>
      <h2 className="h-arcade glow-orange" style={{ fontSize: 19, color: "var(--neon-orange)", margin: "6px 0 10px", lineHeight: 1.5 }}>
        PARTE 2<br />ENTRENAMIENTO
      </h2>

      <div className="px-card px-card--orange" style={{ marginBottom: 14, padding: 14 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 10, color: "var(--neon-orange)", marginBottom: 6, letterSpacing: "0.08em" }}>
          🎯 OBJETIVO
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 19, lineHeight: 1.2, margin: 0 }}>
          Aplica los conceptos a <span style={{ color: "var(--neon-yellow)" }}>situaciones reales</span> de
          la democracia colombiana.
        </p>
      </div>

      <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-yellow)", margin: "10px 0 8px", letterSpacing: "0.08em" }}>
        ★ INSTRUCCIONES
      </div>
      <ol className="steps" style={{ marginBottom: 18 }}>
        <li>Observa el <strong>video</strong> de apoyo.</li>
        <li>Responde el concurso <em>"La democracia en Colombia"</em> en <strong>Wordwall</strong>.</li>
        <li>El equipo con mayor puntaje gana la insignia <strong style={{ color: "var(--neon-orange)" }}>Analistas Democráticos</strong>.</li>
      </ol>

      <div style={{ display: "flex", gap: 4, marginBottom: 10, overflowX: "auto", paddingBottom: 4 }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)} style={{
            flex: "0 0 auto",
            fontFamily: "var(--font-arcade)", fontSize: 11,
            padding: "8px 10px",
            background: tab === i ? `var(--neon-${t.color})` : "transparent",
            color: tab === i ? "#1a2818" : `var(--neon-${t.color})`,
            border: `2px solid var(--neon-${t.color})`,
            cursor: "pointer", letterSpacing: "0.06em", whiteSpace: "nowrap",
            position: "relative",
          }}>
            {seen[i] && (
              <span style={{
                position: "absolute", top: -6, right: -6,
                background: "var(--neon-cyan)", color: "#1a2818",
                width: 14, height: 14, fontSize: 9,
                display: "grid", placeItems: "center",
                border: "1px solid #1a2818",
              }}>✓</span>
            )}
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: 12 }}>
        {tab === 0 && <YTEmbed id="P29xNyYnnHw" />}

        {tab === 1 && (
          <div style={{
            position: "relative", width: "100%", height: 0, paddingTop: "76%",
            border: "2px solid var(--neon-orange)",
            boxShadow: "4px 4px 0 #0a140a, 4px 4px 0 2px var(--neon-orange)",
            overflow: "hidden", background: "#000",
          }}>
            <iframe
              loading="lazy"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
              src="https://wordwall.net/es/embed/7ca1991536984a71932d344b46bbf27f?themeId=1&templateId=5&fontStackId=0"
              title="La democracia en Colombia — Wordwall"
              allowFullScreen
            />
          </div>
        )}

        <button
          className={`px-btn ${seen[tab] ? "px-btn--green" : "px-btn--orange"}`}
          style={{ width: "100%", marginTop: 12, fontSize: 12 }}
          onClick={() => toggleSeen(tab)}
        >
          {seen[tab] ? "✓ MARCADO COMO VISTO" : "MARCAR COMO VISTO"}
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <ProgressBar value={seen.filter(Boolean).length} total={2} />
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-cyan)", whiteSpace: "nowrap" }}>
          {seen.filter(Boolean).length}/2
        </div>
      </div>

      <div className="px-card px-card--yellow" style={{ padding: 12, marginBottom: 12 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-yellow)", marginBottom: 6 }}>
          ✎ INSIGNIA EN JUEGO
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 18, margin: 0, lineHeight: 1.2 }}>
          El equipo con mayor puntaje en Wordwall gana la insignia{" "}
          <strong style={{ color: "var(--neon-orange)" }}>Analistas Democráticos</strong>.
        </p>
      </div>

      <button
        className="px-btn px-btn--green"
        disabled={!allSeen || alreadyAwarded}
        style={{ width: "100%", fontSize: 13 }}
        onClick={award}
      >
        {alreadyAwarded ? "★ INSIGNIA OBTENIDA ★" : allSeen ? "★ RECLAMAR INSIGNIA ★" : `Completa los 2 recursos (${seen.filter(Boolean).length}/2)`}
      </button>

      <div style={{ marginTop: 12 }}>
        <button className="px-btn px-btn--ghost" onClick={() => go(5)}>← MAPA</button>
      </div>

      <BadgeAward
        shown={showBadge}
        color="orange"
        letter="B"
        title="ANALISTAS DEMOCRÁTICOS"
        subtitle="¡Aplicaste los mecanismos a la democracia colombiana!"
        onClose={() => { setShowBadge(false); go(5); }}
      />
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// BLOQUE 8 — VIAJE
// Insignia: DEFENSORES DE LA DEMOCRACIA
// ────────────────────────────────────────────────────────────
function Block8Journey({ go, state, setState }) {
  const [tab, setTab] = React.useState(0);
  const initialSeen = (state.qrFound && state.qrFound.length >= 2)
    ? state.qrFound.slice(0, 2) : [false, false];
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

  const tabs = [
    { label: "PRESENTACIÓN", color: "cyan"   },
    { label: "WORDWALL",     color: "green"  },
  ];

  const award = () => {
    setState(s => {
      const b = [...(s.badges || [false,false,false])]; b[2] = true;
      return { ...s, badges: b };
    });
    setShowBadge(true);
  };

  return (
    <div className="screen-body" style={{ paddingBottom: 130 }}>
      <h2 className="h-arcade glow-green" style={{ fontSize: 19, color: "var(--neon-green)", margin: "6px 0 10px", lineHeight: 1.5 }}>
        PARTE 3<br />VIAJE
      </h2>

      <div className="px-card px-card--green" style={{ marginBottom: 14, padding: 14 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 10, color: "var(--neon-green)", marginBottom: 6, letterSpacing: "0.08em" }}>
          🎯 OBJETIVO
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 19, lineHeight: 1.2, margin: 0 }}>
          Relaciona los mecanismos y su <span style={{ color: "var(--neon-yellow)" }}>importancia</span> en Colombia.
        </p>
      </div>

      <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-yellow)", margin: "10px 0 8px", letterSpacing: "0.08em" }}>
        ★ INSTRUCCIONES
      </div>
      <ol className="steps" style={{ marginBottom: 18 }}>
        <li>Lee la <strong>presentación</strong> en Canva.</li>
        <li>Resuelve la actividad en <strong>Wordwall</strong> con tu equipo: <span style={{ color: "var(--neon-cyan)" }}>{state.groupName || "____"}</span></li>
        <li>El equipo con mejor puntaje y menor tiempo gana la insignia <strong style={{ color: "var(--neon-green)" }}>Defensores de la Democracia</strong>.</li>
      </ol>

      <div style={{ display: "flex", gap: 4, marginBottom: 10, overflowX: "auto", paddingBottom: 4 }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)} style={{
            flex: "0 0 auto",
            fontFamily: "var(--font-arcade)", fontSize: 11,
            padding: "8px 10px",
            background: tab === i ? `var(--neon-${t.color})` : "transparent",
            color: tab === i ? "#1a2818" : `var(--neon-${t.color})`,
            border: `2px solid var(--neon-${t.color})`,
            cursor: "pointer", letterSpacing: "0.06em", whiteSpace: "nowrap",
            position: "relative",
          }}>
            {seen[i] && (
              <span style={{
                position: "absolute", top: -6, right: -6,
                background: "var(--neon-cyan)", color: "#1a2818",
                width: 14, height: 14, fontSize: 9,
                display: "grid", placeItems: "center",
                border: "1px solid #1a2818",
              }}>✓</span>
            )}
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: 12 }}>
        {tab === 0 && (
          <>
            <div style={{
              position: "relative", width: "100%", height: 0, paddingTop: "56.25%",
              border: "2px solid var(--neon-cyan)",
              boxShadow: "4px 4px 0 #0a140a, 4px 4px 0 2px var(--neon-cyan)",
              overflow: "hidden", background: "#000",
            }}>
              <iframe
                loading="lazy"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                src="https://www.canva.com/design/DAHJCZADnLo/JswcBDl2KMlQl12HE68e9w/view?embed"
                title="Mecanismos de participación en Colombia — Presentación"
                allow="fullscreen"
                allowFullScreen
              />
            </div>
            <a
              href="https://www.canva.com/design/DAHJCZADnLo/JswcBDl2KMlQl12HE68e9w/view"
              target="_blank"
              rel="noopener"
              style={{
                display: "inline-block", marginTop: 10,
                fontFamily: "var(--font-mono)", fontSize: 18, color: "var(--neon-cyan)",
                textDecoration: "underline", lineHeight: 1.2,
              }}
            >↗ Abrir presentación en Canva</a>
          </>
        )}

        {tab === 1 && (
          <div style={{
            position: "relative", width: "100%", height: 0, paddingTop: "76%",
            border: "2px solid var(--neon-green)",
            boxShadow: "4px 4px 0 #0a140a, 4px 4px 0 2px var(--neon-green)",
            overflow: "hidden", background: "#000",
          }}>
            <iframe
              loading="lazy"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
              src="https://wordwall.net/es/embed/7ca1991536984a71932d344b46bbf27f?themeId=1&templateId=5&fontStackId=0"
              title="Mecanismos de participación — Wordwall"
              allowFullScreen
            />
          </div>
        )}

        <button
          className={`px-btn ${seen[tab] ? "px-btn--green" : "px-btn--cyan"}`}
          style={{ width: "100%", marginTop: 12, fontSize: 12 }}
          onClick={() => toggleSeen(tab)}
        >
          {seen[tab] ? "✓ MARCADO COMO VISTO" : "MARCAR COMO VISTO"}
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <ProgressBar value={seen.filter(Boolean).length} total={2} />
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-cyan)", whiteSpace: "nowrap" }}>
          {seen.filter(Boolean).length}/2
        </div>
      </div>

      <div className="px-card px-card--yellow" style={{ padding: 12, marginBottom: 12 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-yellow)", marginBottom: 6 }}>
          ✎ INSIGNIA EN JUEGO
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 18, margin: 0, lineHeight: 1.2 }}>
          Mejor puntaje en menor tiempo gana la insignia{" "}
          <strong style={{ color: "var(--neon-green)" }}>Defensores de la Democracia</strong>.
        </p>
      </div>

      <button
        className="px-btn px-btn--green"
        disabled={!allSeen || alreadyAwarded}
        style={{ width: "100%", fontSize: 13 }}
        onClick={award}
      >
        {alreadyAwarded ? "★ INSIGNIA OBTENIDA ★" : allSeen ? "★ RECLAMAR INSIGNIA ★" : `Completa los 2 recursos (${seen.filter(Boolean).length}/2)`}
      </button>

      <div style={{ marginTop: 12 }}>
        <button className="px-btn px-btn--ghost" onClick={() => go(5)}>← MAPA</button>
      </div>

      <BadgeAward
        shown={showBadge}
        color="green"
        letter="C"
        title="DEFENSORES DE LA DEMOCRACIA"
        subtitle={`¡${state.groupName || "Equipo"} defiende la democracia colombiana!`}
        onClose={() => { setShowBadge(false); go(5); }}
      />
    </div>
  );
}

Object.assign(window, {
  Block6Content, Block7Training, Block8Journey, BadgeAward, YTEmbed,
});
