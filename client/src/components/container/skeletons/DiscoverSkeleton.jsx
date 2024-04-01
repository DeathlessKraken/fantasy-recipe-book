import Loader from '../../base/Loader';
import styles from '../../styles/discoverskeleton.module.css';

export default function DiscoverSkeleton() {
    const numSkeletonCards = 9;

    function generateSkeletonCards(numCards) {
        const cards = [];

        for (let i = 0; i < numCards; i++) {
            cards.push(
                <div className={styles.cardSkeleton}>
                    <Loader />
                </div>
            );
        }

        return cards; //Returns list???
    }

    return (
        <div className={styles.discoverContainer}>
            <div className={styles.discoverHeader}>
                <p>Discover</p>
                <div className={styles.sortbySkeleton}/>
            </div>
            <div className={styles.discoverItems}>
                { generateSkeletonCards(numSkeletonCards).map(item => item) }
            </div>
        </div>
    );
}