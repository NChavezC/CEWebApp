import { useState } from "react";
import { useAddProfesional } from "./useAddProfesional";
import { useQueryClient } from "@tanstack/react-query";
import { usePatchProfesional } from "./usePatchProfesional";

const FormularioProfesional = ({
  profesionalId,
  nombre,
  tipo,
  mode,
  onCloseModal,
}) => {
  const queryClient = useQueryClient();
  const addProfesionalMutation = useAddProfesional();
  const patchProfesionalMutation = usePatchProfesional();
  const [formData, setFormData] = useState({
    nombre: nombre || "",
    tipo: tipo || "enfermera",
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
      addProfesionalMutation.mutate(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries("profesionales");
          onCloseModal();
        },
      });
    } else if (mode === "edit") {
      patchProfesionalMutation.mutate(
        {
          profesionalId,
          updatedFields: {
            nombre: formData.nombre,
            tipo: formData.tipo,
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries("profesional");
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
          Nombre y Apellido
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
        <label className="block text-sm font-medium" htmlFor="tipo">
          Tipo de Profesional
        </label>
        <select
          id="tipo"
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        >
          <option value="enfermera">Enfermera</option>
          <option value="ayudante">Ayudante</option>
        </select>
      </div>

      {mode === "add" && (
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          disabled={addProfesionalMutation.isLoading}
        >
          {addProfesionalMutation.isLoading ? "Guardando..." : "Guardar"}
        </button>
      )}

      {mode === "edit" && (
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          disabled={addProfesionalMutation.isLoading}
        >
          {addProfesionalMutation.isLoading ? "Actualizando..." : "Actualizar"}
        </button>
      )}

      {addProfesionalMutation.isError && (
        <p className="text-red-500 pink">Error al guardar el profesional</p>
      )}
      {addProfesionalMutation.isSuccess && (
        <p className="text-green-500">Profesional guardado con éxito</p>
      )}
    </form>
  );
};

export default FormularioProfesional;
