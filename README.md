<p align="center">
<img alig src="https://raw.githubusercontent.com/Grupo-02-Turma-JavaScript-12/AplicativoFitnessPersonalizado-backend/refs/heads/main/src/assets/MoveUp.png" width="300" alt="MoveUP Logo" />
</p>

##  MeLeva – Conectando Pessoas, Facilitando Caminhos

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

MoveUP is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
