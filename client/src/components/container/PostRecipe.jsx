import { useState, useEffect } from 'react';
import FontAwesomeIcon from '../base/FontAwesomeIcon';
import styles from '../styles/postrecipe.module.css';
import PostModal from './PostModal';

export default function PostRecipe(props) {
    const { onReturnClick, onPost } = props;
    const [showPostModal, setShowPostModal] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [inputs, setInputs] = useState({
        title: '',                  //21 Char limit. Maybe update on account of card size.
        fandom: 'none',                 //50 Char limit. 
        fandom_media_type: 'none',
        is_personal: false,
        original_post_ref: '',
        prep_time_mins: 0,
        cook_time_mins: 0,
        servings: 0,
        instructions: '',
        ingredients: {              //Initially render one blank ingredient to prompt entry.
            ingredient1: '',
        },
    });

    function scrollTopSetError(message) {
        //funciton box
        console.log("scroll top set error: ", message);
    }

    function isGoodLink(link) {
        //funciton box
        //testing for now, as long as link EXISTS
        //hmmm bad links are just posted raw on websites all the time... job for moderator
        return link.length > 11;
    }

    async function handleSubmit(event) {
        //Remember to ONLY SUBMIT IF ALL REQUIRED FIELDS filled, 
        //and at least 1 instruction and 1 ingredient.
        //Also think about 'sanitizing' data before posting to db... (SANITIZE SERVER SIDE - SEND SUCCESS/FAILURE)
        //Tell app to post data to api.

        //Title length must be at least 3 characters
        if(inputs.title.length < 3) {
            scrollTopSetError("Title must be 3 characters or longer.");
        } else if (inputs.fandom_media_type === 'none' && inputs.fandom !== 'none') {
            scrollTopSetError("You must select a media type if you enter a fandom.");
        } else if (!inputs.is_personal && !isGoodLink(inputs.original_post_ref)) {
            scrollTopSetError("You must have a working link if this is not your own recipe.");
        } else if (inputs.instructions.length < 3) {
            scrollTopSetError("You must have instructions with at least 3 characters.");
        } else if (inputs.prep_time_mins < 1) {
            scrollTopSetError("You must enter a preparation time.");
        } else if (inputs.cook_time_mins < 1) {
            scrollTopSetError("You must enter a cooking time.");
        } else if (inputs.servings < 1) {
            scrollTopSetError("You must enter a serving amount.");
        } else if (inputs.ingredients.ingredient1.length < 3) {
            scrollTopSetError("You must have one ingredient with 3 characters.");
        } else {
            //Since post button was clicked, post is published.
            const postData = inputs;

            setShowPostModal(true);
            let result = '';
            try {
                result = await onPost(postData);
            } catch (error) {
                console.error(error.message);
                result = error.message;
            }
            setShowPostModal(false);
            
            if(typeof(result) === 'string') {
                scrollTopSetError(result);
            } else {
                //If not string, result is object.
                //Post good all around, load up new post for viewing.
                onReturnClick(result);
                console.log("Good Post. Loading...");
            }     

            event.preventDefault(); //Refresh?? Probably not.
        }
    }

    function handleChange(event) {
        if (event.target.type === 'checkbox') {
            setInputs(prevState => {
                return ({
                    ...prevState,
                    [event.target.name]: event.target.checked
                });
            });
        } else if ((event.target.name).includes('ingredient')) {
            setInputs(prevState => {
                return ({
                    ...prevState,
                    ingredients: {
                        ...prevState.ingredients,
                        [event.target.name]: event.target.value
                    }
                });
            });
        } else if ((event.target.name).includes('image')) {
            setInputs(prevState => {
                return ({
                    ...prevState,
                    images: {
                        ...prevState.images,
                        [event.target.name]: event.target.value
                    }
                });
            });
        } else {
            setInputs(prevState => {
                return ({
                    ...prevState,
                    [event.target.name]: event.target.value
                });
            });
        }
    }

    function handleAddClick(type, stepIndex) {
        //stepIndex refers to the step that was clicked. example, add button clicked on step 3, stepIndex is 3.
        //Adds new blank step to instructions, to be rendered statefully through mapping 
        //input.instructions keys to inputs

        if (type === 'instruction') {
            setInputs(prevState => {
                return ({
                    ...prevState,
                    instructions: {
                        ...prevState.instructions,
                        ['step'+(stepIndex+1)]: ''
                    }
                });
            });
        } else if (type === 'ingredient') {
            setInputs(prevState => {
                return ({
                    ...prevState,
                    ingredients: {
                        ...prevState.ingredients,
                        ['ingredient'+(stepIndex+1)]: ''
                    }
                });
            });
        } else if (type === 'image') {
            setInputs(prevState => {
                return ({
                    ...prevState,
                    images: {
                        ...prevState.images,
                        ['image'+(stepIndex+1)]: ''
                    }
                });
            });
        } else {
            console.error("INVALID TYPE OF INPUT: ", type);
        }
    }

    function handleSubClick(type, stepIndex) {
        //Destructure post inputs, delete step from inner instruction object, replace and return.
        if (type === 'instruction') {
            setInputs(prevState => {
                const { instructions, ...rest } = prevState;
                delete instructions['step'+stepIndex];
                rest.instructions = instructions;
                return rest;
            });
        } else if (type === 'ingredient') {
            setInputs(prevState => {
                const { ingredients, ...rest } = prevState;
                delete ingredients['ingredient'+stepIndex];
                rest.ingredients = ingredients;
                return rest;
            });
        } else if (type === 'image') {
            setInputs(prevState => {
                const { images, ...rest } = prevState;
                delete images['image'+stepIndex];
                rest.images = images;
                return rest;
            });
        } else {
            console.error("INVALID TYPE OF INPUT: ", type);
        }
    }

    return (
        <div className={styles.postContainer}>
            { showPostModal && <PostModal /> }
            <FontAwesomeIcon icon="fa-solid fa-arrow-left" onClick={onReturnClick}/>
            <p>Post a New Recipe</p>
            <form name='recipe' method='POST' className={styles.post}>
                <div className={styles.smallInput}>
                    <label htmlFor="title">Title: </label>
                    <input 
                        type="text"
                        name='title'
                        id='title'
                        value={inputs.title}
                        required
                        onChange={handleChange}
                        maxLength={40}
                        size={30}
                        className={styles.textArea}
                        autoComplete="off"
                    />
                </div>

                <div className={styles.smallInput}>
                    <label htmlFor="fandom">Fandom: </label>
                    <select 
                        name='fandom' 
                        id='fandom' 
                        value={inputs.fandom}
                        onChange={handleChange}
                        className={styles.select}
                        autoComplete="off"
                    >
                        <option value='none'>None</option>
                        <option value='hp'>Harry Potter</option>
                        <option value='got'>Game of Thrones</option>
                        <option value='lotr'>Lord of the Rings</option>
                    </select>
                </div>

                <div className={styles.smallInput}>
                    <label htmlFor="fandom_media_type">Fandom Type: </label>
                    <select 
                        name='fandom_media_type' 
                        id='fandom_media_type' 
                        value={inputs.fandom_media_type}
                        onChange={handleChange}
                        className={styles.select}
                        autoComplete="off"
                    >
                        <option value='none'>None</option>
                        <option value='book'>Book</option>
                        <option value='movie'>Movie</option>
                        <option value='tv'>TV Show</option>
                    </select>
                </div>

                <div className={styles.checkBoxInput}>
                    <label htmlFor="is_personal">Is this a custom recipe? </label>
                    <input 
                        type="checkbox"
                        name='is_personal'
                        id='is_personal'
                        value={inputs.is_personal}
                        required
                        onChange={handleChange}
                        className={styles.checkBox}
                    />
                    <sup>Did you add some flare, and really make it own your own?</sup>
                </div>
                
                {!inputs.is_personal && 
                <div className={styles.smallInput}>
                    <label htmlFor="original_post_ref">Original Recipe Link: </label>
                    <input 
                        type="text"
                        name='original_post_ref'
                        id='original_post_ref'
                        onChange={handleChange}
                        maxLength={999}
                        size={30}
                        className={styles.textArea}
                        autoComplete="off"
                    />
                </div>}

                <div className={styles.smallInput}>
                    <label htmlFor="prep_time_mins">Prep Time in Minutes: </label>
                    <input 
                        type="number"
                        name='prep_time_mins'
                        id='prep_time_mins'
                        value={inputs.prep_time_mins}
                        max={999}
                        min={1}
                        onChange={handleChange}
                        className={styles.select}
                        autoComplete="off"
                    />
                </div>

                <div className={styles.smallInput}>
                    <label htmlFor="cook_time_mins">Cook Time in Minutes: </label>
                    <input 
                        type="number"
                        name='cook_time_mins'
                        id='cook_time_mins'
                        value={inputs.cook_time_mins}
                        max={999}
                        min={1}
                        onChange={handleChange}
                        className={styles.select}
                        autoComplete="off"
                    />
                </div>

                <div className={styles.smallInput}>
                    <label htmlFor="servings">Servings: </label>
                    <input 
                        type="number"
                        name='servings'
                        id='servings'
                        value={inputs.servings}
                        max={999}
                        min={1}
                        onChange={handleChange}
                        className={styles.select}
                        autoComplete="off"
                    />
                </div>

                <div className={styles.largeInput}>
                    <label htmlFor="instructions">Instructions: </label>
                    <textarea
                        name='instructions'
                        id='instructions'
                        value={inputs.instructions}
                        onChange={handleChange}
                        placeholder='How do you prepare this fine recipe?'
                        rows={5}
                        maxLength={5000}
                        className={styles.textArea}
                    ></textarea>
                </div>

                

                <div className={styles.ingredients}>

                    {Object.keys(inputs.ingredients).map((key, index, array) => {
                        return (
                            <div key={'ingredient'+(index+1)}>
                                <label htmlFor={'ingredient'+(index+1)}>Ingredient {index+1} </label>
                                <textarea
                                    key={index}
                                    name={'ingredient'+(index+1)}
                                    id={'ingredient'+(index+1)}
                                    value={inputs.ingredients['ingredient'+(index+1)]}
                                    onChange={handleChange}
                                    placeholder={(index % 4)===0 ? "Don't forget the quantity!" : undefined}
                                    rows={2}
                                    cols={50}
                                    maxLength={200}
                                    className={styles.ingredient}
                                ></textarea>
                                <div className={styles.buttons}>
                                    {index === array.length-1 && <FontAwesomeIcon icon="fa-solid fa-plus" onClick={() => handleAddClick('ingredient', index+1)}/>}
                                    {index > 0 && (index === array.length-1 && <FontAwesomeIcon icon="fa-solid fa-minus" onClick={() => handleSubClick('ingredient', index+1)}/>)}
                                </div>
                            </div>
                        );
                    })}

                </div>
            </form>
            <button className={styles.sendButton} type="submit" title="Post Recipe" name="send" onClick={handleSubmit}>
                Post Recipe
            </button>
        </div>
    );
}

/*

<div className={styles.images}>
                    <p>Images limited to 4 per post.</p>
                    {Object.keys(inputs.images).map((key, index, array) => {
                        return (
                            <div key={'image'+(index+1)}>
                                <label htmlFor={'image'+(index+1)}>Image {index+1} </label>
                                <textarea
                                    key={index}
                                    name={'image'+(index+1)}
                                    id={'image'+(index+1)}
                                    value={inputs.images['image'+(index+1)]}
                                    onChange={handleChange}
                                    placeholder={'Image '+(index+1)}
                                    rows={2}
                                    cols={50}
                                    maxLength={200}
                                    className={styles.image}
                                ></textarea>
                                <div className={styles.buttons}>
                                    {index < 3 && (index === array.length-1 && <FontAwesomeIcon icon="fa-solid fa-plus" onClick={() => handleAddClick('image', index+1)}/>)}
                                    {index > 0 && (index === array.length-1 && <FontAwesomeIcon icon="fa-solid fa-minus" onClick={() => handleSubClick('image', index+1)}/>)}
                                </div>
                            </div>
                        );
                    })}

                </div>
*/