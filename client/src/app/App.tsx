import { useState } from 'react';

function App() {
  type FetchImage = {
    name: string;
    imageLink: string;
    id: string;
  };

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const callIt = async () => {
    setLoading(true);
    const response = await fetch('/api/fetchAll');
    const data = await response.json();
    setItems(data);
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
    </div>
  );
}

export default App;
