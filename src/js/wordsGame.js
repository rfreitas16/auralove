const correctPhrase =
  'Oii amor da minha vida, eu te amo tanto sabia? E eu queria apenas te mostrar que podem haver varias formas de amor, e que de repente leve um tempo para voce resolver isso aqui, mas que no fim das contas somente um amor vai te preencher e fazer voce transbordar. E é exatamente esse que eu vou te dar, depois de unir todas as partes eu te completarei. Para todo sempre.';
let wordsArray = correctPhrase.split(' ');
let gameFinished = false;

const wordsDiv = document.getElementById('words');
const resultDiv = document.getElementById('result');
const resetBtn = document.getElementById('resetBtn');

const STORAGE_KEY = 'fraseConcluida';

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startGame() {
  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('game').classList.remove('hidden');

  if (localStorage.getItem(STORAGE_KEY) === 'true') {
    loadCompletedGame();
  } else {
    loadGame();
  }
}

function loadGame() {
  wordsDiv.innerHTML = '';
  resultDiv.innerHTML = '';
  resetBtn.classList.add('hidden');
  gameFinished = false;

  shuffle([...wordsArray]).forEach(word => {
    const span = document.createElement('span');
    span.textContent = word;
    span.classList.add('word');
    span.onclick = () => moveWord(span);
    wordsDiv.appendChild(span);
  });
}

function loadCompletedGame() {
  wordsDiv.innerHTML = '';
  resultDiv.innerHTML = '';
  gameFinished = true;

  wordsArray.forEach(word => {
    const span = document.createElement('span');
    span.textContent = word;
    span.classList.add('word', 'correct');
    resultDiv.appendChild(span);
  });

  resetBtn.classList.remove('hidden');
}

function moveWord(wordElement) {
  if (gameFinished) return;

  if (wordElement.parentElement === wordsDiv) {
    resultDiv.appendChild(wordElement);
  } else {
    wordsDiv.appendChild(wordElement);
    wordElement.classList.remove('correct', 'wrong');
  }

  checkProgress();
}

function checkProgress() {
  const placedWords = Array.from(resultDiv.children);

  placedWords.forEach((wordEl, index) => {
    wordEl.classList.remove('correct', 'wrong');

    if (wordEl.textContent === wordsArray[index]) {
      wordEl.classList.add('correct');
    } else {
      wordEl.classList.add('wrong');
    }
  });

  if (
    placedWords.length === wordsArray.length &&
    placedWords.every((el, i) => el.textContent === wordsArray[i])
  ) {
    finishGame();
  }
}

function finishGame() {
  gameFinished = true;
  localStorage.setItem(STORAGE_KEY, 'true'); // 🔥 salva progresso
  resetBtn.classList.remove('hidden');
}

function resetGame() {
  localStorage.removeItem(STORAGE_KEY); // 🔥 limpa progresso
  loadGame();
}
