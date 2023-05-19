const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");

contador = 0;

const evento = {};

//GET
app.get("/evento", (req, res) => {
  res.send(evento);
});
//GET BY ID
app.get("/evento/:id", (req, res) => {
  const id = req.params.id;
  const eventos = evento[id];
  res.send(eventos);
});

// POST
app.post("/evento", async (req, res) => {
  contador++;
  const { banda, data, horario, local } = req.body;
  evento[contador] = {
    contador,
    banda,
    data,
    horario,
    local,
  };
  await axios.post("http://localhost:10000/eventos", {
    tipo: "feedEvento",
    dados: {
      contador,
      banda,
      data,
      horario,
      local,
    },
  });
  res.status(201).send(evento[contador]);
});
app.post("/eventos", (req, res) => {
  console.log(req.body);
  res.status(200).send({ msg: "ok" });
});

// PUT
app.put("/evento/:id", async (req, res) => {
  const id = req.params.id;
  const { banda, data, horario, local } = req.body;
  const eventos = evento[id];
  eventos.banda = banda;
  eventos.data = data;
  eventos.horario = horario;
  eventos.local = local;
  await axios.post("http://localhost:10000/eventos", {
    tipo: "eventoAtualizado",
    dados: {
      banda,
      data,
      horario,
      local,
    },
  });
  res.send(eventos);
});
// DELETE
app.delete("//:id", async (req, res) => {
  const id = req.params.id;
  delete evento[id];
  await axios.post("http://localhost:10000/eventos", {
    tipo: "eventoDeletado",
    dados: {
      id,
    },
  });
  res.status(200).send(evento);
});

app.listen(5000, () => {
  console.log("Evento. Porta 7000");
});
//Arrumando commit