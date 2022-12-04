/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import ClipLoader from 'react-spinners/ClipLoader';
import Result from './Result';

type SearchInputs = {
  name: number;
  image: FileList[];
};

type Product = {
  name: string;
  imageLink: string;
  id: string;
};

function SearchFrom() {
  const { register, handleSubmit } = useForm<SearchInputs>();
  const [loading, setLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState<Product>();
  const [found, setFound] = useState(false);
  const [firstSearch, setFirstSearch] = useState(false);

  const onSearch: SubmitHandler<SearchInputs> = async (data) => {
    const { name } = data;

    setLoading(true);
    try {
      setFirstSearch(true);
      const sentData = await fetch(`/api/search?name=${name}`);
      const res = await sentData.json();
      if (res[0]) {
        setFetchedData(res[0]);
        setFound(true);
      } else {
        setFetchedData({ name: '', imageLink: '', id: '' });
        setFound(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="SearchForm">
      <form onSubmit={handleSubmit(onSearch)}>
        {loading ? (
          <ClipLoader color="red" loading={loading} size={100} />
        ) : (
          <label htmlFor="searchInput">
            Search product
            <input {...register('name', { required: true })} id="searchInput" />
          </label>
        )}
        <button type="submit">Search</button>
        {found && fetchedData ? (
          <div className="previewArea">
            <p>Item preview:</p>
            <Result image={fetchedData.imageLink} itemName={fetchedData.name} />
          </div>
        ) : (
          <div className="previewText">
            <p>Item preview:</p>
            {firstSearch ? <p>Nothing found.</p> : <p>Search something!</p>}
          </div>
        )}
      </form>
    </div>
  );
}

export default SearchFrom;
