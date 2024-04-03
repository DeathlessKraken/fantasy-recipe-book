import Card from '../base/Card';
import SortBy from '../base/SortBy';
import styles from '../styles/discover.module.css';

export default function Discover(props) {
    const { apiData, onCardClick } = props;

    function handleClick(recipeId) {
        onCardClick(recipeId);
    }

    return (
        <div className={styles.discoverContainer}>
            <div className={styles.discoverHeader}>
                <p>Discover</p>
                <SortBy 
                    name='discoverSort'
                    options={[
                        'Popular',
                        'Latest'
                    ]}
                />
            </div>
            <div className={styles.discoverItems}>
                {
                    apiData.map((recipe, index) => {
                        return (
                            <Card 
                                key={index} 
                                recipeData={recipe}
                                onCardClick={handleClick}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
}