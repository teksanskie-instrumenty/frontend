import { Button } from '@nextui-org/react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Input } from '@nextui-org/react';

import logoSrc from '../assets/logo.svg'
import BgDiv from '../components/BgDiv';

function Login() {
  return (
    <BgDiv>
      <div className='max-w-[100px] basis-0 grow' />
      <Card isBlurred={true} className='border-none dark:bg-black-100/50 w-[450px] max-w-[99%] p-10' shadow='md'>
        <CardHeader className='flex justify-center items-center'>
        <img src={logoSrc} className='w-64'/>
        </CardHeader>
        <CardBody className='flex justify-center items-center'>
          <h1 className='font-bold text-2xl text-mt-8 mb-4 text-center'>Logowanie do systemu</h1>
          <Input name='login' className='mb-3' label='Adres e-mail' variant='bordered' size='lg'/>
          <Input name='password' className='mb-8' type='password' label='Hasło' variant='bordered' size='lg'/>
          <Button color='secondary' variant="shadow" size='lg'>Zaloguj</Button>  
        </CardBody>
      </Card>
      <div className='max-w-[100px] basis-0 grow' />
    </BgDiv>
  );
}

export default Login;
