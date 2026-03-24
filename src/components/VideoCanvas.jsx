import React from 'react'

export default function VideoCanvas({ src }) {
  if (!src) return <div className="bg-gray-100 h-64 rounded flex items-center justify-center">No video loaded</div>
  return <video className="w-full rounded" controls src={src} />
}