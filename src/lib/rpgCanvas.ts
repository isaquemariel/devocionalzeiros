// ============================================================================
// RPG Canvas — setup de alta resolução (high-DPI + supersampling)
// ----------------------------------------------------------------------------
// As cenas do RPG são desenhadas num sistema de coordenadas "lógico" pequeno
// (ex.: 256×168). Em telas grandes (desktop) isso esticava demais e ficava
// borrado/serrilhado. Este helper cria o backing store do canvas em resolução
// muito maior (proporcional ao devicePixelRatio × fator de qualidade) e escala
// o contexto de volta pras coordenadas lógicas — então o MESMO código de
// desenho passa a renderizar nítido e detalhado em qualquer tamanho.
// ============================================================================

/**
 * Prepara o canvas em alta resolução e devolve o contexto já escalado para o
 * sistema de coordenadas lógico (logicalW × logicalH). Desenhe normalmente em
 * coordenadas lógicas; a nitidez em telas grandes é automática.
 */
export function setupHiResCanvas(
  canvas: HTMLCanvasElement,
  logicalW: number,
  logicalH: number,
  quality = 4,
): CanvasRenderingContext2D | null {
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
  // fator total, limitado para não explodir memória em telas 4K
  const scale = Math.max(2, Math.min(8, Math.round(dpr * quality)));
  canvas.width = Math.round(logicalW * scale);
  canvas.height = Math.round(logicalH * scale);
  const g = canvas.getContext("2d");
  if (!g) return null;
  g.setTransform(scale, 0, 0, scale, 0, 0); // desenhar em coords lógicas
  g.imageSmoothingEnabled = true; // curvas do mascote suaves e nítidas
  return g;
}
