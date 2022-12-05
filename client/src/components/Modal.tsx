import { createPortal } from 'react-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import '../styles/modal.css';

type Props = {
  openModal: boolean;
  setLogged: (param: boolean) => void;
  setUser: (param: string) => void;
};

type SearchInputs = {
  name: string;
  password: string;
};

function Modal({ openModal, setLogged, setUser }: Props) {
  const { register, handleSubmit } = useForm<SearchInputs>();
  const modalRoot = document.getElementById('modalSection') as HTMLFormElement;

  const login: SubmitHandler<SearchInputs> = async (data) => {
    const formData: any = new FormData();
    const { name } = data;
    const { password } = data;

    formData.append('sampleName', name);
    formData.append('samplePwd', password);
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
  };

  if (!openModal) return null;
  return createPortal(
    <>
      <div className="overlay" />
      <div className="modalBackground">
        <div className="modalContainer">
          <form onSubmit={handleSubmit(login)}>
            <label htmlFor="nameInput">
              Name:
              <input {...register('name', { required: true })} id="nameInput" />
            </label>
            <label htmlFor="passwordInput">
              Password:
              <input
                {...register('password', { required: true })}
                id="passwordInput"
              />
            </label>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>,
    modalRoot
  );
}

export default Modal;
