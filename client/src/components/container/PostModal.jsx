import { useState } from 'react';
import Loader from '../base/Loader';
import styles from '../styles/postmodal.module.css';

export default function PostModal() {
    const [message, setMessage] = useState('Posting...');

    

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modal}>
                <p>{message}</p>
                <Loader />
            </div>
        </div>
    );
}