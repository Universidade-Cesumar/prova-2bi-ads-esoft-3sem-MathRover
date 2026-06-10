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