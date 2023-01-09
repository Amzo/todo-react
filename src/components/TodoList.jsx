import React, { useState, useEffect } from 'react';
import { Collapse } from 'react-collapse';
import {v4} from 'uuid';
import TodoItem from "./TodoItem";

function TodoList() {
    const LOCAL_STORAGE_KEY = "todoApp.todos";

    const [todos, setTodos] = useState([
    ]);

    const [newTodoText, setNewTodoText] = useState("");
    const [showComplete, setShowComplete] = useState(false);

    const addNewTodo = () => {
        if (newTodoText === "" ) return;
        setTodos((prevTodos) => {
            return [...prevTodos, { id: v4(), title: newTodoText, checked: false}];
        });

        setNewTodoText("");
    }

    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((t) => t.id === id);
        todo.checked = !todo.checked;
        setTodos(newTodos);

    }

    const deleteTodo = (id) => {
        const newTodos = todos.filter((t) => t.id !== id);
        setTodos(newTodos);
    }

    const deleteComplete = () => {
        const newTodos = todos.filter((t) => !t.checked);
        setTodos(newTodos);
        setShowComplete(false);
    }

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedTodos) setTodos(storedTodos);
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    return (  <>  
    <div className="card">
        <div className="card-head bg-dark text-light p-3">
          <h1>Todo</h1>
        </div>
        <div className="card-body">
          {todos
            .filter((t) => !t.checked)
            .map((t) => {
              return (
                <TodoItem
                  key={v4()}
                  todo={t}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                />
              );
            })}
          <label className="list-group-item d-flex gap-3">
            <input
              type="text"
              placeholder="Add a new todo item"
              className="form-control"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              onClick={() => addNewTodo()}
            >
              Add
            </button>
          </label>

          <button
            className="btn btn-outline-secondary my-4"
            onClick={() => setShowComplete(!showComplete)}
          >
            {showComplete ? "Hide" : "Show"} Complete
          </button>

          <Collapse isOpened={showComplete}>
            <button
              className="btn btn-danger mb-4"
              onClick={() => deleteComplete()}
            >
              Clear Completed Todo Items
            </button>
            {todos
              .filter((t) => t.checked)
              .map((t) => {
                return (
                  <TodoItem
                    key={v4()}
                    todo={t}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                  />
                );
              })}
          </Collapse>
        </div>
      </div>
    </>);
}

export default TodoList;