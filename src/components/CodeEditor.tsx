// 📄 src/components/CodeEditor.tsx
'use client'

import { Sandpack } from '@codesandbox/sandpack-react'

export default function CodeEditor({
  files,
  template = 'react',
}: {
  files: Record<string, { code: string }>
  template?: 'react' | 'vite-react'
}) {
  return (
    <div className="mt-12 border border-gray-200 rounded-lg overflow-hidden shadow-xl">
      <Sandpack
        template={template}
        files={files}
        theme="light"
        options={{
          showLineNumbers: true,
          showTabs: true,
          editorHeight: 500,
          editorWidthPercentage: 60,
          wrapContent: true,
          showConsole: true,
          autorun: true,
        }}
      />
    </div>
  )
}
