function toggleReceita(id) {
    const receita = document.getElementById(id);
    if (receita.style.display === "block") {
        receita.style.display = "none";
    } else {
        receita.style.display = "block";
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

