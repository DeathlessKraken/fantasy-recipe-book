import FontAwesomeIcon from '../base/FontAwesomeIcon';
import styles from '../styles/recipe.module.css';

export default function Recipe(props) {
    const { recipe, onRecipeClick } = props;

    function handleClick(id) {
        onRecipeClick(id);
    }

    return (
        <div className={styles.recipeContainer}>
            <FontAwesomeIcon icon="fa-solid fa-arrow-left" onClick={() => handleClick(recipe.id)}/>
            <p>{recipe.title}{" " + recipe.id}</p>
            <div className={styles.recipe}>
                <p>{recipe.description}</p>
                <p>{recipe.fandom}</p>
                <p>{recipe.instructions}</p>
                <p>{recipe.datePosted}</p>
                <p>{recipe.author}</p>
                <p>{recipe.source}</p>
            </div>
        </div>
    );
}