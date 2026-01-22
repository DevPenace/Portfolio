// Sistema de Navegação SPA
const app = {
    currentPage: 'home',
    pages: {},

    init() {
        this.setupEventListeners();
        this.loadPage('home');
    },

    setupEventListeners() {
        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.getElementById('navMenu');

        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenuToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.dataset.page;
                this.loadPage(page);

                // Close mobile menu
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });

        // Prevent default on links with href="#"
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
                e.preventDefault();
            }
        });
    },

    async loadPage(pageName) {
        const app = document.getElementById('app');
        app.classList.add('fade-out');

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageName) {
                link.classList.add('active');
            }
        });

        this.currentPage = pageName;

        setTimeout(() => {
            app.innerHTML = this.pages[pageName] || '<p>Página não encontrada</p>';
            app.classList.remove('fade-out');

            // Reinitialize specific page scripts
            this.initPageScripts(pageName);
        }, 150);
    },

    initPageScripts(pageName) {
        if (pageName === 'cardapio') {
            this.initCardapioScripts();
        } else if (pageName === 'home') {
            this.initCarousel();
        }
    },

    initCarousel() {
        const carousel = document.querySelector('.carousel-container');
        if (!carousel) return;

        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.carousel-dot');
        let currentSlide = 0;

        const showSlide = (n) => {
            carousel.style.transform = `translateX(-${n * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === n);
            });
        };

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Auto rotate carousel every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    },

    initCardapioScripts() {
        // Adicionar lógica de filtro se necessário
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                const name = this.querySelector('.menu-item-name').textContent;
                // Aqui você pode adicionar lógica de clique
            });
        });
    }
};

// Definir páginas
app.pages.home = `
<div class="hero fade-in">
    <h1>🍕 Bem-vindo à Beto's Pizzaria</h1>
    <p>Pizzas artesanais feitas com ingredientes frescos</p>
</div>

<div class="container fade-in">
    <h2 style="text-align: center; color: var(--primary-color); font-size: 2rem; margin-bottom: 2rem;">
        Nossas Pizzas em Destaque
    </h2>

    <div class="carousel">
        <div class="carousel-container">
            <div class="carousel-slide">
                <img src="img/pizzaDestaque2.jpeg" alt="Carousel 1">
            </div>
            <div class="carousel-slide">
                <img src="img/pizzaDestaque4.jpeg" alt="Promoção">
            </div>
            <div class="carousel-slide">
                <img src="img/pizzaDestaque3.jpeg" alt="Pizza Portuguesa">
            </div>
            <div class="carousel-slide">
                <img src="img/pizzaportuguesa.jpeg" alt="Carousel 4">
            </div>
        </div>
        <div class="carousel-controls">
            <span class="carousel-dot active"></span>
            <span class="carousel-dot"></span>
            <span class="carousel-dot"></span>
            <span class="carousel-dot"></span>
        </div>
    </div>

    <div class="featured">
        <div class="card">
            <img src="img/pizzacalabresa.jpeg" alt="Pizza Calabresa" class="card-image">
            <div class="card-content">
                <h3 class="card-title">Pizza Calabresa</h3>
                <p class="card-text">Deliciosa calabresa com cebola roxa e azeitonas pretas</p>
            </div>
        </div>

        <div class="card">
            <img src="img/pizzaMussarela.jpeg" alt="Pizza Mussarela" class="card-image">
            <div class="card-content">
                <h3 class="card-title">Pizza Mussarela</h3>
                <p class="card-text">Clássica com mussarela derretida sobre molho de tomate e um toque de orégano.</p>
            </div>
        </div>

        <div class="card">
            <img src="img/pizzaPortuguesa.jpeg" alt="Pizza Portuguesa" class="card-image">
            <div class="card-content">
                <h3 class="card-title">Pizza Portuguesa</h3>
                <p class="card-text">Clássica com presunto, ovos e azeitonas</p>
            </div>
        </div>
    </div>

    <h2 style="text-align: center; color: var(--primary-color); font-size: 2rem; margin: 3rem 0 2rem;">
        O que nossos clientes dizem
    </h2>

    <div class="testimonials">
        <div class="testimonial fade-in">
            <p class="testimonial-text">"A melhor pizza da cidade! O sabor e a qualidade são incríveis. Parabéns pelo excelente atendimento!"</p>
            <p class="testimonial-author">– Fernanda Souza</p>
        </div>

        <div class="testimonial fade-in">
            <p class="testimonial-text">"Toda vez que peço, fico impressionado com a massa leve e o recheio super generoso! Super recomendo!"</p>
            <p class="testimonial-author">– Carlos Mendes</p>
        </div>

        <div class="testimonial fade-in">
            <p class="testimonial-text">"Pizzas deliciosas, ingredientes frescos e atendimento impecável! Com certeza minha pizzaria favorita!"</p>
            <p class="testimonial-author">– Juliana Oliveira</p>
        </div>

        <div class="testimonial fade-in">
            <p class="testimonial-text">"A borda recheada é sensacional, e os sabores são bem equilibrados. Um verdadeiro espetáculo!"</p>
            <p class="testimonial-author">– Rafael Lima</p>
        </div>

        <div class="testimonial fade-in">
            <p class="testimonial-text">"Nunca comi uma pizza tão boa! Chega quentinha, crocante por fora e macia por dentro!"</p>
            <p class="testimonial-author">– Amanda Ferreira</p>
        </div>

        <div class="testimonial fade-in">
            <p class="testimonial-text">"Excelente experiência! Atendimento rápido, ambiente aconchegante e sabores irresistíveis!"</p>
            <p class="testimonial-author">– Lucas Martins</p>
        </div>
    </div>
</div>
`;

app.pages['quem-somos'] = `
<div class="container fade-in">
    <h1 style="color: var(--primary-color); text-align: center; margin-bottom: 2rem;">Quem Somos</h1>

    <div class="about-section">
        <div class="about-image">
            <img src="img/funcionário.jpg" alt="Beto's Pizzaria">
        </div>
        <div class="about-content">
            <h2>Tradição e Qualidade</h2>
            <p>
                A Beto's Pizzaria foi fundada com a missão de trazer as melhores pizzas artesanais para sua mesa. 
                Com mais de 15 anos de experiência, combinamos técnicas tradicionais italianas com ingredientes 
                frescos e selecionados.
            </p>
            <p>
                Cada pizza é feita com amor e dedicação pela nossa equipe de mestres pizzaiolos, que trabalham 
                diariamente para garantir a qualidade e o sabor incomparável das nossas criações.
            </p>
            <p>
                Nossa proposta é simples: usar os melhores ingredientes, técnicas autênticas e muito carinho para 
                criar pizzas que vocês vão amar. Venha nos conhecer e experience a diferença de uma verdadeira pizzaria!
            </p>
        </div>
    </div>

    <section class="contact-section" style="margin-top: 3rem;">
        <h2>Nossos Valores</h2>
        <div class="contact-info">
            <div class="contact-item">
                <h3> Qualidade</h3>
                <p>Apenas ingredientes frescos e processos rigorosos</p>
            </div>
            <div class="contact-item">
                <h3>Dedicação</h3>
                <p>Cada pizza feita com paixão e atenção aos detalhes</p>
            </div>
            <div class="contact-item">
                <h3>Comunidade</h3>
                <p>Somos parte da comunidade e valorizamos cada cliente</p>
            </div>
        </div>
    </section>
</div>
`;

app.pages.cardapio = `
<div class="container fade-in">
    <h1 style="color: var(--primary-color); text-align: center; margin-bottom: 2rem;">Cardápio</h1>

    <h2 style="color: var(--accent-color); margin-top: 2rem; margin-bottom: 1rem;">🍕 Pizzas Salgadas</h2>
    <div class="menu-grid">
        <div class="menu-item">
            <img src="img/pizzaCalabresa.jpeg" alt="Pizza Calabresa" class="menu-item-image">
            <div class="menu-item-info">
                <div class="menu-item-name">Calabresa</div>
                <div class="menu-item-description">Calabresa, cebola e azeitonas</div>
            </div>
        </div>
        <div class="menu-item">
            <img src="img/pizzaMussarela.jpeg" alt="Pizza Mussarela" class="menu-item-image">
            <div class="menu-item-info">
                <div class="menu-item-name">Mussarela</div>
                <div class="menu-item-description">Queijo muçarela bem derretido, sabor suave e cremoso</div>
            </div>
        </div>

        <div class="menu-item">
            <img src="img/pizzaportuguesa.jpeg" alt="Pizza Portuguesa" class="menu-item-image">
            <div class="menu-item-info">
                <div class="menu-item-name">Portuguesa</div>
                <div class="menu-item-description">Presunto, ovo e azeitonas</div>
            </div>
        </div>

        <div class="menu-item">
            <img src="img/FrangoComCatupiry.jpeg" alt="Pizza Frango" class="menu-item-image">
            <div class="menu-item-info">
                <div class="menu-item-name">Frango com Catupiry</div>
                <div class="menu-item-description">Frango desfiado e queijo derretido</div>
            </div>
        </div>

        <div class="menu-item">
            <img src="img/PizzaEspanhola.jpeg" alt="Pizza Espanhola" class="menu-item-image">
            <div class="menu-item-info">
                <div class="menu-item-name">Espanhola</div>
                <div class="menu-item-description">Chorizo picante, queijo derretido, azeitonas e pimentão assado</div>
            </div>
        </div>

        <div class="menu-item">
            <img src="img/pizzaMarguerita.jpeg" alt="Pizza Marguerita" class="menu-item-image">
            <div class="menu-item-info">
                <div class="menu-item-name">Marguerita</div>
                <div class="menu-item-description">Tomate, mussarela e manjericão</div>
            </div>
        </div>

        <div class="menu-item">
            <img src="img/pizza4queijos.jpeg" alt="Pizza 4 Queijos" class="menu-item-image">
            <div class="menu-item-info">
                <div class="menu-item-name">4 Queijos</div>
                <div class="menu-item-description">Mistura de queijos selecionados</div>
            </div>
        </div>
        <div class="menu-item">
            <img src="img/pizzabacon.webp" alt="Pizza bacon com cheddar" class="menu-item-image">
            <div class="menu-item-info">
                <div class="menu-item-name">Bacon com Cheddar</div>
                <div class="menu-item-description">Mistura irresistivel de bacon e queijo cheddar</div>
            </div>
        </div>
         <div class="menu-item">
            <img src="img/lombinhoCanadense.jpg" alt="Pizza de Lombinho Canadense" class="menu-item-image">
            <div class="menu-item-info">
                <div class="menu-item-name">Lombinho Canadense</div>
                <div class="menu-item-description">Mistura irresistivel de lombinho canadense e queijo mussarela</div>
            </div>
        </div>
        <div class="menu-item">
            <img src="img/pizzaAtum.webp" alt="Pizza de Atum com cebola" class="menu-item-image">
            <div class="menu-item-info">
                <div class="menu-item-name">Atum com cebola</div>
                <div class="menu-item-description">Mistura de atum e cebola </div>
            </div>
        </div>
    </div>

    <h2 style="color: var(--accent-color); margin-top: 2rem; margin-bottom: 1rem;">🍰 Pizzas Doces</h2>
    <div class="menu-grid">
        <div class="menu-item">
            <img src="img/pizzadebananaecanela.jpeg" alt="Pizza Banana com Canela" class="menu-item-image">
            <div class="menu-item-info">
                <div class="menu-item-name">Banana com Canela</div>
                <div class="menu-item-description">Banana fresca e canela</div>
            </div>
        </div>

        <div class="menu-item">
            <img src="img/pizzabrigadeiro.jpeg" alt="Pizza Brigadeiro" class="menu-item-image">
            <div class="menu-item-info">
                <div class="menu-item-name">Brigadeiro</div>
                <div class="menu-item-description">Brigadeiro cremoso e calda de chocolate</div>
            </div>
        </div>

        <div class="menu-item">
            <img src="img/pizzanutela.jpeg" alt="Pizza Nutella com morango" class="menu-item-image">
            <div class="menu-item-info">
                <div class="menu-item-name">Nutella com morango</div>
                <div class="menu-item-description">Nutella e morangos selecionados</div>
            </div>
        </div>

        <div class="menu-item">
            <img src="img/pizzaRomeueJulieta.jpeg" alt="Pizza Romeu e Julieta" class="menu-item-image">
            <div class="menu-item-info">
                <div class="menu-item-name">Romeu e Julieta</div>
                <div class="menu-item-description">Goiabada e queijo</div>
            </div>
        </div>

        <div class="menu-item">
            <img src="img/pizzaPrestigio.jpeg" alt="Pizza Prestígio" class="menu-item-image">
            <div class="menu-item-info">
                <div class="menu-item-name">Prestígio</div>
                <div class="menu-item-description">Chocolate e coco ralado</div>
            </div>
        </div>
        <div class="menu-item">
            <img src="img/docedeLeite.jpeg" alt="Pizza Doce de leite" class="menu-item-image">
            <div class="menu-item-info">
                <div class="menu-item-name">Doce de leite e amêndoas</div>
                <div class="menu-item-description">Doce de leite com amêndoas crocantes</div>
            </div>
        </div>
        <div class="menu-item">
            <img src="img/pizzachocolatebranco.webp" alt="Pizza de Chocolate Branco" class="menu-item-image">
            <div class="menu-item-info">
                <div class="menu-item-name">Chocolate Branco com avelã</div>
                <div class="menu-item-description">Delicioso chocolate branco com avelã</div>
            </div>
        </div>

          <div class="menu-item">
            <img src="img/pizzabeijinho.webp" alt="Pizza Beijinho" class="menu-item-image">
            <div class="menu-item-info">
                <div class="menu-item-name">Beijinho</div>
                <div class="menu-item-description">Pizza inspirada no doce Beijinho</div>
            </div>
        </div>
         <div class="menu-item">
            <img src="img/paçoca.jpeg" alt="Pizza paçoca" class="menu-item-image">
            <div class="menu-item-info">
                <div class="menu-item-name">Paçoca com chocolate</div>
                <div class="menu-item-description">Mistura de paçoca triturada com chocolate</div>
            </div>
            </div>
             <div class="menu-item">
            <img src="img/kinderBueno.jpeg" alt="Pizza Kinder Bueno" class="menu-item-image">
            <div class="menu-item-info">
                <div class="menu-item-name">Kinder Bueno e ferreiro Rocher</div>
                <div class="menu-item-description">Kinder Bueno, Ferreiro Rocher e chocolate</div>
            </div>
        </div>
    </div>
</div>
`;

app.pages.localizacao = `
<div class="container fade-in">
    <h1 style="color: var(--primary-color); text-align: center; margin-bottom: 2rem;">Localização</h1>

    <section class="contact-section">
        <h2>Venha nos Visitar!</h2>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d912.2057028519222!2d-46.71587057154183!3d-23.86042489865664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce36365d5fce91%3A0x3aa91a6d3518b5bf!2sR.%20Cacaueiro%2C%2081%20-%20Col%C3%B4nia%20(Zona%20Sul)%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2004895-320!5e0!3m2!1spt-BR!2sbr!4v1768999290074!5m2!1spt-BR!2sbr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <div class="contact-info">
            <div class="contact-item">
                <h3> Endereço</h3>
                <p>R. Cacaueiro, 81 <br> Colônia - SP (Zona Sul) </p>
            </div>
            <div class="contact-item">
                <h3> Telefone</h3>
                <p>(11) 9 7345-8291<br>(11) 3456-7812</p>
            </div>
            <div class="contact-item">
                <h3> Horário</h3>
                <p>Seg-Qui: 11h-23h<br>Sex-Dom: 11h-00h</p>
            </div>
        </div>

        <div style="margin-top: 2rem;">
            <h3 style="color: var(--accent-color); margin-bottom: 1rem;"> Envie-nos um Email</h3>
            <p>Dúvidas? Sugestões? Estamos aqui para ajudar!</p>
            <p>Email: contato@betospizzaria.com.br</p>
        </div>

        <div style="margin-top: 2rem;">
            <h3 style="color: var(--accent-color); margin-bottom: 1rem;"> Siga-nos</h3>
            <p>Instagram: @BetosP​izzaria</p>
        </div>
    </section>
</div>
`;

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});

// Handle browser back button
window.addEventListener('popstate', () => {
    // This handles browser back/forward navigation if you add history API support
});
