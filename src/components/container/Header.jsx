import Avatar from '../base/Avatar';
import Search from '../base/Search';
import FontAwesomeIcon from '../base/FontAwesomeIcon';
import styles from '../styles/header.module.css';

export default function Header(props) {
    const { onMenuClick } = props;

    return (
        <div className={styles.header}>
            <div className={styles.navLinks} onClick={onMenuClick}>
                <FontAwesomeIcon icon="fa-solid fa-bars"/>
            </div>
            <Search />
            <Avatar width='50px' src='./images/pfp.jpeg'/>
        </div>
    );
}