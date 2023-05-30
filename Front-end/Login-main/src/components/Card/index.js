import styles from "./Card.module.css";

import { Link } from "react-router-dom";

function Card({ id, titulo, capa, local, horario }) {
  console.log(id, titulo, capa, local, horario);

  return (
    <div className={styles.container}>
      <Link className={styles.link} to={`/${id}`}>
        <img src={capa} alt={titulo} className={styles.capa} />
        <h2>{titulo}</h2>
        <h2>{local}</h2>
        <h2>{horario}</h2>
      </Link>
    </div>
  );
}

export default Card;
