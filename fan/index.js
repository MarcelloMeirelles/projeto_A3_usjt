const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
app.use(express.json());
const axios = require("axios");
app.use(cors());
const { ObjectId } = require("mongodb");

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
app.get("/fan/:id", async (req, res) => {
  const id = req.params.id;

  const db = await connectToDB();
  const collection = db.collection("fan");

  try {
    const fans = await collection.findOne({ _id: ObjectId(id) });
    res.send(fans);
  } catch (err) {
    console.log("Erro ao obter o fan do banco de dados: ", err);
    res.status(500).send("Erro ao obter o fan do banco de dados");
  }
});

// POST
app.post("/fan", async (req, res) => {
  const { nome, email, idade, senha, cpf, telefone } = req.body;

  try {
    const db = await connectToDB();
    const collection = db.collection("fan");

    const fan = {
      nome,
      email,
      idade,
      senha,
      cpf,
      telefone,
    };

    const result = await collection.insertOne(fan);

    const novoFan = {
      _id: result.insertedId,
      ...fan,
    };

    // Enviar evento para o barramento de eventos
    try {
      await axios.post("http://localhost:10000/eventos", {
        tipo: "FanCriado",
        dados: novoFan,
      });
    } catch (err) {
      console.log("Erro ao enviar evento para o barramento de eventos: ", err);
    }

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

  try {
    const db = await connectToDB();
    const collection = db.collection("fan");

    const result = await collection.findOneAndUpdate(
      { _id: ObjectId(id) },
      {
        $set: {
          nome,
          email,
          idade,
          senha,
          cpf,
          telefone,
        },
      }
    );

    if (!result.value) {
      return res.status(404).send("Fan não encontrado");
    }

    // Retorno da fan atualizado
    const fanAtualizado = await collection.findOne({ _id: ObjectId(id) });

    // Enviar evento para o barramento de eventos
    try {
      await axios.post("http://localhost:10000/eventos", {
        tipo: "FanAtualizado",
        dados: fanAtualizado,
      });
    } catch (err) {
      console.log("Erro ao enviar evento para o barramento de eventos: ", err);
    }

    res.send(fanAtualizado);
  } catch (err) {
    console.log("Erro ao atualizar o Fan: ", err);
    res.status(500).send("Erro ao atualizar o Fan");
  }
});

// DELETE
app.delete("/fan/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const db = await connectToDB();
    const collection = db.collection("fan");

    const result = await collection.findOneAndDelete({ _id: ObjectId(id) });

    if (!result.value) {
      return res.status(404).send("Fan não encontrado");
    }

    // Enviar evento para o barramento de eventos
    try {
      await axios.post("http://localhost:10000/eventos", {
        tipo: "FanDeletado",
        dados: {
          id,
        },
      });
    } catch (err) {
      console.log("Erro ao enviar evento para o barramento de eventos: ", err);
    }

    res.status(200).send(result.value);
  } catch (err) {
    console.log("Erro ao excluir o Fan: ", err);
    res.status(500).send("Erro ao excluir o Fan");
  }
});

app.listen(5000, () => {
  console.log("Fan. Porta 5000");
});
