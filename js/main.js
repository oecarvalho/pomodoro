const btnFoco = document.querySelector('.foco');
const btnShort = document.querySelector('.short');
const btnLongo = document.querySelector('.longo');
const circulo = document.getElementById('cor-circulo');
const playPause = document.getElementById('play-pause');
const timer = document.getElementById('timer');

let tempoEmSegundos = 1500;
let intervalo = null;
let tempoPausado = null;
let started = false;

let segundosReais = 1500;
let valorDesejado = 1131;

let proporcao = valorDesejado / segundosReais;

const valorInicial = 283; // Porcentagem inicial para os botões


function atualizarCirculo(milissegundosRestantes) {
  let valorCirculo = valorInicial - (milissegundosRestantes / segundosReais) * valorInicial;

  if (tempoEmSegundos <= 0) {
    valorCirculo = valorInicial;
  } else if (tempoEmSegundos === segundosReais) {
    valorCirculo = 0;
  }

  // Aplique um limite mínimo para o valor do círculo para evitar valores negativos
  valorCirculo = Math.max(valorCirculo, 0);

  const valorPercentual = valorCirculo + '%';
  circulo.style.strokeDashoffset = valorPercentual;
}

function mostrarTempo() {
    var tempo = new Date(tempoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-br', { minute: '2-digit', second: '2-digit' })
    timer.innerHTML = `<h1 id="timer" class="tempo">${tempoFormatado}</h1>`;
}

const contagemRegressiva = () => {
    if (tempoEmSegundos <= 0) {
        zerar();
        alert('Tempo de foco encerrado!');
        return;
    }
    tempoEmSegundos -= 1;
    mostrarTempo();
    atualizarCirculo(tempoEmSegundos);
}

const iniciarPausar = () => {
    if (!started) {
        started = true;
        playPause.innerHTML = '<li><a href="#" id="play-pause" class="button"><img id="icone" src="/assets/pause.png" alt="">Pausar</a></li>';
        intervalo = setInterval(contagemRegressiva, 1000);
    } else {
        pausar();
    }
}

const pausar = () => {
    clearInterval(intervalo);
    playPause.innerHTML = '<li><a href="#" id="play-pause" class="button"><img id="icone" src="/assets/play.png" alt="">Iniciar</a></li>';
    started = false;
    tempoPausado = tempoEmSegundos;
}

const zerar = () => {
    clearInterval(intervalo);
    playPause.innerHTML = '<li><a href="#" id="play-pause" class="button"><img id="icone" src="/assets/play.png" alt="">Iniciar</a></li>';
    started = false;
    intervalo = null;
    tempoEmSegundos = 5;
    tempoPausado = null;
    mostrarTempo();
}

btnFoco.addEventListener('click', () => {
    if (!started) {
        tempoEmSegundos = 1500;
        segundosReais = 1500;
        let valorDesejado = 1131;
        circulo.setAttribute('data-contexto', 'foco');
        

        if (btnShort.classList.contains('active') || btnLongo.classList.contains('active')) {
            btnShort.classList.remove('active');
            btnLongo.classList.remove('active');
        }

        btnFoco.classList.add('active');
        mostrarTempo();
        atualizarCirculo(tempoEmSegundos);
    }
});

btnShort.addEventListener('click', () => {
    if (!started) {
        tempoEmSegundos = 300;
        segundosReais = 300;
        circulo.setAttribute('data-contexto', 'short');

        if (btnFoco.classList.contains('active') || btnLongo.classList.contains('active')) {
            btnFoco.classList.remove('active');
            btnLongo.classList.remove('active');
        }

        btnShort.classList.add('active');
        mostrarTempo();
        atualizarCirculo(tempoEmSegundos);
    }
});

btnLongo.addEventListener('click', () => {
    if (!started) {
        tempoEmSegundos = 900;
        segundosReais = 900;
        circulo.setAttribute('data-contexto', 'longo');

        if (btnFoco.classList.contains('active') || btnShort.classList.contains('active')) {
            btnFoco.classList.remove('active');
            btnShort.classList.remove('active');
        }

        btnLongo.classList.add('active');
        mostrarTempo();
        atualizarCirculo(tempoEmSegundos);
    }
});

playPause.addEventListener('click', iniciarPausar);

mostrarTempo();
