let dadosMateriais = [];

function renderizarTabela(dados) {
    const tbody = document.querySelector('#lista-materiais tbody');
    tbody.innerHTML = '';
    let total = 0;
    dados.forEach(item => {
        const tr = document.createElement('tr');
        if (item.quantidade < 10) {
            tr.classList.add('estoque-critico');
        }
        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.nome}</td>
            <td>${item.quantidade}</td>
            <td>
                <button class="btn-baixar" data-id="${item.id}" data-quantidade="${item.quantidade}">Baixar</button>
                <button class="btn-excluir" data-id="${item.id}">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
        total++;
    });
    document.getElementById('total-itens').textContent = total;
}

async function carregarMateriais() {
    try {
        const response = await fetch('https://6a29e35ff59cb8f65f1db45f.mockapi.io/itens');
        if (!response.ok) throw new Error('Erro ao carregar dados');
        const dados = await response.json();
        dadosMateriais = dados;
        renderizarTabela(dados);
    } catch (error) {
        console.error('Erro ao carregar:', error);
        alert('Erro ao carregar materiais. Verifique sua conexão.');
    }
}

function validarRetirada(estoqueAtual, quantidadeRetirada) {
    if (quantidadeRetirada <= 0) return false;
    if (quantidadeRetirada > estoqueAtual) return false;
    return true;
}

document.getElementById('btn-cadastrar').addEventListener('click', async function() {
    const nome = document.getElementById('input-nome').value.trim();
    const quantidade = parseInt(document.getElementById('input-quantidade').value);
    if (!nome || isNaN(quantidade) || quantidade <= 0) {
        alert('Preencha nome e quantidade válida (maior que 0)');
        return;
    }
    try {
        const response = await fetch('https://6a29e35ff59cb8f65f1db45f.mockapi.io/itens', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ nome, quantidade })
        });
        if (!response.ok) throw new Error('Erro ao cadastrar');
        await response.json();
        document.getElementById('input-nome').value = '';
        document.getElementById('input-quantidade').value = '';
        carregarMateriais();
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        alert('Erro ao cadastrar material. Verifique sua conexão.');
    }
});

document.addEventListener('click', async function(event) {
    const target = event.target;
    if (target.classList.contains('btn-baixar')) {
        const id = target.dataset.id;
        const estoqueAtual = parseInt(target.dataset.quantidade);
        const quantidadeRetirada = parseInt(document.getElementById('input-retirada').value);
        if (!validarRetirada(estoqueAtual, quantidadeRetirada)) {
            alert('Quantidade inválida! Verifique se é maior que 0 e não excede o estoque.');
            return;
        }
        const novaQuantidade = estoqueAtual - quantidadeRetirada;
        try {
            const response = await fetch(`https://6a29e35ff59cb8f65f1db45f.mockapi.io/itens/${id}`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ quantidade: novaQuantidade })
            });
            if (!response.ok) throw new Error('Erro ao atualizar');
            await response.json();
            carregarMateriais();
        } catch (error) {
            console.error('Erro ao baixar:', error);
            alert('Erro ao dar baixa no estoque. Verifique sua conexão.');
        }
    }
    if (target.classList.contains('btn-excluir')) {
        const id = target.dataset.id;
        if (!confirm('Tem certeza que deseja excluir este item?')) return;
        try {
            const response = await fetch(`https://6a29e35ff59cb8f65f1db45f.mockapi.io/itens/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Erro ao excluir');
            await response.json();
            carregarMateriais();
        } catch (error) {
            console.error('Erro ao excluir:', error);
            alert('Erro ao excluir material. Verifique sua conexão.');
        }
    }
});

document.getElementById('input-busca').addEventListener('input', function() {
    const termo = this.value.toLowerCase().trim();
    if (termo === '') {
        renderizarTabela(dadosMateriais);
    } else {
        const filtrados = dadosMateriais.filter(item =>
            item.nome.toLowerCase().includes(termo)
        );
        renderizarTabela(filtrados);
    }
});

carregarMateriais();