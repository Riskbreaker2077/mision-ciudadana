// m6-boss.jsx — Bloque 10: Jefe Final · Misión Ciudadana Módulo 6
// Coloso de las Fronteras — Reto final Wordwall · Globalización y Migraciones

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
        EL REMOLINO DE LAS FRONTERAS
      </div>

      <div style={{
        position: "relative", zIndex: 2,
        padding: 6,
        background: "rgba(5,26,29,0.7)",
        border: "3px solid var(--neon-pink)",
        boxShadow: "4px 4px 0 #02080a, 4px 4px 0 3px var(--neon-pink)",
        marginBottom: 14,
      }}>
        {showImg ? (
          <img
            src={bossImg || "assets/m6-jefe-final.png"}
            alt="El Remolino de las Fronteras — vórtice de muros, exclusión y miedo"
            style={{ display: "block", width: "100%", height: "auto", imageRendering: "pixelated" }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div style={{
            width: "100%", height: 220,
            display: "grid", placeItems: "center",
            background: "repeating-linear-gradient(45deg, #0a3338, #0a3338 10px, #051a1d 10px, #051a1d 20px)",
            position: "relative",
          }}>
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
              <div style={{
                fontFamily: "var(--font-arcade)", fontSize: 64,
                color: "var(--neon-pink)",
                filter: "drop-shadow(0 0 16px rgba(224,65,58,0.7))",
              }} className="globe-spin">🧱</div>
            </div>
            <div style={{
              position: "absolute", bottom: 8, left: 0, right: 0,
              textAlign: "center",
              fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--neon-yellow)",
              letterSpacing: "0.08em",
            }}>
              [ JEFE FINAL — imagen pendiente ]
            </div>
          </div>
        )}
      </div>

      <div className="px-card px-card--pink" style={{ marginBottom: 14, padding: 14, position: "relative", zIndex: 2 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-pink)", letterSpacing: "0.08em", marginBottom: 8 }}>
          ★ EL REMOLINO DE LAS FRONTERAS ★
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 19, lineHeight: 1.25, margin: 0 }}>
          Un vórtice tejido con <span style={{ color: "var(--neon-orange)" }}>muros</span>,
          <span style={{ color: "var(--neon-pink)" }}> xenofobia</span>,
          <span style={{ color: "var(--neon-yellow)" }}> visados rechazados</span>,
          <span style={{ color: "var(--neon-cyan)" }}> trata, exclusión y miedo</span>{" "}
          que intenta arrastrar al mundo a la incomunicación. Para detenerlo, demuestren
          que dominan la <strong>globalización</strong>, las <strong>rutas migratorias</strong>,
          la diversidad cultural y los retos del mundo conectado.
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
        <li>Observa el video del <strong>reto final</strong> para repasar lo aprendido.</li>
        <li>Pulsa <strong>⚔ ATACAR AL COLOSO</strong> para abrir el Wordwall.</li>
        <li>Respondan con todos los contenidos vistos sobre globalización y migración.</li>
        <li>Tiempo recomendado: <strong>10 minutos</strong>.</li>
      </ol>

      {/* Video preview del reto */}
      <div style={{ marginBottom: 14, position: "relative", zIndex: 2 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-orange)", marginBottom: 6, letterSpacing: "0.08em" }}>
          ▶ VIDEO · RETO FINAL
        </div>
        <div className="embed-wrap" style={{ borderColor: "var(--neon-orange)", boxShadow: "4px 4px 0 #02080a, 4px 4px 0 2px var(--neon-orange)" }}>
          <iframe
            src="https://www.youtube.com/embed/n-ySWtTKTRo?rel=0"
            title="Video reto final — globalización y migraciones"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>

      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "#051a1d", border: "2px solid var(--neon-pink)",
        boxShadow: "4px 4px 0 #02080a, 4px 4px 0 2px var(--neon-pink)",
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
        {showFight ? "▲ OCULTAR RETO" : "⚔ ENTRAR AL REMOLINO"}
      </button>

      {showFight && (
        <div style={{ marginBottom: 14, position: "relative", zIndex: 2 }}>
          <div style={{
            position: "relative", width: "100%", height: 0, paddingTop: "76%",
            border: "2px solid var(--neon-pink)",
            boxShadow: "4px 4px 0 #02080a, 4px 4px 0 2px var(--neon-pink)",
            overflow: "hidden", background: "#000",
          }}>
            <iframe
              loading="lazy"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
              src="https://wordwall.net/es/embed/27d2a3caf70c4dc3ae9d28c04783bc93?themeId=65&templateId=5&fontStackId=0"
              title="Reto Final — Wordwall · Globalización y migraciones"
              allowFullScreen
            />
          </div>
          <a
            href="https://wordwall.net/es/resource/27d2a3caf70c4dc3ae9d28c04783bc93"
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
          <strong style={{ color: "var(--neon-yellow)" }}>Maestros de la Misión Global</strong>.
        </p>
      </div>

      <button
        className={`px-btn ${defeated ? "px-btn--green" : "px-btn--pink"}`}
        style={{ width: "100%", fontSize: 13, position: "relative", zIndex: 2 }}
        onClick={onDefeat}
        disabled={defeated}
      >
        {defeated ? "★ ¡REMOLINO DETENIDO! ★" : "⚔ DETUVE EL REMOLINO"}
      </button>

      <div style={{ marginTop: 12, position: "relative", zIndex: 2 }}>
        <button className="px-btn px-btn--ghost" onClick={() => go(5)}>← VOLVER AL MAPA</button>
      </div>
    </div>
  );
}

Object.assign(window, { Block10Boss });
