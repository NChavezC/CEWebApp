import { useQuery } from "@tanstack/react-query";
import { getPacientes } from "../../services/pacientesServices";

export const useGetPacientes = () => {
  return useQuery({
    queryKey: ["pacientes"],
    queryFn: getPacientes,
    staleTime: 1000 * 60 * 5, // Refresca cada 5 minutos
  });
};
