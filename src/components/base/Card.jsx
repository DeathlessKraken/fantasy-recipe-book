import FontAwesomeIcon from './FontAwesomeIcon';
import styles from '../styles/card.module.css';

export default function Card(props) {
    const { 
        className,
        style,
        imgSrc,
        imgAlt,
        title,
        content
    } = props;

    return (
        <div 
            className={className ? className + " " + styles.card : styles.card}
            style={{...style}}
        >
            <div className={styles.cardMedia}> 
                <img src={imgSrc} alt={imgAlt} />
            </div>
            <div className={styles.cardBody}>
                <div className={styles.cardTitle}>
                    <p>{title}</p>
                </div>
                <div className={styles.cardContent}>
                    <p>{content}</p>
                </div>
            </div>
            <div className={styles.actionContainer}>
                <FontAwesomeIcon icon="fa-regular fa-heart" />
                <FontAwesomeIcon icon="fa-solid fa-comment" />
                <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" />
            </div>
        </div>
    );
}