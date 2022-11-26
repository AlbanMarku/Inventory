/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type FetchImage = {
  name: string;
  imageLink: string;
  id: string;
};

type FormInputs = {
  name: string;
  image: FileList[];
};

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<FormInputs>();

  const callIt = async () => {
    setLoading(true);
    const response = await fetch('/api/fetchAll');
    const data = await response.json();
    setItems(data);
    setLoading(false);
  };

  const onsubmit: SubmitHandler<FormInputs> = async (data) => {
    const formData: any = new FormData();
    const pic = data.image[0];
    const { name } = data;

    formData.append('image', pic);
    formData.append('name', name);
    setLoading(true);
    await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    console.log('uploaded');
    setLoading(false);
  };

  return (
    <div className="App">
      <p>{loading.toString()}</p>
      <button type="button" onClick={callIt}>
        Click me
      </button>
      {items.map((element: FetchImage) => {
        return (
          <div key={element.id}>
            <img
              src={element.imageLink}
              alt="product"
              style={{ width: '500px' }}
            />
          </div>
        );
      })}

      <form onSubmit={handleSubmit(onsubmit)}>
        <label htmlFor="nameInput">
          Enter item name:
          <input {...register('name')} id="nameInput" />
        </label>
        <label htmlFor="pictureInput">
          Enter item file:
          <input {...register('image')} id="pictureInput" type="file" />
        </label>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default App;
