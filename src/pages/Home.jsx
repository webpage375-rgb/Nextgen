import React from 'react'

export default function Home() {
  return (
    <div className="space-y-6">
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold">Nextgen — AI Video Editor</h2>
        <p className="mt-4 text-gray-600">Fast, browser-based video editing. Trim, join, add text overlays and basic filters — powered by ffmpeg.wasm.</p>
        <div className="mt-6">
          <a href="#editor" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md">Open Editor</a>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow">Trim & Cut</div>
        <div className="p-6 bg-white rounded-lg shadow">Text Overlays</div>
        <div className="p-6 bg-white rounded-lg shadow">Fast Export</div>
      </section>

      <section className="py-12 text-sm text-gray-500">
        <p>This is an MVP scaffold. International-ready UI, responsive design, and ready to extend with premium features later.</p>
      </section>
    </div>
  )
}