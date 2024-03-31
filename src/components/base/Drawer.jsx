import styles from '../styles/drawer.module.css';

export default function Drawer(props) {
    const { open, onClose, options, style, overlay } = props;

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
                hidden={overlay ? !open : true}
                onClick={handleClick}
                style={{
                    backgroundColor: !overlay && 'transparent'
                }}
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