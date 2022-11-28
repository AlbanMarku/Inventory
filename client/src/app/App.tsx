/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Product = {
  name: string;
  imageLink: string;
  id: string;
};

type FormInputs = {
  name: number;
  image: FileList[];
};

type SearchInputs = {
  name: string;
};

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<SearchInputs>();

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
  };

  const onDelete: SubmitHandler<SearchInputs> = async (data) => {
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

  const onSearch: SubmitHandler<SearchInputs> = async (data) => {
    const { name } = data;

    setLoading(true);
    try {
      const sentData = await fetch(`/api/search?name=${name}`);
      const res = await sentData.json();
      console.log('done');
      setLoading(false);
      res.forEach((element: Product) => {
        console.log(element.imageLink);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <p>{loading.toString()}</p>
      <button type="button" onClick={callIt}>
        Get all product images
      </button>
      {items.map((element: Product) => {
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

      {/* <form onSubmit={handleSubmit(onsubmit)}>
        <label htmlFor="nameInput">
          Enter item name:
          <input {...register('name')} id="nameInput" />
        </label>
        <label htmlFor="pictureInput">
          Enter item file:
          <input {...register('image')} id="pictureInput" type="file" />
        </label>
        <button type="submit">submit</button>
      </form> */}

      <form onSubmit={handleSubmit(onDelete)}>
        <label htmlFor="nameInput">
          enter delete name:
          <input {...register('name')} id="nameDelete" />
        </label>
        <button type="submit">Delete item</button>
      </form>

      {/* <form onSubmit={handleSubmit(onSearch)}>
        <label htmlFor="searchInput">
          Search product
          <input {...register('name')} id="searchInput" />
        </label>
        <button type="submit">Search</button>
      </form> */}
    </div>
  );
}

export default App;
