document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('.footer')
    const seccion = `./src/components/footer.html`

    fetch(seccion)
        .then(response => response.text())
        .then(data => {
            footer.innerHTML = data
        })
        .catch(error => console.log('Error al cargar contenido de la página:', error))

})