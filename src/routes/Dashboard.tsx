import DashboardCard from '../components/DashboardCard';
import HeaderText from '../components/HeaderText';
import Navbar from '../components/Navbar';

const weekdays = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
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

  return (
    <>
      <Navbar/>
      <main className='max-w-[1300px] m-auto p-8'>
        <HeaderText>Mój plan tygodniowy</HeaderText>
        {
          weekdays.map((day, i) => <DashboardCard key={day} weekday={day} shade={colors[i]} completedExercises={3} totalExercises={7}/>)
        }
      </main>
    </>
  );
}

export default Dashboard;
