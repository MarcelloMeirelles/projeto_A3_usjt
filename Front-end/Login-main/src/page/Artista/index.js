import "./styles.css";
import ArtistaImg from "../../assets/artista.png";
import { Link } from "react-router-dom";

export default function Artista() {
  return (
    <main className="container-espectador">
      <div className="container-cantor">
        <div className="cantos">
          <Link to="/cadastro">←</Link>
          <img src={ArtistaImg} />
        </div>
        <div className="cadastro">
          <h1>CADASTRO DE BANDA</h1>
          <form>
            <p>Nome da Banda: </p>
            <br />
            <input type="text" />
            <div className="form-flex">
              <div className="form-grid">
                <p>Estilo:</p>
                <select>
                  <option>Selecione um estilo</option>
                  <option>Rock</option>
                  <option>Pop</option>
                  <option>Rap</option>
                  <option>Eletrônica</option>
                  <option>Indie</option>
                  <option>Funk</option>
                  <option>Reggae</option>
                  <option>Country</option>
                  <option>Jazz</option>
                  <option>Blues</option>
                </select>
              </div>
              <div className="form-grid membros">
                <p>Quantos membros:</p>
                <input type="number" />
              </div>
            </div>
            <p>E-mail:</p>
            <br />
            <input type="text" />
            <div className="form-flex">
              <div className="form-grid">
                <p>Telefone:</p>
                <input type="text" />
              </div>
              <div className="form-grid">
                <p>Senha:</p>
                <input type="password" />
              </div>
            </div>
            <div className="cadastrar">
              <button>CADASTRAR</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
