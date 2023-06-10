import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import rootSaga from './sagas';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the Redux store with middleware
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, sagaMiddleware)
);

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;