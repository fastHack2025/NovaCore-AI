// 📄 src/components/Navbar.tsx
'use client'

export default function Navbar() {
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-2xl font-bold text-purple-600">NovaCore</div>
        <nav className="space-x-6 text-sm md:text-base text-gray-700">
          <a href="#" className="hover:text-purple-600">Dashboard</a>
          <a href="#" className="hover:text-purple-600">Content AI</a>
          <a href="#" className="hover:text-purple-600">Dev Studio</a>
          <a href="#" className="hover:text-purple-600">CRM</a>
        </nav>
      </div>
    </header>
  )
}
