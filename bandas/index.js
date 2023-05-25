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
app.get("/bandas/:id", async (req, res) => {
  const id = req.params.id;

  const db = await connectToDB();
  const collection = db.collection("bandas");

  try {
    const banda = await collection.findOne({ _id: ObjectId(id) });
    res.send(banda);
  } catch (err) {
    console.log("Erro ao obter a banda do banco de dados: ", err);
    res.status(500).send("Erro ao obter a banda do banco de dados");
  }
});

// POST
app.post("/bandas", async (req, res) => {
  const { nome, qtdMembros, genero, email, senha } = req.body;

  try {
    const db = await connectToDB();
    const collection = db.collection("bandas");

    const banda = { nome, qtdMembros, genero, email, senha };

    const result = await collection.insertOne(banda);
    const bandaCriada = {
      _id: result.insertedId,
      ...banda,
    };

    // Enviar evento para o barramento de eventos
    try {
      await axios.post("http://localhost:10000/eventos", {
        tipo: "BandaCriada",
        dados: bandaCriada,
      });
    } catch (err) {
      console.log("Erro ao enviar evento para o barramento de eventos: ", err);
    }

    res.status(201).send(bandaCriada);
  } catch (err) {
    console.log("Erro ao criar uma nova banda: ", err);
    res.status(500).send("Erro ao criar uma nova banda");
  }
});

// PUT
app.put("/bandas/:id", async (req, res) => {
  const id = req.params.id;
  const { nome, qtdMembros, genero, email, senha } = req.body;

  try {
    const db = await connectToDB();
    const collection = db.collection("bandas");

    const result = await collection.findOneAndUpdate(
      { _id: ObjectId(id) },
      {
        $set: {
          nome,
          qtdMembros,
          genero,
          email,
          senha,
        },
      }
    );

    if (!result.value) {
      return res.status(404).send("Banda não encontrada");
    }
    // Retorna a banda atualizada
    const bandasAtualizado = await collection.findOne({ _id: ObjectId(id) });

    // Enviar evento para o barramento de eventos
    try {
      await axios.post("http://localhost:10000/eventos", {
        tipo: "BandaAtualizada",
        dados: bandasAtualizado,
      });
    } catch (err) {
      console.log("Erro ao enviar evento para o barramento de eventos: ", err);
    }

    res.send(bandasAtualizado);
  } catch (err) {
    console.log("Erro ao atualizar a banda: ", err);
    res.status(500).send("Erro ao atualizar a banda");
  }
});

// DELETE
app.delete("/bandas/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const db = await connectToDB();
    const collection = db.collection("bandas");

    const result = await collection.findOneAndDelete({ _id: ObjectId(id) });

    if (!result.value) {
      return res.status(404).send("Banda não encontrada");
    }

    // Enviar evento para o barramento de eventos
    try {
      await axios.post("http://localhost:10000/eventos", {
        tipo: "BandaDeletada",
        dados: {
          id: result.value._id,
        },
      });
    } catch (err) {
      console.log("Erro ao enviar evento para o barramento de eventos: ", err);
    }

    res.send(result.value);
  } catch (err) {
    console.log("Erro ao deletar a banda: ", err);
    res.status(500).send("Erro ao deletar a banda");
  }
});

app.listen(4000, () => {
  console.log("Banda. Porta 4000");
});
