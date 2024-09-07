import { IoClose } from "react-icons/io5";
import { getContentVideo } from "../utils/apiGetContent";
import { useEffect, useState } from "react";

function VideoPlayer({ id, onClose, media_type }) {
  const [videoData, setVideoData] = useState([]);
  const mediaType = media_type;

  async function fetchVideos() {
    const response = await getContentVideo(mediaType, id);

    setVideoData(
      response.results.filter((el) => el.official && el.type === "Trailer")[0]
    );
  }

  useEffect(() => {
    fetchVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="fixed bg-neutral-700 top-0 right-0 left-0 bottom-0 z-40 bg-opacity-50 flex items-center justify-center">
      <div className="bg-black w-[80vw] aspect-video rounded relative">
        <button className="absolute -top-7 -right-1 text-3xl" onClick={onClose}>
          <IoClose />
        </button>

        {videoData ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoData?.key}`}
            className="w-full h-full"
            allowFullScreen
          />
        ) : (
          <span className="w-full h-full flex items-center justify-center">
            Video not available
          </span>
        )}
      </div>
    </section>
  );
}

export default VideoPlayer;
