import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navBar.css';

type Props = {
  user: string;
};

function NavBar({ user }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  let scrollToggle = 'initial';
  const handleToggle = () => {
    setMenuOpen(!menuOpen);
    if (menuOpen) {
      scrollToggle = 'initial';
    } else {
      scrollToggle = 'hidden';
    }
    document.body.style.overflow = scrollToggle;
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = 'initial';
  };
  return (
    <nav>
      <div className="navTitle">
        <h1>Inventory</h1>
        <div id="welcomeStatus">
          {user ? <p>Welcome {user}</p> : <p>Not signed in</p>}
        </div>
      </div>
      <ul className={`menu-list ${menuOpen ? 'open' : ''}`}>
        <li>
          <Link onClick={closeMenu} className="link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link onClick={closeMenu} className="link" to="/manage">
            Manage
          </Link>
        </li>
      </ul>

      <button
        onClick={handleToggle}
        className={`hamburger ${menuOpen ? 'active' : ''}`}
        type="button"
      >
        <div className="line" />
        <div className="line" />
        <div className="line" />
      </button>
    </nav>
  );
}

export default NavBar;
