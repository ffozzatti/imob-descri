import { createClient } from '../../utils/supabase/clientToServer'
import { redirect } from 'next/navigation'
import DashboardClient from './client'

export default async function DashboardPage() {
  const supabase = await createClient()

  // 1. Verifica se tem usuário logado
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  // 2. Busca os créditos do perfil
  const { data: profile } = await supabase
    .from('profiles')
    .select('credits')
    .eq('id', user.id)
    .single()

  // 3. Renderiza o cliente passando os dados iniciais
  return (
    <DashboardClient 
      user={user} 
      initialCredits={profile?.credits ?? 0} 
    />
  )
}