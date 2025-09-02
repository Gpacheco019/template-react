import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';

const About = () => {
  const technologies = [
    { name: 'React 19', category: 'Framework' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Vite', category: 'Build Tool' },
    { name: 'shadcn/ui', category: 'UI Library' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'React Router', category: 'Routing' },
    { name: 'Jest', category: 'Testing' },
    { name: 'ESLint', category: 'Linting' },
    { name: 'Prettier', category: 'Formatting' },
  ];

  const features = [
    'TypeScript para type safety',
    'Vite para desenvolvimento rápido',
    'shadcn/ui para componentes bonitos',
    'React Router para navegação',
    'Jest para testes unitários',
    'ESLint para qualidade de código',
    'Prettier para formatação consistente',
    'EditorConfig para configuração de editor',
    'Path aliases (@/) para imports limpos',
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Sobre o Projeto</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Este projeto demonstra uma configuração moderna e completa para
          desenvolvimento React com todas as ferramentas essenciais para criar
          aplicações de alta qualidade.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Tecnologias Utilizadas</CardTitle>
            <CardDescription>
              Stack moderna para desenvolvimento React
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {technologies.map(tech => (
                <Badge key={tech.name} variant="secondary">
                  {tech.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Funcionalidades</CardTitle>
            <CardDescription>Recursos configurados no projeto</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scripts Disponíveis</CardTitle>
          <CardDescription>Comandos npm para desenvolvimento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Desenvolvimento</h4>
              <div className="space-y-1 text-sm">
                <code className="bg-muted px-2 py-1 rounded">npm run dev</code>
                <p className="text-muted-foreground">
                  Inicia o servidor de desenvolvimento
                </p>
              </div>
              <div className="space-y-1 text-sm">
                <code className="bg-muted px-2 py-1 rounded">
                  npm run build
                </code>
                <p className="text-muted-foreground">Gera build de produção</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Qualidade de Código</h4>
              <div className="space-y-1 text-sm">
                <code className="bg-muted px-2 py-1 rounded">npm run lint</code>
                <p className="text-muted-foreground">Executa ESLint</p>
              </div>
              <div className="space-y-1 text-sm">
                <code className="bg-muted px-2 py-1 rounded">
                  npm run format
                </code>
                <p className="text-muted-foreground">
                  Formata código com Prettier
                </p>
              </div>
              <div className="space-y-1 text-sm">
                <code className="bg-muted px-2 py-1 rounded">npm test</code>
                <p className="text-muted-foreground">Executa testes</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
