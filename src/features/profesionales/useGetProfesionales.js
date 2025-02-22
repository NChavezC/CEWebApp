import { useQuery } from "@tanstack/react-query";
import { getProfesionales } from "../../services/profesionalesServices";

export const useGetProfesionales = () => {
  return useQuery({
    queryKey: ["profesionales"],
    queryFn: getProfesionales,
    staleTime: 1000 * 60 * 5, // Refresca cada 5 minutos
  });
};
