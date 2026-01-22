<p align="center">
<img alig src="https://raw.githubusercontent.com/Grupo-02-Turma-JavaScript-12/Aplicativo-de-Carona-Compartilhada-BackEnd/refs/heads/main/src/assets/logo_meleva.png" width="300" alt="MeLeva Logo" />
</p>

#  MeLeva – Conectando Pessoas, Facilitando Caminhos

<p>
O MeLeva é uma aplicação de carona compartilhada desenvolvida para tornar a mobilidade urbana mais prática, econômica e sustentável. A ideia é simples: aproximar motoristas e passageiros que compartilham trajetos semelhantes, promovendo uma experiência segura, acessível e colaborativa.

## 🌟 O que torna o MeLeva especial?

- Conexão inteligente: motoristas podem cadastrar suas caronas informando origem, destino, vagas disponíveis e valor. Passageiros encontram opções que se encaixam em seus percursos de forma rápida e intuitiva.
- Gestão prática de reservas: cada passageiro pode reservar sua vaga em uma carona, acompanhar o status (pendente, confirmada ou cancelada) e ter total controle sobre suas viagens.
- Segurança e confiança: usuários possuem perfis completos com informações de contato e uma nota de avaliação (0 a 5), garantindo transparência e credibilidade nas interações.
- Sustentabilidade: ao incentivar o compartilhamento de veículos, o MeLeva contribui para a redução de trânsito e emissão de poluentes, além de gerar economia para todos os envolvidos.

## 🎯 Nosso propósito

O MeLeva nasceu para transformar a forma como nos deslocamos, oferecendo uma alternativa colaborativa ao transporte tradicional. Mais do que um aplicativo, ele é uma comunidade que valoriza a confiança, a praticidade e o impacto positivo no dia a dia das pessoas.
</p>


# Principais Características


### Funcionalidades Técnicas da API

### 🚗 CaronaService
Serviço responsável por gerenciar as operações relacionadas às caronas.

- **findAll()** → Retorna todas as caronas cadastradas.
- **findById(id)** → Busca uma carona específica pelo ID.  
  - Retorna erro `404 - Carona não encontrada` caso não exista.
- **findAllByDestino(destino)** → Pesquisa caronas pelo destino, com suporte a filtros (`ILike`).
- **calcularTempoViagem(distancia, velocidade)** → Calcula o tempo estimado de viagem.  
  - Retorna erro `400 - Distância e velocidade devem ser maiores que zero`.  
  - Exemplo de retorno: `{ "tempo_estimado": "2h 30min" }`
- **create(carona)** → Cria uma nova carona.
- **update(carona)** → Atualiza uma carona existente (com validação prévia).
- **delete(id)** → Remove uma carona pelo ID (com validação de integridade).

---

### 🎟️ ReservaService
Serviço responsável por gerenciar as operações relacionadas às reservas de caronas.

- **findAll()** → Retorna todas as reservas cadastradas, incluindo relações com carona e passageiro.
- **findById(id)** → Busca uma reserva específica pelo ID.  
  - Retorna erro `404 - Reserva não encontrada` caso não exista.
- **create(reserva)** → Cria uma nova reserva.  
  - O status inicial é definido automaticamente como **pendente**.
- **update(reserva)** → Atualiza uma reserva existente (com validação prévia).
- **delete(id)** → Remove uma reserva pelo ID.
- **alterarStatus(id, status)** → Altera o status de uma reserva.  
  - Status válidos: **pendente**, **confirmada**, **cancelada**.  
  - Retorna erro `400 - Status inválido` caso seja informado um valor fora desses.

---

### 👤 UsuarioService
Serviço responsável por gerenciar as operações relacionadas aos usuários.

- **findByUsuario(usuario)** → Busca um usuário pelo login/email.
- **findAll()** → Retorna todos os usuários cadastrados.
- **findById(id)** → Busca um usuário específico pelo ID.  
  - Retorna erro `404 - Usuário não encontrado` caso não exista.
- **create(usuario)** → Cria um novo usuário.  
  - Retorna erro `400 - O Usuário já existe` caso o login/email esteja duplicado.
- **update(usuario)** → Atualiza um usuário existente.  
  - Valida se o email/login não está duplicado em outro registro.
- **delete(id)** → Remove um usuário pelo ID (com validação prévia).

---

### 🔒 Tratamento de Erros
- Utilização de `HttpException` e `HttpStatus` para respostas padronizadas.
- Validações garantem consistência dos dados (ex.: email único, status válido, integridade relacional).

<br>

## Entidade e Atributos da Entidade


<!-- Tabela Carona -->
<h3>Entidade Carona</h3>
<table border="1" cellpadding="8" cellspacing="0">
  <thead>
    <tr>
      <th>Atributo</th>
      <th>Tipo</th>
      <th>Descrição</th>
      <th>Regras</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>id</td><td>Int</td><td>Identificador único da carona.</td><td>Chave Primária (Auto Increment).</td></tr>
    <tr><td>origem</td><td>String</td><td>Local de partida.</td><td>Não nulo. Máx. 255 caracteres.</td></tr>
    <tr><td>destino</td><td>String</td><td>Local de chegada.</td><td>Não nulo. Máx. 255 caracteres.</td></tr>
    <tr><td>vagas_disponiveis</td><td>Int</td><td>Quantidade de vagas disponíveis.</td><td>Não nulo.</td></tr>
    <tr><td>valor</td><td>Decimal</td><td>Preço da carona.</td><td>Não nulo. Precisão 10, escala 2.</td></tr>
    <tr><td>reservas</td><td>Array&lt;Reserva&gt;</td><td>Lista de reservas associadas.</td><td>Relacionamento OneToMany.</td></tr>
    <tr><td>motorista</td><td>Usuario</td><td>Usuário responsável pela carona.</td><td>Relacionamento ManyToOne. Exclusão em cascata.</td></tr>
  </tbody>
</table>

<!-- Tabela Reserva -->
<h3>Entidade Reserva</h3>
<table border="1" cellpadding="8" cellspacing="0">
  <thead>
    <tr>
      <th>Atributo</th>
      <th>Tipo</th>
      <th>Descrição</th>
      <th>Regras</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>id</td><td>Int</td><td>Identificador único da reserva.</td><td>Chave Primária (Auto Increment).</td></tr>
    <tr><td>status</td><td>String</td><td>Status da reserva (pendente, confirmada, cancelada).</td><td>Não nulo.</td></tr>
    <tr><td>carona</td><td>Carona</td><td>Carona associada.</td><td>Relacionamento ManyToOne. Exclusão em cascata.</td></tr>
    <tr><td>passageiro</td><td>Usuario</td><td>Passageiro que realizou a reserva.</td><td>Relacionamento ManyToOne. Exclusão em cascata.</td></tr>
  </tbody>
</table>

<!-- Tabela Usuario -->
<h3>Entidade Usuario</h3>
<table border="1" cellpadding="8" cellspacing="0">
  <thead>
    <tr>
      <th>Atributo</th>
      <th>Tipo</th>
      <th>Descrição</th>
      <th>Regras</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>id</td><td>Int</td><td>Identificador único do usuário.</td><td>Chave Primária (Auto Increment).</td></tr>
    <tr><td>nome</td><td>String</td><td>Nome completo.</td><td>Não nulo. Máx. 255 caracteres.</td></tr>
    <tr><td>cpf</td><td>String</td><td>CPF do usuário.</td><td>Não nulo. 11 caracteres.</td></tr>
    <tr><td>usuario</td><td>String</td><td>Email/login do usuário.</td><td>Não nulo. Deve ser válido.</td></tr>
    <tr><td>telefone</td><td>String</td><td>Telefone de contato.</td><td>Não nulo. 11 caracteres.</td></tr>
    <tr><td>nota_avaliacao</td><td>Decimal</td><td>Avaliação média do usuário.</td><td>Não nulo. Valor entre 0 e 5.</td></tr>
    <tr><td>reservas</td><td>Array&lt;Reserva&gt;</td><td>Reservas feitas pelo usuário.</td><td>Relacionamento OneToMany.</td></tr>
    <tr><td>caronas</td><td>Array&lt;Carona&gt;</td><td>Caronas oferecidas pelo usuário.</td><td>Relacionamento OneToMany.</td></tr>
  </tbody>
</table>

## Testes Realizados no Insomnia

````
Testes realizados na Entidade Usuário
````
#### Consultar todos usuários
<img width="1919" height="982" alt="image" src="https://github.com/user-attachments/assets/c5ad1834-4e58-46c3-b893-06f5b10c3371" />

#### Consultar Usuários por ID
<img width="1919" height="985" alt="image" src="https://github.com/user-attachments/assets/d522c30b-cb8c-4019-9201-c1b3d3d33ad3" />

#### Cadastrar Usuário
<img width="1919" height="984" alt="image" src="https://github.com/user-attachments/assets/65b08df3-3c18-490f-9417-3db453865702" />

#### Atualizar Usuário
<img width="1919" height="986" alt="image" src="https://github.com/user-attachments/assets/ddfb7a4c-4596-46de-85b5-f282f8944b98" />

#### Deletar Usuário
<img width="1919" height="987" alt="image" src="https://github.com/user-attachments/assets/47541c60-5693-41fb-bd7a-5f32468f3993" /><br>
___

````
Testes realizados na Entidade Carona
````
#### Consultar Caronas
<img width="1919" height="984" alt="image" src="https://github.com/user-attachments/assets/b7fcaacf-d226-45d6-bfc4-84a6df709662" />


#### Consultar Caronas por ID
<img width="1919" height="981" alt="image" src="https://github.com/user-attachments/assets/c9e3f856-f9cf-45ac-9b93-f963cefd4c35" />

#### Consultar caronas por Destino
<img width="1919" height="983" alt="image" src="https://github.com/user-attachments/assets/5ea2ce32-e58c-409a-a683-184455ecc953" />

#### Calcular Tempo de Viagem
<img width="1919" height="980" alt="image" src="https://github.com/user-attachments/assets/82209434-e2ca-414e-ae1a-b59e5bd1a56e" />

#### Cadastrar Carona
<img width="1919" height="984" alt="image" src="https://github.com/user-attachments/assets/1eb92b47-6d3d-4c27-a41b-31bf75db724c" />

#### Deletar Carona
<img width="1919" height="981" alt="image" src="https://github.com/user-attachments/assets/ee51e321-cfd7-4d93-aaf1-fef0f0b9fcd5" /><br>
___
````
Testes realizados na Entidade Reserva
````
#### Consultar todas as Reservas
<img width="1919" height="984" alt="image" src="https://github.com/user-attachments/assets/644293bd-de79-4ff4-9815-aa8b6cdf4115" />

#### Cadastrar Reservas
<img width="1919" height="985" alt="image" src="https://github.com/user-attachments/assets/274a90b5-d21b-4a76-8916-0866b4f8ea34" />

#### Consultar Reservas por ID
<img width="1919" height="983" alt="image" src="https://github.com/user-attachments/assets/7a16f489-a1a5-441c-b87c-9ec470d3be1d" />

#### Atualizar Reservas
<img width="1919" height="984" alt="image" src="https://github.com/user-attachments/assets/e836e9d1-6440-4a55-935f-41c92d01c7e6" />

#### Deletar Reservas
<img width="1919" height="984" alt="image" src="https://github.com/user-attachments/assets/9337d907-9353-4cdf-abd6-948239c0a47d" />


## Instalação do Projeto

```bash
$ npm install
```

## Compilação do projeto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Autores do Projeto

- [Allyson Gonçalves](https://github.com/allysonaggp)
- [Alexandre Julio](https://github.com/AlexandreJulioDev)
- [Juliermes Mendes](https://github.com/juliomendes160)
- [Marcos Ribeiro](https://github.com/Marcsfic98)
- [Matheus Carvalho](https://github.com/mc4rvalho)
- [Matheus Lins](https://github.com/Matheus-Lins)

## Licença

MeLeva is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
