// 📄 src/modules/DevStudio/index.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function DevStudio() {
  const [prompt, setPrompt] = useState('')
  const [code, setCode] = useState('')

  const generate = async () => {
    const res = await fetch('/api/gpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `Generate a clean React/Next component: ${prompt}` }),
    })

    const data = await res.json()
    setCode(data.result)
  }

  return (
    <section className="max-w-5xl mx-auto py-20 px-4">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center text-purple-600 mb-6"
      >
        🛠️ Dev Studio
      </motion.h2>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe the UI component or logic you need..."
        className="w-full p-4 border rounded-lg mb-4 shadow-sm resize-none"
        rows={5}
      />

      <div className="flex justify-center">
        <button
          onClick={generate}
          className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
        >
          Generate Code
        </button>
      </div>

      {code && (
        <motion.pre
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 p-6 bg-black text-green-300 rounded-xl overflow-auto text-sm max-h-[500px]"
        >
{code}
        </motion.pre>
      )}
    </section>
  )
}
