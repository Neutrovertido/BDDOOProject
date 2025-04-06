import { useState, useEffect } from "react";
import { getMatches, getTeams, getPlayers, getLeagues } from "../server/api";
import { getLiveMatches } from "../server/footballapi";
import {
  ChevronDown,
  Menu,
  X,
  Search,
  Star,
  Bell,
  Trophy,
  Activity,
  Calendar,
  Users,
  TrendingUp,
  Clock,
  User,
} from "lucide-react";

export default function FutbolStats() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("laliga");
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [leagueData, setLeagueData] = useState({
    laliga: [],
    premier: [],
    seriea: [],
    bundesliga: [],
    uclGroupA: [],
    uclGroupB: [],
    uclGroupC: [],
    uclGroupD: [],
  });
  const [topPlayers, setTopPlayers] = useState([]);
  const [liveMatches, setLiveMatches] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Primero obtener los datos locales
        const [matchesData, teamsData, playersData, leaguesData] =
          await Promise.all([
            getMatches(),
            getTeams(),
            getPlayers(),
            getLeagues(),
          ]);

        // Obtener partidos en vivo
        const liveMatchesData = await getLiveMatches();
        setLiveMatches(liveMatchesData);

        // Estadísticas generales
        const statsData = [
          {
            label: "Ligas",
            value: `${leaguesData.length}+`,
            icon: <Trophy className="h-8 w-8 text-blue-600" />,
          },
          {
            label: "Equipos",
            value: `${teamsData.length}+`,
            icon: <Users className="h-8 w-8 text-blue-600" />,
          },
          {
            label: "Jugadores",
            value: `${playersData.length}+`,
            icon: <Activity className="h-8 w-8 text-blue-600" />,
          },
          {
            label: "Partidos",
            value: `${matchesData.length}+`,
            icon: <Calendar className="h-8 w-8 text-blue-600" />,
          },
        ];
        setStats(statsData);

        // Actualizar partidos en vivo
        setLiveMatches(liveMatchesData);

        // Procesar datos para tabla de posiciones
        const leaguesStandings = {};
        leaguesData.forEach((league) => {
          const leagueTeams = teamsData.filter(
            (team) => team.idliga === league.idliga
          );
          const leagueMatches = matchesData.filter(
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

          standings.sort((a, b) => b.pts - a.pts);
          standings.forEach((team, index) => {
            team.pos = index + 1;
            team.dg = team.gf - team.gc;
          });

          const leagueName = league.nombre.toLowerCase().replace(/\s+/g, "");
          leaguesStandings[leagueName] = standings;
        });
        setLeagueData(leaguesStandings);

        // Procesar datos para jugadores destacados
        const processedTopPlayers = playersData.slice(0, 3).map((player) => ({
          name: `${player.nombre} ${player.apellido}`,
          team:
            teamsData.find((t) => t.id_equipo === player.id_equipo)
              ?.nombre_equipo || "Unknown",
          // Usar una imagen de ejemplo más confiable
          image: `https://ui-avatars.com/api/?name=${player.nombre}+${player.apellido}&background=random`,
          goals: 0,
        }));
        setTopPlayers(processedTopPlayers);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // En caso de error, establecer algunos datos por defecto
        setLiveMatches([]);
        setLoading(false);
      }
    }

    fetchData();

    // Actualizar partidos en vivo cada 60 segundos
    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero section */}
      <section className="relative bg-gradient-to-b from-blue-900 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight animate-fadeInUp">
              Estadísticas de Fútbol en Tiempo Real
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fadeInUp animation-delay-200">
              Análisis detallados, clasificaciones actualizadas y todo lo que
              necesitas saber sobre el mundo del fútbol.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-400">
              <a
                href="#"
                className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-center"
              >
                Explorar Estadísticas
              </a>
              <a
                href="#"
                className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-center"
              >
                Partidos en Vivo
              </a>
            </div>
          </div>
        </div>

        {/* Animated Balls */}
      </section>

      {/* Stats Counter section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
              >
                <div className="flex justify-center mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-blue-800">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Scores */}
      <section className="py-12 bg-gradient-to-br from-blue-800 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Partidos en Directo
          </h2>

          {liveMatches.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xl text-blue-200">
                No hay partidos en directo en este momento
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {liveMatches.map((match) => (
                <div
                  key={match.id}
                  className={`bg-blue-700/30 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm ${
                    match.highlight ? "ring-2 ring-yellow-400" : ""
                  }`}
                >
                  <div className="p-1 bg-blue-600/50 text-xs font-medium text-center flex items-center justify-center">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{match.minute}</span>
                    </div>
                    <div className="mx-2">|</div>
                    <div>{match.league}</div>
                    {match.highlight && (
                      <>
                        <div className="mx-2">|</div>
                        <div className="flex items-center text-yellow-300">
                          <Star className="h-3 w-3 mr-1 fill-yellow-300" />
                          <span>Destacado</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-center w-2/5">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-2 shadow-inner">
                          {match.homeCode}
                        </div>
                        <div className="font-medium truncate">
                          {match.homeTeam}
                        </div>
                      </div>

                      <div className="text-center w-1/5">
                        <div className="text-3xl font-bold mb-1 flex justify-center gap-2">
                          <span>{match.homeScore}</span>
                          <span className="text-blue-300">-</span>
                          <span>{match.awayScore}</span>
                        </div>
                        <div className="text-xs text-blue-200">EN VIVO</div>
                      </div>

                      <div className="text-center w-2/5">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-2 shadow-inner">
                          {match.awayCode}
                        </div>
                        <div className="font-medium truncate">
                          {match.awayTeam}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <button className="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-full transition">
                        Alineaciones
                      </button>
                      <button className="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-full transition">
                        Estadísticas
                      </button>
                      <button className="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-full flex items-center gap-1 transition">
                        <Bell className="h-3 w-3" />
                        Notificar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Standings Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-blue-900">
            Clasificaciones
          </h2>

          <div className="mb-6 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveTab("laliga")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "laliga"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              La Liga
            </button>
            <button
              onClick={() => setActiveTab("premier")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "premier"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Premier League
            </button>
            <button
              onClick={() => setActiveTab("seriea")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "seriea"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Serie A
            </button>
            <button
              onClick={() => setActiveTab("bundesliga")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "bundesliga"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Bundesliga
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-xs">
                    <th className="py-3 px-4 text-left">Pos</th>
                    <th className="py-3 px-4 text-left">Equipo</th>
                    <th className="py-3 px-2 text-center">PJ</th>
                    <th className="py-3 px-2 text-center">G</th>
                    <th className="py-3 px-2 text-center">E</th>
                    <th className="py-3 px-2 text-center">P</th>
                    <th className="py-3 px-2 text-center">GF</th>
                    <th className="py-3 px-2 text-center">GC</th>
                    <th className="py-3 px-2 text-center">DG</th>
                    <th className="py-3 px-2 text-center">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {leagueData[activeTab]?.map(
                    (
                      team,
                      index // Usando el operador opcional
                    ) => (
                      <tr
                        key={index}
                        className={`border-b border-gray-200 hover:bg-blue-50 transition ${
                          index < 4 ? "bg-blue-50/50" : ""
                        }`}
                      >
                        <td
                          className={`py-3 px-4 font-medium ${
                            index < 4 ? "text-blue-600" : ""
                          }`}
                        >
                          {team.pos}
                        </td>
                        <td className="py-3 px-4 font-medium">{team.team}</td>
                        <td className="py-3 px-2 text-center">{team.pj}</td>
                        <td className="py-3 px-2 text-center">{team.g}</td>
                        <td className="py-3 px-2 text-center">{team.e}</td>
                        <td className="py-3 px-2 text-center">{team.p}</td>
                        <td className="py-3 px-2 text-center">{team.gf}</td>
                        <td className="py-3 px-2 text-center">{team.gc}</td>
                        <td className="py-3 px-2 text-center font-medium">
                          {team.dg}
                        </td>
                        <td className="py-3 px-2 text-center font-bold">
                          {team.pts}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right">
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Ver tabla completa →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* UEFA Champions League Standings Section */}
      <section className="text-blue">
        <div className="py-24 bg-[url('mondongo1.jpg')] bg-cover bg-center">
          <div className="inset-0 bg-blue-500 opacity-50 overflow-hidden"></div>
          <div className="container mx-auto px-4">
            <h2 className="text-white text-3xl font-bold text-center mb-10">
              Clasificación - UEFA Champions League
            </h2>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setActiveTab("uclGroupA")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "uclGroupA"
                    ? "bg-blue-600 text-blue"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Grupo A
              </button>
              <button
                onClick={() => setActiveTab("uclGroupB")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "uclGroupB"
                    ? "bg-blue-600 text-blue"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Grupo B
              </button>
              <button
                onClick={() => setActiveTab("uclGroupC")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "uclGroupC"
                    ? "bg-blue-600 text-blue"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Grupo C
              </button>
              <button
                onClick={() => setActiveTab("uclGroupD")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "uclGroupD"
                    ? "bg-blue-600 text-blue"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Grupo D
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 text-xs">
                      <th className="py-3 px-4 text-left">Pos</th>
                      <th className="py-3 px-4 text-left">Equipo</th>
                      <th className="py-3 px-2 text-center">PJ</th>
                      <th className="py-3 px-2 text-center">G</th>
                      <th className="py-3 px-2 text-center">E</th>
                      <th className="py-3 px-2 text-center">P</th>
                      <th className="py-3 px-2 text-center">GF</th>
                      <th className="py-3 px-2 text-center">GC</th>
                      <th className="py-3 px-2 text-center">DG</th>
                      <th className="py-3 px-2 text-center">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leagueData[activeTab]?.map(
                      (
                        team,
                        index // Usando el operador opcional
                      ) => (
                        <tr
                          key={index}
                          className={`border-b border-gray-200 hover:bg-blue-50 transition ${
                            index < 2 ? "bg-blue-50/50" : ""
                          }`}
                        >
                          <td
                            className={`py-3 px-4 font-medium ${
                              index < 2 ? "text-blue-600" : ""
                            }`}
                          >
                            {team.pos}
                          </td>
                          <td className="py-3 px-4 font-medium">{team.team}</td>
                          <td className="py-3 px-2 text-center">{team.pj}</td>
                          <td className="py-3 px-2 text-center">{team.g}</td>
                          <td className="py-3 px-2 text-center">{team.e}</td>
                          <td className="py-3 px-2 text-center">{team.p}</td>
                          <td className="py-3 px-2 text-center">{team.gf}</td>
                          <td className="py-3 px-2 text-center">{team.gc}</td>
                          <td className="py-3 px-2 text-center font-medium">
                            {team.dg}
                          </td>
                          <td className="py-3 px-2 text-center font-bold">
                            {team.pts}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right">
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Ver tabla completa →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Players */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-900">
            Goleadores Destacados
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Los jugadores más letales frente a portería esta temporada con
            estadísticas actualizadas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topPlayers.map((player, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-1 bg-gradient-to-r from-blue-600 to-blue-400 text-xs font-medium text-white text-center">
                  Top Goleador #{index + 1}
                </div>
                <div className="p-6 flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-200">
                      <img
                        src={player.image}
                        alt={player.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">
                      {player.name}
                    </h3>
                    <p className="text-gray-500">{player.team}</p>
                    <div className="mt-1 flex items-center">
                      <span className="text-blue-600 font-bold text-xl">
                        {player.goals}
                      </span>
                      <span className="ml-1 text-gray-500 text-sm">goles</span>
                    </div>
                  </div>
                  <div className="text-gray-400 hover:text-blue-600 cursor-pointer">
                    <User className="h-5 w-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="#"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Ver más estadísticas
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
