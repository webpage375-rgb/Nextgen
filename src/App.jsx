import React from 'react'
import Home from './pages/Home'
import Editor from './pages/Editor'

export default function App() {
  const route = window.location.hash.replace('#', '') || 'home'
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto py-4 px-6 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Nextgen</h1>
          <nav>
            <a href="#home" className="mr-4">Home</a>
            <a href="#editor" className="font-medium">Editor</a>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-6">
        {route === 'editor' ? <Editor /> : <Home />}
      </main>
    </div>
  )
}