import { useEffect } from "react";
import { useNavigate } from "react-router";

import { Spinner } from "@nextui-org/react";
import { BgDivCenter } from "../components/BgDiv";

import { useSession } from "../hooks/useSession";

export const LoaderView = () => {
  return (
    <BgDivCenter>
      <Spinner color='white' size='lg' label='Ładowanie plików systemu...' />
    </BgDivCenter>
  );
}

function Main() {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session.isLoggedIn()) {
      navigate('/dashboard', { replace: true });
    }
  }, [session, navigate]);

  return <LoaderView/>;
}

export default Main;