import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Banner } from '../components/Banner/Banner';

const Home = () => {
  return (
    <div className='space-y-8'>
      <Banner
        avatarUrl='https://avatars.githubusercontent.com/u/59854471?s=400&u=2a14800f693a3f7b5ec894e62f9ba3584549cbf6&v=4'
        name='Gabriel Pacheco'
      />

      <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>React 19</CardTitle>
            <CardDescription>
              A versão mais recente do React com melhorias de performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-sm text-muted-foreground'>
              React 19 traz melhorias significativas em performance, Server
              Components e melhor DX.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vite</CardTitle>
            <CardDescription>
              Build tool extremamente rápido para desenvolvimento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-sm text-muted-foreground'>
              Vite oferece HMR instantâneo e builds otimizados para produção.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>shadcn/ui</CardTitle>
            <CardDescription>Componentes bonitos e acessíveis</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-sm text-muted-foreground'>
              Biblioteca de componentes reutilizáveis construída com Radix UI e
              Tailwind CSS.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className='text-center'>
        <Button size='lg'>Começar a desenvolver</Button>
      </div>
    </div>
  );
};

export default Home;
