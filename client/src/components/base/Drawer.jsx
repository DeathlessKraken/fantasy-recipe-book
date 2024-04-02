import { useState } from 'react';
import FontAwesomeIcon from './FontAwesomeIcon';
import styles from '../styles/drawer.module.css';

/*
Modular drawer function for later use.
The biggest challenge in creating this plug n play drawer was being able to 
override the base style provided in 'drawer.module.css'
Props:
children - HTML Element(s) - Children of this element
open - bool - State of the drawer. Defaults TRUE.
onClose - function - drawer callback function when closed. executed when overlay is clicked(if enabled), or drawer option is clicked.
options - object - An array of each option object. Details below on option object structure.
overlay - bool - Toggles overlay on entire screen behind drawer.
style - object - inline style props for jsx


Defaults not working for hoverstyle and active style, will need to provide through options object.
Options: [
        {
            name: '',
            href: '',
            hoverStyle: {
                width: ''
                ...
            },
            activeStyle: {
                width: ''
                ...
            },
            style: {
                width: ''
                ...
            },
        }
    ]
*/

export default function Drawer(props) {
    const { children, open = true, onClose, options, style, overlay, icons, iconStyle } = props;

    const [currentButton, setCurrentButton] = useState({
        name: '',
        type: 'none'
    });

    function handleClick(event) {
        onClose(event);
    }

    function handleButton(event) {
        setCurrentButton({
            name: event.target.name,
            type: event.type
        });
    }

    //Generate style object based on current button state.
    //Defaults to drawer.module.css if style not provided.
    function generateStyle(option) {
        if(option.name === currentButton.name) {
            if(currentButton.type === 'mousedown') {
                return {...option.style, ...option.activeStyle}
            }
            else if(currentButton.type === 'mouseup') {
                return {...option.style, ...option.hoverStyle}
            }
            else if(currentButton.type === 'mouseenter') {
                return {...option.style, ...option.hoverStyle}
            }
        }
        
        return {...option.style};
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
                            <button 
                                key={index}
                                name={option.name}
                                onClick={handleClick}
                                onMouseDown={handleButton}
                                onMouseUp={handleButton}
                                onMouseEnter={handleButton}
                                onMouseLeave={handleButton}
                                style={generateStyle(option)}
                            >
                                {icons && <FontAwesomeIcon icon={icons[index]} iconStyle={iconStyle}/>}
                                {option.name}
                            </button>
                        );
                    })}
                </div>
                { children }
            </div>
        </>
    );
}