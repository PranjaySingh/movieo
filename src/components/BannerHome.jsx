import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import VideoPlayer from "./videoPlayer";

function BannerHome() {
  const { trendingData, imageUrl } = useSelector((state) => state.movieo);

  const [currentImage, setCurrentImage] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [videoData, setVideoData] = useState();

  function handlePlayVideo(data) {
    setVideoData(data);
    setIsPlayingVideo(true);
  }

  function handlePrevious() {
    currentImage === 0
      ? setCurrentImage(trendingData.length - 1)
      : setCurrentImage((current) => current - 1);
  }
  function handleNext() {
    currentImage === trendingData.length - 1
      ? setCurrentImage(0)
      : setCurrentImage((current) => current + 1);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      currentImage < trendingData.length - 1
        ? handleNext()
        : setCurrentImage(0);
    }, 5000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trendingData, imageUrl, currentImage]);

  return (
    <section className="w-full h-full">
      <div className="flex min-h-full max-h-[95vh] overflow-hidden group relative">
        {/* Button next and Previous image */}
        <div className="absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:lg:flex">
          <button
            className="bg-white p-1 rounded-full text-xl z-10 text-black"
            onClick={handlePrevious}
          >
            <FaAngleLeft />
          </button>
          <button
            className="bg-white p-1 rounded-full text-xl z-10 text-black"
            onClick={handleNext}
          >
            <FaAngleRight />
          </button>
        </div>
        {isPlayingVideo && (
          <VideoPlayer
            id={videoData.id}
            onClose={() => setIsPlayingVideo(false)}
            media_type={videoData.media_type}
          />
        )}

        {trendingData.map((data) => {
          // console.log(data);
          return (
            <div
              key={data.id}
              className={`min-h-[480px] lg:min-h-full min-w-full overflow-hidden relative  transition-all`}
              style={{ transform: `translate(-${currentImage * 100}%)` }}
            >
              <div className="w-full h-full object-cover">
                <img
                  src={imageUrl + data.backdrop_path}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>
              <div className="container mx-auto ">
                <div className="absolute bottom-0 max-w-md px-4">
                  <h2 className="font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl">
                    {data.title || data.name}
                  </h2>
                  <p className="text-ellipsis line-clamp-3 my-2">
                    {data.overview}
                  </p>
                  <div className="flex items-center gap-4">
                    <p>Rating: {Number(data.vote_average).toFixed(1)}+</p>
                    <span>|</span>
                    <p>Views: {Number(data.popularity).toFixed(0)}</p>
                  </div>
                  {
                    <button
                      className="bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-r from-orange-400 to-yellow-400 shadow-md transition-all hover:scale-105"
                      onClick={() => handlePlayVideo(data)}
                    >
                      Play now
                    </button>
                  }
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default BannerHome;
