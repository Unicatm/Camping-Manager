import { useNavigate } from "react-router-dom";
import { HiLogout } from "react-icons/hi";
import { useAuth } from "../../../pages/LoginPage/useAuth";

export default function BottomNavMobile({ onLogoutClick }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    onLogoutClick();
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className="w-full mt-4 border-t border-gray-200 pt-4"
      >
        <div className="group flex p-3 gap-4 rounded-md text-lg items-center text-gray-600 hover:bg-gray-100 hover:text-red-600 transition-colors duration-300">
          <HiLogout className="h-6 w-6 transition-colors duration-300" />
          <p className="font-medium">Logout</p>
        </div>
      </button>
    </>
  );
}
