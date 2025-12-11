import { createClient } from '../../../utils/supabase/clientToServer'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(request: Request) {
  try {
    console.log("🚀 [API] Iniciando geração...")
    
    // 1. Validação da Chave OpenAI
    if (!process.env.OPENAI_API_KEY) {
      console.error("❌ [API] ERRO: Chave OPENAI_API_KEY não encontrada.")
      // Retorna JSON legível em vez de quebrar
      return NextResponse.json({ error: 'Servidor sem chave da OpenAI configurada.' }, { status: 500 })
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const supabase = await createClient()

    // 2. Validação do Usuário
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Sessão expirada. Faça login novamente.' }, { status: 401 })
    }

    // 3. Validação dos Créditos
    const { data: profile } = await supabase
      .from('profiles')
      .select('credits')
      .eq('id', user.id)
      .single()

    if (!profile || profile.credits <= 0) {
      return NextResponse.json({ error: 'Você não tem créditos suficientes.' }, { status: 403 })
    }

    // 4. Validação das Imagens
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'Nenhuma imagem recebida pelo servidor.' }, { status: 400 })
    }

    console.log(`📸 [API] Processando ${files.length} imagens...`)

    // 5. Conversão para Base64
    const imageContents = await Promise.all(
      files.map(async (file) => {
        const buffer = await file.arrayBuffer()
        const base64 = Buffer.from(buffer).toString('base64')
        return {
          type: "image_url",
          image_url: {
            url: `data:${file.type};base64,${base64}`,
            detail: "low"
          }
        }
      })
    )

    // 6. Chamada para a OpenAI
    console.log("🤖 [API] Enviando para o GPT-4o...")
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Você é um Copywriter Imobiliário Brasileiro Senior. 
          Crie uma descrição de venda atraente baseada nas fotos.
          Use Markdown. Seja persuasivo e use emojis.`
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Descreva este imóvel para venda." },
            ...imageContents as any
          ]
        }
      ],
      max_tokens: 600,
    })

    const generatedText = completion.choices[0].message.content
    console.log("✅ [API] Gerado com sucesso!")

    // 7. Descontar Crédito
    await supabase.from('profiles').update({ credits: profile.credits - 1 }).eq('id', user.id)

    return NextResponse.json({ text: generatedText })

  } catch (error: any) {
    console.error('🔥 [API] ERRO CRÍTICO:', error) 
    
    // Tratamento específico para erros conhecidos
    if (error?.status === 401) return NextResponse.json({ error: 'Chave OpenAI inválida.' }, { status: 500 })
    if (error?.code === 'insufficient_quota') return NextResponse.json({ error: 'Sem saldo na OpenAI.' }, { status: 500 })

    // Retorna o erro real em JSON para o frontend não quebrar com "<"
    return NextResponse.json({ error: `Erro interno: ${error.message}` }, { status: 500 })
  }
}