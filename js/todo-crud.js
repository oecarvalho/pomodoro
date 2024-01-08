const btnTarefa = document.querySelector('#btnTarefa');
const listaDeTarefas = document.querySelector('.list');

btnTarefa.addEventListener('click', (event)=>{
    console.log(event.target);
    listaDeTarefas.classList.toggle('hidden')
})