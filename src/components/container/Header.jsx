import Avatar from '../base/Avatar';
import Search from '../base/Search';
import styles from '../styles/header.module.css';

export default function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.navLinks}>
                <a href="">
                    <p>Home</p>
                </a>
            </div>
            <Search />
            <Avatar width='50px' src='./images/pfp.jpeg'/>
        </div>
    );
}