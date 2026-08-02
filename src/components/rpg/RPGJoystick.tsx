// ============================================================================
// Joystick FLUTUANTE (mobile): aparece exatamente onde o dedo tocou e segue o
// arrasto (anel + botão), no estilo dos jogos de celular. Puramente visual —
// quem usa (cena viva / salas) cuida da física a partir do vetor ax/ay.
// ============================================================================

/** raio máximo do anel (px CSS) — o botão trava nessa distância */
export const JOY_RADIUS = 52;

interface Props {
  /** centro do anel (coords locais do palco) */
  x: number;
  y: number;
  /** deslocamento atual do botão em relação ao centro (já limitado ao raio) */
  kx: number;
  ky: number;
}

export function RPGJoystick({ x, y, kx, ky }: Props) {
  return (
    <div className="absolute pointer-events-none z-20" style={{ left: x, top: y }}>
      {/* anel externo */}
      <div
        className="absolute rounded-full border-2 border-white/40 bg-white/10"
        style={{ left: -JOY_RADIUS, top: -JOY_RADIUS, width: JOY_RADIUS * 2, height: JOY_RADIUS * 2 }}
      />
      {/* cruzeta discreta (indica as direções) */}
      <div className="absolute text-white/45 text-[10px] font-black select-none" style={{ left: -4, top: -JOY_RADIUS + 4 }}>▲</div>
      <div className="absolute text-white/45 text-[10px] font-black select-none" style={{ left: -4, top: JOY_RADIUS - 16 }}>▼</div>
      <div className="absolute text-white/45 text-[10px] font-black select-none" style={{ left: -JOY_RADIUS + 4, top: -7 }}>◀</div>
      <div className="absolute text-white/45 text-[10px] font-black select-none" style={{ left: JOY_RADIUS - 12, top: -7 }}>▶</div>
      {/* botão (segue o dedo, limitado ao anel) */}
      <div
        className="absolute rounded-full border-2 border-white/90 shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
        style={{
          left: kx - 21, top: ky - 21, width: 42, height: 42,
          background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95), rgba(215,215,225,0.82))",
        }}
      />
    </div>
  );
}
