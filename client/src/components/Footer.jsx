import { Link } from "react-router-dom";
import styles from '../styles/footer.module.css';

export default function Footer() {
    const date = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <Link to={"/tos"}>Terms of Service</Link>
            <div className={styles.copyright}>
                <small>
                    Copyright &copy; {date}. All Rights Reserved.
                </small>
            </div>
            <Link to={"/about"}>About</Link>
        </footer>
    );
}