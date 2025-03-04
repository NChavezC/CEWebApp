import { useMutation } from "@tanstack/react-query";
import { createTratamiento } from "../../services/tratamientosServices";

export function useAddTratamiento() {
  return useMutation(createTratamiento);
}
