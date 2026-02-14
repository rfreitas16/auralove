const envelope = document.getElementById('envelope');
const openBtn = document.getElementById('openBtn');
const siteContent = document.getElementById('site-content');
const container = document.getElementById('envelope-container');

openBtn.addEventListener('click', () => {
  envelope.classList.add('open');

  setTimeout(() => {
    container.style.opacity = '0';
    siteContent.classList.add('show');
  }, 1200);

  setTimeout(() => {
    container.style.display = 'none';
  }, 2000);
});