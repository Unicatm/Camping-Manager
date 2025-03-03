import { Link, useLocation } from "react-router-dom";
import navLinks from "./navLinks";

function MiddleNav() {
  const location = useLocation();

  return (
    <div className="flex pl-4 pt-8 flex-col gap-2">
      {navLinks.map((link) => {
        const isActive = location.pathname === link.route;

        return (
          <Link to={link.route} key={link.route}>
            <div
              className={`group relative flex p-2 gap-4 transition-all duration-300 ease-in-out hover:cursor-pointer before:absolute before:bg-blue-700 before:rounded-2xl before:inset-y-0 before:right-0 before:block before:w-1 before:transition-colors before:duration-300 before:ease-in-out ${
                isActive
                  ? "text-blue-700 before:opacity-100"
                  : "text-gray-400 before:opacity-0 hover:before:opacity-100"
              }`}
            >
              <link.icon
                className={`h-6 w-6 transition-all duration-300 ease-in-out ${
                  isActive ? "text-blue-700" : "group-hover:text-blue-700"
                }`}
              />
              <p
                className={`font-medium transition-all duration-300 ease-in-out ${
                  isActive ? "text-blue-950" : "group-hover:text-blue-950"
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

export default MiddleNav;
