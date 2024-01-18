import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

import BgDiv from '../components/BgDiv';

function NotFound() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <BgDiv style={{ flexDirection: 'column', justifyContent: 'center' }}>
      <h1 className='text-white text-8xl text-bold drop-shadow-lg'>404</h1>
      <h2 className='text-white text-2xl drop-shadow-lg'>Nie znaleziono strony.</h2>
      <br/>
      <Button color='secondary' variant="shadow" size='lg' onClick={handleClick}>Wróć do strony głównej</Button>  
    </BgDiv>
  );
}

export default NotFound;
