import { BrowserRouter } from 'react-router-dom';

import { RouterProvider } from '@/app/routes/routerProvider';
import { Providers } from './providers';

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <RouterProvider />
      </BrowserRouter>
    </Providers>
  );
}

export default App;
