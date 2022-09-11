/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAIN_API: string;
  readonly VITE_MOCK_REQUESTS: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
