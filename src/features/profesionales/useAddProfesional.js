import { useMutation } from "@tanstack/react-query";
import { createProfesional } from "../../services/profesionalesServices";

export function useAddProfesional() {
  return useMutation(createProfesional);
}
