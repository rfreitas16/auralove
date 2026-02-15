const openLetter = document.getElementById('openLetter');
const flap = document.getElementById('envelope');
const letterContainer = document.getElementById('letter-container');
const letterEmpty = document.getElementById('letter-empty');

openLetter.addEventListener('click', () => {
  flap.classList.add('open');
  letterEmpty.classList.add('open');

  setTimeout(() => {
    letterContainer.style.display = 'none';
  }, 2000);

  setTimeout(() => {
    letterContainer.style.opacity = '0';
    letterContainer.style.transform = 'scale(1.2)';
  }, 1200);
});
