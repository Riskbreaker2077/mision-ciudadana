// app-modules.jsx — Bloques 6, 7, 8 (módulos) + sistema de insignias

// ────────────────────────────────────────────────────────────
// Reusable: BadgeAward — overlay celebración al completar módulo
// ────────────────────────────────────────────────────────────
function BadgeAward({ shown, color = "yellow", letter, title, subtitle, onClose }) {
  if (!shown) return null;
  const confetti = [];
  const colors = ["#a855f7","#ff6b35","#39ff14","#ffd60a","#22d3ee","#ec4899"];
  for (let i = 0; i < 22; i++) {
    confetti.push(
      <div key={i} className="confetti" style={{
        left: `${Math.random()*100}%`,
        top: -20,
        background: colors[i % colors.length],
        animationDelay: `${Math.random()*0.6}s`,
        transform: `rotate(${Math.random()*360}deg)`,
      }} />
    );
  }
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 200,
      background: "rgba(8,5,3,0.92)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: 24, textAlign: "center",
    }}>
      {confetti}
      <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-cyan)", letterSpacing: "0.2em", marginBottom: 12 }}>
        ▸ INSIGNIA DESBLOQUEADA
      </div>
      <div className="badge pop-in" style={{ width: 160, height: 160, marginBottom: 18 }}>
        <div className="badge-core glow-pulse" style={{
          width: 140, height: 140, fontSize: 36,
          background: `linear-gradient(135deg, var(--neon-${color}), var(--neon-orange))`,
          color: "#0d0a05",
        }}>{letter}</div>
      </div>
      <div className={`h-arcade glow-${color}`} style={{ fontSize: 16, color: `var(--neon-${color})`, marginBottom: 8 }}>
        {title}
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 19, color: "var(--ink)", marginBottom: 24, lineHeight: 1.2, maxWidth: 280 }}>
        {subtitle}
      </div>
      <button className={`px-btn px-btn--${color}`} onClick={onClose}>
        AL MAPA ▸
      </button>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// BLOQUE 6 — CONTENIDO (presentación + 3 videos)
// ────────────────────────────────────────────────────────────
function Block6Content({ go, state, setState }) {
  const [tab, setTab] = React.useState(0); // 0 canva, 1 video, 2 wordwall
  const initialSeen = (state.b6Seen && state.b6Seen.length >= 3)
    ? state.b6Seen.slice(0, 3)
    : [false, false, false];
  const [seen, setSeen] = React.useState(initialSeen);
  const allSeen = seen.every(Boolean);
  const [showBadge, setShowBadge] = React.useState(false);

  const markSeen = (idx) => {
    setSeen(prev => {
      const n = [...prev]; n[idx] = true;
      setState(s => ({ ...s, b6Seen: n }));
      return n;
    });
  };

  const tabs = [
    { label: "PRESENTACIÓN", color: "cyan" },
    { label: "VIDEO", color: "purple" },
    { label: "WORDWALL", color: "orange" },
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
            <h2 className="h-arcade glow-cyan" style={{ fontSize: 20, color: "var(--neon-cyan)", margin: "6px 0 10px", lineHeight: 1.5 }}>
        ¿QUÉ ES LA<br/>CORRUPCIÓN?
      </h2>

      <div className="px-card px-card--cyan" style={{ marginBottom: 14, padding: 14 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 19, lineHeight: 1.2, margin: 0 }}>
          Hoy entenderás cómo la <span style={{ color: "var(--neon-yellow)" }}>corrupción</span> roba
          recursos públicos y vulnera derechos. La presentación, el video y el Wordwall te darán las bases.
        </p>
      </div>

      {/* Instrucciones */}
      <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-yellow)", margin: "10px 0 8px", letterSpacing: "0.08em" }}>
        ★ INSTRUCCIONES
      </div>
      <ol className="steps" style={{ marginBottom: 18 }}>
        <li>Observa el <strong>video</strong> y lee la <strong>presentación</strong>.</li>
        <li>Resuelve la actividad en <strong>Wordwall</strong>.</li>
        <li>El equipo con <em>mejor puntaje</em> recibe la insignia <strong style={{ color: "var(--neon-cyan)" }}>Procuradores</strong>.</li>
      </ol>

      {/* Tab strip */}
      <div style={{ display: "flex", gap: 4, marginBottom: 10, overflowX: "auto", paddingBottom: 4 }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)} style={{
            flex: "0 0 auto",
            fontFamily: "var(--font-arcade)", fontSize: 11,
            padding: "8px 10px",
            background: tab === i ? `var(--neon-${t.color})` : "transparent",
            color: tab === i ? "#0d0a05" : `var(--neon-${t.color})`,
            border: `2px solid var(--neon-${t.color})`,
            cursor: "pointer", letterSpacing: "0.06em", whiteSpace: "nowrap",
            position: "relative",
          }}>
            {seen[i] && <span style={{ position: "absolute", top: -6, right: -6, background: "var(--neon-green)", color: "#0d0a05", width: 14, height: 14, fontSize: 9, display: "grid", placeItems: "center", border: "1px solid #0d0a05" }}>✓</span>}
            {t.label}
          </button>
        ))}
      </div>

      {/* Embed area */}
      <div style={{ marginBottom: 12 }}>
        {tab === 0 && (
          <>
            <div style={{
              position: "relative", width: "100%", height: 0,
              paddingTop: "56.25%",
              border: "2px solid var(--neon-cyan)",
              boxShadow: "4px 4px 0 #0d0a05, 4px 4px 0 2px var(--neon-cyan)",
              overflow: "hidden", background: "#000",
            }}>
              <iframe
                loading="lazy"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, padding: 0, margin: 0 }}
                src="https://www.canva.com/design/DAHIvpqFox4/y4CwZ9NG8BWDClhbeXbRiQ/view?embed"
                title="Recurso Digital Gamificado: Corrupción Grado 11"
                allow="fullscreen"
                allowFullScreen
              />
            </div>
            <a
              href="https://www.canva.com/design/DAHIvpqFox4/y4CwZ9NG8BWDClhbeXbRiQ/view?utm_content=DAHIvpqFox4&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
              target="_blank"
              rel="noopener"
              style={{
                display: "inline-block", marginTop: 10,
                fontFamily: "var(--font-mono)", fontSize: 18, color: "var(--neon-cyan)",
                textDecoration: "underline", lineHeight: 1.2,
              }}
            >↗ Abrir presentación en Canva — de Carolina</a>
          </>
        )}
        {tab === 1 && (<YTEmbed id="mYfsufeRipc" />)}
        {tab === 2 && (
          <>
            <div style={{
              position: "relative", width: "100%", height: 0,
              paddingTop: "75%",
              border: "2px solid var(--neon-orange)",
              boxShadow: "4px 4px 0 #0d0a05, 4px 4px 0 2px var(--neon-orange)",
              overflow: "hidden", background: "#000",
            }}>
              <iframe
                loading="lazy"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                src="https://wordwall.net/es/embed/3d593eb21f8b4059ba1e00eb0561914c?themeId=1&templateId=3&fontStackId=0"
                title="Wordwall — Corrupción"
                allowFullScreen
              />
            </div>
            <a
              href="https://wordwall.net/es/resource/112682015"
              target="_blank"
              rel="noopener"
              style={{
                display: "inline-block", marginTop: 10,
                fontFamily: "var(--font-mono)", fontSize: 18, color: "var(--neon-orange)",
                textDecoration: "underline", lineHeight: 1.2,
              }}
            >↗ Abrir Wordwall — Corrupción</a>
          </>
        )}

        {/* Mark-as-seen control */}
        <button
          className={`px-btn ${seen[tab] ? "px-btn--green" : "px-btn--cyan"}`}
          style={{ width: "100%", marginTop: 12, fontSize: 12 }}
          onClick={() => {
            if (seen[tab]) {
              // toggle off
              setSeen(prev => {
                const n = [...prev]; n[tab] = false;
                setState(s => ({ ...s, b6Seen: n }));
                return n;
              });
            } else {
              markSeen(tab);
            }
          }}
        >
          {seen[tab] ? "✓ MARCADO COMO VISTO" : "MARCAR COMO VISTO"}
        </button>
      </div>

      {/* progress within module */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <ProgressBar value={seen.filter(Boolean).length} total={3} />
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-green)", whiteSpace: "nowrap" }}>
          {seen.filter(Boolean).length}/3
        </div>
      </div>

      <div className="px-card px-card--yellow" style={{ padding: 12, marginBottom: 12 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-yellow)", marginBottom: 6 }}>
          ✎ INSIGNIA EN JUEGO
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 18, margin: 0, lineHeight: 1.2 }}>
          El equipo con mayor puntaje en Wordwall recibe la insignia <strong style={{ color: "var(--neon-cyan)" }}>Procuradores</strong>.
        </p>
      </div>

      <button
        className={"px-btn px-btn--green"}
        disabled={!allSeen}
        style={{ width: "100%", fontSize: 13 }}
        onClick={award}
      >
        {allSeen ? "★ RECLAMAR INSIGNIA ★" : `Completa los 3 recursos (${seen.filter(Boolean).length}/3)`}
      </button>

      <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between" }}>
        <button className="px-btn px-btn--ghost" onClick={() => go(5)}>← MAPA</button>
      </div>

      <BadgeAward
        shown={showBadge}
        color="cyan"
        letter="A"
        title="PROCURADORES"
        subtitle="Has comprendido qué es la corrupción. ¡Listo para entrenar!"
        onClose={() => { setShowBadge(false); go(5); }}
      />
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
// BLOQUE 7 — ENTRENAMIENTO (Blooket)
// ────────────────────────────────────────────────────────────
function Block7Training({ go, state, setState }) {
  const [showBadge, setShowBadge] = React.useState(false);
  const [completed, setCompleted] = React.useState(state.b7Done || false);
  const [tab, setTab] = React.useState(0); // 0 video, 1 wordwall

  const award = () => {
    setCompleted(true);
    setState(s => {
      const b = [...(s.badges || [false,false,false])]; b[1] = true;
      return { ...s, badges: b, b7Done: true };
    });
    setShowBadge(true);
  };

  return (
    <div className="screen-body" style={{ paddingBottom: 110 }}>
            <h2 className="h-arcade glow-orange" style={{ fontSize: 21, color: "var(--neon-orange)", margin: "6px 0 12px", lineHeight: 1.5 }}>
        ENTRENAMIENTO<br/>ANALÍTICO
      </h2>

      <div className="px-card px-card--orange" style={{ marginBottom: 14 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 20, margin: 0, lineHeight: 1.2 }}>
          Analiza <span style={{ color: "var(--neon-yellow)" }}>por qué</span> y <span style={{ color: "var(--neon-yellow)" }}>cómo</span> combatir la corrupción en Colombia.
        </p>
      </div>

      <button
        className="px-btn px-btn--ghost"
        style={{ width: "100%", marginBottom: 14, fontSize: 12 }}
        onClick={() => go(5)}
      >
        ← REGRESAR AL MAPA
      </button>

      <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-yellow)", margin: "10px 0 8px", letterSpacing: "0.08em" }}>
        ★ INSTRUCCIONES
      </div>
      <ol className="steps" style={{ marginBottom: 14 }}>
        <li>Observa el video <em>"Corrupción en Colombia: por qué y cómo combatirla"</em>.</li>
        <li>Resuelve el <strong>concurso de preguntas</strong> en Wordwall.</li>
        <li>Registra tu equipo: <span style={{ color: "var(--neon-green)" }}>{state.groupName || "____"}</span></li>
        <li>El equipo con mayor puntaje gana la insignia <strong style={{ color: "var(--neon-orange)" }}>Analistas</strong>.</li>
      </ol>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
        {[
          { label: "VIDEO", color: "purple" },
          { label: "CONCURSO", color: "orange" },
        ].map((t, i) => (
          <button key={i} onClick={() => setTab(i)} style={{
            flex: 1,
            fontFamily: "var(--font-arcade)", fontSize: 11,
            padding: "8px 10px",
            background: tab === i ? `var(--neon-${t.color})` : "transparent",
            color: tab === i ? "#0d0a05" : `var(--neon-${t.color})`,
            border: `2px solid var(--neon-${t.color})`,
            cursor: "pointer", letterSpacing: "0.06em",
          }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: 14 }}>
        {tab === 0 && (<YTEmbed id="41f-kZIBoUQ" />)}
        {tab === 1 && (
          <>
            <div style={{
              position: "relative", width: "100%", height: 0,
              paddingTop: "75%",
              border: "2px solid var(--neon-orange)",
              boxShadow: "4px 4px 0 #0d0a05, 4px 4px 0 2px var(--neon-orange)",
              overflow: "hidden", background: "#000",
            }}>
              <iframe
                loading="lazy"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                src="https://wordwall.net/es/embed/db8d7cbe9a3e41769d53acf3a98a20a0?themeId=21&templateId=69&fontStackId=0"
                title="Concurso Wordwall — Corrupción en Colombia"
                allowFullScreen
              />
            </div>
            <a
              href="https://wordwall.net/es/resource/112683708"
              target="_blank"
              rel="noopener"
              style={{
                display: "inline-block", marginTop: 10,
                fontFamily: "var(--font-mono)", fontSize: 18, color: "var(--neon-orange)",
                textDecoration: "underline", lineHeight: 1.2,
              }}
            >↗ Abrir concurso en Wordwall</a>
          </>
        )}
      </div>

      <div className="px-card" style={{ marginBottom: 12, padding: 12 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-purple)", marginBottom: 6, letterSpacing: "0.08em" }}>
          EQUIPO REGISTRADO
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--neon-green)", letterSpacing: "0.04em" }}>
          {state.groupName || "____"}
        </div>
      </div>

      <button
        className="px-btn px-btn--green"
        disabled={completed}
        style={{ width: "100%", fontSize: 13 }}
        onClick={award}
      >
        {completed ? "★ INSIGNIA OBTENIDA ★" : "✓ TERMINÉ EL CONCURSO"}
      </button>

      <div style={{ marginTop: 12 }}>
        <button className="px-btn px-btn--ghost" onClick={() => go(5)}>← MAPA</button>
      </div>

      <BadgeAward
        shown={showBadge}
        color="orange"
        letter="B"
        title="ANALISTAS"
        subtitle="Entiendes por qué y cómo combatir la corrupción. ¡A investigar casos reales!"
        onClose={() => { setShowBadge(false); go(5); }}
      />
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// BLOQUE 8 — VIAJE (QR hunt + Forms)
// ────────────────────────────────────────────────────────────
function Block8Journey({ go, state, setState }) {
  const cases = [
    {
      id: "armenia",
      title: "¿QUÉ PASÓ EN ARMENIA?",
      color: "cyan",
      article: "https://www.pulzo.com/nacion/procuraduria-investiga-irregularidades-en-contratos-de-la-alcaldia-de-armenia-y-convenios-interadministrativos-PP5111985A",
      maze: "https://wordwall.net/es/resource/112683788",
      embed: "https://wordwall.net/es/embed/b57a94a8c8c74112a7814704fa7f723d?themeId=23&templateId=49&fontStackId=0",
      summary: "Procuraduría investiga irregularidades en contratos de la Alcaldía de Armenia.",
    },
    {
      id: "mintic",
      title: "EL GRAN ROBO DEL MINTIC",
      color: "orange",
      article: "https://www.elespectador.com/economia/la-historia-del-escandalo-del-mintic-centros-poblados-y-karen-abudinen/",
      maze: "https://wordwall.net/es/resource/112683894",
      embed: "https://wordwall.net/es/embed/48b52ec22d1942e5a70ff216f1e2916f?themeId=23&templateId=49&fontStackId=0",
      summary: "Centros Poblados: el escándalo de la conectividad rural.",
    },
    {
      id: "guajira",
      title: "EL HAMBRE QUE DEJÓ LA CORRUPCIÓN",
      color: "pink",
      article: "https://www.eltiempo.com/colombia/otras-ciudades/asi-saquearon-la-alimentacion-infantil-en-la-guajira-entramado-de-corrupcion-se-llevo-mas-de-860-millones-mediante-manipulacion-de-contratos-3544350",
      maze: "https://wordwall.net/es/resource/112683906",
      embed: "https://wordwall.net/es/embed/be5f86d3a72c431a9e5374ea270ea78c?themeId=23&templateId=49&fontStackId=0",
      summary: "El saqueo de la alimentación infantil en La Guajira.",
    },
  ];

  // qrFound is repurposed: 3 cases × 2 (artículo leído + laberinto resuelto) = 6 estados,
  // pero usamos solo los primeros 6 índices para retrocompatibilidad.
  const initial = state.qrFound && state.qrFound.length >= 6 ? state.qrFound.slice(0, 6) : Array(6).fill(false);
  const [progress, setProgress] = React.useState(initial);
  const [openCase, setOpenCase] = React.useState(0);
  const [showBadge, setShowBadge] = React.useState(false);
  const completed = progress.filter(Boolean).length;
  const allDone = completed === 6;

  const toggle = (i) => {
    setProgress(prev => {
      const n = [...prev]; n[i] = !n[i];
      // Pad to 10 for backward state shape
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

  const c = cases[openCase];

  return (
    <div className="screen-body" style={{ paddingBottom: 110 }}>
            <h2 className="h-arcade glow-green" style={{ fontSize: 21, color: "var(--neon-green)", margin: "6px 0 12px", lineHeight: 1.5 }}>
        EL VIAJE<br/>DE LOS CASOS
      </h2>

      <div className="px-card px-card--green" style={{ marginBottom: 14 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 19, margin: 0, lineHeight: 1.2 }}>
          ¿Qué casos de <span style={{ color: "var(--neon-yellow)" }}>corrupción</span> conoces en Colombia
          y el Quindío? Pon en práctica lo aprendido investigando 3 casos reales.
        </p>
      </div>

      <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-yellow)", margin: "4px 0 8px", letterSpacing: "0.08em" }}>
        ★ INSTRUCCIONES
      </div>
      <ol className="steps" style={{ marginBottom: 16 }}>
        <li>Lee cada uno de los <strong>3 artículos</strong>.</li>
        <li>Resuelve el <strong>laberinto</strong> con 10 preguntas de cada caso.</li>
        <li>Responde en Wordwall con tu equipo: <span style={{ color: "var(--neon-green)" }}>{state.groupName || "____"}</span></li>
        <li>Mejor puntaje en menor tiempo gana la insignia <strong style={{ color: "var(--neon-green)" }}>Defensores de Colombia</strong>.</li>
      </ol>

      {/* Case selector */}
      <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
        {cases.map((cs, i) => (
          <button key={cs.id} onClick={() => setOpenCase(i)} style={{
            flex: 1,
            fontFamily: "var(--font-arcade)", fontSize: 10,
            padding: "8px 6px",
            background: openCase === i ? `var(--neon-${cs.color})` : "transparent",
            color: openCase === i ? "#0d0a05" : `var(--neon-${cs.color})`,
            border: `2px solid var(--neon-${cs.color})`,
            cursor: "pointer", letterSpacing: "0.04em",
          }}>
            CASO {i + 1}
          </button>
        ))}
      </div>

      <div className={`px-card px-card--${c.color}`} style={{ marginBottom: 12, padding: 14 }}>
        <div className="h-arcade" style={{ fontSize: 13, color: `var(--neon-${c.color})`, marginBottom: 8, lineHeight: 1.4 }}>
          {c.title}
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 18, margin: "0 0 12px", lineHeight: 1.2 }}>
          {c.summary}
        </p>

        <a
          href={c.article}
          target="_blank"
          rel="noopener"
          className={`px-btn px-btn--${c.color}`}
          style={{ width: "100%", marginBottom: 8, textDecoration: "none", fontSize: 10, boxSizing: "border-box" }}
        >
          📰 LEER ARTÍCULO
        </a>

        <button
          onClick={() => toggle(openCase * 2)}
          className={`px-btn ${progress[openCase * 2] ? "px-btn--green" : "px-btn--ghost"}`}
          style={{ width: "100%", marginBottom: 12, fontSize: 10, boxSizing: "border-box" }}
        >
          {progress[openCase * 2] ? "✓ ARTÍCULO LEÍDO" : "MARCAR ARTÍCULO COMO LEÍDO"}
        </button>

        <div style={{
          position: "relative", width: "100%", height: 0,
          paddingTop: "75%",
          border: `2px solid var(--neon-${c.color})`,
          boxShadow: `4px 4px 0 #0d0a05, 4px 4px 0 2px var(--neon-${c.color})`,
          overflow: "hidden", background: "#000",
          marginBottom: 10,
        }}>
          <iframe
            loading="lazy"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
            src={c.embed}
            title={`Laberinto — ${c.title}`}
            allowFullScreen
          />
        </div>

        <a
          href={c.maze}
          target="_blank"
          rel="noopener"
          style={{
            display: "inline-block", marginBottom: 10,
            fontFamily: "var(--font-mono)", fontSize: 17, color: `var(--neon-${c.color})`,
            textDecoration: "underline", lineHeight: 1.2,
          }}
        >↗ Abrir laberinto en Wordwall</a>

        <button
          onClick={() => toggle(openCase * 2 + 1)}
          className={`px-btn ${progress[openCase * 2 + 1] ? "px-btn--green" : "px-btn--ghost"}`}
          style={{ width: "100%", fontSize: 10, boxSizing: "border-box" }}
        >
          {progress[openCase * 2 + 1] ? "✓ LABERINTO RESUELTO" : "MARCAR LABERINTO COMO RESUELTO"}
        </button>
      </div>

      {/* Progress tracker */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-cyan)", letterSpacing: "0.08em" }}>
            PROGRESO
          </div>
          <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-green)" }}>
            {completed}/6
          </div>
        </div>
        <ProgressBar value={completed} total={6} />
      </div>

      <button
        className="px-btn px-btn--green"
        disabled={!allDone}
        style={{ width: "100%", fontSize: 11 }}
        onClick={award}
      >
        {allDone ? "★ COMPLETAR MISIÓN ★" : `Completa los 3 casos (${completed}/6)`}
      </button>

      <div style={{ marginTop: 12 }}>
        <button className="px-btn px-btn--ghost" onClick={() => go(5)}>← MAPA</button>
      </div>

      <BadgeAward
        shown={showBadge}
        color="green"
        letter="C"
        title="DEFENSORES DE COLOMBIA"
        subtitle={`¡${state.groupName || "Equipo"} investigó los 3 grandes casos!`}
        onClose={() => { setShowBadge(false); go(5); }}
      />
    </div>
  );
}

Object.assign(window, {
  Block6Content, Block7Training, Block8Journey, BadgeAward, YTEmbed,
});
