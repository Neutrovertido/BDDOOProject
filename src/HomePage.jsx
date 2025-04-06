import { useState } from "react";
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

  // Datos de ejemplo
  const liveMatches = [
    {
      id: 1,
      homeTeam: "Barcelona",
      homeCode: "BAR",
      homeScore: 2,
      awayTeam: "Real Madrid",
      awayCode: "RMA",
      awayScore: 1,
      minute: 75,
      league: "La Liga",
      highlight: true,
    },
    {
      id: 2,
      homeTeam: "Man City",
      homeCode: "MCI",
      homeScore: 1,
      awayTeam: "Liverpool",
      homeCode2: "LIV",
      awayScore: 1,
      minute: 62,
      league: "Premier League",
      highlight: false,
    },
    {
      id: 3,
      homeTeam: "Juventus",
      homeCode: "JUV",
      homeScore: 0,
      awayTeam: "Inter",
      awayCode: "INT",
      awayScore: 2,
      minute: 81,
      league: "Serie A",
      highlight: false,
    },
  ];

  const leagueData = {
    laliga: [
      {
        pos: 1,
        team: "Barcelona",
        pj: 25,
        g: 19,
        e: 4,
        p: 2,
        gf: 57,
        gc: 19,
        dg: 38,
        pts: 61,
      },
      {
        pos: 2,
        team: "Real Madrid",
        pj: 25,
        g: 18,
        e: 5,
        p: 2,
        gf: 52,
        gc: 16,
        dg: 36,
        pts: 59,
      },
      {
        pos: 3,
        team: "Atlético Madrid",
        pj: 25,
        g: 16,
        e: 3,
        p: 6,
        gf: 45,
        gc: 24,
        dg: 21,
        pts: 51,
      },
      {
        pos: 4,
        team: "Real Sociedad",
        pj: 25,
        g: 13,
        e: 6,
        p: 6,
        gf: 38,
        gc: 25,
        dg: 13,
        pts: 45,
      },
      {
        pos: 5,
        team: "Villarreal",
        pj: 25,
        g: 12,
        e: 6,
        p: 7,
        gf: 40,
        gc: 31,
        dg: 9,
        pts: 42,
      },
    ],
    premier: [
      {
        pos: 1,
        team: "Man City",
        pj: 25,
        g: 18,
        e: 4,
        p: 3,
        gf: 59,
        gc: 21,
        dg: 38,
        pts: 58,
      },
      {
        pos: 2,
        team: "Liverpool",
        pj: 25,
        g: 17,
        e: 6,
        p: 2,
        gf: 55,
        gc: 19,
        dg: 36,
        pts: 57,
      },
      {
        pos: 3,
        team: "Arsenal",
        pj: 25,
        g: 16,
        e: 5,
        p: 4,
        gf: 52,
        gc: 21,
        dg: 31,
        pts: 53,
      },
      {
        pos: 4,
        team: "Tottenham",
        pj: 25,
        g: 14,
        e: 5,
        p: 6,
        gf: 49,
        gc: 32,
        dg: 17,
        pts: 47,
      },
      {
        pos: 5,
        team: "Chelsea",
        pj: 25,
        g: 13,
        e: 5,
        p: 7,
        gf: 45,
        gc: 30,
        dg: 15,
        pts: 44,
      },
    ],
    seriea: [
      {
        pos: 1,
        team: "Inter",
        pj: 25,
        g: 19,
        e: 4,
        p: 2,
        gf: 55,
        gc: 14,
        dg: 41,
        pts: 61,
      },
      {
        pos: 2,
        team: "Milan",
        pj: 25,
        g: 17,
        e: 5,
        p: 3,
        gf: 50,
        gc: 22,
        dg: 28,
        pts: 56,
      },
      {
        pos: 3,
        team: "Napoli",
        pj: 25,
        g: 15,
        e: 6,
        p: 4,
        gf: 48,
        gc: 20,
        dg: 28,
        pts: 51,
      },
      {
        pos: 4,
        team: "Juventus",
        pj: 25,
        g: 14,
        e: 5,
        p: 6,
        gf: 42,
        gc: 25,
        dg: 17,
        pts: 47,
      },
      {
        pos: 5,
        team: "Atalanta",
        pj: 25,
        g: 13,
        e: 5,
        p: 7,
        gf: 45,
        gc: 29,
        dg: 16,
        pts: 44,
      },
    ],
    bundesliga: [
      {
        pos: 1,
        team: "Bayern Munich",
        pj: 25,
        g: 20,
        e: 3,
        p: 2,
        gf: 69,
        gc: 20,
        dg: 49,
        pts: 63,
      },
      {
        pos: 2,
        team: "Dortmund",
        pj: 25,
        g: 17,
        e: 3,
        p: 5,
        gf: 56,
        gc: 29,
        dg: 27,
        pts: 54,
      },
      {
        pos: 3,
        team: "Bayer Leverkusen",
        pj: 25,
        g: 15,
        e: 5,
        p: 5,
        gf: 50,
        gc: 27,
        dg: 23,
        pts: 50,
      },
      {
        pos: 4,
        team: "RB Leipzig",
        pj: 25,
        g: 14,
        e: 5,
        p: 6,
        gf: 48,
        gc: 23,
        dg: 25,
        pts: 47,
      },
      {
        pos: 5,
        team: "Eintracht Frankfurt",
        pj: 25,
        g: 12,
        e: 7,
        p: 6,
        gf: 42,
        gc: 31,
        dg: 11,
        pts: 43,
      },
    ],
    uclGroupA: [
      {
        pos: 1,
        team: "PSG",
        pj: 6,
        g: 4,
        e: 1,
        p: 1,
        gf: 12,
        gc: 5,
        dg: 7,
        pts: 13,
      },
      {
        pos: 2,
        team: "Manchester United",
        pj: 6,
        g: 3,
        e: 2,
        p: 1,
        gf: 10,
        gc: 6,
        dg: 4,
        pts: 11,
      },
      {
        pos: 3,
        team: "RB Leipzig",
        pj: 6,
        g: 2,
        e: 1,
        p: 3,
        gf: 8,
        gc: 9,
        dg: -1,
        pts: 7,
      },
      {
        pos: 4,
        team: "Club Brugge",
        pj: 6,
        g: 0,
        e: 2,
        p: 4,
        gf: 3,
        gc: 13,
        dg: -10,
        pts: 2,
      },
    ],
    uclGroupB: [
      {
        pos: 1,
        team: "Real Madrid",
        pj: 6,
        g: 5,
        e: 1,
        p: 0,
        gf: 14,
        gc: 3,
        dg: 11,
        pts: 16,
      },
      {
        pos: 2,
        team: "Inter Milan",
        pj: 6,
        g: 3,
        e: 2,
        p: 1,
        gf: 10,
        gc: 6,
        dg: 4,
        pts: 11,
      },
      {
        pos: 3,
        team: "Shakhtar Donetsk",
        pj: 6,
        g: 1,
        e: 2,
        p: 3,
        gf: 6,
        gc: 10,
        dg: -4,
        pts: 5,
      },
      {
        pos: 4,
        team: "Celtic",
        pj: 6,
        g: 0,
        e: 1,
        p: 5,
        gf: 2,
        gc: 13,
        dg: -11,
        pts: 1,
      },
    ],
    uclGroupC: [
      {
        pos: 1,
        team: "Bayern Munich",
        pj: 6,
        g: 6,
        e: 0,
        p: 0,
        gf: 18,
        gc: 2,
        dg: 16,
        pts: 18,
      },
      {
        pos: 2,
        team: "Barcelona",
        pj: 6,
        g: 4,
        e: 0,
        p: 2,
        gf: 12,
        gc: 6,
        dg: 6,
        pts: 12,
      },
      {
        pos: 3,
        team: "Ajax",
        pj: 6,
        g: 1,
        e: 1,
        p: 4,
        gf: 5,
        gc: 14,
        dg: -9,
        pts: 4,
      },
      {
        pos: 4,
        team: "Dinamo Zagreb",
        pj: 6,
        g: 0,
        e: 1,
        p: 5,
        gf: 2,
        gc: 15,
        dg: -13,
        pts: 1,
      },
    ],
    uclGroupD: [
      {
        pos: 1,
        team: "Tottenham",
        pj: 6,
        g: 4,
        e: 1,
        p: 1,
        gf: 11,
        gc: 5,
        dg: 6,
        pts: 13,
      },
      {
        pos: 2,
        team: "Marseille",
        pj: 6,
        g: 3,
        e: 1,
        p: 2,
        gf: 9,
        gc: 7,
        dg: 2,
        pts: 10,
      },
      {
        pos: 3,
        team: "Sporting CP",
        pj: 6,
        g: 2,
        e: 1,
        p: 3,
        gf: 7,
        gc: 10,
        dg: -3,
        pts: 7,
      },
      {
        pos: 4,
        team: "Eintracht Frankfurt",
        pj: 6,
        g: 1,
        e: 1,
        p: 4,
        gf: 4,
        gc: 9,
        dg: -5,
        pts: 4,
      },
    ],
  };

  const topPlayers = [
    {
      name: "Robert Lewandowski",
      team: "Barcelona",
      goals: 23,
      image: "/api/placeholder/80/80",
    },
    {
      name: "Erling Haaland",
      team: "Man City",
      goals: 21,
      image: "/api/placeholder/80/80",
    },
    {
      name: "Kylian Mbappé",
      team: "Real Madrid",
      goals: 19,
      image: "/api/placeholder/80/80",
    },
  ];

  const stats = [
    {
      label: "Ligas",
      value: "25+",
      icon: <Trophy className="h-8 w-8 text-blue-600" />,
    },
    {
      label: "Equipos",
      value: "500+",
      icon: <Users className="h-8 w-8 text-blue-600" />,
    },
    {
      label: "Estadísticas",
      value: "10K+",
      icon: <Activity className="h-8 w-8 text-blue-600" />,
    },
    {
      label: "Partidos",
      value: "1000+",
      icon: <Calendar className="h-8 w-8 text-blue-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="text-3xl font-bold">⚽</div>
              <div className="text-2xl font-bold">FútbolStats</div>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-6">
              <a
                href="#"
                className="font-medium hover:text-blue-200 transition duration-200 border-b-2 border-white"
              >
                Inicio
              </a>
              <a
                href="#"
                className="font-medium hover:text-blue-200 transition duration-200"
              >
                Ligas
              </a>
              <a
                href="#"
                className="font-medium hover:text-blue-200 transition duration-200"
              >
                Equipos
              </a>
              <a
                href="#"
                className="font-medium hover:text-blue-200 transition duration-200"
              >
                Jugadores
              </a>
              <a
                href="#"
                className="font-medium hover:text-blue-200 transition duration-200"
              >
                Noticias
              </a>
            </nav>

            {/* Search and Mobile menu button */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center bg-blue-700/50 rounded-full px-3 py-1">
                <Search className="h-4 w-4 text-blue-200" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="bg-transparent border-none focus:outline-none text-white placeholder-blue-200 ml-2 w-36"
                />
              </div>

              <button
                className="md:hidden text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 flex flex-col space-y-2 animate-fadeIn">
              <a
                href="#"
                className="font-medium hover:bg-blue-700 rounded p-2 transition"
              >
                Inicio
              </a>
              <a
                href="#"
                className="font-medium hover:bg-blue-700 rounded p-2 transition"
              >
                Ligas
              </a>
              <a
                href="#"
                className="font-medium hover:bg-blue-700 rounded p-2 transition"
              >
                Equipos
              </a>
              <a
                href="#"
                className="font-medium hover:bg-blue-700 rounded p-2 transition"
              >
                Jugadores
              </a>
              <a
                href="#"
                className="font-medium hover:bg-blue-700 rounded p-2 transition"
              >
                Noticias
              </a>
              <div className="flex items-center bg-blue-700/50 rounded-full px-3 py-2 mt-2">
                <Search className="h-4 w-4 text-blue-200" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="bg-transparent border-none focus:outline-none text-white placeholder-blue-200 ml-2 w-full"
                />
              </div>
            </nav>
          )}
        </div>
      </header>

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
                    <span>{match.minute}'</span>
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

          <div className="text-center mt-8">
            <a
              href="#"
              className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Ver todos los partidos
            </a>
          </div>
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
                  {leagueData[activeTab].map((team, index) => (
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
                  ))}
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
          <div class="inset-0 bg-blue-500 opacity-50 overflow-hidden"></div>
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
                    {leagueData[activeTab]?.map((team, index) => (
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
                    ))}
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">FútbolStats</h3>
              <p className="text-gray-400 text-sm">
                Tu fuente más completa de estadísticas y análisis de fútbol con
                cobertura global y actualizaciones en tiempo real.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Ligas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Equipos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Jugadores
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Noticias
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Principales Ligas</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    La Liga
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Premier League
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Serie A
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Bundesliga
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Ligue 1
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Ayuda</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Términos y Condiciones
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Política de Privacidad
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
            <p>&copy; 2025 FútbolStats. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
