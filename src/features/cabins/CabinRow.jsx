/* eslint-disable react/prop-types */
import styled from "styled-components";
import Button from "../../ui/Button";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useCabinDelete";
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
  const { isDeleting, deleteCabin } = useDeleteCabin();
  return (
    <>
      <TableRow>
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <div> Fits upto {maxCapacity} guests</div>
        <Price>{regularPrice} USD</Price>
        {discount ? <Discount>{discount}%</Discount> : <span>&mdash;</span>}
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
            onClick={() => deleteCabin(id)}
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