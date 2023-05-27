import { useFavoritoContext } from 'Contextos/Favoritos';
import styles from './Card.module.css';
import iconeDesfavoritar from './favoritar.png';
import iconeFavoritar from './desfavoritar.png';
import { Link } from 'react-router-dom';

function Card({ id, titulo, capa, local, horario }) {
    console.log(id, titulo, capa, local, horario)
    const { favorito, adicionarFavorito } = useFavoritoContext();
    const ehFavorito = favorito.some((fav) => fav.id === id);
    const icone = !ehFavorito ? iconeFavoritar : iconeDesfavoritar;

    return (
        <div className={styles.container}>
            <Link className={styles.link} to={`/${id}`}>
                <img src={capa} alt={titulo} className={styles.capa} />
                <h2>{titulo}</h2>
                <h2>{local}</h2>
                <h2>{horario}</h2>
            </Link>
            <img src={icone}
                alt="Favoritar filme"
                className={styles.favoritar}
                onClick={() => {
                    adicionarFavorito({ id, titulo, capa, local, horario })
                }} />
        </div>

    )
}

export default Card;