// 📄 src/app/api/gpt/route.ts
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  const body = await req.json()
  const { prompt } = body

  if (!prompt) {
    return NextResponse.json({ error: 'Prompt requis' }, { status: 400 })
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    })

    const code = completion.choices[0]?.message?.content || ''

    return NextResponse.json({ code })
  } catch (error: any) {
    console.error('[GPT ERROR]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
