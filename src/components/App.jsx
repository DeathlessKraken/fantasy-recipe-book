import Header from './container/Header';
import Discover from './container/Discover';
import Drawer from './base/Drawer';
import { useState } from 'react';
import styles from './styles/app.module.css';

export default function App() {
    const [menuOpen, setMenuOpen] = useState(false);

    function handleClick() {
        setMenuOpen(prevState => !prevState);
    }

    function handleClose() {
        setMenuOpen(false);
    }

    return (
        <div className={styles.app}>
            <Header onMenuClick={handleClick}/>
            <div className={styles.content}>
                <Drawer open={menuOpen} onClose={handleClose}/>
                <Discover />
            </div>
        </div>
    );
}