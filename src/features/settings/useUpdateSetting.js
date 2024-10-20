import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import { useMutation } from "@tanstack/react-query";
export const useUpdateSetting = () => {
  const { isPending: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Settings updated successfully");
    },
  });

  return {
    updateSetting,
    isUpdating,
  };
};
