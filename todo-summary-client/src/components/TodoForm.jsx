import React, { useState } from "react";
function todoForm({ onAdd }) {
    const [text, setText ] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!text.trim()) return;
        onAdd(text);
        setText(""); 
    }

    return (
        <form onSubmit={handleSubmit}>
      <input
        placeholder="Add a todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
    )
}

export default todoForm;