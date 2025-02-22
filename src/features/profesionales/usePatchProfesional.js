import { useMutation } from "@tanstack/react-query";
import { patchProfesional } from "../../services/profesionalesServices";

export const usePatchProfesional = (options = {}) => {
  return useMutation(async ({ profesionalId, updatedFields }) => {
    return patchProfesional(profesionalId, updatedFields);
  }, options);
};
