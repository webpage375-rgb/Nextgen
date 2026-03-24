import React, { useState, useEffect } from 'react'

const STORAGE_KEY = 'nextgen_todos_v1'

export default function Todo() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setTodos(JSON.parse(raw))
    } catch (e) {
      console.error('Failed to load todos from localStorage', e)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    } catch (e) {
      console.error('Failed to save todos to localStorage', e)
    }
  }, [todos])

  function addTodo(e) {
    e.preventDefault()
    if (!text.trim()) return
    setTodos(prev => [{ id: Date.now(), text: text.trim(), done: false }, ...prev])
    setText('')
  }

  function toggleTodo(id) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  function deleteTodo(id) {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  function startEdit(todo) {
    setEditingId(todo.id)
    setEditingText(todo.text)
  }

  function saveEdit(e) {
    e.preventDefault()
    if (!editingText.trim()) return
    setTodos(prev => prev.map(t => t.id === editingId ? { ...t, text: editingText.trim() } : t))
    setEditingId(null)
    setEditingText('')
  }

  function clearCompleted() {
    setTodos(prev => prev.filter(t => !t.done))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">To‑Do List</h2>

      <div className="p-4 bg-white rounded shadow">
        <form onSubmit={addTodo} className="flex gap-2">
          <input className="flex-1 border rounded px-3 py-2" placeholder="Add a new task..." value={text} onChange={e => setText(e.target.value)} />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
        </form>

        <div className="mt-4">
          {todos.length === 0 ? (
            <p className="text-gray-500">No tasks yet — add one above.</p>
          ) : (
            <ul className="space-y-2">
              {todos.map(todo => (
                <li key={todo.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />
                    {editingId === todo.id ? (
                      <form onSubmit={saveEdit} className="flex gap-2">
                        <input className="border px-2 py-1 rounded" value={editingText} onChange={e => setEditingText(e.target.value)} />
                        <button className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
                        <button type="button" onClick={() => setEditingId(null)} className="px-3">Cancel</button>
                      </form>
                    ) : (
                      <span className={todo.done ? 'line-through text-gray-500' : ''}>{todo.text}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => startEdit(todo)} className="text-sm text-blue-600">Edit</button>
                    <button onClick={() => deleteTodo(todo.id)} className="text-sm text-red-600">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {todos.length > 0 && (
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">{todos.filter(t=>!t.done).length} pending</div>
            <div>
              <button onClick={clearCompleted} className="text-sm text-red-600">Clear completed</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}