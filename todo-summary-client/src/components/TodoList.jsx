
import React, { useState } from "react";

function TodoList({ todos, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editDone, setEditDone] = useState(false);

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
    setEditDone(todo.done);
  };

  const handleUpdate = () => {
    onUpdate(editingId, { text: editText, done: editDone });
    setEditingId(null);
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {editingId === todo.id ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <label style={{ marginLeft: "8px" }}>
                <input
                  type="checkbox"
                  checked={editDone}
                  onChange={(e) => setEditDone(e.target.checked)}
                />{" "}
                Done
              </label>
              <button onClick={handleUpdate}>💾 Save</button>
              <button onClick={() => setEditingId(null)}>❌ Cancel</button>
            </>
          ) : (
            <>
              <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
                {todo.text}
              </span>
              <button onClick={() => startEditing(todo)}>✏️ Edit</button>
              <button onClick={() => onDelete(todo.id)}>🗑 Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
