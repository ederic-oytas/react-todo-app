import React, { useState, useEffect } from 'react';
import './App.css';
// Importing components
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {

  // State stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [isDoneLoading, setIsDoneLoading] = useState(false);

  // Functions
  const filterHandler = () => {
    // update filtered todos
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };
  const saveLocalTodos = () => {
    if (isDoneLoading) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  };
  const loadLocalTodos = () => {
    if (localStorage.getItem("todos") !== null) {
      let localTodos = JSON.parse(localStorage.getItem("todos"));
      setTodos(localTodos);
    }
  };

  // Run once when the app starts
  useEffect(() => {
    loadLocalTodos();
    setIsDoneLoading(true);
  }, []);

  // Use effect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, setFilteredTodos, status]);

  return (
    <div className="App">
      <header>
        <h1>Ederic's Todo List</h1>
      </header>
      <Form
        inputText={inputText}
        setInputText={setInputText}
        todos={todos}
        setTodos={setTodos}
        setStatus={setStatus}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
