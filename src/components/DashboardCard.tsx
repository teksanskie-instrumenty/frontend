import { Button, Card, CardFooter, CardHeader, Image } from '@nextui-org/react';

import silkaSrc from '../assets/silka.jpg';

interface DashboardCardProps {
  weekday: string;
  shade: string;
  completedExercises: number;
  totalExercises: number;
}

function DashboardCard(props: DashboardCardProps) {
  return (
    <Card isFooterBlurred className='h-[220px] md:h-[170px] mb-4 shadow-md'>
      <CardHeader className='absolute z-10 top-1 flex-col !items-start'>
        <h4 className='font-black text-3xl text-white ml-2'>{props.weekday}</h4>
        <h5 className='ml-4 font-medium text-white text-lg '>Zdrowe plecy</h5>
      </CardHeader>
      <Image
        removeWrapper
        alt='Card background'
        className='z-0 w-full h-full object-cover absolute grayscale'
        src={silkaSrc}
        />
      <div
        className='z-0 w-full h-full absolute'
        style={{ background: props.shade }}/>
      <CardFooter className="absolute bg-black/60 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 backdrop-blur-sm flex flex-row flex-wrap justify-end">
        <div className='flex-grow'></div>
        {
          [...Array(props.totalExercises).keys()].map(i => (
            i < props.completedExercises
            ? (<span className='mr-1 leading-8'>{'\u2714'}</span>)
            : (<span className='mr-1 opacity-40 leading-8'>{'\u2714'}</span>)
          ))
        }
        <p className='text-sm opacity-75 ml-2 mr-2 leading-8'>
          Ukończono {props.completedExercises} z {props.totalExercises} ćwiczeń
        </p>
        <span>
          <Button className='mr-2' variant='flat' color='primary' size='sm'>Wyświetl szczegóły</Button>
          <Button variant='bordered' size='sm'>Zmień plan</Button>
        </span>
      </CardFooter>
    </Card>
  );
}

export default DashboardCard;