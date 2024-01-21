import { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';

import ContentLoader from '../components/ContentLoader';
import HeaderText from '../components/HeaderText';
import Navbar from '../components/Navbar';
import PlanCard from '../components/PlanCard';

import NotFoundRoute from './NotFound';

import { Link, useNavigate, useParams } from 'react-router-dom';

import { useAxios } from '../hooks/useAxios';
import { useQueries, useQueryClient } from '@tanstack/react-query';

const weekdays = [
  'poniedziałek?', 
  'wtorek?', 
  'środę?', 
  'czwartek?', 
  'piątek?', 
  'sobotę?', 
  'niedzielę?'
];

const weekdayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];


function ChangePlan() {
  const { dayId } = useParams();
  const dayNumber = parseInt(dayId!);
  if (Number.isNaN(dayNumber) || dayNumber < 1 || dayNumber > 7) {
    return <NotFoundRoute />;
  }

  const axios = useAxios();
  const results = useQueries({
    queries: [
      {
        queryKey: ['weekly-plan'],
        queryFn: async () => {
          const { data } = await axios.get(`/api/weekly-plan`);
          return data;
        },
        staleTime: 60000,
      },
      {
        queryKey: ['daily-plan'],
        queryFn: async () => {
          const { data } = await axios.get(`/api/daily-plan`);
          return data;
        },
        staleTime: 60000,
      }
    ],
  });

  const pending = results[0].status === 'pending' || results[1].status === 'pending';
  const [ selectedId, setSelectedId ] = useState<number | undefined>(0);

  useEffect(() => {
    if (!pending) {
      setSelectedId(results[0].data[weekdayKeys[dayNumber - 1]].id);
    }
  }, [pending, dayNumber]);

  const handleCardClick = (id: number) => {
    setSelectedId(id);
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [ processing, setProcessing ] = useState(false);

  const handleSaveClick = () => {
    setProcessing(true);

    let data: Record<string, number> = {};
    data[weekdayKeys[dayNumber - 1]] = selectedId!;

    axios.patch('/api/weekly-plan', data).then(() => {
      queryClient.invalidateQueries({ queryKey: ['weekly-plan'] });
      navigate('/dashboard');
    });
  }

  return (
    <>
      <Navbar/>
      <main className='max-w-[1300px] m-auto p-8'>
        <div className='flex flex-row flex-wrap items-center mb-4 justify-end'>
          <HeaderText className='block' style={{ marginBottom: 0 }}>Jakie plany na {weekdays[dayNumber - 1]}</HeaderText>
          <div className='flex-grow'></div>
          { 
            !pending &&
            <div className='mt-4 mb-4'>
              <Button as={Link} to='/dashboard' className='ml-4' variant='flat' size='lg'>Anuluj</Button>
              <Button onClick={handleSaveClick} className='ml-4' color='secondary' variant='flat' size='lg' disabled={processing}>
                { processing ? 'Przetwarzanie...' : 'Zapisz wybór' }
              </Button>
            </div>
          }
        </div>
        { pending && <ContentLoader/> }
        { 
          !pending && 
          <>
            <p className='mb-6'>
              Oto lista planów przygotowanych specjalnie dla naszych klientów. 
              Mamy nadzieję, że uda Ci się znaleźć dla siebie coś extra:
            </p>
            <section className='flex flex-row flex-wrap justify-center'>
              {
                results[1].data.map((plan: Record<string, any>) => 
                  <PlanCard
                    key={plan.id}
                    title={plan.name}
                    description={plan.description}
                    imageSrc={plan.image}
                    selected={plan.id === selectedId}
                    onClick={handleCardClick.bind(null, plan.id)}
                    />
                )
              }
            </section>
          </>
        }
      </main>
    </>
  );
}

export default ChangePlan;
