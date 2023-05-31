import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";

const UserViewNav = (props) => {
  const { logout, user } = useContext(AuthContext);
  const url = "/profil";
  return (
    <div className="mb-4 md:mb-0">
      <ul className="text-xl tracking-wider rounded-lg text-indigo-500 inline-flex flex-wrap justify-center gap-3 md:block md:w-max">
        <li className="md:py-2 md:px-3">
          <NavLink
            to={`${url}/`}
            className={({ isActive }) =>
              isActive
                ? "text-indigo-800 hover:text-indigo-800 focus:text-indigo-800 focus:outline-none focus:underline text-2xl font-medium transition-colors"
                : "hover:text-indigo-800 focus:text-indigo-800 focus:outline-none focus:underline text-2xl font-medium transition-colors"
            }
          >
            Profil
          </NavLink>
        </li>
        <li className="md:py-2 md:px-3">
          <NavLink
            to={`${url}/mojeZakupy`}
            className={({ isActive }) =>
              isActive
                ? "text-indigo-800 hover:text-indigo-800 focus:text-indigo-800 focus:outline-none focus:underline text-2xl font-medium transition-colors"
                : "hover:text-indigo-800 focus:text-indigo-800 focus:outline-none focus:underline text-2xl font-medium transition-colors"
            }
          >
            Moje zakupy
          </NavLink>
        </li>
        <li className="md:py-2 md:px-3">
          <NavLink
            to={`${url}/ulubione`}
            className={({ isActive }) =>
              isActive
                ? "text-indigo-800 hover:text-indigo-800 focus:text-indigo-800 focus:outline-none focus:underline text-2xl font-medium transition-colors"
                : "hover:text-indigo-800 focus:text-indigo-800 focus:outline-none focus:underline text-2xl font-medium transition-colors"
            }
          >
            Ulubione
          </NavLink>
        </li>
        <li className="md:py-2 md:px-3">
          <NavLink
            to={`${url}/Portfel`}
            className={({ isActive }) =>
              isActive
                ? "text-indigo-800 hover:text-indigo-800 focus:text-indigo-800 focus:outline-none focus:underline text-2xl font-medium transition-colors"
                : "hover:text-indigo-800 focus:text-indigo-800 focus:outline-none focus:underline text-2xl font-medium transition-colors"
            }
          >
            Portfel
          </NavLink>
        </li>
        <li className="md:py-2 md:px-3">
          <NavLink
            to={`${url}/adresDostawy`}
            className={({ isActive }) =>
              isActive
                ? "text-indigo-800 hover:text-indigo-800 focus:text-indigo-800 focus:outline-none focus:underline text-2xl font-medium transition-colors"
                : "hover:text-indigo-800 focus:text-indigo-800 focus:outline-none focus:underline text-2xl font-medium transition-colors"
            }
          >
            Adres dostawy
          </NavLink>
        </li>
        <li className="md:py-2 md:px-3">
          <NavLink
            to={`${url}/daneDoFaktury`}
            className={({ isActive }) =>
              isActive
                ? "text-indigo-800 hover:text-indigo-800 focus:text-indigo-800 focus:outline-none focus:underline text-2xl font-medium transition-colors"
                : "hover:text-indigo-800 focus:text-indigo-800 focus:outline-none focus:underline text-2xl font-medium transition-colors"
            }
          >
            Dane do faktury
          </NavLink>
        </li>
        <li className="md:py-2 md:px-3">
          <NavLink
            to={`${url}/ustawieniaKonta`}
            className={({ isActive }) =>
              isActive
                ? "text-indigo-800 hover:text-indigo-800 focus:text-indigo-800 focus:outline-none focus:underline text-2xl font-medium transition-colors"
                : "hover:text-indigo-800 focus:text-indigo-800 focus:outline-none focus:underline text-2xl font-medium transition-colors"
            }
          >
            Ustawienia konta
          </NavLink>
        </li>
        {(user === "artysta" || user === "administrator") && (
          <li className="md:py-2 md:px-3">
            <NavLink
              to={`${url}/twojeDziela`}
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-800 hover:text-indigo-800 focus:text-indigo-800 focus:outline-none focus:underline text-2xl font-medium transition-colors"
                  : "hover:text-indigo-800 focus:text-indigo-800 focus:outline-none focus:underline text-2xl font-medium transition-colors"
              }
            >
              Twoje dzieła
            </NavLink>
          </li>
        )}

        {user === "administrator" && (
          <li className="md:py-2 md:px-3">
            <NavLink
              to={`${url}/panelAdministratora`}
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-800 hover:text-indigo-800 focus:text-indigo-800 focus:outline-none focus:underline text-2xl font-medium transition-colors"
                  : "hover:text-indigo-800 focus:text-indigo-800 focus:outline-none focus:underline text-2xl font-medium transition-colors"
              }
            >
              Panel Administratora
            </NavLink>
          </li>
        )}

        <li className="md:py-2 md:px-3">
          <button
            onClick={() => logout()}
            className="hover:text-indigo-800 focus:text-indigo-800 focus:outline-none focus:underline text-2xl font-medium transition-colors"
          >
            Wyloguj
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserViewNav;
