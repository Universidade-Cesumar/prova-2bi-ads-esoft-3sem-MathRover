# Sistema de Almoxarifado

Sistema simples de controle de estoque com cadastro, baixa e exclusão de materiais, integrado a uma API REST (MockAPI).

## Funcionalidades

- Cadastrar materiais (nome e quantidade)
- Listar materiais cadastrados
- Dar baixa no estoque (retirar quantidade)
- Excluir materiais

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

## Regras de negócio

- Não é permitido cadastrar quantidade negativa ou zero.
- Não é permitido retirar quantidade negativa, zero ou maior que o estoque disponível.
- A validação de retirada é feita pela função `validarRetirada(estoqueAtual, quantidadeRetirada)`.

## Endpoints da API (MockAPI)

- `GET /itens` – listar todos
- `POST /itens` – cadastrar
- `PUT /itens/{id}` – atualizar estoque
- `DELETE /itens/{id}` – excluir