import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import ReservaRow from "./ReservaRow";
import { useGetReservas } from "./useGetReservas";

function ListReservas() {
  const { data: reservas = [], isLoading } = useGetReservas();
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <div>
        <h1 className="text-3xl font-semibold m-5">Reservas</h1>

        <Table columns="2fr 1fr 1fr 1fr 1fr 1fr 2fr 1fr">
          <Table.Header>
            <div>Tratamiento</div>
            <div>Fecha</div>
            <div>Hora Inicio</div>
            <div>Hora Fin</div>
            <div>Estado</div>
            <div>Nombre Profesional</div>
            <div>Nombre Paciente</div>
          </Table.Header>
          <Table.Body
            data={reservas}
            render={(reserva) => (
              <ReservaRow reserva={reserva} key={reserva.id} />
            )}
          />
        </Table>
      </div>
    </div>
  );
}

export default ListReservas;
