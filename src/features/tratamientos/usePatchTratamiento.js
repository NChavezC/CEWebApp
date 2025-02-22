import { useMutation } from "@tanstack/react-query";
import { patchTratamiento } from "../../services/tratamientosServices";

export const usePatchTratamiento = (options = {}) => {
  return useMutation(async ({ tratamientoId, updatedFields }) => {
    return patchTratamiento(tratamientoId, updatedFields);
  }, options);
};
