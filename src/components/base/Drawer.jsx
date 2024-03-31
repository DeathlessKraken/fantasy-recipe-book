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
                <div className={styles.closeButton} onClick={handleClick}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
                <div className={styles.drawerItems}>
                    <a href="#home" name='home' onClick={handleClick}>Home</a>
                    <a href="#projects" name='projects' onClick={handleClick}>Projects</a>
                    <a href="#experience" name='experience' onClick={handleClick}>Experience</a>
                    <a href="#contact" name='contact' onClick={handleClick}>Contact Me</a>
                </div>
            </div>
        </>
    );
}