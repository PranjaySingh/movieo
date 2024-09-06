import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MobileNav from "./MobileNav";
import { useEffect } from "react";
import {
  getConfiguration,
  getNowPlaying,
  getOnAir,
  getPupularTv,
  getTopRated,
  getTrending,
} from "../utils/apiGetContent";
import { useDispatch } from "react-redux";
import {
  setTrendingData,
  setImageUrl,
  setNowPlayingMovies,
  setTopRatedMovies,
  setPopularTvShows,
  setOnAirTvShows,
} from "../store/movieoSlice";

function AppLayout() {
  const dispatch = useDispatch();

  async function fetchTrending() {
    const trendingData = await getTrending();
    dispatch(setTrendingData(trendingData.results));
  }
  async function fetchTopRated() {
    const topRatedData = await getTopRated();
    dispatch(setTopRatedMovies(topRatedData.results));
  }

  async function fetchConfiguration() {
    const configData = await getConfiguration();

    dispatch(setImageUrl(configData.images.secure_base_url + "original"));
  }

  async function fetchNowPlaying() {
    const nowPlayingData = await getNowPlaying();
    dispatch(setNowPlayingMovies(nowPlayingData.results));
  }
  async function fetchPupularTvShows() {
    const pupularTvShows = await getPupularTv();
    dispatch(setPopularTvShows(pupularTvShows.results));
  }
  async function fetchOnAirTvShows() {
    const onAirTvShows = await getOnAir();
    dispatch(setOnAirTvShows(onAirTvShows.results));
  }

  useEffect(() => {
    fetchTrending();
    fetchNowPlaying();
    fetchConfiguration();
    fetchTopRated();
    fetchPupularTvShows();
    fetchOnAirTvShows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pb-14 lg:pb-0">
      <Header />
      <main className="min-h-[90vh]">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}

export default AppLayout;
