import { styled } from 'styled-components';

import { Button } from '@nextui-org/react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Input } from '@nextui-org/react';

import logoSrc from '../assets/logo.svg'
import silkaSrc from '../assets/silka.jpg';

const BgDiv = styled.main`
    width: 100vw;
    box-sizing: border-box;
    min-height: 100vh;
    background: url(${silkaSrc});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 100% 50%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 32px;
`;

function Login() {
  return (
    <BgDiv>
      <div className='max-w-[100px] basis-0 grow' />
      <Card isBlurred={true} className='border-none dark:bg-black-100/50 w-[450px] max-w-[90%] p-10' shadow='md'>
        <CardHeader className='flex justify-center items-center'>
        <img src={logoSrc} className='w-64'/>
        </CardHeader>
        <CardBody className='flex justify-center items-center'>
          <p className='font-bold text-xl mt-8 mb-4'>Logowanie do systemu</p>
          <Input name='login' className='mb-3' label='Nazwa użytkownika' variant='bordered' size='lg'/>
          <Input name='password' className='mb-8' type='password' label='Hasło' variant='bordered' size='lg'/>
          <Button color='secondary' variant="shadow" size='lg'>Zaloguj</Button>  
        </CardBody>
      </Card>
      <div className='max-w-[100px] basis-0 grow' />
    </BgDiv>
  );
}

export default Login;
