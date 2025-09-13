// Detectar se estamos em ambiente de teste
const isTestEnvironment = typeof process !== 'undefined' && process.env.NODE_ENV === 'test';

// Função para obter variáveis de ambiente de forma segura
const getEnvVar = (key: string): string | undefined => {
  if (isTestEnvironment) {
    return process.env[key];
  }
  
  // Em ambiente de produção/desenvolvimento, usar import.meta.env
  // Usar uma abordagem que evita problemas de compilação
  try {
    const importMeta = (globalThis as any).import?.meta;
    if (importMeta?.env) {
      return importMeta.env[key];
    }
  } catch {
    // Ignorar erros
  }
  
  return undefined;
};

export const envConfig = {
  baseAPIUrl: getEnvVar('VITE_BASE_API_URL_TEST'),
};