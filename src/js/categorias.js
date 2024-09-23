function mostrarProductosPorCategoria(categoria) {
    const productosAMostrar = products.filter(producto => producto.category === categoria);
    const productContainer = document.getElementById('product-container');

    productContainer.setAttribute('style', 'display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5em; justify-content: center; padding-top: 5.5em;');

    if (!productContainer) {
        console.error('El contenedor de productos no se encuentran en el DOM');
        return;
    }

    productContainer.innerHTML = '';

    if (productosAMostrar.length === 0) {
        productContainer.innerHTML = "<p>No hay productos disponibles en esta categoría.</p>";
        return;
    }

    productosAMostrar.forEach(producto => {
        const productElement = document.createElement('div');
        productElement.classList.add('card');
        productElement.style.width = '18rem';
        productElement.innerHTML = `
                <img src="${producto.image_1}" class="card-img-top" alt="${producto.name}">
                <div class="card-body">
                    <h5 class="card-title">${producto.name}</h5>
                    <p class="card-text" hidden>${producto.id}</p>
                    <p class="card-text" hidden>${producto.category}</p>
                    <p class="card-text">${producto.short_description}</p>
                    <h4 class="card-text">$${producto.price}</h4>
                    <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#productModal" onclick="abrirModal('${producto.id}')">Ver más</a>
                    <a href="#" class="btn btn-success" onclick="agregarAlCarrito('${producto.id}')">Agregar al carrito</a>
                </div>
            `;

        productContainer.appendChild(productElement);
    });
}