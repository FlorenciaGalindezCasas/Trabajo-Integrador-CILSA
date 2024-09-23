function agregarAlCarrito(productId) {
    const productoSeleccionado = products.find(p => p.id === productId)
    let carrito = JSON.parse(localStorage.getItem('carrito')) || []

    const productoExistente = carrito.find(p => p.id === productId)

    if (productoExistente) {
        productoExistente.cantidad += 1
    } else {
        carrito.push({ ...productoSeleccionado, cantidad: 1 })
    }

    localStorage.setItem('carrito', JSON.stringify(carrito))
    actualizarContadorCarrito()
}

function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const popoverContainer = document.getElementById('popover-container');

    if (!popoverContainer) {
        console.error("El contenedor del popover no se encontró.");
        return;
    }

    if (carrito.length === 0) {
        popoverContainer.innerHTML = "El carrito está vacío.";
    } else {
        let listaProductos = "<strong>Productos en el carrito:</strong><br>";
        carrito.forEach(producto => {
            listaProductos += `${producto.name} (Cantidad: ${producto.cantidad})<br>`;
        });
        popoverContainer.innerHTML = listaProductos;
    }
}

function showPopover() {
    const popoverContainer = document.getElementById('popover-container');
    const cartIcon = document.getElementById('cart-icon');

    const popover = new bootstrap.Popover(cartIcon, {
        html: true,
        content: popoverContainer.innerHTML,
        placement: 'bottom',
        trigger: 'manual',
    });

    popover.show();

    cartIcon.addEventListener('mouseleave', () => {
        popover.hide();
    });
}

function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);

    const cartCountElement = document.getElementById('cart-count');

    if (cartCountElement) {
        cartCountElement.textContent = totalProductos;
    } else {
        console.error('El elemento con id "cart-count" no se encontró en el DOM.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');

    if (!cartIcon) {
        console.error("El ícono del carrito no se encontró.");
        return;
    }

    cartIcon.addEventListener('mouseenter', () => {
        mostrarCarrito();
        showPopover();
    });

    actualizarContadorCarrito();
});