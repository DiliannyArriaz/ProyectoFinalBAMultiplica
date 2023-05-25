const APIrandomFacts = 'https://catfact.ninja/fact?max_length=140'
const sectionrandomFacts = document.querySelector('.random-facts')

const iconMenuMobile = document.querySelector('.left');
const asideMenuMobile = document.querySelector('.aside-menu-mobile')

iconMenuMobile.addEventListener('click', ()=> {
    asideMenuMobile.classList.toggle('hidden');
})

const buttonGenerateFacts = document.getElementById('catFactsButton')
buttonGenerateFacts.addEventListener('click', fetDataFacts)

async function fetDataFacts(){
    const res = await fetch(APIrandomFacts);

    if(res.status !== 200){
        console.log('error' + res.status)
    } 
    const data = await res.json()
        getARandomFact(data)
    }



async function getARandomFact(data){
    const pFacts = document.getElementById('facts');
    pFacts.innerText = data.fact;
}



window.addEventListener('DOMContentLoaded', fetDataFacts)