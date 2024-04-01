export default function FontAwesomeIcon(props) {
    const { icon, style } = props;

    return (
        <i className={icon} style={style} ></i>
    );
}