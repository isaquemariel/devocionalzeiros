import { useMemo } from "react";
import { motion } from "framer-motion";
import { RPG_BIBLE_BOOKS, RPG_REGION_THEMES } from "@/lib/rpgBibleData";

interface RPGWorldMapProps {
  currentLevel: number;
  getBookProgress: (bookIndex: number) => { completed: number; total: number; percent: number };
  onSelectBook: (bookIndex: number) => void;
  isAdmin?: boolean;
}

// Ícone (marco) de cada livro — dá cara de mapa de RPG
const BOOK_ICONS = [
  "🌍", "🔥", "🕎", "🏕️", "📜", "⚔️", "🛡️", "🌾", "👑", "🎵",
  "🏛️", "🔥", "📜", "🏛️", "🧱", "🧱", "👑", "🌪️", "🎵", "💡",
  "⏳", "🌹", "🔥", "😢", "💧", "🦴", "🦁", "💔", "🦗", "⚖️",
  "🏔️", "🐋", "📢", "🌊", "❓", "🔥", "🏛️", "🐎", "✉️", "👑",
  "🦁", "🩺", "❤️", "🕊️", "✝️", "⛪", "💌", "🕊️", "🛡️", "😊",
  "👑", "⏰", "⏰", "📋", "🏁", "⚓", "🤝", "🕎", "👐", "🪨",
  "🔥", "❤️", "💌", "💌", "⚔️", "🐉",
];

const VIEW_W = 380;
const COLS = 3;
const ROW_H = 92;

function genPositions(n: number) {
  const MX = VIEW_W * 0.16;
  const usable = VIEW_W - MX * 2;
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < n; i++) {
    const row = Math.floor(i / COLS);
    const colInRow = i % COLS;
    const even = row % 2 === 0;
    const col = even ? colInRow : COLS - 1 - colInRow;
    const x = MX + (col / (COLS - 1)) * usable + Math.sin(i * 1.6) * 7;
    const y = 56 + row * ROW_H + Math.cos(i * 2.1) * 5;
    pts.push({ x, y });
  }
  return pts;
}

function buildPathD(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const cur = pts[i];
    const mx = (prev.x + cur.x) / 2;
    const my = (prev.y + cur.y) / 2;
    d += ` Q ${prev.x + (cur.x - prev.x) * 0.15} ${my}, ${mx} ${my} T ${cur.x} ${cur.y}`;
  }
  return d;
}

const RPGWorldMap = ({ currentLevel, getBookProgress, onSelectBook, isAdmin = false }: RPGWorldMapProps) => {
  const books = RPG_BIBLE_BOOKS;
  const positions = useMemo(() => genPositions(books.length), [books.length]);
  const viewH = positions.length ? positions[positions.length - 1].y + 90 : 600;

  const completedBooks = useMemo(
    () => books.filter((b) => getBookProgress(b.index).percent === 100).length,
    [books, getBookProgress],
  );

  const fullPath = useMemo(() => buildPathD(positions), [positions]);
  const donePath = useMemo(() => {
    const end = Math.min(completedBooks + 1, positions.length);
    return end >= 2 ? buildPathD(positions.slice(0, end)) : "";
  }, [positions, completedBooks]);

  return (
    <motion.div
      key="world-map"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="h-full flex flex-col"
    >
      {/* legenda compacta */}
      <div className="flex items-center gap-3 mb-2 shrink-0 text-[10px] text-[#b8a67f]">
        <span className="rpg-title text-sm mr-1">MAPA DA <span className="hl">BÍBLIA</span></span>
        <span className="ml-auto">⭐ atual</span>
        <span>✓ concluído</span>
        <span>🔒 bloqueado</span>
      </div>

      {/* Mapa (pergaminho escuro) — rola só aqui */}
      <div
        className="flex-1 min-h-0 overflow-y-auto rounded-2xl border-2 border-[#3a2c18]"
        style={{ background: "radial-gradient(120% 60% at 50% 0%, #2a2013, #1a130a 55%, #100b06)" }}
      >
        <svg viewBox={`0 0 ${VIEW_W} ${viewH}`} className="w-full h-auto block" preserveAspectRatio="xMidYMin meet">
          {/* trilha */}
          {fullPath && (
            <>
              <path d={fullPath} fill="none" stroke="#0b0805" strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" />
              <path d={fullPath} fill="none" stroke="#5b4326" strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" />
              <path d={fullPath} fill="none" stroke="#c99a3e" strokeWidth={2.5} strokeDasharray="1 9" strokeLinecap="round" opacity={0.7} />
            </>
          )}
          {donePath && (
            <path d={donePath} fill="none" stroke="#e8b04b" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" opacity={0.35} />
          )}

          {/* halos suaves por região (só cor, sem nomes/ícones extras) */}
          {books.map((b, i) => {
            const pos = positions[i];
            if (!pos) return null;
            const theme = RPG_REGION_THEMES[b.region];
            return <circle key={`halo-${b.id}`} cx={pos.x} cy={pos.y} r={26} fill={theme.glowColor} opacity={0.16} />;
          })}

          {/* nós dos livros */}
          {books.map((b, i) => {
            const pos = positions[i];
            if (!pos) return null;
            const theme = RPG_REGION_THEMES[b.region];
            const prog = getBookProgress(b.index);
            const completed = prog.percent === 100;
            const unlocked = isAdmin || b.index === 0 || b.index < currentLevel;
            const current = b.index === currentLevel - 1;
            const r = 20;
            const fill = completed ? "#1f7a3e" : current ? "#b5791a" : unlocked ? "#2b3350" : "#191d28";
            const stroke = completed ? "#5ee08a" : current ? "#ffd889" : unlocked ? theme.accentColor : "#3a3f4d";

            return (
              <g
                key={b.id}
                onClick={() => unlocked && onSelectBook(b.index)}
                style={{ cursor: unlocked ? "pointer" : "default" }}
              >
                {current && (
                  <circle cx={pos.x} cy={pos.y} r={r + 5} fill="none" stroke="#ffd889" strokeWidth={2} opacity={0.6}>
                    <animate attributeName="r" values={`${r + 3};${r + 9};${r + 3}`} dur="1.6s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.7;0.1;0.7" dur="1.6s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle cx={pos.x} cy={pos.y} r={r + 2} fill="#0b0805" />
                <circle cx={pos.x} cy={pos.y} r={r} fill={fill} stroke={stroke} strokeWidth={2.5} opacity={unlocked ? 1 : 0.85} />
                <text x={pos.x} y={pos.y + 6} textAnchor="middle" fontSize={18} opacity={unlocked ? 1 : 0.35}>
                  {unlocked ? BOOK_ICONS[i] : "🔒"}
                </text>
                {completed && <text x={pos.x + 14} y={pos.y - 12} textAnchor="middle" fontSize={13}>✓</text>}
                {current && <text x={pos.x} y={pos.y - r - 6} textAnchor="middle" fontSize={13}>⭐</text>}
                {/* nome do livro */}
                <text x={pos.x} y={pos.y + r + 12} textAnchor="middle" fontSize={9} fontWeight="bold" fill={unlocked ? "#e8dcc4" : "#6a6152"}>
                  {b.name}
                </text>
              </g>
            );
          })}

          {/* início e fim */}
          {positions[0] && <text x={positions[0].x - 26} y={positions[0].y + 5} textAnchor="middle" fontSize={18}>🏁</text>}
          {positions.length > 0 && (
            <text x={positions[positions.length - 1].x} y={positions[positions.length - 1].y - 30} textAnchor="middle" fontSize={20}>
              {completedBooks === books.length ? "🏆" : "✨"}
            </text>
          )}

          <rect x={0} y={viewH - 24} width={VIEW_W} height={24} fill="transparent" />
        </svg>
      </div>
    </motion.div>
  );
};

export default RPGWorldMap;
