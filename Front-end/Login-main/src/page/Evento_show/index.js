import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import Cantor from "../../assets/cantor.png";
import { Link } from "react-router-dom";

export default function Eventos() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    // Fazer a requisição para obter os eventos
    axios
      .get("http://localhost:7000/evento")
      .then((response) => {
        setEventos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao obter os eventos:", error);
      });
  }, []);

  return (
    <div className="event-cards">
      <div className="cantos">
        <Link to="/">←</Link>
        <img src={Cantor} />
      </div>
      {eventos.map((evento) => (
        <div className="event-card" key={evento._id}>
          <h3>{evento.banda.nome}</h3>
          <p>Quantidade de membros: {evento.banda.qtdMembros}</p>
          <p>Gênero: {evento.banda.genero}</p>
          <p>Data: {evento.data}</p>
          <p>Horário: {evento.horario}</p>
          <p>Local: {evento.local}</p>
        </div>
      ))}
    </div>
  );
}
