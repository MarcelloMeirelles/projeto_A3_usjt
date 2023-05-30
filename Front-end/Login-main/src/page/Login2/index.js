import React, { useState } from "react";
import Banda from "../../assets/banda.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    autenticarLogin(email, password);
  }

  async function autenticarLogin(email, senha) {
    try {
      const response = await axios.get("http://localhost:5000/fan");
      const fan = response.data;

      // Filtrar apenas o email e a senha de fan
      const usuarios = fan.map(({ email, senha }) => ({ email, senha }));

      // Verificar se o email e a senha correspondem a algum usuário
      const usuario = usuarios.find(
        (fan) => fan.email === email && fan.senha === senha
      );

      if (usuario) {
        // Autenticação bem-sucedida
        console.log("Usuário autenticado:", usuario);
        alert(`Acesso liberado para ${email}`);
        if (usuario) {
          navigate("/Evento_show"); // Redireciona para a página de evento
        } else {
          navigate("/"); // Redireciona para a página inicial
        }
      } else {
        // Autenticação falhou
        console.log("Autenticação falhou. Email ou senha incorretos.");
        alert("Acesso negado. Faça o cadastro.");
      }
    } catch (error) {
      console.log('Erro ao obter os dados do microserviço "fan":', error);
    }
  }

  return (
    <div className="logon-container">
      <div className="banda">
        <img src={Banda} alt="Banda" />
      </div>
      <section className="form">
        <h1>LOGIN FÃ</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail: "
            className="inputLogin"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className="inputLogin"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <div className="footer">
            <button className="button" type="submit">
              Entrar
            </button>
          </div>
          <Link to="/cadastro" className="ultimo">
            Não tem cadastro? Cadastrar
          </Link>
          <Link to="/evento" className="ultimo">
            Para cadastrar evento.
          </Link>
          <Link to="/evento_show" className="ultimo">
            Para exibir eventos.
          </Link>
        </form>
      </section>
    </div>
  );
}
