'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import CodeEditor from '@/components/CodeEditor'

export default function IDE() {
  const [prompt, setPrompt] = useState('')
  const [files, setFiles] = useState<Record<string, { code: string }>>({})
  const [loading, setLoading] = useState(false)

  const generateProject = async () => {
    setLoading(true)

    const res = await fetch('/api/gpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: `Generate a React project structure with all files and code. Format response as JSON:
{
  "App.js": { "code": "// your code here" },
  "components/Header.js": { "code": "// component code here" }
}`,
      }),
    })

    const data = await res.json()
    try {
      const parsed = JSON.parse(data.result)
      setFiles(parsed)
    } catch (err) {
      console.error('[PARSING ERROR]', err)
      setFiles({
        'error.txt': { code: '⚠️ Could not parse GPT response.\n\n' + data.result },
      })
    }

    setLoading(false)
  }

  return (
    <section className="max-w-6xl mx-auto py-20 px-4">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-purple-600 mb-6 text-center"
      >
        🧠 NovaCore DevStudio – AI IDE
      </motion.h2>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your project (e.g. Admin dashboard with auth, analytics, and table CRUD)"
        className="w-full p-4 border rounded-lg shadow mb-4 resize-none"
        rows={4}
      />

      <div className="flex justify-center">
        <button
          onClick={generateProject}
          disabled={loading}
          className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Project'}
        </button>
      </div>

      {Object.keys(files).length > 0 && <CodeEditor files={files} />}
    </section>
  )
}
