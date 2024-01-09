const btnTarefa = document.querySelector('#btnTarefa');
const modalTarefas = document.querySelector('.modal');
const cancelarTarefaNoModal = document.querySelector('#btnCancelarModal');
const formularioNovaTarefa = document.querySelector('.formTarefa');
const inputNovaTarefa = document.querySelector('.inputSubmit');
const ulTarefas = document.querySelector('.lista-de-tarefas');
const btnPlayTarefas = document.querySelector('.play-tarefa');
const tarefaDestaque = document.querySelector('.tarefa-destaque');
const btnConcluirTarefa = document.querySelector('#btn-concluir')
/*Array que recebe tarefas no local storage ou inicia vazio a lista*/
const listaDeNovasTarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(listaDeNovasTarefas));
}

/*Cria uma <li> e adiciona a tarefa nela*/
function criandoLiComTarefa(tarefa) {
    const li = document.createElement('li');

    const tarefaNaLista = document.createElement('p');
    tarefaNaLista.textContent = tarefa.descricao;

    const divButtons = document.createElement('div');
    divButtons.classList.add('action-list');

    const botaoEditarTarefa = criarBotao('editar-tarefa', '/assets/editar.png', () => {
        const novaDescricaoTarefa = prompt('Edite a sua tarefa');

        if (novaDescricaoTarefa) {
            const antigaDescricaoTarefa = tarefa.descricao;
            tarefaNaLista.textContent = novaDescricaoTarefa;
            tarefa.descricao = novaDescricaoTarefa;
            atualizarTarefas();

            // Verifica se a tarefa editada está em destaque e a atualiza
            if (tarefaDestaque.textContent === antigaDescricaoTarefa) {
                tarefaDestaque.textContent = novaDescricaoTarefa;
            }
        }
    });

    const botaoIniciarTarefa = criarBotao('play-tarefa', '/assets/play.png', () => {
        tarefaDestaque.textContent = tarefa.descricao;
    });

    const botaoExcluirTarefa = criarBotao('cancelarTarefa', '/assets/lixeira.png', (event) => {
        event.preventDefault();
        li.remove();
        // Remova a tarefa da listaDeNovasTarefas e atualize o localStorage se necessário
        const index = listaDeNovasTarefas.indexOf(tarefa);
        if (index !== -1) {
            listaDeNovasTarefas.splice(index, 1);
            atualizarTarefas();
        }
    });

    divButtons.appendChild(botaoEditarTarefa);
    divButtons.appendChild(botaoIniciarTarefa);
    divButtons.appendChild(botaoExcluirTarefa);
    li.appendChild(tarefaNaLista);
    li.appendChild(divButtons);

    ulTarefas.appendChild(li); // Adiciona a <li> diretamente à <ul>

    return li;
}




// Função utilitária para criar botões com event listeners
function criarBotao(classe, src, callback) {
    const botao = document.createElement('a');
    const img = document.createElement('img');
    botao.classList.add(classe);
    img.setAttribute('src', src);
    botao.appendChild(img);

    // Adiciona o event listener diretamente ao botão
    botao.addEventListener('click', callback);

    return botao;
}

/*Abrindo o modal quando clicado no botão de add tarefa*/
btnTarefa.addEventListener('click', (event) => {
    modalTarefas.classList.toggle('hidden');
});

/*Fechando o modal quando clicado no botão cancelar*/
cancelarTarefaNoModal.addEventListener('click', () => {
    modalTarefas.classList.toggle('hidden');
});

/*Capturando as informações do Modal*/
formularioNovaTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: inputNovaTarefa.value //pegando o valor digitado no input
    };

    /*Inserindo uma nova tarefa no final da lista e adicionando a tarefa no LS */
    listaDeNovasTarefas.push(tarefa);
    const elementoDaTarefa = criandoLiComTarefa(tarefa);
    atualizarTarefas();
    /*Limpando valor do input e fechando o modal quando criado a tarefa. */
    inputNovaTarefa.value = '';
    modalTarefas.classList.toggle('hidden');
});

/*Percorrendo a lista de tarefas e adicionando as <li> no HTML */
listaDeNovasTarefas.forEach((tarefa) => {
    criandoLiComTarefa(tarefa);
});


btnConcluirTarefa.onclick = () => {
    const descricaoTarefaConcluida = tarefaDestaque.textContent;

    // Remove a tarefa da listaDeNovasTarefas
    const index = listaDeNovasTarefas.findIndex(tarefa => tarefa.descricao === descricaoTarefaConcluida);
    if (index !== -1) {
        listaDeNovasTarefas.splice(index, 1);
        atualizarTarefas();
    }

    // Remove a tarefa da lista de visualização (ulTarefas)
    const liTarefaConcluida = Array.from(ulTarefas.children).find(li => li.querySelector('p').textContent === descricaoTarefaConcluida);
    if (liTarefaConcluida) {
        liTarefaConcluida.remove();
    }

    // Limpa o destaque
    tarefaDestaque.textContent = '';
};
