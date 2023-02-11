import {
  applyMiddleware,
  createStore
} from 'redux';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import AddEditBook from './containers/AddEditBook';

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);

export default () => (
  <Provider store={store}>
    <AddEditBook />
  </Provider>
);