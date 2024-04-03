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
                                id={recipe.self_id}
                                imgSrc={recipe.images && recipe.images.image1 ? recipe.images.image1 : ""}
                                title={recipe.title}
                                content={recipe.fandom}
                                likes={recipe.like_count}
                                comments={recipe.comment_count}
                                onCardClick={handleClick}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
}