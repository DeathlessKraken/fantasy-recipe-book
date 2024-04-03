import { useEffect } from 'react';
import FontAwesomeIcon from '../base/FontAwesomeIcon';
import styles from '../styles/recipe.module.css';

export default function Recipe(props) {
    const { recipe, onRecipeClick } = props;

    const fandomTable = {
        "hp": "Harry Potter",
        "got": "Game of Thrones",
        "lotr": "Lord of the Rings"
    };

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    function handleClick(id) {
        onRecipeClick(id);
    }

    //React doesn't like functions being returned inside HTML elements.
    const publishDate = new Date(recipe.date_published).toLocaleDateString();
    const editDate = new Date(recipe.date_published).toLocaleDateString();

    return (
        <div className={styles.recipeContainer}>
            <FontAwesomeIcon icon="fa-solid fa-arrow-left" onClick={() => handleClick(recipe.id)}/>
            <div className={styles.recipeHeader}>
                <p>{recipe.title}</p>
                <p>Posted by {recipe.author_id} on {publishDate} {editDate && <i>&#91;Last Edited on {editDate}&#93;</i>}</p>
            </div>
            <div className={styles.recipe}>
                <div className={styles.recipeInfo}>
                    {recipe.fandom !== 'none' && <p>From the world of: {fandomTable[recipe.fandom]}</p>}
                    <p className={styles.allergens}>Warning: This recipe may contain &#91;{recipe.allergens}&#93;</p>
                </div>
                
                <p className={styles.description}>{recipe.description}</p>
                
                <div className={styles.ingredients}>
                    <p>Ingredients: </p>
                    {Object.values(recipe.ingredients).map((item, index) => {
                        return (
                        <p 
                            key={index}
                        >
                            {item}
                        </p>);
                    })}
                </div>

                <div className={styles.instructions}>
                    {Object.values(recipe.instructions).map((item, index) => {
                        return (
                        <div key={index}>
                            <p>Step {index+1}.</p>
                            <p 
                            >
                                {item}
                            </p>
                        </div>);
                    })}
                </div> 

                <p>{recipe.original_post !== "" && recipe.original_post}</p>
            </div>
            <div className={styles.comments}>
                <div className={styles.socialButtons}>
                    <p><FontAwesomeIcon icon="fa-regular fa-heart" /> {recipe.like_count}</p>
                    <p><FontAwesomeIcon icon="fa-solid fa-comment" /> {recipe.comment_count}</p>
                </div>
            </div>
        </div>
    );
}