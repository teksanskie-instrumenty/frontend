import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AxiosContextProvider from './components/AxiosContext';
import Page from './components/Page';

import AuthorsRoute from './routes/Authors';
import DashboardRoute from './routes/Dashboard';
import LoginRoute from './routes/Login';
import MainRoute from './routes/Main';
import NotFoundRoute from './routes/NotFound';
import RegisterRoute from './routes/Register';

function App() {
  return (
    <BrowserRouter>
      <AxiosContextProvider>
        <Routes>
          <Route path='/' Component={() => <Page name='Wczytywanie...'><MainRoute /></Page>} />
          <Route path='/login' Component={() => <Page name='Zaloguj się'><LoginRoute/></Page>} />
          <Route path='/register/:cardId' Component={() => <Page name='Rejestracja'><RegisterRoute/></Page> } />
          <Route path='/dashboard' Component={() => <Page name='Panel użytkownika'><DashboardRoute/></Page>} />
          <Route path='/authors' Component={() => <Page name='Autorzy'><AuthorsRoute/></Page>} />
          <Route path='*' Component={() => <Page name='Nie znaleziono'><NotFoundRoute/></Page>} />
        </Routes>
      </AxiosContextProvider>
    </BrowserRouter>
  );
}

export default App;
