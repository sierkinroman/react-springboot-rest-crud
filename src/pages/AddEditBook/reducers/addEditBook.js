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

const initialState = {
  book: {},
  isFetchingGetBook: false,
  isSuccessGetBook: false,
  isFailedGetBook: false,

  isFetchingAddBook: false,
  isSuccessAddBook: false,
  isFailedAddBook: false,

  isFetchingEditBook: false,
  isSuccessEditBook: false,
  isFailedEditBook: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_GET_BOOK: {
      return {
        ...state,
        isFetchingGetBook: true,
        isSuccessGetBook: false,
        isFailedGetBook: false,
      };
    }
    case SUCCESS_GET_BOOK: {
      return {
        ...state,
        isFetchingGetBook: false,
        isSuccessGetBook: true,
        isFailedGetBook: false,
        book: action.payload,
      };
    }
    case ERROR_GET_BOOK: {
      return {
        ...state,
        isFetchingGetBook: false,
        isSuccessGetBook: false,
        isFailedGetBook: true,
      };
    }
    case CLEAR_STATE: {
      return initialState;
    }

    case REQUEST_ADD_BOOK: {
      return {
        ...state,
        isFetchingAddBook: true,
        isSuccessAddBook: false,
        isFailedAddBook: false,
      };
    }
    case SUCCESS_ADD_BOOK: {
      return {
        ...state,
        isFetchingAddBook: false,
        isSuccessAddBook: true,
        isFailedAddBook: false,
      };
    }
    case ERROR_ADD_BOOK: {
      return {
        ...state,
        isFetchingAddBook: false,
        isSuccessAddBook: false,
        isFailedAddBook: true,
      };
    }

    case REQUEST_EDIT_BOOK: {
      return {
        ...state,
        isFetchingEditBook: true,
        isSuccessEditBook: false,
        isFailedEditBook: false,
      };
    }
    case SUCCESS_EDIT_BOOK: {
      return {
        ...state,
        isFetchingEditBook: false,
        isSuccessEditBook: true,
        isFailedEditBook: false,
      };
    }
    case ERROR_EDIT_BOOK: {
      return {
        ...state,
        isFetchingEditBook: false,
        isSuccessEditBook: false,
        isFailedEditBook: true,
      };
    }

    default: return state;
  }
};