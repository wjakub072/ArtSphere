import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCartOutline, ShoppingCart } from "heroicons-react";
import AuthContext from "../../../context/AuthContext";

function Menu() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-black text-white relative z-10 p-4">
      <ul className="flex justify-center items-center flex-wrap sm:space-x-4">
        <li className="my-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-400 hover:text-indigo-400 focus:text-indigo-400 focus:outline-none px-3 py-2 text-2xl font-medium transition-colors"
                : "hover:text-indigo-400 focus:text-indigo-400 focus:outline-none px-3 py-2 text-2xl font-medium transition-colors"
            }
          >
            Home
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
                  ? "text-indigo-400 hover:text-indigo-400 focus:text-indigo-400 focus:outline-none px-3 py-2 transition-colors"
                  : "hover:text-indigo-400 focus:text-indigo-400 focus:outline-none px-3 py-2 transition-colors"
              }
            >
              <ShoppingCartOutline />
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Menu;
