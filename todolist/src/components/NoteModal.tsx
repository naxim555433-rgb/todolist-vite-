import type { Todo } from './TodoItem'

interface NoteModalProps {
  todo: Todo
  maxLength?: number
  onClose: () => void
  onUpdate: (id: number, notes: string) => void
}

export default function NoteModal({ todo, maxLength = 2000, onClose, onUpdate }: NoteModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="notebook" onClick={(e) => e.stopPropagation()}>
        <div className="notebook-header">
          <div className="notebook-title">{todo.text}</div>
          <button className="notebook-close" onClick={onClose}>✕</button>
        </div>
        <div className="notebook-body">
          <textarea
            className="notebook-textarea"
            value={todo.notes}
            onChange={(e) => onUpdate(todo.id, e.target.value.slice(0, maxLength))}
            placeholder="Write your notes here..."
            maxLength={maxLength}
            autoFocus
          />
        </div>
      </div>
    </div>
  )
}
