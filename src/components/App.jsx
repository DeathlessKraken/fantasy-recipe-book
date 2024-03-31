import Header from './container/Header';
import Discover from './container/Discover';
import Drawer from './base/Drawer';
import CreateFAB from './base/CreateFAB';
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
            <CreateFAB />
            <div className={styles.content}>
                <div className={styles.gridItemDrawer}>
                    <Drawer open={menuOpen} onClose={handleClose}/>
                </div>
                <div className={styles.gridItemDiscover}>
                    <Discover />
                </div>
            </div>
        </div>
    );
}