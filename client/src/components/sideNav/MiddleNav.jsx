import { Link, useLocation } from "react-router-dom";
import navLinks from "./navLinks";

function MiddleNav({ isExpanded }) {
  const location = useLocation();

  return (
    <div
      className={`flex p-3 pt-8 flex-col gap-2 items-center${
        isExpanded ? "w-max" : "w-fit"
      }`}
    >
      {navLinks.map((link) => {
        const isActive = location.pathname.startsWith(link.route);

        return (
          <Link
            to={link.route}
            key={link.route}
            className={`transition-all duration-300 ease-in-out ${
              isExpanded ? "w-52" : "w-fit"
            }`}
          >
            <div
              className={`group relative flex p-2 gap-4 rounded-sm hover:bg-linear-to-r hover:from-blue-50 hover:to-blue-100/80 hover:cursor-pointer hover:transition-colors hover:duration-300 hover:ease-in-out ${
                isActive
                  ? "text-blue-700 bg-linear-to-r from-blue-50 to-blue-100/80"
                  : "text-gray-400"
              }
              ${isExpanded ? "" : "w-fit"}
             `}
            >
              <link.icon
                className={`h-6 w-6 transition-all duration-300 ease-in-out ${
                  isActive ? "text-blue-700" : "group-hover:text-blue-700"
                }`}
              />
              <p
                className={`font-medium transition-all duration-300 ease-in-out ${
                  isActive ? "text-blue-800" : "group-hover:text-blue-950"
                }
                ${isExpanded ? "opacity-100 block" : "opacity-0 hidden"}`}
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

export default MiddleNav;
