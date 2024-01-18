import { Spinner } from "@nextui-org/react";
import { BgDivCenter } from "../components/BgDiv";

function Main() {
  return (
    <BgDivCenter>
      <Spinner color='white' size='lg' label='Ładowanie plików systemu...' />
    </BgDivCenter>
  );
}

export default Main;