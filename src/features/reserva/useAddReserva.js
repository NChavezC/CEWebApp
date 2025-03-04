import { useMutation } from "@tanstack/react-query";
import { createReserva } from "../../services/reservasServices";

export function useAddReserva() {
  return useMutation(createReserva);
}
