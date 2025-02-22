import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import FormularioProfesional from "./FormularioProfesional";
import AdvertenciaBorrar from "../../ui/AdvertenciaBorrar";
import { useDeleteProfesional } from "./useDeleteProfesional";

function ProfesionalRow({ profesional }) {
  const deleteProfesionalMutation = useDeleteProfesional();
  return (
    <>
      <Table.Row>
        <div>{profesional.nombre}</div>
        <div>{profesional.tipo}</div>
        <div>
          <Modal>
            <Modal.Open opens="formularioUserEdit">
              <button className="mx-2">
                <HiOutlinePencil />
              </button>
            </Modal.Open>
            <Modal.Window name="formularioUserEdit">
              <FormularioProfesional
                profesionalId={profesional.id}
                nombre={profesional.nombre}
                tipo={profesional.tipo}
                mode="edit"
              />
            </Modal.Window>
          </Modal>

          <Modal>
            <Modal.Open opens="formularioUserDelete">
              <button className="mx-2">
                <HiOutlineTrash />
              </button>
            </Modal.Open>
            <Modal.Window name="formularioUserDelete">
              <AdvertenciaBorrar
                instancia="al profesional"
                id={profesional.id}
                onDelete={deleteProfesionalMutation}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default ProfesionalRow;
