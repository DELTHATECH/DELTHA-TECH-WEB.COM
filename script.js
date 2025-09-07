// Inicializar carrito desde localStorage
let cart = JSON.parse(localStorage.getItem('deltha_cart') || '[]');
const cartCount = document.getElementById('cart-count');

// 1. Base de datos de productos (ejemplo, puedes expandir)
const exampleProducts = [
  // SAMSUNG
  {id:'s-a05', brand:'SAMSUNG', model:'A05', ram:'4GB', storage:'64GB', price:425, images:['img/A05.jpg']},
  {id:'s-a06-64', brand:'SAMSUNG', model:'A06', ram:'4GB', storage:'64GB', price:420, images:['img/A06.jpg']},
  {id:'s-a06-128', brand:'SAMSUNG', model:'A06', ram:'4GB', storage:'128GB', price:475, images:['img/A06-128.jpg']},
  {id:'s-a16-128', brand:'SAMSUNG', model:'A16', ram:'4GB', storage:'128GB', price:575, images:['img/A16-128.jpg']},
  {id:'s-a16-256', brand:'SAMSUNG', model:'A16', ram:'8GB', storage:'256GB', price:755, images:['img/A16-256.jpg']},
  {id:'s-a26-5g', brand:'SAMSUNG', model:'A26 5G', ram:'6GB', storage:'128GB', price:975, images:['img/A26-5G.jpg']},
  // REDMI
  {id:'r-a5-64', brand:'REDMI', model:'A5', ram:'3+3GB', storage:'64GB', price:385, images:['img/A5.jpg']},
  {id:'r-a5-128', brand:'REDMI', model:'A5', ram:'4+4GB', storage:'128GB', price:420, images:['img/A5-128.jpg']},
  {id:'r-13-128', brand:'REDMI', model:'13', ram:'6GB', storage:'128GB', camera:'108MP', price:545, images:['img/13.jpg']},
  {id:'r-13x-256', brand:'REDMI', model:'13X', ram:'8GB', storage:'256GB', camera:'108MP', price:0, images:['img/13X.jpg']},
  {id:'r-14c-128', brand:'REDMI', model:'14C', ram:'4+4GB', storage:'128GB', camera:'50MP', price:485, images:['img/14C.jpg']},
  {id:'r-14c-256', brand:'REDMI', model:'14C', ram:'4+4GB', storage:'256GB', camera:'50MP', price:485, images:['img/14C-256.jpg']},
  {id:'r-15c-128', brand:'REDMI', model:'15C', ram:'4+4GB', storage:'128GB', camera:'50MP', price:565, images:['img/15C-128.jpg']},
  {id:'r-15c-256', brand:'REDMI', model:'15C', ram:'4+4GB', storage:'256GB', camera:'50MP', price:595, images:['img/15C-256.jpg']},
  {id:'r-note14-256', brand:'REDMI', model:'NOTE 14', ram:'8GB', storage:'256GB', camera:'108MP', price:755, images:['img/NOTE-14.jpg']},
  {id:'r-note14pro-256', brand:'REDMI', model:'NOTE 14 PRO 4G', ram:'8GB', storage:'256GB', camera:'200MP', price:985, images:['img/NOTE-14-PRO.jpg']},
  {id:'r-note14plus-256', brand:'REDMI', model:'NOTE 14 PRO PLUS', ram:'8GB', storage:'256GB', camera:'200MP', price:1395, images:['img/NOTE-14-PRO-PLUS.jpg']},
  // HONOR
  {id:'h-play9a-64', brand:'HONOR', model:'Play 9A', ram:'4GB', storage:'64GB', price:265, images:['img/PLAY-9A.jpg']},
  {id:'h-play9a-126', brand:'HONOR', model:'Play 9A', ram:'4GB', storage:'126GB', price:425, images:['img/PLAY-9A-128.jpg']},
  {id:'h-play9c-256', brand:'HONOR', model:'Play 9C', ram:'6GB', storage:'256GB', price:555, images:['img/PLAY-9C.jpg']},
  {id:'h-x5b-64', brand:'HONOR', model:'X5B', ram:'4GB', storage:'64GB', price:275, images:['img/X5B.jpg']},
  {id:'h-x6c-256', brand:'HONOR', model:'X6C', ram:'6GB', storage:'256GB', price:565, images:['img/X6C.webp']},
  {id:'h-x6c-256-8', brand:'HONOR', model:'X6C', ram:'8GB', storage:'256GB', price:610, images:['img/X6C-256.webp']},
  {id:'h-magic6lite-256', brand:'HONOR', model:'MAGIC 6 LITE 5G', ram:'8GB', storage:'256GB', camera:'108MP', price:1075, images:['img/MAGIC-6-LITE-5G.jpg']},
  {id:'h-magic7lite-256', brand:'HONOR', model:'MAGIC 7 LITE 5G', ram:'8GB', storage:'256GB', camera:'108MP', price:1220, images:['img/MAGIC-7-LITE-5G.jpg']},
  // MOTOROLA
  {id:'m-e15-64', brand:'MOTOROLA', model:'MOTO E15', ram:'2GB', storage:'64GB', price:385, images:['img/E15.jpeg']},
  {id:'m-g04s-64', brand:'MOTOROLA', model:'MOTO G04S', ram:'4GB', storage:'64GB', price:395, images:['img/G04S.webp']},
  {id:'m-g05-128', brand:'MOTOROLA', model:'MOTO G05', ram:'4GB', storage:'128GB', price:495, images:['img/G05.png']},
  {id:'m-g15-256', brand:'MOTOROLA', model:'MOTO G15', ram:'4GB', storage:'256GB', price:595, images:['img/G15.jpg']},
  // ZTE
  {id:'z-a35core-32', brand:'ZTE', model:'A35 CORE', ram:'4+4GB', storage:'32GB', price:255, images:['img/A35-CORE.png']},
  {id:'z-a35e-64', brand:'ZTE', model:'A35 E', ram:'2+4GB', storage:'64GB', price:345, images:['img/A35E.jpg']},
  {id:'z-a56pro-128', brand:'ZTE', model:'A56 PRO', ram:'4+8GB', storage:'128GB', price:445, images:['img/A56-PRO.png']},
  {id:'z-a75-5g-128', brand:'ZTE', model:'A75 5G', ram:'4+4GB', storage:'128GB', price:495, images:['img/A75-5G.jpg']},
  // ...agrega más modelos si faltan...
];

// Cargar productos del admin
let adminProducts = [];
try {
  adminProducts = JSON.parse(localStorage.getItem('deltha_products') || '[]');
  if (!Array.isArray(adminProducts)) adminProducts = [];
} catch(e) {
  adminProducts = [];
}

// Marcar productos del admin
adminProducts = adminProducts.map(p => ({...p, _fromAdmin: true}));

// Combinar ambos catálogos (sin duplicados por ID, admin sobreescribe si hay coincidencia)
let productsMap = {};
for (const p of exampleProducts) productsMap[p.id] = p;
for (const p of adminProducts) productsMap[p.id] = p;
let products = Object.values(productsMap);

const accessories = [
  {id:'carcasa', title:'Carcasa', price:25, brand:'Todas', images:['','','','','']},
  {id:'carcasa-personalizada', title:'Carcasa personalizada', price:55, images:['','','','','']},
  {id:'cargador', title:'Cargador', price:35, brand:'Redd, Romax, Samsung, Xiaomi', type:'V.8, Tipo C', images:['','','','','']},
  {id:'cable', title:'Cable', price:20, brand:'Samsung, Xiaomi', type:'V.8, Tipo C, Tipo C a Tipo C', images:['','','','','']},
  {id:'protector', title:'Protector de vidrio', price:15, brand:'Todas', images:['','','','','']},
  {id:'memoria', title:'Memoria', price:0, options:['8GB','16GB','32GB','64GB','128GB','256GB'], images:['','','','','','']},
  {id:'audif-cable', title:'Audífono con cable', price:35, brand:'Samsung', images:['img/aud-sm-2.jpg','img/aud-sm.webp','']},
  {id:'audif-cable-litong', title:'Audífono con cable', price:20, brand:'Litong', images:['','','']},
  {id:'audif-inalambrico', title:'Audífono inalámbrico', price:55, images:['','','']},
  // ...agrega más accesorios si faltan...
];

// Actualiza el carrito en la UI y localStorage
function updateCartUI(){
  cartCount.textContent = cart.reduce((s,i)=>s+i.qty,0);
  localStorage.setItem('deltha_cart',JSON.stringify(cart));
}

// Añadir producto al carrito
function addToCart(id){
  const find = cart.find(x=>x.id===id);
  const prod = products.find(p=>p.id===id) || accessories.find(a=>a.id===id) || {id,model:id,price:0};
  if(find) find.qty++;
  else cart.push({id,model:prod.model || prod.title,price:prod.price||0,qty:1});
  updateCartUI();
  alert('Añadido al carrito');
}

// Buscador de productos
let globalSearchQuery = '';
const searchGlobal = document.getElementById('search-global');
if (searchGlobal) {
  searchGlobal.addEventListener('input', function() {
    globalSearchQuery = this.value;
    renderProducts();
    renderAccessories();
  });
}

// Renderizar productos en el catálogo
function renderProducts() {
  const productsDiv = document.getElementById('products');
  let filtered = products;
  if (globalSearchQuery.trim()) {
    const q = globalSearchQuery.trim().toLowerCase();
    filtered = products.filter(p =>
      (p.brand && p.brand.toLowerCase().includes(q)) ||
      (p.model && p.model.toLowerCase().includes(q)) ||
      (p.ram && p.ram.toLowerCase().includes(q)) ||
      (p.storage && p.storage.toLowerCase().includes(q)) ||
      (p.camera && p.camera.toLowerCase().includes(q)) ||
      (p.id && p.id.toLowerCase().includes(q))
    );
  }
  productsDiv.innerHTML = filtered.length
    ? filtered.map(p => `
      <div class="card">
        ${p.images && p.images.length && p.images[0] ? `<img src="${p.images[0]}" alt="${p.brand} ${p.model}" style="width:100%;max-width:140px;margin-bottom:10px;border-radius:12px;">` : ''}
        <div class="product-title">${p.brand} ${p.model}</div>
        <div class="small">${p.ram ? p.ram + ' RAM / ' : ''}${p.storage || ''}</div>
        <div class="price">S/ ${p.price}</div>
        ${p._fromAdmin ? `<div class="small" style="color:#0ff;font-weight:bold;">Ingreso en el catálogo general</div>` : ''}
        <button class="btn add" onclick="addToCart('${p.id}')">Agregar al carrito</button>
      </div>
    `).join('')
    : '<div class="small">No se encontraron productos.</div>';
}

function renderAccessories() {
  const accessoriesDiv = document.getElementById('accessories');
  let filtered = accessories;
  if (globalSearchQuery.trim()) {
    const q = globalSearchQuery.trim().toLowerCase();
    filtered = accessories.filter(a =>
      (a.title && a.title.toLowerCase().includes(q)) ||
      (a.brand && a.brand.toLowerCase().includes(q)) ||
      (a.type && a.type.toLowerCase().includes(q)) ||
      (a.options && a.options.join(',').toLowerCase().includes(q)) ||
      (a.id && a.id.toLowerCase().includes(q))
    );
  }
  accessoriesDiv.innerHTML = filtered.length
    ? filtered.map(a => `
      <div class="card">
        <div class="product-title">${a.title}${a.brand ? ' - ' + a.brand : ''}</div>
        ${a.type ? `<div class="small">${a.type}</div>` : ''}
        ${a.options ? `<div class="small">Opciones: ${a.options.join(', ')}</div>` : ''}
        <div class="price">S/ ${a.price || ''}</div>
        ${a.images ? `<div class="small">Fotos: ${a.images.map((img,i)=>img?`<img src="${img}" alt="foto${i+1}" style="width:40px;">`:`[${i+1}]`).join(' ')}</div>` : ''}
        <button class="btn add" onclick="addToCart('${a.id}')">Agregar al carrito</button>
      </div>
    `).join('')
    : '<div class="small">No se encontraron accesorios.</div>';
}

// Renderizar items del carrito
function renderCartItems(){
  cartItems.innerHTML = cart.map(it=>`<div class='cart-item'><div>${it.model} x${it.qty}</div><div>S/ ${ (it.price||0)*it.qty }</div></div>`).join('')||'<div class="small">Carrito vacío</div>';
  cartTotal.textContent = cart.reduce((s,i)=>s+i.qty*(i.price||0),0).toFixed(2);
}

// Abrir y cerrar modal carrito
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
function openCart(){
  renderCartItems();
  cartModal.classList.remove('hidden');
}
function closeCart(){cartModal.classList.add('hidden')}

// Eventos de botones
document.getElementById('open-cart').addEventListener('click',openCart);
document.getElementById('close-cart').addEventListener('click',closeCart);

// Checkout -> generar mensaje de WhatsApp con selector de número
document.getElementById('checkout').addEventListener('click',()=>{
  if(cart.length===0){alert('Carrito vacío');return}
  const lines = cart.map(i=>`${i.model} x${i.qty} - S/ ${(i.price||0)*i.qty}`);
  const total = cart.reduce((s,i)=>s+i.qty*(i.price||0),0).toFixed(2);
  const msg = `*Pedido DELTHA-TECH*\n${lines.join('\n')}\nTotal: S/ ${total}\n\nContactarme por: `;
  const phones = [
    {label:'910-763-905',num:'+51910763905'},
    {label:'982-175-666',num:'+51982175666'},
    {label:'957-161-730',num:'+51957161730'}
  ];
  let opts = phones.map((p,i)=>`${i+1}) ${p.label}`).join('\n');
  let sel = prompt(`Elige contacto para WhatsApp:\n${opts}\nIngresa el número de opción (1-3):`);
  let idx = parseInt(sel)-1;
  if(idx<0 || idx>=phones.length) { alert('Opción inválida'); return; }
  const wa = `https://wa.me/${phones[idx].num.replace('+','')}?text=${encodeURIComponent(msg)}`;
  window.open(wa,'_blank');
});

// Floating WhatsApp floater con menú y acción directa
document.getElementById('whatsapp-floater').addEventListener('click',()=>{
  const phones = [
    {label:'910-763-905',num:'+51910763905'},
    {label:'982-175-666',num:'+51982175666'},
    {label:'957-161-730',num:'+51957161730'}
  ];
  let opts = phones.map((p,i)=>`${i+1}) ${p.label}`).join('\n');
  let sel = prompt(`Elige contacto para WhatsApp:\n${opts}\nIngresa el número de opción (1-3):`);
  let idx = parseInt(sel)-1;
  if(idx<0 || idx>=phones.length) { alert('Opción inválida'); return; }
  const wa = `https://wa.me/${phones[idx].num.replace('+','')}?text=Hola,%20quiero%20información%20sobre%20DELTHA-TECH`;
  window.open(wa,'_blank');
});

// Soporte directo
document.getElementById('soporte-floater').addEventListener('click',()=>{
  window.open('https://wa.me/51910763905?text=Necesito%20soporte%20t%C3%A9cnico','_blank');
});

// El archivo ya contiene la lógica para catálogo, accesorios, carrito, WhatsApp, soporte, TikTok, Facebook y ubicación.

// Inicializar catálogo y carrito
renderProducts();
renderAccessories();
updateCartUI();
renderCartItems();