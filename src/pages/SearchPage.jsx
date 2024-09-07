import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSearchContent } from "../utils/apiGetContent";
import Card from "../components/Card";

function SearchPage() {
  const location = useLocation();
  const [searchData, setSearchData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searQuery, setSearchQuery] = useState(
    location?.search.slice(3)?.split("%20")?.join(" ")
  );
  const [timeoutId, setTimeoutId] = useState(null);
  const navigate = useNavigate();

  async function fetchSearchData() {
    const response = await getSearchContent(
      location.search.slice(3),
      currentPage
    );

    setSearchData((data) => [...data, ...response.results]);
    setTotalPages(response.total_pages);
  }

  useEffect(() => {
    if (currentPage !== 1 && currentPage <= totalPages) {
      fetchSearchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    currentPage !== 1 && setCurrentPage(1);
    setSearchData([]);
    fetchSearchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.search]);

  function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setCurrentPage((page) => page + 1);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleInputChange(value) {
    setSearchQuery(value);
    clearTimeout(timeoutId);
    setTimeoutId(
      setTimeout(() => {
        if (value === "") return;
        console.log(`searching for ${value}`);
        navigate(`/search?q=${value}`);
      }, 1000)
    );
  }

  useEffect(() => {
    return () => clearTimeout(timeoutId);
  }, [timeoutId]);

  return (
    <div className="py-16">
      <div className="lg:hidden my-2 mx-1 sticky top-[72px] z-40">
        <input
          type="text"
          placeholder="search here..."
          onChange={(e) => handleInputChange(e.target.value)}
          className="px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900"
          value={searQuery}
        />
      </div>
      <div className="container mx-auto px-3">
        <h3
          className={`capitalize text-lg lg:text-2xl font-bold my-3 lg:block ${
            searchData.length === 0 ? "hidden" : ""
          }`}
        >
          Search Results
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-5 2xl:gap-6 justify-items-center">
          {searchData.map((dataItem, index) => (
            <Card
              key={`${dataItem.id} ${index}`}
              data={dataItem}
              media_type={dataItem.media_type}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
