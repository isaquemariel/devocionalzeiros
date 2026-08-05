import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, MessageSquare, MessageSquareOff } from "lucide-react";
import { initAudio, setSoundscape, setVolume, getVolume, type Soundscape } from "@/lib/rpgAudio";
import { setVoiceEnabled, isVoiceSupported } from "@/lib/rpgVoice";

// Controles de áudio compartilhados por TODAS as telas do RPG (leitura, estudo
// do versículo, desafios/jogos e batalha). Mantém o som ambiente enquanto joga
// e permite ajustar volume, trilha de fundo e a narração por voz.
const SOUND_OPTIONS: { k: Soundscape; l: string }[] = [
  { k: "scene", l: "Cena (automático)" },
  { k: "rain", l: "Chuva" },
  { k: "white", l: "Ruído branco" },
  { k: "brown", l: "Foco (ruído marrom)" },
  { k: "waves", l: "Mar" },
  { k: "off", l: "Desligar" },
];

export default function RPGAudioControls({ className = "" }: { className?: string }) {
  const [mode, setMode] = useState<Soundscape>(() => {
    try { return (localStorage.getItem("rpg_soundmode") as Soundscape) || "scene"; } catch { return "scene"; }
  });
  const [voice, setVoice] = useState<boolean>(() => {
    try { return isVoiceSupported() && localStorage.getItem("rpg_voice") !== "off"; } catch { return false; }
  });
  const [vol, setVol] = useState<number>(() => {
    try { const s = localStorage.getItem("rpg_volume"); return s != null ? Math.max(0, Math.min(1, parseFloat(s))) : getVolume(); } catch { return 0.55; }
  });
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // SINCRONIZA o estado inicial da narração com o motor de voz. Sem isto,
  // `enabled` no rpgVoice ficava FALSE por padrão e a narração nunca tocava
  // (nem no mobile nem no desktop) até o usuário clicar no botão de voz —
  // era a causa de "a cena estar sem voz do narrador".
  useEffect(() => { setVoiceEnabled(voice); }, [voice]);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const chooseSound = (m: Soundscape) => {
    setMode(m);
    try { localStorage.setItem("rpg_soundmode", m); } catch { /* noop */ }
    if (m !== "off") initAudio();
    setSoundscape(m);
  };
  const changeVol = (v: number) => {
    setVol(v);
    if (v > 0) initAudio();
    setVolume(v);
  };
  const toggleVoice = () => {
    const nv = !voice;
    setVoice(nv);
    try { localStorage.setItem("rpg_voice", nv ? "on" : "off"); } catch { /* noop */ }
    setVoiceEnabled(nv);
  };

  const silent = mode === "off" || vol === 0;

  return (
    <div ref={boxRef} className={`flex items-center gap-1.5 ${className}`} onClick={(e) => e.stopPropagation()}>
      {isVoiceSupported() && (
        <button
          onClick={toggleVoice}
          className="w-8 h-8 rounded-full bg-black/70 flex items-center justify-center border border-white/25"
          aria-label={voice ? "Desligar narração" : "Ligar narração"}
          title="Narração (voz)"
        >
          {voice ? <MessageSquare className="w-4 h-4 text-[#ffd889]" /> : <MessageSquareOff className="w-4 h-4 text-white/60" />}
        </button>
      )}
      <div className="relative">
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-8 h-8 rounded-full bg-black/70 flex items-center justify-center border border-white/25"
          aria-label="Som e volume"
          title="Som e volume"
        >
          {silent ? <VolumeX className="w-4 h-4 text-white/60" /> : <Volume2 className="w-4 h-4 text-[#ffd889]" />}
        </button>
        {open && (
          <div className="absolute right-0 mt-1 w-52 rounded-xl border border-[#e8b04b55] bg-[#0b1120f2] p-2 shadow-[0_12px_34px_-12px_#000] z-50">
            <div className="flex items-center justify-between px-1 pb-1">
              <p className="text-[10px] font-black uppercase tracking-wide text-[#ffd889]">Volume</p>
              <span className="text-[10px] text-[#b8a67f]">{Math.round(vol * 100)}%</span>
            </div>
            <input
              type="range" min={0} max={100} value={Math.round(vol * 100)}
              onChange={(e) => changeVol(parseInt(e.target.value, 10) / 100)}
              className="w-full accent-[#e8b04b]"
              aria-label="Volume geral"
            />
            <p className="text-[10px] font-black uppercase tracking-wide text-[#ffd889] px-1 pt-2 pb-1">Som de fundo</p>
            {SOUND_OPTIONS.map((o) => (
              <button
                key={o.k}
                onClick={() => chooseSound(o.k)}
                className={`w-full text-left text-[12px] px-2.5 py-1.5 rounded-lg ${mode === o.k ? "bg-[#e8b04b] text-[#1a1206] font-bold" : "text-blue-50 hover:bg-white/10"}`}
              >
                {o.l}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
