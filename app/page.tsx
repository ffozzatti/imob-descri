import React from 'react';
// Substituindo next/link para compatibilidade com o preview
// import Link from 'next/link'; 
import { 
  Camera, 
  CheckCircle, 
  Zap, 
  ArrowRight, 
  Star, 
  Menu,
  ShieldCheck,
  TrendingUp,
  Copy
} from 'lucide-react';

// Componente Link simplificado
const Link = ({ href, children, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a href={href} className={className} {...props}>
    {children}
  </a>
);

export default function LandingPage() {
  return (
    // MUDANÇA: bg-white -> bg-slate-950, text-slate-900 -> text-slate-50
    <div className="min-h-screen bg-slate-950 font-sans text-slate-50 selection:bg-blue-500 selection:text-white">
      
      {/* --- NAVBAR --- */}
      {/* MUDANÇA: bg-white/80 -> bg-slate-950/80, border-slate-200 -> border-slate-800 */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 text-xl font-bold tracking-tighter text-blue-500">
            <Zap className="h-6 w-6 fill-blue-500 text-blue-500" />
            <span>ImobDescri</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#como-funciona" className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">
              Como Funciona
            </Link>
            <Link href="#precos" className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">
              Preços
            </Link>
            <div className="h-4 w-px bg-slate-800 mx-2"></div>
            <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Entrar
            </Link>
            <Link 
              href="/signup" 
              className="rounded-full bg-blue-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition-all hover:bg-blue-500 hover:shadow-blue-500/20 hover:-translate-y-0.5"
            >
              Começar Grátis
            </Link>
          </nav>

          <button className="md:hidden text-slate-400 hover:text-white">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <main>
        {/* --- HERO SECTION --- */}
        <section className="relative overflow-hidden pt-16 pb-20 md:pt-32 md:pb-32">
          {/* Background decoration (Glow azulado) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -z-10 opacity-50 pointer-events-none"></div>

          <div className="container mx-auto px-4 text-center max-w-5xl">
            {/* Badge Dark */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-900 bg-blue-900/30 px-3 py-1 mb-8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-xs font-semibold text-blue-300 uppercase tracking-wide">
                Novo: IA com Visão Computacional
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              Transforme Fotos em <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Descrições que Vendem
              </span>
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
              O fim do bloqueio criativo para corretores. Envie as fotos do imóvel e nossa IA gera 
              textos persuasivos para Zap Imóveis, OLX e Instagram em segundos.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/signup" 
                className="w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-xl bg-blue-600 px-8 text-lg font-bold text-white shadow-xl shadow-blue-900/50 transition-all hover:bg-blue-500 hover:-translate-y-1"
              >
                Gerar Descrição Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              {/* Botão Secundário Dark */}
              <Link 
                href="#demo" 
                className="w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/50 px-8 text-lg font-medium text-slate-300 shadow-sm transition-all hover:bg-slate-800 hover:text-white hover:border-slate-600"
              >
                Ver Exemplo Real
              </Link>
            </div>

            {/* Prova Social */}
            <div className="mt-12 flex flex-col items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-slate-950 bg-slate-800 overflow-hidden shadow-sm">
                    <img 
                      src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${i * 123}&backgroundColor=1e293b`} 
                      alt="Avatar" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-slate-400">
                <div className="flex text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span>+500 corretores usaram esta semana</span>
              </div>
            </div>
          </div>
        </section>

        {/* --- COMO FUNCIONA --- */}
        {/* MUDANÇA: bg-slate-950, border-slate-900 */}
        <section id="como-funciona" className="py-24 bg-slate-950 border-y border-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
                Economize horas de digitação
              </h2>
              <p className="text-lg text-slate-400">
                Você vende imóveis, não é escritor. Deixe a parte chata com a gente em 3 passos simples.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: <Camera className="h-8 w-8 text-white" />,
                  bg: "bg-blue-600",
                  title: "1. Envie as Fotos",
                  desc: "Faça upload de até 5 fotos da fachada, sala ou áreas principais. Aceitamos JPG e PNG direto do celular."
                },
                {
                  icon: <Zap className="h-8 w-8 text-white" />,
                  bg: "bg-indigo-600",
                  title: "2. IA Analisa",
                  desc: "Nossa visão computacional identifica acabamentos (porcelanato, gesso), iluminação e estilo do imóvel."
                },
                {
                  icon: <Copy className="h-8 w-8 text-white" />,
                  bg: "bg-emerald-600",
                  title: "3. Copie e Venda",
                  desc: "Receba o título, descrição técnica e copy emocional formatados com emojis, prontos para colar."
                }
              ].map((step, idx) => (
                // MUDANÇA: Cards bg-slate-900, border-slate-800
                <div key={idx} className="group relative bg-slate-900/50 rounded-2xl p-8 border border-slate-800 transition-all hover:bg-slate-900 hover:border-slate-700 hover:shadow-xl hover:shadow-blue-900/10 hover:-translate-y-1">
                  <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl ${step.bg} shadow-lg shadow-black/20`}>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- DEMO / BENEFÍCIOS --- */}
        <section id="demo" className="py-24 bg-slate-900 overflow-hidden relative">
           {/* Efeito de luz de fundo */}
           <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
              
              {/* Texto Benefícios */}
              <div className="lg:w-1/2 space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                  Não é só um texto.<br />
                  É <span className="text-blue-500">Copywriting Imobiliário</span>.
                </h2>
                <p className="text-lg text-slate-400">
                  Nossa IA foi treinada com milhares de anúncios de alta conversão do mercado brasileiro. Ela sabe o que valoriza um imóvel.
                </p>
                
                <ul className="space-y-5">
                  {[
                    { text: "Detecta acabamentos de luxo (mármore, madeira).", icon: ShieldCheck },
                    { text: "Cria gatilhos de escassez e exclusividade.", icon: TrendingUp },
                    { text: "Formata com emojis e tópicos para leitura fácil.", icon: CheckCircle },
                    { text: "Gera sugestões de hashtags para Instagram.", icon: Star },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      {/* Ícone benefits adaptado para dark */}
                      <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-900/50 text-blue-400 shrink-0 border border-blue-900/50">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <span className="text-slate-300 font-medium">{item.text}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/signup" className="hidden lg:inline-flex items-center text-blue-400 font-bold hover:text-blue-300 mt-4 transition-colors">
                  Criar minha primeira descrição <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              {/* Mockup Dark Mode */}
              <div className="lg:w-1/2 w-full relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[2rem] blur-2xl opacity-20 -z-10"></div>
                
                <div className="bg-slate-950 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden transform rotate-1 transition-transform hover:rotate-0 duration-500">
                  {/* Mockup Header Dark */}
                  <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="text-xs font-mono text-slate-500">resultado_gerado.txt</div>
                  </div>
                  
                  {/* Mockup Body Dark */}
                  <div className="p-8 font-sans space-y-5 bg-slate-950">
                    <div>
                      <span className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1 block">Título Sugerido</span>
                      <p className="font-bold text-lg text-slate-200">💎 EXCLUSIVIDADE: Alto Padrão com Vista Panorâmica no Jardins</p>
                    </div>
                    
                    <div>
                      <span className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1 block">Descrição</span>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Imagine viver momentos inesquecíveis neste apartamento de 180m², onde cada detalhe foi pensado para o seu conforto. A sala ampliada, com piso em madeira nobre ✨, integra-se perfeitamente à varanda gourmet, proporcionando luz natural abundante o dia todo.
                      </p>
                    </div>

                    <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                      <ul className="text-sm space-y-2 text-slate-300">
                        <li className="flex items-center gap-2">🔹 3 Suítes com armários planejados</li>
                        <li className="flex items-center gap-2">🔹 Cozinha com ilha em granito preto</li>
                        <li className="flex items-center gap-2">🔹 4 Vagas de garagem + Depósito</li>
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-900">
                      <span className="text-xs text-slate-600">Gerado em 3.8s</span>
                      <button className="text-xs flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white px-2 py-1 rounded transition-colors border border-slate-800 hover:border-slate-700">
                        <Copy className="h-3 w-3" /> Copiar Texto
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- PREÇOS --- */}
        <section id="precos" className="py-24 bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
                Sem Mensalidades. Sem Pegadinhas.
              </h2>
              <p className="text-lg text-slate-400">
                Não queremos prender você numa assinatura. Compre créditos e use quando precisar. Eles nunca expiram.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              {/* Card de Preço agora usa um gradiente sutil para destacar no fundo escuro */}
              <div className="relative bg-gradient-to-b from-slate-900 to-slate-950 rounded-[2rem] p-8 md:p-10 shadow-2xl border border-slate-800 overflow-hidden group hover:border-blue-900/50 transition-all">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                {/* Faixa de Destaque */}
                <div className="absolute top-0 right-0 bg-blue-600 text-xs font-bold px-4 py-2 rounded-bl-2xl uppercase tracking-wider text-white">
                  Melhor Escolha
                </div>

                <div className="mb-8 relative z-10">
                  <h3 className="text-2xl font-bold mb-2 text-white">Pacote Corretor Pro</h3>
                  <p className="text-slate-400 text-sm">Ideal para testar e validar.</p>
                </div>

                <div className="flex items-baseline mb-8 relative z-10">
                  <span className="text-5xl font-extrabold tracking-tight text-white">R$ 19,90</span>
                  <span className="ml-2 text-slate-500 font-medium">/único</span>
                </div>

                <div className="w-full h-px bg-slate-800 my-8"></div>

                <ul className="space-y-4 mb-8 relative z-10">
                  {[
                    "10 Descrições completas",
                    "Upload de até 5 fotos por imóvel",
                    "Geração de Hashtags e Post Insta",
                    "Suporte prioritário no WhatsApp",
                    "Créditos não expiram nunca"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/signup?plan=pro" 
                  className="relative z-10 block w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-center py-4 rounded-xl transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-1"
                >
                  Comprar Créditos Agora
                </Link>
                <p className="text-center text-xs text-slate-500 mt-4 relative z-10">
                  Pagamento seguro via Stripe/Pix. Garantia de 7 dias.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- FAQ --- */}
        <section className="py-20 bg-slate-900 border-t border-slate-800">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-2xl font-bold mb-8 text-white">Dúvidas Frequentes</h2>
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
                    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                        <h4 className="font-bold mb-2 text-slate-200">As fotos ficam salvas?</h4>
                        <p className="text-sm text-slate-400">Não. As fotos são processadas pela IA e deletadas logo após a geração da descrição para sua privacidade.</p>
                    </div>
                    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                        <h4 className="font-bold mb-2 text-slate-200">Serve para aluguel ou venda?</h4>
                        <p className="text-sm text-slate-400">Ambos! A IA identifica o padrão do imóvel e cria textos adequados para qualquer finalidade comercial.</p>
                    </div>
                </div>
            </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 font-bold text-white">
              <Zap className="h-5 w-5 text-blue-500" />
              <span>ImobDescri</span>
            </div>
            
            <div className="flex gap-6 text-sm text-slate-500">
              <Link href="#" className="hover:text-blue-400 transition-colors">Termos de Uso</Link>
              <Link href="#" className="hover:text-blue-400 transition-colors">Privacidade</Link>
              <Link href="#" className="hover:text-blue-400 transition-colors">Contato</Link>
            </div>
            
            <p className="text-sm text-slate-600">
              © {new Date().getFullYear()} ImobDescri. Feito no Brasil 🇧🇷
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}