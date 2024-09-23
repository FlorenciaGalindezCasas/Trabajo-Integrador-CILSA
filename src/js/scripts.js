document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('.footer')
    const seccionFooter = `./src/components/footer.html`

    const header = document.querySelector('.header')
    const seccionHeader = `./src/components/header.html`

    // Fetch header
    fetch(seccionHeader)
        .then(response => response.text())
        .then(data => {
            header.innerHTML = data
        })
        .catch(error => console.log('Error al cargar contenido de la página:', error))

    // Fetch footer
    fetch(seccionFooter)
        .then(response => response.text())
        .then(data => {
            footer.innerHTML = data
        })
        .catch(error => console.log('Error al cargar contenido de la página:', error))


    // Fetch products
    const productsContainer = document.querySelector('.productos')
    const seccionProducts = `./src/components/modal_products.html`
    fetch(seccionProducts)
        .then(response => response.text())
        .then(data => {
            productsContainer.innerHTML = data
        })
        .catch(error => console.log('Error al cargar contenido de la página:', error))
})
