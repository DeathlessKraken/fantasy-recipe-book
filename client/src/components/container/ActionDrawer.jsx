import Drawer from '../base/Drawer';

export default function ActionDrawer(props) {
    const { onActionClick } = props;

    const optionStyle = {
        backgroundColor: '#73392D',
        color: '#FFFFFF',
    };

    const selectorStyles = {
        hoverStyle: {
            backgroundColor: '#4E271F',
        },
        activeStyle: {
            backgroundColor: '#A85442',
        }
    };

    const options = [
        {
            name: 'Home',
            ...selectorStyles,
            style: optionStyle,
        },
        {
            name: 'Post Recipe',
            ...selectorStyles,
            style: optionStyle,
        },
        {
            name: 'Random Recipe',
            ...selectorStyles,
            style: optionStyle,
        },
    ];

    const icons = [
        "fa-solid fa-house",
        "fa-solid fa-plus",
        "fa-solid fa-dice"
    ];

    function handleClose(event) {
        onActionClick(event);
    }

    return (
        <Drawer 
            open={true} 
            onClose={handleClose}
            style={{
                width: '15vw',
                backgroundColor: 'var(--bg-color2)'
            }}
            options={options}
            icons={icons}
        >
        </Drawer>
    );
}