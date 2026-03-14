import type { ReactNode } from 'react'

export interface Todo {
  id: number
  text: string
  completed: boolean
  notes: string
}

interface TodoItemProps {
  todo: Todo
  highlighted: boolean
  children: ReactNode  // rendered text (with highlights)
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onOpen: (id: number) => void
}

export default function TodoItem({
  todo,
  highlighted,
  children,
  onToggle,
  onDelete,
  onOpen,
}: TodoItemProps) {
  return (
    <li className={`${todo.completed ? 'completed' : ''} ${highlighted ? 'highlighted' : ''}`}>
      <div className="todo-row">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className="todo-link" onClick={() => onOpen(todo.id)}>
          {children}
          {todo.notes && <span className="has-notes-dot" title="Has notes" />}
        </span>
        <button className="delete-btn" onClick={() => onDelete(todo.id)}>
          ✕
        </button>
      </div>
    </li>
  )
}
