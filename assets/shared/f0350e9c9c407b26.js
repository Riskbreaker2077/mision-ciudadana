// m5-boss.jsx — Bloque 10: Jefe Final · Misión Ciudadana Módulo 5
// La Ciudadela del Desamparo — Reto final Wordwall

function Block10Boss({ go, state, setState }) {
  const [defeated, setDefeated] = React.useState(state.bossDefeated || false);
  const [timer, setTimer] = React.useState(10 * 60);
  const [running, setRunning] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);
  const [showFight, setShowFight] = React.useState(false);

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

  const bossImg = (window.__resources && window.__resources.bossImg) || null;
  const showImg = bossImg || !imgError;

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
        fontSize: 22, color: "var(--neon-pink)", margin: "4px 0 4px",
        textAlign: "center", lineHeight: 1.4, position: "relative", zIndex: 2,
      }}>
        JEFE FINAL
      </h2>
      <div style={{
        fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-yellow)",
        letterSpacing: "0.15em", textAlign: "center", marginBottom: 12,
        position: "relative", zIndex: 2,
      }} className="glow-yellow">
        LA CIUDADELA DEL DESAMPARO
      </div>

      <div style={{
        position: "relative", zIndex: 2,
        padding: 6,
        background: "rgba(22,10,20,0.7)",
        border: "3px solid var(--neon-pink)",
        boxShadow: "4px 4px 0 #08040a, 4px 4px 0 3px var(--neon-pink)",
        marginBottom: 14,
      }}>
        {showImg ? (
          <img
            src={bossImg || "assets/m5-jefe-final.png"}
            alt="La Ciudadela del Desamparo — enemiga de la protección ciudadana"
            style={{ display: "block", width: "100%", height: "auto", imageRendering: "pixelated" }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div style={{
            width: "100%", height: 200,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(135deg, #160a14 0%, #9a031e 100%)",
            fontFamily: "var(--font-arcade)", fontSize: 56, color: "var(--neon-yellow)",
          }}>🏰</div>
        )}
      </div>

      <div className="px-card px-card--pink" style={{ marginBottom: 14, padding: 14, position: "relative", zIndex: 2 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-pink)", letterSpacing: "0.08em", marginBottom: 8 }}>
          ★ LA CIUDADELA DEL DESAMPARO ★
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 19, lineHeight: 1.25, margin: 0 }}>
          Una fortaleza levantada con <span style={{ color: "var(--neon-orange)" }}>peticiones ignoradas</span>,
          <span style={{ color: "var(--neon-pink)" }}> detención arbitraria</span>,
          <span style={{ color: "var(--neon-cyan)" }}> vigilancia de datos</span>,
          incumplimiento y daño colectivo. Para derribarla, demuestra que dominas los 5 mecanismos:
          tutela, habeas corpus, habeas data, derecho de petición y acción popular.
        </p>
      </div>

      <div style={{
        fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-yellow)",
        margin: "10px 0 8px", letterSpacing: "0.08em", position: "relative", zIndex: 2,
      }}>
        ★ INSTRUCCIONES DE BATALLA
      </div>
      <ol className="steps" style={{ marginBottom: 14, position: "relative", zIndex: 2 }}>
        <li>Reúnete con tu equipo: <span style={{ color: "var(--neon-green)" }}>{state.groupName || "____"}</span></li>
        <li>Pulsa <strong>▶ ATACAR LA CIUDADELA</strong> para abrir el reto final.</li>
        <li>Responde el <strong>Wordwall</strong> con todos los mecanismos vistos.</li>
        <li>Tiempo recomendado: <strong>10 minutos</strong>.</li>
        <li>¡Demuestren que son los mejores defensores de derechos!</li>
      </ol>

      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "#160a14", border: "2px solid var(--neon-pink)",
        boxShadow: "4px 4px 0 #08040a, 4px 4px 0 2px var(--neon-pink)",
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

      <button
        className="px-btn px-btn--pink"
        style={{ width: "100%", marginBottom: 14, fontSize: 11, position: "relative", zIndex: 2 }}
        onClick={() => setShowFight(s => !s)}
      >
        {showFight ? "▲ OCULTAR RETO" : "⚔ ATACAR LA CIUDADELA"}
      </button>

      {showFight && (
        <div style={{ marginBottom: 14, position: "relative", zIndex: 2 }}>
          <div style={{
            position: "relative", width: "100%", height: 0, paddingTop: "76%",
            border: "2px solid var(--neon-pink)",
            boxShadow: "4px 4px 0 #08040a, 4px 4px 0 2px var(--neon-pink)",
            overflow: "hidden", background: "#000",
          }}>
            <iframe
              loading="lazy"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
              src="https://wordwall.net/es/embed/1e24abdd04b7492c8e3cb40f960e2fb1?themeId=1&templateId=5&fontStackId=0"
              title="Reto Final — Wordwall · Mecanismos de protección"
              allowFullScreen
            />
          </div>
          <a
            href="https://wordwall.net/es/resource/1e24abdd04b7492c8e3cb40f960e2fb1"
            target="_blank"
            rel="noopener"
            style={{
              display: "inline-block", marginTop: 10,
              fontFamily: "var(--font-mono)", fontSize: 18, color: "var(--neon-pink)",
              textDecoration: "underline", lineHeight: 1.2,
            }}
          >↗ Abrir Wordwall en pestaña nueva</a>
        </div>
      )}

      <div className="px-card px-card--yellow" style={{ padding: 12, marginBottom: 12, position: "relative", zIndex: 2 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-yellow)", marginBottom: 6 }}>
          ✦ INSIGNIA MÁXIMA
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 18, margin: 0, lineHeight: 1.2 }}>
          El equipo ganador obtiene la insignia máxima:{" "}
          <strong style={{ color: "var(--neon-yellow)" }}>Guardianes de la Constitución</strong>.
        </p>
      </div>

      <button
        className={`px-btn ${defeated ? "px-btn--green" : "px-btn--pink"}`}
        style={{ width: "100%", fontSize: 13, position: "relative", zIndex: 2 }}
        onClick={onDefeat}
        disabled={defeated}
      >
        {defeated ? "★ ¡CIUDADELA DERRIBADA! ★" : "⚔ DERRIBÉ LA CIUDADELA"}
      </button>

      <div style={{ marginTop: 12, position: "relative", zIndex: 2 }}>
        <button className="px-btn px-btn--ghost" onClick={() => go(5)}>← VOLVER AL MAPA</button>
      </div>
    </div>
  );
}

Object.assign(window, { Block10Boss });
