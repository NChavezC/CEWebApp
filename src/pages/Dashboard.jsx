import { useGetPacientes } from "../features/pacientes/useGetPacientes";
import { useGetProfesionales } from "../features/profesionales/useGetProfesionales";
import { useGetUsers } from "../features/users/useGetUsers";
import { useGetTratamientos } from "../features/tratamientos/useGetTratamientos";
import Spinner from "../ui/Spinner";
import { useGetReservas } from "../features/reserva/useGetReservas";
import Stats from "../features/dashboard/Stats";

function Dashboard() {
  const { data: pacientes, isLoading: loadingPacientes } = useGetPacientes();
  const { data: users, isLoading: loadingUsers } = useGetUsers();
  const { data: profesionales, isLoading: loadingProfesionales } =
    useGetProfesionales();
  const { data: tratamientos, isLoading: loadingTratamientos } =
    useGetTratamientos();
  const { data: reservas, isLoading: loadingReservas } = useGetReservas();
  if (
    loadingPacientes ||
    loadingUsers ||
    loadingProfesionales ||
    loadingTratamientos ||
    loadingReservas
  ) {
    return <Spinner />;
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold m-5">Dashboard</h1>
      <Stats
        users={users}
        pacientes={pacientes}
        profesionales={profesionales}
        reservas={reservas}
        tratamientos={tratamientos}
      />
    </div>
  );
}

export default Dashboard;
