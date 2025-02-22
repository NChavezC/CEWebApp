import FormularioPaciente from "../features/pacientes/FormularioPaciente";
import ListPacientes from "../features/pacientes/ListPacientes";
import Modal from "../ui/Modal";

function Pacientes() {
  return (
    <div className="p-4 m-4 flex flex-col justify-center items-center">
      <ListPacientes />
      <Modal>
        <Modal.Open opens="formularioTratamiento">
          <button
            type="submit"
            className="w-auto py-2 px-4 my-2 mx-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          >
            Agregar Paciente
          </button>
        </Modal.Open>
        <Modal.Window name="formularioTratamiento">
          <FormularioPaciente mode="add" />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default Pacientes;
