import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import PacienteRow from "./PacienteRow";
import { useGetPacientes } from "./useGetPacientes";

function ListPacientes() {
  const { data: pacientes = [], isLoading } = useGetPacientes();
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <div>
        <h1 className="text-3xl font-semibold m-5">Pacientes</h1>
        <Table columns="1fr 1fr 1fr 1fr 1fr 1fr">
          <Table.Header>
            <div>Nombre</div>
            <div>Apellido</div>
            <div>Email</div>
            <div>Teléfono</div>
            <div>Fecha de Nacimiento</div>
          </Table.Header>
          <Table.Body
            data={pacientes}
            render={(paciente) => (
              <PacienteRow paciente={paciente} key={paciente.id} />
            )}
          />
        </Table>
      </div>
    </div>
  );
}

export default ListPacientes;
