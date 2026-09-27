import { useAuth } from '@/context/AuthContext';
import { usePredit } from '@/context/PreditContext';

// "Reiniciar experiência": volta os clientes ao estado inicial e apaga contas, login lembrado e sessão.
// Sem sessão, o Stack.Protected em app/_layout.js leva de volta ao login.
export function useResetExperience() {
  const { actions } = usePredit();
  const { resetAll } = useAuth();
  return async () => {
    await resetAll();
    await actions.resetDemo();
  };
}
