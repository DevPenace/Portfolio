const inputItem = document.getElementById("input-item")
const listaDeCompras = document.getElementById("lista-de-compras");
const botaoAdicionar = document.getElementById("adicionar-item");
const botaoLimpar = document.getElementById("limpar-lista");
let contador = 0;

botaoLimpar.addEventListener("click", (evento) => {
    evento.preventDefault();
    if (listaDeCompras.querySelectorAll("li").length === 0) {
        alert("A lista está vazia!");
        return;
    }
    if (confirm("Tem certeza que deseja limpar toda a lista?")) {
        listaDeCompras.querySelectorAll("li").forEach(item => item.remove());
        verificarListaVazia();
        inputItem.value = "";
    }
});

botaoAdicionar.addEventListener("click", (evento) => {
    evento.preventDefault();
    if (inputItem.value === "") {
        alert("Por favor, insira um item!");
        return
    }
    

    const itemDaLista = document.createElement("li");
    const containerItemDaLista = document.createElement("div");
    containerItemDaLista.classList.add("lista-item-container");
    const inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.id = "checkbox-" + contador++;
    const nomeItem = document.createElement("p");
    nomeItem.innerText = inputItem.value;

inputCheckbox.addEventListener("click", function() {
    if (inputCheckbox.checked) {
            nomeItem.style.textDecoration = "line-through";
        } else {
            nomeItem.style.textDecoration = "none"
        }
    }
)

    containerItemDaLista.appendChild(inputCheckbox);
    containerItemDaLista.appendChild(nomeItem);

    // Criar botão de lixeira para este item
    const botaoLixeira = document.createElement("button");
    botaoLixeira.classList.add("botao-lixeira-item");
    const imagemLixeira = document.createElement("img");
    imagemLixeira.src = "img/lixeira.png";
    imagemLixeira.alt = "Remover item";
    imagemLixeira.classList.add("icone-lixeira-item");
    botaoLixeira.appendChild(imagemLixeira);

    // Adicionar evento de clique para remover o item
    botaoLixeira.addEventListener("click", (evento) => {
        evento.preventDefault();
        itemDaLista.remove();
        verificarListaVazia();
    });

    containerItemDaLista.appendChild(botaoLixeira);
    itemDaLista.appendChild(containerItemDaLista)

    const diaDaSemana = new Date().toLocaleDateString("pt-BR", {
        weekday: "long"
    });
    const data = new Date().toLocaleDateString("pt-BR")
    const hora = new Date().toLocaleTimeString("pt-BR", {
        hour: "numeric",
        minute: "numeric"
    })
    const dataCompleta = `${diaDaSemana} (${data}) às ${hora}`
    const itemData = document.createElement("p");
    itemData.innerText = dataCompleta;
    itemData.classList.add("texto-data")
    itemDaLista.appendChild(itemData)

    listaDeCompras.appendChild(itemDaLista)

    verificarListaVazia();
  
})

const mensagemListaVazia = document.querySelector(".MensagemListaVazia");
 function verificarListaVazia() {
    const itemDaLista = listaDeCompras.querySelectorAll("li");

    if (itemDaLista.length === 0) {
        mensagemListaVazia.style.display = "block";
    } else {
        mensagemListaVazia.style.display = "none";
    }
 }
verificarListaVazia();

 