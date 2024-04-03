import FontAwesomeIcon from './FontAwesomeIcon';
import styles from '../styles/card.module.css';

export default function Card(props) {
    const { 
        className,
        style,
        onCardClick,
        recipeData
    } = props;

    return (
        <div 
            className={className ? className + " " + styles.card : styles.card}
            style={{...style}}
        >
            <div className={styles.cardClickArea} onClick={() => onCardClick(recipeData.self_id)}>
                <div className={styles.cardMedia}> 
                    <img src={recipeData.images && (recipeData.images.image1 ? recipeData.images.image1 : "")} />
                </div>
                <div className={styles.cardBody}>
                    <div className={styles.cardTitle}>
                        <p>{recipeData.title}</p>
                    </div>
                    <div className={styles.cardContent}>
                        <p>from {recipeData.fandom}</p>
                    </div>
                </div>
            </div>
            <div className={styles.actionContainer}>
                <div>
                    <FontAwesomeIcon icon="fa-regular fa-heart" />
                    {recipeData.like_count || 0}
                </div>
                <div>
                    <FontAwesomeIcon icon="fa-solid fa-comment" />
                    {recipeData.comment_count  || 0}
                </div>
                <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" />
            </div>
        </div>
    );
}