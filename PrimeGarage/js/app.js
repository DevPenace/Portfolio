// js/app.js
// Lógica principal: dados mockados, renderização, carrinho (localStorage), filtros e checkout simulado

const STORAGE_CART = 'pg_cart_v1';
const STORAGE_ORDER = 'pg_last_order_v1';
const STORAGE_USERS = 'pg_users_v1';

const cars = [
  { id: 'c1', name: 'Mercedes C250', brand: 'Mercedes', year: 2019, km: 42000, transmission: 'Automático', fuel: 'Gasolina', price: 189900, images: ['img/Mercedes C250 nova.jpeg','img/Mercedes C250.webp','img/Mercedes C2502.jpeg'], desc: 'Elegância e performance, impecável estado, completo.' },
  { id: 'c2', name: 'BMW Série 3', brand: 'BMW', year: 2018, km: 54000, transmission: 'Automático', fuel: 'Gasolina', price: 159900, images: ['img/BMW Série 3 2.jpeg','img/BMW Série 3.jpeg','img/BMW Série 3.png'], desc: 'Seminovo premium, garantia e procedência.' },
  { id: 'c3', name: 'Audi A4', brand: 'Audi', year: 2020, km: 30000, transmission: 'Automático', fuel: 'Gasolina', price: 189900, images: ['img/Audi A4.avif','img/Audi A4.jpeg','img/Audi A4.webp'], desc: 'Conforto e tecnologia, histórico de manutenção completo.' },
  { id: 'c4', name: 'Porsche Cayman', brand: 'Porsche', year: 2017, km: 38000, transmission: 'Manual', fuel: 'Gasolina', price: 435900, images: ['img/Porsche Cayman.jpeg','img/Porsche Cayman.webp','img/Porsche Cayman tras.webp'], desc: 'Esportivo premium, low mileage e performance exemplar.' }
  ,{ id: 'c5', name: 'Jaguar XE', brand: 'Jaguar', year: 2019, km: 41000, transmission: 'Automático', fuel: 'Gasolina', price: 199900, images: ['img/Jaguar XE.webp','img/Jaguar XE.jpeg','img/Jaguar XE tras.jpeg'], desc: 'Design inglês, conforto e potência.' }
  ,{ id: 'c6', name: 'Land Rover Discovery', brand: 'Land Rover', year: 2018, km: 62000, transmission: 'Automático', fuel: 'Diesel', price: 249900, images: ['img/Land Rover Discovery.avif','img/Land Rover Discovery lado.jpeg','img/Land Rover Discovery.jpeg'], desc: 'Versatilidade, espaço e presença.' }
  ,{ id: 'c7', name: 'BYD Yuan Pro', brand: 'BYD', year: 2024, km: 45000, transmission: 'Automático', fuel: 'Elétrico', price: 219900, images: ['img/BYD Yuan Pro.webp','img/BYD Yuan Pro lado.webp','img/BYD Yuan Pro.avif'], desc: 'Muscle car com performance e estilo.' }
  ,{ id: 'c8', name: 'Maserati MC20 ', brand: 'Maserati', year: 2020, km: 22000, transmission: 'Automático', fuel: 'Gasolina', price: 2900000, images: ['img/maserati mc20.jpeg','img/maserati mc20 lado.jpeg','img/maserati mc20.webp'], desc: 'Exclusividade e alta performance.' }
  ,{ id: 'c9', name: 'Volvo XC90', brand: 'Volvo', year: 2020, km: 30000, transmission: 'Automático', fuel: 'Híbrido', price: 319900, images: ['img/Volvo XC90.jpeg','img/Volvo XC90 lado.jpg','img/Volvo XC90 tras.jpeg'], desc: 'Segurança e tecnologia para família.' }
  ,{ id: 'c10', name: 'Lamborghini Urus', brand: 'Lamborghini', year: 2018, km: 18000, transmission: 'Automático', fuel: 'Gasolina', price: 2900000, images: ['img/Lamborghini Urus.webp','img/Lamborghini Urus.jpeg','img/Lamborghini Urustraseira.webp'], desc: 'Confiabilidade e economia.' }
];

/* Utilitários */
function formatCurrency(v){ return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }

function saveCart(cart){ localStorage.setItem(STORAGE_CART, JSON.stringify(cart)); updateCartCount(); }
function loadCart(){ try{ return JSON.parse(localStorage.getItem(STORAGE_CART)) || []; }catch(e){ return []; } }
function updateCartCount(){ const count = loadCart().length; const el = document.getElementById('cart-count'); if(el) el.textContent = count; }

/* Renderização: index - destaques */
function renderDestaques(){ const container = document.getElementById('cards-destaque'); if(!container) return; container.innerHTML = ''; cars.slice(0,4).forEach(car => {
  const card = document.createElement('article'); card.className = 'card';
  card.innerHTML = `
    <img src="${car.images[0]}" alt="${car.name}">
    <h3>${car.name}</h3>
    <p class="small-muted">${car.brand} • ${car.year} • ${car.km.toLocaleString()} km</p>
    <div class="price">${formatCurrency(car.price)}</div>
    <div class="actions">
      <a class="btn btn-outline" href="detalhes.html?id=${car.id}">Ver detalhes</a>
      <button class="btn btn-primary" onclick="addToCart('${car.id}')">Adicionar ao carrinho</button>
    </div>
  `;
  container.appendChild(card);
}); }

/* Catalogo: filtragem e busca */
function renderCatalog(filter={}){
  const list = document.getElementById('catalog-list'); if(!list) return;
  const q = (filter.q||'').toLowerCase();
  const brand = filter.brand||'';
  const minYear = filter.minYear||0; const maxYear = filter.maxYear||9999;
  const minPrice = filter.minPrice||0; const maxPrice = filter.maxPrice||Infinity;
  const result = cars.filter(c => {
    if(q && !c.name.toLowerCase().includes(q) && !c.brand.toLowerCase().includes(q)) return false;
    if(brand && c.brand !== brand) return false;
    if(c.year < minYear || c.year > maxYear) return false;
    if(c.price < minPrice || c.price > maxPrice) return false;
    return true;
  });
  list.innerHTML = '';
  const info = document.createElement('div'); info.className='small-muted'; info.style.gridColumn='1/-1'; info.textContent = `${result.length} veículos encontrados`; list.appendChild(info);
  if(result.length===0){ list.innerHTML = '<p>Não encontramos veículos com esses filtros.</p>'; return; }
  result.forEach(car => {
    const card = document.createElement('article'); card.className='card';
    card.innerHTML = `
      <img src="${car.images[0]}" alt="${car.name}">
      <h3>${car.name}</h3>
      <p class="small-muted">${car.brand} • ${car.year} • ${car.km.toLocaleString()} km</p>
      <div class="price">${formatCurrency(car.price)}</div>
      <div class="actions">
        <a class="btn btn-outline" href="detalhes.html?id=${car.id}">Ver detalhes</a>
        <button class="btn btn-primary" onclick="addToCart('${car.id}')">Adicionar ao carrinho</button>
      </div>
    `;
    list.appendChild(card);
  });
}

/* UI: toggle painel de filtros e popular marcas */
function toggleFilterPanel(){ const panel = document.getElementById('filter-panel'); if(!panel) return; panel.classList.toggle('open'); }

function populateBrandOptions(){ const sel = document.querySelector('select[name="brand"]'); if(!sel) return; const brands = Array.from(new Set(cars.map(c=>c.brand))).sort(); // remover existentes (exceto a primeira)
  // limpa opções exceto a primeira
  while(sel.options.length>1) sel.remove(1);
  brands.forEach(b=>{ const opt = document.createElement('option'); opt.value = b; opt.textContent = b; sel.appendChild(opt); }); }

/* Detalhes */
function renderDetails(id){ const car = cars.find(c=>c.id===id); if(!car) return;
  const el = document.getElementById('detail-root'); if(!el) return;
  const mainImg = car.images[0];
  el.innerHTML = `
    <div class="detail-main">
      <div class="gallery">
        <div class="main-image"><img id="main-img" src="${mainImg}" alt="${car.name}"></div>
        <div class="thumbs">
          ${car.images.map((src,i)=>`<img class="thumb" src="${src}" data-src="${src}" ${i===0? 'style="border:2px solid #c59a45"' : ''} alt="thumb-${i}">`).join('')}
        </div>
      </div>
      <div class="detail-info">
        <h1>${car.name}</h1>
        <p class="small-muted">${car.brand} • ${car.year} • ${car.km.toLocaleString()} km</p>
        <div class="price">${formatCurrency(car.price)}</div>
        <p>${car.desc}</p>
        <ul>
          <li><strong>Transmissão:</strong> ${car.transmission}</li>
          <li><strong>Combustível:</strong> ${car.fuel}</li>
          <li><strong>Ano:</strong> ${car.year}</li>
          <li><strong>Quilometragem:</strong> ${car.km.toLocaleString()} km</li>
        </ul>
        <div style="margin-top:12px; display:flex; gap:10px;">
          <button class="btn btn-primary" onclick="addToCart('${car.id}', true)">Adicionar ao carrinho</button>
          <a class="btn btn-outline" href="sobre.html#contato">Solicitar contato</a>
        </div>
      </div>
    </div>
  `;
  // behavior: troca da imagem principal ao clicar na thumb
  const thumbs = el.querySelectorAll('.thumb'); const imgMain = el.querySelector('#main-img');
  thumbs.forEach(t=> t.addEventListener('click', ()=>{ thumbs.forEach(x=>x.style.border='2px solid transparent'); t.style.border='2px solid #c59a45'; const src = t.dataset.src || t.src; if(imgMain) imgMain.src = src; }));
}

/* Carrinho */
function addToCart(id, fromDetails=false){ const car = cars.find(c=>c.id===id); if(!car) return; const cart = loadCart();
  // Não permitir duplicados: cada veículo único
  if(cart.find(i=>i.id===id)){ alert('Veículo já adicionado ao carrinho.'); if(fromDetails) window.location.href='carrinho.html'; return; }
  cart.push({ id: car.id, name: car.name, price: car.price }); saveCart(cart); if(fromDetails) window.location.href='carrinho.html'; else showToast('Adicionado ao carrinho'); }

function removeFromCart(id){ let cart = loadCart(); cart = cart.filter(i=>i.id!==id); saveCart(cart); renderCart(); }

function renderCart(){ const root = document.getElementById('cart-root'); if(!root) return; const cart = loadCart(); root.innerHTML=''; if(cart.length===0){ root.innerHTML='<p>Seu carrinho está vazio.</p>'; return; }
  // estrutura principal do carrinho: lista à esquerda e resumo à direita
  const page = document.createElement('div'); page.className = 'cart-page';
  const itemsEl = document.createElement('div'); itemsEl.className = 'cart-items';
  const summaryEl = document.createElement('aside'); summaryEl.className = 'cart-summary card';
  let total = 0;
  cart.forEach(item =>{
    const car = cars.find(c=>c.id===item.id) || {};
    total += item.price;
    const row = document.createElement('div'); row.className = 'cart-row card';
    row.innerHTML = `
      <div class="cart-thumb"><img src="${(car.images && car.images[0]) || 'img/1.png'}" alt="${item.name}"></div>
      <div class="cart-info">
        <strong>${item.name}</strong>
        <div class="small-muted">${car.brand || ''} • ${car.year || ''} • ${car.km? car.km.toLocaleString() + ' km':''}</div>
      </div>
      <div class="cart-price">${formatCurrency(item.price)}</div>
      <div class="cart-actions"><button class="btn btn-outline" onclick="removeFromCart('${item.id}')">Remover</button></div>
    `;
    itemsEl.appendChild(row);
  });

  // resumo
  summaryEl.innerHTML = `
    <h3>Resumo do pedido</h3>
    <div class="small-muted">${cart.length} veículo(s)</div>
    <div class="summary-total" style="margin-top:10px"><strong>Total:</strong> <div class="price">${formatCurrency(total)}</div></div>
    <div style="margin-top:12px; display:flex; gap:8px; flex-direction:column;">
      <a class="btn btn-primary" id="btn-checkout" href="checkout.html">Finalizar compra</a>
      <a class="btn btn-outline" href="catalogo.html">Continuar comprando</a>
    </div>
  `;

  page.appendChild(itemsEl); page.appendChild(summaryEl); root.appendChild(page);

  // se usuário não estiver logado, ajustar botão para redirecionar ao login com retorno
  const btn = document.getElementById('btn-checkout'); if(btn){ const current = getCurrentUser(); if(!current){ btn.href = 'login.html?next=' + encodeURIComponent('/checkout.html'); btn.textContent = 'Entrar para finalizar'; } }
}

/* Checkout: validação e simulação de pagamento */
function renderCheckout(){ const root = document.getElementById('checkout-root'); if(!root) return; const cart = loadCart(); if(cart.length===0){ root.innerHTML = '<p>Seu carrinho está vazio.</p>'; return; }
  const total = cart.reduce((s,i)=>s+i.price,0);
  root.innerHTML = `
    <div class="grid-2">
      <form id="checkout-form" class="card">
        <h3>Dados do cliente</h3>
        <label>Nome completo<input name="fullname" required class="input"></label>
        <label>CPF<input name="cpf" required class="input" placeholder="000.000.000-00"></label>
        <label>E-mail<input name="email" type="email" required class="input"></label>
        <label>Telefone<input name="phone" required class="input"></label>
        <label>Endereço<textarea name="address" required class="input"></textarea></label>
        <h3>Pagamento</h3>
        <select name="method" id="pay-method" class="input"><option value="card">Cartão de crédito</option><option value="pix">Pix</option><option value="boleto">Boleto</option></select>
        <div id="card-fields">
          <label>Número do cartão<input name="cardnumber" class="input" placeholder="0000 0000 0000 0000"></label>
          <label>Nome no cartão<input name="cardname" class="input"></label>
          <label>Validade<input name="cardexp" class="input" placeholder="MM/AA"></label>
          <label>CVV<input name="cardcvv" class="input" placeholder="123"></label>
        </div>
        <div style="margin-top:12px"><button type="submit" class="btn btn-primary">Confirmar pagamento</button></div>
      </form>
      <aside class="card">
        <h3>Resumo da compra</h3>
        <ul>
          ${cart.map(i=>`<li>${i.name} • ${formatCurrency(i.price)}</li>`).join('')}
        </ul>
        <p class="price">Total: ${formatCurrency(total)}</p>
      </aside>
    </div>
  `;

  document.getElementById('pay-method').addEventListener('change', (e)=>{
    document.getElementById('card-fields').style.display = e.target.value==='card' ? 'block':'none';
  });

  document.getElementById('checkout-form').addEventListener('submit', (ev)=>{
    ev.preventDefault(); const form = ev.target; const data = Object.fromEntries(new FormData(form).entries());
    // validações simples
    if(!data.fullname || !data.cpf || !data.email || !data.address){ alert('Preencha os campos obrigatórios.'); return; }
    if(data.method==='card'){
      if(!data.cardnumber || !data.cardname || !data.cardexp || !data.cardcvv){ alert('Preencha os dados do cartão.'); return; }
    }
    // se não estiver logado, direcionar para login/registro antes de confirmar
    const current = getCurrentUser();
    if(!current){ // redireciona para login e volta para checkout após autenticação
      const next = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.href = `login.html?next=${next}`; return;
    }
    // simula pagamento
    const orderId = 'PG' + Date.now();
    const order = { id: orderId, items: loadCart(), total: total, buyer: { name: data.fullname, email: data.email }, date: new Date().toISOString() };
    localStorage.setItem(STORAGE_ORDER, JSON.stringify(order));
    // vincula pedido ao usuário
    saveOrderToUser(order);
    localStorage.removeItem(STORAGE_CART);
    updateCartCount();
    // redireciona para sucesso
    window.location.href = `sucesso.html?order=${orderId}`;
  });
}

function showToast(msg){ const t = document.createElement('div'); t.textContent=msg; t.style.position='fixed'; t.style.bottom='20px'; t.style.right='20px'; t.style.background='#111'; t.style.color='#fff'; t.style.padding='10px 14px'; t.style.border='1px solid rgba(255,255,255,0.06)'; t.style.borderRadius='8px'; document.body.appendChild(t); setTimeout(()=>{ t.style.opacity=0; setTimeout(()=>t.remove(),300); },2000); }

function renderSuccess(){ const params = new URLSearchParams(location.search); const orderId = params.get('order'); const root = document.getElementById('success-root'); const order = JSON.parse(localStorage.getItem(STORAGE_ORDER) || 'null'); if(!root) return;
  if(!order || order.id !== orderId){ root.innerHTML = '<p>Nenhum pedido encontrado.</p>'; return; }
  root.innerHTML = `
    <div class="card">
      <h2>Compra realizada com sucesso!</h2>
      <p>Número do pedido: <strong>${order.id}</strong></p>
      <p>Comprador: ${order.buyer.name} • ${order.buyer.email}</p>
      <h3>Itens</h3>
      <ul>${order.items.map(i=>`<li>${i.name} • ${formatCurrency(i.price)}</li>`).join('')}</ul>
      <p class="price">Total: ${formatCurrency(order.total)}</p>
      <div style="margin-top:12px"><a class="btn btn-primary" href="catalogo.html">Voltar ao catálogo</a></div>
    </div>
  `;
}

/* Inicialização conforme página */
document.addEventListener('DOMContentLoaded', ()=>{
  updateCartCount(); renderDestaques();
  const body = document.body;
  renderUserArea();
  if(document.getElementById('catalog-list')){
    renderCatalog();
    // busca e filtros básicos
    const form = document.getElementById('filter-form'); if(form){ form.addEventListener('submit', (ev)=>{ ev.preventDefault(); const data = Object.fromEntries(new FormData(form).entries()); renderCatalog({ q:data.q, brand:data.brand, minYear: Number(data.minYear)||0, maxYear: Number(data.maxYear)||9999, minPrice: Number(data.minPrice)||0, maxPrice: Number(data.maxPrice)||Infinity }); });
      // reset
      const btnReset = document.getElementById('filter-reset'); if(btnReset) btnReset.addEventListener('click', ()=>{ form.reset(); renderCatalog(); });
    }
    // toggle painel
    const toggle = document.getElementById('filter-toggle'); if(toggle) toggle.addEventListener('click', ()=> toggleFilterPanel());
    populateBrandOptions();
  }
  if(document.getElementById('detail-root')){
    const params = new URLSearchParams(location.search); const id = params.get('id'); renderDetails(id);
  }
  if(document.getElementById('cart-root')) renderCart();
  if(document.getElementById('checkout-root')) renderCheckout();
  if(document.getElementById('success-root')) renderSuccess();
});

/* ---------- Autenticação simples (localStorage) ---------- */
function getUsers(){ try{ return JSON.parse(localStorage.getItem(STORAGE_USERS)) || []; }catch(e){ return []; } }
function saveUsers(u){ localStorage.setItem(STORAGE_USERS, JSON.stringify(u)); }

function registerUser({name,email,password}){
  const users = getUsers(); if(users.find(x=>x.email===email)){ return { ok:false, message:'E-mail já cadastrado.' }; }
  const id = 'u' + Date.now(); const user = { id, name, email, password }; users.push(user); saveUsers(users); // auto-login
  sessionStorage.setItem('pg_session_user', id); return { ok:true, user };
}

function loginUser({email,password}){
  const users = getUsers(); const u = users.find(x=>x.email===email && x.password===password); if(!u) return { ok:false, message:'Credenciais inválidas.' }; sessionStorage.setItem('pg_session_user', u.id); return { ok:true, user:u };
}

function logout(){ sessionStorage.removeItem('pg_session_user'); renderUserArea(); showToast('Você saiu da conta.'); }

function getCurrentUser(){ const id = sessionStorage.getItem('pg_session_user'); if(!id) return null; const users = getUsers(); return users.find(u=>u.id===id) || null; }

function renderUserArea(){ const root = document.getElementById('user-area'); if(!root) return; const user = getCurrentUser(); if(user){ root.innerHTML = `<div class="user-greet">Olá, ${user.name}</div><nav class="user-links"><a href="minhas-compras.html">Minhas Compras</a> <a href="#" id="logout-link">Sair</a></nav>`; const out = document.getElementById('logout-link'); if(out) out.addEventListener('click',(e)=>{ e.preventDefault(); logout(); window.location.reload(); }); } else { root.innerHTML = `<a class="btn btn-outline" href="login.html">Entrar / Cadastrar</a>`; } }

function renderUserArea(){
  const root = document.getElementById('user-area'); if(!root) return; const user = getCurrentUser();
  if(user){
    root.innerHTML = `
      <div class="user-area">
        <button class="user-name-btn" id="user-name-btn" aria-expanded="false">Olá, ${user.name} <i class="fa fa-caret-down"></i></button>
        <div class="user-dropdown" id="user-dropdown" aria-hidden="true">
          <a class="dropdown-item" href="minhas-compras.html">Minhas Compras</a>
          <a class="dropdown-item" href="#" id="logout-link">Sair</a>
        </div>
      </div>
    `;

    const btn = document.getElementById('user-name-btn');
    const menu = document.getElementById('user-dropdown');

    // remove listener anterior se existir
    if(window._pg_user_click_handler) document.removeEventListener('click', window._pg_user_click_handler);

    // clique no botão abre/fecha o menu
    btn.addEventListener('click', (e)=>{ e.stopPropagation(); const opened = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', (!opened).toString()); menu.style.display = opened ? 'none' : 'block'; menu.setAttribute('aria-hidden', opened ? 'true' : 'false'); });

    // fecha ao clicar fora
    window._pg_user_click_handler = function(e){ if(!btn || !menu) return; if(!btn.contains(e.target) && !menu.contains(e.target)){ btn.setAttribute('aria-expanded','false'); menu.style.display='none'; menu.setAttribute('aria-hidden','true'); } };
    document.addEventListener('click', window._pg_user_click_handler);

    // logout
    const out = document.getElementById('logout-link'); if(out) out.addEventListener('click',(e)=>{ e.preventDefault(); logout(); window.location.reload(); });
  } else {
    root.innerHTML = `<a class="btn btn-outline" href="login.html">Entrar / Cadastrar</a>`;
  }
}

/* Salva pedido na conta do usuário (se houver) */
function saveOrderToUser(order){ const user = getCurrentUser(); if(!user) return; const key = `pg_orders_${user.id}`; try{ const arr = JSON.parse(localStorage.getItem(key) || '[]'); arr.push(order); localStorage.setItem(key, JSON.stringify(arr)); }catch(e){ console.error(e); } }

function getUserOrders(){ const user = getCurrentUser(); if(!user) return []; const key = `pg_orders_${user.id}`; try{ return JSON.parse(localStorage.getItem(key) || '[]'); }catch(e){ return []; } }

// expor funções para uso em HTML
window.addToCart = addToCart; window.removeFromCart = removeFromCart;
