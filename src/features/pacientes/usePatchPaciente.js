import { useMutation } from "@tanstack/react-query";
import { updatePaciente } from "../../services/pacientesServices";

export const usePatchPaciente = (options = {}) => {
  return useMutation(async ({ pacienteId, updatedFields }) => {
    return updatePaciente(pacienteId, updatedFields);
  }, options);
};
