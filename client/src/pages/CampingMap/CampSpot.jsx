export default function CampSpot({ name, status, onClick }) {
  const colorMap = {
    available: "bg-green-400 hover:bg-green-500 cursor-pointer",
    occupied: "bg-red-500 cursor-not-allowed",
    selected: "bg-yellow-400",
  };

  return (
    <div
      onClick={status === "available" ? onClick : null}
      className={`w-16 h-24 flex items-center justify-center text-sm text-white font-bold rounded-lg ${colorMap[status]}`}
    >
      {name}
    </div>
  );
}
