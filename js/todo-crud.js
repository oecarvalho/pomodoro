const btnTarefa = document.querySelector('#btnTarefa');
const modalTarefas = document.querySelector('.modal');
const cancelarTarefaNoModal = document.querySelector('#btnCancelarModal');
const btnExcluirTarefa = document.querySelectorAll('.cancelarTarefa');
const formularioNovaTarefa = document.querySelector('.formTarefa');
const inputNovaTarefa = document.querySelector('.inputSubmit');
const ulTarefas = document.querySelector('.lista-de-tarefas');

const listaDeNovasTarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function adicionarTarefaNaTela(tarefa) {
    const li = document.createElement('li');
    const tarefaNaLista = document.createElement('p');
    tarefaNaLista.textContent = tarefa.descricao;

    const divButtons = document.createElement('div');
    divButtons.classList.add('action-list');

    const botaoIniciarTarefa = document.createElement('a');
    const imgPlay = document.createElement('img');
    botaoIniciarTarefa.classList.add('play-tarefa');
    imgPlay.setAttribute('src', '/assets/play.png');
    botaoIniciarTarefa.appendChild(imgPlay);
    divButtons.appendChild(botaoIniciarTarefa);

    const botaoExcluirTarefa = document.createElement('a');
    const imgLixeira = document.createElement('img');
    botaoExcluirTarefa.classList.add('cancelarTarefa');
    imgLixeira.setAttribute('src', '/assets/lixeira.png');
    botaoExcluirTarefa.appendChild(imgLixeira);
    divButtons.appendChild(botaoExcluirTarefa);

    li.appendChild(tarefaNaLista);
    li.appendChild(divButtons);

    return li;
}

btnTarefa.addEventListener('click', () => {
    modalTarefas.classList.toggle('hidden');
});

cancelarTarefaNoModal.addEventListener('click', () => {
    modalTarefas.classList.toggle('hidden');
});

btnExcluirTarefa.forEach((botaoSelecionado) => {
    botaoSelecionado.addEventListener('click', (event) => {
        event.preventDefault();
        botaoSelecionado.closest('li').remove();
    });
});

formularioNovaTarefa.addEventListener('submit', (evento) => {
    const tarefa = {
        descricao: inputNovaTarefa.value
    };

    listaDeNovasTarefas.push(tarefa);
    localStorage.setItem('tarefas', JSON.stringify(listaDeNovasTarefas));
    modalTarefas.classList.add('hidden');
});

listaDeNovasTarefas.forEach((tarefa) => {
    const elementoTarefa = adicionarTarefaNaTela(tarefa);
    ulTarefas.appendChild(elementoTarefa); // Changed append to appendChild
});
