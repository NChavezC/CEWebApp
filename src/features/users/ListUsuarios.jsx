import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import { useGetUsers } from "./useGetUsers";
import UserRow from "./UserRow";

function ListUsuarios() {
  const { data: users = [], isLoading } = useGetUsers();
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <div>
        <h1 className="text-3xl font-semibold m-5">Usuarios</h1>

        <Table columns="1fr 1fr 1fr">
          <Table.Header>
            <div>Nombre</div>
            <div>Rol</div>
          </Table.Header>
          <Table.Body
            data={users}
            render={(user) => <UserRow user={user} key={user.id} />}
          />
        </Table>
      </div>
    </div>
  );
}

export default ListUsuarios;
