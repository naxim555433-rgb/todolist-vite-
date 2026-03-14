import { useState } from 'react'
import Carousel from './components/Carousel'
import VideoBackground from './components/VideoBackground'
import TodoItem from './components/TodoItem'
import NoteModal from './components/NoteModal'
import type { Todo } from './components/TodoItem'

const MAX_TASK_LENGTH = 200
const MAX_NOTE_LENGTH = 2000

const CAROUSEL_IMAGES = [
  { url: '/carousel/photo1.jpg' },
  { url: '/carousel/photo2.jpg' },
  { url: '/carousel/photo3.jpg' },
]

function highlightText(text: string, search: string) {
  if (!search.trim()) return text

  const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  const parts = text.split(regex)

  return parts.map((part, index) =>
    index % 2 === 1 ? <mark key={index}>{part}</mark> : part
  )
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [modalTodoId, setModalTodoId] = useState<number | null>(null)

  const addTodo = () => {
    const trimmed = inputValue.trim().slice(0, MAX_TASK_LENGTH)
    if (trimmed) {
      setTodos([...todos, { id: Date.now(), text: trimmed, completed: false, notes: '' }])
      setInputValue('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const deleteAll = () => {
    setTodos([])
    setModalTodoId(null)
  }

  const updateNote = (id: number, notes: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, notes } : todo))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') addTodo()
  }

  const modalTodo = todos.find(t => t.id === modalTodoId) ?? null

  return (
    <>
      <VideoBackground src="/background/bg.mp4" opacity={0.75} />
      <div className="container">
        <Carousel images={CAROUSEL_IMAGES} interval={1500} height={280} />
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
          <button className={inputValue.trim() ? 'add-btn active' : 'add-btn'} onClick={addTodo}>Add</button>
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
          <span className="search-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="7" stroke="#111" strokeWidth="2.5"/>
              <circle cx="10" cy="10" r="3.5" stroke="#111" strokeWidth="1.5"/>
              <line x1="15.5" y1="15.5" x2="21" y2="21" stroke="#111" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </span>
        </div>

        {todos.length > 0 && (
          <div className="counter-row">
            <p className="counter">Done {todos.filter(t => t.completed).length} from {todos.length}</p>
            <button className="delete-all-btn" onClick={deleteAll}>Delete all</button>
          </div>
        )}

        <ul className="todo-list">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              highlighted={!!searchValue.trim() && todo.text.toLowerCase().includes(searchValue.toLowerCase())}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onOpen={setModalTodoId}
            >
              {highlightText(todo.text, searchValue)}
            </TodoItem>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="empty-message">There are no tasks</p>
        )}

        {modalTodo && (
          <NoteModal
            todo={modalTodo}
            maxLength={MAX_NOTE_LENGTH}
            onClose={() => setModalTodoId(null)}
            onUpdate={updateNote}
          />
        )}
      </div>
    </>
  )
}

export default App
