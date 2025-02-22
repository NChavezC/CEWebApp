import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import FormularioUser from "./FormularioUser";
import AdvertenciaBorrar from "../../ui/AdvertenciaBorrar";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteUser } from "./useDeleteUser";

function UserRow({ user }) {
  const queryClient = useQueryClient();
  const deleteUserMutation = useDeleteUser({
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      close();
    },
  });
  return (
    <>
      <Table.Row>
        <div>{user.email}</div>
        <div>{user.role}</div>
        <div>
          <Modal>
            <Modal.Open opens="formularioUserEdit">
              <button className="mx-2">
                <HiOutlinePencil />
              </button>
            </Modal.Open>
            <Modal.Window name="formularioUserEdit">
              <FormularioUser
                userId={user.id}
                email={user.email}
                password={user.password}
                role={user.role}
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
                instancia="al usuario"
                id={user.id}
                onDelete={deleteUserMutation}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default UserRow;
