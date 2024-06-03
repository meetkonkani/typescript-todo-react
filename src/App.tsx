import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputFiled';
import TodoList from './components/singletodo';
import { Todo } from './model';
import Todolist from './components/Todolist';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  console.log(todo);

  return (
    <div className="App">
      <span className="heading">TO-DO</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <Todolist todos={todos} setTodos={setTodos} />
      <ul>
        {todos.map((t) => (
          <li key={t.id}>{t.todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
