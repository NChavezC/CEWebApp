import { useMutation } from "@tanstack/react-query";
import { patchReserva } from "../../services/reservasServices";

export const usePatchReserva = (options = {}) => {
  return useMutation(async ({ reservaId, updatedFields }) => {
    return patchReserva(reservaId, updatedFields);
  }, options);
};
