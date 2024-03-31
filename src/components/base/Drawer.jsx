import styles from '../styles/drawer.module.css';

export default function Drawer(props) {
    const { open, onClose } = props;

    function handleClick() {
        onClose();
    }

    return (
        <>
            <div 
                className={styles.drawerOverlay} 
                hidden={!open}
                onClick={handleClick}
            ></div>
            <div 
                className={styles.menuDrawer} 
                style={{
                    left: open === false ? '-100%' : '0'
                }}
            >
                <div className={styles.drawerItems}>
                    <a href="#" name='home' onClick={handleClick}>Home</a>
                    <a href="#" name='random' onClick={handleClick}>Post Recipe</a>
                    <a href="#" name='random' onClick={handleClick}>Random Recipe</a>
                </div>
            </div>
        </>
    );
}