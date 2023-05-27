import "./styles.css";
import Microfone from "../../assets/mic.png";
import User from "../../assets/user.png";
import { Link } from "react-router-dom";
import "./styles.css";

export default function CadastroWho() {
  return (
    <main className="container">
      <Link to="/">←</Link>
      <h1>Você é....</h1>
      <div className="ticket-cadastro">
        <Link to="/espectador">
          <img className="mic" src={Microfone} />
          <p>Fan</p>
        </Link>
        <Link to="/artista">
          <img className="user" src={User} />
          <p>Banda</p>
        </Link>
      </div>
    </main>
  );
}
