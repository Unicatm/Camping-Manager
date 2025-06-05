import { useNavigate } from "react-router-dom";
import { HiLogout } from "react-icons/hi";
import { useAuth } from "../../pages/LoginPage/useAuth";

export default function BottomNav({ isExpanded }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <button
        onClick={handleLogout}
        to={"/"}
        key={"logout"}
        className={`transition-all duration-300 ease-in-out p-3 w-full border-t-[1px] border-blue-800/20 ${
          isExpanded ? "w-52" : "w-fit"
        }`}
      >
        <div className="group relative flex p-2 gap-4 rounded-sm text-slate-400 hover:text-slate-500/80 hover:bg-slate-100/80 hover:cursor-pointer hover:transition-colors hover:duration-300 hover:ease-in-out">
          <HiLogout className="h-6 w-6 transition-all duration-300 ease-in-out" />
          <p
            className={`font-medium transition-all duration-300 ease-in-out
                ${isExpanded ? "opacity-100 block" : "opacity-0 hidden"}`}
          >
            Logout
          </p>
        </div>
      </button>
    </>
  );
}
