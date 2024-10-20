import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export const useEditCabin = () => {
  const queryClient = useQueryClient();
  const { isPending: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ editCabin, id }) => createEditCabin(editCabin, id),
    onSuccess: () => {
      toast.success("Cabin edited successfully");
      queryClient.invalidateQueries("cabins");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    isEditing,
    editCabin,
  };
};
