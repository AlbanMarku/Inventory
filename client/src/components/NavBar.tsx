import { Link } from 'react-router-dom';
import '../styles/navBar.css';

type Props = {
  user: string;
};

function NavBar({ user }: Props) {
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
      {user ? <p>Welcome {user}</p> : <p>Not signed in</p>}
    </nav>
  );
}

export default NavBar;
