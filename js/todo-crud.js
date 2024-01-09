const btnTarefa = document.querySelector('#btnTarefa');
const modalTarefas = document.querySelector('.modal');
const cancelarTarefaNoModal = document.querySelector('#btnCancelarModal')
const btnExcluirTarefa = document.querySelectorAll('.cancelarTarefa');
const formularioNovaTarefa = document.querySelector('.formTarefa');
const inputNovaTarefa = document.querySelector('.inputSubmit');
const ulTarefas = document.querySelector('.lista-de-tarefas');

/*Array que recebe tarefas no local storage ou inicia vazio a lista*/
const listaDeNovasTarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

/*Cria uma <li> e adiciona a tarefa nela*/
function criandoLiComTarefa(tarefa) {
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

    //Agrupando os elementos na <li>
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

/*Capturando as informações do Modal*/
formularioNovaTarefa.addEventListener('submit', (evento)=>{
    evento.preventDefault();
    const tarefa = {
        descricao: inputNovaTarefa.value //pegando o valor digitado no input
    }

    /*Inserindo uma nova tarefa no final da lista e adicionando a tarefa no LS */
    listaDeNovasTarefas.push(tarefa);
    const elementoDaTarefa = criandoLiComTarefa(tarefa)
    ulTarefas.append(elementoDaTarefa)
    localStorage.setItem('tarefas', JSON.stringify(listaDeNovasTarefas));
    /*Limpando valor do input e fechando o modal quando criado a tarefa. */
    inputNovaTarefa.value = ''
    modalTarefas.classList.toggle('hidden');
})

/*Percorrendo a lista de tarefas e adicionando as <li> no HTML */
listaDeNovasTarefas.forEach(tarefa =>{
    const elementoTarefa = criandoLiComTarefa(tarefa);

    /*Adicionando a <li> na <ul>*/
    ulTarefas.append(elementoTarefa);
})