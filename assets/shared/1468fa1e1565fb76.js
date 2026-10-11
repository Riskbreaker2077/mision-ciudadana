// m4-finale.jsx — Bloque 9: Pantalla final · Misión Ciudadana Módulo 4

function Block9Finale({ go, state, setState }) {
  const [imgError, setImgError] = React.useState(false);
  const finaleImg = (window.__resources && window.__resources.finaleImg) || null;
  const showImg = finaleImg || !imgError;

  const messages = [
    "La participación ciudadana es el músculo que hace fuerte a la democracia: votar, opinar, exigir y proponer no son favores — son derechos.",
    "Conocer los mecanismos de participación es el primer paso para usarlos cuando tu comunidad los necesite.",
    "Participar es nuestro poder. Mientras una voz se levanta, ninguna red de silencio puede tejer su trampa.",
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

      <div style={{
        position: "relative", zIndex: 2,
        padding: 6,
        background: "rgba(26,40,24,0.7)",
        border: "3px solid var(--neon-purple)",
        boxShadow: "4px 4px 0 #0a140a, 4px 4px 0 3px var(--neon-purple)",
        alignSelf: "center",
      }}>
        {showImg ? (
          <img
            src={finaleImg || "assets/m4-finale.png"}
            alt="¡Participar es nuestro poder! — ciudadanos celebrando"
            style={{ display: "block", width: 300, maxWidth: "100%", height: "auto", imageRendering: "pixelated" }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div style={{
            width: 300, maxWidth: "100%", height: 200,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(135deg, #1a2818 0%, #6a994e 100%)",
            fontFamily: "var(--font-arcade)", fontSize: 48, color: "var(--neon-yellow)",
          }}>🏛</div>
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
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 19, lineHeight: 1.25, margin: 0, color: "var(--neon-cyan)", textAlign: "left" }}>
          {messages[1]}
        </p>
      </div>

      <div className="px-card px-card--purple" style={{ position: "relative", zIndex: 2, padding: 14 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 21, lineHeight: 1.25, margin: 0, color: "var(--ink)", fontWeight: 600, textAlign: "left" }}>
          {messages[2]}
        </p>
      </div>

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
            fontFamily: "var(--font-arcade)", fontSize: 16, color: "#f2e8cf",
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
