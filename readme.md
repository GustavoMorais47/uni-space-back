# UniSpace

**Objetivo:** Desenvolver uma plataforma que ajude as instituições de ensino a gerenciarem seus espaços.

### Instalação

1.  Realize o clone do repositório do git;
2.  Crie o arquivo `.env` no diretório raíz do projeto;
3.  Copie dos dados do `.env_example` para dentro do `.env` e preencha os atributos corretamente;

_**Atenção:** Caso o `.env` não seja configurado corretamente o projeto não será executado;_

4.  No terminal acesse o diretório raiz do projeto e execute o comando abaixo para instalar as dependências do projeto;

```shell
npm install
```

5. Após a instalação das dependências execute a aplicação com o comando abaixo:

```shell
npm run dev # para desenvolvimento
npm start # para produção
```

_**Atenção:** Quando for subir o projeto para produção realize o build do mesmo com o comando `npm run build`;_
_**Atenção:** O comando `npm start` necessita do build do projeto;_

### Tipos de Usuários

- **Administrador:** Acesso total a todos os serviços da plataforma;

- **Labs:** Acesso ao gerenciamento de espaços, agendamentos e suporte;

- **Infra:**;

- **Professor:**;

- **Aluno:**;

### Acessos

- **Administrador**

```json

"cpf":"00000000000",

"senha":"admin"

```

- **Labs**

```json

"cpf":"91307235077",

"senha":"root"

```

- **Infra**

```json

"cpf":"34959215089",

"senha":"root"

```

- **Professor**

```json

"cpf":"22332577076",

"senha":"root"

```

- **Aluno**

```json

"cpf":"74706207029",

"senha":"root"

```
