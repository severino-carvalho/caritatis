// --- DTOs do backend ---

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface UsuarioResponse {
  id: number;
  email: string;
  tipo: "instituicao" | "colaborador";
  papel: "comum" | "administrador";
  ativo: boolean;
}

export interface AuthResponse {
  token: string;
  tokenType: string;
  expiraEmMs: number;
  usuario: UsuarioResponse;
}

// --- Tipos do domínio frontend ---

export type Categoria =
  | "Doação de Alimentos"
  | "Saúde"
  | "Abrigo"
  | "Arrecadação Financeira"
  | "Educação"
  | "Vestuário"
  | "Meio Ambiente";

export type TipoAto = "presencial" | "arrecadacao";
export type StatusAto = "Ativo" | "Em andamento" | "Encerrado";
export type TipoUsuario = "pessoa_fisica" | "instituicao";

export interface Usuario {
  id: string;
  nome: string;
  tipo: TipoUsuario;
  avatar_url: string;
  papel: string;
  verificado?: boolean;
}

export interface Instituicao extends Usuario {
  tipo: "instituicao";
  razao_social: string;
  area_atuacao: string;
  status_verificacao: "verificada" | "pendente" | "nao_verificada";
  seguidores_count: number;
  atos_count: number;
  colaboracoes_count: number;
  capa_url: string;
  descricao: string;
}

export interface Ato {
  id: string;
  titulo: string;
  descricao: string;
  categoria: Categoria;
  tipo_ato: TipoAto;
  foto_url: string;
  localizacao: string;
  data_ato: string; // ISO
  status: StatusAto;
  autor: Usuario | Instituicao;
  curtidas_count: number;
  comentarios_count: number;
  compartilhamentos_count: number;
}

export interface Mensagem {
  id: string;
  autor_id: string;
  texto: string;
  timestamp: string;
}

export interface Conversa {
  id: string;
  participante: Instituicao;
  ultima_mensagem: string;
  timestamp: string;
  nao_lidas: number;
  ato_referencia?: Ato;
  mensagens: Mensagem[];
}

export interface RegistroColaboradorRequest {
  nomeCompleto: string;
  cpf: string;
  email: string;
  senha: string;
  localizacao?: string;
}

export interface RegistroInstituicaoRequest {
  razaoSocial: string;
  documento: string;
  areaAtuacao?: string;
  email: string;
  senha: string;
  localizacao?: string;
}

// --- DTOs do backend: postagens, categorias e interações ---

export interface CategoriaAPI {
  id: number;
  nome: string;
  icone: string;
}

export type TipoPostagem = "presencial" | "arrecadacao";
export type StatusPostagem = "ativo" | "em_andamento" | "encerrado";
export type StatusVerificacao = "pendente" | "verificada" | "rejeitada";

export interface InstituicaoResumo {
  id: number;
  razaoSocial: string;
  logoUrl: string | null;
  statusVerificacao: StatusVerificacao;
}

export interface PostagemResponse {
  id: number;
  titulo: string;
  descricao: string;
  categoria: CategoriaAPI;
  tipoPostagem: TipoPostagem;
  fotoUrl: string | null;
  localizacao: string | null;
  dataPostagem: string | null;
  status: StatusPostagem;
  instituicao: InstituicaoResumo;
  curtidasCount: number;
  comentariosCount: number;
  compartilhamentosCount: number;
  criadoEm: string;
}

export interface ComentarioResponse {
  id: number;
  conteudo: string;
  criadoEm: string;
  autor: {
    id: number;
    nome: string;
    avatarUrl: string | null;
  };
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number; // página atual (0-based)
}

// --- Gamificação: leaderboard (exclusivo do colaborador) ---

export interface LeaderboardEntry {
  id: string;
  nome: string;
  avatarUrl: string;
  pontos_total: number;
  ofensiva_atual: number;
  posicao: number;
}

export interface LeaderboardData {
  top5: LeaderboardEntry[];
  colaboradorLogado: LeaderboardEntry;
}
