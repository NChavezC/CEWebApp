import { useMutation } from "@tanstack/react-query";
import { updateProfesional } from "../../services/profesionalesServices";

export const usePatchProfesional = (options = {}) => {
  return useMutation(async ({ profesionalId, updatedFields }) => {
    return updateProfesional(profesionalId, updatedFields);
  }, options);
};
