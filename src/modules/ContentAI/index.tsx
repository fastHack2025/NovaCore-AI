// 📄 src/modules/ContentAI/index.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ContentAI() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')

  const generate = async () => {
    const res = await fetch('/api/gpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    })
    const data = await res.json()
    setResponse(data.result)
  }

  return (
    <section className="max-w-4xl mx-auto py-20 px-4">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center text-purple-600 mb-6"
      >
        ✍️ Content AI
      </motion.h2>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe the type of content you want to generate..."
        className="w-full p-4 border rounded-lg mb-4 shadow-sm resize-none"
        rows={5}
      />

      <div className="flex justify-center">
        <button
          onClick={generate}
          className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
        >
          Generate with AI
        </button>
      </div>

      {response && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 p-4 bg-gray-100 rounded-lg shadow-inner"
        >
          <h3 className="font-bold text-gray-700 mb-2">Generated Content</h3>
          <p className="whitespace-pre-line text-gray-800">{response}</p>
        </motion.div>
      )}
    </section>
  )
}
