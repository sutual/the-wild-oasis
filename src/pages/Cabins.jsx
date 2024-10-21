import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Menus from "../ui/Menus";
import CabinsTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/Sort</p>
      </Row>
      <Row type="vertical">
        <Menus>
          <CabinsTable />
        </Menus>
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
