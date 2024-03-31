import styles from '../styles/sortby.module.css';

export default function SortBy(props) {
    const { name, options } = props;

    return (
        <div className={styles.sortbyContainer}>
            <label htmlFor={name}>Sort By: </label>
            <select name={name} className={styles.sortby}>
                { options.map((item, index) => {
                    return (
                        <option key={index} value={item}>{item}</option>
                    );
                }) }
            </select>
        </div>
    );
}