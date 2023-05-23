


function favMichis() {
    sectionContainerFavMichis.innerHTML = "";
    // michisFavoritos.forEach(gatito => {

    for (gatito of michisFavoritos){
        const articleGatito = document.createElement('article');
        const imgGatito = document.createElement('img');
        const btnSacarMichiDeFavoritos = document.createElement('button');

        articleGatito.classList.add('michi-card');
        imgGatito.src = gatito.url;
        btnSacarMichiDeFavoritos.classList.add('like-michi');
        btnSacarMichiDeFavoritos.innerText = '💔'
        btnSacarMichiDeFavoritos.id = `${gatito.id}`
        btnSacarMichiDeFavoritos.addEventListener('click', (e) => {
            const buttonMichisFav = e.target;
            const padreCard = buttonMichisFav.parentElement;

            padreCard.remove();

            const id = buttonMichisFav.id;
            localStorage.removeItem(id);

            const michisFavoritos = JSON.parse(localStorage.getItem('michisFavoritos'));
            const michisFavoritosActualizados = michisFavoritos.filter((gatito) => gatito.id !== id);
            localStorage.setItem('michisFavoritos', JSON.stringify(michisFavoritosActualizados));


            if(michisFavoritosActualizados == 0 || michisFavoritos == 0){
                mensajitoEmpty.classList.remove('hidden')
            } else {
                mensajitoEmpty.classList.add('hidden')
            }

        })

        articleGatito.appendChild(imgGatito);
        articleGatito.appendChild(btnSacarMichiDeFavoritos);

        sectionContainerFavMichis.appendChild(articleGatito);
    };
}