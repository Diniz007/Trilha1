
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function adicionarAoCarrinho(nome, preco) {
    const existente = carrinho.find(item => item.nome === nome);
    if (existente) {
        existente.quantidade++;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert("Produto adicionado ao carrinho!");
}

function carregarCarrinho() {
    const lista = document.getElementById("listaCarrinho");
    const totalEl = document.getElementById("totalCarrinho");
    if (!lista || !totalEl) return;

    lista.innerHTML = "";
    let total = 0;
    carrinho.forEach(item => {
        const div = document.createElement("div");
        div.textContent = `${item.nome} - ${item.quantidade} x R$ ${item.preco.toFixed(2)}`;
        lista.appendChild(div);
        total += item.quantidade * item.preco;
    });
    totalEl.textContent = total.toFixed(2);
}

function enviarPedido(e) {
    e.preventDefault();
    alert("Pedido confirmado! Enviaremos os dados para o pagamento via PIX por e-mail.");
    localStorage.removeItem("carrinho");
    window.location.href = "index.html";
}

if (window.location.pathname.includes("carrinho")) {
    carregarCarrinho();
}

if (window.location.pathname.includes("checkout")) {
    const resumo = document.getElementById("resumoPedido");
    let total = 0;
    carrinho.forEach(item => {
        const p = document.createElement("p");
        p.textContent = `${item.nome} - ${item.quantidade} x R$ ${item.preco.toFixed(2)}`;
        resumo.appendChild(p);
        total += item.quantidade * item.preco;
    });
    const totalP = document.createElement("p");
    totalP.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
    resumo.appendChild(totalP);
}
