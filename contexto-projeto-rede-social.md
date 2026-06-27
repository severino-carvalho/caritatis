**Rede Social de Ações Sociais**

*Documento de Contexto — Histórias de Usuário e Relacionamentos do Sistema*

# **1\. Contexto do Projeto**

Este documento descreve o contexto funcional da plataforma para alinhamento entre o time técnico e parceiros do projeto. O objetivo é construir um MVP (52h de desenvolvimento) de uma rede social cujo propósito central é dar visibilidade a ações sociais (“atos”) que beneficiem pessoas em situação de carência, conectando quem realiza ou apoia essas ações.

A plataforma terá dois tipos de usuário, ambos podendo publicar atos e ambos exigindo cadastro e login para acessar o conteúdo da rede:

* Instituição / ONG — igrejas, órgãos privados e públicos, organizações que promovem ações sociais.

* Pessoa física — usuário individual que acessa, interage e também pode publicar atos.

# **2\. Visão Geral das Entidades e Relacionamentos**

Principais entidades do sistema identificadas até o momento:

| Entidade | Descrição resumida |
| :---- | :---- |
| **Usuário** | Entidade base de autenticação. Pode ser do tipo Pessoa Física ou Instituição (campo “tipo”). |
| **Pessoa Física** | Dados complementares de um usuário pessoa física: nome completo, CPF, localização. |
| **Instituição** | Dados complementares de um usuário institucional: razão social, CNPJ/documento, área de atuação, localização, status de verificação. |
| **Ato** | Entidade central: a ação social publicada. Pode ser de dois subtipos — ação presencial ou arrecadação. Possui autor (Pessoa Física ou Instituição) e pode ter instituições colaboradoras. |
| **Colaboração** | Relacionamento N:N entre Ato e Instituição, representando instituições parceiras/colaboradoras de um ato. |
| **Reação (Curtida)** | Relacionamento N:N entre Usuário e Ato. Qualquer usuário (PF ou ONG) pode reagir. |
| **Comentário** | Mensagens públicas vinculadas a um Ato, com autor (qualquer tipo de usuário). |
| **Compartilhamento** | Registro de métrica: usuário que compartilhou um Ato (contabilizado para exibição de contagem). |
| **Mensagem** | Manifestação de interesse enviada por um usuário a uma Instituição (referente a um Ato). |
| **Follow (Seguir)** | Relacionamento N:N entre Pessoa Física/Usuário e Instituição, para receber atualizações. |
| **Categoria** | Lista fixa (enum) de categorias do ato — ex.: doação de alimentos, abrigo, saúde, arrecadação financeira. |
| **Administrador** | Papel/permissão especial de usuário responsável pela moderação da plataforma. |

| Decisão de modelagem sugerida Usuário é a tabela/entidade raiz de autenticação (login, senha, e-mail, tipo: PF ou Instituição, papel: comum ou admin). Pessoa Física e Instituição guardam os dados específicos de cada tipo, vinculados 1:1 ao Usuário. Ato tem autor\_id apontando para Usuário (podendo ser PF ou Instituição) — isso evita duplicar a lógica de “quem postou”. |
| :---- |

# **3\. Histórias de Usuário — Instituição / ONG**

| ID | História de usuário |
| :---- | :---- |
| **US01** | Como instituição, quero me cadastrar informando nome, CNPJ/documento, área de atuação e localização, para que minha organização seja identificada como fonte confiável de atos. |
| **US02** | Como instituição, quero publicar um ato do tipo “ação presencial” (ida ao local para realizar a ação) com título, descrição, categoria, foto, localização e data, para divulgar o que estamos fazendo. |
| **US03** | Como instituição, quero publicar um ato do tipo “arrecadação” (campanha de doação financeira ou de itens), para captar recursos sem necessariamente depender de presença física no local. |
| **US04** | Como instituição, quero adicionar outras instituições como colaboradoras de um ato, para representar parcerias entre organizações em uma mesma ação. |
| **US05** | Como instituição, quero editar ou alterar o status de um ato (ativo, em andamento, encerrado), para manter as informações sempre atualizadas. |
| **US06** | Como instituição, quero visualizar a contagem de curtidas, comentários e compartilhamentos de cada ato, para medir o impacto da divulgação. |
| **US07** | Como instituição, quero receber mensagens de pessoas físicas ou outras instituições interessadas em um ato, para organizar a participação ou parceria. |
| **US08** | Como instituição, quero ter um perfil público com o histórico de todos os atos publicados, para construir reputação e transparência. |
| **US09** | Como instituição, quero passar por um processo de validação/verificação de cadastro, para garantir que minha organização é legítima diante dos usuários da rede. |

*Observação sobre US09: a forma exata de validação (documental, manual por admin, automatizada via CNPJ, etc.) ainda está em estudo e não bloqueia o MVP — ver seção 6, item 2\.*

# **4\. Histórias de Usuário — Pessoa Física**

| ID | História de usuário |
| :---- | :---- |
| **UF01** | Como pessoa física, quero me cadastrar informando nome completo, CPF, e-mail e localização, para acessar e interagir com a rede social com identificação confiável. |
| **UF02** | Como pessoa física, quero fazer login na plataforma, já que o acesso ao conteúdo é restrito a usuários cadastrados. |
| **UF03** | Como pessoa física, quero navegar por um feed de atos publicados por instituições e outras pessoas, para descobrir ações que eu possa apoiar ou participar. |
| **UF04** | Como pessoa física, quero filtrar atos por categoria e localização (com integração ao Google Maps), para encontrar ações relevantes perto de mim. |
| **UF05** | Como pessoa física, quero publicar um ato (presencial ou de arrecadação), para relatar uma necessidade observada ou organizar minha própria ação social. |
| **UF06** | Como pessoa física, quero curtir, comentar e compartilhar um ato, para ajudar a aumentar sua visibilidade e demonstrar apoio publicamente. |
| **UF07** | Como pessoa física, quero seguir uma instituição, para receber atualizações sempre que ela publicar um novo ato. |
| **UF08** | Como pessoa física, quero enviar uma mensagem a uma instituição relacionada a um ato, para manifestar interesse em participar ou colaborar. |

# **5\. Relacionamentos entre Entidades (Resumo)**

1. Usuário 1:1 Pessoa Física OU 1:1 Instituição — todo usuário tem um tipo definido no cadastro.

2. Usuário 1:N Ato — um usuário (PF ou Instituição) pode publicar vários atos como autor.

3. Ato N:N Instituição (via Colaboração) — um ato pode ter várias instituições colaboradoras; uma instituição pode colaborar em vários atos.

4. Usuário N:N Ato (via Reação) — qualquer usuário pode curtir vários atos; um ato pode ser curtido por vários usuários.

5. Usuário 1:N Comentário, Comentário N:1 Ato — comentários pertencem a um ato e têm um autor.

6. Usuário 1:N Compartilhamento, Compartilhamento N:1 Ato — cada compartilhamento é um registro vinculado a um ato e a quem compartilhou (métrica).

7. Usuário (PF ou Instituição) 1:N Mensagem N:1 Instituição — mensagens são direcionadas a uma instituição, geralmente referenciando um ato.

8. Pessoa Física/Usuário N:N Instituição (via Follow) — usuários seguem instituições para receber atualizações.

9. Ato N:1 Categoria — cada ato pertence a exatamente uma categoria (lista fixa).

10. Usuário 1:1 Papel (comum/administrador) — define permissões de moderação dentro da plataforma.

# **6\. Definições Fechadas pelo Time**

Consolidação das decisões tomadas em reunião de alinhamento, respondendo às perguntas de contexto levantadas inicialmente:

| \# | Definição |
| :---- | :---- |
| **1** | Pessoa física também pode publicar um ato (não é só consumidor/reator de conteúdo). |
| **2** | Validação/verificação de cadastro de instituição: forma exata ainda em estudo pelo time (ponto aberto para a próxima etapa). |
| **3** | Pessoa física pode seguir instituições, recebendo atualizações de novos atos. |
| **4** | Campos do Ato: título, descrição, categoria, foto, localização, data, status (ativo, em andamento, encerrado) e autor. |
| **5** | Um Ato pode ter instituições colaboradoras (relacionamento de colaboração/parceria), além do autor principal. |
| **6** | Categorias seguem uma lista fixa pré-definida (enum), conforme sugestão inicial do time técnico. |
| **7** | Localização do Ato terá integração com Google Maps, permitindo exibição em mapa, não apenas texto livre. |
| **8** | Reações (curtidas) podem ser feitas por qualquer tipo de usuário — pessoa física ou instituição. |
| **9** | Comentários são funcionalidade incluída no escopo do MVP. |
| **10** | Compartilhamento é registrado como métrica no banco; a interface deve exibir contagem de curtidas, comentários e compartilhamentos em cada ato. |
| **11** | Acesso à plataforma exige login — apenas usuários cadastrados (PF ou Instituição) podem visualizar postagens e conteúdo da rede. |
| **12** | Existirá papel de Administrador, com permissões de moderação sobre atos, comentários e usuários da plataforma. |

# **7\. Pontos Ainda Abertos para Discussão**

* Forma exata de validação de cadastro de instituições (manual via admin, documental, automatizada por CNPJ, etc.) — item 2 da seção 6\.

* Regras de moderação: o que um Administrador pode fazer exatamente (remover ato, banir usuário, editar conteúdo de terceiros)?

* Mensagens entre usuário e instituição: terão histórico tipo “chat” ou serão mensagens avulsas (mais simples para o MVP)?

* Notificações de follow/novo ato: serão em tempo real (push/realtime) ou apenas exibidas no feed/painel ao acessar a plataforma?

# **8\. Modelo Relacional do Banco de Dados**

Modelo relacional derivado das entidades e relacionamentos descritos nas seções anteriores, pronto para implementação em PostgreSQL (compatível com Supabase). Tipos seguem a sintaxe do PostgreSQL. Todas as tabelas usam UUID como chave primária (gen\_random\_uuid()), padrão recomendado pelo Supabase para evitar IDs sequenciais previsíveis.

## **8.1 Tabela: usuarios**

*Entidade raiz de autenticação. Centraliza login e dados comuns a Pessoa Física e Instituição.*

| Campo | Tipo | Chave/Constraint | Descrição |
| :---- | :---- | :---- | :---- |
| **id** | uuid | **PK** | Identificador único do usuário. |
| **email** | text | **UNIQUE, NOT NULL** | E-mail de login. |
| **senha\_hash** | text | **NOT NULL** | Hash da senha (gerenciado pelo Supabase Auth). |
| **tipo** | enum | **NOT NULL** | 'pessoa\_fisica' ou 'instituicao'. |
| **papel** | enum | **DEFAULT 'comum'** | 'comum' ou 'administrador' — define permissões de moderação. |
| **ativo** | boolean | **DEFAULT true** | Permite suspender/desativar usuário sem excluí-lo. |
| **criado\_em** | timestamp | **DEFAULT now()** | Data de criação do cadastro. |

## **8.2 Tabela: pessoas\_fisicas**

*Dados específicos de usuários do tipo pessoa física. Relação 1:1 com usuarios.*

| Campo | Tipo | Chave/Constraint | Descrição |
| :---- | :---- | :---- | :---- |
| **id** | uuid | **PK, FK → usuarios.id** | Mesmo ID do usuário (chave compartilhada). |
| **nome\_completo** | text | **NOT NULL** | Nome completo do usuário. |
| **cpf** | text | **UNIQUE, NOT NULL** | CPF, usado para identificação/validação. |
| **localizacao** | text |  | Cidade/bairro ou referência textual de localização. |
| **latitude** | numeric |  | Coordenada para exibição em mapa. |
| **longitude** | numeric |  | Coordenada para exibição em mapa. |

## **8.3 Tabela: instituicoes**

*Dados específicos de usuários do tipo instituição/ONG. Relação 1:1 com usuarios.*

| Campo | Tipo | Chave/Constraint | Descrição |
| :---- | :---- | :---- | :---- |
| **id** | uuid | **PK, FK → usuarios.id** | Mesmo ID do usuário (chave compartilhada). |
| **razao\_social** | text | **NOT NULL** | Nome oficial da instituição. |
| **documento** | text | **UNIQUE, NOT NULL** | CNPJ ou documento equivalente (igrejas/órgãos públicos). |
| **area\_atuacao** | text |  | Descrição da área de atuação (ex.: assistência social, saúde). |
| **localizacao** | text |  | Endereço textual da sede ou área de atuação. |
| **latitude** | numeric |  | Coordenada para exibição em mapa. |
| **longitude** | numeric |  | Coordenada para exibição em mapa. |
| **status\_verificacao** | enum | **DEFAULT 'pendente'** | 'pendente', 'verificada' ou 'rejeitada' — processo de validação (ver seção 7). |

## **8.4 Tabela: categorias**

*Lista fixa de categorias de atos (poderia ser implementada como enum, mas como tabela facilita manutenção via painel admin).*

| Campo | Tipo | Chave/Constraint | Descrição |
| :---- | :---- | :---- | :---- |
| **id** | uuid | **PK** | Identificador da categoria. |
| **nome** | text | **UNIQUE, NOT NULL** | Ex.: 'Doação de alimentos', 'Abrigo', 'Saúde', 'Arrecadação financeira'. |
| **icone** | text |  | Nome/slug do ícone exibido na interface. |

## **8.5 Tabela: atos**

*Entidade central do sistema — a ação social publicada por um usuário (PF ou instituição).*

| Campo | Tipo | Chave/Constraint | Descrição |
| :---- | :---- | :---- | :---- |
| **id** | uuid | **PK** | Identificador do ato. |
| **autor\_id** | uuid | **FK → usuarios.id, NOT NULL** | Usuário que publicou o ato (PF ou instituição). |
| **titulo** | text | **NOT NULL** | Título do ato. |
| **descricao** | text | **NOT NULL** | Descrição detalhada da ação. |
| **categoria\_id** | uuid | **FK → categorias.id, NOT NULL** | Categoria do ato. |
| **tipo\_ato** | enum | **NOT NULL** | 'presencial' (ida ao local) ou 'arrecadacao' (campanha de doação). |
| **foto\_url** | text |  | URL da imagem armazenada no Supabase Storage. |
| **localizacao** | text |  | Endereço textual do ato. |
| **latitude** | numeric |  | Coordenada para exibição no Google Maps. |
| **longitude** | numeric |  | Coordenada para exibição no Google Maps. |
| **data\_ato** | timestamp |  | Data/horário em que o ato ocorre ou se inicia. |
| **status** | enum | **DEFAULT 'ativo'** | 'ativo', 'em\_andamento' ou 'encerrado'. |
| **criado\_em** | timestamp | **DEFAULT now()** | Data de publicação. |

## **8.6 Tabela: ato\_colaboradores**

*Relacionamento N:N — instituições colaboradoras/parceiras de um ato, além do autor principal.*

| Campo | Tipo | Chave/Constraint | Descrição |
| :---- | :---- | :---- | :---- |
| **ato\_id** | uuid | **PK (composta), FK → atos.id** | Ato relacionado. |
| **instituicao\_id** | uuid | **PK (composta), FK → instituicoes.id** | Instituição colaboradora. |

## **8.7 Tabela: reacoes**

*Relacionamento N:N — curtidas. Qualquer usuário (PF ou instituição) pode reagir a um ato.*

| Campo | Tipo | Chave/Constraint | Descrição |
| :---- | :---- | :---- | :---- |
| **ato\_id** | uuid | **PK (composta), FK → atos.id** | Ato curtido. |
| **usuario\_id** | uuid | **PK (composta), FK → usuarios.id** | Usuário que reagiu. |
| **criado\_em** | timestamp | **DEFAULT now()** | Data da reação. |

## **8.8 Tabela: comentarios**

*Mensagens públicas vinculadas a um ato.*

| Campo | Tipo | Chave/Constraint | Descrição |
| :---- | :---- | :---- | :---- |
| **id** | uuid | **PK** | Identificador do comentário. |
| **ato\_id** | uuid | **FK → atos.id, NOT NULL** | Ato comentado. |
| **usuario\_id** | uuid | **FK → usuarios.id, NOT NULL** | Autor do comentário. |
| **conteudo** | text | **NOT NULL** | Texto do comentário. |
| **criado\_em** | timestamp | **DEFAULT now()** | Data do comentário. |

## **8.9 Tabela: compartilhamentos**

*Registro de métrica de compartilhamento de um ato.*

| Campo | Tipo | Chave/Constraint | Descrição |
| :---- | :---- | :---- | :---- |
| **id** | uuid | **PK** | Identificador do registro. |
| **ato\_id** | uuid | **FK → atos.id, NOT NULL** | Ato compartilhado. |
| **usuario\_id** | uuid | **FK → usuarios.id, NOT NULL** | Usuário que compartilhou. |
| **criado\_em** | timestamp | **DEFAULT now()** | Data do compartilhamento. |

## **8.10 Tabela: mensagens**

*Manifestação de interesse enviada por um usuário a uma instituição, referente a um ato.*

| Campo | Tipo | Chave/Constraint | Descrição |
| :---- | :---- | :---- | :---- |
| **id** | uuid | **PK** | Identificador da mensagem. |
| **remetente\_id** | uuid | **FK → usuarios.id, NOT NULL** | Usuário (PF ou instituição) que enviou a mensagem. |
| **instituicao\_id** | uuid | **FK → instituicoes.id, NOT NULL** | Instituição destinatária. |
| **ato\_id** | uuid | **FK → atos.id** | Ato de referência (opcional, mas recomendado). |
| **conteudo** | text | **NOT NULL** | Texto da mensagem. |
| **lida** | boolean | **DEFAULT false** | Indica se a instituição já visualizou a mensagem. |
| **criado\_em** | timestamp | **DEFAULT now()** | Data de envio. |

## **8.11 Tabela: seguidores**

*Relacionamento N:N — usuários que seguem instituições.*

| Campo | Tipo | Chave/Constraint | Descrição |
| :---- | :---- | :---- | :---- |
| **usuario\_id** | uuid | **PK (composta), FK → usuarios.id** | Usuário que segue. |
| **instituicao\_id** | uuid | **PK (composta), FK → instituicoes.id** | Instituição seguida. |
| **criado\_em** | timestamp | **DEFAULT now()** | Data em que começou a seguir. |

| Observações de implementação Os contadores de curtidas, comentários e compartilhamentos (definição 10, seção 6\) podem ser calculados via COUNT() nas tabelas reacoes/comentarios/compartilhamentos, ou desnormalizados em colunas na tabela atos (curtidas\_count, comentarios\_count, compartilhamentos\_count) para leitura mais rápida no feed — recomendado para o MVP dado o volume baixo de dados e o prazo de 52h. No Supabase, as tabelas pessoas\_fisicas e instituicoes podem ser unificadas futuramente via Row Level Security (RLS) nas policies de leitura/escrita, restringindo cada usuário a editar apenas seu próprio perfil. O script SQL completo de criação das tabelas está disponível no arquivo separado: schema-banco-dados.sql |
| :---- |

# **9\. Próximos Passos Sugeridos**

11. Validar este documento com o time e ajustar pontos em aberto da seção 7\.

12. Transformar o modelo de relacionamentos (seção 5\) em diagrama ER visual.

13. Executar o script SQL (schema-banco-dados.sql) no Supabase para criar as tabelas do modelo relacional (seção 8).

14. Configurar as políticas de Row Level Security (RLS) no Supabase para cada tabela, de acordo com as regras de permissão definidas.

15. Priorizar as histórias de usuário (seções 3 e 4\) em “must have” vs. “nice to have”, considerando a janela de 52h de desenvolvimento.