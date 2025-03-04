import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import { useGetProfesionales } from "./useGetProfesionales";
import ProfesionalRow from "./ProfesionalRow";

function ListProfesionales() {
  const { data: profesionales = [], isLoading } = useGetProfesionales();
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <div>
        <h1 className="text-3xl font-semibold m-5">Profesionales</h1>

        <Table columns="2fr 1fr 1fr">
          <Table.Header>
            <div>Nombre Completo</div>
            <div>Tipo</div>
            <div></div>
          </Table.Header>
          <Table.Body
            data={profesionales}
            render={(profesional) => (
              <ProfesionalRow profesional={profesional} key={profesional.id} />
            )}
          />
        </Table>
      </div>
    </div>
  );
}

export default ListProfesionales;
