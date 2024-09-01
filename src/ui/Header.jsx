import { Link } from "react-router-dom";
import SearchMovie from "../features/movie/SearchMovie";

function Header() {
  return (
    <header className="flex items-center justify-between px-3 py-2">
      <div className="logo">
        <Link to={"/"}>MovieO</Link>
      </div>
      <SearchMovie />
      <nav>
        <ul className="flex gap-10">
          <li>
            <Link to="/toprated">Top Rated</Link>
          </li>
          <li>
            <Link to="/popular">Popular</Link>
          </li>
          <li>
            <Link to="/genres">Genres</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
