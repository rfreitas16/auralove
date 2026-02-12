const openLetter = document.getElementById('openLetter');
const letterContainer = document.getElementById('letter-container');
const siteContent = document.getElementById('site-content');

openLetter.addEventListener('click', () => {
  letterContainer.style.opacity = '0';
  letterContainer.style.transform = 'scale(1.2)';

  setTimeout(() => {
    letterContainer.style.display = 'none';
    siteContent.classList.add('show');
  }, 900);
});
