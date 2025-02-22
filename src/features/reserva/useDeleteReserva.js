import { useMutation } from "@tanstack/react-query";
import { deleteReserva } from "../../services/reservasServices";

export function useDeleteReserva() {
  return useMutation(deleteReserva);
}
