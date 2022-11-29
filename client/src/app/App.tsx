import { Routes, Route } from 'react-router-dom';
import Home from '../views/Home';
import Manage from '../views/Manage';
import NavBar from '../components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage" element={<Manage />} />
      </Routes>
    </div>
  );
}

export default App;
