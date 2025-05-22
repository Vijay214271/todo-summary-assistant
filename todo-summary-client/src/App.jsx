// src/App.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import SummaryButton from "./components/SummaryButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "http://localhost:5000";

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await axios.get(`${BASE_URL}/todos`);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (text) => {
    await axios.post(`${BASE_URL}/todos`, { text });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${BASE_URL}/todos/${id}`);
    fetchTodos();
  };

  // src/App.jsx
const updateTodo = async (id, updatedFields) => {
  try {
    await axios.patch(`${BASE_URL}/todos/${id}`, updatedFields);
    fetchTodos();
  } catch (err) {
    toast.error("Failed to update todo");
  }
};


  const summarize = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/summarize`);
      toast.success(res.data.message);
    } catch (err) {
      toast.error("Failed to send summary to Slack");
    }
  };

  return (
    <div className="container">
      <h1>📝 Todo Summary Assistant</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} onDelete={deleteTodo} onUpdate={updateTodo} />      <SummaryButton onSummarize={summarize} />
      <ToastContainer />
    </div>
  );
}

export default App;
