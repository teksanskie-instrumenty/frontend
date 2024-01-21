import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { AxiosInstance, AxiosResponse } from 'axios';

import { useAxios } from '../hooks/useAxios';

import { LoaderView } from '../routes/Main';

import Session from 'supertokens-web-js/recipe/session';

interface SessionContextData {
  sessionId: string;
  id: string;
  nick: string;
  cardId: string | null;
  pending: boolean;
  exists: boolean;
}
export type SessionContextType = SessionContextData | undefined;
type ContextType = [SessionContextType, React.Dispatch<React.SetStateAction<SessionContextType>>];

export const SessionContext = createContext<ContextType>([undefined, () => undefined]);

const sessionDataUrl = '/api/user-info';

async function initSessionFromCookie(
  axios: AxiosInstance, 
  setContext: React.Dispatch<React.SetStateAction<SessionContextType>>
): Promise<SessionContextType> {
  const sessionId = await Session.getAccessToken() || '';

  const emptySession = {
    sessionId: '',
    id: '',
    nick: '',
    cardId: null,
    pending: false,
    exists: false,
  };

  if (!await Session.doesSessionExist()) {
    return emptySession;
  } else {
    axios.get(sessionDataUrl).then((res: AxiosResponse) => {
      setContext({
        sessionId: res.data['id'] ? sessionId : '',
        id: res.data['id'],
        nick: res.data['nick'],
        cardId: res.data['card_id'],
        pending: false,
        exists: !!res.data['id'],
      });
    }).catch(() => setContext(emptySession));

    return {
      ...emptySession,
      sessionId,
      pending: true,
    };
  }
}

function SessionContextLoginTeleport() {
  const [ context, setContext ] = useContext(SessionContext);
  const location = useLocation();
  const navigate = useNavigate();
  const axios = useAxios();

  useEffect(() => {
    if (!context) {
      initSessionFromCookie(axios, setContext).then(setContext);
      return;
    }

    if (!context!.exists && !context!.pending && !location.pathname.startsWith('/login')) {
      navigate('/login', {
        replace: true
      });
    }
  }, [axios, context, location, navigate, setContext]);

  return <></>;
}

function SessionContextProvider(props: React.PropsWithChildren<object>) {
  const state = useState<SessionContextType>(undefined);

  return (
    <SessionContext.Provider value={state}>
      <SessionContextLoginTeleport/>
      { state[0] !== undefined && !state[0].pending && props.children}
      { state[0] !== undefined && state[0].pending && <LoaderView />}
    </SessionContext.Provider>
  );
}
export default SessionContextProvider;