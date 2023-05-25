const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
const axios = require("axios");
app.use(cors());
//const password = process.env.DB_PASSWORD;

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

const fan = {};

//GET
app.get("/fan", async (req, res) => {
  const db = await connectToDB();
  const collection = db.collection("fan");

  try {
    const bandas = await collection.find({}).toArray();
    res.send(bandas);
  } catch (err) {
    console.log("Erro ao buscar fan: ", err);
    res.status(500).send({ msg: "Erro ao buscar fan" });
  }
});

//GET BY ID
app.get("/fan/:id", (req, res) => {
  const id = req.params.id;
  const fans = fan[id];
  res.send(fans);
});

// POST
app.post("/fan", async (req, res) => {
  const { nome, email, idade, senha, cpf, telefone } = req.body;
  
  const db = await connectToDB();
  const collection = db.collection("fan");

  try {
    const result = await collection.insertOne({
      nome,
      email,
      idade,
      senha,
      cpf,
      telefone,
    });

    const novoFan = {
      _id: result.insertedId,
      nome,
      email,
      idade,
      senha,
      cpf,
      telefone,
    };
    res.status(201).send(novoFan);
  } catch (err) {
    console.log("Erro ao criar um novo Fan: ", err);
    res.status(500).send("Erro ao criar um novo Fan");  
  }
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
