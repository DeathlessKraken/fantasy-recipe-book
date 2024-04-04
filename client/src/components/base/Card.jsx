import { useEffect, useState } from 'react';
import FontAwesomeIcon from './FontAwesomeIcon';
import styles from '../styles/card.module.css';

export default function Card(props) {
    const { 
        className,
        style,
        onCardClick,
        recipeData
    } = props;

    const [likes, setLikes] = useState(recipeData.like_count);

    //useeffect ... relies on external system behaviour. if if updates on
    //'like state' changes, does that mean, when its liked, it will update the count from the server, not just add 1?
    

    function handleLikeClick(event) {
        if(event.target.className.includes("fa-regular")) {
            event.target.className = "fa-solid fa-heart";
            setLikes(prevState => prevState + 1);
            
            //Post like to server
            fetch("/api/", {
                method: 'POST',
                body: JSON.stringify({action: 'like', post_id: recipeData.self_id}),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then((res) => res.json())
            .then((json) => {
                if(json.error) {
                    throw new Error(json.error.status + " " + json.error.message);
                } else {console.log(json)}
            })
            .catch(e => {
                console.error("Error liking post: ", e);
                setLikes(prevState => prevState - 1);
                event.target.className = "fa-regular fa-heart";
            });


        } else {
            event.target.className = "fa-regular fa-heart";
            
            setLikes(prevState => prevState - 1);
            //Post unlike to server
            fetch("/api/", {
                method: 'POST',
                body: JSON.stringify({action: 'unlike', post_id: recipeData.self_id}),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then((res) => res.json())
            .then((json) => {
                if(json.error) {
                    throw new Error(json.error.status + " " + json.error.message);
                } else {console.log(json)}
            })
            .catch(e => {
                console.error("Error unliking post: ", e);
                setLikes(prevState => prevState + 1);
                event.target.className = "fa-solid fa-heart";
            });
        }
    }

    function handleCommentClick() {
        onCardClick(recipeData.self_id);
    }

    return (
        <div 
            className={className ? className + " " + styles.card : styles.card}
            style={{...style}}
        >
            <div className={styles.cardClickArea} onClick={() => onCardClick(recipeData.self_id)}>
                <div className={styles.cardMedia}> 
                    <img src={recipeData.media && (recipeData.media[0] ? recipeData.media[0].media_ref : "")} />
                </div>
                <div className={styles.cardBody}>
                    <div className={styles.cardTitle}>
                        <p>{recipeData.title}</p>
                    </div>
                    <div className={styles.cardContent}>
                        <p>from {recipeData.fandom}</p>
                    </div>
                </div>
            </div>
            <div className={styles.actionContainer}>
                <div>
                    <FontAwesomeIcon icon="fa-regular fa-heart" onClick={handleLikeClick}/>
                    {likes || 0}
                </div>
                <div>
                    <FontAwesomeIcon icon="fa-solid fa-comment" onClick={handleCommentClick}/>
                    {recipeData.comment_count  || 0}
                </div>
                <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" />
            </div>
        </div>
    );
}