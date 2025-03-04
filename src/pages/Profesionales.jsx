import FormularioProfesional from "../features/profesionales/FormularioProfesional";
import ListProfesionales from "../features/profesionales/ListProfesionales";
import Modal from "../ui/Modal";

function Profesionales() {
  return (
    <div className="p-4 m-4 flex flex-col justify-center items-center">
      <ListProfesionales />
      <Modal>
        <Modal.Open opens="formularioProfesional">
          <button
            type="submit"
            className="w-auto py-2 px-4 my-2 mx-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          >
            Agregar Profesional
          </button>
        </Modal.Open>
        <Modal.Window name="formularioProfesional">
          <FormularioProfesional mode="add" />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default Profesionales;
