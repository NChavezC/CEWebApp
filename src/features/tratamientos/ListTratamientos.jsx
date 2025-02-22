import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import TratamientoRow from "./TratamientoRow";
import { useGetTratamientos } from "./useGetTratamientos";

function ListTratamientos() {
  const { data: tratamientos = [], isLoading } = useGetTratamientos();
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <div>
        <h1 className="text-3xl font-semibold m-5">Tratamientos</h1>

        <Table columns="1fr 1fr 1fr 1fr">
          <Table.Header>
            <div>Nombre y Apellido</div>
            <div>Precio ($)</div>
            <div>Duración (mins)</div>
          </Table.Header>
          <Table.Body
            data={tratamientos}
            render={(tratamiento) => (
              <TratamientoRow tratamiento={tratamiento} key={tratamiento.id} />
            )}
          />
        </Table>
      </div>
    </div>
  );
}

export default ListTratamientos;
