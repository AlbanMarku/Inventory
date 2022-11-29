import { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import SubmitForm from '../components/SubmitForm';
import SearchForm from '../components/SearchForm';
import UpdateForm from '../components/UpdateForm';
import DeleteForm from '../components/DeleteForm';

function Manage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="Manage">
      {loading ? (
        <ClipLoader color="red" loading={loading} size={100} />
      ) : (
        <div className="forms">
          <SubmitForm setLoading={setLoading} />
          <SearchForm setLoading={setLoading} />
          <UpdateForm setLoading={setLoading} />
          <DeleteForm setLoading={setLoading} />
        </div>
      )}
    </div>
  );
}

export default Manage;
