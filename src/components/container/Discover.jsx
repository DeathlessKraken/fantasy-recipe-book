import Card from '../base/Card';
import styles from '../styles/discover.module.css';

export default function Discover() {
    const cards = [
        {
            title: 'Soup',
            content: 'This is a good soup!',
            imgSrc: './images/soup.jpg',
            imgAlt: 'soup',
        },
        {
            title: 'Meat',
            content: 'This is a good meat!',
            imgSrc: './images/meat.jpg',
            imgAlt: 'meat',
        },
        {
            title: 'Butter Beer',
            content: 'This is a good butter beer! I drink long continentals on the weekends. I try not to make it habit, whoever.',
            imgSrc: './images/beer.jpg',
            imgAlt: 'butter beer',
        },
        {
            title: 'Beer two',
            content: 'This is a good beer!',
            imgSrc: './images/beer2.jpg',
            imgAlt: 'beer two',
        },
        {
            title: 'Bread',
            content: 'This is a good butter bread! I drink long continentals on the weekends. I try not to make it habit, whoever.',
            imgSrc: './images/bread.jpg',
            imgAlt: 'butter bread',
        },
        {
            title: 'Butter Beer',
            content: 'This is a good butter beer! Just a little more. I nan nani n long  oh god damn on the weekends. I try not to make it habit, whoever.',
            imgSrc: './images/beer3.jpg',
            imgAlt: 'butter beer3',
        }         
    ];

    return (
        <div className={styles.discoverContainer}>
            <p>Discover</p>
            <div className={styles.discoverItems}>
                {
                    cards.map((card, index) => {
                        return (
                            <Card 
                                key={index} 
                                imgSrc={card.imgSrc}
                                title={card.title}
                                content={card.content}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
}