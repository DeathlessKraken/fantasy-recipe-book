import Header from './container/Header';
import Discover from './container/Discover';
import styles from './styles/app.module.css';
import ActionDrawer from './container/ActionDrawer';
import Recipe from './container/Recipe';
import DiscoverSkeleton from './container/skeletons/DiscoverSkeleton';
import { useEffect, useState } from 'react';

export default function App() {
    //For now, due to application size, the browser loads ALL recipes from backend API.
    //As app scales, load in NEW content dynamically.

    const [loading, setLoading] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [savedScrollPosition, setSavedScrollPosition] = useState(0);
    const [apiData, setApiData] = useState([{}]);
    const [recipeId, setRecipeId] = useState(-1);

    function updateScroll() {
        const position = window.scrollY;
        setScrollPosition(position);
    }

    useEffect(() => {
        setLoading(true);

        try{
            fetch("/api")
            .then(res => res.json())
            .then(data => setApiData(data))
        } catch (e) {
            console.log("Error retrieving api data: ", e);
        }

        setLoading(false);
        
        window.addEventListener("scroll", updateScroll);

        return () => {
            window.removeEventListener("scroll", updateScroll);
        }
    }, []);

    function handleRecipeClick() { //function does recieve recipeId as argument, FYI
        setRecipeId(-1);
        window.scrollTo(0, savedScrollPosition);
    }

    function handleCardClick(recipeId) {
        setSavedScrollPosition(scrollPosition);
        setRecipeId(recipeId);
    }

    return (
        <div className={styles.app} onScroll={() => console.log("SCROLLED")}>
            <Header />
            <div className={styles.content}>
                <div className={styles.gridItemDrawer}>
                    <ActionDrawer />
                </div>
                <div className={styles.gridItemDiscover}>

                    {loading && <DiscoverSkeleton />}

                    {recipeId < 0 ? <Discover apiData={apiData} onCardClick={handleCardClick}/> : 
                        <Recipe recipe={apiData[recipeId]} onRecipeClick={handleRecipeClick}/>
                    }

                </div>
            </div>
        </div>
    );
}