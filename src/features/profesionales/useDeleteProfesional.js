import { useMutation } from "@tanstack/react-query";
import { deleteProfesional } from "../../services/profesionalesServices";

export function useDeleteProfesional() {
  return useMutation(deleteProfesional);
}
