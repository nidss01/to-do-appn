// TodoFormScreen.js

import React, { useState, useEffect } from 'react';

const TodoFormScreen = ({ todo, onAddTodo, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTodo = {
      id: todo ? todo.id : Date.now(),
      title,
      description,
    };

    if (todo) {
      // Update existing todo
      onAddTodo(updatedTodo);
    } else {
      // Add new todo
      onAddTodo(updatedTodo);
    }

    onClose();
  };

  return (
    <div className="container mt-3">
      <h3>{todo ? 'Edit Todo' : 'Add Todo'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add new..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          {todo ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default TodoFormScreen;
