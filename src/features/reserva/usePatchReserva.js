import { useMutation } from "@tanstack/react-query";
import { updateReserva } from "../../services/reservasServices";

export const usePatchReserva = (options = {}) => {
  return useMutation(async ({ reservaId, updatedFields }) => {
    return updateReserva(reservaId, updatedFields);
  }, options);
};
