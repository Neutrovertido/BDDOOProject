const BASE_URL = "http://localhost:5000/api";

export async function getLiveMatches() {
  try {
    const response = await fetch(`${BASE_URL}/live-matches`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching live matches:", error);
    return [];
  }
}

export async function getStandings() {
  try {
    const response = await fetch(`${BASE_URL}/standings`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching standings:", error);
    return null;
  }
}
