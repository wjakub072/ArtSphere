import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ShoppingCartOutline, ShoppingCart } from "heroicons-react";
import AuthContext from "../../../context/AuthContext";

function Menu() {
  const { user, logout, isCarts } = useContext(AuthContext);
  const location = useLocation();
  const [isActive, setIsActive] = useState(location.pathname === "/");

  const [imageSrc, setImageSrc] = useState(
    require("../../../assets/art_sphere_logo.png")
  );

  useEffect(() => {
    if (location.pathname === "/") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [location.pathname]);

  const handleMouseEnter = () => {
    setImageSrc(require("../../../assets/art_sphere_logo_hover.png"));
  };

  const handleMouseLeave = () => {
    setImageSrc(require("../../../assets/art_sphere_logo.png"));
  };

  return (
    <nav className="bg-black text-white relative z-10">
      <ul className="flex justify-center items-center flex-wrap sm:space-x-4">
        <li className="">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? " text-indigo-400 hover:text-indigo-400 focus:text-indigo-400 focus:outline-none px-3 py-2 text-2xl font-medium transition-colors"
                : "hover:text-indigo-400 focus:text-indigo-400 focus:outline-none px-3 py-2 text-2xl font-medium transition-colors"
            }
          >
            <img
              src={
                isActive
                  ? require("../../../assets/art_sphere_logo_hover.png")
                  : imageSrc
              }
              alt=""
              className="w-auto h-14"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            ></img>
          </NavLink>
        </li>
        <li className="my-2">
          <NavLink
            to="/galeria"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-400 hover:text-indigo-400 focus:text-indigo-400 focus:outline-none px-3 py-2 text-2xl font-medium transition-colors"
                : "hover:text-indigo-400 focus:text-indigo-400 focus:outline-none px-3 py-2 text-2xl font-medium transition-colors"
            }
          >
            Galeria
          </NavLink>
        </li>
        <li className="my-2">
          <NavLink
            to="/artysci"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-400 hover:text-indigo-400 focus:text-indigo-400 focus:outline-none px-3 py-2 text-2xl font-medium transition-colors"
                : "hover:text-indigo-400 focus:text-indigo-400 focus:outline-none px-3 py-2 text-2xl font-medium transition-colors"
            }
          >
            Artyści
          </NavLink>
        </li>
        {!user && (
          <li className="my-2">
            <NavLink
              to="/logowanie"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-400 hover:text-indigo-400 focus:text-indigo-400 focus:outline-none px-3 py-2 text-2xl font-medium transition-colors"
                  : "hover:text-indigo-400 focus:text-indigo-400 focus:outline-none px-3 py-2 text-2xl font-medium transition-colors"
              }
            >
              Logowanie
            </NavLink>
          </li>
        )}
        {!user && (
          <li className="my-2">
            <NavLink
              to="/rejestracja"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-400 hover:text-indigo-400 focus:text-indigo-400 focus:outline-none px-3 py-2 text-2xl font-medium transition-colors"
                  : "hover:text-indigo-400 focus:text-indigo-400 focus:outline-none px-3 py-2 text-2xl font-medium transition-colors"
              }
            >
              Rejestracja
            </NavLink>
          </li>
        )}
        {user && (
          <li className="my-2">
            <NavLink
              to="/profil"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-400 hover:text-indigo-400 focus:text-indigo-400 focus:outline-none px-3 py-2 text-2xl font-medium transition-colors"
                  : "hover:text-indigo-400 focus:text-indigo-400 focus:outline-none px-3 py-2 text-2xl font-medium transition-colors"
              }
            >
              Profil
            </NavLink>
          </li>
        )}
        {user && (
          <li className="my-2">
            <button
              className=" hover:text-indigo-400 focus:text-indigo-400 focus:outline-none px-3 text-2xl font-medium transition-colors"
              onClick={() => logout()}
            >
              Wyloguj
            </button>
          </li>
        )}
        {user && (
          <li className="my-2">
            <NavLink
              to="/koszyk"
              className={({ isActive }) =>
                isActive
                  ? `text-indigo-400 hover:text-indigo-400 focus:text-indigo-400 focus:outline-none px-3 py-2 transition-colors`
                  : `${
                      isCarts && "text-red-500"
                    } hover:text-indigo-400 focus:text-indigo-400 focus:outline-none px-3 py-2 transition-colors`
              }
            >
              {isCarts ? <ShoppingCart /> : <ShoppingCartOutline />}
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Menu;
