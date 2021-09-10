import React, { useState} from "react";
//The hook of useState is what React uses to hook into the state or lifecycle of the component. 
import "./App.css";
import { Badge, FormGroup, Label, Input, } from 'reactstrap';

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      className="todo-task"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}
      <div>
        <button className="button" onClick={() => completeTodo(index)}>Complete</button>
        <button className="button" onClick={() => removeTodo(index)}>Delete</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Task to be completed"
        onChange={e => setValue(e.target.value)}
      />
      {/* <FormGroup check> */}
        <Label check>
          <Input type="checkbox" />{' '}
          Priority?
        </Label>
      {/* </FormGroup> */}
      <button className="button">Submit</button>
        

    </form>
  );
}

function App() {
  const [todos, setTodos] = useState([
    //The first parameter, todos, is what you are going to name your state.
    //The second parameter, setTodos, is what you are going to use to set the state.
    //insert an array of objects {property:value}
    {
      text: "Submit a to-do task",
      isCompleted: false
    },
    {
      text: "Update to-do task",
      isCompleted: false
    },
    {
      text: "Or delete to-do task",
      isCompleted: false
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <h1>Game Plan</h1>
      <div className="todo-list">
        <h3>To-Do List</h3>

        <div className="todo-priority">
          <Badge color="primary">Priority</Badge>
        </div>

        <div>
        <Badge color="primary">Non-Priority</Badge>
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        </div>
        <TodoForm 
        addTodo={addTodo} 
        />
      </div>
    </div>
  );
}

export default App;