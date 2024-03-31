import styles from '../styles/card.module.css';

export default function Card(props) {
    const { 
        children, 
        className,
        width,
        height,
        style
    } = props;

    return (
        <div 
            className={className + " " + styles.card}
            style={{width: width, height: height, ...style}}
        >
            <div className={styles.cardMedia}> 

            </div>
            { children }
        </div>
    );
}