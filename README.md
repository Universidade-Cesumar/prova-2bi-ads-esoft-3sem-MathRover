# Sistema de Almoxarifado

Sistema simples de controle de estoque com cadastro, baixa e exclusão de materiais, integrado a uma API REST (MockAPI).

## Funcionalidades

- Cadastrar materiais (nome e quantidade)
- Listar materiais cadastrados
- Dar baixa no estoque (retirar quantidade)
- Excluir materiais
- Pesquisar materiais por nome

## Tecnologias

- HTML5
- CSS3
- JavaScript (Vanilla)
- MockAPI (REST)

## Como usar

1. Abra o arquivo `index.html` no navegador.
2. Preencha os campos e clique em **Cadastrar**.
3. Na tabela, use:
   - **Baixar** – reduz o estoque (valida se a quantidade é válida).
   - **Excluir** – remove o material.
4. Use o campo de pesquisa para filtrar materiais por nome.

## Regras de negócio

- Não é permitido cadastrar quantidade negativa ou zero.
- Não é permitido retirar quantidade negativa, zero ou maior que o estoque disponível.
- A validação de retirada é feita pela função `validarRetirada(estoqueAtual, quantidadeRetirada)`.

## Estrutura dos arquivos

### index.html
Estrutura da página com os campos de entrada (nome, quantidade, retirada, busca) e tabela de listagem.

### style.css
Estilos da aplicação com destaque para estoque crítico (quantidade < 10) em vermelho.

### main.js
Funções principais:
- `renderizarTabela(dados)` – gera a tabela HTML com os materiais e aplica estilo crítico se quantidade < 10
- `carregarMateriais()` – busca todos os itens na API e renderiza a tabela
- `validarRetirada(estoqueAtual, quantidadeRetirada)` – valida se a retirada é possível
- Evento de clique captura botões de baixar e excluir da tabela

## Endpoints da API (MockAPI)

- `GET /itens` – listar todos
- `POST /itens` – cadastrar
- `PUT /itens/{id}` – atualizar estoque
- `DELETE /itens/{id}` – excluir