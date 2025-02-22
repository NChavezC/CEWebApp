import { useMutation } from "@tanstack/react-query";
import { addProfesional } from "../../services/profesionalesServices";

export function useAddProfesional() {
  return useMutation(addProfesional);
}
