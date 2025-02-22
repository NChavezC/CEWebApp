import { useMutation } from "@tanstack/react-query";
import { patchPaciente } from "../../services/pacientesServices";

export const usePatchPaciente = (options = {}) => {
  return useMutation(async ({ pacienteId, updatedFields }) => {
    return patchPaciente(pacienteId, updatedFields);
  }, options);
};
