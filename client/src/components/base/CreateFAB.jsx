import FontAwesomeIcon from './FontAwesomeIcon';
import styles from '../styles/createfab.module.css';

export default function CreateFAB() {
    return (
        <div className={styles.createFab}>
            <FontAwesomeIcon icon="fa-solid fa-plus" />
        </div>
    );
}