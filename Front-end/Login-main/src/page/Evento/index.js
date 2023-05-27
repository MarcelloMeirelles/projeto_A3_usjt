import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

export default function CriarEvento() {
  const [bandaId, setBandaId] = useState("");
  const [bandas, setBandas] = useState([]);
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [local, setLocal] = useState("");

  useEffect(() => {
    async function fetchBandas() {
      try {
        const response = await axios.get("http://localhost:4000/bandas");
        const bandas = response.data;
        setBandas(bandas);
      } catch (error) {
        console.error("Erro ao obter as bandas:", error);
      }
    }

    fetchBandas();
  }, []);

  const handleCriarEvento = async (e) => {
    e.preventDefault();

    const eventoData = {
      bandaId,
      data,
      horario,
      local,
    };

    try {
      await axios.post("http://localhost:7000/evento", eventoData);
      console.log("Evento criado com sucesso!");
      // Redirecionar para outra página, exibir mensagem de sucesso, etc.
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      // Exibir mensagem de erro, tratar falha na criação do evento, etc.
    }
  };

  return (
    <main className="container-evento">
      <div className="container-cantor">
        <div className="cantos">
          <Link to="/">←</Link>
        </div>
        <div className="cadastro">
          <h1>CRIAR EVENTO</h1>
          <form onSubmit={handleCriarEvento}>
            <div className="form-flex">
              <div className="form-grid">
                <p>Selecione a Banda:</p>

                <select
                  value={bandaId}
                  onChange={(e) => setBandaId(e.target.value)}
                >
                  <option value="">Selecione uma banda</option>
                  {bandas.map((banda) => (
                    <option key={banda._id} value={banda._id}>
                      {banda.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-flex">
              <div className="form-grid">
                <p>Data:</p>

                <input
                  type="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                />
              </div>
            </div>
            <div className="form-flex">
              <div className="form-grid">
                <p>Horário:</p>

                <input
                  type="time"
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                />
              </div>
            </div>
            <div className="form-flex">
              <div className="form-grid">
                <p>Local:</p>

                <input
                  type="text"
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                />
              </div>
            </div>
            <div className="cadastrar">
              <button type="submit">CRIAR EVENTO</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}
