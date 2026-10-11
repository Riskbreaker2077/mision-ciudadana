// app-boss.jsx — Bloque 10: Jefe Final (Wordwall)

function Block10Boss({ go, state, setState }) {
  const [defeated, setDefeated] = React.useState(state.bossDefeated || false);

  const onDefeat = () => {
    setDefeated(true);
    setState(s => ({ ...s, bossDefeated: true }));
    setTimeout(() => go(9), 600);
  };

  return (
    <div className="screen-body" style={{ paddingBottom: 140 }}>
      <div className="pixel-grid" />

      <div style={{
        fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-pink)",
        letterSpacing: "0.2em", marginBottom: 6, textAlign: "center",
        position: "relative", zIndex: 2,
      }} className="glow-pink">
        ⚠ ALERTA ROJA ⚠
      </div>

      <h2 className="h-arcade glow-pink" style={{
        fontSize: 22, color: "var(--neon-pink)", margin: "4px 0 12px",
        textAlign: "center", lineHeight: 1.4, position: "relative", zIndex: 2,
      }}>
        JEFE FINAL
      </h2>

      {/* Boss image */}
      <div style={{
        position: "relative", zIndex: 2,
        padding: 6,
        background: "rgba(10,1,24,0.6)",
        border: "3px solid var(--neon-pink)",
        boxShadow: "4px 4px 0 #0a0118, 4px 4px 0 3px var(--neon-pink)",
        marginBottom: 14,
      }}>
        <img
          src={window.asset ? window.asset("assets/jefe-final.png") : "assets/jefe-final.png"}
          alt="El Señor de las Máscaras — guardián de los prejuicios"
          style={{
            display: "block", width: "100%", height: "auto",
            imageRendering: "pixelated",
          }}
        />
      </div>

      <div className="px-card px-card--purple" style={{
        marginBottom: 14, padding: 14, position: "relative", zIndex: 2,
      }}>
        <div style={{
          fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-purple)",
          letterSpacing: "0.08em", marginBottom: 8,
        }}>
          ★ EL SEÑOR DE LAS MÁSCARAS ★
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 19, lineHeight: 1.25, margin: 0 }}>
          El guardián de los <span style={{ color: "var(--neon-yellow)" }}>prejuicios</span> y
          <span style={{ color: "var(--neon-orange)" }}> estereotipos</span> esconde su rostro tras mil máscaras.
          Para vencerlo, demuestra todo lo que has aprendido.
        </p>
      </div>

      <div style={{
        fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-yellow)",
        margin: "10px 0 8px", letterSpacing: "0.08em", position: "relative", zIndex: 2,
      }}>
        ★ INSTRUCCIONES DE BATALLA
      </div>
      <ol className="steps" style={{ marginBottom: 14, position: "relative", zIndex: 2 }}>
        <li>Resuelve la <strong>actividad de Wordwall</strong> en equipo.</li>
        <li>Cada respuesta correcta es un <em>golpe crítico</em> al Jefe.</li>
        <li>Cuando termines, presiona <strong>"Vencí al Jefe"</strong> para celebrar la victoria.</li>
      </ol>

      {/* Wordwall embed */}
      <div style={{
        position: "relative", width: "100%", height: 0,
        paddingTop: "75%",
        border: "2px solid var(--neon-pink)",
        boxShadow: "4px 4px 0 #0a0118, 4px 4px 0 2px var(--neon-pink)",
        overflow: "hidden", background: "#000",
        zIndex: 2, marginBottom: 12,
      }}>
        <iframe
          loading="lazy"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
          src="https://wordwall.net/es/embed/75193fad35ec4c4db4b559bed6bdb24b?themeId=66&templateId=5&fontStackId=0"
          title="Jefe Final — Wordwall"
          allowFullScreen
        />
      </div>

      <a
        href="https://wordwall.net/es/resource/112600977"
        target="_blank"
        rel="noopener"
        style={{
          display: "inline-block", marginBottom: 14,
          fontFamily: "var(--font-mono)", fontSize: 17, color: "var(--neon-cyan)",
          textDecoration: "underline", lineHeight: 1.2,
          position: "relative", zIndex: 2,
        }}
      >↗ Abrir actividad en Wordwall</a>

      <button
        className={`px-btn ${defeated ? "px-btn--green" : "px-btn--pink"}`}
        style={{ width: "100%", fontSize: 13, position: "relative", zIndex: 2 }}
        onClick={onDefeat}
        disabled={defeated}
      >
        {defeated ? "★ ¡VICTORIA! ★" : "⚔ VENCÍ AL JEFE FINAL"}
      </button>

      <div style={{ marginTop: 12, position: "relative", zIndex: 2 }}>
        <button className="px-btn px-btn--ghost" onClick={() => go(5)}>← VOLVER AL MAPA</button>
      </div>
    </div>
  );
}

Object.assign(window, { Block10Boss });
