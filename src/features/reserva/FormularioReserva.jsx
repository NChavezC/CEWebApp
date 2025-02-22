import { useState, useEffect } from "react";
import { useAddReserva } from "./useAddReserva";
import { useQueryClient } from "@tanstack/react-query";
import { useGetPacientes } from "../pacientes/useGetPacientes";
import { useGetProfesionales } from "../profesionales/useGetProfesionales";
import { useGetTratamientos } from "../tratamientos/useGetTratamientos";
import Spinner from "../../ui/Spinner";
import { usePatchReserva } from "./usePatchReserva";

const FormularioReserva = ({
  reservaId,
  paciente_id,
  profesional_id,
  tratamiento_id,
  fecha,
  hora_inicio,
  hora_fin,
  estado,
  mode,
  onCloseModal,
}) => {
  const { data: pacientes, isLoading: loadingPacientes } = useGetPacientes();
  const { data: profesionales, isLoading: loadingProfesionales } =
    useGetProfesionales();
  const { data: tratamientos, isLoading: loadingTratamientos } =
    useGetTratamientos();
  const queryClient = useQueryClient();
  const addReservaMutation = useAddReserva();
  const patchReservaMutation = usePatchReserva();

  const [formData, setFormData] = useState({
    paciente_id: paciente_id || "",
    profesional_id: profesional_id || "",
    tratamiento_id: tratamiento_id || "",
    fecha: fecha || "",
    hora_inicio: hora_inicio || "",
    hora_fin: hora_fin || "",
    estado: estado || "pendiente",
  });

  useEffect(() => {
    if (formData.tratamiento_id && formData.hora_inicio) {
      const tratamientoSeleccionado = tratamientos?.find(
        (t) => t.id === formData.tratamiento_id
      );
      if (tratamientoSeleccionado) {
        const duracionMinutos = tratamientoSeleccionado.duracion_minutos;
        const [hours, minutes] = formData.hora_inicio.split(":").map(Number);
        const newMinutes = minutes + duracionMinutos;
        const newHours = hours + Math.floor(newMinutes / 60);
        const adjustedMinutes = newMinutes % 60;
        setFormData((prev) => ({
          ...prev,
          hora_fin: `${String(newHours).padStart(2, "0")}:${String(
            adjustedMinutes
          ).padStart(2, "0")}`,
        }));
      }
    }
  }, [formData.tratamiento_id, formData.hora_inicio, tratamientos]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "add") {
      addReservaMutation.mutate(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries("reservas");
          onCloseModal();
        },
      });
    } else if (mode === "edit") {
      patchReservaMutation.mutate(
        {
          reservaId,
          updatedFields: {
            paciente_id: formData.paciente_id,
            profesional_id: formData.profesional_id,
            tratamiento_id: formData.tratamiento_id,
            fecha: formData.fecha,
            hora_inicio: formData.hora_inicio,
            hora_fin: formData.hora_fin,
            estado: formData.estado,
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries("reservas");
            onCloseModal();
          },
        }
      );
    }
  };

  if (loadingPacientes || loadingProfesionales || loadingTratamientos) {
    return <Spinner />;
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-medium" htmlFor="paciente_id">
          Paciente
        </label>
        <select
          id="paciente_id"
          name="paciente_id"
          value={formData.paciente_id}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Seleccione un paciente</option>
          {pacientes.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} {p.apellido}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium" htmlFor="profesional_id">
          Profesional
        </label>
        <select
          id="profesional_id"
          name="profesional_id"
          value={formData.profesional_id}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Seleccione un profesional</option>
          {profesionales.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium" htmlFor="tratamiento_id">
          Tratamiento
        </label>
        <select
          id="tratamiento_id"
          name="tratamiento_id"
          value={formData.tratamiento_id}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Seleccione un tratamiento</option>
          {tratamientos.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Fecha</label>
        <input
          type="date"
          id="fecha"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium" htmlFor="hora_inicio">
          Hora de Inicio
        </label>
        <input
          type="time"
          id="hora_inicio"
          name="hora_inicio"
          value={formData.hora_inicio}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium" htmlFor="hora_fin">
          Hora de Fin
        </label>
        <input
          type="time"
          id="hora_fin"
          name="hora_fin"
          value={formData.hora_fin}
          readOnly
          className="w-full px-3 py-2 border rounded bg-gray-200"
        />
      </div>

      {mode === "add" && (
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded hover:bg-greem-600"
          disabled={addReservaMutation.isLoading}
        >
          {addReservaMutation.isLoading ? "Guardando..." : "Guardar"}
        </button>
      )}
      {mode === "edit" && (
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          disabled={addReservaMutation.isLoading}
        >
          {addReservaMutation.isLoading ? "Actualizando..." : "Actualizar"}
        </button>
      )}
      {addReservaMutation.isError && (
        <p className="text-red-500">Error al guardar la reserva</p>
      )}
      {addReservaMutation.isSuccess && (
        <p className="text-green-500">Reserva guardada con éxito</p>
      )}
    </form>
  );
};

export default FormularioReserva;
