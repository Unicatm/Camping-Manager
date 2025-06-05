import "./App.css";
import "./components/sideNav/SideNav";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Clients from "./pages/Clients/Clients";
import Reservations from "./pages/Reservations/Reservations";
import Stats from "./pages/Stats/Stats";
import ClientProfile from "./pages/ClientProfile/ClientProfile";
import CampingMap from "./pages/CampingMap/CampingMap";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import NoSidebarLayout from "./layouts/NoSidebarLayout";
import SidebarLayout from "./layouts/SideBarLayout";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<NoSidebarLayout />}>
        <Route path="/" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route element={<SidebarLayout />}>
          <Route path="/acasa" element={<Home />} />
          <Route path="/clienti" element={<Clients />} />
          <Route path="/clienti/:id" element={<ClientProfile />} />
          <Route path="/rezervari" element={<Reservations />} />
          <Route path="/map" element={<CampingMap />} />
          <Route path="/stats" element={<Stats />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
