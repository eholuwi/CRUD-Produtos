import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({ title: '', price: '' });
  const [editando, setEditando] = useState(null);

  // Carrega produtos da API quando o componente monta
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setProdutos(data.slice(0, 5))); // Pegamos apenas 5 itens
  }, []);

  // Adiciona um novo produto
  const adicionarProduto = () => {
    if (novoProduto.title.trim() === '') return;

    const novoItem = {
      id: produtos.length + 1,
      title: novoProduto.title,
      price: novoProduto.price
    };

    setProdutos([...produtos, novoItem]);
    setNovoProduto({ title: '', price: '' });
  };

  // Remove um produto
  const removerProduto = (id) => {
    setProdutos(produtos.filter(produto => produto.id !== id));
  };

  // Preenche o formulário para edição
  const iniciarEdicao = (produto) => {
    setEditando(produto);
    setNovoProduto({ title: produto.title, price: produto.price });
  };

  // Atualiza o produto editado
  const atualizarProduto = () => {
    setProdutos(produtos.map(produto => 
      produto.id === editando.id ? { ...produto, ...novoProduto } : produto
    ));
    setEditando(null);
    setNovoProduto({ title: '', price: '' });
  };

  return (
    <div className="App">
      <h1>CRUD de Produtos</h1>
      
      {/* Formulário para adicionar/editar */}
      <div className="formulario">
        <input
          type="text"
          placeholder="Nome do produto"
          value={novoProduto.title}
          onChange={(e) => setNovoProduto({...novoProduto, title: e.target.value})}
        />
        <input
          type="text"
          placeholder="Preço"
          value={novoProduto.price}
          onChange={(e) => setNovoProduto({...novoProduto, price: e.target.value})}
        />
        
        {editando ? (
          <button onClick={atualizarProduto}>Atualizar Produto</button>
        ) : (
          <button onClick={adicionarProduto}>Adicionar Produto</button>
        )}
      </div>
      
      {/* Lista de produtos */}
      <div className="lista-produtos">
        <h2>Produtos Cadastrados</h2>
        {produtos.length === 0 ? (
          <p>Nenhum produto cadastrado.</p>
        ) : (
          <ul>
            {produtos.map(produto => (
              <li key={produto.id}>
                <strong>{produto.title}</strong> - R${produto.price}
                <div>
                  <button onClick={() => iniciarEdicao(produto)}>Editar</button>
                  <button onClick={() => removerProduto(produto.id)}>Remover</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;