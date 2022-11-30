/* eslint-disable react/jsx-props-no-spreading */
import { useForm, SubmitHandler } from 'react-hook-form';

type FormInputs = {
  name: number;
  image: FileList[];
};

type Props = {
  setLoading: (param: boolean) => void;
  logged: boolean;
};

function SubmitForm({ setLoading, logged }: Props) {
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
      console.log(res);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    return 'Done submitting.';
  };

  return (
    <div className="SubmitForm">
      <form onSubmit={handleSubmit(onsubmit)}>
        <label htmlFor="nameInput">
          Enter item name:
          <input {...register('name', { required: true })} id="nameInput" />
        </label>
        <label htmlFor="pictureInput">
          Enter item file:
          <input
            {...register('image', { required: true })}
            id="pictureInput"
            type="file"
          />
        </label>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default SubmitForm;
