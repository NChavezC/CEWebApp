import { useMutation } from "@tanstack/react-query";
import { addReserva } from "../../services/reservasServices";

export function useAddReserva() {
  return useMutation(addReserva);
}
