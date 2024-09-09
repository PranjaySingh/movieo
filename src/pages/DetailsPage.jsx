import { useParams } from "react-router-dom";
import {
  getCast,
  getContentDetails,
  getRecommendedContent,
  getSimilarContent,
} from "../utils/apiGetContent";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Divider from "../components/Divider";
import HoriontalCardCarousel from "../components/HoriontalCardCarousel";
import VideoPlayer from "../components/videoPlayer";
import Loading from "../components/Loading";

function DetailsPage() {
  const params = useParams();
  const [contentDetials, setContentDetails] = useState({});
  const [cast, setCast] = useState({});
  const [similarContent, setSimilarContent] = useState([]);
  const [recommendedContent, setRecommendedContent] = useState([]);
  const [isPlayVideo, setIsPlayVideo] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { imageUrl } = useSelector((state) => state.movieo);

  const {
    backdrop_path: imageBackdrop,
    poster_path: imagePoster,
    id: contentId,
    title,
    name,
    tagline,
    vote_average,
    vote_count,
    runtime,
    first_air_date: firstAirDate,
    release_date,
    overview,
    status,
  } = contentDetials;

  const duration = `${Math.floor(runtime / 60)}hr ${Number(runtime) % 60}m`;

  async function fetchContentDetails() {
    setIsLoading(true);
    try {
      const detailResponse = await getContentDetails(params.explore, params.id);
      const castResponse = await getCast(params.explore, params.id);
      const siimilarResponse = await getSimilarContent(
        params.explore,
        params.id
      );
      const recommendedResponse = await getRecommendedContent(
        params.explore,
        params.id
      );

      setContentDetails(detailResponse);
      setCast(castResponse);
      setSimilarContent(siimilarResponse.results);
      setRecommendedContent(recommendedResponse.results);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (
      contentDetials.length > 0 ||
      cast.length > 0 ||
      similarContent.length > 0 ||
      recommendedContent.length > 0
    ) {
      setContentDetails([]);
      setCast({});
      setSimilarContent([]);
      setRecommendedContent([]);
    }
    fetchContentDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.id]);

  function handlePlayVideo() {
    setVideoId(contentId);
    setIsPlayVideo(true);
  }

  console.l;

  return (
    <div>
      {isLoading ? (
        <div className="py-16">
          <Loading />
        </div>
      ) : (
        <>
          <div className="w-full h-[280px] relative hidden lg:block">
            <div className="w-full h-full">
              <img
                src={imageUrl + "/" + imageBackdrop}
                alt="cover image"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>
          </div>

          <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10">
            <div className="lg:-mt-28 relative mx-auto w-fit lg:mx-0 py-8 lg:py-0">
              <img
                src={imageUrl + imagePoster}
                alt="image poster"
                className="h-80 min-w-60 w-60 object-cover rounded"
              />
              {
                <button
                  onClick={handlePlayVideo}
                  className="mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-r from-orange-500 to-yellow-500 hover:text-xl transition-all"
                >
                  Play now
                </button>
              }
            </div>
            <div className="lg:mt-4">
              <h2 className="text-2xl lg:text-4xl text-white font-bold">
                {title || name}
              </h2>
              <p className="text-neutral-500 mt-1 lg:mt-2">{tagline}</p>

              <Divider />

              <div className="flex items-center gap-3 lg:gap-5 text-sm lg:text-md ">
                <p>Rating: {Number(vote_average).toFixed(1)}+</p>
                <span>|</span>
                <p>Views: {Number(vote_count)}</p>
                {runtime && (
                  <>
                    <span>|</span>
                    <p>{runtime && `Duration: ${duration}`}</p>
                  </>
                )}
              </div>
              <Divider />
              <div className="my-4">
                <h3 className="text-xl font-bold text-white mb-1 lg:mb-2">
                  Overview
                </h3>
                <p>{overview}</p>

                <Divider />

                <div className="flex gap-3 lg:gap-5 my-3 items-center text-center">
                  <p>Status : {status}</p>
                  <span>|</span>
                  <p>
                    Release Date :{" "}
                    {moment(firstAirDate || release_date).format("MMM Do YYYY")}
                  </p>
                </div>
                <Divider />
              </div>
              <div>
                {cast?.crew?.filter((el) => el.job === "Director").length >
                0 ? (
                  <p>
                    <span className="text-white">Director(s) : </span>
                    {cast?.crew
                      ?.filter((el) => el.job === "Director")
                      .map((el) => el.name)}
                  </p>
                ) : (
                  <p>
                    <span>Director : </span>Unknown
                  </p>
                )}
                {cast?.crew?.filter((el) => el.job === "Screenplay").length >
                0 ? (
                  <p>
                    <span>Writer(s) : </span>
                    {cast?.crew
                      ?.filter((el) => el.job === "Screenplay")
                      .map((el) => el.name)
                      .join(", ")}
                  </p>
                ) : (
                  <p>
                    <span>Writer : </span>Unknown
                  </p>
                )}
              </div>
              <Divider />

              <h2 className="font-bold text-lg">Cast : </h2>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-3 lg:gap-5 mt-3 ">
                {cast?.cast
                  ?.filter((el) => el.profile_path && el.popularity > 5)
                  .map((cast, index) => (
                    <div
                      key={`cast ${index}`}
                      className="flex flex-col items-center gap-1"
                    >
                      <div>
                        <img
                          src={imageUrl + cast.profile_path}
                          alt="artist photo"
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      </div>
                      <p className="font-bold text-center text-sm text-neutral-400">
                        {cast.name}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div>
            {similarContent?.length > 0 && (
              <HoriontalCardCarousel
                data={similarContent}
                heading="Similar"
                media_type={params.explore}
              />
            )}

            {recommendedContent?.length > 0 && (
              <HoriontalCardCarousel
                data={recommendedContent}
                heading="Recommended"
                media_type={params.explore}
              />
            )}
          </div>
          {isPlayVideo && (
            <VideoPlayer
              id={videoId}
              onClose={() => setIsPlayVideo(false)}
              media_type={params.explore}
            />
          )}
        </>
      )}
    </div>
  );
}

export default DetailsPage;
