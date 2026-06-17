function carregarMateriais() {
    fetch('https://6a29e35ff59cb8f65f1db45f.mockapi.io/itens')
        .then(res => res.json())
        .then(dados => {
            const tbody = document.querySelector('#lista-materiais tbody');
            tbody.innerHTML = '';
            dados.forEach(item => {
                tbody.innerHTML += `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.nome}</td>
                        <td>${item.quantidade}</td>
                        <td>
                            <button class="btn-baixar" data-id="${item.id}" data-quantidade="${item.quantidade}">Baixar</button>
                            <button class="btn-excluir" data-id="${item.id}">Excluir</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error('Erro ao carregar:', error));
}

function validarRetirada(estoqueAtual, quantidadeRetirada) {
    if (quantidadeRetirada <= 0) return false;
    if (quantidadeRetirada > estoqueAtual) return false;
    return true;
}

document.getElementById('btn-cadastrar').addEventListener('click', function() {
    const nome = document.getElementById('input-nome').value;
    const quantidade = parseInt(document.getElementById('input-quantidade').value);
    
    if (!nome || isNaN(quantidade) || quantidade <= 0) {
        alert('Preencha nome e quantidade válida (maior que 0)');
        return;
    }

    const novoMaterial = { nome, quantidade };

    fetch('https://6a29e35ff59cb8f65f1db45f.mockapi.io/itens', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(novoMaterial)
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Erro na requisição');
    })
    .then(() => {
        document.getElementById('input-nome').value = '';
        document.getElementById('input-quantidade').value = '';
        carregarMateriais();
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao cadastrar material');
    });
});

document.addEventListener('click', function(event) {
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

        fetch(`https://6a29e35ff59cb8f65f1db45f.mockapi.io/itens/${id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ quantidade: novaQuantidade })
        })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error('Erro ao atualizar');
        })
        .then(() => carregarMateriais())
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao dar baixa no estoque');
        });
    }

    if (target.classList.contains('btn-excluir')) {
        const id = target.dataset.id;
        if (!confirm('Tem certeza que deseja excluir este item?')) return;

        fetch(`https://6a29e35ff59cb8f65f1db45f.mockapi.io/itens/${id}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error('Erro ao excluir');
        })
        .then(() => carregarMateriais())
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao excluir material');
        });
    }
});

carregarMateriais();