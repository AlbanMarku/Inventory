import { useEffect, useState } from 'react';
import ItemCard from '../components/ItemCard';

type Product = {
  name: string;
  imageLink: string;
  id: string;
};

function Home() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch('/api/fetchAll').then((res) => {
      res.json().then((data) => {
        setItems(data);
        setLoading(false);
      });
    });
  }, []);
  return (
    <div className="Home">
      {loading ? (
        <p>I am loading</p>
      ) : (
        items.map((element: Product) => {
          return (
            <ItemCard
              key={element.id}
              name={element.name}
              image={element.imageLink}
            />
          );
        })
      )}
    </div>
  );
}

export default Home;
