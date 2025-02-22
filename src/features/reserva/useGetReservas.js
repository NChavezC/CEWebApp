import { useQuery } from "@tanstack/react-query";
import { getReservas } from "../../services/reservasServices";

export const useGetReservas = () => {
  return useQuery({
    queryKey: ["reservas"],
    queryFn: getReservas,
    staleTime: 1000 * 60 * 5, // Refresca cada 5 minutos
  });
};
