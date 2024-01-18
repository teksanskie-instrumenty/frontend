import HeaderText from '../components/HeaderText';
import Navbar from '../components/Navbar';

import { User } from '@nextui-org/react';

function Authors() {
  return (
    <>
      <Navbar/>
      <main className='max-w-[1300px] m-auto p-8'>
        <HeaderText>Autorzy projektu</HeaderText>

        <User className='mb-4' name='Philip Hart' description='Backend' avatarProps={{ getInitials: () => 'PH' }} /><br/>
        <User className='mb-4' name='Łukasz Świszcz' description='Frontend' avatarProps={{ getInitials: () => 'ŁŚ' }} /><br/>
        <User className='mb-4' name='Marek Fiuk' description='-' avatarProps={{ getInitials: () => 'MF' }} /><br/>
        <User className='mb-4' name='Mateusz Chodyń' description='-' avatarProps={{ getInitials: () => 'MC' }} /><br/>
      </main>
    </>
  );
}

export default Authors;
