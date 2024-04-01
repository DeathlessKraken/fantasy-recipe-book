import FontAwesomeIcon from '../base/FontAwesomeIcon';
import styles from '../styles/recipe.module.css';
//import GetRecipe from ...

export default function Recipe(props) {
    const { recipeId=0, onRecipeClick } = props;

    const currentRecipe = { // GetRecipe(recipeId)
        title: 'Recipe Title',
        description: 'This is recipe description. TEst for overflow/wrapping at some point...',
        fandom: 'Harry Potter',
        instructions: 'test for object format functionality?',
        datePosted: 'January 23 or January 31, 2021 if previous year',
        author: 'godzilla_crush', 
        source: 'Recipe credits @ ORIGINAL_AUTHOR'
    }

    function handleClick(id) {
        onRecipeClick(id);
    }

    return (
        <div className={styles.recipeContainer}>
            <FontAwesomeIcon icon="fa-solid fa-arrow-left" onClick={() => handleClick(recipeId)}/>
            <p>{currentRecipe.title}</p>
            <div className={styles.recipe}>
                <p>{currentRecipe.description}</p>
                <p>{currentRecipe.fandom}</p>
                <p>{currentRecipe.instructions}</p>
                <p>{currentRecipe.datePosted}</p>
                <p>{currentRecipe.author}</p>
                <p>{currentRecipe.source}</p>
            </div>
        </div>
    );
}