//let indice=0;
//const paragrafo = document.querySelectorAll(".conteudo p");
//function changeparagrafo(next = true) {
 //   paragrafo[indice].classList.remove("act");
 //   if (next) {
 //       index = (indice + 1)% paragrafo.length;
 //   } else {
 //       index = (indice - 1);
 //   }
  //  paragrafo[indice].classList.add("act");
//}
//function nextparagrafo() {
  //  changeparagrafo(true);
//}

//function prevparagrafo() {
//    changeparagrafo(false);
//}
//showParagraph(currentImageIndex);
//setInterval(changeparagrafo,3000);
// Função para o carrossel de imagens
let currentImageIndex = 0;
const images = document.querySelectorAll('.teladepizzas img');
const paragraphs = document.querySelectorAll('.conteudo p');

// Função para atualizar o carrossel de imagens
function showImage(index) {
  images.forEach((image, i) => {
    image.classList.remove('active');
    if (i === index) {
      image.classList.add('active');
    }
  });
}

// Função para atualizar o carrossel de parágrafos
function showParagraph(index) {
  paragraphs.forEach((p, i) => {
    p.classList.remove('act');
    if (i === index) {
      p.classList.add('act');
    }
  });
}

// Função para ir para a próxima imagem/parágrafo
function nextSlide() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  showImage(currentImageIndex);
  showParagraph(currentImageIndex);
}

// Função para voltar para a imagem/parágrafo anterior
function prevSlide() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  showImage(currentImageIndex);
  showParagraph(currentImageIndex);
}

// Iniciar o carrossel
showImage(currentImageIndex);
showParagraph(currentImageIndex);

// Intervalo para mover para a próxima imagem a cada 5 segundos
setInterval(nextSlide, 5000);

// Event listeners para botões de navegação (caso queira adicionar)
document.querySelector('#prevButton').addEventListener('click', prevSlide);
document.querySelector('#nextButton').addEventListener('click', nextSlide);