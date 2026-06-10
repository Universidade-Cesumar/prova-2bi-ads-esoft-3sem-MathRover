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
                    </tr>
                `;
            });
        })
        .catch(error => console.error('Erro ao carregar:', error));
}

carregarMateriais();

document.getElementById('btn-cadastrar').addEventListener('click', function() {
    console.log('Botão foi clicado!');
    
    const nome = document.getElementById('input-nome').value;
    const quantidade = parseInt(document.getElementById('input-quantidade').value);
    
    console.log('Nome:', nome);
    console.log('Quantidade:', quantidade);
});

document.getElementById('btn-cadastrar').addEventListener('click', function() {
    const nome = document.getElementById('input-nome').value;
    const quantidade = parseInt(document.getElementById('input-quantidade').value);
    
    const novoMaterial = {
        nome: nome,
        quantidade: quantidade
    };

    fetch('https://6a29e35ff59cb8f65f1db45f.mockapi.io/itens', {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(novoMaterial)
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error('Erro na requisição');
    })
    .then(material => {
        console.log('Material cadastrado:', material);
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao cadastrar material');
    });
});

document.getElementById('btn-cadastrar').addEventListener('click', function() {
    const nome = document.getElementById('input-nome').value;
    const quantidade = parseInt(document.getElementById('input-quantidade').value);
    
    const novoMaterial = {
        nome: nome,
        quantidade: quantidade
    };

    fetch('https://6a29e35ff59cb8f65f1db45f.mockapi.io/itens', {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(novoMaterial)
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error('Erro na requisição');
    })
    .then(material => {
        console.log('Material cadastrado:', material);
        
        // Limpar os inputs
        document.getElementById('input-nome').value = '';
        document.getElementById('input-quantidade').value = '';
        
        // Recarregar a tabela
        carregarMateriais();
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao cadastrar material');
    });
});