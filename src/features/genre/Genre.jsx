import { useLoaderData, useLocation } from "react-router-dom";
import { getMoviesByGenreId } from "../../services/apiMovies";

function Genre() {
  const data = useLoaderData();
  const { state } = useLocation();

  console.log(state);

  console.log(data);
  return <div>Genre</div>;
}

export async function loader({ params }) {
  const data = await getMoviesByGenreId(params.genreId);

  return data;
}

export default Genre;
