import { useMutation } from "@tanstack/react-query";
import { deleteTratamiento } from "../../services/tratamientosServices";

export function useDeleteTratamiento() {
  return useMutation(deleteTratamiento);
}
