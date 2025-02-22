import { useMutation } from "@tanstack/react-query";
import { deletePaciente } from "../../services/pacientesServices";

export function useDeletePaciente() {
  return useMutation(deletePaciente);
}
