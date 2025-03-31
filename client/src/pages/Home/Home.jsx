import NoReservationsWidget from "./components/widgets/NoReservationsWidget";
import PricesListWidget from "./components/widgets/PricesListWidget";

export default function Home() {
  console.log("Home component rendered");
  return (
    <div className="h-screen grow bg-blue-100/50">
      <h1>Home</h1>
      {/* <NoReservationsWidget /> */}

      <PricesListWidget />
    </div>
  );
}
