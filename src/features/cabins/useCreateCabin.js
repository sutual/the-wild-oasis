import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export const useCreateCabin = () => {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin created successfully");
      queryClient.invalidateQueries("cabins");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    isCreating,
    createCabin,
  };
};
