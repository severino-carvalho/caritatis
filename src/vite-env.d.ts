/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL base do backend. Lida exclusivamente em src/config/env.ts. */
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
