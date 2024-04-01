import Header from './container/Header';
import Discover from './container/Discover';
import styles from './styles/app.module.css';
import ActionDrawer from './container/ActionDrawer';
import Recipe from './container/Recipe';
import { useState } from 'react';

export default function App() {
    const [recipeId, setRecipeId] = useState(-1);

    function handleRecipeClick(recipeId) {
        setRecipeId(-1);
    }

    function handleCardClick(recipeId) {
        setRecipeId(recipeId);
    }

    return (
        <div className={styles.app}>
            <Header />
            <div className={styles.content}>
                <div className={styles.gridItemDrawer}>
                    <ActionDrawer />
                </div>
                <div className={styles.gridItemDiscover}>

                    {recipeId < 0 ? <Discover onCardClick={handleCardClick}/> : 
                        <Recipe recipeId={recipeId} onRecipeClick={handleRecipeClick}/>
                    }

                </div>
            </div>
        </div>
    );
}