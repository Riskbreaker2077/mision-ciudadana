// m6-finale.jsx — Bloque 9: Pantalla final · Misión Ciudadana Módulo 6
// Globalización y Migraciones

function Block9Finale({ go, state, setState }) {
  const [imgError, setImgError] = React.useState(false);
  const finaleImg = (window.__resources && window.__resources.finaleImg) || null;
  const showImg = finaleImg || !imgError;
  const [reflection, setReflection] = React.useState(() => {
    try { return localStorage.getItem("m6_reflection") || ""; } catch(e) { return ""; }
  });
  const [reflectionSaved, setReflectionSaved] = React.useState(false);

  React.useEffect(() => {
    try { localStorage.setItem("m6_reflection", reflection); } catch(e) {}
  }, [reflection]);

  const messages = [
    "La globalización conecta a las personas, las economías y las culturas: lo que pasa en un puerto, una frontera o una ciudad lejana puede cambiar la vida de tu barrio.",
    "Las migraciones recuerdan que detrás de cada ruta hay una persona buscando trabajo, refugio o un futuro mejor — y que ningún muro borra esa historia.",
    "¡Somos ciudadanos del mundo! Comprender la globalización y respetar a quienes migran es construir un planeta más justo, diverso y humano.",
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
        background: "rgba(5,26,29,0.7)",
        border: "3px solid var(--neon-yellow)",
        boxShadow: "4px 4px 0 #02080a, 4px 4px 0 3px var(--neon-yellow)",
        alignSelf: "center",
      }}>
        {showImg ? (
          <img
            src={finaleImg || "assets/m6-finale.png"}
            alt="Mundo conectado · ciudadanos globales celebrando la diversidad"
            style={{ display: "block", width: 300, maxWidth: "100%", height: "auto", imageRendering: "pixelated" }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div style={{
            width: 300, maxWidth: "100%", height: 220,
            display: "grid", placeItems: "center",
            background: "repeating-linear-gradient(135deg, #1a7a82, #1a7a82 10px, #0a3338 10px, #0a3338 20px)",
            position: "relative",
          }}>
            <div className="globe-spin" style={{
              fontSize: 80,
              filter: "drop-shadow(0 0 12px rgba(208,219,151,0.7))",
            }}>🌍</div>
            <div style={{
              position: "absolute", bottom: 8, left: 0, right: 0,
              fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--neon-yellow)",
              letterSpacing: "0.08em",
            }}>
              [ VICTORIA — imagen pendiente ]
            </div>
          </div>
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

      <div className="px-card px-card--orange" style={{ position: "relative", zIndex: 2, padding: 14 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 21, lineHeight: 1.25, margin: 0, color: "var(--ink)", fontWeight: 600, textAlign: "left" }}>
          {messages[2]}
        </p>
      </div>

      {/* Pregunta de reflexión final */}
      <div className="px-card px-card--green" style={{ position: "relative", zIndex: 2, padding: 14, textAlign: "left" }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-green)", marginBottom: 8, letterSpacing: "0.08em" }}>
          ✎ REFLEXIÓN FINAL
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 19, lineHeight: 1.25, margin: "0 0 10px", color: "var(--ink)" }}>
          ¿Qué <span style={{ color: "var(--neon-yellow)" }}>oportunidades</span> y qué{" "}
          <span style={{ color: "var(--neon-pink)" }}>retos</span> nos traen la globalización y las
          migraciones a Colombia, y qué podrías hacer tú para que tu comunidad sea más{" "}
          <span style={{ color: "var(--neon-orange)" }}>abierta y justa</span>?
        </p>
        <textarea
          value={reflection}
          onChange={(e) => { setReflection(e.target.value); setReflectionSaved(false); }}
          placeholder="Escribe aquí tu respuesta…"
          rows={5}
          style={{
            width: "100%", boxSizing: "border-box",
            fontFamily: "var(--font-mono)", fontSize: 18,
            background: "#051a1d", color: "var(--neon-yellow)",
            border: "2px solid var(--neon-green)",
            outline: "none", padding: "10px 12px",
            letterSpacing: "0.03em", resize: "vertical",
          }}
        />
        <button
          className="px-btn px-btn--green"
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
            background: `linear-gradient(135deg, var(--neon-${b.c}), var(--neon-cyan))`,
            clipPath: "polygon(50% 0%,90% 20%,100% 50%,90% 80%,50% 100%,10% 80%,0% 50%,10% 20%)",
            display: "grid", placeItems: "center",
            fontFamily: "var(--font-arcade)", fontSize: 16,
            color: "#051a1d",
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
            b6Seen: [false, false, false],
            b7Steps: Array(6).fill(false),
            b7Selected: null,
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
