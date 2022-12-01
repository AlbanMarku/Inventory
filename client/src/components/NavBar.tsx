import { Link } from 'react-router-dom';
import '../styles/navBar.css';

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link className="link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="link" to="/manage">
            Manage
          </Link>
        </li>
      </ul>
      <h1>Inventory</h1>
      <p>name here</p>
    </nav>
  );
}

export default NavBar;
