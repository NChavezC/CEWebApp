import { useMutation } from "@tanstack/react-query";
import { patchPassword } from "../../services/usersServices";

export const usePatchPassword = (options = {}) => {
  return useMutation(async ({ userId, passwords }) => {
    return patchPassword(userId, passwords);
  }, options);
};
