import PageAccessValidator from "components/PageAccessValidator";
import PageContainer from "components/PageContainer";
import BooksListPage from 'pages/BooksList';

const BooksList = () => (
  <PageAccessValidator>
    <PageContainer>
      <BooksListPage />
    </PageContainer>
  </PageAccessValidator>
);

export default BooksList;