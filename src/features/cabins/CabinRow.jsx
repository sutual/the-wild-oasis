/* eslint-disable react/prop-types */
import styled from "styled-components";
import Button from "../../ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 2fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const ActionContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;
`;

const CabinRow = ({ cabin }) => {
  const { id, image, name, regularPrice, maxCapacity, discount } = cabin;
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: onDelete } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries("cabins");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return (
    <>
      <TableRow>
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <Discount> Fits upto {maxCapacity} guests</Discount>
        <Price>{regularPrice} USD</Price>
        <Discount>{discount}%</Discount>
        <ActionContainer>
          <Button
            variation="secondary"
            size="medium"
            onClick={() => setShowForm((show) => !show)}
          >
            Edit
          </Button>
          <Button
            variation="danger"
            size="medium"
            disabled={isDeleting}
            onClick={() => onDelete(id)}
          >
            Delete
          </Button>
        </ActionContainer>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
};

export default CabinRow;