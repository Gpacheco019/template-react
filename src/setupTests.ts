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
