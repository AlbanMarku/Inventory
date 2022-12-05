import { useState } from 'react';
import SubmitForm from '../components/SubmitForm';
import SearchForm from '../components/SearchForm';
import UpdateForm from '../components/UpdateForm';
import DeleteForm from '../components/DeleteForm';
import Modal from '../components/Modal';
import '../styles/manage.css';

type Props = {
  setUser: (param: string) => void;
  user: string;
};

function Manage({ user, setUser }: Props) {
  const [logged, setLogged] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const popup = () => {
    setOpenModal(!openModal);
  };

  const logout = () => {
    setUser('');
    setLogged(false);
  };

  return (
    <div className="Manage">
      <div className="loginArea">
        <div>
          <Modal
            openModal={openModal}
            setLogged={setLogged}
            setUser={setUser}
          />
        </div>
        {user ? (
          <button id="logoutBtn" type="button" onClick={logout}>
            Logout
          </button>
        ) : (
          <button id="loginBtn" type="button" onClick={popup}>
            Login
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
