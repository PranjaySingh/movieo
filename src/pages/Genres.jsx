import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { getGenres } from "../services/apiMovies";

function Genres() {
  const data = useLoaderData();
  const navigate = useNavigate();

  console.log(data);

  return (
    <div>
      <ul>
        {data.genres.map((genre) => (
          <li key={genre.id}>
            <button
              onClick={() =>
                navigate(`/genres/${genre.id}`, { state: { name: genre.name } })
              }
            >
              {genre.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function loader() {
  const data = await getGenres();
  return data;
}

export default Genres;
