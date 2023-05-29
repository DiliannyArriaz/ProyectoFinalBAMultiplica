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

const btnYes = document.getElementById('yes');
const btnNo = document.getElementById('no');
const popup = document.querySelector('.are-you-sure')

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

    randomMichis(data)
}
let michisFavoritos = JSON.parse(localStorage.getItem('michisFavoritos')) || [];

// Function para crear las tarjetitas de la API 
async function randomMichis(data) {
    // Se limpia el DOM antes de ejectuar para que se actualice en lugar de crearlas debajo
    sectionContainerMichis.innerHTML = "";
    data.forEach(gatito => {
        // Creando el contenedor de las tarjetitas
        const articleGatito = document.createElement('article');
        articleGatito.classList.add('michi-card');

        // La imagen de cada michi
        const imgGatito = document.createElement('img');
        imgGatito.src = gatito.url;

        // Boton para likear los michis
        const btnAgregarMichi = document.createElement('button');
        btnAgregarMichi.classList.add('like-michi');
        btnAgregarMichi.innerText = '🤍'
        // AddEventListener del boton de agregar michis, se comprueba primero si el michi ya está dentro del array de michis si no está guardado se comprueba si los michis guardados son más de 12, si lo son, no dejará al usuario guardar más michis.
        btnAgregarMichi.addEventListener('click', () => {
            //  si lo está, salta un mensaje para avisarle al usuario que ya está guardado
            if (michisFavoritos.some(michi => michi.id === gatito.id)) {
                mostrarMensajeGuardado('This michi is already saved on your list')
            } else {
                // si no está guardado se comprueba si los michis guardados son más de 12, si lo son, no dejará al usuario guardar más michis. 
                if (michisFavoritos.length >= 12) {
                    mostrarMensajeGuardado('You have so many michis!');
                    // De lo contrario, dejará al usuario guardar el michi en favoritos
                } else {
                    michisFavoritos.push(gatito);
                    localStorage.setItem('michisFavoritos', JSON.stringify(michisFavoritos));
                    btnAgregarMichi.innerText = '❤️'
                    mostrarMensajeGuardado('Michi Saved');
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

// Function para crear las tarjetitas de los michis en el container.
function favMichis() {
    // Se limpia el contenedor primero para que al momento de borrar o crear una nueva tarjeta se actualice el container
    sectionContainerFavMichis.innerHTML = "";

    michisFavoritos.forEach((gatito) => {
        // Tarjetita de los gatitos
        const articleGatito = document.createElement('article');
        articleGatito.classList.add('michi-card');

        // Imagen del gatito
        const imgGatito = document.createElement('img');
        imgGatito.src = gatito.url;

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

            // Se actualiza el array de michis y se elimina el michi clickeado

            const michisFavoritos = JSON.parse(localStorage.getItem('michisFavoritos'));
            const michisFavoritosActualizados = michisFavoritos.filter((gatito) => gatito.id !== id)

            localStorage.setItem('michisFavoritos', JSON.stringify(michisFavoritosActualizados));

            // Se vuelve a activar el mensaje default del contenedor michis favoritos si el usuario elimina todos
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

// Function para borrar todos los michis del LocalStorage
function deleteAllMichis() {
    localStorage.removeItem('michisFavoritos');

    sectionContainerFavMichis.innerHTML = "";
    // Se crea el mensaje default para cuando no haya ningún michi guardado
    mensajitoEmpty.classList.remove('hidden')
    sectionContainerFavMichis.classList.add('hidden')
    mostrarMensajeGuardado('All Michis has been remove from favorites');
}

// Function para los mensajes que saltan en pantalla al realizar alguna acción
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
    // Si entra en Home va cargar fetchData y además evento de click para el botón de cargar más michis + Volver al top de la pagina, también la function para abrir y cerrar el menú de mobil
    if (sectionContainerMichis) {
        window.addEventListener('DOMContentLoaded', fetchData)
        buttonMoreMichis.addEventListener('click', () => {
            fetchData()
            topFunction()
        })

        const asideMenuMobile = document.querySelector('.aside-menu-mobile')

        iconMenuMobile.addEventListener('click', () => {
            asideMenuMobile.classList.toggle('hidden');
        })
    }

    // Revisar si la section de Fav Michis existe para saber si el usuario está en la pagina Home o Favorites;
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
        deleteallmichis.addEventListener('click', ()=> {
            console.log('click')
            popup.classList.remove('hidden'); 
            btnYes.addEventListener('click', ()=> {
                deleteAllMichis()
                popup.classList.add('hidden');
            });
            btnNo.addEventListener('click', ()=> {
                popup.classList.add('hidden');
            })
        })
    }
}

// function para regresar al top de la pagina
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Lo primero que hará el script es ejecutar esto
loadAllPages();

