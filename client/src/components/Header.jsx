import { Link } from "react-router-dom";
import Logo from '../images/Logo.png';
import styles from '../styles/header.module.css';

export default function Header () {
    return (
        <nav>
            <div className={styles.navheader}>
                <Link to={'/'} className={styles.nav_logo} >
                    <img src={Logo} alt="The high ground logo" />
                </Link>
                <ul>
                    <li><Link to={'/user/ThreeSheets'}>Three Sheets</Link></li>
                    <li><Link to={'/create'}>Create Post</Link></li>
                    <li><Link to={'/authors'}>Authors</Link></li>
                    <li><Link to={'/logout'}>Logout</Link></li>
                </ul>
                
            </div>
        </nav>
    );
}