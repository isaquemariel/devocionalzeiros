// ============================================================================
// RPG Rewards — cosméticos do Devocionalzeiro (ganhos e da loja)
// ----------------------------------------------------------------------------
// Dois caminhos de cosméticos:
//  1) GANHOS por concluir uma DIVISÃO da Bíblia (Lei, Históricos, Poéticos,
//     Profetas, Evangelhos, Atos, Cartas, Apocalipse) — e a Bíblia inteira dá
//     a "Armadura de Deus".
//  2) COMPRADOS na loja (acessórios a partir de R$1,90, trajes a partir de
//     R$4,90) — monetização.
//
// Estado (itens que possui + o que está vestindo) fica em localStorage por
// usuário (v1). A API foi feita pra migrar ao banco quando entrar pagamento.
// Puramente visual — nada aqui altera acesso/progresso.
// ============================================================================

import type { MascotLook } from "@/lib/rpgMascot";

export type Slot = "head" | "glasses" | "robe" | "shield" | "sword" | "wings";

export interface Cosmetic {
  id: string; // token único (ex.: "head:fire")
  slot: Slot;
  value?: string; // valor do slot (head/robe); glasses/shield/sword/wings são boolean
  name: string;
  emoji: string;
  source: "reward" | "shop";
  price?: string; // loja
  unlockText?: string; // recompensa
}

// ---- catálogo de cosméticos ----
export const COSMETICS: Cosmetic[] = [
  // GANHOS (por divisão)
  { id: "head:fire", slot: "head", value: "fire", name: "Foguinho na Cabeça", emoji: "🔥", source: "reward", unlockText: "Conclua a Lei (Gênesis–Deuteronômio)" },
  { id: "head:crown", slot: "head", value: "crown", name: "Coroa", emoji: "👑", source: "reward", unlockText: "Conclua os Livros Históricos (Josué–Ester)" },
  { id: "glasses", slot: "glasses", name: "Óculos da Sabedoria", emoji: "👓", source: "reward", unlockText: "Conclua os Poéticos (Jó–Cantares)" },
  { id: "robe:prophet", slot: "robe", value: "prophet", name: "Manto de Profeta", emoji: "🧥", source: "reward", unlockText: "Conclua os Profetas Maiores (Isaías–Daniel)" },
  { id: "shield", slot: "shield", name: "Escudo da Fé", emoji: "🛡️", source: "reward", unlockText: "Conclua os Profetas Menores (Oséias–Malaquias)" },
  { id: "head:halo", slot: "head", value: "halo", name: "Auréola", emoji: "😇", source: "reward", unlockText: "Conclua os Evangelhos (Mateus–João)" },
  { id: "wings", slot: "wings", name: "Asas", emoji: "🕊️", source: "reward", unlockText: "Conclua Atos" },
  { id: "sword", slot: "sword", name: "Espada do Espírito", emoji: "⚔️", source: "reward", unlockText: "Conclua as Cartas (Romanos–Judas)" },
  { id: "robe:royal", slot: "robe", value: "royal", name: "Traje Glorificado", emoji: "✨", source: "reward", unlockText: "Conclua Apocalipse" },
  { id: "robe:armor", slot: "robe", value: "armor", name: "Armadura de Deus", emoji: "🏆", source: "reward", unlockText: "Conclua a Bíblia inteira — o Fiel" },
  { id: "head:helmet", slot: "head", value: "helmet", name: "Capacete da Salvação", emoji: "⛑️", source: "reward", unlockText: "Conclua a Bíblia inteira — o Fiel" },

  // LOJA (comprados)
  { id: "head:cap", slot: "head", value: "cap", name: "Boné", emoji: "🧢", source: "shop", price: "R$ 1,90" },
  { id: "head:hat", slot: "head", value: "hat", name: "Chapéu de Aventureiro", emoji: "🎩", source: "shop", price: "R$ 1,90" },
  { id: "robe:pilgrim", slot: "robe", value: "pilgrim", name: "Manto de Peregrino", emoji: "🧎", source: "shop", price: "R$ 4,90" },
];

export const COSMETIC_BY_ID: Record<string, Cosmetic> = Object.fromEntries(COSMETICS.map((c) => [c.id, c]));

// ---- divisões da Bíblia (por índice de livro) e a recompensa de cada ----
export interface Division {
  id: string;
  name: string;
  range: [number, number]; // índices inclusivos em RPG_BIBLE_BOOKS
  rewardIds: string[];
}

export const DIVISIONS: Division[] = [
  { id: "lei", name: "Lei (Pentateuco)", range: [0, 4], rewardIds: ["head:fire"] },
  { id: "historicos", name: "Livros Históricos", range: [5, 16], rewardIds: ["head:crown"] },
  { id: "poeticos", name: "Livros Poéticos", range: [17, 21], rewardIds: ["glasses"] },
  { id: "profetas_maiores", name: "Profetas Maiores", range: [22, 26], rewardIds: ["robe:prophet"] },
  { id: "profetas_menores", name: "Profetas Menores", range: [27, 38], rewardIds: ["shield"] },
  { id: "evangelhos", name: "Evangelhos", range: [39, 42], rewardIds: ["head:halo"] },
  { id: "atos", name: "Atos", range: [43, 43], rewardIds: ["wings"] },
  { id: "cartas", name: "Cartas / Epístolas", range: [44, 64], rewardIds: ["sword"] },
  { id: "apocalipse", name: "Apocalipse", range: [65, 65], rewardIds: ["robe:royal"] },
];

// Recompensa especial pela Bíblia inteira (a "Armadura de Deus" completa)
export const FULL_BIBLE_REWARD_IDS = ["robe:armor", "head:helmet"];

type BookProgress = (bookIndex: number) => { completed: number; total: number; percent: number };

/** IDs de cosméticos GANHOS até agora, com base nas divisões 100% concluídas. */
export function computeEarned(getBookProgress: BookProgress): string[] {
  const earned: string[] = [];
  for (const d of DIVISIONS) {
    let complete = true;
    for (let i = d.range[0]; i <= d.range[1]; i++) {
      if (getBookProgress(i).percent < 100) {
        complete = false;
        break;
      }
    }
    if (complete) earned.push(...d.rewardIds);
  }
  // Bíblia inteira?
  const allDone = DIVISIONS.every((d) => {
    for (let i = d.range[0]; i <= d.range[1]; i++) if (getBookProgress(i).percent < 100) return false;
    return true;
  });
  if (allDone) earned.push(...FULL_BIBLE_REWARD_IDS);
  return earned;
}

// ---- persistência (localStorage v1, por usuário) ----
const OWNED_KEY = (u: string) => `rpg_owned_${u}`;
const EQUIP_KEY = (u: string) => `rpg_equip_${u}`;

export function getOwned(userId: string): Set<string> {
  try {
    const raw = localStorage.getItem(OWNED_KEY(userId));
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

export function addOwned(userId: string, ids: string[]): void {
  try {
    const owned = getOwned(userId);
    let changed = false;
    for (const id of ids) if (!owned.has(id)) { owned.add(id); changed = true; }
    if (changed) localStorage.setItem(OWNED_KEY(userId), JSON.stringify([...owned]));
  } catch {
    /* ignore */
  }
}

/** Equipamento atual: token por slot (ou ausente). */
export function getEquip(userId: string): Partial<Record<Slot, string>> {
  try {
    const raw = localStorage.getItem(EQUIP_KEY(userId));
    return raw ? (JSON.parse(raw) as Partial<Record<Slot, string>>) : {};
  } catch {
    return {};
  }
}

export function setEquip(userId: string, equip: Partial<Record<Slot, string>>): void {
  try {
    localStorage.setItem(EQUIP_KEY(userId), JSON.stringify(equip));
  } catch {
    /* ignore */
  }
}

/** Converte o equipamento salvo num MascotLook pronto pro desenho. */
export function equipToLook(equip: Partial<Record<Slot, string>>): MascotLook {
  const look: MascotLook = { head: "none", glasses: false, robe: "none", shield: false, sword: false, wings: false };
  for (const slot of Object.keys(equip) as Slot[]) {
    const id = equip[slot];
    if (!id) continue;
    const c = COSMETIC_BY_ID[id];
    if (!c) continue;
    if (slot === "head") look.head = (c.value as MascotLook["head"]) || "none";
    else if (slot === "robe") look.robe = (c.value as MascotLook["robe"]) || "none";
    else if (slot === "glasses") look.glasses = true;
    else if (slot === "shield") look.shield = true;
    else if (slot === "sword") look.sword = true;
    else if (slot === "wings") look.wings = true;
  }
  return look;
}

/** Filtra um equipamento mantendo só os itens realmente possuídos. */
export function ownedFilter(
  equip: Partial<Record<Slot, string>>,
  owned: Set<string>,
): Partial<Record<Slot, string>> {
  const out: Partial<Record<Slot, string>> = {};
  for (const slot of Object.keys(equip) as Slot[]) {
    const id = equip[slot];
    if (id && owned.has(id)) out[slot] = id;
  }
  return out;
}

/** Conjunto de cosméticos que o usuário possui (ganhos por divisão + já obtidos). */
export function getAllOwned(userId: string, getBookProgress: BookProgress): Set<string> {
  const owned = getOwned(userId);
  computeEarned(getBookProgress).forEach((id) => owned.add(id));
  return owned;
}

/**
 * Look que o boneco veste em TODO o RPG (home, mapa, leitura, batalha…).
 *
 * A escolha do jogador fica salva e é exibida em qualquer tela até que ele
 * mesmo troque ou tire a peça no guarda-roupa — não some ao recarregar. O
 * controle de "posse" (cadeado / como obter) vive só na UI da loja e decide
 * se um item pode ser vestido, não apaga o visual já escolhido.
 */
export function getEquippedLookOwned(userId: string, _getBookProgress?: BookProgress, _isAdmin = false): MascotLook {
  return equipToLook(getEquip(userId));
}
