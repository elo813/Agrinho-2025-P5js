let xJogador = [0, 0, 0, 0];
let yJogador = [75, 150, 225, 300];
let jogador = ["🚚", "🚜", "🛺", "🛻"];
let teclas = ["a", "s", "d", "f"];
let frutas = [];
let frutasPegas = [0, 0, 0, 0];
let quantidade = jogador.length;
let venceu = false;
let linhaChegada = 350;
let totalFrutas = 20;

function setup() {
  createCanvas(400, 400);
  gerarFrutas();
}

function draw() {
  ativaJogo();
  desenhaLinhaDeChegada();
  desenhaFrutas();
  desenhaJogadores();
  verificaColisaoFruta();
  verificaVencedor();
}

function ativaJogo() {
  if (focused == true) {
    background("#8BC34A");
  } else {
    background("#4CAF50");
  }
}

function desenhaJogadores() {
  textSize(40);
  for (let i = 0; i < quantidade; i++) {
    text(jogador[i], xJogador[i], yJogador[i]);
    textSize(14);
    fill(0);
    text("Frutas: " + frutasPegas[i], xJogador[i], yJogador[i] + 30);
  }
}

function desenhaLinhaDeChegada() {
  fill("#C2EE90");
  rect(linhaChegada, 0, 10, 400);
  fill("#648D34");
  for (let yAtual = 0; yAtual < 400; yAtual += 20) {
    rect(linhaChegada, yAtual, 10, 10);
  }
}

function gerarFrutas() {
  for (let i = 0; i < totalFrutas; i++) {
    let fruta = {
      x: random(50, linhaChegada - 20),
      y: random(yJogador[0] - 20, yJogador[quantidade - 1] + 20),
      coletada: false
    };
    frutas.push(fruta);
  }
}

function desenhaFrutas() {
  textSize(20);
  for (let fruta of frutas) {
    if (!fruta.coletada) {
      text("🥭", fruta.x, fruta.y);
    }
  }
}

function verificaColisaoFruta() {
  for (let i = 0; i < quantidade; i++) {
    for (let fruta of frutas) {
      if (!fruta.coletada && dist(xJogador[i], yJogador[i], fruta.x, fruta.y) < 20) {
        fruta.coletada = true;
        frutasPegas[i]++;
      }
    }
  }
}

function verificaVencedor() {
  if (venceu) return;

  let ganhador = -1;
  for (let i = 0; i < quantidade; i++) {
    if (xJogador[i] > linhaChegada) {
      if (ganhador === -1) {
        ganhador = i;
        venceu = true;
      } else {
        // Se dois jogadores cruzaram, vence quem tem mais frutas
        if (frutasPegas[i] > frutasPegas[ganhador]) {
          ganhador = i;
        }
      }
    }
  }

  if (ganhador != -1) {
    textSize(24);
    fill(0);
    text(jogador[ganhador] + " venceu com " + frutasPegas[ganhador] + " frutas!", 50, 200);
    noLoop();
  }
}

function keyReleased() {
  for (let i = 0; i < quantidade; i++) {
    if (key == teclas[i]) {
      xJogador[i] += random(15, 25);
    }
  }
}
