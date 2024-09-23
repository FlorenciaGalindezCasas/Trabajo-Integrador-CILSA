
// Funcion para agrupar productos por categoria
function agruparCategoria(data) {
    return data.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = []
        }
        acc[product.category].push(product)
        return acc
    }, {})
}

// Funcion para crear las cards agrupadas por categoria
function crearCards(GrupoData) {
    const container = document.querySelector('.productos')

    // Iterar por categoría
    for (const categoria in GrupoData) {
        // Container para la categoría
        const categoriaDiv = document.createElement('div')
        categoriaDiv.className = 'categoria'

        // Título categoría
        const categoriaTitulo = document.createElement('h2')
        categoriaTitulo.className = 'categoria-titulo'
        categoriaTitulo.textContent = categoria
        container.appendChild(categoriaTitulo)

        // Container para las cards
        const cardContainer = document.createElement('div')
        cardContainer.className = 'card-container container'

        // Iterar por productos de la categoría
        GrupoData[categoria].slice(0, 3).forEach(producto => {
            const cardDiv = document.createElement('div')
            cardDiv.className = 'card'
            cardDiv.style.width = '18rem'

            cardDiv.innerHTML = `
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

            cardContainer.appendChild(cardDiv)
        })

        categoriaDiv.appendChild(cardContainer)

        if (GrupoData[categoria].length > 3) {
            const verMasBtn = document.createElement('button')
            verMasBtn.textContent = "Ver más"
            verMasBtn.className = "btn btn-outline-primary mt-3"
            verMasBtn.style.float = "right"
            verMasBtn.style.marginRight = "9.5em"
            verMasBtn.onclick = () => mostrarTodos(categoria, GrupoData[categoria], cardContainer, verMasBtn)
            categoriaDiv.appendChild(verMasBtn)
        }

        container.appendChild(categoriaDiv)

    }
}

function mostrarTodos(categoria, productos, cardContainer, verMasBtn) {
    const productosAMostrar = productos.slice(3)

    productosAMostrar.forEach(producto => {
        const cardDiv = document.createElement('div')
        cardDiv.className = 'card'
        cardDiv.style.width = '18rem'

        cardDiv.innerHTML = `
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
        `
        cardContainer.appendChild(cardDiv)
    })

    verMasBtn.style.display = "none"
}

let products = []

function abrirModal(productId) {
    const product = products.find(p => p.id === productId)

    if (product) {
        document.getElementById('category').textContent = product.category
        document.getElementById('modalLabel').textContent = product.name
        document.getElementById('modalImage').src = product.image_1
        document.getElementById('imageModal').src = product.image_modal
        document.getElementById('modalDescription').textContent = product.large_description
        document.getElementById('modalPrice').textContent = `Precio: $${product.price}`
    }
}

function fetchData() {
    fetch('../src/assets/json/products.json')
        .then(response => response.json())
        .then(data => {
            products = data
            const GrupoData = agruparCategoria(data)
            crearCards(GrupoData)
            abrirModal(data.id)
        })
        .catch(error => console.log('Error fetching JSON:', error))
}

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})
