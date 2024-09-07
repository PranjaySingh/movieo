import { useParams } from "react-router-dom";
import { discoverContent } from "../utils/apiGetContent";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Loading from "../components/Loading";

function ExplorePage() {
  const { explore } = useParams();
  const [discoverData, setDiscoverData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchDiscoverContent() {
    setIsLoading(true);
    try {
      const response = await discoverContent(explore, currentPage);

      setDiscoverData((data) => [...data, ...response.results]);
      setTotalPages(response.total_pages);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (currentPage !== 1 && currentPage <= totalPages) fetchDiscoverContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    setDiscoverData([]);
    fetchDiscoverContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [explore]);

  function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setCurrentPage((page) => page + 1);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(explore);
  return (
    <div className="py-16">
      <div className="container mx-auto px-3">
        <h3 className="capitalize text-lg lg:text-2xl font-bold my-3">
          Discover {explore === "tv" ? "TV shows" : "movies"}
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-5 2xl:gap-6 justify-items-center">
          {discoverData.map((dataItem, index) => (
            <Card
              key={`${dataItem.id} ${index}`}
              data={dataItem}
              media_type={explore}
            />
          ))}
        </div>
        {isLoading && <Loading />}
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const data = await discoverContent(params.explore);

  return data;
}

export default ExplorePage;
