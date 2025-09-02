import { BrowserRouter } from 'react-router-dom';

import { AppBar } from '@/shared/components/AppBar';
import { RouterProvider } from '@/app/routes/routerProvider';
import { Providers } from './providers';

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <AppBar>
          <RouterProvider />
        </AppBar>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
