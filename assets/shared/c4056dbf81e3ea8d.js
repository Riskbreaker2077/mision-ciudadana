// m3-finale.jsx — Bloque 9: Pantalla final · Misión Ciudadana Módulo 3

function Block9Finale({ go, state, setState }) {
  const [imgError, setImgError] = React.useState(false);
  const finaleImg = (window.__resources && window.__resources.finaleImg) || null;
  const showImg = !!finaleImg;

  const messages = [
    "La Constitución de 1991 es el resultado del sueño de miles de colombianos que creyeron que otra Colombia era posible.",
    "Conocer tus derechos constitucionales es el primer paso para defenderlos.",
    "Ser ciudadano no es solo tener cédula — es participar, exigir y proteger el pacto que nos une.",
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

      <h1 className="h-arcade glow-pink" style={{
        fontSize: 19, color: "var(--neon-pink)", margin: "8px 0 4px",
        position: "relative", zIndex: 2, lineHeight: 1.5,
      }}>
        ¡MISIÓN<br />COMPLETADA!
      </h1>

      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 19, color: "var(--neon-cyan)",
        marginBottom: 14, position: "relative", zIndex: 2, letterSpacing: "0.04em",
      }}>
        Equipo {state.groupName || "—"}
      </div>

      {/* Imagen final */}
      <div style={{
        position: "relative", zIndex: 2,
        padding: 6,
        background: "rgba(35,17,35,0.7)",
        border: "3px solid var(--neon-purple)",
        boxShadow: "4px 4px 0 #1a0c1f, 4px 4px 0 3px var(--neon-purple)",
        alignSelf: "center",
      }}>
        {showImg ? (
          <img
            src={window.__resources.finaleImg}
            alt="Ciudadanos celebrando con la Constitución Política"
            style={{ display: "block", width: 300, maxWidth: "100%", height: "auto", imageRendering: "pixelated" }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div style={{
            width: 300, maxWidth: "100%", height: 200,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(135deg, #231123 0%, #558c8c 100%)",
            fontFamily: "var(--font-arcade)", fontSize: 48, color: "var(--neon-yellow)",
          }}>🏛</div>
        )}
      </div>

      {/* Mensajes motivadores */}
      <div className="px-card px-card--yellow" style={{ position: "relative", zIndex: 2, padding: 14 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-yellow)", marginBottom: 8, letterSpacing: "0.08em" }}>
          ✦ MENSAJE FINAL ✦
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 20, lineHeight: 1.25, margin: 0, color: "var(--ink)", textAlign: "left" }}>
          {messages[0]}
        </p>
      </div>

      <div className="px-card px-card--cyan" style={{ position: "relative", zIndex: 2, padding: 14 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 19, lineHeight: 1.25, margin: 0, color: "var(--neon-cyan)", textAlign: "left" }}>
          {messages[1]}
        </p>
      </div>

      <div className="px-card px-card--purple" style={{ position: "relative", zIndex: 2, padding: 14 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 21, lineHeight: 1.25, margin: 0, color: "var(--ink)", fontWeight: 600, textAlign: "left" }}>
          {messages[2]}
        </p>
      </div>

      {/* Insignias mini */}
      <div style={{
        display: "flex", gap: 10, justifyContent: "center",
        position: "relative", zIndex: 2,
      }}>
        {[
          { c: "cyan",   l: "A" },
          { c: "orange", l: "B" },
          { c: "green",  l: "C" },
        ].map((b, i) => (
          <div key={i} style={{
            width: 56, height: 56,
            background: `linear-gradient(135deg, var(--neon-${b.c}), var(--neon-purple))`,
            clipPath: "polygon(50% 0%,90% 20%,100% 50%,90% 80%,50% 100%,10% 80%,0% 50%,10% 20%)",
            display: "grid", placeItems: "center",
            fontFamily: "var(--font-arcade)", fontSize: 16, color: "#eff7ff",
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
            b7Done: false,
            qrFound: Array(10).fill(false),
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
