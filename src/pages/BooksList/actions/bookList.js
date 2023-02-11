import {
  CLEAR_STATE,
  ERROR_GET_BOOKS,
  SUCCESS_GET_BOOKS,
  REQUEST_GET_BOOKS,
  REQUEST_DELETE_BOOK,
  SUCCESS_DELETE_BOOK,
  ERROR_DELETE_BOOK,
} from '../constants/actionTypes';
import config from 'config';
import {
  fetchDelete,
  getJson
} from 'requests';

const requestBooks = () => ({
  type: REQUEST_GET_BOOKS,
});

const receiveBooks = (books) => ({
  type: SUCCESS_GET_BOOKS,
  payload: books,
});

const errorReceiveBooks = () => ({
  type: ERROR_GET_BOOKS,
});

export const clearState = () => ({
  type: CLEAR_STATE,
});

const getBooks = () => {
  const {
    BASE_URL,
    BOOKS_SERVICE,
  } = config;

  return getJson({
    url: `${BASE_URL}${BOOKS_SERVICE}`,
  });
};

export const fetchBooks = () => (dispatch) => {
  dispatch(requestBooks());
  return getBooks()
    .then(books => dispatch(receiveBooks(books)))
    .catch(() => dispatch(errorReceiveBooks()));
};

const requestDeleteBook = () => ({
  type: REQUEST_DELETE_BOOK,
});

const successDeleteBook = () => ({
  type: SUCCESS_DELETE_BOOK,
});

const errorDeleteBook = () => ({
  type: ERROR_DELETE_BOOK,
});

const deleteBook = (bookId) => {
  const {
    BASE_URL,
    BOOKS_SERVICE,
  } = config;

  return fetchDelete({
    url: `${BASE_URL}${BOOKS_SERVICE}/${bookId}`,
  });
};

export const fetchDeleteBook = ({ bookId }) => (dispatch) => {
  dispatch(requestDeleteBook());
  return deleteBook(bookId)
    .then(() => {
      dispatch(successDeleteBook());
      return dispatch(fetchBooks());
    })
    .catch(() => dispatch(errorDeleteBook()));
};
