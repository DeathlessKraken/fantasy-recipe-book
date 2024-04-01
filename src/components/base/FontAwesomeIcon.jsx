export default function FontAwesomeIcon(props) {
    const { icon, style, onClick } = props;

    return (
        <i className={icon} style={style} onClick={onClick}></i>
    );
}