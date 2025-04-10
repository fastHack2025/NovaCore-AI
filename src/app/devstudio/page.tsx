// 📄 src/app/devstudio/page.tsx
'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Loader } from '@/components/Loader'

export default function DevStudio() {
  const { user } = useUser()
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const generateCode = async () => {
    if (!prompt) return
    setLoading(true)

    const res = await fetch('/api/gpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    })

    const data = await res.json()
    setCode(data.code)
    setLoading(false)
  }

  const saveProject = async () => {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user?.id,
        title,
        description,
        code,
      }),
    })

    if (res.ok) alert('✅ Projet enregistré avec succès !')
    else alert('❌ Erreur d’enregistrement')
  }

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold">🧠 NovaCore – Dev Studio</h1>

      <input
        type="text"
        placeholder="Nom du projet"
        className="w-full border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Décris le projet à générer avec l'IA..."
        className="w-full border p-2 h-32 rounded"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <textarea
        placeholder="Brève description"
        className="w-full border p-2 h-20 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={generateCode}
        disabled={loading}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Chargement...' : '🛠️ Générer le code'}
      </button>

      {loading && <Loader />}

      {code && (
        <>
          <h2 className="text-xl font-semibold mt-4">🧾 Code généré</h2>
          <pre className="bg-gray-900 text-white p-4 rounded overflow-auto whitespace-pre-wrap">
            {code}
          </pre>
          <button
            onClick={saveProject}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            💾 Sauvegarder ce projet
          </button>
        </>
      )}
    </div>
  )
}
