import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import process from "process";
import { MongoClient } from "mongodb";
import fetch from "node-fetch"; // Añade esta importación

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

// Añade este nuevo endpoint
app.get("/api/live-matches", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.football-data.org/v4/matches?status=LIVE,SCHEDULED,IN_PLAY",
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Transformar los datos al formato que espera nuestro frontend
    const matches =
      data.matches
        ?.filter(
          (match) =>
            match.status === "LIVE" ||
            match.status === "IN_PLAY" ||
            match.status === "SCHEDULED"
        )
        .map((match) => ({
          id: match.id,
          homeTeam: match.homeTeam.name,
          homeCode:
            match.homeTeam.tla ||
            match.homeTeam.name.substring(0, 3).toUpperCase(),
          homeScore: match.score.fullTime.home || 0,
          awayTeam: match.awayTeam.name,
          awayCode:
            match.awayTeam.tla ||
            match.awayTeam.name.substring(0, 3).toUpperCase(),
          awayScore: match.score.fullTime.away || 0,
          minute:
            match.status === "SCHEDULED"
              ? "No comenzado"
              : match.minute || "45",
          league: match.competition.name,
          highlight: false,
        })) || [];

    res.json(matches);
  } catch (error) {
    console.error("Error fetching live matches:", error);
    // Enviar datos de ejemplo en caso de error
    res.json([
      {
        id: 1,
        homeTeam: "Real Madrid",
        homeCode: "RMA",
        homeScore: 2,
        awayTeam: "Barcelona",
        awayCode: "BAR",
        awayScore: 1,
        minute: "45'",
        league: "La Liga",
        highlight: true,
      },
      {
        id: 2,
        homeTeam: "Manchester City",
        homeCode: "MCI",
        homeScore: 3,
        awayTeam: "Liverpool",
        awayCode: "LIV",
        awayScore: 2,
        minute: "67'",
        league: "Premier League",
        highlight: false,
      },
    ]);
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
