import { useState } from 'react';

// import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  // const [filteredTodos, setFilteredTodos] = useState();
  const [newTodo, setNewTodo] = useState('');
  // const [filteredTodoStatus, setFilteredTodoStatus] = useState();
  const [filter, setFilter] = useState('All');

  const handleAddTodo = () => {
    if (!newTodo) return;
    setTodos([...todos, {id: new Date().getTime(), task: newTodo, completed: false}]);
    setNewTodo('');
  }

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  }

  const handleCheckbox = (id) => {
    setTodos(todos.map((item) => { 
      if(item.id === id) return {id: item.id, task: item.task, completed: !item.completed};
      return item;
    }))
  }

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {
        filter !== 'All' ? todos.filter(item => item.completed === filter).map(todo =>
          <li key={todo.id}>
            <input type='checkBox' checked={todo.completed} onChange={() => { handleCheckbox(todo.id) }}
            /> MAP {todo.task}  <button onClick={() => { handleDeleteTodo(todo.id) }}>x</button>
          </li>) :
        todos.map(todo =>
          <li key={todo.id}>
            <input type='checkBox' checked={todo.completed} onChange={() => { handleCheckbox(todo.id) }}
            />  {todo.task}  <button onClick={() => { handleDeleteTodo(todo.id) }}>x</button>
          </li>
        )}
      </ul>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <p>{todos.filter(item => item.completed === false).length} items left</p>
      <button onClick={() => {setFilter('All')}}>All</button>
      <button onClick={() => {setFilter(false)}}>Active</button>
      <button onClick={() => {setFilter(true)}}>Completed</button>
    </div>
  );
}

export default App;
