import { useState, useEffect } from 'react';
import FontAwesomeIcon from '../base/FontAwesomeIcon';
import styles from '../styles/postrecipe.module.css';

export default function PostRecipe(props) {
    const { onReturnClick } = props;

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [inputs, setInputs] = useState({
        title: '',                  //21 Char limit. Maybe update on account of card size.
        fandom: '',                 //50 Char limit. 
        is_personal: false,
        original_post: '',
        allergens: '',
        description: '',
        instructions: {             //Initially render one blank instruction to prompt entry.
            step1: '',
        },
        ingredients: {              //Initially render one blank ingredient to prompt entry.
            new_ingredient: '',
        },
        images: {},
        is_published: false,
    });

    function handleSubmit(event) {
        //Remember to ONLY SUBMIT IF ALL REQUIRED FIELDS filled, 
        //and at least 1 instruction and 1 ingredient.
        //Tell app to post data to api.
        console.log(inputs);

        event.preventDefault(); //Refresh?? Probably not.
    }

    function handleChange(event) {
        if (event.target.type === 'checkbox') {
            setInputs(prevState => {
                return ({
                    ...prevState,
                    [event.target.name]: event.target.checked
                });
            });
        } else if ((event.target.name).includes('step')) {
            setInputs(prevState => {
                return ({
                    ...prevState,
                    instructions: {
                        ...prevState.instructions,
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

    function handleAddClick(stepIndex) {
        //stepIndex refers to the step that was clicked. example, add button clicked on step 3, stepIndex is 3.
        //Adds new blank step to instructions, to be rendered statefully through mapping 
        //input.instructions keys to inputs

        setInputs(prevState => {
            return ({
                ...prevState,
                instructions: {
                    ...prevState.instructions,
                    ['step'+(stepIndex+1)]: ''
                }
            });
        });
    }

    function handleSubClick(stepIndex) {
        //Destructure post inputs, delete step from inner instruction object, replace and return.
        setInputs(prevState => {
            const { instructions, ...rest } = prevState;
            delete instructions['step'+stepIndex];
            rest.instructions = instructions;
            return rest;
        });
    }

    return (
        <div className={styles.postContainer}>
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
                        maxLength={21}
                        size={15}
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
                        className={styles.textArea}
                        autoComplete="off"
                    >
                        <option value='hp'>Harry Potter</option>
                        <option value='got'>Game of Thrones</option>
                        <option value='lotr'>Lord of the Rings</option>
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
                </div>

                <div className={styles.smallInput}>
                    <label htmlFor="original_post">Original Recipe Link: </label>
                    <input 
                        type="text"
                        name='original_post'
                        id='original_post'
                        checked={inputs.is_personal}
                        onChange={handleChange}
                        maxLength={999}
                        size={25}
                        className={styles.textArea}
                        autoComplete="off"
                    />
                </div>

                <div className={styles.smallInput}>
                    <label htmlFor="allergens">List of Potential Allergens: </label>
                    <input 
                        type="text"
                        name='allergens'
                        id='allergens'
                        value={inputs.allergens}
                        onChange={handleChange}
                        maxLength={100}
                        size={25}
                        className={styles.textArea}
                        autoComplete="off"
                    />
                </div>

                <div className={styles.largeInput}>
                    <label htmlFor="description">Description: </label>
                    <textarea
                        name='description'
                        id='description'
                        value={inputs.description}
                        onChange={handleChange}
                        placeholder='description'
                        rows={5}
                        cols={50}
                        maxLength={500}
                        className={styles.textArea}
                    ></textarea>
                </div>

                <div className={styles.instructions}>

                    {Object.keys(inputs.instructions).map((key, index) => {
                        return (
                            <div key={'step'+(index+1)}>
                                <label htmlFor={'step'+(index+1)}>Step {index+1} </label>
                                <textarea
                                    key={index}
                                    name={'step'+(index+1)}
                                    id={'step'+(index+1)}
                                    value={inputs.instructions['step'+(index+1)]}
                                    onChange={handleChange}
                                    placeholder={'Step '+(index+1)}
                                    rows={2}
                                    cols={50}
                                    maxLength={200}
                                    className={styles.step}
                                ></textarea>
                                <FontAwesomeIcon icon="fa-solid fa-plus" onClick={() => handleAddClick(index+1)}/>
                                {index > 0 && <FontAwesomeIcon icon="fa-solid fa-minus" onClick={() => handleSubClick(index+1)}/>}
                            </div>
                        );
                    })}

                </div>
            </form>
            <button className={styles.sendButton} type="submit" title="Send" name="send" onClick={handleSubmit}>
                Post Recipe
            </button>
        </div>
    );
}