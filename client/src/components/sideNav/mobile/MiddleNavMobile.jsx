import { Link, useLocation } from "react-router-dom";
import navLinks from "../navLinks";

function MiddleNavMobile({ onLinkClick }) {
  const location = useLocation();

  return (
    <div className="flex flex-col gap-2 pt-4">
      {navLinks.map((link) => {
        const isActive = location.pathname.startsWith(link.route);

        return (
          <Link
            to={link.route}
            key={link.route}
            onClick={onLinkClick}
            className="w-full"
          >
            <div
              className={`group flex p-3 gap-4 rounded-md text-lg items-center transition-colors duration-300
              ${
                isActive
                  ? "text-blue-700 bg-blue-50"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <link.icon
                className={`h-6 w-6 transition-colors duration-300 ${
                  isActive
                    ? "text-blue-700"
                    : "text-gray-500 group-hover:text-blue-700"
                }`}
              />
              <p
                className={`font-medium ${
                  isActive ? "text-blue-800" : "group-hover:text-black"
                }`}
              >
                {link.title}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default MiddleNavMobile;
