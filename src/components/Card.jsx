import moment from "moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Card({ data, trending = false, index, media_type }) {
  const { imageUrl } = useSelector((state) => state.movieo);

  const mediaType = data.media_type || media_type;

  return (
    <Link
      to={"/" + mediaType + "/" + data.id}
      className="w-full min-w-[230px] max-w-[230px] h-80 rounded-lg overflow-hidden relative block hover:scale-105 transition-all group"
    >
      {data?.poster_path ? (
        <img
          src={imageUrl + data?.poster_path}
          alt="content poster"
          className="w-full h-full"
        />
      ) : (
        <div className="h-full w-full bg-neutral-700 flex items-center justify-center text-lg text-white font-semibold text-center px-[8px]">
          {data.title || data.name}
        </div>
      )}

      <div className="absolute top-4">
        {trending && (
          <div className="py-1 px-4 backdrop-blur-3xl rounded-r-full bg-black/60">
            #{index + 1} Trending
          </div>
        )}
      </div>

      <div
        className={`absolute bottom-0 h-18 w-full backdrop-blur-3xl bg-black/60 p-2 lg:hidden lg:group-hover:block space-y-2`}
      >
        <h2 className="text-ellipsis line-clamp-1 text-lg font-semibold">
          {data.title || data.name}
        </h2>
        <div className="text-sm text-neutral-400 flex justify-between items-center">
          <p className="">{moment(data.release_date).format("MMM Do YYYY")}</p>
          <p className="bg-neutral-800 px-2 py-1 rounded-full text-xs text-white">
            Rating: {Number(data.vote_average).toFixed(1)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
