/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import ClipLoader from 'react-spinners/ClipLoader';

type FormInputs = {
  name: number;
  image: FileList[];
};

type Props = {
  logged: boolean;
};

function SubmitForm({ logged }: Props) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<FormInputs>();

  const onsubmit: SubmitHandler<FormInputs> = async (data) => {
    if (!logged) return alert('You must login to make changes.');
    const formData: any = new FormData();
    const pic = data.image[0];
    const { name } = data;

    formData.append('image', pic);
    formData.append('name', name);
    setLoading(true);
    try {
      const sentData = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const res = await sentData.json();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    return 'Done submitting.';
  };

  return (
    <div className="SubmitForm">
      <form onSubmit={handleSubmit(onsubmit)}>
        {loading ? (
          <ClipLoader color="red" loading={loading} size={100} />
        ) : (
          <>
            <label htmlFor="nameInput">
              <p id="nameHeader">Enter name:</p>
              <input {...register('name', { required: true })} id="nameInput" />
            </label>
            <label id="pictureInput" htmlFor="pictureInput">
              <p>Upload file:</p>
              <input
                {...register('image', { required: true })}
                id="pictureInput"
                type="file"
              />
            </label>
          </>
        )}
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default SubmitForm;
