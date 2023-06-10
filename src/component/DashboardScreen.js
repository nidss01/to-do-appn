// DashboardScreen.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchTodosRequest, logout, addTodo, updateTodo, deleteTodo } from '../redux/actions';
import TodoFormScreen from './TodoFormScreen';

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const todos = useSelector((state) => state.todos);
  const history = useHistory();
  const [showTodoForm, setShowTodoForm] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [todoData, setTodoData] = useState([])

  console.log('todos', todos)

  useEffect(() => {
    const d = todos.filter((singleTodo) => singleTodo.userId === localStorage.getItem('userId'))
    setTodoData(d)
  }, [todos])
  

  useEffect(() => {
    if (user) {
      dispatch(fetchTodosRequest(user.id));
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('userId')
    history.push('/');
  };

  const handleAddTodo = (todo) => {
    if (selectedTodo) {
      dispatch(deleteTodo(selectedTodo.id));
    }
    const todoData = {
      ...todo,
      userId: localStorage.getItem('userId')
    }
    dispatch(addTodo(todoData));
    setSelectedTodo(null);
    setShowTodoForm(false);
  };

  const handleOpenTodoForm = () => {
    setSelectedTodo(null);
    setShowTodoForm(true);
  };

  const handleEditTodo = (todo) => {
    setSelectedTodo(todo);
    setShowTodoForm(true);
  };

  return (
    <section class="vh-100">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col">
            <div class="card" id="list1" >
              <div class="card-body py-4 px-4 px-md-5">
                <div className='row'>
                  <div className='col-lg-11'>
                    <h2>Welcome, {user && user.name}</h2>
                  </div>
                  <div className='col-lg-1'>
                    <button className="btn btn-primary" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </div>


                <p class="h1 text-center mt-3 mb-4 pb-3 text-primary">
                  <i class="fas fa-check-square me-1"></i>
                  <u>My Todo-s</u>
                </p>

                <div class="pb-2">
                  <div class="">
                    <div class="">
                      <button className="btn btn-primary mt-3" onClick={handleOpenTodoForm}>
                        Add New Todo
                      </button>
                      {showTodoForm && <TodoFormScreen todo={selectedTodo} onAddTodo={handleAddTodo} onClose={() => setShowTodoForm(false)} />}
                    </div>

                  </div>
                </div>

                <hr class="my-4" />

                {todoData.map((todo) => (
                  <li className="list-group-item" key={todo.id}>
                    <div className='row'>
                      <div className='col-lg-10'>
                        <p><b>Title : </b>{todo.title}</p>
                        <p><b>Description : </b>{todo.description}</p>
                      </div>
                      <div className='col-lg-2'>
                        <button className="btn btn-primary" onClick={() => handleEditTodo(todo)}>
                          Edit
                        </button>
                      </div>
                    </div>
                    <hr/>
                  </li>
                ))}


              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardScreen;
