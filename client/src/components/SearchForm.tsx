/* eslint-disable react/jsx-props-no-spreading */
import { useForm, SubmitHandler } from 'react-hook-form';

type SearchInputs = {
  name: number;
  image: FileList[];
};

type Product = {
  name: string;
  imageLink: string;
  id: string;
};

type Props = {
  setLoading: (param: boolean) => void;
};

function SearchFrom({ setLoading }: Props) {
  const { register, handleSubmit } = useForm<SearchInputs>();

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
    <div className="SearchForm">
      <form onSubmit={handleSubmit(onSearch)}>
        <label htmlFor="searchInput">
          Search product
          <input {...register('name', { required: true })} id="searchInput" />
        </label>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchFrom;
