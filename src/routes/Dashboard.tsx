import ContentLoader from '../components/ContentLoader';
import DashboardCard from '../components/DashboardCard';
import HeaderText from '../components/HeaderText';
import Navbar from '../components/Navbar';

import { useAxios } from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const weekdays = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
const weekdayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const colors = [
  'rgba(26, 161, 62, 0.5)',
  'rgba(161, 102, 26, 0.5)',
  'rgba(98, 26, 161, 0.5)',
  'rgba(161, 26, 35, 0.5)',
  'rgba(19, 133, 89, 0.5)',
  'rgba(128, 88, 60, 0.5)',
  'rgba(6, 71, 87, 0.5)',
];

function Dashboard() {
  const axios = useAxios();
  const { status, data } = useQuery({
    queryKey: ['weekly-plan'], 
    queryFn: async () => {
      const { data } = await axios.get('/api/weekly-plan');
      return data;
    }, 
    staleTime: 60000 
  });

  return (
    <>
      <Navbar/>
      <main className='max-w-[1300px] m-auto p-8'>
        <HeaderText>Mój plan tygodniowy</HeaderText>
        { status === 'pending' && <ContentLoader/> }
        { status === 'error' && <p>Wystąpił problem przy pobieraniu danych.</p>}
        {
          status === 'success' &&
          weekdays.map(
            (day, i) => <DashboardCard 
              key={day} 
              weekdayNumber={i + 1}
              weekday={day} 
              shade={colors[i]} 
              dailyPlanId={data[weekdayKeys[i]].id}
              />
          )
        }
      </main>
    </>
  );
}

export default Dashboard;
