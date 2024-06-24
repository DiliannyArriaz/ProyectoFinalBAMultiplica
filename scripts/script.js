const APIRandomMichis = 'https://api.thecatapi.com/v1/images/search?limit=8'
const keyAPI = 'live_R2mXxGW5ZLkIxedUBJK3TIdVE9sWRW0zOO1IVzSCrUAw70KZttzPnuauIfR9sw5B'

const sectionContainerMichis = document.querySelector('.container-michis');
const sectionContainerFavMichis = document.querySelector('.container-Favmichis');
const buttonMoreMichis = document.querySelector('#more-michis');
const mensajitoEmpty = document.querySelector('.mensajito');
const deleteallmichis = document.querySelector('#deleteallMichis')
const btnAnterior = document.querySelector('#anterior-btn');
const btnSiguiente = document.querySelector('#siguiente-btn');
const iconMenuMobile = document.querySelector('.left');
const spanContador = document.getElementById('contador')

const btnYes = document.getElementById('yes');
const btnNo = document.getElementById('no');
const popup = document.querySelector('.are-you-sure');

// Pidiendole datos a la API
async function fetchData() {
    const res = await fetch(APIRandomMichis, {
        headers: {
            method: "GET",
            'x-api-key': keyAPI
        }
    })
    if (res.status !== 200) {
        console.log('error')
    }
    const data = await res.json()

    // Hay imagenes de la API que algunas navegadores bloquean y el script se traba dejando el espacio en blanco, así que aquí bloquee algunas de ellas.
    if (data.filter(gatito => gatito.id !== 'ad5') || data.filter(gatito => gatito.id !== 'ad6') || data.filter(gatito => gatito.id !== 'ad4') || data.filter(gatito => gatito.id !== 'ad3') || data.filter(gatito => gatito.id !== 'ad2') || data.filter(gatito => gatito.id !== 'ad1') || data.filter(gatito => gatito.id !== 'ad7') || data.filter(gatito => gatito.id !== 'ad8') || data.filter(gatito => gatito.id !== 'ad9')) {
        randomMichis(data)
    } else {
        fetchData()
    }
}

let michisFavoritos = JSON.parse(localStorage.getItem('michisFavoritos')) || [];

// Function para crear las tarjetitas de la API 
async function randomMichis(data) {
    verificarMichisEnFav()
    sectionContainerMichis.innerHTML = "";

    data.forEach(gatito => {
        const articleGatito = document.createElement('article');
        articleGatito.classList.add('michi-card');

        const imgGatito = document.createElement('img');
        imgGatito.src = gatito.url;
        imgGatito.addEventListener('click', () => {
            verfotitoMichiHome(gatito)
        })

        const btnAgregarMichi = document.createElement('button');
        btnAgregarMichi.classList.add('like-michi');
        btnAgregarMichi.id = `${gatito.id}`
        btnAgregarMichi.innerText = '🤍'
        btnAgregarMichi.addEventListener('click', () => {
            if (michisFavoritos.some(michi => michi.id === gatito.id)) {
                mostrarMensajeGuardado('This michi is already saved on your list')
            } else {
                if (michisFavoritos.length >= 12) {
                    mostrarMensajeGuardado('You have so many michis!');
                } else {

                    michisFavoritos.push(gatito);
                    localStorage.setItem('michisFavoritos', JSON.stringify(michisFavoritos));
                    btnAgregarMichi.innerText = '❤️'
                    mostrarMensajeGuardado('Michi Saved');
                    verificarMichisEnFav()
                }
            }
        })
        // Guardando cada elemento en las tarjetitas
        articleGatito.appendChild(imgGatito);
        articleGatito.appendChild(btnAgregarMichi);

        sectionContainerMichis.appendChild(articleGatito);
        sectionContainerMichis.classList.add('grid')
    })
};

function verfotitoMichiHome(gatito) {
    const asidePreviewHome = document.querySelector('.preview-home');
    asidePreviewHome.classList.remove('hidden')
    const darkenDiv = document.querySelector('.darken');
    darkenDiv.classList.remove('hidden')

    const buttonCloseMichiPreview = document.querySelector('.close-button-home');
    buttonCloseMichiPreview.addEventListener('click', ()=> {
        asidePreviewHome.classList.add('hidden');
        darkenDiv.classList.add('hidden');
    })
    const imagPreviewMichi = document.querySelector('.gatito-preview-home');
    imagPreviewMichi.src = gatito.url

    const buttonAgregarAFavoritosPreview = document.querySelector('.like-preview');
    if (michisFavoritos.some(michi=> michi.id === gatito.id)){
        buttonAgregarAFavoritosPreview.innerText = '❤️'
    } else {
        buttonAgregarAFavoritosPreview.innerText = '🤍'
    }
    buttonAgregarAFavoritosPreview.addEventListener('click', ()=> {

        if (michisFavoritos.some(michi => michi.id === gatito.id)) {
            mostrarMensajeGuardado('This michi is already saved on your list')
        } else {
            if (michisFavoritos.length >= 12) {
                mostrarMensajeGuardado("You can't save more michis! 12/12");
            } else {
                michisFavoritos.push(gatito);
                localStorage.setItem('michisFavoritos', JSON.stringify(michisFavoritos));
                buttonAgregarAFavoritosPreview.innerText = '❤️'
                const buttonMichiHome = document.getElementById(`${gatito.id}`)
                buttonMichiHome.innerText = '❤️'
                mostrarMensajeGuardado('Michi Saved');
                verificarMichisEnFav()
            }
        }
    })
}
// Function para crear las tarjetitas de los michis en el container.
function favMichis() {
    // Se limpia primero el contenedor para que al momento de crear o eliminar a un michi se actualice en la pagina
    sectionContainerFavMichis.innerHTML = "";

    michisFavoritos.forEach((gatito) => {
        // Tarjetita de los gatitos
        const articleGatito = document.createElement('article');
        articleGatito.classList.add('michi-card');

        // Imagen del gatito
        const imgGatito = document.createElement('img');
        imgGatito.classList.add('imagen-gatitoFav')
        imgGatito.src = gatito.url;
        imgGatito.addEventListener('click', () => {
            verFotoDeMichiFav(gatito)
        })

        //  Boton de Borrar michi
        const btnSacarMichiDeFavoritos = document.createElement('button');
        btnSacarMichiDeFavoritos.classList.add('like-michi');
        btnSacarMichiDeFavoritos.innerText = '💔'
        btnSacarMichiDeFavoritos.id = `${gatito.id}`

        // Evento de click para eliminar en tiempo real la tarjeta del HTML
        btnSacarMichiDeFavoritos.addEventListener('click', (e) => {
            mostrarMensajeGuardado('Michi Deleted 💔');
            const buttonMichisFav = e.target;
            const padreCard = buttonMichisFav.parentElement;

            padreCard.remove();

            const id = buttonMichisFav.id;
            localStorage.removeItem(id);

            // Se elimina el michi del array y se actualiza en el HTML

            const michisFavoritos = JSON.parse(localStorage.getItem('michisFavoritos'));
            const michisFavoritosActualizados = michisFavoritos.filter((gatito) => gatito.id !== id)

            localStorage.setItem('michisFavoritos', JSON.stringify(michisFavoritosActualizados));

            // Si el usuario elimina a todos, se activa el mensaje default
            if (michisFavoritosActualizados == 0 || michisFavoritos == 0) {
                mensajitoEmpty.classList.remove('hidden')
                sectionContainerFavMichis.classList.add('hidden')
            } else {
                mensajitoEmpty.classList.add('hidden')
            }
        })
        // Se agregan las tarjetitas al DOM
        articleGatito.appendChild(imgGatito);
        articleGatito.appendChild(btnSacarMichiDeFavoritos);
        sectionContainerFavMichis.appendChild(articleGatito);
    });
}

function verFotoDeMichiFav(gatito) {
    const asidePreview = document.querySelector('.preview');
    asidePreview.classList.remove('hidden');
    const darkenDiv = document.querySelector('.darken');
    darkenDiv.classList.remove('hidden')


    const buttonCerrarPreview = document.querySelector('.close-button');
    buttonCerrarPreview.addEventListener('click', () => {
        asidePreview.classList.add('hidden');
        darkenDiv.classList.add('hidden');
    })
    const buttonSacarMichiDeFavoritoPreview = document.querySelector('.dislike');
    buttonSacarMichiDeFavoritoPreview.id = `${gatito.id}`

    buttonSacarMichiDeFavoritoPreview.addEventListener('click', (e) => {
        const buttonMichisFav = e.target;

        const id = buttonMichisFav.id;
        localStorage.removeItem(id);
        // Se elimina al michi del array de favoritos desde la tarjeta Preview
        const michisFavoritos = JSON.parse(localStorage.getItem('michisFavoritos'));
        const michisFavoritosActualizados = michisFavoritos.filter((gatito) => gatito.id !== id)
        localStorage.setItem('michisFavoritos', JSON.stringify(michisFavoritosActualizados));

        mostrarMensajeGuardado('Michi Deleted from favorites')

        asidePreview.classList.add('hidden');
        darkenDiv.classList.add('hidden');

        // Se actualiza la pagina 
        setTimeout(() => {
            location.reload()
        }, 500)

    })
    const imagen = document.querySelector('.gatito-preview');
    imagen.src = gatito.url
}
// Function para borrar todos los michis del LocalStorage
function deleteAllMichis() {
    localStorage.removeItem('michisFavoritos');

    sectionContainerFavMichis.innerHTML = "";
    // Se crea el mensaje default para cuando no haya ningún michi guardado
    mensajitoEmpty.classList.remove('hidden')
    sectionContainerFavMichis.classList.add('hidden')
    mostrarMensajeGuardado('All Michis has been remove from favorites');
}

// Function para mostrar el POP UP en la pagina
function mostrarMensajeGuardado(mensaje) {
    const mensajeGuardado = document.getElementById('mensaje-guardado');
    mensajeGuardado.innerText = mensaje;
    mensajeGuardado.classList.add('mostrar');
    setTimeout(() => {
        mensajeGuardado.classList.remove('mostrar');
    }, 3000);
    
}

// Function para validar si se está abriendo la pagina Home o Favorites.
function loadAllPages() {
    // Si entra en Home va cargar fetchData - botón de cargar más michis + Volver al top de la pagina - function para abrir y cerrar el menú de mobil
    if (sectionContainerMichis) {
        window.addEventListener('DOMContentLoaded', fetchData)
        verificarMichisEnFav()
        buttonMoreMichis.addEventListener('click', () => {
            fetchData()
            topFunction()
        })

        const asideMenuMobile = document.querySelector('.aside-menu-mobile')

        iconMenuMobile.addEventListener('click', () => {
            asideMenuMobile.classList.toggle('hidden');
        })
    }

    // Si entra a Favorites va a cargar FavMichis - evento de click para el menú mobil;
    else if (sectionContainerFavMichis) {
        window.addEventListener('DOMContentLoaded', () => {
            // Validando si hay michis en el array de favoritos, si no los hay se crea el mensaje predeterminado para avisar que no hay michis en favoritos
            if (michisFavoritos.length == 0) {
                mensajitoEmpty.classList.remove('hidden')
                sectionContainerFavMichis.classList.add('hidden')
                console.log('no hay michis aún.')
            } else {
                // Se esconde el mensaje de no hay michis y pasa a tener display grid el container para las tarjetitas de los michis
                mensajitoEmpty.classList.add('hidden')
                sectionContainerFavMichis.classList.add('grid')
                favMichis()
            }
            // Function para menú mobil
            const asideMenuMobile = document.querySelector('.aside-menu-mobile')

            iconMenuMobile.addEventListener('click', () => {
                asideMenuMobile.classList.toggle('hidden');

            })
        })
        // Evento de click para el botón de borrar a todos los michis del contenedor
        deleteallmichis.addEventListener('click', () => {
            popup.classList.remove('hidden');
            btnYes.addEventListener('click', () => {
                deleteAllMichis()
                popup.classList.add('hidden');
            });
            btnNo.addEventListener('click', () => {
                popup.classList.add('hidden');
            })
        })
    }
}

function verificarMichisEnFav() {
    spanContador.innerText = Number(michisFavoritos.length)
}
// function para regresar al top de la pagina
function topFunction() {
    document.body.scrollTop = 200;
    document.documentElement.scrollTop = 200;
}

loadAllPages()

