import { NavLink } from "react-router-dom";
import {
  HiOutlineBookOpen,
  HiOutlineBriefcase,
  HiOutlineCog6Tooth,
  HiOutlineCurrencyDollar,
  HiOutlineHeart,
  HiOutlineHome,
  /* HiOutlineUser, */
} from "react-icons/hi2";

function Sidebar() {
  return (
    <aside className="col-span-1 row-span-1 border-r border-gray-300">
      <ul className="py-4">
        <li className="py-4 px-3">
          <NavLink to="/dashboard" className={"flex flex-row items-center"}>
            <HiOutlineHome /> <span className="p-2 m-2">Dashboard</span>
          </NavLink>
        </li>
        {/* <li className="py-4 px-3">
          <NavLink to="/users" className={"flex flex-row items-center"}>
            <HiOutlineUser /> <span className="p-2 m-2">Users</span>
          </NavLink>
        </li> */}
        <li className="py-4 px-3">
          <NavLink to="/pacientes" className={"flex flex-row items-center"}>
            <HiOutlineHeart /> <span className="p-2 m-2">Pacientes</span>
          </NavLink>
        </li>
        <li className="py-4 px-3">
          <NavLink to="/reservas" className={"flex flex-row items-center"}>
            <HiOutlineBookOpen /> <span className="p-2 m-2">Reservas</span>
          </NavLink>
        </li>
        <li className="py-4 px-3">
          <NavLink to="/tratamientos" className={"flex flex-row items-center"}>
            <HiOutlineCurrencyDollar />{" "}
            <span className="p-2 m-2">Tratamientos</span>
          </NavLink>
        </li>
        <li className="py-4 px-3">
          <NavLink to="/profesionales" className={"flex flex-row items-center"}>
            <HiOutlineBriefcase />{" "}
            <span className="p-2 m-2">Profesionales</span>
          </NavLink>
        </li>
        <li className="py-4 px-3">
          <NavLink to="/configuracion" className={"flex flex-row items-center"}>
            <HiOutlineCog6Tooth />{" "}
            <span className="p-2 m-2">Configuración</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
