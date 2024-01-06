const btnFoco = document.querySelector('.foco');
const btnShort = document.querySelector('.short');
const btnLongo = document.querySelector('.longo');

const circulo = document.getElementById('cor-circulo')

btnLongo.addEventListener('click', ()=>{
    circulo.setAttribute('data-contexto', 'longo');
})

btnShort.addEventListener('click', ()=>{
    circulo.setAttribute('data-contexto', 'short');
})

btnFoco.addEventListener('click', ()=>{
    circulo.setAttribute('data-contexto', 'foco');
})