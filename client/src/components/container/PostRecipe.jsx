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
        is_personal: '',
        original_post: '',
        allergens: '',
        description: '',
        instructions: {},
        ingredients: {},
        images: {},
        is_published: false,
    });

    function handleSubmit(event) {
        //Tell app to post data to api.

        event.preventDefault(); //Refresh?? Probably not.
    }

    function handleChange(event) {
        setInputs(prevState => {
            return ({
                ...prevState,
                [event.target.name]: event.target.value
            });
        });
    }

    return (
        <div className={styles.postContainer}>
            <FontAwesomeIcon icon="fa-solid fa-arrow-left" onClick={onReturnClick}/>
            <p>Post a New Recipe</p>
            <form name='recipe' method='POST' onSubmit={handleSubmit}>
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
                        required 
                        onChange={handleChange}
                        className={styles.textArea}
                        autoComplete="off"
                    >
                        <option value='hp'>Harry Potter</option>
                        <option value='got'>Game of Thrones</option>
                        <option value='lotr'>Lord of the Rings</option>
                    </select>
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
            </form>
            <button className={styles.sendButton} type="submit" title="Send" name="send">
                Post Recipe
            </button>
        </div>
    );
}