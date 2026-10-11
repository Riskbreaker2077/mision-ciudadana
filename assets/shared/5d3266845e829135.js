// m6-modules.jsx — Bloques 6, 7, 8 · Misión Ciudadana Módulo 6
// Globalización y Migraciones

// ── BadgeAward — overlay fixed (cubre el viewport) ────────
function BadgeAward({ shown, color = "yellow", letter, title, subtitle, onClose }) {
  React.useEffect(() => {
    if (!shown) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [shown]);

  if (!shown) return null;
  const confettiColors = ["#d0db97","#69b578","#ff6f59","#1a7a82","#8b8bae","#f4f1de"];
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
          background: `linear-gradient(135deg, var(--neon-${color}), var(--neon-cyan))`,
          color: "#051a1d",
        }}>{letter}</div>
      </div>
      <div className={`h-arcade glow-${color}`} style={{ fontSize: 16, color: `var(--neon-${color})`, marginBottom: 8, textAlign: "center", lineHeight: 1.5 }}>
        {title}
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 19, color: "var(--ink)", marginBottom: 24, lineHeight: 1.2, maxWidth: 320, textAlign: "center" }}>
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
        boxShadow: `4px 4px 0 #02080a, 4px 4px 0 2px var(--neon-${color})`,
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
      boxShadow: `4px 4px 0 #02080a, 4px 4px 0 2px var(--neon-${color})`,
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
// Insignia: GUARDIANES DEL MUNDO GLOBAL
// ────────────────────────────────────────────────────────────
function Block6Content({ go, state, setState }) {
  const tabs = [
    { label: "VIDEO · RUTAS", color: "orange", kind: "yt",    src: "nwDskpE0Un0" },
    { label: "CANVA",         color: "cyan",   kind: "canva", src: "https://www.canva.com/design/DAHKQD30zEI/HQUkxTD-l9LBFVj10MW4kA/view" },
    { label: "WORDWALL",      color: "green",  kind: "ww",    src: "https://wordwall.net/es/embed/72fa84d5e75a4a5fa1137d51dd9f4fed?themeId=46&templateId=48&fontStackId=0" },
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
          Comprende qué es la <span style={{ color: "var(--neon-green)" }}>globalización</span> y cómo influyen las{" "}
          <span style={{ color: "var(--neon-yellow)" }}>migraciones</span> en la economía, la cultura y la vida de las personas.
        </p>
      </div>

      <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-yellow)", margin: "10px 0 8px", letterSpacing: "0.08em" }}>
        ★ INSTRUCCIONES
      </div>
      <ol className="steps" style={{ marginBottom: 18 }}>
        <li>Observa el <strong>video</strong>: <em>¿Cuáles son las rutas migratorias más peligrosas del mundo?</em></li>
        <li>Revisa la <strong>presentación</strong> de apoyo en Canva con tu equipo.</li>
        <li>Resuelve la actividad en <strong>Wordwall</strong>.</li>
        <li>El equipo con mejor puntaje recibe la insignia <strong style={{ color: "var(--neon-orange)" }}>Guardianes del Mundo Global</strong>.</li>
      </ol>

      {/* Tab strip */}
      <div style={{ display: "flex", gap: 4, marginBottom: 10, overflowX: "auto", paddingBottom: 4 }}>
        {tabs.map((tt, i) => (
          <button key={i} onClick={() => setTab(i)} style={{
            flex: "0 0 auto",
            fontFamily: "var(--font-arcade)", fontSize: 11,
            padding: "8px 10px",
            background: tab === i ? `var(--neon-${tt.color})` : "transparent",
            color: tab === i ? "#051a1d" : `var(--neon-${tt.color})`,
            border: `2px solid var(--neon-${tt.color})`,
            cursor: "pointer", letterSpacing: "0.05em", whiteSpace: "nowrap",
            position: "relative",
          }}>
            {seen[i] && (
              <span style={{
                position: "absolute", top: -6, right: -6,
                background: "var(--neon-green)", color: "#051a1d",
                width: 14, height: 14, fontSize: 9,
                display: "grid", placeItems: "center",
                border: "1px solid #02080a",
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
          El equipo con mejor puntaje en el Wordwall recibe la insignia{" "}
          <strong style={{ color: "var(--neon-orange)" }}>Guardianes del Mundo Global</strong>.
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
        title="GUARDIANES DEL MUNDO GLOBAL"
        subtitle="¡Comprendes qué es la globalización y cómo las migraciones cambian el mundo!"
        onClose={() => { setShowBadge(false); go(5); }}
      />
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// BLOQUE 7 — ENTRENAMIENTO
// Insignia: EXPLORADORES DEL PLANETA
// Google Earth · ruleta de 11 locaciones · video · wordwall
// ────────────────────────────────────────────────────────────

const LOCATIONS = [
  { name: "La Pequeña Haití",   city: "Miami, EE.UU.",           color: "orange" },
  { name: "Chinatown",          city: "Nueva York, EE.UU.",      color: "yellow" },
  { name: "Barrio venezolano",  city: "Bogotá, Colombia",        color: "green"  },
  { name: "Villa 31",           city: "Buenos Aires, Argentina", color: "cyan"   },
  { name: "Little Italy",       city: "Toronto, Canadá",         color: "pink"   },
  { name: "Favela Rocinha",     city: "Río de Janeiro, Brasil",  color: "orange" },
  { name: "Barrio coreano",     city: "Los Ángeles, EE.UU.",     color: "yellow" },
  { name: "Ciudad Juárez",      city: "México",                  color: "green"  },
  { name: "Lampedusa",          city: "Italia",                  color: "cyan"   },
  { name: "Barrio Lavapiés",    city: "Madrid, España",          color: "pink"   },
  { name: "Berlín multicultural", city: "Alemania",              color: "orange" },
];

const SLICE_COLORS = ["#ff6f59","#d0db97","#69b578","#1a7a82","#e0413a","#8b8bae","#ff6f59","#d0db97","#69b578","#1a7a82","#e0413a"];

function RouletteWheel({ rotation, selected }) {
  const N = LOCATIONS.length;
  const slice = 360 / N;
  // build conic-gradient
  const stops = [];
  for (let i = 0; i < N; i++) {
    const start = i * slice;
    const end = (i+1) * slice;
    stops.push(`${SLICE_COLORS[i % SLICE_COLORS.length]} ${start}deg ${end}deg`);
  }
  const gradient = `conic-gradient(from -${slice/2}deg, ${stops.join(", ")})`;

  return (
    <div className="roulette-wrap">
      <div className="roulette-pointer" />
      <div
        className="roulette-wheel"
        style={{ background: gradient, transform: `rotate(${rotation}deg)` }}
      >
        {LOCATIONS.map((loc, i) => {
          const angle = i * slice;
          return (
            <div key={i} style={{
              position: "absolute",
              top: "50%", left: "50%",
              width: 26, height: 26,
              marginLeft: -13, marginTop: -13,
              transform: `rotate(${angle}deg) translateY(-108px) rotate(${-angle}deg)`,
              display: "grid", placeItems: "center",
              fontFamily: "var(--font-arcade)", fontSize: 10,
              color: "#051a1d",
              fontWeight: 700,
              pointerEvents: "none",
              textShadow: "0 0 2px rgba(255,255,255,0.45)",
            }}>
              {(i+1).toString().padStart(2,"0")}
            </div>
          );
        })}
      </div>
      <div className="roulette-hub">🌍</div>
    </div>
  );
}

function Block7Training({ go, state, setState }) {
  const TOTAL = 4; // ruleta, earth, video, wordwall
  const initialSeen = (state.b7Steps && state.b7Steps.length >= TOTAL)
    ? state.b7Steps.slice(0, TOTAL) : Array(TOTAL).fill(false);
  const [seen, setSeen] = React.useState(initialSeen);
  const allSeen = seen.every(Boolean);
  const [showBadge, setShowBadge] = React.useState(false);
  const alreadyAwarded = (state.badges || [])[1];

  const [rotation, setRotation] = React.useState(0);
  const [spinning, setSpinning] = React.useState(false);
  const [selected, setSelected] = React.useState(
    typeof state.b7Selected === "number" ? state.b7Selected : null
  );

  const toggleSeen = (idx) => {
    setSeen(prev => {
      const n = [...prev]; n[idx] = !n[idx];
      const padded = n.length >= 6 ? n : [...n, ...Array(6 - n.length).fill(false)];
      setState(s => ({ ...s, b7Steps: padded }));
      return n;
    });
  };

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    const N = LOCATIONS.length;
    const slice = 360 / N;
    const target = Math.floor(Math.random() * N);
    const extraTurns = 5 + Math.floor(Math.random() * 3); // 5–7 full spins
    // We want pointer (top, 0deg in CSS rotation space) to land on slice `target`.
    // Slice i is centered at i*slice in unrotated wheel, pointing UP after rotation R means
    // unrotated angle of -R == i*slice  → R = -(i*slice). Use positive direction with extra turns.
    const finalAngle = extraTurns * 360 - (target * slice);
    setRotation(finalAngle);
    setTimeout(() => {
      setSelected(target);
      setState(s => ({ ...s, b7Selected: target }));
      setSpinning(false);
      // mark first step done (ruleta)
      setSeen(prev => {
        if (prev[0]) return prev;
        const n = [...prev]; n[0] = true;
        const padded = n.length >= 6 ? n : [...n, ...Array(6 - n.length).fill(false)];
        setState(s => ({ ...s, b7Steps: padded }));
        return n;
      });
    }, 4200);
  };

  const award = () => {
    setState(s => {
      const b = [...(s.badges || [false,false,false])]; b[1] = true;
      return { ...s, badges: b, b7Done: true };
    });
    setShowBadge(true);
  };

  const loc = selected != null ? LOCATIONS[selected] : null;
  const earthUrl = "https://earth.google.com/web/";

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
          Relaciona la <span style={{ color: "var(--neon-yellow)" }}>globalización</span> y las{" "}
          <span style={{ color: "var(--neon-orange)" }}>migraciones</span> con situaciones reales del mundo actual.
        </p>
      </div>

      <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-yellow)", margin: "10px 0 8px", letterSpacing: "0.08em" }}>
        ★ INSTRUCCIONES
      </div>
      <ol className="steps" style={{ marginBottom: 18 }}>
        <li>Gira la <strong>ruleta</strong> para que el equipo reciba su locación.</li>
        <li>Abre <strong>Google Earth</strong> y explora ese lugar.</li>
        <li>Toma una <strong>captura</strong> y envíala al grupo de WhatsApp con una descripción de la locación y por qué es evidencia de globalización o de migración.</li>
        <li>Observa el <strong>video</strong> y resuelve el <strong>Wordwall</strong>.</li>
      </ol>

      {/* PASO 1 — Ruleta */}
      <div className="px-card px-card--yellow" style={{ marginBottom: 14, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-yellow)", letterSpacing: "0.08em" }}>
            🎡 RULETA · 11 LOCACIONES
          </div>
          {seen[0] && <span style={{ fontFamily: "var(--font-arcade)", fontSize: 10, color: "var(--neon-green)" }}>✓ HECHO</span>}
        </div>

        <RouletteWheel rotation={rotation} selected={selected} />

        <button
          className="px-btn px-btn--orange"
          style={{ width: "100%", marginTop: 14, fontSize: 12 }}
          onClick={spin}
          disabled={spinning}
        >
          {spinning ? "🌀 GIRANDO..." : selected != null ? "🎰 GIRAR DE NUEVO" : "🎰 GIRAR RULETA"}
        </button>

        {loc && !spinning && (
          <div style={{
            marginTop: 14, padding: 12,
            background: "rgba(208,219,151,0.10)",
            border: "2px solid var(--neon-yellow)",
            textAlign: "center",
          }}>
            <div style={{ fontFamily: "var(--font-arcade)", fontSize: 10, color: "var(--neon-yellow)", letterSpacing: "0.1em", marginBottom: 6 }}>
              LOCACIÓN N° {(selected + 1).toString().padStart(2, "0")} · ASIGNADA
            </div>
            <div className="h-arcade" style={{ fontSize: 14, color: "var(--neon-orange)", lineHeight: 1.4, marginBottom: 4 }}>
              {loc.name}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 18, color: "var(--neon-green)" }}>
              {loc.city}
            </div>
          </div>
        )}

        {/* 11 location list */}
        <details style={{ marginTop: 12 }}>
          <summary style={{
            fontFamily: "var(--font-arcade)", fontSize: 10, color: "var(--ink-dim)",
            cursor: "pointer", letterSpacing: "0.08em",
          }}>
            ▾ VER LAS 11 LOCACIONES
          </summary>
          <ol style={{
            margin: "10px 0 0", padding: 0, listStyle: "none",
            display: "grid", gridTemplateColumns: "1fr", gap: 4,
            counterReset: "loc",
          }}>
            {LOCATIONS.map((l, i) => (
              <li key={i} style={{
                counterIncrement: "loc",
                fontFamily: "var(--font-mono)", fontSize: 17,
                color: selected === i ? "var(--neon-yellow)" : "var(--ink)",
                padding: "4px 6px",
                background: selected === i ? "rgba(208,219,151,0.18)" : "transparent",
                display: "flex", gap: 8, alignItems: "baseline",
              }}>
                <span style={{
                  fontFamily: "var(--font-arcade)", fontSize: 9,
                  color: "var(--neon-cyan)", minWidth: 22,
                }}>{(i+1).toString().padStart(2, "0")}</span>
                <span><strong>{l.name}</strong> — <span style={{ color: "var(--ink-dim)" }}>{l.city}</span></span>
              </li>
            ))}
          </ol>
        </details>
      </div>

      {/* PASO 2 — Google Earth */}
      <div className="px-card px-card--cyan" style={{ marginBottom: 14, padding: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-cyan)", letterSpacing: "0.08em" }}>
            🌍 GOOGLE EARTH
          </div>
          {seen[1] && <span style={{ fontFamily: "var(--font-arcade)", fontSize: 10, color: "var(--neon-green)" }}>✓ HECHO</span>}
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 18, margin: "0 0 10px", lineHeight: 1.2 }}>
          {loc
            ? <>Explora <strong style={{ color: "var(--neon-yellow)" }}>{loc.name}</strong> en{" "}
                <strong>{loc.city}</strong>. Toma captura, envía al grupo de WhatsApp con descripción.</>
            : <>Primero gira la ruleta para recibir tu locación.</>}
        </p>
        <a href={earthUrl} target="_blank" rel="noopener" className="px-btn px-btn--cyan" style={{
          width: "100%", boxSizing: "border-box", fontSize: 11, textDecoration: "none", marginBottom: 8,
        }}>↗ ABRIR GOOGLE EARTH</a>
        <button
          className={`px-btn ${seen[1] ? "px-btn--green" : "px-btn--ghost"}`}
          style={{ width: "100%", fontSize: 10 }}
          onClick={() => toggleSeen(1)}
        >
          {seen[1] ? "✓ EXPLORÉ Y ENVIÉ CAPTURA" : "MARCAR: EXPLORÉ + ENVIÉ CAPTURA"}
        </button>
      </div>

      {/* PASO 3 — Video */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-orange)", letterSpacing: "0.08em" }}>
            ▶ VIDEO · GLOBALIZACIÓN Y MIGRACIONES
          </div>
          {seen[2] && <span style={{ fontFamily: "var(--font-arcade)", fontSize: 10, color: "var(--neon-green)" }}>✓ HECHO</span>}
        </div>
        <YTEmbed id="zZ5R3b1RQLY" />
        <button
          className={`px-btn ${seen[2] ? "px-btn--green" : "px-btn--orange"}`}
          style={{ width: "100%", marginTop: 10, fontSize: 11 }}
          onClick={() => toggleSeen(2)}
        >
          {seen[2] ? "✓ MARCADO COMO VISTO" : "MARCAR COMO VISTO"}
        </button>
      </div>

      {/* PASO 4 — Wordwall */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-green)", letterSpacing: "0.08em" }}>
            🎮 WORDWALL · GLOBALIZACIÓN
          </div>
          {seen[3] && <span style={{ fontFamily: "var(--font-arcade)", fontSize: 10, color: "var(--neon-green)" }}>✓ HECHO</span>}
        </div>
        <WordwallEmbed
          src="https://wordwall.net/es/embed/cfca686c984d4722a64892fe91af3ed6?themeId=66&templateId=35&fontStackId=0"
          color="green"
        />
        <button
          className={`px-btn ${seen[3] ? "px-btn--green" : "px-btn--green"}`}
          style={{ width: "100%", marginTop: 10, fontSize: 11, opacity: seen[3] ? 1 : 0.85 }}
          onClick={() => toggleSeen(3)}
        >
          {seen[3] ? "✓ MARCADO COMO VISTO" : "MARCAR COMO VISTO"}
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
          El equipo con mayor puntaje gana la insignia{" "}
          <strong style={{ color: "var(--neon-green)" }}>Exploradores del Planeta</strong>.
        </p>
      </div>

      <button
        className="px-btn px-btn--green"
        disabled={!allSeen || alreadyAwarded}
        style={{ width: "100%", fontSize: 13 }}
        onClick={award}
      >
        {alreadyAwarded ? "★ INSIGNIA OBTENIDA ★" : allSeen ? "★ RECLAMAR INSIGNIA ★" : `Completa los ${TOTAL} pasos (${seen.filter(Boolean).length}/${TOTAL})`}
      </button>

      <div style={{ marginTop: 12 }}>
        <button className="px-btn px-btn--ghost" onClick={() => go(5)}>← MAPA</button>
      </div>

      <BadgeAward
        shown={showBadge}
        color="green"
        letter="B"
        title="EXPLORADORES DEL PLANETA"
        subtitle={loc
          ? `¡${state.groupName || "Equipo"} exploró ${loc.name} en ${loc.city}!`
          : "¡Recorrieron el mundo y conectaron globalización con migración!"}
        onClose={() => { setShowBadge(false); go(5); }}
      />
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// BLOQUE 8 — VIAJE
// Insignia: DEFENSORES DE LA CIUDADANÍA GLOBAL
// ────────────────────────────────────────────────────────────
function Block8Journey({ go, state, setState }) {
  const tabs = [
    { label: "CUESTIONARIO", color: "cyan", kind: "ww",
      src: "https://wordwall.net/es/embed/29cab83dc9ca40718c5abb9b76a2eb62?themeId=49&templateId=5&fontStackId=0" },
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
          Resuelve <span style={{ color: "var(--neon-yellow)" }}>desafíos</span> relacionados con situaciones reales de
          migración y globalización.
        </p>
      </div>

      <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-yellow)", margin: "10px 0 8px", letterSpacing: "0.08em" }}>
        ★ INSTRUCCIONES
      </div>
      <ol className="steps" style={{ marginBottom: 18 }}>
        <li>Resuelve el <strong>cuestionario</strong> en Wordwall con tu equipo: <span style={{ color: "var(--neon-green)" }}>{state.groupName || "____"}</span></li>
        <li>Suma el mejor puntaje en el menor tiempo posible.</li>
        <li>El equipo con mayor puntaje gana la insignia <strong style={{ color: "var(--neon-cyan)" }}>Defensores de la Ciudadanía Global</strong>.</li>
      </ol>

      <div style={{ display: "flex", gap: 4, marginBottom: 10, overflowX: "auto", paddingBottom: 4 }}>
        {tabs.map((tt, i) => (
          <button key={i} onClick={() => setTab(i)} style={{
            flex: "0 0 auto",
            fontFamily: "var(--font-arcade)", fontSize: 11,
            padding: "8px 10px",
            background: tab === i ? `var(--neon-${tt.color})` : "transparent",
            color: tab === i ? "#051a1d" : `var(--neon-${tt.color})`,
            border: `2px solid var(--neon-${tt.color})`,
            cursor: "pointer", letterSpacing: "0.06em", whiteSpace: "nowrap",
            position: "relative",
          }}>
            {seen[i] && (
              <span style={{
                position: "absolute", top: -6, right: -6,
                background: "var(--neon-green)", color: "#051a1d",
                width: 14, height: 14, fontSize: 9,
                display: "grid", placeItems: "center",
                border: "1px solid #02080a",
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
          Mejor puntaje gana la insignia{" "}
          <strong style={{ color: "var(--neon-cyan)" }}>Defensores de la Ciudadanía Global</strong>.
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
        title="DEFENSORES DE LA CIUDADANÍA GLOBAL"
        subtitle={`¡${state.groupName || "Equipo"} resolvió los desafíos del mundo global!`}
        onClose={() => { setShowBadge(false); go(5); }}
      />
    </div>
  );
}

Object.assign(window, {
  Block6Content, Block7Training, Block8Journey, BadgeAward, YTEmbed,
  CanvaEmbed, WordwallEmbed, RouletteWheel, LOCATIONS,
});
