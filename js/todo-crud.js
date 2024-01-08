const btnTarefa = document.querySelector('#btnTarefa');
const modalTarefas = document.querySelector('.modal');
const cancelarTarefaNoModal = document.querySelector('#btnCancelarModal')


btnTarefa.addEventListener('click', (event)=>{
    console.log(event.target);
    modalTarefas.classList.toggle('hidden');
})

cancelarTarefaNoModal.addEventListener('click', (event)=>{
    modalTarefas.classList.toggle('hidden');
})
