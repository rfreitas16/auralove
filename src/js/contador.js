function atualizarContador() {
  const dataInicial = new Date(2026, 0, 15, 0, 0, 0);
  const agora = new Date();
  let diferenca = agora - dataInicial;

  if (diferenca < 0) return;

  const totalSegundos = Math.floor(diferenca / 1000);

  const dias = Math.floor(totalSegundos / 86400);
  const horas = Math.floor((totalSegundos % 86400) / 3600);
  const minutos = Math.floor((totalSegundos % 3600) / 60);
  const segundos = totalSegundos % 60;

  document.getElementById('dias').textContent = dias;
  document.getElementById('horas').textContent = horas
    .toString()
    .padStart(2, '0');
  document.getElementById('minutos').textContent = minutos
    .toString()
    .padStart(2, '0');
  document.getElementById('segundos').textContent = segundos
    .toString()
    .padStart(2, '0');
}

atualizarContador();
setInterval(atualizarContador, 1000);
