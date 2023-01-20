import '../styles/footer.css';
import logo from '../assets/logo.png';

function Footer() {
  return (
    <footer>
      <strong>AlbanMarku</strong>
      <a href="https://github.com/AlbanMarku">
        <img src={logo} alt="github" />
      </a>
    </footer>
  );
}

export default Footer;
