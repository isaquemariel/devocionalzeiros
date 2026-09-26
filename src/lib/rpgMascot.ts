// ============================================================================
// O Devocionalzeiro do RPG — tipos do guarda-roupa e o desenho das telas leves
// ----------------------------------------------------------------------------
// Aqui moram o `MascotLook` (o que o herói veste) e o `drawMascot`, que as
// telas do RPG com canvas próprio (o início do RPG, a leitura, a landing)
// chamam para pôr o herói na cena.
//
// Este arquivo já teve um motor inteiro de pixel art: um Devocionalzeiro
// próprio, de óculos e chama laranja, com o guarda-roupa redesenhado pixel a
// pixel. O app tinha, assim, dois personagens diferentes. Agora o `drawMascot`
// desenha o MESMO herói do resto do RPG (`rpgHero`), que é o rig do app — só
// numa escala menor, a das cenas pequenas que o usam.
// ============================================================================

import { drawHeroHD, drawPetHD, heroMountLift } from "@/lib/rpgHero";

export type MascotHead =
  | "none"
  | "fire" // 🔥 foguinho na cabeça (recompensa: Pentateuco/Lei)
  | "cap"
  | "hat"
  | "crown" // 👑 coroa (recompensa: Históricos)
  | "helmet" // capacete da salvação (armadura)
  | "halo" // 😇 auréola (recompensa: Atos/Evangelhos)
  // --- loja (acessórios simples) ---
  | "turban" // turbante sacerdotal
  | "thorns" // coroa de espinhos
  | "kefiah" // lenço do deserto
  | "olive" // grinalda de oliveira
  | "fisher"; // chapéu de pescador

export type MascotRobe =
  | "none"
  | "pilgrim" // manto de peregrino
  | "prophet" // 🧥 manto de profeta (recompensa: Profetas)
  | "royal" // traje real
  | "armor" // couraça / armadura de Deus
  // --- loja (trajes) ---
  | "priest" // vestes sacerdotais (linho branco)
  | "ephod" // éfode com peitoral de 12 pedras
  | "shepherd" // manto do pastor (lã)
  | "purple" // púrpura real
  | "sackcloth" // saco e cinza (arrependimento)
  | "wedding"; // vestes das bodas (branco radiante)

// asas com variações (recompensa "dove" + variações da loja)
export type MascotWings = "none" | "dove" | "gold" | "crystal" | "seraph";

// armas de mão (loja) — mão direita
export type MascotWeapon = "none" | "staff" | "sling" | "shofar" | "torch" | "spear" | "harp";

// efeitos "robustos" ao fundo/redor (loja premium)
export type MascotAura = "none" | "pillar" | "shekinah" | "glory";

// montarias (loja) — o boneco vai EM CIMA, montado
export type MascotMount = "none" | "chariot" | "horse" | "camel" | "donkey";

// mascotes/companheiros (loja) — ao lado esquerdo (aves sobrevoam)
export type MascotPet = "none" | "angel" | "dove" | "flame" | "lamb" | "lion";

export type MascotMood = "idle" | "happy" | "sad";

// Cor do CORPO do personagem (loja: R$ 4,90). "blue" é a original.
export type MascotColor =
  | "blue" | "yellow" | "red" | "pink" | "skyblue" | "black" | "white" | "orange" | "green";

export interface MascotLook {
  head: MascotHead;
  glasses: boolean; // 👓 óculos da sabedoria (recompensa: Poéticos)
  beard: boolean; // 🧔 barba de ancião (loja)
  robe: MascotRobe;
  shield: boolean; // 🛡️ escudo da fé
  sword: boolean; // ⚔️ espada do Espírito (recompensa: Cartas)
  weapon: MascotWeapon; // arma de mão (loja)
  wings: MascotWings; // 🕊️ asas (recompensa "dove" + variações)
  aura: MascotAura; // efeito ao fundo (loja premium)
  mount: MascotMount; // montaria (loja)
  pet: MascotPet; // mascote/companheiro (loja)
  color: MascotColor; // cor do corpo (loja)
}

export const DEFAULT_LOOK: MascotLook = {
  head: "none",
  glasses: false,
  beard: false,
  robe: "none",
  shield: false,
  sword: false,
  weapon: "none",
  wings: "none",
  aura: "none",
  mount: "none",
  pet: "none",
  color: "blue",
};

export interface DrawOpts {
  t: number; // tempo de animação (ms acumulados)
  reduce?: boolean; // prefers-reduced-motion
  walking?: boolean; // andando pelo caminho
  mood?: MascotMood; // reação (comemora / triste)
}

/**
 * A altura do herói nestas cenas. O boneco de pixel art media ~40 unidades do
 * chão ao topo; o herói novo tem 53 no palco — aqui ele sai na escala antiga,
 * para caber nas cenas que foram compostas para aquele tamanho.
 */
const ESCALA = 40 / 53;

/** quanto a montaria levanta o herói, na escala destas cenas */
export const mountLift = (m: MascotMount): number => heroMountLift(m) * ESCALA;

export function drawMascot(g: CanvasRenderingContext2D, bx: number, feetY: number, look: MascotLook, opts: DrawOpts): void {
  g.save();
  g.translate(bx, feetY);
  g.scale(ESCALA, ESCALA);
  drawHeroHD(g, 0, 0, look, { t: opts.t, reduce: opts.reduce, walking: opts.walking, mood: opts.mood });
  if (look.pet && look.pet !== "none") drawPetHD(g, -32, 0, look.pet, opts.t, opts.reduce);
  g.restore();
}
