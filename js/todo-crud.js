const btnTarefa = document.querySelector('#btnTarefa');
const modalTarefas = document.querySelector('.modal');
const cancelarTarefaNoModal = document.querySelector('#btnCancelarModal')
const btnExcluirTarefa = document.querySelectorAll('.cancelarTarefa');

btnTarefa.addEventListener('click', (event)=>{
    console.log(event.target);
    modalTarefas.classList.toggle('hidden');
})

cancelarTarefaNoModal.addEventListener('click', (event)=>{
    modalTarefas.classList.toggle('hidden');
})


btnExcluirTarefa.forEach((botaoSelecionado)=>{
    botaoSelecionado.addEventListener('click', (evento)=>{
        botaoSelecionado.closest('li').remove()
    })
})