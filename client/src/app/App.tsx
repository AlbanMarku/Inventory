import { useState } from 'react';

function App() {
  type FetchImage = {
    name: string;
    imageLink: string;
    id: string;
  };

  const [items, setItems] = useState([]);
  const callIt = async () => {
    const response = await fetch('/api/fetchAll');
    const data = await response.json();
    console.log(data);
    setItems(data);
  };
  return (
    <div className="App">
      <p>Hello World!</p>
      <button type="button" onClick={callIt}>
        Click me
      </button>
      {items.map((element: FetchImage) => (
        <img
          key={element.id}
          src={element.imageLink}
          alt="product"
          style={{ width: '500px' }}
        />
      ))}
    </div>
  );
}

export default App;
