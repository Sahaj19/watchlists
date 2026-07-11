import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from '../components/layout/AppLayout';
import StandaloneLayout from '../components/layout/StandaloneLayout';
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Watchlist from "../pages/Watchlist";
import MovieDetails from "../pages/MovieDetails";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages with Sidebar */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Route>

        {/* Standalone Pages */}
        <Route element={<StandaloneLayout />}>
          <Route path="/movie/:imdbID" element={<MovieDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;