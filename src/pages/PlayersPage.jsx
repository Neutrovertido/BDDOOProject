import { useState, useEffect } from "react";
import { getPlayers, getTeams } from "../../server/api";
import { Search, User, Users, Medal } from "lucide-react";

export default function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [filterPosition, setFilterPosition] = useState("all");

  useEffect(() => {
    async function fetchData() {
      try {
        const [playersData, teamsData] = await Promise.all([
          getPlayers(),
          getTeams(),
        ]);

        setPlayers(playersData);
        setTeams(teamsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const positions = ["all", "Delantero", "Mediocampista", "Defensa", "Portero"];

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = (player.nombre + " " + player.apellido)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPosition =
      filterPosition === "all" || player.posicion === filterPosition;
    return matchesSearch && matchesPosition;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Jugadores
          </h1>
          <p className="text-xl text-blue-100 text-center mb-8">
            Explora la base de datos de jugadores
          </p>

          {/* Search and Filters */}
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Search className="h-5 w-5 text-blue-200" />
              <input
                type="text"
                placeholder="Buscar jugador..."
                className="bg-transparent border-none w-full text-white placeholder-blue-200 ml-2 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {positions.map((pos) => (
                <button
                  key={pos}
                  onClick={() => setFilterPosition(pos)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filterPosition === pos
                      ? "bg-blue-600 text-white"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {pos === "all" ? "Todas las posiciones" : pos}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Players Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPlayers.map((player) => (
              <div
                key={player.id_jugador}
                onClick={() => setSelectedPlayer(player)}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {player.posicion}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">
                    {player.nombre} {player.apellido}
                  </h3>
                  <p className="text-gray-600">
                    {
                      teams.find((t) => t.id_equipo === player.id_equipo)
                        ?.nombre_equipo
                    }
                  </p>
                  <p className="text-sm text-gray-500">{player.edad} años</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Player Modal */}
      {selectedPlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-blue-900">
                    {selectedPlayer.nombre} {selectedPlayer.apellido}
                  </h2>
                  <p className="text-gray-600">
                    {
                      teams.find(
                        (t) => t.id_equipo === selectedPlayer.id_equipo
                      )?.nombre_equipo
                    }
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPlayer(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Posición</p>
                  <p className="text-xl font-bold text-blue-900">
                    {selectedPlayer.posicion}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Edad</p>
                  <p className="text-xl font-bold text-blue-900">
                    {selectedPlayer.edad} años
                  </p>
                </div>
              </div>

              {/* Aquí puedes agregar más estadísticas del jugador */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
