
let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  actualizarCarrito();
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  const totalSpan = document.getElementById('total');

  lista.innerHTML = '';
  total = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.nombre} - $${item.precio.toLocaleString()} CLP <button onclick="eliminarDelCarrito(${index})">❌</button>`;
    lista.appendChild(li);
    total += item.precio;
  });

  totalSpan.textContent = total.toLocaleString();
}

// Simulación de pago
function procesarPago() {
  alert('¡Gracias por tu compra en Sonidos del Alma!\nTu pago ha sido procesado con éxito 🎵');
  carrito = [];
  actualizarCarrito();
  document.querySelector('#pago form').reset();
  return false; // evitar envío real del formulario
}
function agregarAlCarrito1(nombre, precio) {
  // Recuperar el carrito actual o iniciar uno nuevo
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Agregar el nuevo producto
  carrito.push({ nombre, precio });

  // Guardar el carrito actualizado en localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));

  alert(`${nombre} agregado al carrito`);
}
function mostrarCarrito1() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const lista = document.getElementById('lista-carrito');
  const totalSpan = document.getElementById('total');
  let total = 0;

  lista.innerHTML = ''; 

  carrito.forEach((producto, index) => {
    const item = document.createElement('li');
    item.textContent = `${producto.nombre} - $${producto.precio.toLocaleString()} CLP`;

    // Crear un botón de eliminación con una cruz
    const eliminarBtn = document.createElement('button');
    eliminarBtn.textContent = '❌'; 
    eliminarBtn.classList.add('eliminar'); 
    eliminarBtn.onclick = function() {
      eliminarDelCarrito(index);
    };

    item.appendChild(eliminarBtn);

    lista.appendChild(item);
    total += producto.precio;
  });

  totalSpan.textContent = total.toLocaleString();
}

function eliminarDelCarrito(index) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  carrito.splice(index, 1);

  localStorage.setItem('carrito', JSON.stringify(carrito));

  mostrarCarrito1();

  alert('Producto eliminado del carrito.');
}

function limpiarCarrito1() {
  localStorage.removeItem('carrito');
  
  mostrarCarrito1();

  alert("El carrito ha sido limpiado.");
}



function mostrarToast(mensaje) {
  const toast = document.getElementById('toast');
  toast.textContent = mensaje;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function validarCampo(id, regex, mensajeError) {
  const campo = document.getElementById(id);
  campo.addEventListener('blur', () => {
    if (!regex.test(campo.value.trim())) {
      mostrarToast(mensajeError);
    }
  });
}

// Validación en tiempo real al salir del campo
document.addEventListener('DOMContentLoaded', () => {
  validarCampo('nombre', /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/, 'Nombre inválido: solo letras y espacios.');
  validarCampo('tarjeta', /^\d{16}$/, 'Tarjeta inválida: deben ser 16 números.');
  validarCampo('fecha', /^(0[1-9]|1[0-2])\/\d{2}$/, 'Fecha inválida: usa MM/AA.');
  validarCampo('cvv', /^\d{3}$/, 'CVV inválido: deben ser 3 dígitos.');
});

function toggleCarritoLateral() {
  const panel = document.getElementById('carrito-lateral');
  const visible = panel.classList.contains('visible');

  if (visible) {
    panel.classList.remove('visible');
  } else {
    panel.classList.add('visible');
    mostrarCarritoLateral();
  }
}

function toggleCarritoLateral(event) {
  if (event) event.preventDefault();

  const panel = document.getElementById('carrito-lateral');
  const overlay = document.getElementById('overlay');

  panel.classList.toggle('visible');
  overlay.classList.toggle('visible');

  if (panel.classList.contains('visible')) {
    mostrarCarritoLateral();
  }
}

function mostrarCarritoLateral() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const lista = document.getElementById('lista-carrito-lateral');
  lista.innerHTML = '';

  carrito.forEach(producto => {
    const li = document.createElement('li');
    li.textContent = `${producto.nombre} - $${producto.precio.toLocaleString()}`;
    lista.appendChild(li);
  });

  const total = carrito.reduce((sum, prod) => sum + prod.precio, 0);
  document.getElementById('total-lateral').textContent = total.toLocaleString();
}

// Ocultar al hacer clic fuera del panel
document.addEventListener('click', function (e) {
  const panel = document.getElementById('carrito-lateral');
  const overlay = document.getElementById('overlay');

  if (
    panel.classList.contains('visible') &&
    !panel.contains(e.target) &&
    !e.target.closest('nav a[href="#"]')
  ) {
    panel.classList.remove('visible');
    overlay.classList.remove('visible');
  }
});

// Ocultar con Escape
document.addEventListener('keydown', function (e) {
  if (e.key === "Escape") {
    document.getElementById('carrito-lateral').classList.remove('visible');
    document.getElementById('overlay').classList.remove('visible');
  }
});
