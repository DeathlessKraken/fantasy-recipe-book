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

    const [pageState, setPageState] = useState({
        page: 'home',
        scrollPosition: 0,
        savedScrollPosition: 0,
        apiData: [],
        loading: true,
        currentUserToken: 'TestUser4',
        loadedRecipe: {}
    });

    function updateScroll() {
        const position = window.scrollY;
        setPageState(prevState => {
            return ({
                ...prevState,
                scrollPosition: position
            });
        });
    }

    useEffect(() => {
        
        fetch("/api")
        .then(res => res.json())
        .catch(e => {
            console.error("Error RETRIEVING API data: ", e);
        })
        .then(data => {
            setPageState(prevState => {
                return ({
                    ...prevState,
                    apiData: data
                });
            });
        })
        .catch(e => {
            console.error("Error PARSING API data: ", e);
        })

        setPageState(prevState => {
            return ({
                ...prevState,
                loading: false
            });
        });
        
        window.addEventListener("scroll", updateScroll);

        return () => {
            window.removeEventListener("scroll", updateScroll);
        }
    }, []);

    function handleReturnClick(scroll) { //function does recieve recipeId as argument, FYI
        setPageState(prevState => {
            return ({
                ...prevState,
                page: 'home',
            });
        });
        
        //Little janky, but if passed arugment is a number, use that as scroll position instead.
        if(typeof(scroll) === 'number') {
            setTimeout(() => window.scrollTo(0, scroll), 2);
        } else {
            setTimeout(() => window.scrollTo(0, pageState.savedScrollPosition), 2);
        }
    }

    function handleCardClick(recipeId) {
        setPageState(prevState => {
            return ({
                ...prevState,
                page: 'recipe',
                savedScrollPosition: pageState.scrollPosition,
                loadedRecipe: {...getRecipe(recipeId)}
            });
        });
    }

    function handleActionClick(event) {
        const action = event.target.name;

        if (action === 'Post Recipe') {
            setPageState(prevState => {
                return ({
                    ...prevState,
                    page: 'post'
                });
            });
        } else if (action === 'Home') {
            setPageState(prevState => {
                return ({
                    ...prevState,
                    savedScrollPosition: 0,
                    scrollPosition: 0,
                });
            });
            handleReturnClick(0);
        } else if (action === 'Random Recipe') {
            setPageState(prevState => {
                return ({
                    ...prevState,
                    recipeId: getRandomRecipe()
                });
            });
        } else {
            console.error('Cannot perform action: ', action);
        }
    }

    function getRandomRecipe() {
        return Math.floor(Math.random() * (pageState.apiData.length));
    }

    async function getUserData(initialData) {
        initialData.author_id = pageState.currentUserToken;

        return initialData;
    }

    //Need to have visual post uploading procedure
    async function handlePost(postData) {
        postData = await getUserData(postData);
        let result = "";
        
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
                result = json;
            }
            //Returns new recipe id
            //Data return needs to include new recipe id, so post component can load up new post.
        })
        .catch(e => {result = e.message});

        return result;
    }

    function getRecipe(recipeId) {
        if (typeof(recipeId) === 'number' && recipeId < 0) {
            return undefined;
        } else {
            return pageState.apiData.filter(recipe => recipe.self_id === recipeId)[0];
        }
    }

    return (
        <div className={styles.app} onScroll={() => console.log("SCROLLED")}>
            <Header />
            <div className={styles.content}>
                <div className={styles.gridItemDrawer}>
                    <ActionDrawer onActionClick={handleActionClick}/>
                </div>
                <div className={styles.gridItemDiscover}>

                    {pageState.loading && <DiscoverSkeleton />}
                    {pageState.page === 'home' && <Discover apiData={pageState.apiData} onCardClick={handleCardClick}/>}
                    {pageState.page === 'post' && <PostRecipe onReturnClick={handleReturnClick} onPost={handlePost}/>}
                    {pageState.page === 'recipe' && <Recipe recipe={pageState.loadedRecipe} onRecipeClick={handleReturnClick}/>}

                </div>
            </div>
        </div>
    );
}

/*

{loading && <DiscoverSkeleton />}

                    {isPosting && <PostRecipe onReturnClick={handleReturnClick} onPost={handlePost}/>}

                    {apiData && (!isPosting && (recipeId < 0 ? <Discover apiData={apiData} onCardClick={handleCardClick}/> :
                        displayDetailRecipe(recipeId)
                    ))}



const [loading, setLoading] = useState(true);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [savedScrollPosition, setSavedScrollPosition] = useState(0); //Does this NEED to be a state?
    const [apiData, setApiData] = useState([{}]);
    const [recipeId, setRecipeId] = useState(-1);
    const [loadedRecipe, setLoadedRecipe] = useState({});
    const [isPosting, setIsPosting] = useState(false);
    const [currentUserToken, setCurrentUserToken] = useState("sdfasfasdfadfa");
*/