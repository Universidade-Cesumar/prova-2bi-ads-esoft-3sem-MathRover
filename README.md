# Sistema de Almoxarifado

Sistema simples de controle de estoque com cadastro, baixa e exclusao de materiais, integrado a uma API REST (MockAPI).

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
   - **Baixar** – reduz o estoque (valida se a quantidade e valida).
   - **Excluir** – remove o material.
4. Use o campo de pesquisa para filtrar materiais por nome.

## Regras de negocio

- Nao e permitido cadastrar quantidade negativa ou zero.
- Nao e permitido retirar quantidade negativa, zero ou maior que o estoque disponivel.
- A validacao de retirada e feita pela funcao `validarRetirada(estoqueAtual, quantidadeRetirada)`.

## Estrutura dos arquivos

### index.html
Estrutura da pagina com os campos de entrada (nome, quantidade, retirada, busca) e tabela de listagem.

### style.css
Estilos da aplicacao com destaque para estoque critico (quantidade < 10) em vermelho.

### main.js
Funcoes principais:
- `renderizarTabela(dados)` – gera a tabela HTML com os materiais e aplica estilo critico se quantidade < 10
- `carregarMateriais()` – busca todos os itens na API e renderiza a tabela
- `validarRetirada(estoqueAtual, quantidadeRetirada)` – valida se a retirada e possivel
- Evento de clique captura botoes de baixar e excluir da tabela

## Endpoints da API (MockAPI)

- `GET /itens` – listar todos
- `POST /itens` – cadastrar
- `PUT /itens/{id}` – atualizar estoque
- `DELETE /itens/{id}` – excluir