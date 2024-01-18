import { Button, Checkbox } from '@nextui-org/react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Input } from '@nextui-org/react';

import logoSrc from '../assets/logo.svg'
import BgDiv from '../components/BgDiv';

function Register() {
  return (
    <BgDiv>
      <div className='max-w-[100px] basis-0 grow' />
      <Card isBlurred={true} className='border-none dark:bg-black-100/50 w-[450px] max-w-[90%] p-10' shadow='md'>
        <CardHeader className='flex justify-center items-center'>
        <img src={logoSrc} className='w-64'/>
        </CardHeader>
        <CardBody className='flex justify-center items-center'>
          <h1 className='font-bold text-2xl text-mt-8 mb-8 text-center'>Załóż konto w systemie</h1>
          <Input name='login' className='mb-3' label='Podaj swój e-mail' variant='bordered' size='lg' />
          <Input name='nick' className='mb-3' label='Jak mamy się do Ciebie zwracać?' variant='bordered' size='lg' />
          <Input name='password' className='mb-3' type='password' label='Wprowadź hasło' variant='bordered' size='lg' />
          <Input name='repeat-password' className='mb-3' type='password' label='Powtórz hasło' variant='bordered' size='lg' />
          <Checkbox color='secondary' className='mb-3'>Potwierdzam, że zapoznałem się z regulaminem klubu fitness.</Checkbox>
          <Checkbox color='secondary' className='mb-3'>Wyrażam zgodę na przetwarzanie moich danych osobowych.</Checkbox>
          <p className='text-danger mb-8'>Hasła nie zgadzają się!</p>
          <Button color='secondary' variant="shadow" size='lg'>Utwórz konto</Button>  
        </CardBody>
      </Card>
      <div className='max-w-[100px] basis-0 grow' />
    </BgDiv>
  );
}

export default Register;
