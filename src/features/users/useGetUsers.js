import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/usersServices";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 5, // Refresca cada 5 minutos
  });
};
