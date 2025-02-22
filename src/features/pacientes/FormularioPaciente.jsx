import { useState } from "react";
import { useAddPaciente } from "./useAddPaciente";
import { useQueryClient } from "@tanstack/react-query";
import { usePatchPaciente } from "./usePatchPaciente";

const FormularioPaciente = ({
  pacienteId,
  nombre,
  apellido,
  email,
  telefono,
  fecha_nacimiento,
  mode,
  onCloseModal,
}) => {
  const queryClient = useQueryClient();
  const addPacienteMutation = useAddPaciente();
  const patchPacienteMutation = usePatchPaciente();
  const [formData, setFormData] = useState({
    nombre: nombre || "",
    apellido: apellido || "",
    email: email || "",
    telefono: telefono || "",
    fecha_nacimiento: fecha_nacimiento || "",
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
      addPacienteMutation.mutate(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries("pacientes");
          onCloseModal();
        },
      });
    } else if (mode === "edit") {
      console.log(typeof formData.fecha_nacimiento);
      patchPacienteMutation.mutate(
        {
          pacienteId,
          updatedFields: {
            nombre: formData.nombre,
            apellido: formData.apellido,
            email: formData.email,
            telefono: formData.telefono,
            fecha_nacimiento: formData.fecha_nacimiento,
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries("pacientes");
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
        <label className="block text-sm font-medium" htmlFor="apellido">
          Apellido
        </label>
        <input
          type="text"
          id="apellido"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium" htmlFor="telefono">
          Teléfono
        </label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium" htmlFor="fecha_nacimiento">
          Fecha de Nacimiento
        </label>
        <input
          type="date"
          id="fecha_nacimiento"
          name="fecha_nacimiento"
          value={formData.fecha_nacimiento}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      {mode === "add" && (
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          disabled={addPacienteMutation.isLoading}
        >
          {addPacienteMutation.isLoading ? "Guardando..." : "Guardar"}
        </button>
      )}
      {mode === "edit" && (
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          disabled={addPacienteMutation.isLoading}
        >
          {addPacienteMutation.isLoading ? "Actualizando..." : "Actualizar"}
        </button>
      )}
      {addPacienteMutation.isError && (
        <p className="text-red-500">Error al guardar el paciente</p>
      )}
      {addPacienteMutation.isSuccess && (
        <p className="text-green-500">Paciente guardado con éxito</p>
      )}
    </form>
  );
};

export default FormularioPaciente;
