/* eslint-disable react/prop-types */
import styled from "styled-components";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useCabinDelete";
import { useCreateCabin } from "./useCreateCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Table from "../../ui/Table";

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
  const { id, image, name, regularPrice, maxCapacity, discount, description } =
    cabin;
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  const handleDuplicate = () => {
    createCabin({
      name: `Copy of ${name}`,
      image,
      regularPrice,
      maxCapacity,
      discount,
      description,
    });
  };

  const isWorking = isDeleting || isCreating;
  return (
    <>
      <Table.Row>
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <div> Fits upto {maxCapacity} guests</div>
        <Price>{regularPrice} USD</Price>
        {discount ? <Discount>{discount}%</Discount> : <span>&mdash;</span>}
        <ActionContainer>
          <button disabled={isWorking} onClick={handleDuplicate}>
            <HiSquare2Stack size={20} />
          </button>
          <Modal>
            <Modal.Open opens={"edit-cabin-form"}>
              <Button variation="secondary" size="medium">
                <HiPencil />
              </Button>
            </Modal.Open>
            <Modal.Window name="edit-cabin-form">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
            <Modal.Open opens="delete-cabin">
              <Button variation="danger" size="medium" disabled={isWorking}>
                <HiTrash />
              </Button>
            </Modal.Open>
            <Modal.Window name="delete-cabin">
              <ConfirmDelete
                resourceName="cabin"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(id)}
              />
            </Modal.Window>
          </Modal>
        </ActionContainer>
      </Table.Row>
    </>
  );
};

export default CabinRow;