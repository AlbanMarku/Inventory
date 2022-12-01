/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import ClipLoader from 'react-spinners/ClipLoader';

type SearchInputs = {
  name: string;
};

type Props = {
  logged: boolean;
};

function DeleteForm({ logged }: Props) {
  const { register, handleSubmit } = useForm<SearchInputs>();
  const [loading, setLoading] = useState(false);

  const onDelete: SubmitHandler<SearchInputs> = async (data) => {
    if (!logged) return alert('You must be logged in to delete item.');
    const { name } = data;
    setLoading(true);

    try {
      const sentData = await fetch(`/api/delete?name=${name}`);
      const res = await sentData.json();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    return 'Done deleting.';
  };
  return (
    <div className="DeleteForm">
      <form onSubmit={handleSubmit(onDelete)}>
        {loading ? (
          <ClipLoader color="red" loading={loading} size={100} />
        ) : (
          <label htmlFor="nameInput">
            enter delete name:
            <input {...register('name', { required: true })} id="nameInput" />
          </label>
        )}
        <button type="submit">Delete item</button>
      </form>
    </div>
  );
}

export default DeleteForm;
