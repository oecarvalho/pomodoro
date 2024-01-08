const btnTarefa = document.querySelector('#btnTarefa');
const modalTarefas = document.querySelector('.modal');
const cancelarTarefaNoModal = document.querySelector('#btnCancelarModal')
const btnExcluirTarefa = document.querySelectorAll('.cancelarTarefa');
const formularioNovaTarefa = document.querySelector('.formTarefa');
const inputNovaTarefa = document.querySelector('.inputSubmit');
const ulTarefas = document.querySelector('.lista-de-tarefas');

const listaDeNovasTarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function adicionarTarefaNaTela(tarefa) {
    const li = document.createElement('li');

    const tarefaNaLista = document.createElement('p');
    tarefaNaLista.textContent = tarefa.descricao; // Corrigido para usar a descrição da tarefa

    const divButtons = document.createElement('div');
    divButtons.classList.add('action-list');

    const botaoIniciarTarefa = document.createElement('a');
    const imgPlay = document.createElement('img');
    botaoIniciarTarefa.classList.add('play-tarefa');
    imgPlay.setAttribute('src', '/assets/play.png');

    const botaoExcluirTarefa = document.createElement('a');
    const imgLixeira = document.createElement('img');
    botaoExcluirTarefa.classList.add('cancelarTarefa');
    imgLixeira.setAttribute('src', '/assets/lixeira.png');

    botaoIniciarTarefa.appendChild(imgPlay); // Corrigido para usar appendChild
    botaoExcluirTarefa.appendChild(imgLixeira); // Corrigido para usar appendChild
    divButtons.appendChild(botaoIniciarTarefa); // Corrigido para usar appendChild
    divButtons.appendChild(botaoExcluirTarefa); // Corrigido para usar appendChild
    li.appendChild(tarefaNaLista);
    li.appendChild(divButtons);

    return (li)
}

/*Abrindo o modal quando clicado no botão de add tarefa*/
btnTarefa.addEventListener('click', (event)=>{
    modalTarefas.classList.toggle('hidden');
})

/*Fechando o modal quando clicado no botão cancelar*/
cancelarTarefaNoModal.addEventListener('click', ()=>{
    modalTarefas.classList.toggle('hidden');
})

/*Excluindo tarefa quando o usuário clica no icone de lixeira*/
btnExcluirTarefa.forEach((botaoSelecionado)=>{
    botaoSelecionado.addEventListener('click', (event)=>{
        event.preventDefault()
        botaoSelecionado.closest('li').remove();
    })
})

formularioNovaTarefa.addEventListener('submit', (evento)=>{
    evento.preventDefault();
    const tarefa = {
        descricao: inputNovaTarefa.value
    }

    listaDeNovasTarefas.push(tarefa);
    localStorage.setItem('tarefas', JSON.stringify(listaDeNovasTarefas));
})

listaDeNovasTarefas.forEach(tarefa =>{
    const elementoTarefa = adicionarTarefaNaTela(tarefa);

    ulTarefas.append(elementoTarefa);
})