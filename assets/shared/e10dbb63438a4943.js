// m5-finale.jsx — Bloque 9: Pantalla final · Misión Ciudadana Módulo 5

function Block9Finale({ go, state, setState }) {
  const [imgError, setImgError] = React.useState(false);
  const finaleImg = (window.__resources && window.__resources.finaleImg) || null;
  const showImg = finaleImg || !imgError;
  const [reflection, setReflection] = React.useState(() => {
    try { return localStorage.getItem("m5_reflection") || ""; } catch(e) { return ""; }
  });
  const [reflectionSaved, setReflectionSaved] = React.useState(false);

  React.useEffect(() => {
    try { localStorage.setItem("m5_reflection", reflection); } catch(e) {}
  }, [reflection]);

  const messages = [
    "Los mecanismos de protección ciudadana son escudos al alcance de todos: tutela, habeas corpus, habeas data, derecho de petición y acciones populares no son privilegios — son derechos.",
    "Conocerlos y usarlos cuando un derecho es vulnerado es lo que convierte a una persona en ciudadana activa de su propio destino.",
    "¡Nuestros derechos, nuestra fuerza, nuestro futuro! Mientras una voz se levante a defenderlos, ninguna ciudadela del desamparo podrá levantarse.",
  ];

  return (
    <div className="screen-body" style={{
      paddingBottom: 40,
      display: "flex", flexDirection: "column",
      alignItems: "stretch", textAlign: "center",
      minHeight: "100%", paddingTop: 70, gap: 14,
    }}>
      <div className="pixel-grid" />

      <div style={{
        fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-yellow)",
        letterSpacing: "0.2em", marginBottom: 8, position: "relative", zIndex: 2,
      }} className="glow-yellow">
        ★ ★ ★ ★ ★ ★ ★
      </div>

      <h1 className="h-arcade glow-orange" style={{
        fontSize: 19, color: "var(--neon-orange)", margin: "8px 0 4px",
        position: "relative", zIndex: 2, lineHeight: 1.5,
      }}>
        ¡MISIÓN<br />COMPLETADA!
      </h1>

      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 19, color: "var(--neon-green)",
        marginBottom: 14, position: "relative", zIndex: 2, letterSpacing: "0.04em",
      }}>
        Equipo {state.groupName || "—"}
      </div>

      <div style={{
        position: "relative", zIndex: 2,
        padding: 6,
        background: "rgba(22,10,20,0.7)",
        border: "3px solid var(--neon-purple)",
        boxShadow: "4px 4px 0 #08040a, 4px 4px 0 3px var(--neon-purple)",
        alignSelf: "center",
      }}>
        {showImg ? (
          <img
            src={finaleImg || "assets/m5-finale.png"}
            alt="¡Nuestros derechos, nuestra fuerza, nuestro futuro! — ciudadanos defendiendo derechos"
            style={{ display: "block", width: 300, maxWidth: "100%", height: "auto", imageRendering: "pixelated" }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div style={{
            width: 300, maxWidth: "100%", height: 200,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(135deg, #160a14 0%, #fb8b24 100%)",
            fontFamily: "var(--font-arcade)", fontSize: 48, color: "var(--neon-yellow)",
          }}>⚖</div>
        )}
      </div>

      <div className="px-card px-card--yellow" style={{ position: "relative", zIndex: 2, padding: 14 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-yellow)", marginBottom: 8, letterSpacing: "0.08em" }}>
          ✦ MENSAJE FINAL ✦
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 20, lineHeight: 1.25, margin: 0, color: "var(--ink)", textAlign: "left" }}>
          {messages[0]}
        </p>
      </div>

      <div className="px-card px-card--cyan" style={{ position: "relative", zIndex: 2, padding: 14 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 19, lineHeight: 1.25, margin: 0, color: "var(--neon-green)", textAlign: "left" }}>
          {messages[1]}
        </p>
      </div>

      <div className="px-card px-card--purple" style={{ position: "relative", zIndex: 2, padding: 14 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 21, lineHeight: 1.25, margin: 0, color: "var(--ink)", fontWeight: 600, textAlign: "left" }}>
          {messages[2]}
        </p>
      </div>

      {/* Pregunta de reflexión final */}
      <div className="px-card px-card--orange" style={{ position: "relative", zIndex: 2, padding: 14, textAlign: "left" }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-orange)", marginBottom: 8, letterSpacing: "0.08em" }}>
          ✎ REFLEXIÓN FINAL
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 19, lineHeight: 1.25, margin: "0 0 10px", color: "var(--ink)" }}>
          ¿Por qué crees que muchas personas <span style={{ color: "var(--neon-pink)" }}>no conocen</span> ni
          usan los mecanismos de protección ciudadana, y <span style={{ color: "var(--neon-green)" }}>qué harías tú</span> para cambiar
          eso en tu comunidad?
        </p>
        <textarea
          value={reflection}
          onChange={(e) => { setReflection(e.target.value); setReflectionSaved(false); }}
          placeholder="Escribe aquí tu respuesta…"
          rows={5}
          style={{
            width: "100%", boxSizing: "border-box",
            fontFamily: "var(--font-mono)", fontSize: 18,
            background: "#160a14", color: "var(--neon-green)",
            border: "2px solid var(--neon-orange)",
            outline: "none", padding: "10px 12px",
            letterSpacing: "0.03em", resize: "vertical",
          }}
        />
        <button
          className="px-btn px-btn--orange"
          style={{ marginTop: 10, fontSize: 11 }}
          onClick={() => { setReflectionSaved(true); }}
          disabled={!reflection.trim()}
        >
          {reflectionSaved ? "✓ GUARDADO" : "GUARDAR REFLEXIÓN"}
        </button>
      </div>

      <div style={{
        display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap",
        position: "relative", zIndex: 2,
      }}>
        {[
          { c: "orange", l: "A" },
          { c: "green",  l: "B" },
          { c: "cyan",   l: "C" },
          { c: "yellow", l: "★" },
        ].map((b, i) => (
          <div key={i} style={{
            width: 56, height: 56,
            background: `linear-gradient(135deg, var(--neon-${b.c}), var(--neon-purple))`,
            clipPath: "polygon(50% 0%,90% 20%,100% 50%,90% 80%,50% 100%,10% 80%,0% 50%,10% 20%)",
            display: "grid", placeItems: "center",
            fontFamily: "var(--font-arcade)", fontSize: 16,
            color: b.c === "yellow" ? "#160a14" : "var(--cream)",
            filter: "drop-shadow(0 0 6px currentColor)",
          }}>{b.l}</div>
        ))}
      </div>

      <div style={{
        fontFamily: "var(--font-arcade)", fontSize: 10, color: "var(--ink-dim)",
        letterSpacing: "0.15em", position: "relative", zIndex: 2,
      }}>
        — GRACIAS POR JUGAR —
      </div>

      <button
        className="px-btn px-btn--purple"
        style={{ fontSize: 12, position: "relative", zIndex: 2, alignSelf: "center" }}
        onClick={() => go(5)}
      >
        ← VOLVER AL MAPA
      </button>

      <button
        className="px-btn px-btn--ghost"
        style={{ fontSize: 11, position: "relative", zIndex: 2, alignSelf: "center" }}
        onClick={() => {
          setState({
            groupName: "",
            badges: [false, false, false],
            b6Seen: [false, false, false, false, false, false, false, false],
            b7Steps: Array(6).fill(false),
            b7Done: false,
            qrFound: Array(10).fill(false),
            bossDefeated: false,
          });
          go(1);
        }}
      >
        ⟲ NUEVA AVENTURA
      </button>
    </div>
  );
}

Object.assign(window, { Block9Finale });
