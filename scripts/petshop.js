const asideMenuMobile = document.querySelector('.aside-menu-mobile')
const iconMenuMobile = document.querySelector('.left')

iconMenuMobile.addEventListener('click', ()=> {
    asideMenuMobile.classList.toggle('hidden');
})
