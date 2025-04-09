const API_URL = "http://localhost:5000/api";

export async function getMatches() {
  const response = await fetch(`${API_URL}/matches`);
  return response.json();
}

export async function getTeams() {
  const response = await fetch(`${API_URL}/teams`);
  return response.json();
}

export async function getPlayers() {
  const response = await fetch(`${API_URL}/players`);
  return response.json();
}

export async function getLeagues() {
  const response = await fetch(`${API_URL}/leagues`);
  return response.json();
}
