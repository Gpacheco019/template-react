import '@testing-library/jest-dom/vitest';
import { TextEncoder, TextDecoder } from 'util';

// Polyfills necessários no ambiente de teste (jsdom)
if (!(globalThis as any).TextEncoder) {
  Object.defineProperty(globalThis, 'TextEncoder', { value: TextEncoder });
}
if (!(globalThis as any).TextDecoder) {
  Object.defineProperty(globalThis, 'TextDecoder', { value: TextDecoder });
}

// Variáveis de ambiente padrão para testes
process.env.VITE_BASE_API_URL_TEST = 'url-test';
process.env.VITE_ENCRYPTION_KEY = process.env.VITE_ENCRYPTION_KEY ?? 'test-encryption-key';
