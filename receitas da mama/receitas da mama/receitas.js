function toggleReceita(id) {
    const receita = document.getElementById(id);
    const receitaCard = receita.closest('.receita');
    const allReceitas = document.querySelectorAll('.conteudo-receita');
    const allCards = document.querySelectorAll('.receita');
    
    // Fecha todos os outros cards
    allReceitas.forEach(item => {
        if (item.id !== id) {
            item.classList.remove("show");
            item.style.display = "none";
        }
    });
    
    allCards.forEach(card => {
        if (card !== receitaCard) {
            card.classList.remove("active");
        }
    });
    
    // Abre ou fecha o card clicado
    if (receita.classList.contains("show")) {
        receita.classList.remove("show");
        receita.style.display = "none";
        receitaCard.classList.remove("active");
    } else {
        receita.classList.add("show");
        receita.style.display = "block";
        receitaCard.classList.add("active");
    }
}

function filtrarReceitas() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const receitas = document.getElementsByClassName('receita');

    for (let i = 0; i < receitas.length; i++) {
        const button = receitas[i].getElementsByTagName('button')[0];
        const texto = button.innerText.toLowerCase();

        if (texto.includes(input)) {
            receitas[i].style.display = "";
        } else {
            receitas[i].style.display = "none";
        }
    }
}

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('show');
}