import { Link } from 'react-router-dom';
import styles from '../styles/errorpage.module.css';

export default function ErrorPage() {
    return (
        <section className={styles.error}>
            <div className={styles.error_content}>
                <h2>This page doesn&apos;t exist! (In this part of the multiverse)</h2>
                <Link to="/">Go home</Link>
            </div>
        </section>
    );
}