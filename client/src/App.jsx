import "./App.css";
import "./components/sideNav/SideNav";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import Reservations from "./pages/Reservations";
import Stats from "./pages/Stats";
import SideNav from "./components/sideNav/SideNav";

function App() {
  return (
    <div className="h-screen flex">
      <SideNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/acasa" element={<Home />} />
        <Route path="/clienti" element={<Clients />} />
        <Route path="/rezervari" element={<Reservations />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </div>
  );
}

export default App;
