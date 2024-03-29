import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { Button } from '@nextui-org/react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Input } from '@nextui-org/react';

import logoSrc from '../assets/logo.svg'
import BgDiv from '../components/BgDiv';

import { useSession } from '../hooks/useSession';

import EmailPassword from 'supertokens-web-js/recipe/emailpassword';

function Login() {
  const [ login, setLogin ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState('');
  const [ processing, setProcessing ] = useState(false);

  const session = useSession();
  const navigate = useNavigate();

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLoginClick = () => {
    setProcessing(true);
    setError('');

    EmailPassword.signIn({
      formFields: [
        {
          id: 'email',
          value: login,
        },
        {
          id: 'password',
          value: password
        }
      ],
    }).then(({ status }) => {
      if (status === 'WRONG_CREDENTIALS_ERROR' || status === 'FIELD_ERROR') {
        setProcessing(false);
        setError('Nieprawidłowe dane logowania');
        setPassword('');
      } else {
        setProcessing(false);
        session.invalidateSession();

        navigate('/dashboard', {
          replace: true
        });
      }
    }).catch((err) => {
      console.error(err);

      setProcessing(false);
      setError('Nieznany problem z siecią!');
    });
  };

  useEffect(() => {
    if (session.isLoggedIn()) {
      navigate('/dashboard', {
        replace: true
      });
    }
  }, [session, navigate]);

  return (
    <BgDiv>
      <div className='max-w-[100px] basis-0 grow' />
      <Card isBlurred={true} className='border-none dark:bg-black-100/50 w-[450px] max-w-[99%] p-10' shadow='md'>
        <CardHeader className='flex justify-center items-center'>
        <img src={logoSrc} className='w-64'/>
        </CardHeader>
        <form>
          <CardBody className='flex justify-center items-center'>
            <h1 className='font-bold text-2xl text-mt-8 mb-4 text-center'>Logowanie do systemu</h1>
            <Input name='login' className='mb-3' label='Adres e-mail' variant='bordered' size='lg' value={login} onChange={handleLoginChange}/>
            <Input name='password' className='mb-3' type='password' label='Hasło' variant='bordered' size='lg' value={password} onChange={handlePasswordChange}/>
            <p className='text-danger mb-8'>{error}</p>
            <Button type='submit' color='secondary' size='lg' disabled={processing} onClick={handleLoginClick}>{processing ? 'Czekaj...' : 'Zaloguj'}</Button>
          </CardBody>
        </form>
      </Card>
      <div className='max-w-[100px] basis-0 grow' />
    </BgDiv>
  );
}

export default Login;
