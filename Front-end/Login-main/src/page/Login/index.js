import React, { useState } from "react";
import Banda from "../../assets/banda.png";
import loginAcess from "../../utils/loginAcess";
import "./styles.css";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    if (data.email === loginAcess.email && data.password === loginAcess.password) {
      alert(`Access Released ${data.email}`);
      // Adicione aqui o redirecionamento para a rota desejada após o acesso ser liberado
    } else {
      alert("Access Denied, Sign Up");
    }
  }

  return (
    <div className="logon-container">
      <div className="banda">
        <img src={Banda} alt="Banda" />
      </div>
      <section className="form">
        <h1>LOGIN</h1>
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
            <button className="button" type="submit" >
              Entrar
            </button>
          </div>
          <a href="/cadastro" className="ultimo">
            Não tem cadastro? Cadastrar
          </a>
        </form>
      </section>
    </div>
  );
}