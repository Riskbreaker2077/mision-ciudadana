// m5-screens.jsx — Bloques 1–5 · Misión Ciudadana Módulo 5
// Mecanismos de protección ciudadana

function AppTopbar({ state }) { return null; }

function FooterNav({ go, prev, next, nextLabel = "CONTINUAR ▸", nextColor = "purple" }) {
  return (
    <div style={{
      position: "fixed", bottom: 0, left: "50%",
      transform: "translateX(-50%)",
      width: "100%", maxWidth: 480,
      padding: "14px 20px",
      background: "linear-gradient(to top, #160a14 60%, transparent)",
      display: "flex", gap: 10, zIndex: 100, boxSizing: "border-box",
    }}>
      {prev != null && (
        <button className="px-btn px-btn--ghost" style={{ flex: "0 0 auto" }} onClick={() => go(prev)}>
          ← ATRÁS
        </button>
      )}
      {next != null && (
        <button className={`px-btn px-btn--${nextColor}`} style={{ flex: 1 }} onClick={() => go(next)}>
          {nextLabel}
        </button>
      )}
    </div>
  );
}

function ProgressBar({ value, total }) {
  const cells = [];
  for (let i = 0; i < total; i++) cells.push(<div key={i} className={"pbar-cell" + (i < value ? " on" : "")} />);
  return <div className="pbar">{cells}</div>;
}

// ── BLOQUE 1 — Título ─────────────────────────────────────
function Block1Title({ go, tweaks }) {
  return (
    <div className="screen-body screen-body--title" style={{
      paddingTop: 80, display: "flex", flexDirection: "column",
      alignItems: "center", textAlign: "center", justifyContent: "center", minHeight: "100%",
    }}>
      <div className="pixel-grid" />

      <div className="float" style={{ marginBottom: 18, position: "relative", zIndex: 2 }}>
        {tweaks.schoolLogo ? (
          <img src={tweaks.schoolLogo} alt="Escudo del colegio" style={{
            width: 84, height: 84, objectFit: "contain",
            border: "3px solid var(--neon-yellow)",
            boxShadow: "4px 4px 0 #08040a, 4px 4px 0 3px var(--neon-yellow)",
            background: "#fff",
            imageRendering: "pixelated",
          }} />
        ) : (
          <div style={{
            width: 84, height: 84,
            border: "3px solid var(--neon-yellow)",
            boxShadow: "4px 4px 0 #08040a, 4px 4px 0 3px var(--neon-yellow)",
            background: "#160a14",
            display: "grid", placeItems: "center",
            fontFamily: "var(--font-arcade)", fontSize: 28,
            color: "var(--neon-yellow)",
          }} className="glow-yellow">CD</div>
        )}
      </div>

      <div style={{ fontFamily: "var(--font-mono)", fontSize: 18, color: "var(--neon-green)", letterSpacing: "0.15em", marginBottom: 4, position: "relative", zIndex: 2 }}>
        I.E. {tweaks.schoolName}
      </div>

      <h1 className="h-arcade glow-purple" style={{ fontSize: 18, margin: "10px 0 4px", color: "var(--neon-pink)", position: "relative", zIndex: 2, lineHeight: 1.5 }}>
        MISIÓN
      </h1>
      <h1 className="h-arcade glow-yellow" style={{ fontSize: 22, margin: "6px 0", color: "var(--neon-yellow)", position: "relative", zIndex: 2, lineHeight: 1.5 }}>
        CIUDADANA
      </h1>
      <h1 className="h-arcade glow-green" style={{ fontSize: 16, margin: "6px 0 16px", color: "var(--neon-green)", position: "relative", zIndex: 2, lineHeight: 1.5 }}>
        — MÓDULO 5 —
      </h1>

      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 19, color: "var(--ink)",
        background: "rgba(22,10,20,0.85)",
        border: "2px solid var(--neon-orange)",
        padding: "10px 14px",
        margin: "8px 12px 22px",
        position: "relative", zIndex: 2,
        lineHeight: 1.2,
      }}>
        Mecanismos de<br />
        <span style={{ color: "var(--neon-green)" }}>protección ciudadana</span>
      </div>

      <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--ink-dim)", marginBottom: 6, letterSpacing: "0.1em", position: "relative", zIndex: 2 }}>
        — DOCENTE —
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--neon-green)", marginBottom: 28, position: "relative", zIndex: 2 }}>
        {tweaks.teacherName}
      </div>

      <button
        className="px-btn px-btn--pink"
        style={{ fontSize: 14, padding: "18px 28px", position: "relative", zIndex: 2 }}
        onClick={() => go(2)}
      >
        ▶ INICIAR
      </button>

      <div className="title-blink" style={{
        marginTop: 18, fontFamily: "var(--font-arcade)", fontSize: 11,
        color: "var(--neon-green)", letterSpacing: "0.15em", position: "relative", zIndex: 2,
      }}>
        PRESS START
      </div>

      <div style={{ marginTop: "auto", paddingTop: 24, fontFamily: "var(--font-mono)", fontSize: 16, color: "var(--ink-dim)", position: "relative", zIndex: 2 }}>
        v1.0 · 2026
      </div>
    </div>
  );
}

// ── BLOQUE 2 — Intro / misión ─────────────────────────────
function Block2Intro({ go }) {
  return (
    <div className="screen-body">
      <h2 className="h-arcade glow-orange" style={{ fontSize: 20, color: "var(--neon-orange)", margin: "6px 0 18px", lineHeight: 1.5 }}>
        ¿DE QUÉ VA<br />ESTA AVENTURA?
      </h2>

      <div className="px-card px-card--orange" style={{ marginBottom: 16 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 21, lineHeight: 1.25, margin: 0, color: "var(--ink)" }}>
          Los <span className="glow-green" style={{ color: "var(--neon-green)" }}>mecanismos de protección ciudadana</span> son
          las herramientas que la Constitución te entrega para defender tus derechos:
          la <strong>tutela</strong>, el <strong>habeas corpus</strong>, el <strong>habeas data</strong>,
          el <strong>derecho de petición</strong>, la <strong>acción de cumplimiento</strong>,
          la <strong>acción popular</strong> y la <strong>acción de grupo</strong>.
        </p>
        <div className="divider-pixel" style={{ color: "var(--neon-orange)" }} />
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 21, lineHeight: 1.25, margin: 0, color: "var(--ink)" }}>
          En este módulo vas a <span style={{ color: "var(--neon-green)" }}>conocerlos</span>,
          <span style={{ color: "var(--neon-orange)" }}> aplicarlos</span> y
          <span style={{ color: "var(--neon-yellow)" }}> usarlos</span> para
          defender los derechos de tu comunidad.
        </p>
      </div>

      <div className="px-card px-card--yellow" style={{ marginBottom: 100 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 13, color: "var(--neon-yellow)", marginBottom: 8 }}>
          ★ TU MISIÓN
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 20, lineHeight: 1.25, margin: 0, color: "var(--ink)" }}>
          Conviértete en Guardián de Derechos, Defensor de Derechos y Protector del Pueblo.
          Conquista 3 insignias y derriba <strong style={{ color: "var(--neon-pink)" }}>La Ciudadela del Desamparo</strong>.
          ¿Aceptas el reto?
        </p>
      </div>

      <FooterNav go={go} prev={1} next={3} nextLabel="ACEPTO EL RETO" nextColor="orange" />
    </div>
  );
}

// ── BLOQUE 3 — Nombre del grupo ───────────────────────────
function Block3Group({ go, state, setState }) {
  const [val, setVal] = React.useState(state.groupName || "");

  const save = () => {
    const name = val.trim();
    if (!name) return;
    setState(s => ({ ...s, groupName: name }));
    go(4);
  };

  return (
    <div className="screen-body">
      <h2 className="h-arcade glow-green" style={{ fontSize: 20, color: "var(--neon-green)", margin: "6px 0 18px", lineHeight: 1.5 }}>
        NOMBRE<br />DE TU EQUIPO
      </h2>

      <div className="px-card px-card--yellow" style={{ marginBottom: 20 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 20, lineHeight: 1.25, margin: 0, color: "var(--ink)" }}>
          Antes de iniciar, elige el nombre de tu equipo. Aparecerá en todas las actividades.
        </p>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-yellow)", marginBottom: 8, letterSpacing: "0.08em" }}>
          ★ NOMBRE DEL EQUIPO
        </div>
        <input
          className="px-input"
          placeholder="Ej: Escudos de la Plaza"
          value={val}
          onChange={e => setVal(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") save(); }}
          maxLength={28}
        />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {["Tutela Brigade","Habeas Corpus","Escudos 1991","Acción Popular","Defensa Activa","Pacto por los Derechos","Centinelas del Pueblo","Petición Justa","Voces de la Constitución","Guardianes del Habeas"].map(s => (
          <button key={s} onClick={() => setVal(s)} style={{
            fontFamily: "var(--font-mono)", fontSize: 19,
            background: "transparent", color: "var(--neon-orange)",
            border: "1px solid var(--neon-orange)",
            padding: "4px 8px", cursor: "pointer", letterSpacing: "0.04em",
          }}>{s}</button>
        ))}
      </div>

      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 480,
        padding: "14px 20px",
        display: "flex", gap: 10, zIndex: 101, boxSizing: "border-box",
        pointerEvents: "none",
      }}>
        <button className="px-btn px-btn--ghost" style={{ flex: "0 0 auto", pointerEvents: "all" }} onClick={() => go(2)}>← ATRÁS</button>
        <button
          className="px-btn px-btn--purple"
          style={{ flex: 1, pointerEvents: "all", opacity: val.trim() ? 1 : 0.4 }}
          disabled={!val.trim()}
          onClick={save}
        >
          CONFIRMAR ▸
        </button>
      </div>
    </div>
  );
}

// ── BLOQUE 4 — Explicación de las 3 rutas ─────────────────
function Block4Explanation({ go, state }) {
  return (
    <div className="screen-body" style={{ paddingBottom: 120 }}>
      <h2 className="h-arcade glow-yellow" style={{ fontSize: 20, color: "var(--neon-yellow)", margin: "6px 0 8px", lineHeight: 1.5 }}>
        LAS 3 RUTAS<br />DEL MÓDULO
      </h2>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 20, color: "var(--ink-dim)", marginBottom: 18 }}>
        Equipo: <span style={{ color: "var(--neon-green)" }}>{state.groupName}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
        <PathPreview color="orange" letter="A"
          title="GUARDIANES DE DERECHOS"
          desc="Comprende qué son los mecanismos de protección con video, presentaciones en Canva y tres Wordwall." />
        <PathPreview color="green" letter="B"
          title="DEFENSORES DE DERECHOS"
          desc="Aplica la tutela y demás mecanismos a casos reales con dos videos y un concurso Wordwall." />
        <PathPreview color="cyan" letter="C"
          title="PROTECTORES DEL PUEBLO"
          desc="Relaciona cada mecanismo con casos reales en Colombia resolviendo el laberinto de Wordwall." />
      </div>

      <div className="px-card px-card--pink" style={{ padding: 14 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-pink)", marginBottom: 6, letterSpacing: "0.08em" }}>
          ☠ JEFE FINAL
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 19, lineHeight: 1.2, margin: 0 }}>
          Completa las 3 rutas para derribar <strong>La Ciudadela del Desamparo</strong> en el reto Wordwall y ganar la insignia máxima: <strong style={{ color: "var(--neon-yellow)" }}>Guardianes de la Constitución</strong>.
        </p>
      </div>

      <FooterNav go={go} prev={3} next={5} nextLabel="AL MAPA ▸" nextColor="yellow" />
    </div>
  );
}

function PathPreview({ color, letter, title, desc }) {
  return (
    <div className="module-tile" style={{ color: `var(--neon-${color})`, cursor: "default" }}>
      <div className="module-icon" style={{ color: `var(--neon-${color})` }}>{letter}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="h-arcade" style={{ fontSize: 12, color: `var(--neon-${color})`, letterSpacing: "0.05em" }}>{title}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 19, color: "var(--ink-dim)", lineHeight: 1.15, marginTop: 4 }}>{desc}</div>
      </div>
    </div>
  );
}

// ── BLOQUE 5 — Hub / Mapa ─────────────────────────────────
function Block5Hub({ go, state }) {
  const [b6, b7, b8] = state.badges || [false, false, false];
  const allDone = b6 && b7 && b8;
  return (
    <div className="screen-body">
      <h2 className="h-arcade glow-green" style={{ fontSize: 21, color: "var(--neon-green)", margin: "6px 0 6px", lineHeight: 1.5 }}>
        ELIGE TU<br />CAMINO
      </h2>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 19, color: "var(--ink-dim)", margin: "0 0 18px" }}>
        Equipo <span style={{ color: "var(--neon-yellow)" }}>{state.groupName || "—"}</span>, completa
        las 3 partes para enfrentar al jefe final.
      </p>

      <div style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.1em" }}>
          <span>PROGRESO</span>
          <span style={{ color: "var(--neon-green)" }}>{(b6?1:0)+(b7?1:0)+(b8?1:0)}/3 INSIGNIAS</span>
        </div>
        <ProgressBar value={(b6?1:0)+(b7?1:0)+(b8?1:0)} total={3} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 100 }}>
        <ModuleTile
          color="orange" letter="A" badge="⚖" title="CONTENIDO"
          subtitle="Video · Canva ×2 · Wordwall ×3"
          done={b6}
          onClick={() => go(6)}
        />
        <ModuleTile
          color="green" letter="B" badge="🛡" title="ENTRENAMIENTO"
          subtitle="Video casos reales · video tutela · Wordwall"
          done={b7}
          onClick={() => go(7)}
        />
        <ModuleTile
          color="cyan" letter="C" badge="🗺" title="VIAJE"
          subtitle="Laberinto Wordwall · mejor tiempo"
          done={b8}
          onClick={() => go(8)}
        />
      </div>

      {allDone && (
        <div style={{
          position: "absolute", left: 20, right: 20, bottom: 86,
          display: "flex", flexDirection: "column", gap: 8,
        }}>
          <div className="px-card px-card--yellow" style={{ textAlign: "center", padding: 10 }}>
            <div className="h-arcade glow-yellow" style={{ fontSize: 13, color: "var(--neon-yellow)" }}>
              ★ LISTOS PARA EL JEFE ★
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 17, color: "var(--ink)", marginTop: 4 }}>
              ¡Adelante, {state.groupName}!
            </div>
          </div>
          <button
            className="px-btn px-btn--pink"
            style={{ width: "100%", fontSize: 13 }}
            onClick={() => go(10)}
          >
            ☠ ASALTAR LA CIUDADELA ▸
          </button>
        </div>
      )}

      {!allDone && <FooterNav go={go} prev={4} />}
    </div>
  );
}

function ModuleTile({ color, letter, badge, title, subtitle, done, locked, onClick }) {
  return (
    <div
      className={"module-tile" + (done ? " done" : "") + (locked ? " locked" : "")}
      style={{ color: `var(--neon-${color})`, borderColor: done ? "var(--neon-green)" : `var(--neon-${color})` }}
      onClick={locked ? undefined : onClick}
    >
      <div className="module-icon" style={{ color: `var(--neon-${color})` }}>{letter}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="h-arcade" style={{ fontSize: 14, color: `var(--neon-${color})`, letterSpacing: "0.05em" }}>{title}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 19, color: "var(--ink-dim)", lineHeight: 1.15, marginTop: 4 }}>{subtitle}</div>
      </div>
      <div style={{ fontSize: 22 }}>
        {done
          ? <span style={{ color: "var(--neon-green)", fontFamily: "var(--font-arcade)", fontSize: 12 }}>✓</span>
          : <span>{badge}</span>}
      </div>
    </div>
  );
}

Object.assign(window, {
  Block1Title, Block2Intro, Block3Group, Block4Explanation, Block5Hub,
  AppTopbar, FooterNav, ProgressBar, ModuleTile,
});
