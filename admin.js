const PASSWORD = "60501044dph171626";

document.getElementById('login-btn').onclick = function() {
  const pass = document.getElementById('admin-pass').value;
  if(pass === PASSWORD) {
    document.getElementById('login-box').style.display = 'none';
    document.getElementById('admin-panel').style.display = '';
  } else {
    document.getElementById('login-msg').textContent = 'Contraseña incorrecta';
  }
};

document.getElementById('product-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  // Procesar imágenes (solo nombres, no archivos reales)
  const imgFiles = e.target.images.files;
  data.images = [];
  for(let i=0; i<imgFiles.length; i++) {
    data.images.push(imgFiles[i].name);
  }
  // Permitir campos extra (cámara, tipo, opciones)
  if(data.camera) data.camera = data.camera;
  if(data.type) data.type = data.type;
  if(data.options) data.options = data.options.split(',');
  let products = JSON.parse(localStorage.getItem('deltha_products') || '[]');
  // Si el ID ya existe, reemplaza el producto
  const idx = products.findIndex(p => p.id === data.id);
  if(idx >= 0) products[idx] = data;
  else products.push(data);
  localStorage.setItem('deltha_products', JSON.stringify(products));
  alert('Producto guardado');
  e.target.reset();
  renderAdminProducts();
});

function renderAdminProducts() {
  let products = JSON.parse(localStorage.getItem('deltha_products') || '[]');
  document.getElementById('admin-products').innerHTML = products.length === 0
    ? '<div class="small">No hay productos guardados.</div>'
    : products.map((p,i) =>
      `<div>
        <b>${p.brand} ${p.model}</b> - S/ ${p.price}
        <div class="small">${p.ram || ''} ${p.storage || ''}</div>
        ${p.images && p.images.length ? `<div>Imágenes: ${p.images.join(', ')}</div>` : ''}
        <button onclick="deleteProduct(${i})">Eliminar</button>
      </div>`
    ).join('<hr>');
}
window.deleteProduct = function(idx) {
  let products = JSON.parse(localStorage.getItem('deltha_products') || '[]');
  products.splice(idx,1);
  localStorage.setItem('deltha_products', JSON.stringify(products));
  renderAdminProducts();
};
renderAdminProducts();
// El archivo ya contiene la lógica para login, agregar/editar productos y accesorios.
