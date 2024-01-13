import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AxiosContextProvider from './components/AxiosContext';
import Page from './components/Page';

import LoginRoute from './routes/Login';

function App() {
  return (
    <BrowserRouter>
      <AxiosContextProvider>
        <Routes>
          <Route path='login' Component={() => <Page name='Zaloguj się'><LoginRoute/></Page>} />
        </Routes>
      </AxiosContextProvider>
    </BrowserRouter>
  );
}

export default App;
