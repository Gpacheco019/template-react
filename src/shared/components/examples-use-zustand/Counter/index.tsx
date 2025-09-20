import { useShallow } from 'zustand/react/shallow';

import { Button } from '@/shared/components/ui/button';
import { useStore } from '@/app/store';

/* 
- esse arquivo é um exemplo de como usar o zustand para gerenciar o estado em página.
- useShallow é um hook do zustand que é usado para criar um shallow copy do estado, também usando para evitar re-renderizações desnecessárias
- useStore é um hook do zustand que é usado para criar um store
*/

export function Counter() {
  const { counter, increment, decrement } = useStore(useShallow(state => ({
    counter: state.counter.value,
    increment: state.counter.increment,
    decrement: state.counter.decrement,
  })));

  return (
    <div className="flex items-center gap-2 mt-3">
      <h1>Counter: {counter}</h1>
      <Button onClick={() => increment()}>Increment</Button>
      <Button onClick={() => decrement()}>Decrement</Button>
    </div>
  );
}