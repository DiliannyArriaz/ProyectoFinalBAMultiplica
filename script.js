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

async function randomMichis(data) {
    sectionContainerMichis.innerHTML = "";
    data.forEach(gatito => {

        const articleGatito = document.createElement('article');
        const imgGatito = document.createElement('img');
        const btnAgregarMichi = document.createElement('button');

        articleGatito.classList.add('michi-card');
        imgGatito.src = gatito.url;
        btnAgregarMichi.classList.add('like-michi');
        btnAgregarMichi.innerText = '❤️'
        btnAgregarMichi.addEventListener('click', () => {
            if (michisFavoritos.some(michi => michi.id === gatito.id)) {
                mostrarMensajeGuardado('This michi is already saved on your list')
            } else {
                if (michisFavoritos.length >= 12) {
                    mostrarMensajeGuardado('You have so many michis!');
                } else {
                    michisFavoritos.push(gatito);
                    localStorage.setItem('michisFavoritos', JSON.stringify(michisFavoritos));
                    btnAgregarMichi.innerText = '💔'
                    mostrarMensajeGuardado('Michi Saved');
                }
            }


        })

        articleGatito.appendChild(imgGatito);
        articleGatito.appendChild(btnAgregarMichi);

        sectionContainerMichis.appendChild(articleGatito);

        sectionContainerMichis.classList.add('grid')

    })
};

function favMichis() {
    sectionContainerFavMichis.innerHTML = "";
    michisFavoritos.forEach((gatito) => {

        const articleGatito = document.createElement('article');
        const imgGatito = document.createElement('img');
        const btnSacarMichiDeFavoritos = document.createElement('button');

        articleGatito.classList.add('michi-card');
        imgGatito.src = gatito.url;
        btnSacarMichiDeFavoritos.classList.add('like-michi');
        btnSacarMichiDeFavoritos.innerText = '💔'
        btnSacarMichiDeFavoritos.id = `${gatito.id}`
        btnSacarMichiDeFavoritos.addEventListener('click', (e) => {
            mostrarMensajeGuardado('Michi Deleted 💔');
            const buttonMichisFav = e.target;
            const padreCard = buttonMichisFav.parentElement;

            padreCard.remove();

            const id = buttonMichisFav.id;
            localStorage.removeItem(id);

            const michisFavoritos = JSON.parse(localStorage.getItem('michisFavoritos'));
            const michisFavoritosActualizados = michisFavoritos.filter((gatito) => gatito.id !== id);
            localStorage.setItem('michisFavoritos', JSON.stringify(michisFavoritosActualizados));


            if (michisFavoritosActualizados == 0 || michisFavoritos == 0) {
                mensajitoEmpty.classList.remove('hidden')
                sectionContainerFavMichis.classList.add('hidden')
            } else {
                mensajitoEmpty.classList.add('hidden')
            }

        })
        articleGatito.appendChild(imgGatito);
        articleGatito.appendChild(btnSacarMichiDeFavoritos);
        sectionContainerFavMichis.appendChild(articleGatito);
    });
}

function deleteAllMichis() {
    localStorage.removeItem('michisFavoritos');
    sectionContainerFavMichis.innerHTML = "";
    mensajitoEmpty.classList.remove('hidden')
    sectionContainerFavMichis.classList.add('hidden')
    mostrarMensajeGuardado('All Michi has been remove from favorites');
}

function mostrarMensajeGuardado(mensaje) {
    const mensajeGuardado = document.getElementById('mensaje-guardado');
    mensajeGuardado.innerText = mensaje;
    mensajeGuardado.classList.add('mostrar');
    setTimeout(() => {
        mensajeGuardado.classList.remove('mostrar');
    }, 3000);
}

function loadAllPages() {
    if (sectionContainerMichis) {
        window.addEventListener('DOMContentLoaded', fetchData)
        buttonMoreMichis.addEventListener('click', ()=> {
            fetchData()
            topFunction()
        })

        const asideMenuMobile = document.querySelector('.aside-menu-mobile')

        iconMenuMobile.addEventListener('click', () => {
            asideMenuMobile.classList.toggle('hidden');
        })
    }
    else if (sectionContainerFavMichis) {
        window.addEventListener('DOMContentLoaded', () => {
            if (michisFavoritos.length == 0) {
                mensajitoEmpty.classList.remove('hidden')
                sectionContainerFavMichis.classList.add('hidden')
                console.log('no hay michis aún.')
            } else {
                mensajitoEmpty.classList.add('hidden')
                sectionContainerFavMichis.classList.add('grid')
                favMichis()
            }

            const asideMenuMobile = document.querySelector('.aside-menu-mobile')

            iconMenuMobile.addEventListener('click', () => {
                asideMenuMobile.classList.toggle('hidden');
                console.log('click')
            })
        })
        deleteallmichis.addEventListener('click', deleteAllMichis)
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


loadAllPages();

