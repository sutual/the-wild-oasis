import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
export const useSettings = () => {
  const { isPending: isLoading, data: settings } = useQuery({
    queryKey: "settings",
    queryFn: getSettings,
  });

  return {
    isLoading,
    settings,
  };
};
