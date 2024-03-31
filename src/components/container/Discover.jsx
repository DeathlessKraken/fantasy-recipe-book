import Card from '../base/Card';
import styles from '../styles/discover.module.css';

export default function Discover() {
    const cards = ['Card', 'Card', 'Card', 'CarD', 'CAAD'];

    return (
        <div className={styles.discoverContainer}>
            <p>Discover</p>
            <div className={styles.discoverItems}>
                {
                    cards.map((card, index) => {
                        return (
                            <Card key={index}>{card}</Card>
                        );
                    })
                }
            </div>
        </div>
    );
}