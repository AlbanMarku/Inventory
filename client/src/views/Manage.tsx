import { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import SubmitForm from '../components/SubmitForm';
import SearchForm from '../components/SearchForm';
import UpdateForm from '../components/UpdateForm';
import DeleteForm from '../components/DeleteForm';

function Manage() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState('');

  const login = async () => {
    const name = 'alban';
    const pwd = 'alban4321';
    setLoading(true);
    try {
      const log = await fetch(`/api/login?sampleName=${name}&samplePwd=${pwd}`);
      const res = await log.json();
      console.log(res);
      setUser(res.username);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="Manage">
      {user ? (
        'logged in'
      ) : (
        <button type="button" onClick={login}>
          login
        </button>
      )}

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
