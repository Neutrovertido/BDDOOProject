import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import process from "process";
import { MongoClient } from "mongodb";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Conectar a MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
  }
}

connectDB();

// Endpoints
app.get("/api/matches", async (req, res) => {
  try {
    const matches = await client
      .db("FBSTATS")
      .collection("partido")
      .find({})
      .toArray();
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/teams", async (req, res) => {
  try {
    const teams = await client
      .db("FBSTATS")
      .collection("equipo")
      .find({})
      .toArray();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/players", async (req, res) => {
  try {
    const players = await client
      .db("FBSTATS")
      .collection("jugador")
      .find({})
      .toArray();
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/leagues", async (req, res) => {
  try {
    const leagues = await client
      .db("FBSTATS")
      .collection("liga")
      .find({})
      .toArray();
    res.json(leagues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
