import Header from './container/Header';
import Discover from './container/Discover';
import styles from './styles/app.module.css';
import ActionDrawer from './container/ActionDrawer';

export default function App() {
    
    function handleClick() {
    }

    return (
        <div className={styles.app}>
            <Header onMenuClick={handleClick}/>
            <div className={styles.content}>
                <div className={styles.gridItemDrawer}>
                    <ActionDrawer />
                </div>
                <div className={styles.gridItemDiscover}>
                    <Discover />
                </div>
            </div>
        </div>
    );
}