import { useState, useEffect, useRef } from "react";
import {
  DayPilot,
  DayPilotCalendar,
  DayPilotNavigator,
} from "@daypilot/daypilot-lite-react";
import { useGetReservas } from "./useGetReservas";
import FormularioReserva from "./FormularioReserva";
import Modal from "../../ui/Modal";

const Calendar = () => {
  const calendarRef = useRef(null);
  const { data: reservas = {}, isLoading: loadingReservas } = useGetReservas();
  const [events, setEvents] = useState([]);
  const [selectedTime, setSelectedTime] = useState(new Date().getDate());

  useEffect(() => {
    if (!loadingReservas && reservas) {
      const mappedEvents = reservas.map((reserva) => ({
        id: reserva.id,
        text: `Paciente: ${reserva.paciente_nombre} ${reserva.paciente_apellido} - Profesional: ${reserva.profesional_nombre} - Tratamiento: ${reserva.tratamiento_nombre}`,
        start: `${reserva.fecha}T${reserva.hora_inicio}`,
        end: `${reserva.fecha}T${reserva.hora_fin}`,
      }));
      setEvents(mappedEvents);
    }
  }, [reservas, loadingReservas]);

  const [config, setConfig] = useState({
    viewType: "Week",
    startDate: DayPilot.Date.today(),
    days: 7,
    headerDateFormat: "dddd d/MM",
    eventMoveHandling: "Update",
    eventResizeHandling: "Update",
    timeRangeSelectedHandling: "Enabled",
    businessBeginsHour: 8,
    businessEndsHour: 24,
    showNonBusiness: false,
    scrollToHour: 8,
    weekStarts: 1,
    showHours: "business",
    cellHeight: 60,
    heightSpec: "BusinessHoursNoScroll",
    locale: "es-es",
    onTimeRangeSelected: (args) => {
      setSelectedTime(args);
      console.log(args.start.value); // Store the selected date/time
    },
  });

  useEffect(() => {
    const dp = calendarRef.current.control;
    dp.update({
      ...config,
      events: events,
    });
  }, [config, events]);

  return (
    <Modal>
      <div className="p-4 m-4">
        <div style={{ display: "flex", gap: "20px" }}>
          <DayPilotNavigator
            selectMode="Week"
            showMonths={3}
            skipMonths={1}
            weekStarts={1}
            locale="es-es"
            onTimeRangeSelected={(args) =>
              calendarRef.current.control.update({ startDate: args.day })
            }
          />
          <Modal.Open opens="formularioReserva">
            <button type="hidden">
              <DayPilotCalendar
                ref={calendarRef}
                {...config}
                cellDuration={10}
              />
            </button>
          </Modal.Open>
          <Modal.Window name="formularioReserva">
            <FormularioReserva
              hora_inicio={selectedTime.start?.value?.split("T")[1]}
              hora_fin={selectedTime.end?.value?.split("T")[1]}
              fecha={selectedTime.start?.value?.split("T")[0]}
            />
          </Modal.Window>
        </div>
      </div>
    </Modal>
  );
};

export default Calendar;
