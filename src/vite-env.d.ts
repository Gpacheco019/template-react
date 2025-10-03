/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_API_URL_TEST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
