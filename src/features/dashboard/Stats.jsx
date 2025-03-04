import {
  HiOutlineBookOpen,
  HiOutlineBriefcase,
  HiOutlineCurrencyDollar,
  HiOutlineHeart,
  HiOutlineUser,
} from "react-icons/hi2";
import Stat from "./Stat";

function Stats({ users, pacientes, profesionales, tratamientos, reservas }) {
  return (
    <div className="flex flex-row justify-center items-center">
      <Stat
        icon={<HiOutlineHeart />}
        title="Pacientes"
        value={pacientes.length}
        color="yellow"
      />
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Profesionales"
        value={profesionales.length}
        color="indigo"
      />
      <Stat
        icon={<HiOutlineBookOpen />}
        title="Reservas"
        value={reservas.length}
        color="gray"
      />
      <Stat
        icon={<HiOutlineCurrencyDollar />}
        title="Tratamientos"
        value={tratamientos.length}
        color="green"
      />
    </div>
  );
}

export default Stats;
