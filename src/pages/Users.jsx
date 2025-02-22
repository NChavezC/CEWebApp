import FormularioUser from "../features/users/FormularioUser";
import ListUsuarios from "../features/users/ListUsuarios";
import Modal from "../ui/Modal";

function Users() {
  return (
    <div className="p-4 m-4 flex flex-col justify-center items-center">
      <ListUsuarios />
      <Modal>
        <Modal.Open opens="formularioUser">
          <button
            type="submit"
            className="w-auto py-2 px-4 my-2 mx-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          >
            Agregar Usuario
          </button>
        </Modal.Open>
        <Modal.Window name="formularioUser">
          <FormularioUser mode="add" />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default Users;
