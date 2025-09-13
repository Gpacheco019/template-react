import '@testing-library/jest-dom';

// Polyfill for TextEncoder (necessary for react-router-dom)
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill for TextEncoder
Object.defineProperty(global, 'TextEncoder', {
  value: TextEncoder,
});
Object.defineProperty(global, 'TextDecoder', {
  value: TextDecoder,
});

// test environment
Object.defineProperty(global, 'import', {
  value: {
    meta: {
      env: {
        VITE_BASE_API_URL_TEST: 'http://localhost:3000',
      },
    },
  },
});
