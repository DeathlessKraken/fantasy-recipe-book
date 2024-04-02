export default function FontAwesomeIcon(props) {
    const { icon, iconStyle, onClick } = props;

    return (
        <i className={icon} style={iconStyle} onClick={onClick}></i>
    );
}