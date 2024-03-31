import Header from './container/Header';
import Discover from './container/Discover';
import styles from './styles/app.module.css';

export default function App() {
    return (
        <div className={styles.app}>
            <Header />
            <div className={styles.content}>
                <Discover />
            </div>
        </div>
    );
}