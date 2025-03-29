import "./App.css";
import "./components/sideNav/SideNav";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Clients from "./pages/Clients/Clients";
import Reservations from "./pages/Reservations/Reservations";
import Stats from "./pages/Stats/Stats";
import SideNav from "./components/sideNav/SideNav";
import ClientsReservations from "./pages/ClientsReservations/ClientsReservations";

function App() {
  return (
    <div className="h-screen flex">
      <SideNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/acasa" element={<Home />} />
        <Route path="/clienti" element={<Clients />} />
        <Route path="/clienti/:id" element={<ClientsReservations />} />
        <Route path="/rezervari" element={<Reservations />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </div>
  );
}

export default App;
