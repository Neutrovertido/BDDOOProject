export async function getLiveMatches() {
  try {
    const response = await fetch("http://localhost:5000/api/live-matches");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching live matches:", error);
    return [];
  }
}
