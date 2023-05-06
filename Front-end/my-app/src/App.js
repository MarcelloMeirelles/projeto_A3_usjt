import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [bandas, setBandas] = useState([]);

  useEffect(() => {
    async function fetchBandas() {
      const response = await axios.get("http://localhost:4000/bandas");
      setBandas(Object.values(response.data));
      console.log(response.data);
    }
    fetchBandas();
  }, []);

  return (
    <div>
      <h1>Lista de Bandas</h1>
      <ul>
        {bandas.map((banda) => (
          <li key={banda.id}>
            <h2>{banda.nome}</h2>
            <p>Integrantes: {banda.integrantes}</p>
            <p>Gênero: {banda.genero}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
