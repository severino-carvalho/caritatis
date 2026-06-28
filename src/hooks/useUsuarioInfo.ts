import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/contexts/UserContext";
import { fetchInstituicao, fetchPostagensInstituicao } from "@/services/instituicoes";
import { fetchColaborador } from "@/services/colaboradores";
import { fetchGamificacaoPerfil } from "@/services/gamificacao";

export function useUsuarioInfo() {
  const { usuarioBackend, perfil } = useUser();
  const isInstituicao = perfil === "instituicao";
  const uid = usuarioBackend?.id;

  const instituicaoQuery = useQuery({
    queryKey: ["instituicao", uid],
    queryFn: () => fetchInstituicao(uid as number),
    enabled: isInstituicao && uid != null,
  });

  const postagensQuery = useQuery({
    queryKey: ["instituicao", uid, "postagens"],
    queryFn: () => fetchPostagensInstituicao(uid as number),
    enabled: isInstituicao && uid != null,
  });

  const colaboradorQuery = useQuery({
    queryKey: ["colaborador", uid],
    queryFn: () => fetchColaborador(uid as number),
    enabled: !isInstituicao && uid != null,
  });

  const gamificacaoQuery = useQuery({
    queryKey: ["gamificacao", "me"],
    queryFn: fetchGamificacaoPerfil,
    enabled: !isInstituicao && uid != null,
  });

  const email = usuarioBackend?.email ?? "";
  const nome = isInstituicao
    ? (instituicaoQuery.data?.razaoSocial ?? email)
    : (colaboradorQuery.data?.nomeCompleto ?? email);
  const avatarUrl = isInstituicao
    ? (instituicaoQuery.data?.logoUrl ?? null)
    : (colaboradorQuery.data?.fotoUrl ?? null);

  return {
    isInstituicao,
    email,
    nome,
    avatarUrl,
    papel: usuarioBackend?.papel ?? "comum",
    tipoLabel: isInstituicao ? "Instituição" : "Pessoa Física",
    instituicao: instituicaoQuery.data,
    colaborador: colaboradorQuery.data,
    atosCount: postagensQuery.data?.totalElements ?? 0,
    gamificacao: gamificacaoQuery.data,
  };
}
