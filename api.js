const API_KEY = "79fdd1b44df9ec92e26bcb9a5b91237e";
const BASE_URL = "https://api.themoviedb.org/3";

// Get Top 10 Movies
export async function getTopTenMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    // Return the first 10 movies
    return data.results.slice(0, 10);
  } catch (error) {
    console.error("Error fetching top movies:", error);
    return [];
  }
}

// Search function
export async function searchMovies(query) {
  if (!query || query.trim() === "") return [];

  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}&language=en-US&page=1`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
}

// List all movies function
export async function allMovies() {
  const totalPages = 1; 
  const allResults = []; 

  try {
    for (let page = 1; page <= totalPages; page++) {
      const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch movies for page ${page}`);
      }

      const data = await response.json();
      allResults.push(...data.results); 
    }

    return allResults; 
  } catch (error) {
    console.error("Error listing movies:", error);
    return []; 
  }
}



