import { useLoaderData } from "react-router-dom";
import { getNowPlaying } from "../services/apiMovies";

function Home() {
  const data = useLoaderData();
  console.log(data);

  return <div>Home</div>;
}

export async function loader() {
  const data = await getNowPlaying();
  return data;
}

export default Home;
