import { useSelector } from "react-redux";
import BannerHome from "../components/BannerHome";
import HoriontalCardCarousel from "../components/HoriontalCardCarousel";

function Home() {
  const {
    trendingData,
    nowPlayingMovies,
    topRatedMovies,
    popularTvShows,
    onAirTvShows,
  } = useSelector((state) => state.movieo);

  return (
    <div>
      <BannerHome />
      <HoriontalCardCarousel data={trendingData} heading="Trending" />
      <HoriontalCardCarousel
        data={nowPlayingMovies}
        heading="Now Playing Movies"
        media_type="movie"
      />
      <HoriontalCardCarousel
        data={topRatedMovies}
        heading="Top Rated Movies"
        media_type="movie"
      />
      <HoriontalCardCarousel
        data={popularTvShows}
        heading="Popular TV Shows"
        media_type="tv"
      />
      <HoriontalCardCarousel
        data={onAirTvShows}
        heading="On-Air TV Shows"
        media_type="tv"
      />
    </div>
  );
}

// export async function loader() {
//   const data = await getTrending();
//   return data;
// }

export default Home;
