const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");

contador = 0;

const fan = {};

//GET
app.get("/fan", (req, res) => {
  res.send(fan);
});
//GET BY ID
app.get("/fan/:id", (req, res) => {
  const id = req.params.id;
  const fans = fan[id];
  res.send(fans);
});

// POST
app.post("/fan", async (req, res) => {
  contador++;
  const { nome, email, idade, senha, cpf, telefone } = req.body;
  fan[contador] = {
    contador,
    nome,
    email,
    idade,
    senha,
    cpf,
    telefone,
  };
  await axios.post("http://localhost:10000/eventos", {
    tipo: "Loginfan",
    dados: {
      contador,
      nome,
      email,
      idade,
      senha,
      cpf,
      telefone,
    },
  });
  res.status(201).send(fan[contador]);
});
app.post("/eventos", (req, res) => {
  console.log(req.body);
  res.status(200).send({ msg: "ok" });
});

// PUT
app.put("/fan/:id", async (req, res) => {
  const id = req.params.id;
  const { nome, email, idade, senha, cpf, telefone } = req.body;
  const fans = fan[id];
  fans.nome = nome;
  fans.email = email;
  fans.idade = idade;
  fans.senha = senha;
  fans.cpf = cpf;
  fans.telefone = telefone;
  await axios.post("http://localhost:10000/eventos", {
    tipo: "FanAtualizado",
    dados: {
      contador,
      nome,
      email,
      idade,
      senha,
      cpf,
      telefone,
    },
  });
  res.send(fans);
});
// DELETE
app.delete("/fan/:id", async (req, res) => {
  const id = req.params.id;
  delete fan[id];
  await axios.post("http://localhost:10000/eventos", {
    tipo: "fanDeletado",
    dados: {
      id,
    },
  });
  res.status(200).send(fan);
});

app.listen(5000, () => {
  console.log("Fan. Porta 5000");
});
