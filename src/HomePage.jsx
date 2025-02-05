import React, { useState } from 'react';
import { Trophy, User, Users, UserCog } from "lucide-react";

const HomePage = () => {
  const [selectedLeague, setSelectedLeague] = useState('ucl');
  const [activeTab, setActiveTab] = useState('player');
  
  const leagues = [
    { id: 'ucl', name: 'UEFA Champions League' },
    { id: 'premier', name: 'Premier League' },
    { id: 'bundesliga', name: 'Bundesliga' },
    { id: 'laliga', name: 'La Liga' }
  ];

  const StatCard = ({ title, value, icon }) => (
    <div className="bg-white rounded-lg shadow-md">
      <div className="flex items-center p-6 space-x-4">
        {icon}
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );

  const PlayerStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard 
        title="Goles" 
        value="25" 
        icon={<Trophy className="w-8 h-8 text-yellow-500" />}
      />
      <StatCard 
        title="Asistencias" 
        value="12" 
        icon={<Trophy className="w-8 h-8 text-blue-500" />}
      />
      <StatCard 
        title="Minutos Jugados" 
        value="2340" 
        icon={<Trophy className="w-8 h-8 text-green-500" />}
      />
    </div>
  );

  const ClubStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard 
        title="Victorias" 
        value="18" 
        icon={<Users className="w-8 h-8 text-green-500" />}
      />
      <StatCard 
        title="Goles a Favor" 
        value="52" 
        icon={<Users className="w-8 h-8 text-blue-500" />}
      />
      <StatCard 
        title="Puntos" 
        value="58" 
        icon={<Users className="w-8 h-8 text-purple-500" />}
      />
    </div>
  );

  const ManagerStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard 
        title="Victorias Totales" 
        value="120" 
        icon={<UserCog className="w-8 h-8 text-indigo-500" />}
      />
      <StatCard 
        title="Títulos" 
        value="8" 
        icon={<UserCog className="w-8 h-8 text-red-500" />}
      />
      <StatCard 
        title="Win Rate" 
        value="68%" 
        icon={<UserCog className="w-8 h-8 text-orange-500" />}
      />
    </div>
  );

  const CompetitionStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard 
        title="Equipos" 
        value="20" 
        icon={<Trophy className="w-8 h-8 text-purple-500" />}
      />
      <StatCard 
        title="Goles Totales" 
        value="645" 
        icon={<Trophy className="w-8 h-8 text-pink-500" />}
      />
      <StatCard 
        title="Promedio Goles/Partido" 
        value="2.8" 
        icon={<Trophy className="w-8 h-8 text-cyan-500" />}
      />
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'player':
        return <PlayerStats />;
      case 'club':
        return <ClubStats />;
      case 'manager':
        return <ManagerStats />;
      case 'competition':
        return <CompetitionStats />;
      default:
        return <PlayerStats />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Estadísticas de Fútbol</h1>
      
      {/* League Selector */}
      <div className="mb-8 flex flex-wrap gap-4">
        {leagues.map(league => (
          <button
            key={league.id}
            onClick={() => setSelectedLeague(league.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedLeague === league.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {league.name}
          </button>
        ))}
      </div>

      {/* Custom Tabs */}
      <div className="mb-8">
        <div className="grid grid-cols-4 gap-2 bg-white p-1 rounded-lg shadow-sm">
          <button
            onClick={() => setActiveTab('player')}
            className={`flex items-center justify-center py-2 px-4 rounded-md transition-colors ${
              activeTab === 'player'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <User className="w-4 h-4 mr-2" />
            Jugador
          </button>
          <button
            onClick={() => setActiveTab('club')}
            className={`flex items-center justify-center py-2 px-4 rounded-md transition-colors ${
              activeTab === 'club'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Users className="w-4 h-4 mr-2" />
            Club
          </button>
          <button
            onClick={() => setActiveTab('manager')}
            className={`flex items-center justify-center py-2 px-4 rounded-md transition-colors ${
              activeTab === 'manager'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <UserCog className="w-4 h-4 mr-2" />
            Entrenador
          </button>
          <button
            onClick={() => setActiveTab('competition')}
            className={`flex items-center justify-center py-2 px-4 rounded-md transition-colors ${
              activeTab === 'competition'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Trophy className="w-4 h-4 mr-2" />
            Competición
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default HomePage;