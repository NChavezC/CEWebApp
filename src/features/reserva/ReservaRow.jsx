import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import FormularioReserva from "./FormularioReserva";
import AdvertenciaBorrar from "../../ui/AdvertenciaBorrar";
import { useDeleteReserva } from "./useDeleteReserva";

function ProfesionalRow({ reserva }) {
  const deleteReservaMutation = useDeleteReserva();
  return (
    <>
      <Table.Row>
        <div>{reserva.tratamiento_nombre}</div>
        <div>{reserva.fecha}</div>
        <div>{reserva.hora_inicio}</div>
        <div>{reserva.hora_fin}</div>
        <div className="flex items-center">
          {reserva.estado.charAt(0).toUpperCase() + reserva.estado.slice(1)}
          <span
            className={`w-4 h-4 rounded-full flex items-center justify-center shadow-lg m-1 ${
              reserva.estado === "pendiente"
                ? "bg-stone-600"
                : reserva.estado === "confirmada"
                ? "bg-green-400"
                : "bg-red-400"
            }`}
          ></span>
        </div>
        <div>{reserva.profesional_nombre}</div>
        <div>{reserva.paciente_nombre + " " + reserva.paciente_apellido}</div>
        <div>
          <Modal>
            <Modal.Open opens="formularioReservaEdit">
              <button className="mx-2">
                <HiOutlinePencil />
              </button>
            </Modal.Open>
            <Modal.Window name="formularioReservaEdit">
              <FormularioReserva
                reservaId={reserva.id}
                paciente_id={reserva.paciente_id}
                profesional_id={reserva.profesional_id}
                tratamiento_id={reserva.tratamiento_id}
                fecha={reserva.fecha}
                hora_inicio={reserva.hora_inicio}
                hora_fin={reserva.hora_fin}
                estado={reserva.estado}
                mode="edit"
              />
            </Modal.Window>
          </Modal>

          <Modal>
            <Modal.Open opens="formularioReservaDelete">
              <button className="mx-2">
                <HiOutlineTrash />
              </button>
            </Modal.Open>
            <Modal.Window name="formularioReservaDelete">
              <AdvertenciaBorrar
                instancia="la reserva"
                id={reserva.id}
                onDelete={deleteReservaMutation}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default ProfesionalRow;
