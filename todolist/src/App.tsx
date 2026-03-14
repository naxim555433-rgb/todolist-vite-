import { useState } from 'react'
import Carousel from './Carousel'

interface Todo {
  id: number
  text: string
  completed: boolean
  notes: string
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [modalTodoId, setModalTodoId] = useState<number | null>(null)

  const addTodo = () => {
    const trimmed = inputValue.trim().slice(0, MAX_TASK_LENGTH)
    if (trimmed) {
      setTodos([
        ...todos,
        { id: Date.now(), text: trimmed, completed: false, notes: '' }
      ])
      setInputValue('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const deleteAll = () => {
    setTodos([])
    setModalTodoId(null)
  }

  const updateNote = (id: number, notes: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, notes } : todo
    ))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  const MAX_TASK_LENGTH = 200
  const MAX_NOTE_LENGTH = 2000

  const highlightText = (text: string, search: string) => {
    if (!search.trim()) return text

    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(${escaped})`, 'gi')
    const parts = text.split(regex)

    // odd indices are captured groups (matches) when using split with capturing regex
    return parts.map((part, index) =>
      index % 2 === 1 ? <mark key={index}>{part}</mark> : part
    )
  }

  const isMatch = (text: string) => {
    if (!searchValue.trim()) return false
    return text.toLowerCase().includes(searchValue.toLowerCase())
  }

  const modalTodo = todos.find(t => t.id === modalTodoId) ?? null

  return (
    <>
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src="/background/bg.mp4" type="video/mp4" />
      </video>
      <div className="container">
      <Carousel />
      <h1>To-Do List</h1>

      <div className="input-section">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="New task title"
          maxLength={MAX_TASK_LENGTH}
          autoComplete="off"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="search-section">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search task"
          maxLength={100}
          autoComplete="off"
        />
        <span className="search-icon">🔍</span>
      </div>

      {todos.length > 0 && (
        <div className="counter-row">
          <p className="counter">Done {todos.filter(t => t.completed).length} from {todos.length}</p>
          <button className="delete-all-btn" onClick={deleteAll}>Delete all</button>
        </div>
      )}

      <ul className="todo-list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`${todo.completed ? 'completed' : ''} ${isMatch(todo.text) ? 'highlighted' : ''}`}
          >
            <div className="todo-row">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span
                className="todo-link"
                onClick={() => setModalTodoId(todo.id)}
              >
                {highlightText(todo.text, searchValue)}
                {todo.notes && <span className="has-notes-dot" title="Has notes" />}
              </span>
              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="empty-message">There are no tasks</p>
      )}

      {modalTodo && (
        <div className="modal-overlay" onClick={() => setModalTodoId(null)}>
          <div className="notebook" onClick={(e) => e.stopPropagation()}>
            <div className="notebook-header">
              <div className="notebook-title">{modalTodo.text}</div>
              <button className="notebook-close" onClick={() => setModalTodoId(null)}>✕</button>
            </div>
            <div className="notebook-body">
              <textarea
                className="notebook-textarea"
                value={modalTodo.notes}
                onChange={(e) => updateNote(modalTodo.id, e.target.value.slice(0, MAX_NOTE_LENGTH))}
                placeholder="Write your notes here..."
                maxLength={MAX_NOTE_LENGTH}
                autoFocus
              />
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  )
}

export default App
