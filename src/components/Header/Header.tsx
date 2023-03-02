import { Link } from 'react-router-dom';
import styles from './header.module.css';
import { BsGithub} from "react-icons/bs";

const Header = (): JSX.Element =>  {
  return (
    <>
      <header className={styles.header}>
      <Link to='/' className={styles.wrapper} style={{ textDecoration: 'none' }}>
        <BsGithub className="fs-2 text-danger fw-bold" size={30} style={{ color: "black"}}/>
        <h1 className={styles.title}>Rocket Review</h1>
      </Link>
      </header>
    </>
  );
}

export default Header;
