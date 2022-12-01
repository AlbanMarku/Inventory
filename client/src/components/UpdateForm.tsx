/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import ClipLoader from 'react-spinners/ClipLoader';

type UpdateInputs = {
  name: string;
  newName: string;
  image: FileList[];
};

type Props = {
  logged: boolean;
};

function UpdateForm({ logged }: Props) {
  const { register, handleSubmit } = useForm<UpdateInputs>();
  const [loading, setLoading] = useState(false);

  const onUpdate: SubmitHandler<UpdateInputs> = async (data) => {
    if (!logged) return alert('You must be logged in to update item.');
    const formData: any = new FormData();
    const { name } = data;
    const { newName } = data;
    const pic = data.image[0];

    formData.append('image', pic);
    formData.append('name', name);
    formData.append('newName', newName);
    setLoading(true);

    try {
      const sentData = await fetch('/api/update', {
        method: 'POST',
        body: formData,
      });
      const res = await sentData.json();
      setLoading(false);
      console.log(res);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    return 'Done updating.';
  };
  return (
    <div className="UpdateForm">
      <form onSubmit={handleSubmit(onUpdate)}>
        {loading ? (
          <ClipLoader color="red" loading={loading} size={100} />
        ) : (
          <>
            <label htmlFor="nameUpdate">
              enter name to update:
              <input
                {...register('name', { required: true })}
                id="nameUpdateInput"
              />
            </label>
            <label htmlFor="newName">
              enter new name:
              <input
                {...register('newName', { required: true })}
                id="newNameInput"
              />
            </label>
            <label htmlFor="newImage">
              upload new img:
              <input
                {...register('image', { required: true })}
                id="newImageInput"
                type="file"
              />
            </label>
          </>
        )}

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateForm;
