import Card from '../base/Card';
import SortBy from '../base/SortBy';
import styles from '../styles/discover.module.css';

export default function Discover(props) {
    const { onCardClick } = props;

    const cards = [
        {
            id: 0,
            title: 'Recipe Title',
            content: 'from FANDOM_NAME',
            imgSrc: './images/soup.jpg',
            imgAlt: 'soup',
        },
        {
            id: 1,
            title: 'Meat',
            content: 'This is a good meat!',
            imgSrc: './images/meat.jpg',
            imgAlt: 'meat',
        },
        {
            id: 2,
            title: 'Butter Beer',
            content: 'This is a good butter beer! I drink long continentals on the weekends. I try not to make it habit, whoever.',
            imgSrc: './images/beer.jpg',
            imgAlt: 'butter beer',
        },
        {
            id: 3,
            title: 'Beer two',
            content: 'This is a good beer!',
            imgSrc: './images/beer2.jpg',
            imgAlt: 'beer two',
        },
        {
            id: 4,
            title: 'Bread',
            content: 'This is a good butter bread! I drink long continentals on the weekends. I try not to make it habit, whoever.',
            imgSrc: './images/bread.jpg',
            imgAlt: 'butter bread',
        },
        {
            id: 5,
            title: 'Butter Beer',
            content: 'This is a good butter beer! Just a little more. I nan nani n long  oh god damn on the weekends. I try not to make it habit, whoever.',
            imgSrc: './images/beer3.jpg',
            imgAlt: 'butter beer3',
        }         
    ];

    function handleClick(recipeId) {
        onCardClick(recipeId);
    }

    return (
        <div className={styles.discoverContainer}>
            <div className={styles.discoverHeader}>
                <p>Discover</p>
                <SortBy 
                    name='discoverSort'
                    options={[
                        'Popular',
                        'Latest'
                    ]}
                />
            </div>
            <div className={styles.discoverItems}>
                {
                    cards.map((card, index) => {
                        return (
                            <Card 
                                key={index} 
                                id={card.id}
                                imgSrc={card.imgSrc}
                                title={card.title}
                                content={card.content}
                                onCardClick={handleClick}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
}