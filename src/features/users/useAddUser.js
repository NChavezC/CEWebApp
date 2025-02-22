import { useMutation } from "@tanstack/react-query";
import { addUser } from "../../services/usersServices";

export function useAddUser() {
  return useMutation(addUser);
}
