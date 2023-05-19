const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
const axios = require("axios");
app.use(cors());
const password = process.env.DB_PASSWORD;

// Conexão com o banco de dados
async function connectToDB() {
  const uri =
    "mongodb+srv://msiuri:5hsJHq1GC1V6QqYD@cluster0.xxbynb6.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Conectado ao MongoDB Atlas");
    return client.db("a3_01_2023");
  } catch (err) {
    console.log("Erro ao conectar ao MongoDB Atlas: ", err);
  }
}

//APP
contador = 0;

const bandas = {};

// GET
app.get("/bandas", async (req, res) => {
  const db = await connectToDB();
  const collection = db.collection("bandas");

  try {
    const bandas = await collection.find({}).toArray();
    res.send(bandas);
  } catch (err) {
    console.log("Erro ao buscar bandas: ", err);
    res.status(500).send({ msg: "Erro ao buscar bandas" });
  }
});
//GET BY ID
app.get("/bandas/:id", (req, res) => {
  const id = req.params.id;
  const banda = bandas[id];
  res.send(banda);
});

// POST
app.post("/bandas", async (req, res) => {
  const { nome, qtdMembros, genero, email, senha } = req.body;

  const db = await connectToDB();
  const collection = db.collection("bandas");

  try {
    const result = await collection.insertOne({
      nome,
      qtdMembros,
      genero,
      email,
      senha,
    });

    const novaBanda = {
      _id: result.insertedId,
      nome,
      qtdMembros,
      genero,
      email,
      senha,
    };

    res.status(201).send(novaBanda);
  } catch (err) {
    console.log("Erro ao criar uma nova banda: ", err);
    res.status(500).send("Erro ao criar uma nova banda");
  }
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
