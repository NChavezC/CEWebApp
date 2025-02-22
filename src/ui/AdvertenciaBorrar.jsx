import { useQueryClient } from "@tanstack/react-query";

function AdvertenciaBorrar({ instancia, id, onDelete, onCloseModal }) {
  const queryClient = useQueryClient();
  const deleteMutation = onDelete;
  function handleClick() {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        onCloseModal();
      },
    });
  }

  return (
    <div className="p-4 bg-red-100 text-red-900 rounded flex flex-col items-center">
      <p>
        Le recordamos que la acción de borrar elimina permanentemente{" "}
        {instancia}. ¿Desea continuar?
      </p>
      <button
        className="bg-red-500 text-white font-semibold rounded px-4 py-2"
        onClick={handleClick}
      >
        Borrar
      </button>
      {deleteMutation.isError && (
        <p className="text-red-500">Error al borrar el usuario</p>
      )}
      {deleteMutation.isSuccess && (
        <p className="text-green-500">Usuario borrado con exito</p>
      )}
    </div>
  );
}

export default AdvertenciaBorrar;
