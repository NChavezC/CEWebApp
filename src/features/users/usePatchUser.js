import { useMutation } from "@tanstack/react-query";
import { patchUser } from "../../services/usersServices";

export const usePatchUser = (options = {}) => {
  return useMutation(async ({ userId, updatedFields }) => {
    return patchUser(userId, updatedFields);
  }, options);
};
