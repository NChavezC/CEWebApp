import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import FormularioReserva from "./FormularioReserva";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import { useGetReservas } from "./useGetReservas";

const Calendar = () => {
  const { data: reservas = [], isLoading: loadingReservas } = useGetReservas();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const events = reservas.map((reserva) => ({
    id: reserva.id,
    title: `Paciente: ${reserva.paciente_nombre} ${reserva.paciente_apellido}`,
    start: `${reserva.fecha}T${reserva.hora_inicio}`,
    end: `${reserva.fecha}T${reserva.hora_fin}`,
  }));

  const handleDateClick = (info) => {
    setSelectedEvent(info);
    console.log(info);
    setModalOpen(true);
  };

  if (loadingReservas) return <Spinner />;

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={events}
        selectable
        dateClick={handleDateClick}
      />

      {modalOpen && (
        <Modal>
          <Modal.Window name="formularioReserva">
            <FormularioReserva
              fecha={selectedEvent?.dateStr}
              onClose={() => setModalOpen(false)}
            />
          </Modal.Window>
        </Modal>
      )}
    </div>
  );
};

export default Calendar;
