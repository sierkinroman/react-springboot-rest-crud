import React, {
  useEffect,
  useState
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  clearState,
  fetchBooks,
  fetchDeleteBook
} from '../actions/bookList';
import { makeStyles } from '@material-ui/core/styles';
import * as PAGES from 'constants/pages';
import Typography from 'components/Typography';
import Table from 'components/Table';
import TableHead from 'components/TableHead';
import TableRow from 'components/TableRow';
import TableCell from 'components/TableCell';
import TableBody from 'components/TableBody';
import Tooltip from 'components/Tooltip';
import IconButton from 'components/IconButton';
import EditIcon from 'components/EditIcon';
import DeleteIcon from 'components/DeleteIcon';
import AddIcon from 'components/AddIcon';
import Link from 'components/Link';
import CircularProgress from 'components/CircularProgress';
import Fab from 'components/Fab';
import { useIntl } from 'react-intl';

const getClasses = makeStyles(() => ({
  content: {
    width: '100%',
    marginTop: '32px',
  },
  marginTop2x: {
    marginTop: '16px',
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  marginRight: {
    marginRight: '8px',
  },
}));

const BooksList = () => {
  const classes = getClasses();
  const dispatch = useDispatch();
  const [showActionId, setShowActionId] = useState(-1);
  const { formatMessage } = useIntl();
  const {
    books,
    isFetchingBooks,
    isSuccessFetchBooks,
    isFailedFetchBooks,

    isFetchingDeleteBook,
  } = useSelector(({ bookListReducer }) => bookListReducer);

  useEffect(() => {
    dispatch(fetchBooks());
    return () => dispatch(clearState());
  }, []);

  return (
    <div className={classes.content}>
      {isFetchingBooks && (
        <div className={classes.textAlignCenter}>
          <Typography>Loading books...</Typography>
          <CircularProgress className={classes.marginTop2x}/>
        </div>
      )}
      {isFailedFetchBooks && (
        <div className={classes.textAlignCenter}>
          {/*This should be specific error message from BE*/}
          <Typography variant='h5' color='secondary'>
            Error while getting all books
          </Typography>
        </div>
      )}

      {isSuccessFetchBooks && (
        <>
          <Typography
            align='center'
            variant='h3'
          >
            {formatMessage({ id: 'books.list' })}
          </Typography>
          <div className={classes.marginTop2x}>
            <Link
              to={(location => ({
                ...location,
                pathname: `/${PAGES.ADD_BOOK}`,
              }))}
            >
              <Fab
                variant="extended"
                color='primary'
                size='medium'
              >
                <AddIcon className={classes.marginRight}/>
                  {formatMessage({ id: 'books.addBook' })}
              </Fab>
            </Link>
          </div>
          <Table className={classes.marginTop2x} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>{formatMessage({ id: 'books.id' })}</TableCell>
                <TableCell>{formatMessage({ id: 'books.title' })}</TableCell>
                <TableCell>{formatMessage({ id: 'books.isbn' })}</TableCell>
                <TableCell>{formatMessage({ id: 'books.publishedDate' })}</TableCell>
                <TableCell>{formatMessage({ id: 'books.actions' })}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map(book => (
                <TableRow
                  key={book.id}
                  onMouseEnter={() => setShowActionId(book.id)}
                  onMouseLeave={() => setShowActionId(-1)}
                  hover
                >
                  <TableCell>{book.id}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell>{book.publishedDate}</TableCell>
                  <TableCell style={{width: '70px'}}>
                    {book.id === showActionId && (
                      <div>
                        <Link
                          to={(location => ({
                            ...location,
                            pathname: `/${PAGES.EDIT_BOOK}/${book.id}`,
                          }))}
                        >
                          <Tooltip title={formatMessage({ id: 'books.tooltip.edit' })}>
                            <IconButton size='small'>
                              <EditIcon fontSize='small'/>
                            </IconButton>
                          </Tooltip>
                        </Link>
                        <Tooltip title={formatMessage({ id: 'books.tooltip.delete' })}>
                          <IconButton
                            onClick={() => dispatch(fetchDeleteBook({bookId: book.id}))}
                            size='small'
                            disabled={isFetchingDeleteBook}
                          >
                            {isFetchingDeleteBook && (
                              <CircularProgress size={20} />
                            )}
                            {!isFetchingDeleteBook && (
                              <DeleteIcon fontSize='small'/>
                            )}
                          </IconButton>
                        </Tooltip>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default BooksList;