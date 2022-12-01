import { Routes, Route } from 'react-router-dom';
import Home from '../views/Home';
import Manage from '../views/Manage';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../styles/app.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage" element={<Manage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
