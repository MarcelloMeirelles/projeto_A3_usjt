const express = require("express");
const app = express();

const cors = require("cors");
app.use(express.json());
const axios = require("axios");

app.use(cors());
contador = 0;

const bandas = {};

// GET
app.get("/bandas", (req, res) => {
  res.send(bandas);
});
//GET BY ID
app.get("/bandas/:id", (req, res) => {
  const id = req.params.id;
  const banda = bandas[id];
  res.send(banda);
});

// POST
app.post("/bandas", async (req, res) => {
  contador++;
  const { nome, qtdMembros, genero, email, senha } = req.body;
  bandas[contador] = {
    contador,
    nome,
    qtdMembros,
    genero,
    email,
    senha,
  };
  await axios.post("http://localhost:10000/eventos", {
    tipo: "BandaCriada",
    dados: {
      contador,
      nome,
      qtdMembros,
      genero,
      email,
      senha,
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
  const { nome, qtdMembros, genero, email, senha } = req.body;
  const banda = bandas[id];
  banda.nome = nome;
  banda.qtdMembros = qtdMembros;
  banda.genero = genero;
  banda.email = email;
  banda.senha = senha;
  await axios.post("http://localhost:10000/eventos", {
    tipo: "BandaAtualizada",
    dados: {
      contador,
      nome,
      qtdMembros,
      genero,
      email,
      senha,
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
