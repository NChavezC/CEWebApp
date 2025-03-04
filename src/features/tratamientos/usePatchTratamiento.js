import { useMutation } from "@tanstack/react-query";
import { updateTratamiento } from "../../services/tratamientosServices";

export const usePatchTratamiento = (options = {}) => {
  return useMutation(async ({ tratamientoId, updatedFields }) => {
    return updateTratamiento(tratamientoId, updatedFields);
  }, options);
};
