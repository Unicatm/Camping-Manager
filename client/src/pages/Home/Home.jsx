import PricesListWidget from "./components/widgets/PricesListWidget";

export default function Home() {
  return (
    <div className="h-screen grow bg-blue-50/90">
      <div className="relative w-11/12 h-full mx-auto py-8 flex flex-col">
        <PricesListWidget />
      </div>
    </div>
  );
}
