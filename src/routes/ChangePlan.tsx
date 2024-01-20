import { Button } from '@nextui-org/react';

import HeaderText from '../components/HeaderText';
import Navbar from '../components/Navbar';
import PlanCard from '../components/PlanCard';

import NotFoundRoute from './NotFound';

import { Link, useParams } from 'react-router-dom';

const weekdays = [
  'poniedziałek?', 
  'wtorek?', 
  'środę?', 
  'czwartek?', 
  'piątek?', 
  'sobotę?', 
  'niedzielę?'
];


function ChangePlan() {
  const { dayId } = useParams();
  const dayNumber = parseInt(dayId!);
  if (Number.isNaN(dayNumber) || dayNumber < 1 || dayNumber > 7) {
    return <NotFoundRoute />;
  }

  return (
    <>
      <Navbar/>
      <main className='max-w-[1300px] m-auto p-8'>
        <div className='flex flex-row flex-wrap items-center mb-4 justify-end'>
          <HeaderText className='block' style={{ marginBottom: 0 }}>Jakie plany na {weekdays[dayNumber - 1]}</HeaderText>
          <div className='flex-grow'></div>
          <div className='mt-4 mb-4'>
            <Button as={Link} to='/dashboard' className='ml-4' variant='flat' size='lg'>Anuluj</Button>
            <Button className='ml-4' color='secondary' variant='flat' size='lg'>Zapisz wybór</Button>
          </div>
        </div>
        <p className='mb-6'>
          Oto lista planów przygotowanych specjalnie dla naszych klientów. 
          Mamy nadzieję, że uda Ci się znaleźć dla siebie coś extra:
        </p>
        <section className='flex flex-row flex-wrap justify-center'>
          <PlanCard selected title='Zdrowe plecy' description='Program specjalnie dla Ciebie' />
          <PlanCard title='Zdrowe plecy' description='Program specjalnie dla Ciebie' />
          <PlanCard title='Zdrowe plecy' description='Program specjalnie dla Ciebie' />
          <PlanCard title='Zdrowe plecy' description='Program specjalnie dla Ciebie' />
          <PlanCard title='Zdrowe plecy' description='Program specjalnie dla Ciebie' />
        </section>
      </main>
    </>
  );
}

export default ChangePlan;
