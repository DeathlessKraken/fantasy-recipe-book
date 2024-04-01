import Avatar from '../base/Avatar';
import Search from '../base/Search';
//import FontAwesomeIcon from '../base/FontAwesomeIcon';
import styles from '../styles/header.module.css';

export default function Header(props) {
    const { onMenuClick } = props;
    
    //<FontAwesomeIcon icon="fa-solid fa-bars"/>

    return (
        <div className={styles.header}>
            <div></div>
            <Search />
            <Avatar width='50px' src='./images/pfp.jpeg'/>
        </div>
    );
}