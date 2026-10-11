// m3-boss.jsx — Bloque 10: Jefe Final · Misión Ciudadana Módulo 3

function Block10Boss({ go, state, setState }) {
  const [defeated, setDefeated] = React.useState(state.bossDefeated || false);
  const [timer, setTimer] = React.useState(10 * 60);
  const [running, setRunning] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);

  React.useEffect(() => {
    if (!running || timer <= 0) return;
    const t = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(t);
  }, [running, timer]);

  const mm = String(Math.floor(timer / 60)).padStart(2, "0");
  const ss = String(timer % 60).padStart(2, "0");

  const onDefeat = () => {
    setDefeated(true);
    setState(s => ({ ...s, bossDefeated: true }));
    setTimeout(() => go(9), 600);
  };

  // Usar imagen si está disponible, si no: placeholder
  const bossImg = (window.__resources && window.__resources.bossImg) || null;
  const showImg = !!bossImg;

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

      {/* Imagen del jefe */}
      <div style={{
        position: "relative", zIndex: 2,
        padding: 6,
        background: "rgba(35,17,35,0.7)",
        border: "3px solid var(--neon-pink)",
        boxShadow: "4px 4px 0 #1a0c1f, 4px 4px 0 3px var(--neon-pink)",
        marginBottom: 14,
      }}>
        {showImg ? (
          <img
            src={window.__resources.bossImg}
            alt="El Guardián del Olvido — enemigo de los derechos constitucionales"
            style={{ display: "block", width: "100%", height: "auto", imageRendering: "pixelated" }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div style={{
            width: "100%", height: 180,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(135deg, #231123 0%, #82204a 100%)",
            fontFamily: "var(--font-arcade)", fontSize: 56, color: "var(--neon-yellow)",
          }}>⚔</div>
        )}
      </div>

      <div className="px-card px-card--pink" style={{ marginBottom: 14, padding: 14, position: "relative", zIndex: 2 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-pink)", letterSpacing: "0.08em", marginBottom: 8 }}>
          ★ EL GUARDIÁN DEL OLVIDO ★
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 19, lineHeight: 1.25, margin: 0 }}>
          Devora los artículos,
          <span style={{ color: "var(--neon-yellow)" }}> silencia los derechos</span> y
          <span style={{ color: "var(--neon-orange)" }}> borra los pactos ciudadanos</span>.
          Para vencerlo, demuestra que dominas la Constitución de Colombia.
        </p>
      </div>

      <div style={{
        fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-yellow)",
        margin: "10px 0 8px", letterSpacing: "0.08em", position: "relative", zIndex: 2,
      }}>
        ★ INSTRUCCIONES DE BATALLA
      </div>
      <ol className="steps" style={{ marginBottom: 14, position: "relative", zIndex: 2 }}>
        <li>Ingresa a <span className="kbd">play.blooket.com</span></li>
        <li>Digita el <strong>ID del quizz</strong> que te dará la docente.</li>
        <li>Regístrate con tu equipo: <span style={{ color: "var(--neon-cyan)" }}>{state.groupName || "____"}</span></li>
        <li><strong>30 preguntas rápidas</strong>: roba, duplica o piérdelo todo.</li>
        <li>Tiempo límite: <strong>10 minutos</strong>.</li>
      </ol>

      {/* Cronómetro arcade */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "#1a0c1f", border: "2px solid var(--neon-pink)",
        boxShadow: "4px 4px 0 #1a0c1f, 4px 4px 0 2px var(--neon-pink)",
        padding: "10px 14px", marginBottom: 12,
        position: "relative", zIndex: 2,
      }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--ink-dim)", letterSpacing: "0.08em" }}>
          ⏱ TIEMPO LÍMITE
        </div>
        <div className="h-mono glow-pink" style={{ fontSize: 38, color: "var(--neon-pink)", fontFamily: "var(--font-mono)", lineHeight: 1 }}>
          {mm}:{ss}
        </div>
      </div>

      <button
        className={`px-btn ${running ? "px-btn--purple" : "px-btn--green"}`}
        style={{ width: "100%", marginBottom: 14, fontSize: 10, position: "relative", zIndex: 2 }}
        onClick={() => setRunning(r => !r)}
        disabled={timer === 0}
      >
        {timer === 0 ? "⏰ ¡TIEMPO!" : running ? "⏸ PAUSAR" : "▶ INICIAR CRONÓMETRO"}
      </button>

      <a
        href="https://play.blooket.com"
        target="_blank"
        rel="noopener"
        className="px-btn px-btn--pink"
        style={{ width: "100%", marginBottom: 14, textDecoration: "none", fontSize: 10, position: "relative", zIndex: 2, boxSizing: "border-box" }}
      >
        ↗ ABRIR PLAY.BLOOKET.COM
      </a>

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
