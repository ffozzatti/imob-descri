'use client' // Adicionamos isso para poder usar estado (erro/loading)

import Link from 'next/link'
import { useState } from 'react'
import { login, signup } from './actions'
import { Zap, ArrowLeft, Loader2, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Função genérica para lidar com o envio (Login ou Cadastro)
  async function handleAuth(formData: FormData, action: typeof login) {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      // Chama a Server Action
      const result = await action(formData)
      
      // Se retornou erro, mostra na tela
      if (result?.error) {
        setErrorMessage(result.error)
        setIsLoading(false)
      }
      // Se deu certo, o redirect acontece no servidor, não precisa fazer nada
    } catch (error) {
      setErrorMessage('Ocorreu um erro inesperado. Tente novamente.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      
      {/* Botão de voltar */}
      <Link 
        href="/" 
        className="absolute top-8 left-8 text-slate-400 hover:text-white flex items-center gap-2 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Link>

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4">
             <Zap className="h-6 w-6 text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold text-white">Acesse sua conta</h1>
          <p className="text-slate-400 text-sm mt-2">
            Entre para começar a gerar descrições
          </p>
        </div>

        {/* Exibe erro se houver */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-200 text-sm">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {errorMessage}
          </div>
        )}

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="password">
              Senha
            </label>
            <input
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="pt-4 space-y-3">
            {/* Botão Entrar */}
            <button
              formAction={(formData) => handleAuth(formData, login)}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Entrar'}
            </button>
            
            {/* Botão Criar Conta */}
            <button
              formAction={(formData) => handleAuth(formData, signup)}
              disabled={isLoading}
              className="w-full bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 font-medium py-3 rounded-lg transition-all border border-slate-700 flex items-center justify-center"
            >
              Criar conta nova
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}