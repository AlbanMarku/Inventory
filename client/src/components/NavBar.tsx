import { Link } from 'react-router-dom';
import '../styles/navBar.css';

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/manage">Manage</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
