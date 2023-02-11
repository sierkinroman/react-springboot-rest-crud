import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers'
import thunkMiddleware from 'redux-thunk';
import BooksList from "./containers/BooksList";
import { Provider } from "react-redux";

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware),
);

export default () => (
  <Provider store={store}>
    <BooksList />
  </Provider>
);