const novoMaterial = {
  nome: document.getElementById('input-nome').value,
  quantidade: parseInt(document.getElementById('input-quantidade').value)
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
  document.getElementById('input-nome').value = '';
  document.getElementById('input-quantidade').value = '';
  carregarMateriais();
})
.catch(error => {
  console.error('Erro:', error);
  alert('Erro ao cadastrar material');
});