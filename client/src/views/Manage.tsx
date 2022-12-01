import { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import SubmitForm from '../components/SubmitForm';
import SearchForm from '../components/SearchForm';
import UpdateForm from '../components/UpdateForm';
import DeleteForm from '../components/DeleteForm';

function Manage() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState('');
  const [logged, setLogged] = useState(false);

  const login = async () => {
    const formData: any = new FormData();
    const name = 'alban';
    const pwd = 'alban4321';

    formData.append('sampleName', name);
    formData.append('samplePwd', pwd);
    setLoading(true);
    try {
      const log = await fetch('/api/login', {
        method: 'POST',
        body: formData,
      });
      const res = await log.json();
      setLogged(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLogged(false);
      setLoading(false);
    }
  };

  return (
    <div className="Manage">
      <button type="button" onClick={login}>
        login
      </button>

      {loading ? (
        <ClipLoader color="red" loading={loading} size={100} />
      ) : (
        <div className="forms">
          <SubmitForm setLoading={setLoading} logged={logged} />
          <SearchForm setLoading={setLoading} />
          <UpdateForm setLoading={setLoading} logged={logged} />
          <DeleteForm setLoading={setLoading} logged={logged} />
        </div>
      )}
    </div>
  );
}

export default Manage;
