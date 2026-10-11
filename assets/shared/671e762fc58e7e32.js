// m3-modules.jsx — Bloques 6, 7, 8 · Misión Ciudadana Módulo 3
// Constitución Política de Colombia

// ────────────────────────────────────────────────────────────
// BadgeAward — overlay de celebración
// ────────────────────────────────────────────────────────────
function BadgeAward({ shown, color = "yellow", letter, title, subtitle, onClose }) {
  if (!shown) return null;
  const confettiColors = ["#82204a","#e03070","#558c8c","#e8db7d","#7ac4c4","#b83d65"];
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
    <div style={{
      position: "absolute", inset: 0, zIndex: 200,
      background: "rgba(26,12,31,0.94)",
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
          background: `linear-gradient(135deg, var(--neon-${color}), var(--neon-purple))`,
          color: "#eff7ff",
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
// YTEmbed — wrapper de YouTube
// ────────────────────────────────────────────────────────────
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
// Video introductorio + Presentación Canva + Wordwall
// Insignia: CONSTITUYENTES
// ────────────────────────────────────────────────────────────
function Block6Content({ go, state, setState }) {
  const [tab, setTab] = React.useState(0); // 0=video 1=presentación 2=wordwall
  const initialSeen = (state.b6Seen && state.b6Seen.length >= 3)
    ? state.b6Seen.slice(0, 3) : [false, false, false];
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
        LA CONSTITUCIÓN<br />POLÍTICA
      </h2>

      <div className="px-card px-card--cyan" style={{ marginBottom: 14, padding: 14 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 19, lineHeight: 1.2, margin: 0 }}>
          Hoy comprenderás el <span style={{ color: "var(--neon-yellow)" }}>origen</span> y la
          <span style={{ color: "var(--neon-yellow)" }}> estructura</span> de la Constitución Política
          de 1991. El video, la presentación y el Wordwall te darán las bases.
        </p>
      </div>

      <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-yellow)", margin: "10px 0 8px", letterSpacing: "0.08em" }}>
        ★ INSTRUCCIONES
      </div>
      <ol className="steps" style={{ marginBottom: 18 }}>
        <li>Observa el <strong>video</strong> introductorio.</li>
        <li>Lee la <strong>presentación</strong> sobre la Constitución.</li>
        <li>Resuelve <em>"A bordo de la Constitución"</em> en <strong>Wordwall</strong>.</li>
        <li>El equipo con mejor puntaje recibe la insignia <strong style={{ color: "var(--neon-cyan)" }}>Constituyentes</strong>.</li>
      </ol>

      {/* Tab strip */}
      <div style={{ display: "flex", gap: 4, marginBottom: 10, overflowX: "auto", paddingBottom: 4 }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)} style={{
            flex: "0 0 auto",
            fontFamily: "var(--font-arcade)", fontSize: 11,
            padding: "8px 10px",
            background: tab === i ? `var(--neon-${t.color})` : "transparent",
            color: tab === i ? "#1a0c1f" : `var(--neon-${t.color})`,
            border: `2px solid var(--neon-${t.color})`,
            cursor: "pointer", letterSpacing: "0.06em", whiteSpace: "nowrap",
            position: "relative",
          }}>
            {seen[i] && (
              <span style={{
                position: "absolute", top: -6, right: -6,
                background: "var(--neon-cyan)", color: "#1a0c1f",
                width: 14, height: 14, fontSize: 9,
                display: "grid", placeItems: "center",
                border: "1px solid #1a0c1f",
              }}>✓</span>
            )}
            {t.label}
          </button>
        ))}
      </div>

      {/* Contenido del tab activo */}
      <div style={{ marginBottom: 12 }}>
        {tab === 0 && (
          <YTEmbed id="gUNqRxs-SAM" />
        )}

        {tab === 1 && (
          <>
            <div style={{
              position: "relative", width: "100%", height: 0, paddingTop: "56.25%",
              border: "2px solid var(--neon-cyan)",
              boxShadow: "4px 4px 0 #1a0c1f, 4px 4px 0 2px var(--neon-cyan)",
              overflow: "hidden", background: "#000",
            }}>
              <iframe
                loading="lazy"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, padding: 0, margin: 0 }}
                src="https://www.canva.com/design/DAHJHDMt0qU/cvbXYuex2mA6Dopd1kbE6g/view?embed"
                title="Misión Ciudadana Módulo 3 — Constitución"
                allow="fullscreen"
                allowFullScreen
              />
            </div>
            <a
              href="https://www.canva.com/design/DAHJHDMt0qU/cvbXYuex2mA6Dopd1kbE6g/view?utm_content=DAHJHDMt0qU&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
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
          <>
            <div style={{
              position: "relative", width: "100%", height: 0, paddingTop: "75%",
              border: "2px solid var(--neon-orange)",
              boxShadow: "4px 4px 0 #1a0c1f, 4px 4px 0 2px var(--neon-orange)",
              overflow: "hidden", background: "#000",
            }}>
              <iframe
                loading="lazy"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                src="https://wordwall.net/es/embed/07cd2713f91044b1b12394288d8b910d?themeId=46&templateId=48&fontStackId=0"
                title="A bordo de la Constitución — Wordwall"
                allowFullScreen
              />
            </div>
          </>
        )}

        <button
          className={`px-btn ${seen[tab] ? "px-btn--green" : "px-btn--cyan"}`}
          style={{ width: "100%", marginTop: 12, fontSize: 12 }}
          onClick={() => toggleSeen(tab)}
        >
          {seen[tab] ? "✓ MARCADO COMO VISTO" : "MARCAR COMO VISTO"}
        </button>
      </div>

      {/* Progreso */}
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
          El equipo con mayor puntaje en Wordwall recibe la insignia{" "}
          <strong style={{ color: "var(--neon-cyan)" }}>Constituyentes</strong>.
        </p>
      </div>

      <button
        className="px-btn px-btn--green"
        disabled={!allSeen}
        style={{ width: "100%", fontSize: 13 }}
        onClick={award}
      >
        {allSeen ? "★ RECLAMAR INSIGNIA ★" : `Completa los 3 recursos (${seen.filter(Boolean).length}/3)`}
      </button>

      <div style={{ marginTop: 12 }}>
        <button className="px-btn px-btn--ghost" onClick={() => go(5)}>← MAPA</button>
      </div>

      <BadgeAward
        shown={showBadge}
        color="cyan"
        letter="A"
        title="CONSTITUYENTES"
        subtitle="¡Conoces el origen y la estructura de la Constitución!"
        onClose={() => { setShowBadge(false); go(5); }}
      />
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// BLOQUE 7 — ENTRENAMIENTO
// Tour virtual Senado + Ficha técnica senador/a
// Insignia: LOS PLURALISTAS
// ────────────────────────────────────────────────────────────
function Block7Training({ go, state, setState }) {
  const initSteps = (state.b7Steps && state.b7Steps.length >= 6)
    ? state.b7Steps.slice(0, 6) : Array(6).fill(false);
  const [steps, setSteps] = React.useState(initSteps);
  const [showBadge, setShowBadge] = React.useState(false);
  const allDone = steps.every(Boolean);
  const completed = state.b7Done || false;

  const toggleStep = (i) => {
    setSteps(prev => {
      const n = [...prev]; n[i] = !n[i];
      setState(s => ({ ...s, b7Steps: n }));
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

  const stepDefs = [
    { label: "Entra al tour virtual del Senado", link: "https://tourvirtualsenado.uberflug.co", linkLabel: "↗ Abrir Tour Virtual" },
    { label: "Busca la curul de tu senador/a asignado/a en la Plenaria", link: null },
    { label: "Toma una captura de pantalla desde el tour con el lugar donde se sienta", link: null },
    { label: "Busca en internet el proyecto de ley o iniciativa reciente de tu senador/a", link: null },
    { label: "Completa la ficha técnica (agrégale el nombre del equipo y la captura del paso 3)", link: "https://caropc.notion.site/Fichas-T-cnicas-Senador-a-de-la-Rep-blica-35ac3d8ce16080e285f5ea9f577da05b", linkLabel: "↗ Abrir Ficha Técnica" },
    { label: "Realiza la exposición con tu grupo sobre tu senador/a", link: null },
  ];

  return (
    <div className="screen-body" style={{ paddingBottom: 110 }}>
      <h2 className="h-arcade glow-orange" style={{ fontSize: 19, color: "var(--neon-orange)", margin: "6px 0 12px", lineHeight: 1.5 }}>
        ENTRENAMIENTO<br />EN EL SENADO
      </h2>

      <div className="px-card px-card--orange" style={{ marginBottom: 14 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 20, margin: 0, lineHeight: 1.2 }}>
          Investiga el trabajo de un <span style={{ color: "var(--neon-yellow)" }}>senador/a</span> colombiano/a y
          prepara una exposición sobre su proyecto de ley.
        </p>
      </div>

      <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-yellow)", margin: "10px 0 8px", letterSpacing: "0.08em" }}>
        ★ COMPLETA LOS 6 PASOS
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {stepDefs.map((s, i) => (
          <div key={i} className={"step-row" + (steps[i] ? " done" : "")}>
            <div className="step-check" onClick={() => toggleStep(i)}>
              {steps[i] ? "✓" : String(i + 1)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 19, color: "var(--ink)", lineHeight: 1.2 }}>
                {s.label}
              </div>
              {s.link && (
                <a
                  href={s.link}
                  target="_blank"
                  rel="noopener"
                  style={{
                    display: "inline-block", marginTop: 4,
                    fontFamily: "var(--font-mono)", fontSize: 17,
                    color: "var(--neon-cyan)", textDecoration: "underline",
                  }}
                >
                  {s.linkLabel}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Progreso */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <ProgressBar value={steps.filter(Boolean).length} total={6} />
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-cyan)", whiteSpace: "nowrap" }}>
          {steps.filter(Boolean).length}/6
        </div>
      </div>

      <div className="px-card px-card--yellow" style={{ padding: 12, marginBottom: 12 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-yellow)", marginBottom: 6 }}>
          ✎ INSIGNIA EN JUEGO
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 18, margin: 0, lineHeight: 1.2 }}>
          El equipo que cumpla todos los pasos y haga la exposición gana la insignia{" "}
          <strong style={{ color: "var(--neon-orange)" }}>Los Pluralistas</strong>.
        </p>
      </div>

      <button
        className="px-btn px-btn--green"
        disabled={!allDone || completed}
        style={{ width: "100%", fontSize: 13 }}
        onClick={award}
      >
        {completed ? "★ INSIGNIA OBTENIDA ★" : allDone ? "★ RECLAMAR INSIGNIA ★" : `Completa los 6 pasos (${steps.filter(Boolean).length}/6)`}
      </button>

      <div style={{ marginTop: 12 }}>
        <button className="px-btn px-btn--ghost" onClick={() => go(5)}>← MAPA</button>
      </div>

      <BadgeAward
        shown={showBadge}
        color="orange"
        letter="B"
        title="LOS PLURALISTAS"
        subtitle="¡Investigaste el Senado y conoces el trabajo legislativo!"
        onClose={() => { setShowBadge(false); go(5); }}
      />
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// BLOQUE 8 — VIAJE
// 2 casos reales + Wordwall compartido
// Insignia: LOS TUTELADORES
// ────────────────────────────────────────────────────────────
function Block8Journey({ go, state, setState }) {
  const cases = [
    {
      id: "tutela",
      title: "LA TUTELA DE UN ESTUDIANTE",
      color: "cyan",
      summary: "En 2024, la Corte Constitucional protegió el derecho a la educación de estudiantes cuya matrícula fue cancelada sin seguir el debido proceso. Los artículos 67 y 29 de la Constitución son los pilares de esta decisión.",
      articles: [
        { label: "Sentencia T-330 de 2024 — Corte Constitucional", url: "https://www.corteconstitucional.gov.co/relatoria/2024/t-330-24.htm" },
        { label: "¿Estás de acuerdo con las sanciones disciplinarias escolares? — La Manizales de la Alma", url: "https://mimanizalesdelalma.com/noticias/estas-de-acuerdo-con-las-sanciones-disciplinarias-escolares-la-corte-exige-mas-garantias-para-los-estudiantes/" },
      ],
    },
    {
      id: "constituyente",
      title: "LA CASA DE TODOS",
      color: "orange",
      summary: "En 2026, el gobierno de Gustavo Petro propuso una Asamblea Constituyente para reformas profundas. Otros sectores promovieron un referendo para proteger la Constitución de 1991 y la estabilidad democrática. El debate: ¿quién tiene la última palabra en los cambios constitucionales?",
      articles: [
        { label: "La Constitución es la casa de todos los colombianos — El Tiempo", url: "https://www.eltiempo.com/politica/la-constitucion-es-la-casa-de-todos-los-colombianos-el-referendo-que-pretende-frenar-la-constituyente-del-gobierno-de-gustavo-petro-3553569" },
      ],
    },
  ];

  const initProgress = (state.qrFound && state.qrFound.length >= 3)
    ? state.qrFound.slice(0, 3) : [false, false, false];
  // [0] = caso1 leído, [1] = caso2 leído, [2] = wordwall terminado

  const [progress, setProgress] = React.useState(initProgress);
  const [openCase, setOpenCase] = React.useState(0);
  const [showWordwall, setShowWordwall] = React.useState(false);
  const [showBadge, setShowBadge] = React.useState(false);
  const allDone = progress.every(Boolean);

  const toggle = (i) => {
    setProgress(prev => {
      const n = [...prev]; n[i] = !n[i];
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
      <h2 className="h-arcade glow-green" style={{ fontSize: 19, color: "var(--neon-green)", margin: "6px 0 12px", lineHeight: 1.5 }}>
        EL VIAJE<br />CONSTITUCIONAL
      </h2>

      <div className="px-card px-card--green" style={{ marginBottom: 14 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 19, margin: 0, lineHeight: 1.2 }}>
          Lee cada caso, revisa los documentos de apoyo y responde el concurso en
          <span style={{ color: "var(--neon-yellow)" }}> Wordwall</span> con el nombre de tu equipo.
        </p>
      </div>

      <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-yellow)", margin: "4px 0 8px", letterSpacing: "0.08em" }}>
        ★ INSTRUCCIONES
      </div>
      <ol className="steps" style={{ marginBottom: 16 }}>
        <li>Lee la descripción de cada caso.</li>
        <li>Lee los <strong>documentos de apoyo</strong> de cada caso.</li>
        <li>Responde las preguntas en <strong>Wordwall</strong> con tu equipo: <span style={{ color: "var(--neon-cyan)" }}>{state.groupName || "____"}</span></li>
        <li>Mejor puntaje en menor tiempo gana la insignia <strong style={{ color: "var(--neon-green)" }}>Los Tuteladores</strong>.</li>
      </ol>

      {/* Selector de casos */}
      <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
        {cases.map((cs, i) => (
          <button key={cs.id} onClick={() => setOpenCase(i)} style={{
            flex: 1,
            fontFamily: "var(--font-arcade)", fontSize: 10,
            padding: "8px 6px",
            background: openCase === i ? `var(--neon-${cs.color})` : "transparent",
            color: openCase === i ? "#1a0c1f" : `var(--neon-${cs.color})`,
            border: `2px solid var(--neon-${cs.color})`,
            cursor: "pointer", letterSpacing: "0.04em", position: "relative",
          }}>
            {progress[i] && (
              <span style={{
                position: "absolute", top: -6, right: -6,
                background: "var(--neon-cyan)", color: "#1a0c1f",
                width: 14, height: 14, fontSize: 9,
                display: "grid", placeItems: "center", border: "1px solid #1a0c1f",
              }}>✓</span>
            )}
            CASO {i + 1}
          </button>
        ))}
      </div>

      {/* Tarjeta del caso activo */}
      <div className={`px-card px-card--${c.color}`} style={{ marginBottom: 12, padding: 14 }}>
        <div className="h-arcade" style={{ fontSize: 12, color: `var(--neon-${c.color})`, marginBottom: 8, lineHeight: 1.4 }}>
          {c.title}
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 18, margin: "0 0 14px", lineHeight: 1.25 }}>
          {c.summary}
        </p>

        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-yellow)", marginBottom: 8, letterSpacing: "0.06em" }}>
          📄 DOCUMENTOS DE APOYO
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
          {c.articles.map((a, idx) => (
            <a
              key={idx}
              href={a.url}
              target="_blank"
              rel="noopener"
              className={`px-btn px-btn--${c.color}`}
              style={{ width: "100%", textDecoration: "none", fontSize: 10, boxSizing: "border-box", textAlign: "center", lineHeight: 1.3 }}
            >
              ↗ {a.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => toggle(openCase)}
          className={`px-btn ${progress[openCase] ? "px-btn--green" : "px-btn--ghost"}`}
          style={{ width: "100%", fontSize: 10, boxSizing: "border-box" }}
        >
          {progress[openCase] ? "✓ CASO ESTUDIADO" : "MARCAR CASO COMO ESTUDIADO"}
        </button>
      </div>

      {/* Wordwall compartido */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-yellow)", marginBottom: 8, letterSpacing: "0.08em" }}>
          ⚔ CONCURSO WORDWALL
        </div>
        <button
          className="px-btn px-btn--purple"
          style={{ width: "100%", marginBottom: 10, fontSize: 11 }}
          onClick={() => setShowWordwall(v => !v)}
        >
          {showWordwall ? "▲ OCULTAR WORDWALL" : "▼ MOSTRAR WORDWALL"}
        </button>

        {showWordwall && (
          <div style={{
            position: "relative", width: "100%", height: 0, paddingTop: "75%",
            border: "2px solid var(--neon-purple)",
            boxShadow: "4px 4px 0 #1a0c1f, 4px 4px 0 2px var(--neon-purple)",
            overflow: "hidden", background: "#000",
            marginBottom: 10,
          }}>
            <iframe
              loading="lazy"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
              src="https://wordwall.net/es/embed/7774524f098e4dc7b9bb64b61ca34b2c?themeId=59&templateId=69&fontStackId=0"
              title="Wordwall — Constitución"
              allowFullScreen
            />
          </div>
        )}

        <button
          onClick={() => toggle(2)}
          className={`px-btn ${progress[2] ? "px-btn--green" : "px-btn--ghost"}`}
          style={{ width: "100%", fontSize: 10, boxSizing: "border-box" }}
        >
          {progress[2] ? "✓ WORDWALL COMPLETADO" : "MARCAR WORDWALL COMO COMPLETADO"}
        </button>
      </div>

      {/* Progreso */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-cyan)", letterSpacing: "0.08em" }}>PROGRESO</div>
          <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-yellow)" }}>{progress.filter(Boolean).length}/3</div>
        </div>
        <ProgressBar value={progress.filter(Boolean).length} total={3} />
      </div>

      <button
        className="px-btn px-btn--green"
        disabled={!allDone}
        style={{ width: "100%", fontSize: 11 }}
        onClick={award}
      >
        {allDone ? "★ RECLAMAR INSIGNIA ★" : `Completa los 3 pasos (${progress.filter(Boolean).length}/3)`}
      </button>

      <div style={{ marginTop: 12 }}>
        <button className="px-btn px-btn--ghost" onClick={() => go(5)}>← MAPA</button>
      </div>

      <BadgeAward
        shown={showBadge}
        color="green"
        letter="C"
        title="LOS TUTELADORES"
        subtitle={`¡${state.groupName || "Equipo"} analizó los casos constitucionales!`}
        onClose={() => { setShowBadge(false); go(5); }}
      />
    </div>
  );
}

Object.assign(window, {
  Block6Content, Block7Training, Block8Journey, BadgeAward, YTEmbed,
});
