import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { HiMagnifyingGlass } from "react-icons/hi2";
import { navigation } from "../utils/navigation";

function Header() {
  const location = useLocation();
  const inputFormQuery = location?.search.slice(3)?.split("%20")?.join(" ");
  const [searchQuery, setSearchQuery] = useState(inputFormQuery);
  const [timeoutId, setTimeoutId] = useState(null);
  const navigate = useNavigate();

  function handleSearch(value) {
    setSearchQuery(value);
    clearTimeout(timeoutId);
    setTimeoutId(
      setTimeout(() => {
        if (value === "") return;

        navigate(`search?q=${value}`);
      }, 1000)
    );
  }

  useEffect(() => {
    return () => clearTimeout(timeoutId);
  }, [timeoutId]);

  // useEffect(() => {
  //   if (searchQuery === "") return;
  //   navigate(`search?q=${searchQuery}`);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchQuery]);

  return (
    <header className="fixed top-0 w-full h-16 bg-black bg-opacity-75 z-40">
      <div className="container mx-auto px-4 flex items-center h-full">
        <Link to="/">
          <img src="/Logo.png" alt="logo" width={120} />
        </Link>
        <nav className="hidden lg:flex gap-1 ml-5">
          {navigation.map((nav, index) => (
            <div key={index}>
              <NavLink
                to={nav.href}
                className={({ isActive }) =>
                  `px-2 hover:text-neutral-100 ${
                    isActive && "text-neutral-100"
                  }`
                }
              >
                {nav.label}
              </NavLink>
            </div>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-5">
          <form
            className=" items-center gap-2 hidden lg:flex"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Search here..."
              className="bg-transparent px-4 lg:py-2 py-1 outline-none border-none "
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <button className="text-2xl text-yellow-500 ">
              <HiMagnifyingGlass />
            </button>
          </form>

          {/* <div className="text-yellow-400 text-4xl cursor-pointer active:scale-75 transition-all">
            <HiMiniUserCircle />
          </div> */}
        </div>
      </div>
    </header>
  );
}

export default Header;
