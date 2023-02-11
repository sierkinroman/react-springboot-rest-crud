import {
  CLEAR_STATE,
  ERROR_DELETE_BOOK,
  ERROR_GET_BOOKS,
  REQUEST_DELETE_BOOK,
  REQUEST_GET_BOOKS,
  SUCCESS_DELETE_BOOK,
  SUCCESS_GET_BOOKS
} from '../constants/actionTypes';

const initialState = {
  books: [],
  isFetchingBooks: false,
  isSuccessFetchBooks: false,
  isFailedFetchBooks: false,

  isFetchingDeleteBook: false,
  isFailedDeleteBook: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_GET_BOOKS: {
      return {
        ...state,
        isFetchingBooks: true,
        isSuccessFetchBooks: false,
        isFailedFetchBooks: false,
      };
    }
    case SUCCESS_GET_BOOKS: {
      return {
        ...state,
        isFetchingBooks: false,
        isSuccessFetchBooks: true,
        isFailedFetchBooks: false,
        books: action.payload,
      };
    }
    case ERROR_GET_BOOKS: {
      return {
        ...state,
        isFetchingBooks: false,
        isSuccessFetchBooks: false,
        isFailedFetchBooks: true,
      };
    }
    case CLEAR_STATE: {
      return initialState;
    }

    case REQUEST_DELETE_BOOK: {
      return {
        ...state,
        isFetchingDeleteBook: true,
        isFailedDeleteBook: false,
      };
    }
    case SUCCESS_DELETE_BOOK: {
      return {
        ...state,
        isFetchingDeleteBook: false,
        isFailedDeleteBook: false,
      };
    }
    case ERROR_DELETE_BOOK: {
      return {
        ...state,
        isFetchingDeleteBook: false,
        isFailedDeleteBook: true,
      };
    }

    default: return state;
  }
};