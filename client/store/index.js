import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }));
const store = createStore(rootReducer, middleware);

export default store;
