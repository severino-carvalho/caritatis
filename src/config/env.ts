/**
 * Única fonte de verdade para variáveis de ambiente da aplicação.
 *
 * Nenhum outro arquivo deve acessar `import.meta.env` diretamente para
 * configuração — sempre importe `env` daqui. A validação roda no momento
 * em que este módulo é carregado, falhando cedo (antes da aplicação subir)
 * caso alguma variável obrigatória esteja ausente.
 */

const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
};

/** Nome real (no .env) de cada chave, usado nas mensagens de erro. */
const nomesDasVariaveis: Record<keyof typeof env, string> = {
  apiBaseUrl: "VITE_API_BASE_URL",
};

for (const chave of Object.keys(env) as (keyof typeof env)[]) {
  if (!env[chave]) {
    const variavel = nomesDasVariaveis[chave];
    throw new Error(
      `Variável de ambiente obrigatória ausente: ${variavel}. ` +
        `Defina-a em .env.local (veja .env.example) e reinicie o servidor de desenvolvimento.`,
    );
  }
}

export { env };
