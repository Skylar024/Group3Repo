const API_KEY = "79fdd1b44df9ec92e26bcb9a5b91237e";
const BASE_URL = "http://api.themoviedb.org/3";

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

    // Return the first 5 movies for the 1st column
    return data.results.slice(0, 5);
  } catch (error) {
    console.error("Error fetching top movies:", error);
    return [];
  }
}
// =========================== //
export async function getTwoMovies() {
  const movieArray = [];
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    return data.results.slice(6, 11);

    // for (const key in data.results) {
    //   console.log(`${key}: ${data.results[key]}`)
    //   console.log(data.results[key].original_title)
    // }

    // for (const key in data) {
    //   console.log(`${key}: ${data[key]}`)

    // }
    // let twoMovies = data.results.slice(x*2, (x*2)+2);
    // let movieArray = movieArray + twoMovies;
    // console.log(x.results)

    //console.log(movieArray)
    //return movieArray;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}
