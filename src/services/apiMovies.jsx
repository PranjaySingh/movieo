const TMDB_URL = "https://api.themoviedb.org/3";
const TMDB_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDBhNTAwMjUzNGFlNGIwYTY3YjEwZDY5MmI0ZTdhOCIsIm5iZiI6MTcyNTEyMDI0Mi44MDU2NzEsInN1YiI6IjY2Yzg4YjJhMDBhNTEyMzVlZmEzM2QwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9HibtVuTiz1ovDIYbY7J5X-1_BjR3h2xukDW0OgvNw0";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  },
};

export async function getNowPlaying() {
  const res = await fetch(
    `${TMDB_URL}/movie/now_playing?language=en-US&page=1`,
    options
  );

  if (!res.ok) throw new Error("Could not fetch now playing movies.");

  const data = await res.json();

  return data;
}

export async function getGenres() {
  const res = await fetch(`${TMDB_URL}/genre/movie/list?language=en`, options);

  if (!res.ok) throw new Error("Could not fetch Genres.");

  const data = await res.json();

  return data;
}

export async function getMoviesByGenreId(id) {
  const res = await fetch(
    `${TMDB_URL}/discover/movie?with_genres=${id}`,
    options
  );

  if (!res.ok) throw new Error("Could not fetch Genres.");

  const data = await res.json();

  return data;
}
