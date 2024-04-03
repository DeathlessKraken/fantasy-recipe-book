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
    const [currentUserToken, setCurrentUserToken] = useState("sdfasfasdfadfa");

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

    function handleReturnClick(recipeId) { //function does recieve recipeId as argument, FYI
        setIsPosting(false);
        if(recipeId) {
            setRecipeId(recipeId);
        } else {
            setRecipeId(-1);
        }
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

    async function getUserData(initialData) {
        initialData.author_id = currentUserToken;

        return initialData
    }

    //Need to have visual post uploading procedure
    async function handlePost(postData) {
        postData = await getUserData(postData);
        let errorMessage = "";
        
        await fetch("/api/", {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res) => res.json())
        .then((json) => {
            if(json.error) {
                throw new Error(json.error.status + " " + json.error.message);
            } else {
                console.log('DATA FROM POST RESPONSE: ', json)
            }
            //Returns new recipe id
            //Data return needs to include new recipe id, so post component can load up new post.
        })
        .catch(e => {errorMessage = e.message});

        return errorMessage;
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

                    {isPosting && <PostRecipe onReturnClick={handleReturnClick} onPost={handlePost}/>}

                    {apiData && (!isPosting && (recipeId < 0 ? <Discover apiData={apiData} onCardClick={handleCardClick}/> : 
                        <Recipe recipe={apiData[recipeId]} onRecipeClick={handleReturnClick}/>))
                    }

                </div>
            </div>
        </div>
    );
}