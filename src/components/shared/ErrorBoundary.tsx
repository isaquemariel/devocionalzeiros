import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** rótulo do trecho protegido, só para o log */
  area?: string;
}
interface State {
  erro: Error | null;
}

/**
 * REDE DE SEGURANÇA DA TELA.
 *
 * O app não tinha nenhuma: um erro de render em qualquer página derrubava a
 * árvore inteira e o usuário ficava com a TELA BRANCA, sem nada para tocar e
 * sem saber o que houve — foi assim que um `user.id` sem sessão no /rpg apagou
 * o app inteiro. O erro continua indo para o console (ele é um defeito, não
 * deve ser escondido), mas quem está do outro lado ganha uma saída.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { erro: null };

  static getDerivedStateFromError(erro: Error): State {
    return { erro };
  }

  componentDidCatch(erro: Error, info: unknown) {
    console.error(`[tela${this.props.area ? `:${this.props.area}` : ""}] erro não tratado:`, erro, info);
  }

  render() {
    const { erro } = this.state;
    if (!erro) return this.props.children;

    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 text-center">
        <div className="w-full max-w-sm rounded-2xl border border-[#e8b04b55] bg-[#12100c] p-6">
          <div className="text-4xl">🙏</div>
          <h1 className="mt-3 text-lg font-bold text-[#ffd889]">Algo travou nesta tela</h1>
          <p className="mt-2 text-sm text-[#cdbfa0]">
            Não foi culpa sua. Tente de novo — se insistir, volte ao início.
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <button
              onClick={() => this.setState({ erro: null })}
              className="w-full rounded-xl bg-[#e8b04b] px-4 py-2.5 font-bold text-[#1a1206]"
            >
              Tentar de novo
            </button>
            <button
              onClick={() => window.location.assign("/home")}
              className="w-full rounded-xl border border-[#3a2c18] px-4 py-2.5 text-sm text-[#cdbfa0]"
            >
              Ir para o início
            </button>
          </div>
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-[11px] text-[#8a7c66]">detalhes técnicos</summary>
            <p className="mt-1 break-words text-[11px] text-[#8a7c66]">{erro.message}</p>
          </details>
        </div>
      </div>
    );
  }
}
