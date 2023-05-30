import "./styles.css";
import Microfone from "../../assets/mic.png";
import User from "../../assets/user.png";
import { Link } from "react-router-dom";

export default function LoginWho() {
  return (
    <main className="container">
      <Link to="/">←</Link>
      <h1>Bem vindo ao CantAki</h1>
      <div className="ticket-cadastro">
        <Link to="/login2">
          <img className="mic" src={Microfone} />
          <p>Fa</p>
        </Link>
        <Link to="/login">
          <img className="user" src={User} />
          <p>Banda</p>
        </Link>
      </div>
    </main>
  );
}
