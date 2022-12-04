import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from '../views/Home';
import Manage from '../views/Manage';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../styles/app.css';

function App() {
  const [user, setUser] = useState('');
  return (
    <div className="App">
      <NavBar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/manage"
          element={<Manage setUser={setUser} user={user} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
