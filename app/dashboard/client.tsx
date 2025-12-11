'use client'

import { useState } from 'react'
import { Upload, Copy, RefreshCw, LogOut, Loader2, Image as ImageIcon } from 'lucide-react'
import { createClient } from '../../utils/supabase/clientToNav'
import { useRouter } from 'next/navigation'

export default function DashboardClient({ user, initialCredits }: { user: any, initialCredits: number }) {
  const [credits, setCredits] = useState(initialCredits)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [files, setFiles] = useState<FileList | null>(null)
  const router = useRouter()
  const supabase = createClient()

  // Função de Logout
  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  // Função que chama a API da IA
  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    if (!files || files.length === 0) return alert('Selecione pelo menos uma foto')
    if (credits <= 0) return alert('Você não tem créditos suficientes.')

    setLoading(true)
    setResult('')

    const formData = new FormData()
    // Adiciona as imagens ao formulário
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i])
    }

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error || 'Erro ao gerar')

      setResult(data.text)
      setCredits(prev => prev - 1) // Atualiza visualmente os créditos
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Header do Dashboard */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-blue-500 flex items-center gap-2">
            <div className="h-8 w-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <span className="text-lg">🤖</span>
            </div>
            ImobDescri
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-slate-800 px-3 py-1 rounded-full border border-slate-700 text-sm font-medium flex items-center gap-2">
              <span className="text-yellow-500">⚡</span>
              <span>{credits} créditos</span>
            </div>
            <button 
              onClick={handleLogout}
              className="text-slate-400 hover:text-red-400 transition-colors"
              title="Sair"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Coluna da Esquerda: Upload */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Novo Imóvel</h1>
              <p className="text-slate-400">Envie até 3 fotos dos melhores ângulos.</p>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="border-2 border-dashed border-slate-800 rounded-2xl p-8 text-center hover:border-blue-500/50 hover:bg-slate-900/50 transition-all group relative">
                <input 
                  type="file" 
                  multiple 
                  accept="image/*"
                  onChange={(e) => setFiles(e.target.files)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  max={3}
                />
                <div className="flex flex-col items-center gap-3">
                  <div className="h-12 w-12 bg-slate-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-slate-300">
                      {files && files.length > 0 
                        ? `${files.length} foto(s) selecionada(s)` 
                        : 'Arraste fotos ou clique aqui'}
                    </p>
                    <p className="text-xs text-slate-500">JPG ou PNG (Máx 5MB)</p>
                  </div>
                </div>
              </div>

              {/* Preview das imagens (opcional, simples lista de nomes) */}
              {files && Array.from(files).length > 0 && (
                <div className="bg-slate-900 rounded-lg p-3 space-y-2">
                  {Array.from(files).map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                      <ImageIcon className="h-3 w-3" />
                      <span className="truncate">{f.name}</span>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || credits <= 0}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Analisando Imóvel...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-5 w-5" />
                    Gerar Descrição
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Coluna da Direita: Resultado */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col h-[600px]">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
              <h2 className="font-bold text-slate-200">Resultado da IA</h2>
              {result && (
                <button 
                  onClick={() => navigator.clipboard.writeText(result)}
                  className="text-xs flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded text-slate-300 transition-colors"
                >
                  <Copy className="h-3 w-3" /> Copiar
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4 animate-pulse">
                  <div className="h-2 w-3/4 bg-slate-800 rounded"></div>
                  <div className="h-2 w-1/2 bg-slate-800 rounded"></div>
                  <div className="h-2 w-5/6 bg-slate-800 rounded"></div>
                </div>
              ) : result ? (
                <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap text-slate-300">
                  {result}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-600 text-sm text-center">
                  O resultado aparecerá aqui após a análise.
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}