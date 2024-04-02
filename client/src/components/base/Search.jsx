import { useState } from 'react';
import styles from '../styles/search.module.css';

export default function Search() {
    const [searchInput, setSearchInput] = useState('');

    function handleChange(event) {
        setSearchInput(event.target.value);
    }

    return (
        <div className={styles.search}>
            <div>
                <i className="fa-solid fa-magnifying-glass"></i>
                <label htmlFor="search"></label>
            </div>
            <div className={styles.searchInput}>
                <input 
                    type="text" 
                    name='search'
                    id='search'
                    value={searchInput}
                    onChange={handleChange}
                    maxLength={31}
                    size={50}
                    className={styles.textArea}
                    autoComplete="off"
                />
            </div>
        </div>
    );
}