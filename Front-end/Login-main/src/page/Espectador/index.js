import React, { useState } from "react";
import "./styles.css";
import Cantor from "../../assets/cantor.png";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Espectador() {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [idade, setIdade] = useState(0);
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      toast.error("Preencha todos os campos antes de enviar o cadastro.");
      return;
    }
    const fanData = { nome: nomeCompleto, idade, cpf, email, telefone, senha };

    try {
      await axios.post("http://localhost:5000/fan", fanData);
      console.log("Fan cadastrado com sucesso!");
      toast.success("Fan cadastrado com sucesso!");
      // Redirecionar para outra página, exibir mensagem de sucesso, etc.
    } catch (error) {
      console.error("Erro ao cadastrar fan:", error);
      toast.error("Erro ao cadastrar fan");
      // Exibir mensagem de erro, tratar falha no cadastro, etc.
    }
  };
  const [formValido, setFormValido] = useState(false);

  const validarFormulario = () => {
    if (
      nomeCompleto.trim() === "" ||
      idade === 0 ||
      cpf.trim() === "" ||
      email.trim() === "" ||
      telefone.trim() === "" ||
      senha.trim() === ""
    ) {
      return false; // Retorna false se algum campo estiver vazio
    }
    return true; // Retorna true se todos os campos estiverem preenchidos
  };

  return (
    <main className="container-espectador">
      <div className="container-cantor">
        <div className="cantos">
          <Link to="/cadastro">←</Link>
          <img src={Cantor} />
        </div>
        <div className="cadastro">
          <h1>CADASTRO DE FAN</h1>
          <form onSubmit={handleCadastro}>
            <p>Nome Completo:</p>
            <br />
            <input
              type="text"
              value={nomeCompleto}
              onChange={(e) => {
                setNomeCompleto(e.target.value);
                setFormValido(validarFormulario());
              }}
            />
            <div className="form-flex">
              <div className="form-grid">
                <p>Idade:</p>
                <input
                  type="number"
                  value={idade}
                  onChange={(e) => {
                    setIdade(e.target.value);
                    setFormValido(validarFormulario());
                  }}
                />
              </div>
              <div className="form-grid">
                <p>CPF:</p>
                <input
                  type="text"
                  value={cpf}
                  onChange={(e) => {
                    setCpf(e.target.value);
                    setFormValido(validarFormulario());
                  }}
                />
              </div>
            </div>
            <p>E-mail:</p>
            <br />
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFormValido(validarFormulario());
              }}
            />
            <div className="form-flex">
              <div className="form-grid">
                <p>Telefone:</p>
                <input
                  type="text"
                  value={telefone}
                  onChange={(e) => {
                    setTelefone(e.target.value);
                    setFormValido(validarFormulario());
                  }}
                />
              </div>
              <div className="form-grid">
                <p>Senha:</p>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => {
                    setSenha(e.target.value);
                    setFormValido(validarFormulario());
                  }}
                />
              </div>
            </div>
            <div className="cadastrar">
              <button
                type="submit"
                to="/eventos"
                className={!formValido ? "disabled" : ""}
              >
                CADASTRAR
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}
