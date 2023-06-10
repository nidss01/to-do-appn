// sagas.js

import { put, takeEvery ,all} from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  loginSuccess,
  loginFailure,
  FETCH_TODOS_REQUEST,
  fetchTodosSuccess,
  fetchTodosFailure,
} from './actions';

// Simulated login API call
function* loginUser(action) {
  const { username, password } = action.payload;
  try {
    // Simulate API call delay
    yield new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock user data for demonstration
    const users = [
      { id: 1, username: 'user1', password: 'pass1', name: 'User 1' },
      { id: 2, username: 'user2', password: 'pass2', name: 'User 2' },
      { id: 3, username: 'user3', password: 'pass3', name: 'User 3' },
    ];

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      yield put(loginSuccess(user));
    } else {
      yield put(loginFailure('Invalid username or password'));
    }
  } catch (error) {
    yield put(loginFailure('An error occurred while logging in'));
  }
}

// Simulated fetch todos API call
function* fetchTodos(action) {
  const { userId } = action.payload;
  try {
    // Simulate API call delay
    yield new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock todos data for demonstration
    const todos = [
      { id: 1, title: 'Todo 1', description: 'Description 1', userId: 1 },
      { id: 2, title: 'Todo 2', description: 'Description 2', userId: 1 },
      { id: 3, title: 'Todo 3', description: 'Description 3', userId: 2 },
      { id: 4, title: 'Todo 4', description: 'Description 4', userId: 2 },
      { id: 5, title: 'Todo 5', description: 'Description 5', userId: 3 },
    ];

    const userTodos = todos.filter((todo) => todo.userId === userId);

    yield put(fetchTodosSuccess(userTodos));
  } catch (error) {
    yield put(fetchTodosFailure('An error occurred while fetching todos'));
  }
}

// Watcher sagas
function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}

function* watchFetchTodos() {
  yield takeEvery(FETCH_TODOS_REQUEST, fetchTodos);
}

// Root saga
export default function* rootSaga() {
  yield all([watchLoginUser(), watchFetchTodos()]);
}
