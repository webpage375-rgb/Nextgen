import React from 'react'

export default function Toolbar({ children }) {
  return (
    <div className="flex gap-3 bg-white p-3 rounded shadow">{children}</div>
  )
}