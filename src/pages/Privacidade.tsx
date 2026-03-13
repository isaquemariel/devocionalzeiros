import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import logoOfficial from "@/assets/logo-official.png";

const Privacidade = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 py-4 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <img src={logoOfficial} alt="Devocionalzeiros" className="h-8 w-auto" />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Title */}
        <div className="mb-10 border-b border-gray-200 pb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Política de Privacidade
          </h1>
          <p className="text-sm text-gray-500">
            Última atualização: 13 de Março de 2026
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10 text-gray-700 leading-relaxed">

          {/* 1. Introdução */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introdução</h2>
            <p className="mb-3">
              O aplicativo <strong>Devocionalzeiros</strong> respeita a privacidade dos usuários e está comprometido em proteger as informações coletadas durante o uso da plataforma.
            </p>
            <p className="mb-3">
              Esta Política de Privacidade descreve como coletamos, utilizamos e protegemos as informações dos usuários que acessam o aplicativo.
            </p>
            <p>
              Ao utilizar o aplicativo, você concorda com as práticas descritas nesta política.
            </p>
          </section>

          {/* 2. Informações que coletamos */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Informações que Coletamos</h2>
            <p>
              Podemos coletar alguns tipos de informações para fornecer e melhorar os serviços do aplicativo.
            </p>
          </section>

          {/* 3. Informações fornecidas pelo usuário */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Informações Fornecidas pelo Usuário</h2>
            <p className="mb-3">
              Podemos coletar informações fornecidas diretamente pelo usuário, como:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>Nome</li>
              <li>Endereço de e-mail</li>
              <li>Informações de conta</li>
              <li>Conteúdos inseridos dentro da plataforma</li>
            </ul>
            <p className="mt-3">
              Essas informações são utilizadas apenas para permitir o funcionamento do aplicativo.
            </p>
          </section>

          {/* 4. Informações coletadas automaticamente */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Informações Coletadas Automaticamente</h2>
            <p className="mb-3">
              Durante o uso do aplicativo, algumas informações podem ser coletadas automaticamente, incluindo:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>Tipo de dispositivo</li>
              <li>Sistema operacional</li>
              <li>Identificador do dispositivo</li>
              <li>Dados de uso do aplicativo</li>
              <li>Informações de diagnóstico e desempenho</li>
            </ul>
            <p className="mt-3">
              Esses dados ajudam a melhorar a estabilidade e a experiência do usuário.
            </p>
          </section>

          {/* 5. Como utilizamos as informações */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Como Utilizamos as Informações</h2>
            <p className="mb-3">As informações coletadas podem ser utilizadas para:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>Operar e manter o funcionamento do aplicativo</li>
              <li>Melhorar a experiência do usuário</li>
              <li>Corrigir erros e melhorar o desempenho do app</li>
              <li>Personalizar conteúdos dentro da plataforma</li>
              <li>Cumprir obrigações legais</li>
            </ul>
          </section>

          {/* 6. Compartilhamento de dados */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Compartilhamento de Dados</h2>
            <p className="mb-3">
              O aplicativo <strong>não vende, aluga ou comercializa</strong> dados pessoais dos usuários.
            </p>
            <p className="mb-3">
              Em alguns casos, informações podem ser compartilhadas com serviços terceiros necessários para funcionamento do aplicativo, como:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>Serviços de hospedagem</li>
              <li>Ferramentas de análise</li>
              <li>Infraestrutura de tecnologia</li>
            </ul>
            <p className="mt-3">
              Esses serviços seguem padrões adequados de segurança e privacidade.
            </p>
          </section>

          {/* 7. Permissões do aplicativo */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Permissões do Aplicativo</h2>
            <p className="mb-3">
              O aplicativo pode solicitar permissões do dispositivo apenas quando necessário para executar funcionalidades específicas.
            </p>
            <p>
              Nenhuma permissão é solicitada sem necessidade funcional para o funcionamento do aplicativo.
            </p>
          </section>

          {/* 8. Segurança */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Segurança das Informações</h2>
            <p className="mb-3">
              Adotamos medidas de segurança técnicas e organizacionais para proteger as informações dos usuários contra acesso não autorizado, perda, alteração ou divulgação.
            </p>
            <p>
              Embora nenhum sistema seja completamente seguro, trabalhamos continuamente para proteger os dados dos usuários.
            </p>
          </section>

          {/* 9. Direitos */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Direitos dos Usuários</h2>
            <p className="mb-3">Os usuários podem solicitar:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>Acesso aos seus dados</li>
              <li>Correção de informações</li>
              <li>Exclusão de dados pessoais</li>
            </ul>
            <p className="mt-3">
              Para isso, basta entrar em contato através do e-mail informado abaixo.
            </p>
          </section>

          {/* 10. Menores */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Privacidade de Menores</h2>
            <p className="mb-3">
              O aplicativo não é direcionado a crianças menores de 13 anos e não coleta intencionalmente dados pessoais de crianças.
            </p>
            <p>
              Caso seja identificado algum dado coletado de forma indevida, ele será removido.
            </p>
          </section>

          {/* 11. Alterações */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Alterações nesta Política</h2>
            <p className="mb-3">
              Esta Política de Privacidade pode ser atualizada periodicamente para refletir melhorias no aplicativo ou mudanças legais.
            </p>
            <p>
              Recomendamos que os usuários revisem esta página regularmente.
            </p>
          </section>

          {/* 12. Contato */}
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Contato</h2>
            <p className="mb-3">
              Caso tenha dúvidas sobre esta Política de Privacidade, entre em contato:
            </p>
            <ul className="space-y-2 pl-2">
              <li>
                <span className="font-medium">E-mail:</span>{" "}
                <a
                  href="mailto:devocionalzeiros@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  devocionalzeiros@gmail.com
                </a>
              </li>
              <li>
                <span className="font-medium">Site:</span>{" "}
                <a
                  href="https://devocionalzeiros.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://devocionalzeiros.com.br
                </a>
              </li>
            </ul>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Devocionalzeiros. Todos os direitos reservados.
        </div>
      </main>
    </div>
  );
};

export default Privacidade;
