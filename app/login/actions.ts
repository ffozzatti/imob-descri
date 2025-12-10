'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/clientToServer'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // Pega os dados do formulário
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Tenta logar
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: 'Email ou senha incorretos' }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard') // Manda para o painel se der certo
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Tenta criar conta
  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return { error: 'Erro ao criar conta. Tente outra senha.' }
  }

  // Se o Supabase exigir confirmação de email, avisar o usuário
  // Por padrão no localhost ele loga direto
  revalidatePath('/', 'layout')
  redirect('/dashboard')
}