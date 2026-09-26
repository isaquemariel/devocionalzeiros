import { useSyncExternalStore } from "react";
import type { MascotLook } from "@/lib/rpgMascot";

/**
 * O VISUAL DO PERSONAGEM — o que a pessoa equipou no guarda-roupa do RPG, e
 * que o Devocionalzeiro veste em TODO o app: na home, no carregamento, no
 * quiz, nas comemorações, no parabéns da assinatura, nos modais.
 *
 * A fonte é a mesma do RPG (`rpgRewards`: o localStorage do aparelho e, por
 * trás dele, a conta). `SincronizaVisual`, montado uma vez no `App`, lê a
 * escolha quando a pessoa entra e a acompanha quando ela troca de peça; este
 * módulo só guarda o valor e avisa quem desenha.
 *
 * Fora do RPG ficam de fora a MONTARIA e o COMPANHEIRO: são da aventura — um
 * cavalo no canto da home, ou um leão ao lado do carregamento, tomariam a tela
 * e mudariam o tamanho do boneco em cada lugar. O que ele VESTE (cor, cabeça,
 * óculos, barba, traje, escudo, espada, arma, asas e aura) vai junto.
 */

export const EVENTO_VISUAL = "dz:visual";

let atual: Partial<MascotLook> | null = null;
let chave = "null";
const ouvintes = new Set<() => void>();

export function definirVisual(look: Partial<MascotLook> | null): void {
  const k = JSON.stringify(look);
  if (k === chave) return;
  chave = k;
  atual = look;
  ouvintes.forEach((f) => f());
}

export function lerVisual(): Partial<MascotLook> | null {
  return atual;
}

const assinar = (f: () => void) => { ouvintes.add(f); return () => { ouvintes.delete(f); }; };

/** o visual equipado (ou `null` sem conta / sem nada equipado) */
export function useVisual(): Partial<MascotLook> | null {
  return useSyncExternalStore(assinar, lerVisual, () => null);
}

/**
 * O que vale fora do RPG: sem montaria nem companheiro. `null` quando não
 * sobra nada além do padrão — aí ele é o rig em SVG, sem custo de canvas.
 */
export function paraOApp(look: Partial<MascotLook> | null | undefined): Partial<MascotLook> | null {
  if (!look) return null;
  const { mount: _m, pet: _p, ...resto } = look;
  void _m; void _p;
  const vazio =
    (!resto.head || resto.head === "none") && !resto.glasses && !resto.beard &&
    (!resto.robe || resto.robe === "none") && !resto.shield && !resto.sword &&
    (!resto.weapon || resto.weapon === "none") && (!resto.wings || resto.wings === "none") &&
    (!resto.aura || resto.aura === "none") && (!resto.color || resto.color === "blue");
  return vazio ? null : resto;
}
