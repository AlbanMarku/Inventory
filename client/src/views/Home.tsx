import { useState } from 'react';

type Product = {
  name: string;
  imageLink: string;
  id: string;
};

function Home() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const callIt = async () => {
    setLoading(true);
    const response = await fetch('/api/fetchAll');
    const data = await response.json();
    setItems(data);
    setLoading(false);
  };
  return (
    <div className="Home">
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
    </div>
  );
}

export default Home;
