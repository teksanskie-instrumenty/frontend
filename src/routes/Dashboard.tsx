import Navbar from '../components/Navbar';

function Dashboard() {
  return (
    <>
      <Navbar/>
      <main className='max-w-[1300px] m-auto p-8'>
      <h1 className='font-black mb-8' style={{ textShadow: '4px 4px 0px rgb(148, 85, 211)' }}>Mój plan tygodniowy</h1>
      
      </main>
    </>
  );
}

export default Dashboard;
