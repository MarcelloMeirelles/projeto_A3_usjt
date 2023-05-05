const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");

contador = 0;

const bandas = {};

// GET
app.get("/bandas", (req, res) => {
  res.send(bandas);
});
// POST
app.post("/bandas", async (req, res) => {
  contador++;
  const { nome, integrantes, genero } = req.body;
  bandas[contador] = {
    contador,
    nome,
    integrantes,
    genero,
  };
  await axios.post("http://localhost:10000/eventos", {
    tipo: "BandaCriada",
    dados: {
      contador,
      nome,
      integrantes,
      genero,
    },
  });
  res.status(201).send(bandas[contador]);
});
app.post("/eventos", (req, res) => {
  console.log(req.body);
  res.status(200).send({ msg: "ok" });
});

// PUT
app.put("/bandas/:id", async (req, res) => {
  const id = req.params.id;
  const { nome, integrantes, genero } = req.body;
  const banda = bandas[id];
  banda.nome = nome;
  banda.integrantes = integrantes;
  banda.genero = genero;
  await axios.post("http://localhost:10000/eventos", {
    tipo: "BandaAtualizada",
    dados: {
      contador,
      nome,
      integrantes,
      genero,
    },
  });
  res.send(banda);
});
// DELETE
app.delete("/bandas/:id", async (req, res) => {
  const id = req.params.id;
  delete bandas[id];
  await axios.post("http://localhost:10000/eventos", {
    tipo: "BandaDeletada",
    dados: {
      id,
    },
  });
  res.status(200).send(bandas);
});

app.listen(4000, () => {
  console.log("Banda. Porta 4000");
});
