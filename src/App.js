import React, { useState } from 'react';
import './App.css';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({ title: '', price: '' });
  const [editando, setEditando] = useState(null);

  // Adiciona novo produto
  const adicionarProduto = () => {
    if (!novoProduto.title.trim()) return;

    const novoItem = {
      id: Date.now(),
      title: novoProduto.title,
      price: Number(novoProduto.price) || 0,
    };

    setProdutos(prev => [...prev, novoItem]);
    setNovoProduto({ title: '', price: '' });
  };

  // Remove produto pelo ID
  const removerProduto = (id) => {
    setProdutos(prev => prev.filter(produto => produto.id !== id));
  };

  // Inicia modo de edição
  const iniciarEdicao = (produto) => {
    setEditando(produto);
    setNovoProduto({ title: produto.title, price: produto.price });
  };

  // Atualiza o produto editado
  const atualizarProduto = () => {
    setProdutos(prev =>
      prev.map(produto =>
        produto.id === editando.id
          ? { ...produto, title: novoProduto.title, price: Number(novoProduto.price) || 0 }
          : produto
      )
    );
    setEditando(null);
    setNovoProduto({ title: '', price: '' });
  };

  return (
    <div className="App">
      <h1>CRUD de Produtos</h1>

      <div className="formulario">
        <input
          type="text"
          placeholder="Nome do produto"
          value={novoProduto.title}
          onChange={(e) => setNovoProduto({ ...novoProduto, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Preço"
          value={novoProduto.price}
          onChange={(e) => setNovoProduto({ ...novoProduto, price: e.target.value })}
        />

        {editando ? (
          <button onClick={atualizarProduto}>Atualizar Produto</button>
        ) : (
          <button onClick={adicionarProduto}>Adicionar Produto</button>
        )}
      </div>

      <div className="lista-produtos">
        <h2>Produtos Cadastrados</h2>
        {produtos.length === 0 ? (
          <p>Nenhum produto cadastrado.</p>
        ) : (
          <ul>
            {produtos.map(produto => (
              <li key={produto.id}>
                <strong>{produto.title}</strong> - R$ {produto.price.toFixed(2)}
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
