import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";

import TopRated from "./pages/TopRated";
import Popular from "./pages/Popular";
import Home, { loader as nowPlayingLoader } from "./pages/Home";
import Genres, { loader as genresLoader } from "./pages/Genres";
import Genre, { loader as genreMoviesLoader } from "./features/genre/Genre";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
        loader: nowPlayingLoader,
      },
      {
        path: "/toprated",
        element: <TopRated />,
      },
      {
        path: "/popular",
        element: <Popular />,
      },
      {
        path: "/genres",
        element: <Genres />,
        loader: genresLoader,
      },
      {
        path: "/genres/:genreId",
        element: <Genre />,
        loader: genreMoviesLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
