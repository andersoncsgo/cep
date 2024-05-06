
function setEndereco(enderecoText) {
    const enderecoContainer = document.getElementById('endereco');
    enderecoContainer.textContent = enderecoText;
}

function fetchEndereco() {
    const cep = document.getElementById('cepInput').value;
    const cepLimpo = cep.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cepLimpo.length !== 8) {
        setEndereco('Por favor, digite um CEP válido com 8 dígitos.');
        return;
    }

    fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                setEndereco('CEP não encontrado.');
            } else {
                setEndereco(`Rua ${data.logradouro} - ${data.localidade}, ${data.uf}`);
            }
        })
        .catch(error => {
            console.error('Falha ao buscar o endereço:', error);
            setEndereco('Erro ao carregar endereço.');
        });
}

// Opcional: Pode-se adicionar um event listener para permitir a busca pressionando Enter
document.getElementById('cepInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        fetchEndereco();
    }
});
