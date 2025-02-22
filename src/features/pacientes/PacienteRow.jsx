import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import AdvertenciaBorrar from "../../ui/AdvertenciaBorrar";
import FormularioPaciente from "./FormularioPaciente";
import { useDeletePaciente } from "./useDeletePaciente";

function PacienteRow({ paciente }) {
  const deletePacienteMutation = useDeletePaciente();
  return (
    <>
      <Table.Row>
        <div>{paciente.nombre}</div>
        <div>{paciente.apellido}</div>
        <div>{paciente.email}</div>
        <div>{paciente.telefono}</div>
        <div>{paciente.fecha_nacimiento}</div>
        <div>
          <Modal>
            <Modal.Open opens="formularioUserEdit">
              <button className="mx-2">
                <HiOutlinePencil />
              </button>
            </Modal.Open>
            <Modal.Window name="formularioUserEdit">
              <FormularioPaciente
                pacienteId={paciente.id}
                nombre={paciente.nombre}
                apellido={paciente.apellido}
                email={paciente.email}
                telefono={paciente.telefono}
                fecha_nacimiento={paciente.fecha_nacimiento}
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
                instancia="al paciente"
                id={paciente.id}
                onDelete={deletePacienteMutation}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default PacienteRow;
