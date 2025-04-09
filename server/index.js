import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import process from "process";
import { MongoClient } from "mongodb";
import fetch from "node-fetch";

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

// ENDPOINT PARA LOS PARTIDOS EN VIVO
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

// ENDPOINT PARA LAS CLASIFICACIONES
const fetchWithRetry = async (url, options, retries = 5, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    const response = await fetch(url, options);

    if (response.ok) {
      return response;
    }

    if (response.status === 429) {
      console.warn(`Rate limit hit. Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  throw new Error("Max retries reached. Unable to fetch data.");
};

app.get("/api/standings", async (req, res) => {
  try {
    const leagues = {
      laliga: 2014,
      premier: 2021,
      bundesliga: 2002,
      cl: 2001,
    };

    const standingsData = {};

    for (const [key, id] of Object.entries(leagues)) {
      const response = await fetchWithRetry(
        `https://api.football-data.org/v4/competitions/${id}/standings`,
        {
          headers: {
            "X-Auth-Token": process.env.FOOTBALL_API_KEY,
          },
        }
      );

      const data = await response.json();
      standingsData[key] = data.standings[0].table.map((team) => ({
        pos: team.position,
        team: team.team.name,
        pj: team.playedGames,
        g: team.won,
        e: team.draw,
        p: team.lost,
        gf: team.goalsFor,
        gc: team.goalsAgainst,
        dg: team.goalDifference,
        pts: team.points,
      }));
    }

    res.json(standingsData);
  } catch (error) {
    console.error("Error fetching standings:", error);
    // Enviar datos de respaldo desde la base de datos
    const leagues = await client
      .db("FBSTATS")
      .collection("liga")
      .find({})
      .toArray();
    const teams = await client
      .db("FBSTATS")
      .collection("equipo")
      .find({})
      .toArray();
    const matches = await client
      .db("FBSTATS")
      .collection("partido")
      .find({})
      .toArray();

    const standingsData = {};

    // Procesar datos para cada liga
    leagues.forEach((league) => {
      const leagueTeams = teams.filter((team) => team.idliga === league.idliga);
      const leagueMatches = matches.filter(
        (match) => match.idliga === league.idliga
      );

      const standings = leagueTeams.map((team) => {
        const teamMatches = leagueMatches.filter(
          (match) => match.id_equipo === team.id_equipo
        );
        const wins = teamMatches.filter(
          (match) => match.goles_loc > match.goles_vis
        ).length;
        const draws = teamMatches.filter(
          (match) => match.goles_loc === match.goles_vis
        ).length;
        const losses = teamMatches.filter(
          (match) => match.goles_loc < match.goles_vis
        ).length;

        return {
          pos: 0,
          team: team.nombre_equipo,
          pj: teamMatches.length,
          g: wins,
          e: draws,
          p: losses,
          gf: teamMatches.reduce((sum, match) => sum + match.goles_loc, 0),
          gc: teamMatches.reduce((sum, match) => sum + match.goles_vis, 0),
          dg: 0,
          pts: wins * 3 + draws,
        };
      });

      // Ordenar por puntos y asignar posiciones
      standings.sort((a, b) => b.pts - a.pts);
      standings.forEach((team, index) => {
        team.pos = index + 1;
        team.dg = team.gf - team.gc;
      });

      const leagueName = league.nombre.toLowerCase().replace(/\s+/g, "");
      standingsData[leagueName] = standings;
    });

    res.json(standingsData);
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
