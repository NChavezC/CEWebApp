import { useQuery } from "@tanstack/react-query";
import { getTratamientos } from "../../services/tratamientosServices";

export const useGetTratamientos = () => {
  return useQuery({
    queryKey: ["tratamientos"],
    queryFn: getTratamientos,
    staleTime: 1000 * 60 * 5, // Refresca cada 5 minutos
  });
};
