import "./styles.css";
import Microfone from "../../assets/mic.png";
import User from "../../assets/user.png";
import { Link } from "react-router-dom";

export default function CadastroWho() {
  return (
    <main className="container">
      <Link to="/">←</Link>
      <h1>Você é....</h1>
      <div className="ticket-cadastro">
        <Link to="/espectador">
          <img className="mic" src={Microfone} />
          <p>Fã</p>
        </Link>
        <Link to="/artista">
          <img className="user" src={User} />
          <p>Banda</p>
        </Link>
      </div>
    </main>
  );
}
