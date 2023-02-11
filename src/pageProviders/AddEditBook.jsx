import PageAccessValidator from 'components/PageAccessValidator';
import PageContainer from 'components/PageContainer';
import AddEditBookPage from 'pages/AddEditBook'

const AddEditBook = () => (
  <PageAccessValidator>
    <PageContainer>
      <AddEditBookPage />
    </PageContainer>
  </PageAccessValidator>
);

export default AddEditBook;