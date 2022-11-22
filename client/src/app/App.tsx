function App() {
  const callIt = async () => {
    const response = await fetch('/api');
    const data = await response.json();
    console.log(data.message);
  };
  return (
    <div className="App">
      <p>Hello World!</p>
      <button type="button" onClick={callIt}>
        Click me
      </button>
    </div>
  );
}

export default App;
