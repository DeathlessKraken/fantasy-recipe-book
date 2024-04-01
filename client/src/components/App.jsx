import Header from './container/Header';
import Discover from './container/Discover';
import styles from './styles/app.module.css';
import ActionDrawer from './container/ActionDrawer';
import Recipe from './container/Recipe';
import { useEffect, useState } from 'react';

export default function App() {
    const [apiData, setApiData] = useState([{}]);
    const [recipeId, setRecipeId] = useState(-1);

    useEffect(() => {
        fetch("/api")
        .then(res => res.json())
        .then(data => setApiData(data))
    }, []);


    function handleRecipeClick() { //function does recieve recipeId FYI
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

                    {   !apiData ? <h1>Loading...</h1> :
                            recipeId < 0 ? <Discover apiData={apiData} onCardClick={handleCardClick}/> : 
                                <Recipe recipe={apiData[recipeId]} onRecipeClick={handleRecipeClick}/>
                    }

                </div>
            </div>
        </div>
    );
}