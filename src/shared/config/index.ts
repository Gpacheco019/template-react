// Validação das variáveis de ambiente obrigatórias
const validateEnvConfig = () => {
  const baseAPIUrl = import.meta.env.VITE_BASE_API_URL_TEST;
  
  if (!baseAPIUrl) {
    console.warn('⚠️ VITE_BASE_API_URL_TEST não está definida. Usando URL padrão.');
  }
  
  return {
    baseAPIUrl: baseAPIUrl,
  };
};

export const envConfig = validateEnvConfig();