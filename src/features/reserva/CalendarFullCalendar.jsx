import FullCalendar from "@fullcalendar/react";
import { createPortal } from "react-dom";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import FormularioReserva from "./FormularioReserva";
import Spinner from "../../ui/Spinner";
import { useGetReservas } from "./useGetReservas";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const Calendar = () => {
  const { data: reservas = [], isLoading: loadingReservas } = useGetReservas();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  const events = reservas.map((reserva) => ({
    id: reserva.id,
    title: `Paciente: ${reserva.paciente_nombre} ${reserva.paciente_apellido}`,
    start: `${reserva.fecha}T${reserva.hora_inicio}`,
    end: `${reserva.fecha}T${reserva.hora_fin}`,
    backgroundColor:
      reserva.profesional_id === "e29b64ba-d94c-45c9-afe1-d99dda4a104a"
        ? "#FF69B4" // Pink
        : reserva.profesional_id === "41ef7a1c-2496-46ff-a214-09cc51543c31"
        ? "#6495ED" // Blue
        : "#808080", // Default color (gray) for other professionals
    borderColor: "#ffffff", // Optional: White border for better contrast
  }));

  const handleDateClick = (info) => {
    setSelectedEvent({
      id: "",
      paciente_id: "",
      paciente_nombre: "",
      paciente_apellido: "",
      profesional_id: "",
      tratamiento_id: "",
      fecha: info?.dateStr?.split("T")[0],
      hora_inicio: info?.dateStr?.split("T")[1]?.split("-")[0],
      hora_fin: "",
      estado: "pendiente",
      mode: "add",
    });
    open("formularioReserva");
  };

  const handleEventClick = (info) => {
    // Find the reservation that matches the event ID
    const reserva = reservas.find(
      (reserva) => reserva.id.toString() === info.event.id
    );

    if (!reserva) return;

    setSelectedEvent({
      id: reserva.id,
      paciente_id: reserva.paciente_id,
      profesional_id: reserva.profesional_id,
      tratamiento_id: reserva.tratamiento_id,
      fecha: reserva.fecha,
      hora_inicio: reserva.hora_inicio,
      hora_fin: reserva.hora_fin,
      estado: reserva.estado,
      mode: "edit",
    });

    setOpenName("formularioReserva"); // Open the modal
  };

  const modalRef = useOutsideClick(close);

  if (loadingReservas) return <Spinner />;

  return (
    <div className="p-4 m-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={events}
        selectable
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        slotMinTime="08:00:00" // Start at 8:00 AM
        slotMaxTime="24:00:00" // End at Midnight (00:00 AM)
        locale={"es"}
        weekNumberCalculation={"ISO"}
        allDaySlot={false}
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, // Use 24-hour format (HH:MM)
        }}
        contentHeight={830}
        eventDidMount={(info) => {
          info.el.style.cursor = "pointer";
        }}
      />

      {openName === "formularioReserva" &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div
              ref={modalRef}
              className="relative bg-gray-100 p-8 rounded-lg shadow-lg transition-all w-full max-w-md"
            >
              <button
                onClick={close}
                className="absolute top-4 right-4 p-1 rounded-md hover:bg-gray-100"
              >
                <HiXMark className="w-6 h-6 text-gray-500" />
              </button>
              <div>
                <FormularioReserva
                  paciente_id={selectedEvent?.paciente_id}
                  profesional_id={selectedEvent?.profesional_id}
                  tratamiento_id={selectedEvent?.tratamiento_id}
                  fecha={selectedEvent?.fecha}
                  hora_inicio={selectedEvent?.hora_inicio}
                  hora_fin={selectedEvent?.hora_fin}
                  estado={selectedEvent?.estado}
                  mode={selectedEvent?.mode}
                  onCloseModal={close}
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Calendar;
