import { BiSolidMoviePlay } from "react-icons/bi";
import { HiMagnifyingGlass, HiMiniHome } from "react-icons/hi2";
import { PiTelevisionFill } from "react-icons/pi";

export const navigation = [
  {
    label: "TV shows",
    href: "tv",
    icon: <PiTelevisionFill />,
  },
  {
    label: "Movies",
    href: "movie",
    icon: <BiSolidMoviePlay />,
  },
];

export const mobileNavigation = [
  {
    label: "Home",
    href: "/",
    icon: <HiMiniHome />,
  },
  ...navigation,
  {
    label: "Search",
    href: "search",
    icon: <HiMagnifyingGlass />,
  },
];
