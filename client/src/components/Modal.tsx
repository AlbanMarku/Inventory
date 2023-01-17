import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import ClipLoader from 'react-spinners/ClipLoader';
import '../styles/modal.css';

type Props = {
  openModal: boolean;
  setLogged: (param: boolean) => void;
  setUser: (param: string) => void;
  popup: () => void;
};

type SearchInputs = {
  name: string;
  password: string;
};

function Modal({ openModal, setLogged, setUser, popup }: Props) {
  const { register, handleSubmit } = useForm<SearchInputs>();
  const modalRoot = document.getElementById('modalSection') as HTMLFormElement;
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const login: SubmitHandler<SearchInputs> = async (data) => {
    const formData: any = new FormData();
    const { name } = data;
    const { password } = data;

    formData.append('sampleName', name);
    formData.append('samplePwd', password);
    try {
      setLoading(true);
      const log = await fetch('/api/login', {
        method: 'POST',
        body: formData,
      });
      const res = await log.json();
      setLogged(true);
      setUser(res.username);
      setLoading(false);
      if (
        res.message === 'No user' ||
        res.message === 'Incorrect username or password'
      ) {
        setErrorMsg('Incorrect details');
      } else {
        popup();
      }
    } catch (error) {
      console.log(error);
      setLogged(false);
      setUser('');
      setLoading(false);
    }
  };

  if (!openModal) return null;
  return createPortal(
    <>
      <div className="overlay" />
      <div className="modalBackground">
        <div className="modalContainer">
          {loading ? (
            <ClipLoader color="red" loading={loading} size={100} />
          ) : (
            <>
              <form onSubmit={handleSubmit(login)}>
                <label htmlFor="loginName">
                  Name:
                  <input
                    {...register('name', { required: true })}
                    id="loginName"
                  />
                </label>
                <label htmlFor="loginPassword">
                  Password:
                  <input
                    {...register('password', { required: true })}
                    id="loginPassword"
                    type="password"
                  />
                </label>
                <button type="submit">Login</button>
                <button type="button" onClick={popup}>
                  Close
                </button>
              </form>
              {errorMsg ? (
                <p>{errorMsg}</p>
              ) : (
                <p>Input your username and password</p>
              )}
            </>
          )}
        </div>
      </div>
    </>,
    modalRoot
  );
}

export default Modal;
