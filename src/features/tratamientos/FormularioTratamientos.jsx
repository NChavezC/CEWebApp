import { useState } from "react";
import { useAddTratamiento } from "./useAddTratamiento";
import { usePatchTratamiento } from "./usePatchTratamiento";
import { useQueryClient } from "@tanstack/react-query";

const FormularioTratamiento = ({
  tratamientoId,
  nombre,
  descripcion,
  duracion_minutos,
  precio,
  mode,
  onCloseModal,
}) => {
  const queryClient = useQueryClient();
  const addTratamientoMutation = useAddTratamiento();
  const patchTratamientoMutation = usePatchTratamiento();
  const [formData, setFormData] = useState({
    nombre: nombre || "",
    descripcion: descripcion || "",
    duracion_minutos: duracion_minutos || "",
    precio: precio || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "add") {
      addTratamientoMutation.mutate(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries("tratamientos");
          onCloseModal();
        },
      });
    } else if (mode === "edit") {
      patchTratamientoMutation.mutate(
        {
          tratamientoId,
          updatedFields: {
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            duracion_minutos: formData.duracion_minutos,
            precio: formData.precio,
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries("tratamiento");
            onCloseModal();
          },
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-medium" htmlFor="nombre">
          Nombre
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium" htmlFor="descripcion">
          Descripción
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium" htmlFor="duracion_minutos">
          Duración (minutos)
        </label>
        <input
          type="number"
          id="duracion_minutos"
          name="duracion_minutos"
          value={formData.duracion_minutos}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium" htmlFor="precio">
          Precio ($)
        </label>
        <input
          type="number"
          step="0.01"
          id="precio"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      {mode === "add" && (
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          disabled={addTratamientoMutation.isLoading}
        >
          {addTratamientoMutation.isLoading ? "Guardando..." : "Guardar"}
        </button>
      )}
      {mode === "edit" && (
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          disabled={addTratamientoMutation.isLoading}
        >
          {addTratamientoMutation.isLoading ? "Actualizando..." : "Actualizar"}
        </button>
      )}
      {addTratamientoMutation.isError && (
        <p className="text-red-500">Error al guardar el tratamiento</p>
      )}
      {addTratamientoMutation.isSuccess && (
        <p className="text-green-500">Tratamiento guardado con éxito</p>
      )}
    </form>
  );
};

export default FormularioTratamiento;
