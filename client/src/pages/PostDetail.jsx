import { Link } from 'react-router-dom';
import PostAuthor from '../components/PostAuthor';
import Beer from '../images/beer.jpg';
import styles from '../styles/postdetail.module.css';

export default function PostDetail () {
    return (
        <section className={styles.post_detail}>
            <div className={styles.detail_container}>
                <div className={styles.detail_header}>
                    <PostAuthor />
                    <div className="author_buttons">
                        <Link to={`/posts/TestUser/edit`} className="author_edit">Edit</Link>
                        <Link to={`/posts/TestUser/delete`} className="author_delete">Delete</Link>
                    </div>
                </div>
                <h1>Dis da tidle</h1>
                <div className={styles.detail_media}>
                    <img src={Beer} alt="" />
                </div>
                <div className={styles.detail_body}>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur sapiente repudiandae deleniti neque. Nemo, quam voluptate praesentium, eligendi libero quae, accusamus repudiandae in eveniet adipisci ex repellat magni. Pariatur porro nostrum veritatis deserunt magnam cupiditate quidem laudantium eos, voluptas neque debitis adipisci in blanditiis expedita corporis hic nisi perspiciatis odit!
                    </p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe sapiente perspiciatis maxime excepturi animi, assumenda natus odit delectus nemo pariatur quo fugit commodi dolore expedita recusandae magni ducimus ipsa facere voluptas? Culpa adipisci corporis quasi, ex deleniti, esse, ea at sapiente velit eaque modi dicta ratione. Dolores illo perferendis rem maxime sed ipsam sit ex accusamus dignissimos consequuntur iste, reprehenderit dolore nam tenetur nobis nihil, porro laboriosam laborum! Quibusdam, est.
                    </p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, exercitationem rem nemo eos ad harum incidunt molestias alias esse dolore, error quibusdam earum maiores dicta, aspernatur accusantium impedit excepturi. Labore qui provident quia et ipsam eum, rem fugiat perspiciatis culpa quasi totam tenetur aperiam at temporibus numquam incidunt commodi unde?</p>
                    
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur sapiente repudiandae deleniti neque. Nemo, quam voluptate praesentium, eligendi libero quae, accusamus repudiandae in eveniet adipisci ex repellat magni. Pariatur porro nostrum veritatis deserunt magnam cupiditate quidem laudantium eos, voluptas neque debitis adipisci in blanditiis expedita corporis hic nisi perspiciatis odit!
                    </p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe sapiente perspiciatis maxime excepturi animi, assumenda natus odit delectus nemo pariatur quo fugit commodi dolore expedita recusandae magni ducimus ipsa facere voluptas? Culpa adipisci corporis quasi, ex deleniti, esse, ea at sapiente velit eaque modi dicta ratione. Dolores illo perferendis rem maxime sed ipsam sit ex accusamus dignissimos consequuntur iste, reprehenderit dolore nam tenetur nobis nihil, porro laboriosam laborum! Quibusdam, est.
                    </p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, exercitationem rem nemo eos ad harum incidunt molestias alias esse dolore, error quibusdam earum maiores dicta, aspernatur accusantium impedit excepturi. Labore qui provident quia et ipsam eum, rem fugiat perspiciatis culpa quasi totam tenetur aperiam at temporibus numquam incidunt commodi unde?</p>
                
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur sapiente repudiandae deleniti neque. Nemo, quam voluptate praesentium, eligendi libero quae, accusamus repudiandae in eveniet adipisci ex repellat magni. Pariatur porro nostrum veritatis deserunt magnam cupiditate quidem laudantium eos, voluptas neque debitis adipisci in blanditiis expedita corporis hic nisi perspiciatis odit!
                    </p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe sapiente perspiciatis maxime excepturi animi, assumenda natus odit delectus nemo pariatur quo fugit commodi dolore expedita recusandae magni ducimus ipsa facere voluptas? Culpa adipisci corporis quasi, ex deleniti, esse, ea at sapiente velit eaque modi dicta ratione. Dolores illo perferendis rem maxime sed ipsam sit ex accusamus dignissimos consequuntur iste, reprehenderit dolore nam tenetur nobis nihil, porro laboriosam laborum! Quibusdam, est.
                    </p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, exercitationem rem nemo eos ad harum incidunt molestias alias esse dolore, error quibusdam earum maiores dicta, aspernatur accusantium impedit excepturi. Labore qui provident quia et ipsam eum, rem fugiat perspiciatis culpa quasi totam tenetur aperiam at temporibus numquam incidunt commodi unde?</p>
                
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur sapiente repudiandae deleniti neque. Nemo, quam voluptate praesentium, eligendi libero quae, accusamus repudiandae in eveniet adipisci ex repellat magni. Pariatur porro nostrum veritatis deserunt magnam cupiditate quidem laudantium eos, voluptas neque debitis adipisci in blanditiis expedita corporis hic nisi perspiciatis odit!
                    </p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe sapiente perspiciatis maxime excepturi animi, assumenda natus odit delectus nemo pariatur quo fugit commodi dolore expedita recusandae magni ducimus ipsa facere voluptas? Culpa adipisci corporis quasi, ex deleniti, esse, ea at sapiente velit eaque modi dicta ratione. Dolores illo perferendis rem maxime sed ipsam sit ex accusamus dignissimos consequuntur iste, reprehenderit dolore nam tenetur nobis nihil, porro laboriosam laborum! Quibusdam, est.
                    </p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, exercitationem rem nemo eos ad harum incidunt molestias alias esse dolore, error quibusdam earum maiores dicta, aspernatur accusantium impedit excepturi. Labore qui provident quia et ipsam eum, rem fugiat perspiciatis culpa quasi totam tenetur aperiam at temporibus numquam incidunt commodi unde?</p>
                
                </div>
            </div>
        </section>
    );
}