/* eslint-disable react/jsx-props-no-spreading */
import { useForm, SubmitHandler } from 'react-hook-form';

type SearchInputs = {
  name: string;
};

type Props = {
  setLoading: (param: boolean) => void;
};

function DeleteForm({ setLoading }: Props) {
  const { register, handleSubmit } = useForm<SearchInputs>();

  const onDelete: SubmitHandler<SearchInputs> = async (data) => {
    console.log(data);
    const { name } = data;
    setLoading(true);

    try {
      const sentData = await fetch(`/api/delete?name=${name}`);
      const res = await sentData.json();
      console.log(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="DeleteForm">
      <form onSubmit={handleSubmit(onDelete)}>
        <label htmlFor="nameInput">
          enter delete name:
          <input {...register('name', { required: true })} id="nameInput" />
        </label>
        <button type="submit">Delete item</button>
      </form>
    </div>
  );
}

export default DeleteForm;
