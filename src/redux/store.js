import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import rootSaga from './sagas';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create the Redux store with middleware
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware, sagaMiddleware))
);

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;