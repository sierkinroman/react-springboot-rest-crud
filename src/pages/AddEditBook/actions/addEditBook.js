import config from 'config';
import {
  CLEAR_STATE,
  ERROR_ADD_BOOK,
  ERROR_EDIT_BOOK,
  ERROR_GET_BOOK,
  REQUEST_ADD_BOOK,
  REQUEST_EDIT_BOOK,
  REQUEST_GET_BOOK,
  SUCCESS_ADD_BOOK,
  SUCCESS_EDIT_BOOK,
  SUCCESS_GET_BOOK
} from '../constants/actionTypes';
import {
  getJson,
  postJson,
  putJson
} from 'requests';

const requestGetBook = () => ({
  type: REQUEST_GET_BOOK,
});

const successGetBook = (book) => ({
  type: SUCCESS_GET_BOOK,
  payload: book,
});

const errorGetBook = () => ({
  type: ERROR_GET_BOOK,
});

export const clearState = () => ({
  type: CLEAR_STATE,
});

const getBook = ({ bookId }) => {
  const {
    BASE_URL,
    BOOKS_SERVICE,
  } = config;

  return getJson({
    url: `${BASE_URL}${BOOKS_SERVICE}/${bookId}`,
  })
};

export const fetchGetBook = ({ bookId }) => (dispatch) => {
  dispatch(requestGetBook());
  return getBook({ bookId })
    .then((book) => dispatch(successGetBook(book)))
    .catch(() => dispatch(errorGetBook()));
};


const requestAddBook = () => ({
  type: REQUEST_ADD_BOOK,
});

const successAddBook = () => ({
  type: SUCCESS_ADD_BOOK,
});

const errorAddBook = () => ({
  type: ERROR_ADD_BOOK,
});

const addBook = ({
 title,
 isbn,
 publishedDate,
 authorId = 1,
}) => {
  const {
    BASE_URL,
    BOOKS_SERVICE,
  } = config;

  return postJson({
    body: {
      title,
      isbn,
      publishedDate,
      authorId,
    },
    url: `${BASE_URL}${BOOKS_SERVICE}`,
  });
};

export const fetchAddBook = ({
 title,
 isbn,
 publishedDate,
}) => (dispatch) => {
  dispatch(requestAddBook());
  return addBook({
    title,
    isbn,
    publishedDate,
  })
    .then(() => dispatch(successAddBook()))
    .catch(() => dispatch(errorAddBook()));
};


const requestEditBook = () => ({
  type: REQUEST_EDIT_BOOK,
});

const successEditBook = () => ({
  type: SUCCESS_EDIT_BOOK,
});

const errorEditBook = () => ({
  type: ERROR_EDIT_BOOK,
});

const editBook = ({
  bookId,
  title,
  isbn,
  publishedDate,
  authorId = 1,
}) => {
  const {
    BASE_URL,
    BOOKS_SERVICE,
  } = config;
  return putJson({
    body: {
      bookId,
      title,
      isbn,
      publishedDate,
      authorId,
    },
    url: `${BASE_URL}${BOOKS_SERVICE}/${bookId}`,
  });
};

export const fetchEditBook = ({
  bookId,
  title,
  isbn,
  publishedDate,
}) => (dispatch) => {
  dispatch(requestEditBook());
  return editBook({
    bookId,
    title,
    isbn,
    publishedDate,
  })
    .then(() => dispatch(successEditBook()))
    .catch(() => dispatch(errorEditBook()));
};