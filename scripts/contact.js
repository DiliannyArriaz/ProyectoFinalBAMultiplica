const asideMenuMobile = document.querySelector('.aside-menu-mobile');
const iconMenuMobile = document.querySelector('.left');
const buttonEnviar = document.querySelector('#more-michis');

const form = document.getElementById('contact-form');

form.addEventListener('submit', function(event) {
    event.preventDefault()
    const inputUserName = document.getElementById('name').value;
    const inputUserEmail = document.getElementById('email').value;
    
    let userName = inputUserName;
    let userEmail = inputUserEmail;
    buttonEnviar.addEventListener('click', ()=> {
        saludar(userName, userEmail)
        form.reset()
    }
    )
})

iconMenuMobile.addEventListener('click', ()=> {
    asideMenuMobile.classList.toggle('hidden');
})
function saludar(userName, userEmail){
    mostrarMensajeGuardado(`Hola ${userName}, responderé tu email a ${userEmail} lo más pronto posible! Saludos`)

}

function mostrarMensajeGuardado(mensaje) {
    const mensajeGuardado = document.getElementById('mensaje-guardado');
    mensajeGuardado.innerText = mensaje;
    mensajeGuardado.classList.add('mostrar');
    setTimeout(() => {
        mensajeGuardado.classList.remove('mostrar');
    }, 5000);
}


