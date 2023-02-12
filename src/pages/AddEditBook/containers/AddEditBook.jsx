import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  clearState,
  fetchAddBook,
  fetchEditBook,
  fetchGetBook
} from '../actions/addEditBook';
import { useIntl } from 'react-intl';
import * as PAGES from 'constants/pages';
import useChangePage from 'hooks/useChangePage';
import useLocationSearch from 'hooks/useLocationSearch';
import { makeStyles } from '@material-ui/core/styles';
import Button from 'components/Button';
import TextField from 'components/TextField';
import Link from 'components/Link'
import Typography from 'components/Typography';
import Paper from 'components/Paper';
import CircularProgress from 'components/CircularProgress';

const getClasses = makeStyles(() => ({
  content: {
    width: '400px',
    textAlign: 'center',
    margin: '50px auto',
  },
  padding3x: {
    padding: '24px',
  },
  marginTop2x: {
    marginTop: '16px',
  },
  marginTop4x: {
    marginTop: '32px',
  },
  marginLeft2x: {
    marginLeft: '16px',
  },
}));

const initialState = {
  title: '',
  isbn: '',
  publishedDate: '',
}

const AddEditBook = () => {
  const classes = getClasses();
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const changePage = useChangePage();
  const locationSearch = useLocationSearch();
  const { formatMessage } = useIntl();
  const {
    book,
    isFetchingGetBook,
    isSuccessGetBook,
    isFailedGetBook,

    isFetchingAddBook,
    isSuccessAddBook,
    isFailedAddBook,

    isFetchingEditBook,
    isSuccessEditBook,
    isFailedEditBook,
  } = useSelector(({ addEditBookReducer }) => addEditBookReducer);

  useEffect(() => {
    if (bookId) {
      dispatch(fetchGetBook({ bookId }));
    }
    return () => dispatch(clearState());
  }, []);

  useEffect(() => {
    if (book) {
      setState(prevState => ({
        ...prevState,
        title: book.title,
        isbn: book.isbn,
        publishedDate: book.publishedDate,
      }));
    }
  }, [book]);

  useEffect(() => {
    if (isSuccessEditBook || isSuccessAddBook) {
      changePage({
        locationSearch,
        path: `/${PAGES.BOOKS_LIST}`,
      });
    }
  }, [isSuccessEditBook, isSuccessAddBook]);

  return (
    <div className={classes.content}>
      <div>
        {isFetchingGetBook && (
          <div>
            <Typography>Loading book...</Typography>
            <CircularProgress className={classes.marginTop2x} />
          </div>
        )}
        {isFailedGetBook && (
          <div>
            {/*This should be specific error message from BE*/}
            <Typography variant='h5' color='secondary'>
              Error while getting book
            </Typography>
            <Button
              variant='outlined'
              color='primary'
              className={classes.marginTop4x}
            >
              <Link
                to={(location => ({
                  ...location,
                  pathname: `/${PAGES.BOOKS_LIST}`,
                }))}
              >
                <Typography color='primary'>
                  Back to book list
                </Typography>
              </Link>
            </Button>
          </div>
        )}
      </div>

      {(isSuccessGetBook || !bookId) && (
        <>
          <Paper className={classes.padding3x} elevation={3}>
            <Typography variant='h5'>
              {bookId
                ? formatMessage({ id: 'addEditBook.title.edit' })
                : formatMessage({ id: 'addEditBook.title.add' })}
            </Typography>
            <div className={classes.marginTop2x}>
              <TextField
                fullWidth
                label={formatMessage({ id: 'books.title' })}
                onChange={({ target }) => setState(prevState => ({
                  ...prevState,
                  title: target.value,
                }))}
                value={state.title}
              />
            </div>
            <div className={classes.marginTop2x}>
              <TextField
                fullWidth
                label={formatMessage({ id: 'books.isbn' })}
                onChange={({ target }) => setState(prevState => ({
                  ...prevState,
                  isbn: target.value,
                }))}
                value={state.isbn}
              />
            </div>
            <div className={classes.marginTop2x}>
              <TextField
                fullWidth
                label={formatMessage({ id: 'books.publishedDate' })}
                type='date'
                onChange={({ target }) => setState(prevState => ({
                  ...prevState,
                  publishedDate: target.value,
                }))}
                value={state.publishedDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className={classes.marginTop4x}>
              <Button variant='outlined'>
                <Link
                  to={(location => ({
                    ...location,
                    pathname: `/${PAGES.BOOKS_LIST}`,
                  }))}
                >
                  <Typography color='primary'>
                    {formatMessage({ id: 'addEditBook.cancel' })}
                  </Typography>
                </Link>
              </Button>
              <Button
                variant='contained'
                disabled={(isFetchingAddBook || isFetchingEditBook)}
                color='primary'
                className={classes.marginLeft2x}
                onClick={() => {
                  const dto = {
                    title: state.title,
                    isbn: state.isbn,
                    publishedDate: state.publishedDate,
                  };
                  if (bookId) {
                    dispatch(fetchEditBook({
                      ...dto,
                      bookId,
                    }));
                  } else {
                    dispatch(fetchAddBook(dto));
                  }
                }}
              >
                <Typography color='initial'>
                  {formatMessage({ id: 'addEditBook.save' })}
                </Typography>
                {(isFetchingAddBook || isFetchingEditBook) && (
                  <CircularProgress className={classes.marginLeft2x} size={24} />
                )}
              </Button>
            </div>
            {(isFailedAddBook || isFailedEditBook) && (
              <div className={classes.marginTop4x}>
                <Typography color='secondary'>
                  {/*This should be specific error message from BE*/}
                  Error while saving results
                </Typography>
              </div>
            )}
          </Paper>
        </>
      )}
    </div>
  );
};

export default AddEditBook;