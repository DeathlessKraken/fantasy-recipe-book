import Header from './container/Header';
import Discover from './container/Discover';
import styles from './styles/app.module.css';
import ActionDrawer from './container/ActionDrawer';
import Recipe from './container/Recipe';
import DiscoverSkeleton from './container/skeletons/DiscoverSkeleton';
import { useEffect, useState } from 'react';
import PostRecipe from './container/PostRecipe';

export default function App() {
    //For now, due to application size, the browser loads ALL recipes from backend API.
    //As app scales, load in NEW content dynamically.

    const [loading, setLoading] = useState(true);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [savedScrollPosition, setSavedScrollPosition] = useState(0); //Does this NEED to be a state?
    const [apiData, setApiData] = useState([{}]);
    const [recipeId, setRecipeId] = useState(-1);
    const [isPosting, setIsPosting] = useState(false);

    function updateScroll() {
        const position = window.scrollY;
        setScrollPosition(position);
    }

    useEffect(() => {
        fetch("/api")
        .then(res => res.json())
        .catch(e => {
            console.log("Error RETRIEVING API data: ", e);
        })
        .then(data => setApiData(data))
        .catch(e => {
            console.log("Error PARSING API data: ", e);
        })

        setLoading(false);
        
        window.addEventListener("scroll", updateScroll);

        return () => {
            window.removeEventListener("scroll", updateScroll);
        }
    }, []);

    function handleReturnClick() { //function does recieve recipeId as argument, FYI
        setIsPosting(false);
        setRecipeId(-1);
        window.scrollTo(0, savedScrollPosition);
    }

    function handleCardClick(recipeId) {
        setSavedScrollPosition(scrollPosition);
        setRecipeId(recipeId);
    }

    function handleActionClick(event) {
        const action = event.target.name;

        if (action === 'Post Recipe') {
            setIsPosting(true);
        } else if (action === 'Home') {
            setSavedScrollPosition(0); //May need to revisit. Supposed to scroll to top on 'Home' button click.
            setScrollPosition(0);
            handleReturnClick();
        } else if (action === 'Random Recipe') {
            setRecipeId(getRandomRecipe());
        } else {
            console.error('Cannot perform action: ', action);
        }
    }

    function getRandomRecipe() {
        return Math.floor(Math.random() * (apiData.length));
    }

    return (
        <div className={styles.app} onScroll={() => console.log("SCROLLED")}>
            <Header />
            <div className={styles.content}>
                <div className={styles.gridItemDrawer}>
                    <ActionDrawer onActionClick={handleActionClick}/>
                </div>
                <div className={styles.gridItemDiscover}>

                    {loading && <DiscoverSkeleton />}

                    {isPosting && <PostRecipe onReturnClick={handleReturnClick} />}

                    {apiData && (!isPosting && (recipeId < 0 ? <Discover apiData={apiData} onCardClick={handleCardClick}/> : 
                        <Recipe recipe={apiData[recipeId]} onRecipeClick={handleReturnClick}/>))
                    }

                </div>
            </div>
        </div>
    );
}