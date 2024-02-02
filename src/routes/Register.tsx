import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Button, Checkbox } from '@nextui-org/react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Input } from '@nextui-org/react';

import logoSrc from '../assets/logo.svg'
import BgDiv from '../components/BgDiv';

import EmailPassword from 'supertokens-web-js/recipe/emailpassword';

function Register() {
  const { cardId } = useParams();
  const navigate = useNavigate();

  const [ email, setEmail ] = useState('');
  const [ nick, setNick ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ repeatPassword, setRepeatPassword ] = useState('');
  const [ accept1, setAccept1 ] = useState(false);
  const [ accept2, setAccept2 ] = useState(false);
  const [ error, setError ] = useState('');
  const [ processing, setProcessing ] = useState(false);
  const [ success, setSuccess ] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleNickChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNick(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(event.target.value);
  };

  const handleAccept1Change = () => {
    setAccept1(x => !x);
  };

  const handleAccept2Change = () => {
    setAccept2(x => !x);
  };

  const handleRegisterClick = () => {
    setError('');
    if (!cardId) {
      setError('Dla tej karty nie można zarejestrować konta!');
      return;
    }
    if (email.length === 0) {
      setError('Adres e-mail nie może być pusty!');
      return;
    }
    if (nick.length === 0) {
      setError('Twój nick nie może być pusty!');
      return;
    }
    if (password.length === 0) {
      setError('Hasło nie może być puste!');
      return;
    }
    if (password !== repeatPassword) {
      setError('Hasła nie zgadzają się!');
      return;
    }
    if (!(accept1 && accept2)) {
      setError('Musisz zaznaczyć wszystkie zgody.');
      return;
    }

    setProcessing(true);
    setError('');

    EmailPassword.signUp({
      formFields: [
        {
          id: 'nick',
          value: nick,
        },
        {
          id: 'email',
          value: email,
        },
        {
          id: 'password',
          value: password
        },
        {
          id: 'card_id',
          value: cardId,
        }
      ]
    }).then(({ status }) => {
      if (status === 'FIELD_ERROR') {
        setProcessing(false);
        setError('Nieprawidłowe dane rejestracji.');
      } else {
        setSuccess(true);
        setProcessing(false);
        setTimeout(() => { navigate('/login', { replace: true }) }, 3000);
      }
    }).catch((err) => {
      console.error(err);

      setProcessing(false);
      setError('Nieznany problem z siecią!');
    });
  };

  return (
    <BgDiv>
      <div className='max-w-[100px] basis-0 grow' />
      <Card isBlurred={true} className='border-none dark:bg-black-100/50 w-[450px] max-w-[99%] p-10' shadow='md'>
        <CardHeader className='flex justify-center items-center'>
        <img src={logoSrc} className='w-64'/>
        </CardHeader>
        <CardBody className='flex justify-center items-center'>
          <h1 className='font-bold text-2xl text-mt-8 mb-8 text-center'>Załóż konto w&nbsp;systemie</h1>
          { 
            !success && <>
              <Input name='login' className='mb-3' label='Podaj swój e-mail' variant='bordered' size='lg' value={email} onChange={handleEmailChange} />
              <Input name='nick' className='mb-3' label='Jak mamy się do Ciebie zwracać?' variant='bordered' size='lg' value={nick} onChange={handleNickChange} />
              <Input name='password' className='mb-3' type='password' label='Wprowadź hasło' variant='bordered' size='lg' value={password} onChange={handlePasswordChange} />
              <Input name='repeat-password' className='mb-3' type='password' label='Powtórz hasło' variant='bordered' size='lg' value={repeatPassword} onChange={handleRepeatPasswordChange} />
              <Checkbox color='secondary' className='mb-3' checked={accept1} onChange={handleAccept1Change}>Potwierdzam, że zapoznałem się z regulaminem klubu fitness.</Checkbox>
              <Checkbox color='secondary' className='mb-3' checked={accept2} onChange={handleAccept2Change}>Wyrażam zgodę na przetwarzanie moich danych osobowych.</Checkbox>
              <p className='text-danger mb-8'>{error}</p>
              <Button color='secondary' variant="shadow" size='lg' disabled={processing} onClick={handleRegisterClick}>
                { processing ? 'Przetwarzanie...' : 'Utwórz konto' }
              </Button>
            </>  
          }
          { success && <p className='text-success mb-8'>Dziękujemy za rejestrację w systemie.</p> }
        </CardBody>
      </Card>
      <div className='max-w-[100px] basis-0 grow' />
    </BgDiv>
  );
}

export default Register;
