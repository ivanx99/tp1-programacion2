console.log("Aplicación inicializada");

document.addEventListener('DOMContentLoaded', () => {
    const btnHambuerguesa = document.querySelector ('.btn-hamburguesa');
    const menuLista = document.getElementById('menu-lista');
    if (btnHambuerguesa && menuLista) {
        btnHambuerguesa.addEventListener('click', () => {
            menuLista.classList.toggle('mostrar');
        });
    }
});