import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import AdvertenciaBorrar from "../../ui/AdvertenciaBorrar";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteTratamiento } from "./useDeleteTratamiento";
import FormularioTratamiento from "./FormularioTratamientos";

function TratamientoRow({ tratamiento }) {
  const deleteTratamientoMutation = useDeleteTratamiento();
  return (
    <>
      <Table.Row>
        <div>{tratamiento.nombre}</div>
        <div>{formatCurrency(tratamiento.precio)}</div>
        <div>{tratamiento.duracion_minutos}</div>
        <div>
          <Modal>
            <Modal.Open opens="formularioTratamientoEdit">
              <button className="mx-2">
                <HiOutlinePencil />
              </button>
            </Modal.Open>
            <Modal.Window name="formularioTratamientoEdit">
              <FormularioTratamiento
                tratamientoId={tratamiento.id}
                nombre={tratamiento.nombre}
                descripcion={tratamiento.descripcion}
                duracion_minutos={tratamiento.duracion_minutos}
                precio={tratamiento.precio}
                mode="edit"
              />
            </Modal.Window>
          </Modal>

          <Modal>
            <Modal.Open opens="formularioTratamientoDelete">
              <button className="mx-2">
                <HiOutlineTrash />
              </button>
            </Modal.Open>
            <Modal.Window name="formularioTratamientoDelete">
              <AdvertenciaBorrar
                instancia="el tratamiento"
                id={tratamiento.id}
                onDelete={deleteTratamientoMutation}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default TratamientoRow;
