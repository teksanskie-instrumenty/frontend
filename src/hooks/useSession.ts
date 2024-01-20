import { useCallback, useContext } from "react";
import { SessionContext } from "../components/SessionContext";


const tokenKey = 'authorization_token';

export function useSession() {
  const [ context, setContext ] = useContext(SessionContext);

  const invalidateSession = useCallback(() => {
    setContext(undefined);
  }, [setContext]);

  const isLoggedIn = useCallback(() => {
    if (!context) return false;
    
    return !context.pending && context.id !== undefined && context.id.length > 0;
  }, [context]);

  return {
    ...context,
    invalidateSession,
    isLoggedIn,
    tokenKey
  };
}