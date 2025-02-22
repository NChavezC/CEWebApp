import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../services/usersServices";

export function useDeleteUser() {
  return useMutation(deleteUser);
}
