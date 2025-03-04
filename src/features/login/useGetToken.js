import { useMutation } from "@tanstack/react-query";
import { getToken } from "../../services/authServices";

export function useGetToken() {
  return useMutation(getToken);
}
