import { useMutation } from "@tanstack/react-query";
import { createPaciente } from "../../services/pacientesServices";

export function useAddPaciente() {
  return useMutation(createPaciente);
}
