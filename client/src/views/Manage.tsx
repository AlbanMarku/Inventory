import { useState } from 'react';
import SubmitForm from '../components/SubmitForm';
import SearchForm from '../components/SearchForm';
import UpdateForm from '../components/UpdateForm';
import DeleteForm from '../components/DeleteForm';
import '../styles/manage.css';

type Props = {
  setUser: (param: string) => void;
  user: string;
};

function Manage({ user, setUser }: Props) {
  const [logged, setLogged] = useState(false);
  const [buttonText, setButtonText] = useState('Login');

  const login = async () => {
    setButtonText('Loading...');
    const formData: any = new FormData();
    const name = 'alban';
    const pwd = 'alban4321';

    formData.append('sampleName', name);
    formData.append('samplePwd', pwd);
    try {
      const log = await fetch('/api/login', {
        method: 'POST',
        body: formData,
      });
      const res = await log.json();
      setLogged(true);
      setUser(res.username);
    } catch (error) {
      console.log(error);
      setLogged(false);
      setUser('');
    }
    setButtonText('Login');
  };

  const logout = () => {
    setUser('');
    setLogged(false);
  };

  return (
    <div className="Manage">
      <div className="loginArea">
        {user ? (
          <button id="logoutBtn" type="button" onClick={logout}>
            Logout
          </button>
        ) : (
          <button id="loginBtn" type="button" onClick={login}>
            {buttonText}
          </button>
        )}
      </div>
      <div className="formArea">
        <SubmitForm logged={logged} />
        <SearchForm />
        <UpdateForm logged={logged} />
        <DeleteForm logged={logged} />
      </div>
    </div>
  );
}

export default Manage;
