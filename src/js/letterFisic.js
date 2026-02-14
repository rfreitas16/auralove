function abrirCarta1() {
  document.getElementById('overlay1').classList.add('active');
  document.body.classList.add('no-scroll');
}

function fecharCarta1() {
  document.getElementById('overlay1').classList.remove('active');
  document.body.classList.remove('no-scroll');
}

function fecharCarta2() {
  document.getElementById('overlay2').classList.remove('active');
  document.body.classList.remove('no-scroll');
}

function irParaCarta2() {
  fecharCarta1();
  setTimeout(() => {
    document.getElementById('overlay2').classList.add('active');
    document.body.classList.add('no-scroll');
  }, 300);
}
