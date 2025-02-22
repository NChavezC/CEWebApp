import { useMutation } from "@tanstack/react-query";
import { addPaciente } from "../../services/pacientesServices";

export function useAddPaciente() {
  return useMutation(addPaciente);
}
