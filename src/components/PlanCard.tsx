import { Card, CardFooter, CardHeader, Image } from '@nextui-org/react';

import silkaSrc from '../assets/silka.jpg';

interface PlanCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  selected?: boolean;
}

function PlanCard(props: PlanCardProps) {
  return (
    <Card 
      isFooterBlurred 
      className='h-[300px] mt-4 mb-4 shadow-md w-[300px] cursor-pointer ml-2 mr-2 outline-white outline-0 hover:outline-1 transition-all'>
      <CardHeader className='absolute z-10 top-1 flex-col !items-start'>

      </CardHeader>
      <Image
        removeWrapper
        alt='Card background'
        className='z-0 w-full h-full object-cover absolute grayscale'
        src={silkaSrc}
        />
      {
        props.selected &&
        <div
        className='z-0 w-full h-full absolute'
        style={{ background: 'rgba(148, 85, 211, 0.5)' }}/>
      }
      <CardFooter className="absolute bg-black/60 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 backdrop-blur-sm">
        <div>
          <h4 className='font-black text-xl mb-2'>{props.title}</h4>
          <p className='text-sm'>{props.description}</p>
        </div>
      </CardFooter>
    </Card>
  );
}

export default PlanCard;