const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");
const cors = require("cors");
app.use(cors());
const MongoClient = require("mongodb").MongoClient;
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
const evento = {};

//GET
app.get("/eventos", async (req, res) => {
  const db = await connectToDB();
  const collection = db.collection("eventos");
  try {
    const eventos = await collection.find({}).toArray();
    res.send(eventos);
  } catch (err) {
    console.log("Erro ao buscar eventos: ", err);
    res.status(500).send({ msg: "Erro ao buscar eventos" });
  }
});
//GET BY ID
app.get("/eventos/:id", async (req, res) => {
  const id = req.params.id;

  const db = await connectToDB();
  const collection = db.collection("eventos");
  try {
    const evento = await collection.findOne({ _id: ObjectId(id) });
    res.send(evento);
  } catch (error) {
    console.log("Erro ao obter o evento do banco de dados: ", err);
    res.status(500).send("Erro ao obter o evento do banco de dados");
  }
});

// POST
app.post("/eventos", async (req, res) => {
  const { bandaId, data, horario, local } = req.body;

  try {
    const db = await connectToDB();
    const collection = db.collection("eventos");

    // Obtém o objeto bandas do microserviço bandas com base no ID
    const response = await axios.get(`http://localhost:4000/bandas/${bandaId}`);
    const banda = response.data;

    const evento = { banda, data, horario, local }; // Substitui a variável banda pelo objeto banda obtido

    const result = await collection.insertOne(evento);
    const eventoCriado = {
      _id: result.insertedId,
      ...evento,
    };

    // Enviar evento para o microsserviço de barramento de eventos
    await axios.post("http://localhost:10000/eventos", {
      tipo: "eventoCriado",
      dados: eventoCriado,
    });

    res.status(201).send(eventoCriado);
  } catch (err) {
    console.log("Erro ao inserir evento no banco de dados: ", err);
    res.status(500).send("Erro ao inserir evento no banco de dados");
  }
});

// PUT
app.put("/eventos/:id", async (req, res) => {
  const id = req.params.id;
  const { bandaId, data, horario, local } = req.body;

  try {
    const db = await connectToDB();
    const collection = db.collection("eventos");

    // Obtém o objeto bandas do microserviço bandas com base no ID
    const response = await axios.get(`http://localhost:4000/bandas/${bandaId}`);
    const banda = response.data;

    // Atualiza o evento no banco de dados
    const updatedEvent = {
      banda,
      data,
      horario,
      local,
    };
    await collection.updateOne({ _id: ObjectId(id) }, { $set: updatedEvent });

    // Enviar evento atualizado para o microsserviço de barramento de eventos
    await axios.post("http://localhost:10000/eventos", {
      tipo: "eventoAtualizado",
      dados: updatedEvent,
    });

    res.send(updatedEvent);
  } catch (err) {
    console.log("Erro ao atualizar evento no banco de dados: ", err);
    res.status(500).send("Erro ao atualizar evento no banco de dados");
  }
});

// DELETE
app.delete("/eventos/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const db = await connectToDB();
    const collection = db.collection("eventos");

    const deletedEvent = await collection.findOneAndDelete({
      _id: ObjectId(id),
    });

    if (deletedEvent.value) {
      await axios.post("http://localhost:10000/eventos", {
        tipo: "eventoDeletado",
        dados: {
          id,
        },
      });

      res.status(200).send(deletedEvent.value);
    } else {
      res.status(404).send({ msg: "Evento não encontrado" });
    }
  } catch (err) {
    console.log("Erro ao excluir evento do banco de dados: ", err);
    res.status(500).send("Erro ao excluir evento do banco de dados");
  }
});

app.listen(7000, () => {
  console.log("Evento. Porta 7000");
});
