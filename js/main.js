const btnFoco = document.querySelector('.foco');
const btnShort = document.querySelector('.short');
const btnLongo = document.querySelector('.longo');

const circulo = document.getElementById('cor-circulo')



btnFoco.addEventListener('click', ()=>{
    circulo.setAttribute('data-contexto', 'foco');

    if(btnShort.classList.contains('active') || btnLongo.classList.contains('active')){
        btnShort.classList.remove('active');
        btnLongo.classList.remove('active');
    }

    btnFoco.classList.add('active')
})

btnShort.addEventListener('click', ()=>{
    circulo.setAttribute('data-contexto', 'short');

    if(btnFoco.classList.contains('active') || btnLongo.classList.contains('active')){
        btnFoco.classList.remove('active');
        btnLongo.classList.remove('active');
    }

    btnShort.classList.add('active')
})



btnLongo.addEventListener('click', ()=>{
    circulo.setAttribute('data-contexto', 'longo');

    if(btnFoco.classList.contains('active') || btnShort.classList.contains('active')){
        btnFoco.classList.remove('active');
        btnShort.classList.remove('active');
    }

    btnLongo.classList.add('active')
})