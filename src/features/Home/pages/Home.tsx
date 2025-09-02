import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

const Home = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Bem-vindo ao React + Vite + shadcn/ui
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Este é um projeto React moderno configurado com TypeScript, Vite,
          shadcn/ui, React Router, Jest e todas as ferramentas de
          desenvolvimento necessárias.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>React 19</CardTitle>
            <CardDescription>
              A versão mais recente do React com melhorias de performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
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
            <p className="text-sm text-muted-foreground">
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
            <p className="text-sm text-muted-foreground">
              Biblioteca de componentes reutilizáveis construída com Radix UI e
              Tailwind CSS.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button size="lg">Começar a desenvolver</Button>
      </div>
    </div>
  );
};

export default Home;
