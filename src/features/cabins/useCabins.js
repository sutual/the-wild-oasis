import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export const useCabins = () => {
  const {
    error,
    data: cabins,
    isPending: isLoading,
  } = useQuery({
    queryKey: "cabins",
    queryFn: getCabins,
  });

  return {
    isLoading,
    cabins,
    error,
  };
};
