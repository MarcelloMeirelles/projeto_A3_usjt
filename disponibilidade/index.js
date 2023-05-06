const express = require("express");
const app = express();
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
app.use(express.json());

const disponibilidade = {};

app.get("/disponibilidade", (req, res) => {
  res.send("disponibilidade");
});

app.post("/disponibilidade", async (req, res) => {
  const data = req.body.data;
  const alocacao = base[req.body.codigoLocal]["alocacoes"].find(
    (a) => a.data === data
  );
  const qtDeBandas = alocacao["bandas"].length;
  if (qtDeBandas < 5) {
    //cadastrar
    res.status(200).json({ msg: "cadastrado" });
  } else res.status(200).json({ msg: "Local lotado, tente outra data" });

  const evento = {
    tipo: "BandaCadastrada",
    dados: {
      contador,
      nome,
      integrantes,
      genero,
    },
  };
  console.log(evento);
  axios.post('http://localhost:10000/eventos', evento )
});

const base = {
  1: {
    local: "bar do ze",
    alocacoes: [
      {
        data: "04/05",
        bandas: [{ codigo: 1, nome: "banda1" }],
      },
      {
        data: "05/05",
        bandas: [
          { codigo: 1, nome: "banda1" },
          { codigo: 2, nome: "banda2" },
          { codigo: 3, nome: "banda3" },
          { codigo: 4, nome: "banda4" },
          { codigo: 5, nome: "banda5" },
        ],
      },
    ],
  },
};

await app.post("/disponibilidade", (req, res) => {
  console.log(req.body);
  res.status(200).send({ msg: "ok" });
});

app.listen(8000, () => {
  console.log("Disponibilidade. Porta 8000");
});
