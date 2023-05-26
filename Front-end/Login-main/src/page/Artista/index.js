import React, { useState } from "react";
import axios from "axios";
import ArtistaImg from "../../assets/artista.png";
import { Link } from "react-router-dom";

export default function Artista() {
  const [nomeBanda, setNomeBanda] = useState("");
  const [genero, setGenero] = useState("");
  const [membros, setMembros] = useState(0);
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastro = async (e) => {
    e.preventDefault();

    const bandaData = {
      nome: nomeBanda,
      qtdMembros: membros,
      genero,
      email,
      senha,
    };

    try {
      await axios.post("http://localhost:4000/bandas", bandaData);
      console.log("Banda cadastrada com sucesso!");
      // Redirecionar para outra página, exibir mensagem de sucesso, etc.
    } catch (error) {
      console.error("Erro ao cadastrar banda:", error);
      // Exibir mensagem de erro, tratar falha no cadastro, etc.
    }
  };

  return (
    <main className="container-espectador">
      <div className="container-cantor">
        <div className="cantos">
          <Link to="/cadastro">←</Link>
          <img src={ArtistaImg} alt="Artista" />
        </div>
        <div className="cadastro">
          <h1>CADASTRO DE BANDA</h1>
          <form onSubmit={handleCadastro}>
            <p>Nome da Banda:</p>
            <br />
            <input
              type="text"
              value={nomeBanda}
              onChange={(e) => setNomeBanda(e.target.value)}
            />
            <div className="form-flex">
              <div className="form-grid">
                <p>Estilo:</p>
                <select
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                >
                  <option value="">Selecione um estilo</option>
                  <option value="Rock">Rock</option>
                  <option value="Pop">Pop</option>
                  <option value="Rap">Rap</option>
                  <option value="Eletrônica">Eletrônica</option>
                  <option value="Indie">Indie</option>
                  <option value="Funk">Funk</option>
                  <option value="Reggae">Reggae</option>
                  <option value="Country">Country</option>
                  <option value="Jazz">Jazz</option>
                  <option value="Blues">Blues</option>
                </select>
              </div>
              <div className="form-grid membros">
                <p>Quantos membros:</p>
                <input
                  type="number"
                  value={membros}
                  onChange={(e) => setMembros(e.target.value)}
                />
              </div>
            </div>
            <p>E-mail:</p>
            <br />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="form-flex">
              <div className="form-grid">
                <p>Telefone:</p>
                <input
                  type="text"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </div>
              <div className="form-grid">
                <p>Senha:</p>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>
            </div>
            <div className="cadastrar">
              <button type="submit">CADASTRAR</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
