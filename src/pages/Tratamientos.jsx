import ListTratamientos from "../features/tratamientos/ListTratamientos";
import FormularioTratamientos from "../features/tratamientos/FormularioTratamientos";
import Modal from "../ui/Modal";

function Tratamientos() {
  return (
    <div className="p-4 m-4 flex flex-col justify-center items-center">
      <ListTratamientos />
      <Modal>
        <Modal.Open opens="formularioTratamiento">
          <button
            type="submit"
            className="w-auto py-2 px-4 my-2 mx-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          >
            Agregar Tratamiento
          </button>
        </Modal.Open>
        <Modal.Window name="formularioTratamiento">
          <FormularioTratamientos mode="add" />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default Tratamientos;
