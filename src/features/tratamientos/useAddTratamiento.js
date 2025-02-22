import { useMutation } from "@tanstack/react-query";
import { addTratamiento } from "../../services/tratamientosServices";

export function useAddTratamiento() {
  return useMutation(addTratamiento);
}
