import "./App.css";
import "./components/sideNav/SideNav";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Clients from "./pages/Clients/Clients";
import Reservations from "./pages/Reservations/Reservations";
import Stats from "./pages/Stats/Stats";
import SideNav from "./components/sideNav/SideNav";
import ClientProfile from "./pages/ClientProfile/ClientProfile";
import CampingMap from "./pages/CampingMap/CampingMap";

function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideNav />
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/acasa" element={<Home />} />
          <Route path="/clienti" element={<Clients />} />
          <Route path="/clienti/:id" element={<ClientProfile />} />
          <Route path="/rezervari" element={<Reservations />} />
          <Route path="/map" element={<CampingMap />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
