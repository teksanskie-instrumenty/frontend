import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Image, 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

import { useAxios } from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

interface ExerciseDetailsProps {
  weekday: number;
  sets: number;
  repetitions: number;
  interval: number;
  exercise: {
    station_id: number;
    name: string;
    pace: string;
  },
  when_finished: (string | null)[];
  is_finished: boolean[];
}

function ExerciseDetails(props: ExerciseDetailsProps) {
  const finished = props.is_finished[props.weekday];
  const when_finished = props.when_finished[props.weekday] || null;
  return (
    <div className='flex flex-row items-center'>
      { finished && <span>{'\u2714'}</span> }
      { !finished && <span className='opacity-30'>{'\u2714'}</span> }
      <div className='ml-4 flex-grow'>
        <strong className='text-lg'>{props.exercise.name}</strong>&nbsp;&nbsp;
        <span className='text-sm'>Tempo: {props.exercise.pace}</span>
        <p>{props.sets} serie po {props.repetitions} powtórzeń, {props.interval} sek. przerwy</p>
        { finished && when_finished !== null && 
          <p className='text-success'>Ukończono {
            new Date(when_finished).toLocaleDateString('pl-PL', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }
          )}</p> 
        }
      </div>
    </div>
  );
}

interface DashboardCardProps {
  weekdayNumber: number;
  weekday: string;
  shade: string;
  dailyPlanId: number;
}

function DashboardCard(props: DashboardCardProps) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const axios = useAxios();
  const { status, data } = useQuery({
    queryKey: ['daily-plan', props.dailyPlanId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/daily-plan/${props.dailyPlanId}`);
      return data;
    },
    staleTime: 60000,
  });

  const navigate = useNavigate();

  let day = new Date().getDay();
  if (day === 0) day += 7;

  const isToday = day === props.weekdayNumber;

  const completedExercises = status === 'success' ? data.dailyPlanExercises.filter((x: { is_finished: boolean[] }) => x.is_finished[props.weekdayNumber]).length : 0;
  const totalExercises = status === 'success' ? data.dailyPlanExercises.length : 0;

  const handleChangePlan = () => {
    navigate(`change-plan-for/${props.weekdayNumber}`);
  }

  return (
    <>
      <Card isFooterBlurred className='h-[220px] md:h-[170px] mb-4 shadow-md'>
        <CardHeader className='absolute z-10 top-1 flex-col !items-start'>
          <h4 className='font-black text-3xl text-white ml-2'>{ isToday && 'Dzisiaj: '}{props.weekday}</h4>
          <h5 className='ml-4 font-medium text-white text-lg '>
            {status === 'pending' && 'Ładowanie...'}
            {status === 'error' && 'Błąd'}
            {status === 'success' && data.dailyPlan.name}
          </h5>
        </CardHeader>
        {
          status === 'success' &&
          <Image
            removeWrapper
            alt='Card background'
            className='z-0 w-full h-full object-cover absolute grayscale'
            src={data.dailyPlan.image}
          />
        }
        <div
          className='z-0 w-full h-full absolute'
          style={{ background: props.shade }} />
        <CardFooter className="absolute bg-black/60 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 backdrop-blur-sm flex flex-row flex-wrap justify-end">
          <div className='flex-grow'></div>
          {
            [...Array(totalExercises).keys()].map(i => (
              i < completedExercises
                ? (<span key={i} className='mr-1 leading-8'>{'\u2714'}</span>)
                : (<span key={i} className='mr-1 opacity-40 leading-8'>{'\u2714'}</span>)
            ))
          }
          <p className='text-sm opacity-75 ml-2 mr-2 leading-8'>
            {totalExercises > 0 && <>Ukończyłeś {completedExercises} z {totalExercises} ćwiczeń</>}
          </p>
          <span>
            <Button className='mr-2' variant='flat' color='primary' size='sm' onClick={onOpen}>Wyświetl szczegóły</Button>
            { !isToday && <Button variant='bordered' size='sm' onClick={handleChangePlan}>Zmień plan</Button> }
          </span>
        </CardFooter>
      </Card>
      <Modal isOpen={isOpen} className='dark' onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Szczegóły planu dnia</ModalHeader>
              <ModalBody>
                { totalExercises === 0 && 'Ten dzień jest dniem wolnym od ćwiczeń. Hurra!'}
                { 
                  totalExercises > 0 &&
                  data.dailyPlanExercises.map((newProps: ExerciseDetailsProps & {id: number}) => (
                    <ExerciseDetails 
                      {...newProps} 
                      key={newProps.id} 
                      weekday={props.weekdayNumber} />
                  ))
                }
              </ModalBody>
              <ModalFooter>
                <Button color='secondary' variant='flat' onPress={onClose}>Zamknij</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default DashboardCard;