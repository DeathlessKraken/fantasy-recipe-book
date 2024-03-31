import styles from '../styles/drawer.module.css';

export default function Drawer(props) {
    const { open, onClose, options, style } = props;

    /* Options: [
        {
            name: '',
            href: '',
            style: {
                width: ''
                ...
            }
        }
    ]
    */

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
                    ...style,
                    left: open === false ? '-100%' : '0'
                }}
            >
                <div className={styles.drawerItems}>
                    {options && options.map((option, index) => {
                        return (
                            <a 
                                key={index}
                                name={option.name}
                                href={option.href} 
                                onClick={handleClick}
                                style={{...option.style}}
                            >
                                {option.name}
                            </a>
                        );
                    })}
                </div>
            </div>
        </>
    );
}